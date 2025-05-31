import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user types
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const response = await axios.post("http://localhost:8080/login", formData);
            const { token, name } = response.data;
            
            // Save token and user info
            localStorage.setItem('token', token);
            localStorage.setItem('userName', name);
            
            // Success animation
            document.querySelector('.eduai-auth-box').classList.add('success-animation');
            
            // Redirect to dashboard after animation
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
            
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please check your credentials.");
            // Error shake animation
            const form = document.querySelector('.eduai-auth-form');
            form.classList.add('error-shake');
            setTimeout(() => form.classList.remove('error-shake'), 500);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="eduai-auth-container">
            <canvas id="particles-canvas" className="eduai-particles"></canvas>
            
            <div className="eduai-auth-box">
                <div className="eduai-auth-logo">
                    <span className="eduai-logo-icon">💪</span>
                    <h1>Health Tracker</h1>
                </div>
                
                <h2 className="eduai-auth-title">Welcome Back!</h2>
                <p className="eduai-auth-subtitle">Continue your health journey</p>
                
                {error && (
                    <div className="eduai-auth-error">
                        <span className="eduai-error-icon">⚠️</span>
                        {error}
                    </div>
                )}
                
                <form className="eduai-auth-form" onSubmit={handleSubmit}>
                    <div className="eduai-form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="eduai-input-wrapper">
                            <span className="eduai-input-icon">✉️</span>
                            <input 
                                id="email"
                                name="email"
                                type="email" 
                                placeholder="yourname@example.com" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="eduai-form-group">
                        <label htmlFor="password">Password</label>
                        <div className="eduai-input-wrapper">
                            <span className="eduai-input-icon">🔒</span>
                            <input 
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                placeholder="Enter your password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                            <button 
                                type="button" 
                                className="eduai-password-toggle" 
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "👁️" : "👁️‍🗨️"}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`eduai-auth-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? <span className="eduai-spinner"></span> : 'Login'}
                    </button>
                </form>
                
                <p className="eduai-auth-redirect">
                    Don't have an account? 
                    <button className="eduai-redirect-link" onClick={() => navigate("/signup")}>
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
