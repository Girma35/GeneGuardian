import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { useUser } from '../context/UserContext';

const BiologyQuiz = () => {
  const { userRole, setQuizScore } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What is CRISPR-Cas9 primarily used for?",
      options: [
        "Gene editing and modification",
        "Protein synthesis",
        "DNA replication",
        "Cell division"
      ],
      correct: 0,
      explanation: "CRISPR-Cas9 is a revolutionary gene-editing technology that allows precise modification of DNA sequences."
    },
    {
      question: "Which genetic variant is associated with increased Alzheimer's risk?",
      options: [
        "BRCA1",
        "APOE4",
        "CFTR",
        "HTT"
      ],
      correct: 1,
      explanation: "The APOE4 variant significantly increases the risk of developing Alzheimer's disease."
    },
    {
      question: "What percentage of human DNA is shared with chimpanzees?",
      options: [
        "85%",
        "92%",
        "96%",
        "99%"
      ],
      correct: 2,
      explanation: "Humans share approximately 96% of their DNA with chimpanzees, making them our closest living relatives."
    },
    {
      question: "Which process describes the creation of RNA from DNA?",
      options: [
        "Translation",
        "Transcription",
        "Replication",
        "Mutation"
      ],
      correct: 1,
      explanation: "Transcription is the process where RNA is synthesized from a DNA template."
    },
    {
      question: "What is pharmacogenomics?",
      options: [
        "Study of drug manufacturing",
        "Study of how genes affect drug response",
        "Study of drug side effects",
        "Study of drug interactions"
      ],
      correct: 1,
      explanation: "Pharmacogenomics studies how genetic variations affect individual responses to medications."
    },
    {
      question: "Which technique is used to amplify DNA sequences?",
      options: [
        "PCR (Polymerase Chain Reaction)",
        "Gel electrophoresis",
        "DNA sequencing",
        "Chromatography"
      ],
      correct: 0,
      explanation: "PCR is a technique used to amplify specific DNA sequences, making millions of copies."
    },
    {
      question: "What is the main function of tumor suppressor genes?",
      options: [
        "Promote cell growth",
        "Prevent uncontrolled cell division",
        "Increase mutation rates",
        "Enhance DNA replication"
      ],
      correct: 1,
      explanation: "Tumor suppressor genes normally prevent uncontrolled cell division and cancer development."
    },
    {
      question: "Which inheritance pattern describes sickle cell anemia?",
      options: [
        "Dominant",
        "X-linked",
        "Recessive",
        "Codominant"
      ],
      correct: 2,
      explanation: "Sickle cell anemia follows an autosomal recessive inheritance pattern."
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
        setQuizScore(score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0));
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizComplete(false);
  };

  const getScoreColor = () => {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
    const percentage = (finalScore / questions.length) * 100;
    
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = () => {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correct ? 1 : 0);
    const percentage = (finalScore / questions.length) * 100;
    
    if (percentage >= 80) return 'Excellent! You have a strong understanding of genetics!';
    if (percentage >= 60) return 'Good job! You have a solid foundation in biology.';
    return 'Keep learning! Biology is a fascinating field to explore.';
  };

  if (quizComplete) {
    const finalScore = score;
    const percentage = (finalScore / questions.length) * 100;
    
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-yellow-500 mb-6"
            >
              <Trophy size={80} className="mx-auto" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            
            <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
              {finalScore}/{questions.length}
            </div>
            
            <div className={`text-2xl font-semibold mb-6 ${getScoreColor()}`}>
              {percentage.toFixed(0)}%
            </div>
            
            <p className="text-lg text-gray-600 mb-8">
              {getScoreMessage()}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetQuiz}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <RotateCcw size={20} />
              <span>Take Quiz Again</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <Brain size={48} className="text-purple-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Biology Quiz Challenge
          </h1>
          
          <p className="text-xl text-gray-600">
            {userRole === 'Student' 
              ? 'Test your knowledge of genetics and biotechnology'
              : 'Assess student understanding of key biological concepts'
            }
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-100 px-8 py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                Score: {score}/{questions.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              />
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correct
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-red-500 bg-red-50 text-red-700'
                          : 'border-purple-500 bg-purple-50 text-purple-700'
                        : showResult && index === questions[currentQuestion].correct
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && (
                        <div>
                          {index === questions[currentQuestion].correct ? (
                            <CheckCircle size={24} className="text-green-600" />
                          ) : selectedAnswer === index ? (
                            <XCircle size={24} className="text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 p-4 bg-blue-50 rounded-lg"
                >
                  <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
                  <p className="text-blue-700">{questions[currentQuestion].explanation}</p>
                </motion.div>
              )}

              {selectedAnswer !== null && !showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiologyQuiz;