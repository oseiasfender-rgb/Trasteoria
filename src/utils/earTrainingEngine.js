/**
 * 🎵 Ear Training Engine
 * Sistema de treinamento auditivo para reconhecimento de intervalos, acordes e escalas
 */

class EarTrainingEngine {
  constructor() {
    // Tipos de exercícios
    this.exerciseTypes = {
      INTERVALS: 'intervals',
      CHORDS: 'chords',
      SCALES: 'scales',
      MELODIES: 'melodies',
      RHYTHMS: 'rhythms'
    };
    
    // Intervalos musicais
    this.intervals = [
      { name: 'Uníssono', semitones: 0, difficulty: 1 },
      { name: 'Segunda Menor', semitones: 1, difficulty: 3 },
      { name: 'Segunda Maior', semitones: 2, difficulty: 2 },
      { name: 'Terça Menor', semitones: 3, difficulty: 2 },
      { name: 'Terça Maior', semitones: 4, difficulty: 2 },
      { name: 'Quarta Justa', semitones: 5, difficulty: 2 },
      { name: 'Quarta Aumentada/Quinta Diminuta', semitones: 6, difficulty: 4 },
      { name: 'Quinta Justa', semitones: 7, difficulty: 2 },
      { name: 'Sexta Menor', semitones: 8, difficulty: 3 },
      { name: 'Sexta Maior', semitones: 9, difficulty: 3 },
      { name: 'Sétima Menor', semitones: 10, difficulty: 3 },
      { name: 'Sétima Maior', semitones: 11, difficulty: 4 },
      { name: 'Oitava', semitones: 12, difficulty: 1 }
    ];
    
    // Tipos de acordes
    this.chordTypes = [
      { name: 'Maior', symbol: '', intervals: [0, 4, 7], difficulty: 1 },
      { name: 'Menor', symbol: 'm', intervals: [0, 3, 7], difficulty: 1 },
      { name: 'Diminuto', symbol: 'dim', intervals: [0, 3, 6], difficulty: 3 },
      { name: 'Aumentado', symbol: 'aug', intervals: [0, 4, 8], difficulty: 3 },
      { name: 'Maior com Sétima', symbol: 'maj7', intervals: [0, 4, 7, 11], difficulty: 2 },
      { name: 'Menor com Sétima', symbol: 'm7', intervals: [0, 3, 7, 10], difficulty: 2 },
      { name: 'Dominante', symbol: '7', intervals: [0, 4, 7, 10], difficulty: 2 },
      { name: 'Meio-Diminuto', symbol: 'm7b5', intervals: [0, 3, 6, 10], difficulty: 4 }
    ];
    
    // Escalas
    this.scales = [
      { name: 'Maior', intervals: [0, 2, 4, 5, 7, 9, 11], difficulty: 1 },
      { name: 'Menor Natural', intervals: [0, 2, 3, 5, 7, 8, 10], difficulty: 1 },
      { name: 'Menor Harmônica', intervals: [0, 2, 3, 5, 7, 8, 11], difficulty: 2 },
      { name: 'Menor Melódica', intervals: [0, 2, 3, 5, 7, 9, 11], difficulty: 2 },
      { name: 'Pentatônica Maior', intervals: [0, 2, 4, 7, 9], difficulty: 1 },
      { name: 'Pentatônica Menor', intervals: [0, 3, 5, 7, 10], difficulty: 1 },
      { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10], difficulty: 2 }
    ];
    
    // Estatísticas
    this.stats = {
      totalExercises: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      byType: {},
      byDifficulty: {}
    };
    
