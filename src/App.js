import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Import components
import HomePage from './components/HomePage';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Add more routes here as you build more features:
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/sleep" element={<Sleep />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/reports" element={<Reports />} /> 
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
