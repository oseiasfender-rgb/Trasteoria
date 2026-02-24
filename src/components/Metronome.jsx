/**
 * 🎵 Metronome Component
 * Metrônomo profissional com controles completos
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import { useToast } from '../hooks/useToast';

const Metronome = ({ initialBpm = 120, initialBeatsPerMeasure = 4 }) => {
  const { showInfo } = useToast();
  
  // Estados
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(initialBpm);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(initialBeatsPerMeasure);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [subdivision, setSubdivision] = useState(1); // 1, 2, 3, 4 (semínima, colcheia, tercina, semicolcheia)
  
  // Refs
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const timerIdRef = useRef(null);
  const scheduleAheadTime = 0.1; // Agendar notas com 100ms de antecedência
  const lookahead = 25.0; // Frequência do scheduler (ms)
  
  // Inicializar AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Criar som de click
  const playClick = (time, isAccent = false) => {
    if (isMuted || !audioContextRef.current) return;
    
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Frequência diferente para acentuação
    oscillator.frequency.value = isAccent ? 1200 : 800;
    oscillator.type = 'sine';
    
    // Volume
    gainNode.gain.value = volume * (isAccent ? 1.0 : 0.6);
    
    // Envelope
    gainNode.gain.setValueAtTime(volume * (isAccent ? 1.0 : 0.6), time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.03);
    
    oscillator.start(time);
    oscillator.stop(time + 0.03);
  };
  
  // Scheduler
  const scheduler = () => {
    if (!audioContextRef.current) return;
    
    const audioContext = audioContextRef.current;
    
    while (nextNoteTimeRef.current < audioContext.currentTime + scheduleAheadTime) {
      scheduleNote(currentBeatRef.current, nextNoteTimeRef.current);
      nextNote();
    }
    
    timerIdRef.current = setTimeout(scheduler, lookahead);
  };
  
  // Agendar próxima nota
  const scheduleNote = (beatNumber, time) => {
    // Atualizar UI
    setCurrentBeat(beatNumber);
    
    // Tocar click
    const isAccent = beatNumber % beatsPerMeasure === 0;
    playClick(time, isAccent);
  };
  
  // Calcular próxima nota
  const nextNote = () => {
    const secondsPerBeat = 60.0 / bpm;
    const secondsPerSubdivision = secondsPerBeat / subdivision;
    
    nextNoteTimeRef.current += secondsPerSubdivision;
    currentBeatRef.current++;
    
    if (currentBeatRef.current >= beatsPerMeasure * subdivision) {
      currentBeatRef.current = 0;
    }
  };
  
  // Start/Stop
  const togglePlay = async () => {
    if (!audioContextRef.current) return;
    
    if (isPlaying) {
      // Stop
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
      setIsPlaying(false);
      setCurrentBeat(0);
      currentBeatRef.current = 0;
    } else {
      // Start
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      
      currentBeatRef.current = 0;
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      setIsPlaying(true);
      scheduler();
      showInfo(`Metrônomo iniciado: ${bpm} BPM`);
    }
  };
  
  // Cleanup ao parar
  useEffect(() => {
    if (!isPlaying && timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
  }, [isPlaying]);
  
  // Presets de BPM
  const bpmPresets = [
    { name: 'Largo', bpm: 40 },
    { name: 'Adagio', bpm: 60 },
    { name: 'Andante', bpm: 80 },
    { name: 'Moderato', bpm: 100 },
    { name: 'Allegro', bpm: 120 },
    { name: 'Vivace', bpm: 140 },
    { name: 'Presto', bpm: 180 }
  ];
  
  // Presets de compasso
  const timeSignaturePresets = [
    { name: '2/4', beats: 2 },
    { name: '3/4', beats: 3 },
    { name: '4/4', beats: 4 },
    { name: '5/4', beats: 5 },
    { name: '6/8', beats: 6 },
    { name: '7/8', beats: 7 }
  ];
  
  // Ajustar BPM
  const adjustBpm = (delta) => {
    const newBpm = Math.max(40, Math.min(240, bpm + delta));
    setBpm(newBpm);
  };
  
  // Tap tempo
  const tapTimesRef = useRef([]);
  const handleTap = () => {
    const now = Date.now();
    tapTimesRef.current.push(now);
    
    // Manter apenas últimos 4 taps
    if (tapTimesRef.current.length > 4) {
      tapTimesRef.current.shift();
    }
    
    // Calcular BPM médio
    if (tapTimesRef.current.length >= 2) {
      const intervals = [];
      for (let i = 1; i < tapTimesRef.current.length; i++) {
        intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(Math.max(40, Math.min(240, calculatedBpm)));
    }
    
    // Reset após 2 segundos de inatividade
    setTimeout(() => {
      if (Date.now() - tapTimesRef.current[tapTimesRef.current.length - 1] > 2000) {
        tapTimesRef.current = [];
      }
    }, 2000);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🎵 Metrônomo</h3>
        <p className="text-slate-300 text-sm">Controle preciso de tempo e ritmo</p>
      </div>
      
      {/* BPM Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-white mb-2">{bpm}</div>
        <div className="text-sm text-slate-400">BPM (Batidas por Minuto)</div>
      </div>
      
      {/* Visual Beat Indicator */}
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: beatsPerMeasure }).map((_, index) => (
          <div
            key={index}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              font-bold transition-all duration-100
              ${Math.floor(currentBeat / subdivision) === index
                ? index === 0
                  ? 'bg-green-500 text-white scale-125 shadow-lg shadow-green-500/50'
                  : 'bg-blue-500 text-white scale-125 shadow-lg shadow-blue-500/50'
                : 'bg-slate-700 text-slate-400'
              }
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
      
      {/* BPM Controls */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => adjustBpm(-10)}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          -10
        </button>
        <button
          onClick={() => adjustBpm(-1)}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          -1
        </button>
        <button
          onClick={() => adjustBpm(+1)}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          +1
        </button>
        <button
          onClick={() => adjustBpm(+10)}
          className="col-span-3 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          +10
        </button>
      </div>
      
      {/* BPM Slider */}
      <div className="mb-6">
        <input
          type="range"
          min="40"
          max="240"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>40</span>
          <span>240</span>
        </div>
      </div>
      
      {/* Play/Stop & Tap Tempo */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <AnimatedButton
          variant={isPlaying ? "danger" : "primary"}
          size="lg"
          onClick={togglePlay}
          icon={isPlaying ? <Pause /> : <Play />}
        >
          {isPlaying ? 'Parar' : 'Iniciar'}
        </AnimatedButton>
        
        <button
          onClick={handleTap}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Tap Tempo
        </button>
      </div>
      
      {/* Time Signature */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Compasso
        </label>
        <div className="grid grid-cols-6 gap-2">
          {timeSignaturePresets.map(preset => (
            <button
              key={preset.name}
              onClick={() => setBeatsPerMeasure(preset.beats)}
              className={`
                px-3 py-2 rounded-lg font-medium transition-colors
                ${beatsPerMeasure === preset.beats
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }
              `}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* BPM Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Presets de Andamento
        </label>
        <div className="grid grid-cols-4 gap-2">
          {bpmPresets.map(preset => (
            <button
              key={preset.name}
              onClick={() => setBpm(preset.bpm)}
              className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-slate-400">{preset.bpm}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Subdivision */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Subdivisão
        </label>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setSubdivision(1)}
            className={`px-3 py-2 rounded-lg ${subdivision === 1 ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            ♩ (1/4)
          </button>
          <button
            onClick={() => setSubdivision(2)}
            className={`px-3 py-2 rounded-lg ${subdivision === 2 ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            ♪ (1/8)
          </button>
          <button
            onClick={() => setSubdivision(3)}
            className={`px-3 py-2 rounded-lg ${subdivision === 3 ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            ♪♪♪ (3)
          </button>
          <button
            onClick={() => setSubdivision(4)}
            className={`px-3 py-2 rounded-lg ${subdivision === 4 ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            ♬ (1/16)
          </button>
        </div>
      </div>
      
      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
          className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          disabled={isMuted}
        />
        <span className="text-sm text-slate-400 w-12 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};

export default Metronome;