    // Carregar estatísticas
    this.loadStats();
  }
  
  /**
   * Gerar exercício de intervalos
   */
  generateIntervalExercise(difficulty = null) {
    let availableIntervals = this.intervals;
    
    // Filtrar por dificuldade se especificado
    if (difficulty) {
      availableIntervals = this.intervals.filter(i => i.difficulty === difficulty);
    }
    
    const correctInterval = availableIntervals[
      Math.floor(Math.random() * availableIntervals.length)
    ];
    
    // Gerar opções (3 incorretas + 1 correta)
    const options = this.generateOptions(
      correctInterval,
      availableIntervals,
      4
    );
    
    return {
      type: this.exerciseTypes.INTERVALS,
      correct: correctInterval,
      options: this.shuffleArray(options),
      difficulty: correctInterval.difficulty
    };
  }
  
  /**
   * Gerar exercício de acordes
   */
  generateChordExercise(difficulty = null) {
    let availableChords = this.chordTypes;
    
    if (difficulty) {
      availableChords = this.chordTypes.filter(c => c.difficulty === difficulty);
    }
    
    const correctChord = availableChords[
      Math.floor(Math.random() * availableChords.length)
    ];
    
    const options = this.generateOptions(
      correctChord,
      availableChords,
      4
    );
    
    return {
      type: this.exerciseTypes.CHORDS,
      correct: correctChord,
      options: this.shuffleArray(options),
      difficulty: correctChord.difficulty
    };
  }
  
  /**
   * Gerar exercício de escalas
   */
  generateScaleExercise(difficulty = null) {
    let availableScales = this.scales;
    
    if (difficulty) {
      availableScales = this.scales.filter(s => s.difficulty === difficulty);
    }
    
    const correctScale = availableScales[
      Math.floor(Math.random() * availableScales.length)
    ];
    
    const options = this.generateOptions(
      correctScale,
      availableScales,
      4
    );
    
    return {
      type: this.exerciseTypes.SCALES,
      correct: correctScale,
      options: this.shuffleArray(options),
      difficulty: correctScale.difficulty
    };
  }
  
  /**
   * Gerar opções de resposta
   */
  generateOptions(correct, pool, count) {
    const options = [correct];
    const remaining = pool.filter(item => item !== correct);
    
    while (options.length < count && remaining.length > 0) {
      const randomIndex = Math.floor(Math.random() * remaining.length);
      options.push(remaining[randomIndex]);
      remaining.splice(randomIndex, 1);
    }
    
    return options;
  }
  
  /**
   * Embaralhar array
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  /**
   * Verificar resposta
   */
  checkAnswer(exercise, answer) {
    const isCorrect = answer.name === exercise.correct.name;
    
    // Atualizar estatísticas
    this.updateStats(exercise.type, exercise.difficulty, isCorrect);
    
    return {
      correct: isCorrect,
      correctAnswer: exercise.correct,
      userAnswer: answer
    };
  }
  
  /**
   * Atualizar estatísticas
   */
  updateStats(type, difficulty, isCorrect) {
    this.stats.totalExercises++;
    
    if (isCorrect) {
      this.stats.correctAnswers++;
    } else {
      this.stats.wrongAnswers++;
    }
    
    // Por tipo
    if (!this.stats.byType[type]) {
      this.stats.byType[type] = { total: 0, correct: 0 };
    }
    this.stats.byType[type].total++;
    if (isCorrect) {
      this.stats.byType[type].correct++;
    }
    
    // Por dificuldade
    if (!this.stats.byDifficulty[difficulty]) {
      this.stats.byDifficulty[difficulty] = { total: 0, correct: 0 };
    }
    this.stats.byDifficulty[difficulty].total++;
    if (isCorrect) {
      this.stats.byDifficulty[difficulty].correct++;
    }
    
    // Salvar
    this.saveStats();
  }
  
  /**
   * Obter estatísticas
   */
  getStats() {
    const accuracy = this.stats.totalExercises > 0
      ? Math.round((this.stats.correctAnswers / this.stats.totalExercises) * 100)
      : 0;
    
    return {
      ...this.stats,
      accuracy
    };
  }
  
  /**
   * Resetar estatísticas
   */
  resetStats() {
    this.stats = {
      totalExercises: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      byType: {},
      byDifficulty: {}
    };
    this.saveStats();
  }
  
  /**
   * Salvar estatísticas
   */
  saveStats() {
    try {
      localStorage.setItem('earTrainingStats', JSON.stringify(this.stats));
    } catch (error) {
    }
  }
  
  /**
   * Carregar estatísticas
   */
  loadStats() {
    try {
      const saved = localStorage.getItem('earTrainingStats');
      if (saved) {
        this.stats = JSON.parse(saved);
      }
    } catch (error) {
    }
  }
  
  /**
   * Obter dificuldade recomendada
   */
  getRecommendedDifficulty() {
    const stats = this.getStats();
    
    if (stats.totalExercises < 10) {
      return 1; // Iniciante
    }
    
    if (stats.accuracy >= 80) {
      return Math.min(4, Math.max(1, Math.ceil(stats.accuracy / 25)));
    }
    
    return 1;
  }
}

// Exportar instância singleton
export const earTrainingEngine = new EarTrainingEngine();
export default EarTrainingEngine;

