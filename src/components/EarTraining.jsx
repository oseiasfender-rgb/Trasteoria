/**
 * 🎵 Ear Training Component
 * Treinamento auditivo interativo
 */

import React, { useState, useEffect } from 'react';
import { Ear, Play, Check, X, RotateCcw, TrendingUp, Award } from 'lucide-react';
import { earTrainingEngine } from '../utils/earTrainingEngine';
import { useAppContext } from '../contexts/AppContext';
import { useToast } from '../hooks/useToast';
import AnimatedButton from './AnimatedButton';
import AnimatedCard from './AnimatedCard';
import ProgressBar from './ProgressBar';

const EarTraining = () => {
  const { playNote, playChord, playScale, initializeAudio } = useAppContext();
  const { showSuccess, showError, showInfo } = useToast();
  
  const [exerciseType, setExerciseType] = useState('intervals');
  const [difficulty, setDifficulty] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(earTrainingEngine.getStats());
  const [hasPlayed, setHasPlayed] = useState(false);
  
  // Gerar novo exercício
  const generateExercise = () => {
    let exercise;
    
    switch (exerciseType) {
      case 'intervals':
        exercise = earTrainingEngine.generateIntervalExercise(difficulty);
        break;
      case 'chords':
        exercise = earTrainingEngine.generateChordExercise(difficulty);
        break;
      case 'scales':
        exercise = earTrainingEngine.generateScaleExercise(difficulty);
        break;
      default:
        exercise = earTrainingEngine.generateIntervalExercise(difficulty);
    }
    
    setCurrentExercise(exercise);
    setSelectedAnswer(null);
    setShowResult(false);
    setResult(null);
    setHasPlayed(false);
  };
  
  // Tocar exercício
  const playExercise = async () => {
    if (!currentExercise) return;
    
    try {
      await initializeAudio();
      
      switch (currentExercise.type) {
        case 'intervals':
          await playInterval(currentExercise.correct);
          break;
        case 'chords':
          await playChordType(currentExercise.correct);
          break;
        case 'scales':
          await playScaleType(currentExercise.correct);
          break;
      }
      
      setHasPlayed(true);
      showInfo('Ouça atentamente!');
    } catch (error) {
      showError('Erro ao tocar');
    }
  };
  
  // Tocar intervalo
  const playInterval = async (interval) => {
    const baseNote = 'C';
    const baseOctave = 4;
    
    // Tocar nota base
    await playNote(baseNote, baseOctave, 0.8);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Tocar nota do intervalo
    const targetNote = getNoteFromInterval(baseNote, interval.semitones);
    await playNote(targetNote.note, targetNote.octave, 0.8);
  };
  
  // Tocar tipo de acorde
  const playChordType = async (chordType) => {
    // Usar C como base
    await playChord('C', 'C');
  };
  
  // Tocar tipo de escala
  const playScaleType = async (scaleType) => {
    // Tocar escala em C
    await playScale('C', 'major'); // Simplificado
  };
  
  // Obter nota a partir de intervalo
  const getNoteFromInterval = (baseNote, semitones) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const baseIndex = notes.indexOf(baseNote);
    const targetIndex = (baseIndex + semitones) % 12;
    const octaveShift = Math.floor((baseIndex + semitones) / 12);
    
    return {
      note: notes[targetIndex],
      octave: 4 + octaveShift
    };
  };
  
  // Selecionar resposta
  const selectAnswer = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };
  
  // Verificar resposta
  const checkAnswer = () => {
    if (!selectedAnswer || !currentExercise) return;
    
    const checkResult = earTrainingEngine.checkAnswer(currentExercise, selectedAnswer);
    setResult(checkResult);
    setShowResult(true);
    setStats(earTrainingEngine.getStats());
    
    if (checkResult.correct) {
      showSuccess('Correto! 🎉');
    } else {
      showError(`Incorreto. Era ${checkResult.correctAnswer.name}`);
    }
  };
  
  // Próximo exercício
  const nextExercise = () => {
    generateExercise();
  };
  
  // Resetar estatísticas
  const resetStats = () => {
    if (window.confirm('Resetar todas as estatísticas?')) {
      earTrainingEngine.resetStats();
      setStats(earTrainingEngine.getStats());
      showInfo('Estatísticas resetadas');
    }
  };
  
  // Gerar exercício inicial
  useEffect(() => {
    generateExercise();
  }, [exerciseType, difficulty]);
  
  // Obter cor por dificuldade
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedCard delay={0.1}>
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Ear className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Ear Training</h3>
          </div>
          <p className="text-blue-100">
            Treine seu ouvido musical com exercícios interativos
          </p>
        </div>
      </AnimatedCard>
      
      {/* Estatísticas */}
      <AnimatedCard delay={0.2}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Suas Estatísticas
            </h4>
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={resetStats}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Resetar
            </AnimatedButton>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-sm text-slate-400 mb-1">Total</div>
              <div className="text-2xl font-bold text-white">{stats.totalExercises}</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-sm text-slate-400 mb-1">Corretas</div>
              <div className="text-2xl font-bold text-green-500">{stats.correctAnswers}</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-sm text-slate-400 mb-1">Erradas</div>
              <div className="text-2xl font-bold text-red-500">{stats.wrongAnswers}</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <div className="text-sm text-slate-400 mb-1">Precisão</div>
              <div className="text-2xl font-bold text-blue-500">{stats.accuracy}%</div>
            </div>
          </div>
          
          <ProgressBar progress={stats.accuracy} color="green" height="md" showPercentage={false} />
        </div>
      </AnimatedCard>
      
      {/* Controles */}
      <AnimatedCard delay={0.3}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-white mb-4">Configurações</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Exercício */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tipo de Exercício
              </label>
              <select
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="intervals">Intervalos</option>
                <option value="chords">Acordes</option>
                <option value="scales">Escalas</option>
              </select>
            </div>
            
            {/* Dificuldade */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Dificuldade
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`
                      px-3 py-2 rounded-lg font-medium transition-all
                      ${difficulty === diff
                        ? `${getDifficultyColor(diff)} text-white`
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }
                    `}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedCard>
      
      {/* Exercício */}
      {currentExercise && (
        <AnimatedCard delay={0.4}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="text-center mb-6">
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={playExercise}
                icon={<Play />}
              >
                {hasPlayed ? 'Tocar Novamente' : 'Tocar Exercício'}
              </AnimatedButton>
            </div>
            
            <h4 className="text-lg font-bold text-white mb-4 text-center">
              Qual é {exerciseType === 'intervals' ? 'o intervalo' : exerciseType === 'chords' ? 'o acorde' : 'a escala'}?
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(option)}
                  disabled={showResult}
                  className={`
                    px-4 py-3 rounded-lg font-medium transition-all
                    ${selectedAnswer === option
                      ? showResult
                        ? result.correct && result.userAnswer === option
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white'
                      : showResult && result.correctAnswer === option
                        ? 'bg-green-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }
                    ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  {option.name}
                  {showResult && result.correctAnswer === option && (
                    <Check className="inline ml-2 w-4 h-4" />
                  )}
                  {showResult && selectedAnswer === option && !result.correct && (
                    <X className="inline ml-2 w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center gap-3">
              {!showResult ? (
                <AnimatedButton
                  variant="success"
                  onClick={checkAnswer}
                  disabled={!selectedAnswer}
                  icon={<Check />}
                >
                  Verificar
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  variant="primary"
                  onClick={nextExercise}
                  icon={<Play />}
                >
                  Próximo Exercício
                </AnimatedButton>
              )}
            </div>
          </div>
        </AnimatedCard>
      )}
      
      {/* Resultado */}
      {showResult && result && (
        <AnimatedCard delay={0.5}>
          <div className={`rounded-2xl p-6 ${result.correct ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
            <div className="flex items-center gap-3 mb-2">
              {result.correct ? (
                <>
                  <Award className="w-6 h-6 text-green-500" />
                  <h4 className="text-xl font-bold text-white">Correto!</h4>
                </>
              ) : (
                <>
                  <X className="w-6 h-6 text-red-500" />
                  <h4 className="text-xl font-bold text-white">Incorreto</h4>
                </>
              )}
            </div>
            <p className="text-slate-300">
              {result.correct
                ? `Parabéns! Você identificou corretamente: ${result.correctAnswer.name}`
                : `A resposta correta era: ${result.correctAnswer.name}`
              }
            </p>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
};

export default EarTraining;

