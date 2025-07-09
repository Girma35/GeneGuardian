import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import { useUser } from '../context/UserContext';

const DataDashboard = () => {
  const { userRole, riskResults } = useUser();
  const [selectedChart, setSelectedChart] = useState('trends');

  // Sample genetic data
  const diseasePrevalenceData = [
    { disease: 'Heart Disease', population: 6.2, genetic: 8.5, environmental: 4.8 },
    { disease: 'Diabetes', population: 11.3, genetic: 15.2, environmental: 8.7 },
    { disease: 'Cancer', population: 38.4, genetic: 42.1, environmental: 35.2 },
    { disease: 'Alzheimers', population: 5.8, genetic: 12.3, environmental: 3.4 },
    { disease: 'Stroke', population: 2.8, genetic: 4.2, environmental: 2.1 }
  ];

  const geneticMarkerData = [
    { name: 'APOE4', frequency: 25, riskIncrease: 300 },
    { name: 'BRCA1', frequency: 0.25, riskIncrease: 500 },
    { name: 'LDLR', frequency: 0.5, riskIncrease: 200 },
    { name: 'TCF7L2', frequency: 30, riskIncrease: 150 },
    { name: 'CFTR', frequency: 4, riskIncrease: 100 }
  ];

  const ageRiskData = [
    { age: '20-30', heartDisease: 0.1, diabetes: 0.8, cancer: 0.5, alzheimers: 0.01 },
    { age: '30-40', heartDisease: 0.5, diabetes: 1.2, cancer: 1.2, alzheimers: 0.02 },
    { age: '40-50', heartDisease: 2.1, diabetes: 3.5, cancer: 2.8, alzheimers: 0.1 },
    { age: '50-60', heartDisease: 6.8, diabetes: 8.2, cancer: 6.5, alzheimers: 0.5 },
    { age: '60-70', heartDisease: 15.2, diabetes: 15.8, cancer: 15.2, alzheimers: 2.8 },
    { age: '70+', heartDisease: 32.1, diabetes: 25.4, cancer: 28.7, alzheimers: 12.5 }
  ];

  const populationGeneticsData = [
    { population: 'European', heartDisease: 12.5, diabetes: 8.2, cancer: 22.1 },
    { population: 'African', heartDisease: 16.8, diabetes: 12.1, cancer: 18.7 },
    { population: 'Asian', heartDisease: 8.2, diabetes: 15.2, cancer: 16.5 },
    { population: 'Hispanic', heartDisease: 14.2, diabetes: 16.8, cancer: 19.2 },
    { population: 'Native American', heartDisease: 18.5, diabetes: 22.1, cancer: 20.8 }
  ];

  const geneExpressionData = [
    { gene: 'BRCA1', normal: 2.5, cancer: 0.8, ratio: 0.32 },
    { gene: 'P53', normal: 3.2, cancer: 1.2, ratio: 0.38 },
    { gene: 'APOE', normal: 1.8, cancer: 1.7, ratio: 0.94 },
    { gene: 'LDLR', normal: 2.1, cancer: 2.0, ratio: 0.95 },
    { gene: 'TCF7L2', normal: 1.5, cancer: 2.8, ratio: 1.87 }
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'trends':
        return (
          <motion.div
            key="trends"
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Disease Risk by Age Group</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={ageRiskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="heartDisease" stroke="#EF4444" strokeWidth={3} name="Heart Disease" />
                <Line type="monotone" dataKey="diabetes" stroke="#3B82F6" strokeWidth={3} name="Diabetes" />
                <Line type="monotone" dataKey="cancer" stroke="#8B5CF6" strokeWidth={3} name="Cancer" />
                <Line type="monotone" dataKey="alzheimers" stroke="#F59E0B" strokeWidth={3} name="Alzheimer's" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        );

      case 'markers':
        return (
          <motion.div
            key="markers"
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Genetic Marker Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={geneticMarkerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="frequency" name="Population Frequency (%)" />
                <YAxis dataKey="riskIncrease" name="Risk Increase (%)" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Genetic Markers" data={geneticMarkerData} fill="#10B981" />
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>
        );

      case 'populations':
        return (
          <motion.div
            key="populations"
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Disease Prevalence by Population</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={populationGeneticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="population" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="heartDisease" fill="#EF4444" name="Heart Disease" />
                <Bar dataKey="diabetes" fill="#3B82F6" name="Diabetes" />
                <Bar dataKey="cancer" fill="#8B5CF6" name="Cancer" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        );

      case 'expression':
        return (
          <motion.div
            key="expression"
            variants={chartVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Gene Expression Levels</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={geneExpressionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gene" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="normal" fill="#10B981" name="Normal Tissue" />
                <Bar dataKey="cancer" fill="#EF4444" name="Cancer Tissue" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <BarChart3 size={60} className="text-blue-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Data Dashboard
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {userRole === 'Student' 
              ? 'Explore genetic data visualizations and health trends to understand population genetics'
              : 'Interactive data visualizations for teaching genetic concepts and population health patterns'
            }
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Genetic Variants', value: '10,847', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { title: 'Population Studies', value: '1,234', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
            { title: 'Disease Associations', value: '2,567', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
            { title: 'Research Papers', value: '8,921', icon: Info, color: 'text-orange-600', bg: 'bg-orange-100' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* User Risk Results */}
        {riskResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Personal Risk Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={Object.entries(riskResults).map(([disease, risk]) => ({
                    name: disease.replace(/([A-Z])/g, ' $1').trim(),
                    value: risk
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {Object.entries(riskResults).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Chart Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Data Visualizations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { id: 'trends', title: 'Age Trends', description: 'Disease risk by age group' },
              { id: 'markers', title: 'Genetic Markers', description: 'SNP frequency vs risk' },
              { id: 'populations', title: 'Population Data', description: 'Disease prevalence by ethnicity' },
              { id: 'expression', title: 'Gene Expression', description: 'Normal vs cancer tissue' }
            ].map((chart) => (
              <motion.button
                key={chart.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedChart(chart.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedChart === chart.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-semibold mb-1">{chart.title}</div>
                <div className="text-sm text-gray-600">{chart.description}</div>
              </motion.button>
            ))}
          </div>

          {renderChart()}
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6">Key Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Age Factor</h4>
              <p className="text-sm text-blue-100">
                Disease risk increases exponentially with age, particularly after 50
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Genetic Markers</h4>
              <p className="text-sm text-blue-100">
                BRCA1 mutations show highest risk increase despite low frequency
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <h4 className="font-semibold mb-2">Population Variance</h4>
              <p className="text-sm text-blue-100">
                Significant genetic diversity exists between different populations
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataDashboard;