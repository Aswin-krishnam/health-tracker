import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../Dashboard/DashboardLayout';
import './Nutrition.css';

const Nutrition = () => {
    const [meals, setMeals] = useState([]);
    const [currentMeal, setCurrentMeal] = useState({
        type: 'Breakfast',
        foods: []
    });
    const [currentFood, setCurrentFood] = useState({
        name: '',
        calories: '',
        protein: '',
        carbs: '',
        fats: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [todayLog, setTodayLog] = useState(null);

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    useEffect(() => {
        fetchTodayNutrition();
    }, []);

    const fetchTodayNutrition = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/nutrition/today`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            if (response.data.nutrition) {
                setMeals(response.data.nutrition.meals || []);
                setTodayLog(response.data.nutrition);
            }
        } catch (err) {
            console.error('Error fetching nutrition data:', err);
        }
    };

    const handleFoodChange = (e) => {
        const { name, value } = e.target;
        setCurrentFood(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addFoodToMeal = () => {
        if (!currentFood.name || !currentFood.calories) {
            setError('Food name and calories are required');
            return;
        }
        
        setCurrentMeal(prev => ({
            ...prev,
            foods: [...prev.foods, { ...currentFood }]
        }));

        setCurrentFood({
            name: '',
            calories: '',
            protein: '',
            carbs: '',
            fats: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentMeal.foods.length === 0) {
            setError('Please add at least one food item');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/nutrition`,
                { meal: currentMeal },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            
            setSuccess('Meal logged successfully!');
            setCurrentMeal({
                type: 'Breakfast',
                foods: []
            });
            fetchTodayNutrition();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to log meal');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateTotalNutrients = (foods) => {
        return foods.reduce((acc, food) => ({
            calories: acc.calories + (Number(food.calories) || 0),
            protein: acc.protein + (Number(food.protein) || 0),
            carbs: acc.carbs + (Number(food.carbs) || 0),
            fats: acc.fats + (Number(food.fats) || 0)
        }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
    };

    return (
        <DashboardLayout>
            <div className="nutrition-container">
                <div className="nutrition-header">
                    <h2>Track Your Nutrition</h2>
                    <p>Monitor your daily meals and nutrients</p>
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

                <div className="nutrition-grid">
                    <div className="meal-form">
                        <h3>Log a New Meal</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Meal Type</label>
                                <select
                                    value={currentMeal.type}
                                    onChange={(e) => setCurrentMeal(prev => ({ ...prev, type: e.target.value }))}
                                >
                                    {mealTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="food-form">
                                <h4>Add Food Item</h4>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Food Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={currentFood.name}
                                            onChange={handleFoodChange}
                                            placeholder="e.g., Oatmeal"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Calories</label>
                                        <input
                                            type="number"
                                            name="calories"
                                            value={currentFood.calories}
                                            onChange={handleFoodChange}
                                            placeholder="kcal"
                                            min="0"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Protein (g)</label>
                                        <input
                                            type="number"
                                            name="protein"
                                            value={currentFood.protein}
                                            onChange={handleFoodChange}
                                            placeholder="grams"
                                            min="0"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Carbs (g)</label>
                                        <input
                                            type="number"
                                            name="carbs"
                                            value={currentFood.carbs}
                                            onChange={handleFoodChange}
                                            placeholder="grams"
                                            min="0"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Fats (g)</label>
                                        <input
                                            type="number"
                                            name="fats"
                                            value={currentFood.fats}
                                            onChange={handleFoodChange}
                                            placeholder="grams"
                                            min="0"
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="button" 
                                    onClick={addFoodToMeal}
                                    className="add-food-button"
                                >
                                    Add Food
                                </button>
                            </div>

                            {currentMeal.foods.length > 0 && (
                                <div className="current-meal">
                                    <h4>Current Meal Items</h4>
                                    <div className="food-list">
                                        {currentMeal.foods.map((food, index) => (
                                            <div key={index} className="food-item">
                                                <span className="food-name">{food.name}</span>
                                                <span className="food-calories">{food.calories} kcal</span>
                                                <button
                                                    type="button"
                                                    className="remove-food"
                                                    onClick={() => {
                                                        setCurrentMeal(prev => ({
                                                            ...prev,
                                                            foods: prev.foods.filter((_, i) => i !== index)
                                                        }));
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                        <div className="meal-totals">
                                            {(() => {
                                                const totals = calculateTotalNutrients(currentMeal.foods);
                                                return (
                                                    <>
                                                        <div>Total Calories: {totals.calories} kcal</div>
                                                        <div>Protein: {totals.protein}g</div>
                                                        <div>Carbs: {totals.carbs}g</div>
                                                        <div>Fats: {totals.fats}g</div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className={`submit-button ${isLoading ? 'loading' : ''}`}
                                disabled={isLoading || currentMeal.foods.length === 0}
                            >
                                {isLoading ? 'Logging...' : 'Log Meal'}
                            </button>
                        </form>
                    </div>

                    <div className="daily-summary">
                        <h3>Today's Nutrition Summary</h3>
                        {meals.length > 0 ? (
                            <div className="meals-summary">
                                {meals.map((meal, index) => (
                                    <div key={index} className="meal-summary">
                                        <h4>{meal.type}</h4>
                                        <div className="foods-list">
                                            {meal.foods.map((food, foodIndex) => (
                                                <div key={foodIndex} className="food-summary">
                                                    <span>{food.name}</span>
                                                    <span>{food.calories} kcal</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="meal-nutrients">
                                            {(() => {
                                                const totals = calculateTotalNutrients(meal.foods);
                                                return (
                                                    <>
                                                        <div>Total: {totals.calories} kcal</div>
                                                        <div>P: {totals.protein}g</div>
                                                        <div>C: {totals.carbs}g</div>
                                                        <div>F: {totals.fats}g</div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                ))}
                                <div className="daily-totals">
                                    <h4>Daily Totals</h4>
                                    {(() => {
                                        const totals = calculateTotalNutrients(
                                            meals.reduce((acc, meal) => [...acc, ...meal.foods], [])
                                        );
                                        return (
                                            <>
                                                <div>Calories: {totals.calories} kcal</div>
                                                <div>Protein: {totals.protein}g</div>
                                                <div>Carbs: {totals.carbs}g</div>
                                                <div>Fats: {totals.fats}g</div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        ) : (
                            <p className="no-meals">No meals logged today</p>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Nutrition;
