import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioEngine } from '../utils/audioEngineFixed.js';
import { drumEngine } from '../utils/drumEngine.js';
import { buildChord, buildScale, extractRootNote, identifyChordType } from '../utils/musicTheory.js';

// Criando o contexto
const AppContext = createContext();

// Hook personalizado para usar o contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
};

// Provider do contexto
export const AppProvider = ({ children }) => {
  // Estados globais
  const [currentKey, setCurrentKey] = useState('C'); // Tonalidade atual
  const [currentMode, setCurrentMode] = useState('jonio'); // Modo atual
  const [currentOctave, setCurrentOctave] = useState(4); // Oitava atual (padrão: 4)
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [drumInitialized, setDrumInitialized] = useState(false);

  // Função para inicializar áudio (deve ser chamada após interação do usuário)
  const initializeAudio = async () => {
    if (audioInitialized) return true;
    
    try {
      // Inicializar o módulo de áudio
      const audioSuccess = await audioEngine.initialize();
      setAudioInitialized(audioSuccess);
      
      if (audioSuccess) {
      }
      
      return audioSuccess;
    } catch (error) {
      return false;
    }
  };

  // Função para inicializar bateria
  const initializeDrums = async () => {
    if (drumInitialized) return true;
    
    try {
      const drumSuccess = await drumEngine.initialize();
      setDrumInitialized(drumSuccess);
      
      if (drumSuccess) {
      }
      
      return drumSuccess;
    } catch (error) {
      return false;
    }
  };

  // Função para alterar a tonalidade globalmente
  const changeKey = (newKey) => {
    setCurrentKey(newKey);
  };

  // Função para alterar o modo globalmente
  const changeMode = (newMode) => {
    setCurrentMode(newMode);
  };

  // Função para alterar a oitava globalmente
  const changeOctave = (newOctave) => {
    // Validar range (2-5 conforme roadmap)
    const validOctave = Math.max(2, Math.min(5, newOctave));
    setCurrentOctave(validOctave);
  };

  // Função para tocar um intervalo
  const playInterval = async (semitons, baseNote = 'C', octave = null) => {
    // Usar oitava global se não especificada
    const targetOctave = octave !== null ? octave : currentOctave;
    // Garantir que o áudio está inicializado
    if (!audioInitialized) {
      const success = await initializeAudio();
      if (!success) {
        return;
      }
    }
    
    try {
      await audioEngine.playInterval(semitons, baseNote, targetOctave);
    } catch (error) {
    }
  };

  // Função para tocar uma nota
  const playNote = async (note, octave = null, duration = 1.0, timbre = 'guitar') => {
    // Usar oitava global se não especificada
    const targetOctave = octave !== null ? octave : currentOctave;
    // Garantir que o áudio está inicializado
    if (!audioInitialized) {
      const success = await initializeAudio();
      if (!success) {
        return;
      }
    }
    
    try {
      await audioEngine.playNote(note, targetOctave, duration, timbre);
    } catch (error) {
    }
  };

  // Função para tocar uma escala
  const playScale = async (notes, octave = null, noteDuration = 0.5, timbre = 'guitar') => {
    // Usar oitava global se não especificada
    const targetOctave = octave !== null ? octave : currentOctave;
    // Garantir que o áudio está inicializado
    if (!audioInitialized) {
      const success = await initializeAudio();
      if (!success) {
        return;
      }
    }
    
    try {
      await audioEngine.playScale(notes, targetOctave, noteDuration, timbre);
    } catch (error) {
    }
  };

  // Função para tocar um acorde (aceita nome do acorde ou array de notas)
  const playChord = async (chordInput, octave = null, duration = 2.0, timbre = 'guitar') => {
    // Usar oitava global se não especificada
    const targetOctave = octave !== null ? octave : currentOctave;
    // Garantir que o áudio está inicializado
    if (!audioInitialized) {
      const success = await initializeAudio();
      if (!success) {
        return;
      }
    }
    
    try {
      let notes;
      
      // Se receber string (nome do acorde), construir o acorde
      if (typeof chordInput === 'string') {
        const rootNote = extractRootNote(chordInput);
        const chordType = identifyChordType(chordInput);
        notes = buildChord(rootNote, chordType);
      } 
      // Se receber array, usar diretamente
      else if (Array.isArray(chordInput)) {
        notes = chordInput;
      }
      else {
        return;
      }
      
      if (notes && notes.length > 0) {
        await audioEngine.playChord(notes, targetOctave, duration, timbre);
      }
    } catch (error) {
    }
  };

  // Função para tocar progressão de acordes
  const playProgression = async (chords, octave = null, chordDuration = 2.0, timbre = 'guitar') => {
    // Usar oitava global se não especificada
    const targetOctave = octave !== null ? octave : currentOctave;
    // Garantir que o áudio está inicializado
    if (!audioInitialized) {
      const success = await initializeAudio();
      if (!success) {
        return;
      }
    }
    
    try {
      await audioEngine.playProgression(chords, targetOctave, chordDuration, timbre);
    } catch (error) {
    }
  };

  // Função para tocar ritmo de bateria
  const playDrumPattern = async (pattern, bpm = 120) => {
    // Garantir que a bateria está inicializada
    if (!drumInitialized) {
      const success = await initializeDrums();
      if (!success) {
        return;
      }
    }
    
    try {
      await drumEngine.playPattern(pattern, bpm);
    } catch (error) {
    }
  };

  // Função para parar bateria
  const stopDrums = () => {
    if (drumInitialized) {
      drumEngine.stop();
    }
  };

  // Valor do contexto
  const contextValue = {
    // Estados
    currentKey,
    currentMode,
    currentOctave,
    audioInitialized,
    drumInitialized,
    
    // Funções de inicialização
    initializeAudio,
    initializeDrums,
    
    // Funções de estado
    changeKey,
    changeMode,
    changeOctave,
    
    // Funções de áudio
    playInterval,
    playNote,
    playScale,
    playChord,
    playProgression,
    playDrumPattern,
    stopDrums
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

