import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dna, Activity, Brain, BookOpen, BarChart3, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Home = () => {
  const { userRole } = useUser();

  const features = [
    {
      icon: Dna,
      title: 'DNA Risk Simulator',
      description: 'Explore how genetics influence health with interactive simulations',
      link: '/dna-simulator',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Brain,
      title: 'Biology Quiz Game',
      description: 'Test your knowledge with fun, gamified biology challenges',
      link: '/biology-quiz',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Learning Hub',
      description: 'Access curated resources, guides, and educational content',
      link: '/learning-hub',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Data Dashboard',
      description: 'Visualize genetic trends and health data insights',
      link: '/data-dashboard',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="text-emerald-600"
              >
                <Dna size={80} />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-6">
              GeneGuardian
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover how genetics influence health through interactive simulations, 
              educational games, and data visualization
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dna-simulator"
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Start DNA Simulation</span>
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              
              <div className="text-sm text-gray-500 bg-emerald-50 px-4 py-2 rounded-full">
                Currently in {userRole} mode
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background DNA Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-10 text-emerald-200 opacity-20"
          >
            <Dna size={60} />
          </motion.div>
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, 60, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-20 text-cyan-200 opacity-20"
          >
            <Dna size={40} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Explore Genetics & Health
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive tools and educational resources designed for {userRole.toLowerCase()}s 
              to understand the fascinating world of genetics and biotechnology
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 1
                  }}
                  className="group"
                >
                  <Link to={feature.link} className="block">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center mt-4 text-emerald-600 group-hover:translate-x-2 transition-transform duration-300">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white"
          >
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-emerald-100">Genetic Markers Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-emerald-100">Interactive Lessons</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-emerald-100">Student Engagement Rate</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;