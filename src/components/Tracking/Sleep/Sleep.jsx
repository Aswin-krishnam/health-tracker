import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Dashboard/DashboardLayout';
import './Sleep.css';

const Sleep = () => {
    const [sleepData, setSleepData] = useState({
        duration: '',
        quality: 'Good',
        sleepTime: '',
        wakeTime: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [todayLog, setTodayLog] = useState(null);

    useEffect(() => {
        fetchTodaySleep();
    }, []);

    const fetchTodaySleep = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/sleep/today`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            if (response.data.sleep) {
                const { duration, quality, sleepTime, wakeTime, notes } = response.data.sleep;
                setSleepData({
                    duration: duration || '',
                    quality: quality || 'Good',
                    sleepTime: sleepTime ? new Date(sleepTime).toISOString().substr(0, 16) : '',
                    wakeTime: wakeTime ? new Date(wakeTime).toISOString().substr(0, 16) : '',
                    notes: notes || ''
                });
            }
        } catch (err) {
            console.error('Error fetching sleep data:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSleepData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear messages
        setError('');
        setSuccess('');
    };

    const calculateDuration = () => {
        if (sleepData.sleepTime && sleepData.wakeTime) {
            const sleep = new Date(sleepData.sleepTime);
            const wake = new Date(sleepData.wakeTime);
            const diff = (wake - sleep) / (1000 * 60 * 60); // Convert to hours
            setSleepData(prev => ({
                ...prev,
                duration: Math.round(diff * 10) / 10
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/sleep`,
                sleepData,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            
            setSuccess('Sleep data logged successfully!');
            fetchTodaySleep(); // Refresh the data
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log sleep data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="sleep-container">
                <div className="sleep-header">
                    <h2>Track Your Sleep</h2>
                    <p>Monitor your sleep patterns for better health</p>
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

                <form onSubmit={handleSubmit} className="sleep-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="sleepTime">Bed Time</label>
                            <input
                                type="datetime-local"
                                id="sleepTime"
                                name="sleepTime"
                                value={sleepData.sleepTime}
                                onChange={handleChange}
                                onBlur={calculateDuration}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="wakeTime">Wake Time</label>
                            <input
                                type="datetime-local"
                                id="wakeTime"
                                name="wakeTime"
                                value={sleepData.wakeTime}
                                onChange={handleChange}
                                onBlur={calculateDuration}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration">Duration (hours)</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={sleepData.duration}
                                onChange={handleChange}
                                step="0.1"
                                min="0"
                                max="24"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quality">Sleep Quality</label>
                            <select
                                id="quality"
                                name="quality"
                                value={sleepData.quality}
                                onChange={handleChange}
                                required
                            >
                                <option value="Excellent">Excellent</option>
                                <option value="Good">Good</option>
                                <option value="Fair">Fair</option>
                                <option value="Poor">Poor</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={sleepData.notes}
                            onChange={handleChange}
                            placeholder="How did you sleep? Any disturbances?"
                            rows="3"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging...' : 'Log Sleep'}
                    </button>
                </form>

                {todayLog && (
                    <div className="sleep-summary">
                        <h3>Today's Sleep Summary</h3>
                        <div className="summary-stats">
                            <div className="stat">
                                <label>Duration</label>
                                <span>{todayLog.duration} hours</span>
                            </div>
                            <div className="stat">
                                <label>Quality</label>
                                <span>{todayLog.quality}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Sleep;
