import React, { useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Dashboard/DashboardLayout';
import './Exercise.css';

const Exercise = () => {
    const [exercise, setExercise] = useState({
        type: '',
        duration: '',
        intensity: 'Medium',
        caloriesBurned: '',
        notes: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const exerciseTypes = [
        '🏃‍♂️ Running',
        '🚶‍♂️ Walking',
        '🚴‍♂️ Cycling',
        '🏋️‍♂️ Weight Training',
        '🧘‍♂️ Yoga',
        '🏊‍♂️ Swimming',
        '💪 HIIT',
        '🎾 Sports',
        '⚽ Football',
        '🏸 Badminton'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercise(prev => ({
            ...prev,
            [name]: value
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
                `${process.env.REACT_APP_API_URL}/api/exercise`, 
                exercise,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            
            setSuccess('Exercise logged successfully!');
            // Reset form
            setExercise({
                type: '',
                duration: '',
                intensity: 'Medium',
                caloriesBurned: '',
                notes: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log exercise');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="exercise-container">
                <div className="exercise-header">
                    <h2>Track Your Exercise</h2>
                    <p>Log your workouts to monitor your fitness journey</p>
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

                <form onSubmit={handleSubmit} className="exercise-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="type">Exercise Type</label>
                            <select
                                id="type"
                                name="type"
                                value={exercise.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Type</option>
                                {exerciseTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration">Duration (minutes)</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={exercise.duration}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="intensity">Intensity</label>
                            <select
                                id="intensity"
                                name="intensity"
                                value={exercise.intensity}
                                onChange={handleChange}
                                required
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="caloriesBurned">Calories Burned</label>
                            <input
                                type="number"
                                id="caloriesBurned"
                                name="caloriesBurned"
                                value={exercise.caloriesBurned}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={exercise.notes}
                            onChange={handleChange}
                            placeholder="Add any additional notes about your workout..."
                            rows="3"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging...' : 'Log Exercise'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default Exercise;
