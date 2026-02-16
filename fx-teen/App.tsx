import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from './constants';
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
  // THE "CODE SIGNATURE" (The Watermark)
  useEffect(() => {
    console.log(
      "%c FX TEEN - BUILT BY A WEB ELITE %c ARCHITECTURE ONLINE ",
      "background: #00FFA3; color: #0B0F19; font-weight: bold; padding: 5px; border-radius: 4px 0 0 4px;",
      "background: #0B0F19; color: #00FFA3; border: 1px solid #00FFA3; padding: 4px; border-radius: 0 4px 4px 0;"
    );
    console.log("%c SYSTEM ONLINE: Haptic Engine & Magnetic Physics Loaded.", "color: #B0B8C1; font-family: monospace;");
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* The Master Landing Page (Monolith - No Layout Wrapper) */}
        <Route path="/" element={<Home />} />
        
        {/* Hash Anchor Routes mapped to Home */}
        <Route path="hero" element={<Home />} />
        
        {/* Other Pages wrapped in Layout */}
        <Route path="academy" element={<Layout><Home /></Layout>} />
        <Route path="testimonials" element={<Layout><Home /></Layout>} />
        <Route path="contact" element={<Layout><Home /></Layout>} />
        <Route path="registration" element={<Layout><Home /></Layout>} />
        <Route path="login" element={<Layout><Home /></Layout>} />

        {/* Dedicated Pages */}
        {/* <Route path="/contact" element={<Contact />} /> */} 
        
        {/* App Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Legacy/Direct Access Pages */}
        <Route path="/login-page" element={<Login />} />
        <Route path="/register-page" element={<Register />} />
        <Route path="/academy-page" element={<Academy />} />
      </Routes>
    </Router>
  );
};

export default App;