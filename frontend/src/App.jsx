// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import CounselorInterface from './pages/CounselorInterface.jsx';
import DrDetectionApp from './pages/DrDetectionApp.jsx';

function App() {
  return (
    <DrDetectionApp/>
  );
}

export default App;
