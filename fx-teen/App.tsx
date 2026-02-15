import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Academy from './pages/Academy';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* The Master Landing Page */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        
        {/* Dedicated Pages */}
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth Routes (No Main Navbar/Footer typically, or uses AuthLayout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academy" element={<Academy />} />
        
        {/* Fallback routes for legacy compatibility if needed */}
        <Route path="/about" element={<Layout><Home /></Layout>} />
        <Route path="/testimonials" element={<Layout><Home /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;