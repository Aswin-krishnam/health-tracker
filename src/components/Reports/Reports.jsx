import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../Dashboard/DashboardLayout';
import './Reports.css';

const Reports = () => {
    const [reportsData, setReportsData] = useState({
        exercise: {
            totalWorkouts: 0,
            totalMinutes: 0,
            totalCalories: 0,
            workoutsByType: {}
        },
        sleep: {
            averageDuration: 0,
            qualityDistribution: {
                Excellent: 0,
                Good: 0,
                Fair: 0,
                Poor: 0
            },
            totalSleepHours: 0,
            daysLogged: 0
        },
        hydration: {
            averageIntake: 0,
            totalIntake: 0,
            daysLogged: 0,
            targetAchievedDays: 0
        },
        nutrition: {
            averageCalories: 0,
            totalMeals: 0,
            mealTypeDistribution: {},
            macroAverages: {
                protein: 0,
                carbs: 0,
                fats: 0
            }
        }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReportsData();
    }, []);

    const fetchReportsData = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const [exerciseStats, sleepStats, hydrationStats, nutritionStats] = await Promise.all([
                axios.get(`${process.env.REACT_APP_API_URL}/api/exercise/stats`, { headers }),
                axios.get(`${process.env.REACT_APP_API_URL}/api/sleep/stats`, { headers }),
                axios.get(`${process.env.REACT_APP_API_URL}/api/hydration/stats`, { headers }),
                axios.get(`${process.env.REACT_APP_API_URL}/api/nutrition/stats`, { headers })
            ]);

            setReportsData({
                exercise: exerciseStats.data,
                sleep: sleepStats.data,
                hydration: hydrationStats.data,
                nutrition: nutritionStats.data
            });
            setError('');
        } catch (err) {
            setError('Failed to load reports data');
            console.error('Error fetching reports data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getQualityEmoji = (quality) => {
        switch (quality) {
            case 'Excellent': return '🌟';
            case 'Good': return '😊';
            case 'Fair': return '😐';
            case 'Poor': return '😴';
            default: return '';
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="reports-loading">Loading your health insights...</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="reports-container">
                <div className="reports-header">
                    <h2>Health Reports & Analytics</h2>
                    <p>View insights from your health tracking data</p>
                </div>

                {error && (
                    <div className="alert error">
                        <span>❌</span> {error}
                    </div>
                )}

                <div className="reports-grid">
                    {/* Exercise Report */}
                    <div className="report-card">
                        <h3>💪 Exercise Summary</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <label>Total Workouts</label>
                                <span>{reportsData.exercise.totalWorkouts}</span>
                            </div>
                            <div className="stat-item">
                                <label>Total Minutes</label>
                                <span>{reportsData.exercise.totalMinutes}</span>
                            </div>
                            <div className="stat-item">
                                <label>Calories Burned</label>
                                <span>{reportsData.exercise.totalCalories}</span>
                            </div>
                        </div>
                        {Object.keys(reportsData.exercise.workoutsByType).length > 0 && (
                            <div className="workout-distribution">
                                <h4>Workout Types</h4>
                                <div className="distribution-list">
                                    {Object.entries(reportsData.exercise.workoutsByType).map(([type, count]) => (
                                        <div key={type} className="distribution-item">
                                            <span>{type}</span>
                                            <span>{count} times</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sleep Report */}
                    <div className="report-card">
                        <h3>😴 Sleep Analysis</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <label>Average Duration</label>
                                <span>{Math.round(reportsData.sleep.averageDuration * 10) / 10}h</span>
                            </div>
                            <div className="stat-item">
                                <label>Days Tracked</label>
                                <span>{reportsData.sleep.daysLogged}</span>
                            </div>
                            <div className="stat-item">
                                <label>Total Hours</label>
                                <span>{Math.round(reportsData.sleep.totalSleepHours)}</span>
                            </div>
                        </div>
                        <div className="quality-distribution">
                            <h4>Sleep Quality Distribution</h4>
                            <div className="distribution-list">
                                {Object.entries(reportsData.sleep.qualityDistribution).map(([quality, count]) => (
                                    <div key={quality} className="distribution-item">
                                        <span>{getQualityEmoji(quality)} {quality}</span>
                                        <span>{count} days</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hydration Report */}
                    <div className="report-card">
                        <h3>💧 Hydration Insights</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <label>Average Daily Intake</label>
                                <span>{Math.round(reportsData.hydration.averageIntake / 100) / 10}L</span>
                            </div>
                            <div className="stat-item">
                                <label>Days Tracked</label>
                                <span>{reportsData.hydration.daysLogged}</span>
                            </div>
                            <div className="stat-item">
                                <label>Target Achieved</label>
                                <span>{reportsData.hydration.targetAchievedDays} days</span>
                            </div>
                        </div>
                    </div>

                    {/* Nutrition Report */}
                    <div className="report-card">
                        <h3>🥗 Nutrition Overview</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <label>Average Calories</label>
                                <span>{Math.round(reportsData.nutrition.averageCalories)} kcal</span>
                            </div>
                            <div className="stat-item">
                                <label>Total Meals</label>
                                <span>{reportsData.nutrition.totalMeals}</span>
                            </div>
                        </div>
                        <div className="macro-averages">
                            <h4>Average Macros</h4>
                            <div className="distribution-list">
                                <div className="distribution-item">
                                    <span>Protein</span>
                                    <span>{Math.round(reportsData.nutrition.macroAverages.protein)}g</span>
                                </div>
                                <div className="distribution-item">
                                    <span>Carbs</span>
                                    <span>{Math.round(reportsData.nutrition.macroAverages.carbs)}g</span>
                                </div>
                                <div className="distribution-item">
                                    <span>Fats</span>
                                    <span>{Math.round(reportsData.nutrition.macroAverages.fats)}g</span>
                                </div>
                            </div>
                        </div>
                        {Object.keys(reportsData.nutrition.mealTypeDistribution).length > 0 && (
                            <div className="meal-distribution">
                                <h4>Meal Distribution</h4>
                                <div className="distribution-list">
                                    {Object.entries(reportsData.nutrition.mealTypeDistribution).map(([type, count]) => (
                                        <div key={type} className="distribution-item">
                                            <span>{type}</span>
                                            <span>{count} times</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;
