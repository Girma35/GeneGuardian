import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dna, Home, Activity, Brain, BookOpen, BarChart3, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const location = useLocation();
  const { userRole, setUserRole } = useUser();

  const navItems = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/dna-simulator', name: 'DNA Risk Simulator', icon: Dna },
    { path: '/biology-quiz', name: 'Biology Quiz', icon: Brain },
    { path: '/learning-hub', name: 'Learning Hub', icon: BookOpen },
    { path: '/data-dashboard', name: 'Data Dashboard', icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-emerald-600"
            >
              <Dna size={32} />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              GeneGuardian
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Role Toggle */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-emerald-100 rounded-lg p-1">
              <button
                onClick={() => setUserRole('Student')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  userRole === 'Student'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-600 hover:bg-emerald-200'
                }`}
              >
                <User size={14} />
                <span>Student</span>
              </button>
              <button
                onClick={() => setUserRole('Educator')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  userRole === 'Educator'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-600 hover:bg-emerald-200'
                }`}
              >
                <User size={14} />
                <span>Educator</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;