import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userRole: 'Student' | 'Educator';
  setUserRole: (role: 'Student' | 'Educator') => void;
  quizScore: number;
  setQuizScore: (score: number) => void;
  riskResults: any;
  setRiskResults: (results: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'Student' | 'Educator'>('Student');
  const [quizScore, setQuizScore] = useState(0);
  const [riskResults, setRiskResults] = useState(null);

  return (
    <UserContext.Provider value={{
      userRole,
      setUserRole,
      quizScore,
      setQuizScore,
      riskResults,
      setRiskResults
    }}>
      {children}
    </UserContext.Provider>
  );
};