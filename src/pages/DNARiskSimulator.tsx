import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dna, User, Heart, Brain, Activity, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const DNARiskSimulator = () => {
  const { userRole, setRiskResults } = useUser();
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    familyHistory: {
      heartDisease: false,
      diabetes: false,
      cancer: false,
      alzheimers: false
    },
    lifestyle: {
      smoking: false,
      exercise: 'moderate',
      diet: 'balanced'
    },
    geneticMarkers: {
      APOE4: false,
      BRCA1: false,
      LDLR: false,
      TCF7L2: false
    }
  });

  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const simulateRisk = () => {
    setIsSimulating(true);
    
    // Simulate processing time
    setTimeout(() => {
      // Calculate risk based on form data
      const baseRisk = {
        heartDisease: 15,
        diabetes: 10,
        cancer: 12,
        alzheimers: 8
      };

      const calculatedRisk = {
        heartDisease: Math.min(95, baseRisk.heartDisease + 
          (formData.familyHistory.heartDisease ? 25 : 0) +
          (formData.lifestyle.smoking ? 20 : 0) +
          (formData.geneticMarkers.LDLR ? 30 : 0) +
          (formData.age > 50 ? 15 : 0)),
        
        diabetes: Math.min(95, baseRisk.diabetes + 
          (formData.familyHistory.diabetes ? 30 : 0) +
          (formData.lifestyle.diet === 'poor' ? 15 : 0) +
          (formData.geneticMarkers.TCF7L2 ? 25 : 0)),
        
        cancer: Math.min(95, baseRisk.cancer + 
          (formData.familyHistory.cancer ? 35 : 0) +
          (formData.lifestyle.smoking ? 25 : 0) +
          (formData.geneticMarkers.BRCA1 ? 40 : 0)),
        
        alzheimers: Math.min(95, baseRisk.alzheimers + 
          (formData.familyHistory.alzheimers ? 40 : 0) +
          (formData.geneticMarkers.APOE4 ? 35 : 0) +
          (formData.age > 65 ? 20 : 0))
      };

      setResults(calculatedRisk);
      setRiskResults(calculatedRisk);
      setIsSimulating(false);
    }, 2000);
  };

  const getRiskLevel = (percentage) => {
    if (percentage < 20) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage < 40) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (percentage < 60) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Very High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-emerald-600"
            >
              <Dna size={60} />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            DNA Risk Simulator
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {userRole === 'Student' 
              ? 'Explore how genetics and lifestyle factors influence your health risk profile'
              : 'Educational tool to demonstrate genetic risk factors and their impact on health outcomes'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <User className="mr-3 text-emerald-600" size={24} />
              Personal Information
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your age"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Heart className="mr-2 text-red-500" size={20} />
                  Family History
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.familyHistory).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNestedChange('familyHistory', key, e.target.checked)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Activity className="mr-2 text-blue-500" size={20} />
                  Lifestyle Factors
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.lifestyle.smoking}
                      onChange={(e) => handleNestedChange('lifestyle', 'smoking', e.target.checked)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Smoking</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Level</label>
                    <select
                      value={formData.lifestyle.exercise}
                      onChange={(e) => handleNestedChange('lifestyle', 'exercise', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light</option>
                      <option value="moderate">Moderate</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diet Quality</label>
                    <select
                      value={formData.lifestyle.diet}
                      onChange={(e) => handleNestedChange('lifestyle', 'diet', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="poor">Poor</option>
                      <option value="fair">Fair</option>
                      <option value="balanced">Balanced</option>
                      <option value="excellent">Excellent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Brain className="mr-2 text-purple-500" size={20} />
                  Genetic Markers (SNPs)
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.geneticMarkers).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNestedChange('geneticMarkers', key, e.target.checked)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 font-mono">{key}</span>
                    </label>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateRisk}
                disabled={isSimulating}
                className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isSimulating ? 'Analyzing DNA...' : 'Simulate Risk Profile'}
              </motion.button>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <AlertCircle className="mr-3 text-orange-500" size={24} />
              Risk Assessment Results
            </h2>

            {isSimulating ? (
              <div className="flex flex-col items-center justify-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-emerald-600 mb-4"
                >
                  <Dna size={48} />
                </motion.div>
                <p className="text-lg text-gray-600">Analyzing genetic data...</p>
              </div>
            ) : results ? (
              <div className="space-y-6">
                {Object.entries(results).map(([disease, percentage]) => {
                  const risk = getRiskLevel(percentage);
                  return (
                    <motion.div
                      key={disease}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 capitalize">
                          {disease.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${risk.bg} ${risk.color}`}>
                          {risk.level}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className={`h-2 rounded-full ${
                            percentage < 20 ? 'bg-green-500' :
                            percentage < 40 ? 'bg-yellow-500' :
                            percentage < 60 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        {percentage}% lifetime risk
                      </p>
                    </motion.div>
                  );
                })}
                
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Important Note:</h4>
                  <p className="text-sm text-blue-700">
                    This is a simplified educational simulation. Actual genetic risk assessment 
                    requires professional genetic counseling and comprehensive testing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <Dna size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-lg text-gray-500">
                  Fill out the form and click "Simulate Risk Profile" to see your results
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DNARiskSimulator;