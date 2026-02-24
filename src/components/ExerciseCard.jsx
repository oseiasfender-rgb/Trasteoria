/**
 * 📝 Exercise Card
 * Componente para exibir exercícios interativos
 */

import React, { useState } from 'react';
import { CheckCircle, XCircle, Play, Volume2, RotateCcw } from 'lucide-react';

export const ExerciseCard = ({ 
  title, 
  description, 
  difficulty = 'medium',
  instructions,
  audioUrl,
  onComplete,
  hints = [],
  expectedAnswer
}) => {
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);

  const difficultyColors = {
    easy: 'bg-green-500/10 text-green-600 border-green-500/30',
    medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30',
    hard: 'bg-red-500/10 text-red-600 border-red-500/30',
  };

  const handleCheck = () => {
    setAttempts(attempts + 1);
    
    if (userAnswer.toLowerCase().trim() === expectedAnswer.toLowerCase().trim()) {
      setCompleted(true);
      setFeedback('✅ Correto! Parabéns!');
      onComplete?.();
    } else {
      setFeedback('❌ Tente novamente');
    }
  };

  const handleReset = () => {
    setUserAnswer('');
    setFeedback('');
    setAttempts(0);
    setShowHint(false);
    setCompleted(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-3">{description}</p>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${difficultyColors[difficulty]}`}>
            {difficulty === 'easy' ? '⭐ Fácil' : difficulty === 'medium' ? '⭐⭐ Médio' : '⭐⭐⭐ Difícil'}
          </div>
        </div>
        {completed && <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />}
      </div>

      {/* Instructions */}
      <div className="bg-accent/50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">📋 Instruções:</h4>
        <p className="text-sm text-muted-foreground">{instructions}</p>
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => new Audio(audioUrl).play()}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
            aria-label="Reproduzir áudio"
          >
            <Play className="w-4 h-4" />
            <span>Ouvir Exemplo</span>
          </button>
          <Volume2 className="w-4 h-4 text-muted-foreground" />
        </div>
      )}

      {/* Input */}
      {!completed && (
        <div className="space-y-3">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Digite sua resposta..."
            className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Resposta do exercício"
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
          />

          {/* Hints */}
          {hints.length > 0 && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-primary hover:underline"
              aria-label="Mostrar dica"
            >
              💡 {showHint ? 'Ocultar dica' : 'Mostrar dica'}
            </button>
          )}

          {showHint && hints.length > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-600 p-3 rounded-lg text-sm">
              <strong>Dica:</strong> {hints[Math.min(attempts, hints.length - 1)]}
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`p-3 rounded-lg text-sm font-semibold ${
              completed 
                ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                : 'bg-red-500/10 text-red-600 border border-red-500/30'
            }`}>
              {feedback}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Verificar resposta"
            >
              Verificar
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors"
              aria-label="Resetar exercício"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {attempts > 0 && (
            <p className="text-xs text-muted-foreground text-center">
              Tentativas: {attempts}
            </p>
          )}
        </div>
      )}

      {/* Completed State */}
      {completed && (
        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
          <p className="text-green-600 font-semibold mb-3">🎉 Exercício Concluído!</p>
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 border border-green-500/30 hover:bg-green-500/5 text-green-600 rounded-lg transition-colors font-semibold"
            aria-label="Fazer novamente"
          >
            Fazer Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
