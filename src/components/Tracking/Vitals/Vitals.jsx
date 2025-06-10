import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Dashboard/DashboardLayout';
import './Vitals.css';

const Vitals = () => {
    const [vitalsData, setVitalsData] = useState({
        weight: '',
        bloodPressure: {
            systolic: '',
            diastolic: ''
        },
        heartRate: '',
        medications: []
    });
    const [currentMedication, setCurrentMedication] = useState({
        name: '',
        dosage: '',
        taken: false,
        time: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [todayLog, setTodayLog] = useState(null);

    useEffect(() => {
        fetchTodayVitals();
    }, []);

    const fetchTodayVitals = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/vitals/today`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            if (response.data.vitals) {
                setVitalsData(response.data.vitals);
                setTodayLog(response.data.vitals);
            }
        } catch (err) {
            console.error('Error fetching vitals data:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('bloodPressure.')) {
            const field = name.split('.')[1];
            setVitalsData(prev => ({
                ...prev,
                bloodPressure: {
                    ...prev.bloodPressure,
                    [field]: value
                }
            }));
        } else {
            setVitalsData(prev => ({
                ...prev,
                [name]: value
            }));
        }
        setError('');
        setSuccess('');
    };

    const handleMedicationChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentMedication(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addMedication = () => {
        if (!currentMedication.name || !currentMedication.dosage || !currentMedication.time) {
            setError('Please fill in all medication fields');
            return;
        }

        setVitalsData(prev => ({
            ...prev,
            medications: [...prev.medications, { ...currentMedication }]
        }));

        setCurrentMedication({
            name: '',
            dosage: '',
            taken: false,
            time: ''
        });
    };

    const removeMedication = (index) => {
        setVitalsData(prev => ({
            ...prev,
            medications: prev.medications.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/vitals`,
                vitalsData,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            
            setSuccess('Vitals data logged successfully!');
            fetchTodayVitals();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log vitals data');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="vitals-container">
                <div className="vitals-header">
                    <h2>Track Your Vitals</h2>
                    <p>Monitor your key health indicators</p>
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

                <form onSubmit={handleSubmit} className="vitals-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="weight">Weight (kg)</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={vitalsData.weight}
                                onChange={handleChange}
                                step="0.1"
                                min="0"
                                placeholder="Enter weight"
                            />
                        </div>

                        <div className="form-group">
                            <label>Blood Pressure (mmHg)</label>
                            <div className="blood-pressure-inputs">
                                <input
                                    type="number"
                                    name="bloodPressure.systolic"
                                    value={vitalsData.bloodPressure.systolic}
                                    onChange={handleChange}
                                    placeholder="Systolic"
                                    min="0"
                                    max="300"
                                />
                                <span>/</span>
                                <input
                                    type="number"
                                    name="bloodPressure.diastolic"
                                    value={vitalsData.bloodPressure.diastolic}
                                    onChange={handleChange}
                                    placeholder="Diastolic"
                                    min="0"
                                    max="200"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="heartRate">Heart Rate (bpm)</label>
                            <input
                                type="number"
                                id="heartRate"
                                name="heartRate"
                                value={vitalsData.heartRate}
                                onChange={handleChange}
                                min="0"
                                max="250"
                                placeholder="Enter heart rate"
                            />
                        </div>
                    </div>

                    <div className="medications-section">
                        <h3>Medications</h3>
                        <div className="medication-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Medication Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currentMedication.name}
                                        onChange={handleMedicationChange}
                                        placeholder="Enter medication name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Dosage</label>
                                    <input
                                        type="text"
                                        name="dosage"
                                        value={currentMedication.dosage}
                                        onChange={handleMedicationChange}
                                        placeholder="e.g., 500mg"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={currentMedication.time}
                                        onChange={handleMedicationChange}
                                    />
                                </div>

                                <div className="form-group checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="taken"
                                            checked={currentMedication.taken}
                                            onChange={handleMedicationChange}
                                        />
                                        Taken
                                    </label>
                                </div>
                            </div>

                            <button 
                                type="button" 
                                onClick={addMedication}
                                className="add-medication-button"
                            >
                                Add Medication
                            </button>
                        </div>

                        {vitalsData.medications.length > 0 && (
                            <div className="medications-list">
                                <h4>Today's Medications</h4>
                                {vitalsData.medications.map((med, index) => (
                                    <div key={index} className="medication-item">
                                        <div className="medication-info">
                                            <span className="medication-name">{med.name}</span>
                                            <span className="medication-details">
                                                {med.dosage} - {med.time}
                                            </span>
                                            <span className={`medication-status ${med.taken ? 'taken' : ''}`}>
                                                {med.taken ? '✓ Taken' : 'Not taken'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            className="remove-medication"
                                            onClick={() => removeMedication(index)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save Vitals'}
                    </button>
                </form>

                {todayLog && (
                    <div className="vitals-summary">
                        <h3>Today's Vitals Summary</h3>
                        <div className="summary-stats">
                            {todayLog.weight && (
                                <div className="stat">
                                    <label>Weight</label>
                                    <span>{todayLog.weight} kg</span>
                                </div>
                            )}
                            {todayLog.bloodPressure?.systolic && todayLog.bloodPressure?.diastolic && (
                                <div className="stat">
                                    <label>Blood Pressure</label>
                                    <span>{todayLog.bloodPressure.systolic}/{todayLog.bloodPressure.diastolic} mmHg</span>
                                </div>
                            )}
                            {todayLog.heartRate && (
                                <div className="stat">
                                    <label>Heart Rate</label>
                                    <span>{todayLog.heartRate} bpm</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Vitals;
