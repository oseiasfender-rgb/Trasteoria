/**
 * HarmonicAnalyzer - Análise Harmônica Automática
 * 
 * Funcionalidades:
 * - Detecção automática de acordes
 * - Análise de progressões harmônicas
 * - Sugestões de próximos acordes
 * - Identificação de tonalidade
 * - Análise de tensão/resolução
 */

class HarmonicAnalyzer {
  constructor() {
    this.chordDatabase = this.createChordDatabase();
    this.progressionPatterns = this.createProgressionPatterns();
    this.tonalityPatterns = this.createTonalityPatterns();
    this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  }

  /**
   * Cria banco de dados de acordes
   */
  createChordDatabase() {
    const chords = {};

    // Acordes maiores
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}maj`] = [i, (i + 4) % 12, (i + 7) % 12];
      chords[`${root}`] = [i, (i + 4) % 12, (i + 7) % 12]; // Alias
    }

    // Acordes menores
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}min`] = [i, (i + 3) % 12, (i + 7) % 12];
      chords[`${root}m`] = [i, (i + 3) % 12, (i + 7) % 12]; // Alias
    }

    // Acordes dominantes
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}7`] = [i, (i + 4) % 12, (i + 7) % 12, (i + 10) % 12];
      chords[`${root}dom7`] = [i, (i + 4) % 12, (i + 7) % 12, (i + 10) % 12];
    }

    // Acordes maiores com sétima
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}maj7`] = [i, (i + 4) % 12, (i + 7) % 12, (i + 11) % 12];
    }

    // Acordes menores com sétima
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}m7`] = [i, (i + 3) % 12, (i + 7) % 12, (i + 10) % 12];
    }

    // Acordes diminutos
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}dim`] = [i, (i + 3) % 12, (i + 6) % 12];
    }

    // Acordes aumentados
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}aug`] = [i, (i + 4) % 12, (i + 8) % 12];
    }

    // Acordes sus
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}sus2`] = [i, (i + 2) % 12, (i + 7) % 12];
      chords[`${root}sus4`] = [i, (i + 5) % 12, (i + 7) % 12];
    }

    // Acordes nono
    for (let i = 0; i < 12; i++) {
      const root = this.notes[i];
      chords[`${root}maj9`] = [i, (i + 4) % 12, (i + 7) % 12, (i + 11) % 12, (i + 2) % 12];
      chords[`${root}m9`] = [i, (i + 3) % 12, (i + 7) % 12, (i + 10) % 12, (i + 2) % 12];
    }

    return chords;
  }

  /**
   * Cria padrões de progressões harmônicas
   */
  createProgressionPatterns() {
    return {
      // Progressões clássicas
      'I-IV-V-I': ['maj', 'maj', 'maj', 'maj'],
      'I-vi-IV-V': ['maj', 'min', 'maj', 'maj'],
      'I-V-vi-IV': ['maj', 'maj', 'min', 'maj'],
      'ii-V-I': ['min', 'maj', 'maj'],
      'vi-IV-I-V': ['min', 'maj', 'maj', 'maj'],

      // Progressões de blues
      'I-IV-I-V': ['maj', 'maj', 'maj', 'maj'],
      'I-IV-V': ['maj', 'maj', 'maj'],

      // Progressões de jazz
      'ii-V-I-vi': ['min', 'maj', 'maj', 'min'],
      'I-vi-ii-V': ['maj', 'min', 'min', 'maj'],

      // Progressões modernas
      'I-V-vi-IV': ['maj', 'maj', 'min', 'maj'],
      'vi-IV-I-V': ['min', 'maj', 'maj', 'maj'],
    };
  }

  /**
   * Cria padrões de tonalidade
   */
  createTonalityPatterns() {
    return {
      // Escalas maiores (Iônia)
      major: [0, 2, 4, 5, 7, 9, 11],
      // Escalas menores naturais (Eólia)
      minor: [0, 2, 3, 5, 7, 8, 10],
      // Escala menor harmônica
      harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
      // Escala menor melódica
      melodicMinor: [0, 2, 3, 5, 7, 9, 11],
    };
  }

  /**
   * Detecta acordes a partir de notas
   */
  detectChord(notes) {
    if (!Array.isArray(notes) || notes.length === 0) {
      return null;
    }

    // Normalizar notas para índices (0-11)
    const normalizedNotes = notes.map((note) => this.noteToIndex(note));
    const uniqueNotes = [...new Set(normalizedNotes)].sort((a, b) => a - b);

    // Encontrar acordes que correspondem
    const matches = [];
    for (const [chordName, chordNotes] of Object.entries(this.chordDatabase)) {
      const chordSet = new Set(chordNotes);
      const notesSet = new Set(uniqueNotes);

      // Verificar se todas as notas do acorde estão presentes
      let match = true;
      for (const note of chordSet) {
        if (!notesSet.has(note)) {
          match = false;
          break;
        }
      }

      if (match) {
        matches.push({
          name: chordName,
          notes: chordNotes,
          confidence: this.calculateConfidence(uniqueNotes, chordNotes),
        });
      }
    }

    // Retornar o melhor match
    if (matches.length > 0) {
      matches.sort((a, b) => b.confidence - a.confidence);
      return matches[0];
    }

    return null;
  }

  /**
   * Calcula confiança da detecção
   */
  calculateConfidence(detectedNotes, expectedNotes) {
    const intersection = detectedNotes.filter((n) => expectedNotes.includes(n)).length;
    return intersection / Math.max(detectedNotes.length, expectedNotes.length);
  }

  /**
   * Analisa progressão de acordes
   */
  analyzeProgression(chords) {
    if (!Array.isArray(chords) || chords.length === 0) {
      return null;
    }

    const analysis = {
      chords: chords,
      length: chords.length,
      tonality: this.identifyTonality(chords),
      functions: this.identifyChordFunctions(chords),
      tension: this.analyzeTension(chords),
      patterns: this.findPatterns(chords),
    };

    return analysis;
  }

  /**
   * Identifica a tonalidade
   */
  identifyTonality(chords) {
    // Contar ocorrências de acordes maiores vs menores
    let majorCount = 0;
    let minorCount = 0;

    chords.forEach((chord) => {
      if (chord.includes('min') || chord.includes('m')) {
        minorCount++;
      } else {
        majorCount++;
      }
    });

    return majorCount > minorCount ? 'major' : 'minor';
  }

  /**
   * Identifica funções harmônicas dos acordes
   */
  identifyChordFunctions(chords) {
    const functions = [];

    chords.forEach((chord, index) => {
      let function_ = 'other';

      if (chord.includes('maj') || (!chord.includes('min') && !chord.includes('dim'))) {
        function_ = 'tonic'; // I
      } else if (chord.includes('min')) {
        function_ = 'subdominant'; // ii, iii, vi
      } else if (chord.includes('dim')) {
        function_ = 'leading'; // vii°
      }

      // Ajustar baseado na posição
      if (index === chords.length - 1) {
        function_ = 'resolution';
      }

      functions.push(function_);
    });

    return functions;
  }

  /**
   * Analisa tensão/resolução
   */
  analyzeTension(chords) {
    const tensions = [];

    chords.forEach((chord) => {
      let tension = 0.5; // Neutro

      if (chord.includes('7') || chord.includes('dim')) {
        tension = 0.8; // Alto
      } else if (chord.includes('maj') || chord.includes('sus')) {
        tension = 0.3; // Baixo
      }

      tensions.push(tension);
    });

    return tensions;
  }

  /**
   * Encontra padrões conhecidos
   */
  findPatterns(chords) {
    const foundPatterns = [];

    for (const [patternName, patternTypes] of Object.entries(this.progressionPatterns)) {
      if (patternTypes.length === chords.length) {
        let match = true;
        for (let i = 0; i < chords.length; i++) {
          const chordType = chords[i].includes('min') ? 'min' : 'maj';
          if (chordType !== patternTypes[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          foundPatterns.push(patternName);
        }
      }
    }

    return foundPatterns;
  }

  /**
   * Sugere próximo acorde
   */
  suggestNextChord(currentChord, tonality = 'major', previousChords = []) {
    const suggestions = [];

    // Regras de progressão harmônica
    const progressionRules = {
      maj: ['maj', 'min', 'maj'], // Pode ir para IV, ii, V
      min: ['maj', 'maj', 'min'], // Pode ir para V, I, vi
      '7': ['maj'], // Dominante vai para I
      dim: ['maj'], // Diminuto vai para I
    };

    // Encontrar tipo do acorde atual
    let currentType = 'maj';
    if (currentChord.includes('min')) currentType = 'min';
    if (currentChord.includes('7')) currentType = '7';
    if (currentChord.includes('dim')) currentType = 'dim';

    // Obter acordes sugeridos
    const suggestedTypes = progressionRules[currentType] || ['maj'];

    // Gerar sugestões
    for (let i = 0; i < 12; i++) {
      for (const type of suggestedTypes) {
        const suggestion = `${this.notes[i]}${type === 'maj' ? '' : type}`;
        suggestions.push({
          chord: suggestion,
          type: type,
          probability: this.calculateProbability(currentChord, suggestion, previousChords),
        });
      }
    }

    // Ordenar por probabilidade
    suggestions.sort((a, b) => b.probability - a.probability);

    return suggestions.slice(0, 5); // Retornar top 5
  }

  /**
   * Calcula probabilidade de progressão
   */
  calculateProbability(currentChord, nextChord, previousChords = []) {
    let probability = 0.5;

    // Aumentar probabilidade para progressões conhecidas
    const progression = [...previousChords, currentChord, nextChord];
    for (const pattern of Object.values(this.progressionPatterns)) {
      if (pattern.length >= 2) {
        const lastTwo = pattern.slice(-2);
        if (this.matchesPattern(currentChord, nextChord, lastTwo)) {
          probability += 0.3;
        }
      }
    }

    return Math.min(1, probability);
  }

  /**
   * Verifica se corresponde a um padrão
   */
  matchesPattern(chord1, chord2, pattern) {
    const type1 = chord1.includes('min') ? 'min' : 'maj';
    const type2 = chord2.includes('min') ? 'min' : 'maj';
    return type1 === pattern[0] && type2 === pattern[1];
  }

  /**
   * Converte nota para índice (0-11)
   */
  noteToIndex(note) {
    const noteName = note.replace(/\d/g, '').toUpperCase();
    return this.notes.indexOf(noteName);
  }

  /**
   * Obtém voicings alternativos de um acorde
   */
  getAlternativeVoicings(chord) {
    const voicings = {
      root: 'Posição fundamental (raiz no baixo)',
      first: 'Primeira inversão (terça no baixo)',
      second: 'Segunda inversão (quinta no baixo)',
      drop2: 'Drop 2 (segunda nota uma oitava abaixo)',
      drop3: 'Drop 3 (terceira nota uma oitava abaixo)',
      spread: 'Spread voicing (notas espalhadas)',
    };

    return voicings;
  }

  /**
   * Sugere substituições harmônicas
   */
  suggestSubstitutions(chord) {
    const substitutions = [];

    // Tritone substitution (diminished fifth)
    const rootIndex = this.noteToIndex(chord);
    const tritoneIndex = (rootIndex + 6) % 12;
    substitutions.push(`${this.notes[tritoneIndex]}7`);

    // Relative minor/major
    if (chord.includes('maj')) {
      const relativeMinor = (rootIndex + 9) % 12;
      substitutions.push(`${this.notes[relativeMinor]}min`);
    } else if (chord.includes('min')) {
      const relativeMajor = (rootIndex + 3) % 12;
      substitutions.push(`${this.notes[relativeMajor]}maj`);
    }

    // Parallel minor/major
    if (chord.includes('maj')) {
      substitutions.push(`${this.notes[rootIndex]}min`);
    } else if (chord.includes('min')) {
      substitutions.push(`${this.notes[rootIndex]}maj`);
    }

    return substitutions;
  }

  /**
   * Analisa complexidade harmônica
   */
  analyzeComplexity(chords) {
    let complexity = 0;

    chords.forEach((chord) => {
      if (chord.includes('7') || chord.includes('9') || chord.includes('11')) {
        complexity += 2;
      } else if (chord.includes('maj') || chord.includes('min')) {
        complexity += 1;
      }
    });

    return {
      score: complexity,
      level: complexity < 5 ? 'simple' : complexity < 10 ? 'intermediate' : 'complex',
    };
  }

  /**
   * Gera análise completa
   */
  generateFullAnalysis(chords) {
    return {
      progression: this.analyzeProgression(chords),
      complexity: this.analyzeComplexity(chords),
      suggestions: this.suggestNextChord(chords[chords.length - 1], 'major', chords.slice(0, -1)),
      substitutions: chords.map((chord) => ({
        chord: chord,
        alternatives: this.suggestSubstitutions(chord),
      })),
    };
  }
}

export default HarmonicAnalyzer;
