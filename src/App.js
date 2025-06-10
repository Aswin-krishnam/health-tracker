import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Import components
import HomePage from './components/HomePage';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import Hydration from './components/Tracking/Hydration/Hydration';
import Exercise from './components/Tracking/Exercise/Exercise';
import Sleep from './components/Tracking/Sleep/Sleep';
import DailyOverview from './components/Tracking/DailyOverview/DailyOverview';
import Nutrition from './components/Tracking/Nutrition/Nutrition';
import Vitals from './components/Tracking/Vitals/Vitals';
import Reports from './components/Reports/Reports';
import EmailSettings from './components/Settings/EmailSettings';
import CustomLogs from './components/Tracking/CustomLogs/CustomLogs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Tracking Routes */}
        <Route path="/tracking">
          <Route path="daily" element={
            <ProtectedRoute>
              <DailyOverview />
            </ProtectedRoute>
          } />
          <Route path="exercise" element={
            <ProtectedRoute>
              <Exercise />
            </ProtectedRoute>
          } />
          <Route path="nutrition" element={
            <ProtectedRoute>
              <Nutrition />
            </ProtectedRoute>
          } />
          <Route path="sleep" element={
            <ProtectedRoute>
              <Sleep />
            </ProtectedRoute>
          } />
          <Route path="hydration" element={
            <ProtectedRoute>
              <Hydration />
            </ProtectedRoute>
          } />
          <Route path="vitals" element={
            <ProtectedRoute>
              <Vitals />
            </ProtectedRoute>
          } />
          <Route path="custom-logs" element={
            <ProtectedRoute>
              <CustomLogs />
            </ProtectedRoute>
          } />
        </Route>

        {/* Reports Route */}
        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />

        {/* Settings Routes */}
        <Route path="/settings">
          <Route path="email" element={
            <ProtectedRoute>
              <EmailSettings />
            </ProtectedRoute>
          } />
        </Route>
        
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
