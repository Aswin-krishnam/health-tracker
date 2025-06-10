import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <span className="app-logo">💪</span>
                    <h1>Health Tracker</h1>
                </div>
                
                <nav className="sidebar-nav">
                    <button 
                        className="nav-item active" 
                        onClick={() => navigate('/dashboard')}
                    >
                        📊 Dashboard
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/tracking/daily')}
                    >
                        📝 Daily Log
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/tracking/exercise')}
                    >
                        💪 Exercise
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/tracking/nutrition')}
                    >
                        🥗 Nutrition
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/tracking/sleep')}
                    >
                        😴 Sleep
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/tracking/custom-logs')}
                    >
                        📋 Custom Logs
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/tracking/hydration')}
                    >
                        💧 Hydration
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/tracking/vitals')}
                    >
                        ❤️ Vitals
                    </button>                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/reports')}
                    >
                        📈 Reports
                    </button>
                    <button 
                        className="nav-item" 
                        onClick={() => navigate('/settings/email')}
                    >
                        ✉️ Email Settings
                    </button>
                </nav>
            </aside>

            <main className="dashboard-main">
                <header className="dashboard-header">
                    <div className="header-welcome">
                        Welcome back, <span className="user-name">{userName || 'User'}</span>!
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </header>

                <div className="dashboard-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
