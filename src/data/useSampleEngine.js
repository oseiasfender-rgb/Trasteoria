/**
 * Hook customizado para usar SampleEngine em componentes React
 */

import { useEffect, useRef, useState } from 'react';
import { sampleEngine } from '../utils/sampleEngine.js';
import { drumSampleEngine } from '../utils/drumSampleEngine.js';
import { bassSampleEngine } from '../utils/bassSampleEngine.js';
import { pianoSampleEngine } from '../utils/pianoSampleEngine.js';
import { proSampleMixer } from '../utils/proSampleMixer.js';

export const useSampleEngine = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const engineRef = useRef({
    sample: sampleEngine,
    drum: drumSampleEngine,
    bass: bassSampleEngine,
    piano: pianoSampleEngine,
    mixer: proSampleMixer
  });

  // Inicializar engines ao montar componente
  useEffect(() => {
    const initializeEngines = async () => {
      try {
        // Inicializar AudioContext
        await sampleEngine.initAudioContext();
        
        // Inicializar mixer
        await proSampleMixer.init();
        
        setIsInitialized(true);
      } catch (err) {
        setError(err.message);
      }
    };

    initializeEngines();

    // Cleanup ao desmontar
    return () => {
      // Parar tudo ao desmontar
      sampleEngine.stopAll();
      drumSampleEngine.stopPattern();
    };
  }, []);

  return {
    isInitialized,
    error,
    engines: engineRef.current,
    
    // Métodos auxiliares
    loadDrumKit: async (style) => {
      try {
        await drumSampleEngine.loadDrumKit(style);
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    
    loadBassKit: async (style) => {
      try {
        await bassSampleEngine.loadBassKit(style);
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    
    loadPiano: async (style) => {
      try {
        await pianoSampleEngine.loadPiano(style);
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    
    playBackingTrack: async (config) => {
      try {
        await proSampleMixer.playBackingTrack(config);
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    
    stopBackingTrack: () => {
      proSampleMixer.stopBackingTrack();
    }
  };
};

export default useSampleEngine;
