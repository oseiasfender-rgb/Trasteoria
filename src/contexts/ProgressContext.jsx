/**
 * 📊 Progress Context
 * Sistema de progressão e estatísticas do usuário
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  // Estado do progresso
  const [progress, setProgress] = useState({
    fundamentos: {
      intervalos: {},
      escalas: {},
      completed: 0,
      total: 20
    },
    harmonia: {
      camposHarmonicos: {},
      progressoes: {},
      completed: 0,
      total: 15
    },
    escalasArpejos: {
      modos: {},
      caged: {},
      arpejos: {},
      completed: 0,
      total: 25
    },
    improvisacao: {
      hierarquia: {},
      tecnicas: {},
      exercicios: {},
      completed: 0,
      total: 18
    },
    estilos: {
      jazz: {},
      blues: {},
      rock: {},
      outros: {},
      completed: 0,
      total: 12
    },
    desenvolvimento: {
      metodologia: {},
      exercicios: {},
      completed: 0,
      total: 10
    }
  });
  
  // Estatísticas gerais
  const [stats, setStats] = useState({
    totalPracticeTime: 0, // em minutos
    notesPlayed: 0,
    chordsPlayed: 0,
    scalesPlayed: 0,
    lastPracticeDate: null,
    streak: 0, // dias consecutivos
    achievements: []
  });
  
  // Carregar do localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('modosGregosProgress');
    const savedStats = localStorage.getItem('modosGregosStats');
    
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
      }
    }
    
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
      }
    }
  }, []);
  
  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('modosGregosProgress', JSON.stringify(progress));
  }, [progress]);
  
  useEffect(() => {
    localStorage.setItem('modosGregosStats', JSON.stringify(stats));
  }, [stats]);
  
  // Marcar item como completo
  const markComplete = (section, category, itemId) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      
      if (!newProgress[section][category]) {
        newProgress[section][category] = {};
      }
      
      newProgress[section][category][itemId] = true;
      
      // Recalcular completed
      const completed = Object.values(newProgress[section])
        .filter(val => typeof val === 'object')
        .reduce((acc, cat) => acc + Object.keys(cat).length, 0);
      
      newProgress[section].completed = completed;
      
      return newProgress;
    });
  };
  
  // Desmarcar item
  const markIncomplete = (section, category, itemId) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      
      if (newProgress[section][category]) {
        delete newProgress[section][category][itemId];
      }
      
      // Recalcular completed
      const completed = Object.values(newProgress[section])
        .filter(val => typeof val === 'object')
        .reduce((acc, cat) => acc + Object.keys(cat).length, 0);
      
      newProgress[section].completed = completed;
      
      return newProgress;
    });
  };
  
  // Toggle item
  const toggleComplete = (section, category, itemId) => {
    const isComplete = progress[section]?.[category]?.[itemId];
    
    if (isComplete) {
      markIncomplete(section, category, itemId);
    } else {
      markComplete(section, category, itemId);
    }
  };
  
  // Verificar se item está completo
  const isComplete = (section, category, itemId) => {
    return !!progress[section]?.[category]?.[itemId];
  };
  
  // Obter progresso de uma seção
  const getSectionProgress = (section) => {
    const sectionData = progress[section];
    if (!sectionData) return { completed: 0, total: 0, percentage: 0 };
    
    const { completed, total } = sectionData;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };
  
  // Obter progresso total
  const getTotalProgress = () => {
    let totalCompleted = 0;
    let totalItems = 0;
    
    Object.values(progress).forEach(section => {
      totalCompleted += section.completed || 0;
      totalItems += section.total || 0;
    });
    
    const percentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;
    
    return { completed: totalCompleted, total: totalItems, percentage };
  };
  
  // Incrementar estatísticas
  const incrementStat = (statName, amount = 1) => {
    setStats(prev => ({
      ...prev,
      [statName]: (prev[statName] || 0) + amount
    }));
  };
  
  // Adicionar tempo de prática
  const addPracticeTime = (minutes) => {
    setStats(prev => ({
      ...prev,
      totalPracticeTime: prev.totalPracticeTime + minutes,
      lastPracticeDate: new Date().toISOString()
    }));
    
    updateStreak();
  };
  
  // Atualizar streak
  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastPractice = stats.lastPracticeDate 
      ? new Date(stats.lastPracticeDate).toDateString()
      : null;
    
    if (lastPractice === today) {
      // Já praticou hoje
      return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastPractice === yesterdayStr) {
      // Praticou ontem, incrementar streak
      setStats(prev => ({
        ...prev,
        streak: prev.streak + 1
      }));
    } else if (lastPractice !== today) {
      // Quebrou o streak
      setStats(prev => ({
        ...prev,
        streak: 1
      }));
    }
  };
  
  // Adicionar conquista
  const addAchievement = (achievement) => {
    setStats(prev => {
      if (prev.achievements.includes(achievement)) {
        return prev;
      }
      
      return {
        ...prev,
        achievements: [...prev.achievements, achievement]
      };
    });
  };
  
  // Resetar progresso
  const resetProgress = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o progresso?')) {
      setProgress({
        fundamentos: { intervalos: {}, escalas: {}, completed: 0, total: 20 },
        harmonia: { camposHarmonicos: {}, progressoes: {}, completed: 0, total: 15 },
        escalasArpejos: { modos: {}, caged: {}, arpejos: {}, completed: 0, total: 25 },
        improvisacao: { hierarquia: {}, tecnicas: {}, exercicios: {}, completed: 0, total: 18 },
        estilos: { jazz: {}, blues: {}, rock: {}, outros: {}, completed: 0, total: 12 },
        desenvolvimento: { metodologia: {}, exercicios: {}, completed: 0, total: 10 }
      });
      
      setStats({
        totalPracticeTime: 0,
        notesPlayed: 0,
        chordsPlayed: 0,
        scalesPlayed: 0,
        lastPracticeDate: null,
        streak: 0,
        achievements: []
      });
    }
  };
  
  const value = {
    progress,
    stats,
    markComplete,
    markIncomplete,
    toggleComplete,
    isComplete,
    getSectionProgress,
    getTotalProgress,
    incrementStat,
    addPracticeTime,
    addAchievement,
    resetProgress
  };
  
  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

