/**
 * 🎸 Guitar Input Component
 * Captura e análise de áudio em tempo real (Mic/USB)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Activity, Volume2, Target, CheckCircle } from 'lucide-react';
import PitchDetector from '../utils/pitchDetector';
import { useToast } from '../hooks/useToast';
import AnimatedButton from './AnimatedButton';
import AnimatedCard from './AnimatedCard';

const GuitarInput = ({ targetNote = null, targetOctave = null, onNoteDetected = null }) => {
  const { showSuccess, showError, showInfo } = useToast();
  
  const [isListening, setIsListening] = useState(false);
  const [currentPitch, setCurrentPitch] = useState(null);
  const [volume, setVolume] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [history, setHistory] = useState([]);
  
  const pitchDetectorRef = useRef(null);
  const maxHistoryLength = 50;
  
  // Inicializar pitch detector
  useEffect(() => {
    pitchDetectorRef.current = new PitchDetector();
    
    // Callbacks
    pitchDetectorRef.current.onPitchDetected = (pitch) => {
      setCurrentPitch(pitch);
      addToHistory(pitch);
      
      // Verificar se é a nota correta
      if (targetNote && targetOctave) {
        const correct = pitch.note === targetNote && pitch.octave === targetOctave;
        setIsCorrect(correct);
        
        if (correct && onNoteDetected) {
          onNoteDetected(pitch);
        }
      }
    };
    
    pitchDetectorRef.current.onVolumeChange = (vol) => {
      setVolume(vol);
    };
    
    return () => {
      if (pitchDetectorRef.current) {
        pitchDetectorRef.current.stop();
      }
    };
  }, [targetNote, targetOctave, onNoteDetected]);
  
  // Adicionar ao histórico
  const addToHistory = (pitch) => {
    setHistory(prev => {
      const newHistory = [...prev, pitch];
      if (newHistory.length > maxHistoryLength) {
        newHistory.shift();
      }
      return newHistory;
    });
  };
  
  // Iniciar/parar escuta
  const toggleListening = async () => {
    if (isListening) {
      pitchDetectorRef.current.stop();
      setIsListening(false);
      setCurrentPitch(null);
      setVolume(0);
      showInfo('Microfone desligado');
    } else {
      try {
        await pitchDetectorRef.current.start();
        setIsListening(true);
        showSuccess('Microfone ativado! Toque sua guitarra');
      } catch (error) {
        showError(error.message || 'Erro ao acessar microfone');
      }
    }
  };
  
  // Limpar histórico
  const clearHistory = () => {
    setHistory([]);
  };
  
  // Obter cor por cents (afinação)
  const getCentsColor = (cents) => {
    const absCents = Math.abs(cents);
    if (absCents <= 5) return 'text-green-500';
    if (absCents <= 15) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Visualização de volume
  const volumePercentage = Math.min(100, volume * 1000);
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedCard delay={0.1}>
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Guitar Input</h3>
          </div>
          <p className="text-orange-100">
            Toque sua guitarra e veja a análise em tempo real
          </p>
        </div>
      </AnimatedCard>
      
      {/* Controle Principal */}
      <AnimatedCard delay={0.2}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <div className="text-center">
            <AnimatedButton
              variant={isListening ? "danger" : "primary"}
              size="lg"
              onClick={toggleListening}
              icon={isListening ? <MicOff /> : <Mic />}
            >
              {isListening ? 'Parar' : 'Iniciar Microfone'}
            </AnimatedButton>
            
            {!isListening && (
              <p className="text-sm text-slate-400 mt-3">
                Clique para permitir acesso ao microfone
              </p>
            )}
          </div>
        </div>
      </AnimatedCard>
      
      {/* Nota Alvo (se houver) */}
      {targetNote && targetOctave && (
        <AnimatedCard delay={0.3}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Nota Alvo</h4>
                <p className="text-3xl font-bold text-blue-500">
                  {targetNote}{targetOctave}
                </p>
              </div>
              {isCorrect && (
                <CheckCircle className="w-12 h-12 text-green-500" />
              )}
            </div>
          </div>
        </AnimatedCard>
      )}
      
      {/* Visualização em Tempo Real */}
      {isListening && (
        <AnimatedCard delay={0.4}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              Detecção em Tempo Real
            </h4>
            
            {currentPitch ? (
              <div className="space-y-4">
                {/* Nota Detectada */}
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">
                    {currentPitch.note}{currentPitch.octave}
                  </div>
                  <div className={`text-2xl font-medium ${getCentsColor(currentPitch.cents)}`}>
                    {currentPitch.cents > 0 ? '+' : ''}{currentPitch.cents} cents
                  </div>
                  <div className="text-sm text-slate-400 mt-2">
                    {currentPitch.frequency.toFixed(2)} Hz
                  </div>
                </div>
                
                {/* Indicador de Afinação */}
                <div className="relative h-8 bg-slate-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-white"></div>
                  </div>
                  <div
                    className="absolute top-0 bottom-0 w-2 bg-blue-500 rounded transition-all"
                    style={{
                      left: `calc(50% + ${(currentPitch.cents / 50) * 50}% - 4px)`
                    }}
                  ></div>
                </div>
                
                {/* Confiança */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Confiança:</span>
                  <span className="text-white font-medium">
                    {Math.round(currentPitch.confidence * 100)}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p>Aguardando sinal...</p>
                <p className="text-sm mt-2">Toque uma nota na guitarra</p>
              </div>
            )}
          </div>
        </AnimatedCard>
      )}
      
      {/* Volume */}
      {isListening && (
        <AnimatedCard delay={0.5}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-500" />
              Volume de Entrada
            </h4>
            
            <div className="relative h-4 bg-slate-700 rounded-lg overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all"
                style={{ width: `${volumePercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Silêncio</span>
              <span>Alto</span>
            </div>
          </div>
        </AnimatedCard>
      )}
      
      {/* Histórico */}
      {isListening && history.length > 0 && (
        <AnimatedCard delay={0.6}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-white">Histórico de Notas</h4>
              <button
                onClick={clearHistory}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Limpar
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {history.slice(-20).map((pitch, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-slate-700 rounded-lg text-sm"
                >
                  <span className="text-white font-medium">
                    {pitch.note}{pitch.octave}
                  </span>
                  <span className={`ml-1 text-xs ${getCentsColor(pitch.cents)}`}>
                    {pitch.cents > 0 ? '+' : ''}{pitch.cents}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      )}
      
      {/* Instruções */}
      <AnimatedCard delay={0.7}>
        <div className="bg-slate-800 rounded-xl p-4">
          <h4 className="text-sm font-bold text-white mb-2">💡 Dicas:</h4>
          <ul className="space-y-1 text-sm text-slate-400">
            <li>• Use fones de ouvido para evitar feedback</li>
            <li>• Toque notas limpas e sustentadas</li>
            <li>• Ajuste o volume da guitarra para melhor detecção</li>
            <li>• Cents próximos de 0 = afinação perfeita</li>
            <li>• Verde = afinado, Amarelo = quase, Vermelho = desafinado</li>
          </ul>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default GuitarInput;

