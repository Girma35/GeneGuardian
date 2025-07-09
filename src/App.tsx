import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DNARiskSimulator from './pages/DNARiskSimulator';
import BiologyQuiz from './pages/BiologyQuiz';
import LearningHub from './pages/LearningHub';
import DataDashboard from './pages/DataDashboard';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50">
          <Navbar />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-16"
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dna-simulator" element={<DNARiskSimulator />} />
              <Route path="/biology-quiz" element={<BiologyQuiz />} />
              <Route path="/learning-hub" element={<LearningHub />} />
              <Route path="/data-dashboard" element={<DataDashboard />} />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;