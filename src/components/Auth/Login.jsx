import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });    // Redirect effect
    useEffect(() => {
        // Redirect to dashboard if already logged in
        // if (localStorage.getItem('token')) {
        //     navigate('/dashboard');
        // }
    }, [navigate]);

    // Particles animation effect
    useEffect(() => {
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particles = [];
            
            // Set canvas size
            const resizeCanvas = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            // Create particles
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    color: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
                    speedX: Math.random() * 0.5 - 0.25,
                    speedY: Math.random() * 0.5 - 0.25
                });
            }
            
            // Animation function
            const animate = () => {
                requestAnimationFrame(animate);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    // Move particles
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Bounce off edges
                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                    
                    // Draw particle
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                });
                
                // Draw connections
                particles.forEach((p1, i) => {
                    particles.slice(i + 1).forEach(p2 => {
                        const distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    });
                });
            };
            
            animate();
            
            return () => {
                window.removeEventListener('resize', resizeCanvas);
            };
        }
    }, []);
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
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
