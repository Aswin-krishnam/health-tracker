import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from './DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        todayLog: null,
        weekSummary: {
            totalWorkouts: 0,
            avgWaterIntake: 0,
            avgSleepHours: 0
        }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard/summary`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setDashboardData(response.data);
                setError('');
            } catch (err) {
                setError('Failed to load dashboard data');
                console.error('Dashboard data fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="dashboard-loading">
                    Loading your health data...
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            {error ? (
                <div className="dashboard-error">
                    {error}
                </div>
            ) : (
                <>
                    <h2 className="dashboard-title">Your Health Overview</h2>
                    
                    <div className="dashboard-grid">
                        <div className="dashboard-card">
                            <div className="card-header">
                                <h3 className="card-title">💪 Weekly Workouts</h3>
                            </div>
                            <div className="card-value">
                                {dashboardData.weekSummary.totalWorkouts}
                            </div>
                            <div className="card-subtitle">
                                workouts this week
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="card-header">
                                <h3 className="card-title">💧 Hydration</h3>
                            </div>
                            <div className="card-value">
                                {Math.round(dashboardData.weekSummary.avgWaterIntake / 1000 * 10) / 10}L
                            </div>
                            <div className="card-subtitle">
                                average daily water intake
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="card-header">
                                <h3 className="card-title">😴 Sleep</h3>
                            </div>
                            <div className="card-value">
                                {Math.round(dashboardData.weekSummary.avgSleepHours * 10) / 10}h
                            </div>
                            <div className="card-subtitle">
                                average sleep duration
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h3>Quick Actions</h3>
                        <div className="actions-grid">
                            <button onClick={() => window.location.href = '/tracking/daily'}>
                                📝 Log Today's Activities
                            </button>
                            <button onClick={() => window.location.href = '/tracking/exercise'}>
                                💪 Track Workout
                            </button>
                            <button onClick={() => window.location.href = '/tracking/nutrition'}>
                                🥗 Log Meal
                            </button>
                            <button onClick={() => window.location.href = '/tracking/sleep'}>
                                😴 Log Sleep
                            </button>
                        </div>
                    </div>
                </>
            )}
        </DashboardLayout>
    );
};

export default Dashboard;
