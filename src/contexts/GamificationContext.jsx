import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import { db } from '../utils/firebase.js';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);

  // Carregar dados do Firebase
  useEffect(() => {
    const loadGamificationData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.id);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists() && userDoc.data().gamification) {
            const { points, level, achievements } = userDoc.data().gamification;
            setPoints(points || 0);
            setLevel(level || 1);
            setAchievements(achievements || []);
          } else {
            // Criar documento inicial se não existir
            await setDoc(userDocRef, {
              email: user.email,
              gamification: { points: 0, level: 1, achievements: [] }
            }, { merge: true });
          }
        } catch (error) {
          console.error("Erro ao carregar dados de gamificação:", error);
        }
      }
    };
    loadGamificationData();
  }, [user]);

  // Salvar dados no Firebase
  const saveToFirebase = async (newData) => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.id);
        await updateDoc(userDocRef, {
          gamification: newData
        });
      } catch (error) {
        console.error("Erro ao salvar dados de gamificação:", error);
      }
    }
  };

  const addPoints = (amount) => {
    setPoints(prev => {
      const newPoints = prev + amount;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      const newData = { points: newPoints, level: newLevel > level ? newLevel : level, achievements };
      
      if (newLevel > level) {
        setLevel(newLevel);
      }
      
      saveToFirebase(newData);
      return newPoints;
    });
  };

  const unlockAchievement = (achievementId) => {
    if (!achievements.includes(achievementId)) {
      const newAchievements = [...achievements, achievementId];
      setAchievements(newAchievements);
      const newPoints = points + 500;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      
      const newData = { points: newPoints, level: newLevel, achievements: newAchievements };
      setPoints(newPoints);
      if (newLevel > level) setLevel(newLevel);
      
      saveToFirebase(newData);
    }
  };

  return (
    <GamificationContext.Provider value={{ points, level, achievements, addPoints, unlockAchievement }}>
      {children}
    </GamificationContext.Provider>
  );
};
