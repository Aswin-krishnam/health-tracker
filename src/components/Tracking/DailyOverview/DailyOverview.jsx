import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Dashboard/DashboardLayout';
import './DailyOverview.css';

const DailyOverview = () => {
    const [dailyData, setDailyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [mood, setMood] = useState('Good');

    useEffect(() => {
        fetchDailyData();
    }, []);

    const fetchDailyData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/daily/today`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setDailyData(response.data);
            if (response.data.mood) {
                setMood(response.data.mood);
            }
            setError('');
        } catch (err) {
            setError('Failed to fetch daily data');
            console.error('Error fetching daily data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMoodSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/daily/mood`,
                { mood },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            fetchDailyData();
        } catch (err) {
            setError('Failed to update mood');
        }
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'Not logged';
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="daily-overview-loading">Loading your daily summary...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="daily-overview-container">
                <div className="daily-overview-header">
                    <h2>Today's Overview</h2>
                    <p>Track and monitor your daily health metrics</p>
                </div>

                {error && (
                    <div className="alert error">
                        <span>❌</span> {error}
                    </div>
                )}

                <div className="mood-tracker">
                    <h3>How are you feeling today?</h3>
                    <form onSubmit={handleMoodSubmit} className="mood-form">
                        <select 
                            value={mood} 
                            onChange={(e) => setMood(e.target.value)}
                            className="mood-select"
                        >
                            <option value="Great">😄 Great</option>
                            <option value="Good">🙂 Good</option>
                            <option value="Okay">😐 Okay</option>
                            <option value="Poor">😕 Poor</option>
                            <option value="Terrible">😢 Terrible</option>
                        </select>
                        <button type="submit" className="mood-submit">Update Mood</button>
                    </form>
                </div>

                <div className="metrics-grid">
                    <div className="metric-card">
                        <h3>💧 Hydration</h3>
                        <div className="metric-content">
                            <div className="metric-item">
                                <label>Water Intake:</label>
                                <span>{dailyData?.hydration?.waterIntake ? `${dailyData.hydration.waterIntake}ml` : 'Not logged'}</span>
                            </div>
                            <div className="metric-item">
                                <label>Daily Target:</label>
                                <span>{dailyData?.hydration?.target ? `${dailyData.hydration.target}ml` : '2000ml'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="metric-card">
                        <h3>💪 Exercise</h3>
                        <div className="metric-content">
                            {dailyData?.exercise && dailyData.exercise.length > 0 ? (
                                dailyData.exercise.map((exercise, index) => (
                                    <div key={index} className="exercise-item">
                                        <span className="exercise-type">{exercise.type}</span>
                                        <span className="exercise-details">
                                            {exercise.duration}min | {exercise.intensity} intensity
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="no-data">No exercises logged today</p>
                            )}
                        </div>
                    </div>

                    <div className="metric-card">
                        <h3>😴 Sleep</h3>
                        <div className="metric-content">
                            {dailyData?.sleep ? (
                                <>
                                    <div className="metric-item">
                                        <label>Duration:</label>
                                        <span>{dailyData.sleep.duration} hours</span>
                                    </div>
                                    <div className="metric-item">
                                        <label>Quality:</label>
                                        <span>{dailyData.sleep.quality}</span>
                                    </div>
                                    <div className="metric-item">
                                        <label>Sleep Time:</label>
                                        <span>{formatTime(dailyData.sleep.sleepTime)}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="no-data">No sleep data logged today</p>
                            )}
                        </div>
                    </div>

                    <div className="metric-card">
                        <h3>🍽️ Nutrition</h3>
                        <div className="metric-content">
                            {dailyData?.nutrition?.meals && dailyData.nutrition.meals.length > 0 ? (
                                <>
                                    {dailyData.nutrition.meals.map((meal, index) => (
                                        <div key={index} className="meal-item">
                                            <span className="meal-type">{meal.type}</span>
                                            <span className="meal-calories">
                                                {meal.foods.reduce((acc, food) => acc + food.calories, 0)} cal
                                            </span>
                                        </div>
                                    ))}
                                    <div className="total-calories">
                                        Total: {dailyData.nutrition.totalCalories} calories
                                    </div>
                                </>
                            ) : (
                                <p className="no-data">No meals logged today</p>
                            )}
                        </div>
                    </div>

                    <div className="metric-card">
                        <h3>❤️ Vitals</h3>
                        <div className="metric-content">
                            {dailyData?.vitals ? (
                                <>
                                    {dailyData.vitals.weight && (
                                        <div className="metric-item">
                                            <label>Weight:</label>
                                            <span>{dailyData.vitals.weight} kg</span>
                                        </div>
                                    )}
                                    {dailyData.vitals.bloodPressure && (
                                        <div className="metric-item">
                                            <label>Blood Pressure:</label>
                                            <span>
                                                {dailyData.vitals.bloodPressure.systolic}/
                                                {dailyData.vitals.bloodPressure.diastolic} mmHg
                                            </span>
                                        </div>
                                    )}
                                    {dailyData.vitals.heartRate && (
                                        <div className="metric-item">
                                            <label>Heart Rate:</label>
                                            <span>{dailyData.vitals.heartRate} bpm</span>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="no-data">No vitals logged today</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DailyOverview;
