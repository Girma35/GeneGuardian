import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, ExternalLink, Search, Filter, Clock, User } from 'lucide-react';
import { useUser } from '../context/UserContext';

const LearningHub = () => {
  const { userRole } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: "Introduction to CRISPR Gene Editing",
      type: "video",
      category: "biotechnology",
      duration: "15 min",
      difficulty: "beginner",
      description: "Learn the basics of CRISPR-Cas9 technology and its applications in modern medicine.",
      url: "https://example.com/crispr-intro",
      thumbnail: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Sarah Chen",
      tags: ["CRISPR", "gene editing", "biotechnology"]
    },
    {
      id: 2,
      title: "Understanding Genetic Inheritance Patterns",
      type: "article",
      category: "genetics",
      duration: "8 min read",
      difficulty: "intermediate",
      description: "Explore different inheritance patterns and how traits are passed from parents to offspring.",
      url: "https://example.com/inheritance-patterns",
      thumbnail: "https://images.pexels.com/photos/3938026/pexels-photo-3938026.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Prof. Michael Rodriguez",
      tags: ["genetics", "inheritance", "mendel"]
    },
    {
      id: 3,
      title: "Pharmacogenomics: Personalized Medicine",
      type: "infographic",
      category: "medicine",
      duration: "5 min",
      difficulty: "intermediate",
      description: "Visual guide to how genetic variations affect drug responses and treatment outcomes.",
      url: "https://example.com/pharmacogenomics",
      thumbnail: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Lisa Wang",
      tags: ["pharmacogenomics", "medicine", "personalized"]
    },
    {
      id: 4,
      title: "DNA Sequencing Technologies Overview",
      type: "guide",
      category: "biotechnology",
      duration: "12 min read",
      difficulty: "advanced",
      description: "Comprehensive guide to modern DNA sequencing methods and their applications.",
      url: "https://example.com/dna-sequencing",
      thumbnail: "https://images.pexels.com/photos/3938024/pexels-photo-3938024.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. James Park",
      tags: ["sequencing", "DNA", "technology"]
    },
    {
      id: 5,
      title: "Genetic Counseling in Clinical Practice",
      type: "video",
      category: "medicine",
      duration: "20 min",
      difficulty: "intermediate",
      description: "Learn about the role of genetic counselors in healthcare and patient education.",
      url: "https://example.com/genetic-counseling",
      thumbnail: "https://images.pexels.com/photos/3938025/pexels-photo-3938025.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Amanda Thompson",
      tags: ["counseling", "genetics", "healthcare"]
    },
    {
      id: 6,
      title: "Synthetic Biology: Engineering Life",
      type: "article",
      category: "biotechnology",
      duration: "10 min read",
      difficulty: "advanced",
      description: "Explore the emerging field of synthetic biology and its potential applications.",
      url: "https://example.com/synthetic-biology",
      thumbnail: "https://images.pexels.com/photos/3938027/pexels-photo-3938027.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Prof. Robert Kim",
      tags: ["synthetic biology", "engineering", "biotechnology"]
    },
    {
      id: 7,
      title: "Epigenetics and Gene Expression",
      type: "guide",
      category: "genetics",
      duration: "15 min read",
      difficulty: "intermediate",
      description: "Understanding how environmental factors can influence gene expression without changing DNA.",
      url: "https://example.com/epigenetics",
      thumbnail: "https://images.pexels.com/photos/3938028/pexels-photo-3938028.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Dr. Maria Garcia",
      tags: ["epigenetics", "expression", "environment"]
    },
    {
      id: 8,
      title: "Bioethics in Genetic Research",
      type: "article",
      category: "ethics",
      duration: "12 min read",
      difficulty: "intermediate",
      description: "Examining ethical considerations in genetic research and biotechnology applications.",
      url: "https://example.com/bioethics",
      thumbnail: "https://images.pexels.com/photos/3938029/pexels-photo-3938029.jpeg?auto=compress&cs=tinysrgb&w=400",
      author: "Prof. David Johnson",
      tags: ["ethics", "research", "biotechnology"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length },
    { id: 'genetics', name: 'Genetics', count: resources.filter(r => r.category === 'genetics').length },
    { id: 'biotechnology', name: 'Biotechnology', count: resources.filter(r => r.category === 'biotechnology').length },
    { id: 'medicine', name: 'Medicine', count: resources.filter(r => r.category === 'medicine').length },
    { id: 'ethics', name: 'Ethics', count: resources.filter(r => r.category === 'ethics').length }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video size={16} className="text-red-500" />;
      case 'article':
        return <FileText size={16} className="text-blue-500" />;
      case 'guide':
        return <BookOpen size={16} className="text-green-500" />;
      case 'infographic':
        return <FileText size={16} className="text-purple-500" />;
      default:
        return <FileText size={16} className="text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
            <BookOpen size={60} className="text-blue-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Learning Hub
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {userRole === 'Student' 
              ? 'Explore curated resources to deepen your understanding of genetics and biotechnology'
              : 'Comprehensive educational materials for teaching genetics and biotechnology concepts'
            }
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Filter size={20} className="absolute left-3 top-3 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resource Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="bg-white rounded-full p-2 shadow-md">
                    {getTypeIcon(resource.type)}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>{resource.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User size={14} />
                    <span>{resource.author}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(resource.url, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Access Resource</span>
                  <ExternalLink size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No Resources Found</h3>
            <p className="text-gray-500">
              Try adjusting your search terms or category filter
            </p>
          </motion.div>
        )}

        {/* Featured Section for Educators */}
        {userRole === 'Educator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Educator Resources</h2>
            <p className="text-lg mb-6">
              Access lesson plans, assessment tools, and interactive activities designed specifically for classroom use.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Lesson Plans</h3>
                <p className="text-sm text-emerald-100">
                  Ready-to-use lesson plans covering key genetics topics
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Assessment Tools</h3>
                <p className="text-sm text-emerald-100">
                  Quizzes, rubrics, and evaluation materials
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Interactive Activities</h3>
                <p className="text-sm text-emerald-100">
                  Hands-on experiments and simulation guides
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;