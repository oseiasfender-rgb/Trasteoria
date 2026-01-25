/**
 * 🤖 AI Chord Suggester Component
 * Interface visual para sugestão inteligente de acordes
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, TrendingUp, RotateCcw, Play } from 'lucide-react';
import { aiChordSuggester } from '../utils/aiChordSuggester';
import { useAppContext } from '../contexts/AppContext';
import { useToast } from '../hooks/useToast';
import AnimatedButton from './AnimatedButton';
import AnimatedCard from './AnimatedCard';

const AIChordSuggester = ({ mode = 'major', tonality = 'C' }) => {
  const { playChord } = useAppContext();
  const { showSuccess, showInfo } = useToast();
  
  const [history, setHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [selectedChord, setSelectedChord] = useState(null);
  
  // Atualizar sugestões quando histórico muda
  useEffect(() => {
    updateSuggestions();
    updateAnalysis();
  }, [history, mode]);
  
  // Atualizar sugestões
  const updateSuggestions = () => {
    const newSuggestions = aiChordSuggester.suggestNext(tonality, mode, 5);
    setSuggestions(newSuggestions);
  };
  
  // Atualizar análise
  const updateAnalysis = () => {
    const newAnalysis = aiChordSuggester.analyzeCurrentProgression();
    setAnalysis(newAnalysis);
  };
  
  // Adicionar acorde
  const addChord = async (chord) => {
    aiChordSuggester.addChord(chord);
    setHistory([...aiChordSuggester.getHistory()]);
    setSelectedChord(chord);
    
    // Tocar acorde
    try {
      await playChord(chord, tonality);
      showSuccess(`Acorde ${chord} adicionado`);
    } catch (error) {
    }
  };
  
  // Limpar histórico
  const clearHistory = () => {
    aiChordSuggester.clearHistory();
    setHistory([]);
    setSuggestions([]);
    setAnalysis(null);
    setSelectedChord(null);
    showInfo('Histórico limpo');
  };
  
  // Tocar progressão completa
  const playProgression = async () => {
    if (history.length === 0) {
      showInfo('Adicione acordes primeiro');
      return;
    }
    
    showInfo('Tocando progressão...');
    
    for (const chord of history) {
      await playChord(chord, tonality);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    showSuccess('Progressão completa!');
  };
  
  // Obter cor por confiança
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-blue-500';
    if (confidence >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedCard delay={0.1}>
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8" />
            <h3 className="text-2xl font-bold">AI Chord Suggester</h3>
          </div>
          <p className="text-purple-100">
            Inteligência Artificial sugere o próximo acorde baseado em teoria musical
          </p>
        </div>
      </AnimatedCard>
      
      {/* Histórico de Acordes */}
      <AnimatedCard delay={0.2}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Sua Progressão
            </h4>
            <div className="flex gap-2">
              <AnimatedButton
                variant="outline"
                size="sm"
                onClick={playProgression}
                disabled={history.length === 0}
                icon={<Play className="w-4 h-4" />}
              >
                Tocar
              </AnimatedButton>
              <AnimatedButton
                variant="danger"
                size="sm"
                onClick={clearHistory}
                disabled={history.length === 0}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Limpar
              </AnimatedButton>
            </div>
          </div>
          
          {history.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p>Nenhum acorde adicionado ainda.</p>
              <p className="text-sm mt-2">Clique em uma sugestão abaixo para começar!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {history.map((chord, index) => (
                <div
                  key={index}
                  className={`
                    px-4 py-2 rounded-lg font-bold text-white
                    ${selectedChord === chord && index === history.length - 1
                      ? 'bg-green-500 scale-110'
                      : 'bg-slate-700'
                    }
                    transition-all
                  `}
                >
                  {chord}
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimatedCard>
      
      {/* Sugestões de IA */}
      <AnimatedCard delay={0.3}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            Sugestões da IA
          </h4>
          
          {suggestions.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <p>Adicione um acorde para receber sugestões!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => addChord(suggestion.chord)}
                  className="bg-slate-700 hover:bg-slate-600 rounded-xl p-4 text-left transition-all hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white">
                      {suggestion.chord}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getConfidenceColor(suggestion.confidence)}`}></div>
                      <span className="text-sm text-slate-400">
                        {suggestion.confidence}%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">
                    {suggestion.reason}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </AnimatedCard>
      
      {/* Análise da Progressão */}
      {analysis && history.length > 0 && (
        <AnimatedCard delay={0.4}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">
              📊 Análise da Progressão
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Padrão:</span>
                <span className="text-white font-medium">{analysis.pattern}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Acordes:</span>
                <span className="text-white font-medium">{analysis.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Qualidade:</span>
                <span className="text-green-500 font-medium">{analysis.quality}</span>
              </div>
              
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <p className="text-sm font-medium text-slate-300 mb-2">Dicas:</p>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((tip, index) => (
                      <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      )}
      
      {/* Informações */}
      <AnimatedCard delay={0.5}>
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-sm text-slate-400 text-center">
            <Brain className="inline w-4 h-4 mr-1" />
            A IA analisa {mode === 'major' ? 'progressões maiores' : 'progressões menores'} em {tonality} e sugere acordes baseados em teoria musical e padrões harmônicos comuns.
          </p>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AIChordSuggester;

