import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Dashboard/DashboardLayout';
import './Hydration.css';

const Hydration = () => {
    const [hydrationData, setHydrationData] = useState({
        waterIntake: 0,
        target: 2000 // default target 2L
    });
    const [dailyLog, setDailyLog] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTodayHydration();
    }, []);

    const fetchTodayHydration = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/hydration/today`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            if (response.data.hydration) {
                setHydrationData(response.data.hydration);
                setDailyLog(response.data.hydration);
            }
        } catch (err) {
            console.error('Error fetching hydration data:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHydrationData(prev => ({
            ...prev,
            [name]: Number(value)
        }));
        // Clear messages
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/hydration`,
                hydrationData,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            
            setSuccess('Hydration data logged successfully!');
            fetchTodayHydration(); // Refresh the data
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log hydration data');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateProgress = () => {
        return (hydrationData.waterIntake / hydrationData.target) * 100;
    };

    const formatWater = (ml) => {
        return ml >= 1000 ? `${(ml / 1000).toFixed(1)}L` : `${ml}ml`;
    };

    return (
        <DashboardLayout>
            <div className="hydration-container">
                <div className="hydration-header">
                    <h2>Track Your Water Intake</h2>
                    <p>Stay hydrated for better health</p>
                </div>

                {error && (
                    <div className="alert error">
                        <span>❌</span> {error}
                    </div>
                )}

                {success && (
                    <div className="alert success">
                        <span>✅</span> {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="hydration-form">
                    <div className="hydration-progress">
                        <div className="progress-circle">
                            <div 
                                className="progress-fill" 
                                style={{ 
                                    height: `${Math.min(calculateProgress(), 100)}%`,
                                    backgroundColor: calculateProgress() >= 100 ? '#4CAF50' : '#3498db'
                                }}
                            ></div>
                            <div className="progress-text">
                                <span className="current">{formatWater(hydrationData.waterIntake)}</span>
                                <span className="target">of {formatWater(hydrationData.target)}</span>
                            </div>
                        </div>
                        <div className="quick-add-buttons">
                            <button type="button" onClick={() => setHydrationData(prev => ({ ...prev, waterIntake: prev.waterIntake + 250 }))}>
                                +250ml
                            </button>
                            <button type="button" onClick={() => setHydrationData(prev => ({ ...prev, waterIntake: prev.waterIntake + 500 }))}>
                                +500ml
                            </button>
                        </div>
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="waterIntake">Water Intake (ml)</label>
                            <input
                                type="number"
                                id="waterIntake"
                                name="waterIntake"
                                value={hydrationData.waterIntake}
                                onChange={handleChange}
                                min="0"
                                step="50"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="target">Daily Target (ml)</label>
                            <input
                                type="number"
                                id="target"
                                name="target"
                                value={hydrationData.target}
                                onChange={handleChange}
                                min="500"
                                step="100"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Update Hydration'}
                    </button>
                </form>

                {dailyLog && (
                    <div className="hydration-summary">
                        <h3>Today's Hydration Summary</h3>
                        <div className="summary-stats">
                            <div className="stat">
                                <label>Total Intake</label>
                                <span>{formatWater(dailyLog.waterIntake)}</span>
                            </div>
                            <div className="stat">
                                <label>Target</label>
                                <span>{formatWater(dailyLog.target)}</span>
                            </div>
                            <div className="stat">
                                <label>Progress</label>
                                <span>{Math.round(calculateProgress())}%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Hydration;
