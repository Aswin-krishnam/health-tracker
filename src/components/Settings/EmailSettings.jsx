import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../Dashboard/DashboardLayout';
import './EmailSettings.css';

const EmailSettings = () => {
    const [settings, setSettings] = useState({
        weeklyReport: true,
        dailyReminders: true,
        milestoneNotifications: true,
        reminderTime: '20:00' // Default to 8 PM
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchEmailSettings();
    }, []);

    const fetchEmailSettings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/user/email-settings`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setSettings(response.data.settings);
        } catch (err) {
            console.error('Error fetching email settings:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}/api/user/email-settings`,
                settings,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setSuccess('Email preferences updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update email preferences');
        } finally {
            setIsLoading(false);
        }
    };

    const sendTestEmail = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/email/test`,
                {},
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setSuccess('Test email sent successfully!');
        } catch (err) {
            setError('Failed to send test email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="email-settings-container">
                <div className="email-settings-header">
                    <h2>Email Notifications</h2>
                    <p>Manage your email preferences and notifications</p>
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

                <form onSubmit={handleSubmit} className="email-settings-form">
                    <div className="settings-group">
                        <h3>Reports & Analytics</h3>
                        <div className="setting-item">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="weeklyReport"
                                    checked={settings.weeklyReport}
                                    onChange={handleChange}
                                />
                                Receive Weekly Health Reports
                            </label>
                            <p className="setting-description">
                                Get a summary of your health tracking data every week
                            </p>
                        </div>
                    </div>

                    <div className="settings-group">
                        <h3>Reminders</h3>
                        <div className="setting-item">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="dailyReminders"
                                    checked={settings.dailyReminders}
                                    onChange={handleChange}
                                />
                                Daily Tracking Reminders
                            </label>
                            <p className="setting-description">
                                Receive reminders for tracking your daily health activities
                            </p>
                        </div>
                        <div className="setting-item">
                            <label htmlFor="reminderTime">Reminder Time</label>
                            <input
                                type="time"
                                id="reminderTime"
                                name="reminderTime"
                                value={settings.reminderTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="settings-group">
                        <h3>Achievements</h3>
                        <div className="setting-item">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="milestoneNotifications"
                                    checked={settings.milestoneNotifications}
                                    onChange={handleChange}
                                />
                                Milestone Notifications
                            </label>
                            <p className="setting-description">
                                Get notified when you achieve health milestones
                            </p>
                        </div>
                    </div>

                    <div className="button-group">
                        <button 
                            type="submit" 
                            className={`save-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Preferences'}
                        </button>
                        <button
                            type="button"
                            className="test-button"
                            onClick={sendTestEmail}
                            disabled={isLoading}
                        >
                            Send Test Email
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default EmailSettings;
