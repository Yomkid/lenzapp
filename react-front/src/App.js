// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Head from './components/Head';
import HomePage from './pages/HomePage';
import FaceCapturePage from './pages/FaceCapturePage';
import LoginPage from './pages/LoginPage';
import CustomNavbar from './components/Navbar';
import EnrollmentPage from './pages/EnrollmentPage';

function App() {
  return (
    <HelmetProvider>
      <Head /> {/* Global Head component for meta tags and styles */}
      <Router>
        <CustomNavbar /> {/* Navbar available on all pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/face-capture" element={<FaceCapturePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/enroll" element={<EnrollmentPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
