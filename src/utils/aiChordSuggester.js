/**
 * 🤖 AI Chord Suggester
 * Sistema inteligente de sugestão de acordes baseado em teoria musical
 */

class AIChordSuggester {
  constructor() {
    // Base de dados de progressões harmônicas comuns
    this.commonProgressions = {
      // Progressões em Maior
      major: [
        { pattern: ['I', 'IV', 'V', 'I'], weight: 10, name: 'Cadência Autêntica' },
        { pattern: ['I', 'V', 'vi', 'IV'], weight: 10, name: 'Pop Progression' },
        { pattern: ['I', 'vi', 'IV', 'V'], weight: 9, name: '50s Progression' },
        { pattern: ['I', 'IV', 'I', 'V'], weight: 8, name: 'Blues Básico' },
        { pattern: ['I', 'V', 'IV', 'I'], weight: 7, name: 'Rock Básico' },
        { pattern: ['I', 'iii', 'vi', 'IV'], weight: 6, name: 'Descending Thirds' },
        { pattern: ['I', 'ii', 'V', 'I'], weight: 9, name: 'Jazz Turnaround' },
        { pattern: ['I', 'vi', 'ii', 'V'], weight: 8, name: 'Circle of Fifths' },
        { pattern: ['I', 'IV', 'vi', 'V'], weight: 7, name: 'Variação Pop' },
        { pattern: ['I', 'V', 'vi', 'iii', 'IV'], weight: 6, name: 'Canon Progression' }
      ],
      
      // Progressões em Menor
      minor: [
        { pattern: ['i', 'iv', 'v', 'i'], weight: 9, name: 'Menor Natural' },
        { pattern: ['i', 'VI', 'III', 'VII'], weight: 8, name: 'Andalusian' },
        { pattern: ['i', 'iv', 'VII', 'i'], weight: 7, name: 'Rock Menor' },
        { pattern: ['i', 'V', 'i', 'V'], weight: 6, name: 'Menor Simples' },
        { pattern: ['i', 'VI', 'VII', 'i'], weight: 7, name: 'Progressão Épica' },
        { pattern: ['i', 'VII', 'VI', 'V'], weight: 6, name: 'Descending Minor' },
        { pattern: ['i', 'iv', 'V', 'i'], weight: 8, name: 'Harmonic Minor' },
        { pattern: ['i', 'III', 'VII', 'IV'], weight: 5, name: 'Modal Minor' }
      ]
    };
    
    // Funções harmônicas e suas relações
    this.harmonicFunctions = {
      // Em Maior
      major: {
        'I': { function: 'tonic', tension: 0, nextPreferred: ['IV', 'V', 'vi', 'ii'] },
        'ii': { function: 'subdominant', tension: 3, nextPreferred: ['V', 'vii°'] },
        'iii': { function: 'tonic', tension: 2, nextPreferred: ['vi', 'IV'] },
        'IV': { function: 'subdominant', tension: 4, nextPreferred: ['V', 'I', 'ii'] },
        'V': { function: 'dominant', tension: 8, nextPreferred: ['I', 'vi'] },
        'vi': { function: 'tonic', tension: 2, nextPreferred: ['ii', 'IV', 'V'] },
        'vii°': { function: 'dominant', tension: 9, nextPreferred: ['I'] }
      },
      
      // Em Menor
      minor: {
        'i': { function: 'tonic', tension: 0, nextPreferred: ['iv', 'V', 'VI', 'III'] },
        'ii°': { function: 'subdominant', tension: 5, nextPreferred: ['V'] },
        'III': { function: 'tonic', tension: 2, nextPreferred: ['VI', 'iv'] },
        'iv': { function: 'subdominant', tension: 4, nextPreferred: ['V', 'i', 'VII'] },
        'V': { function: 'dominant', tension: 8, nextPreferred: ['i', 'VI'] },
        'VI': { function: 'tonic', tension: 1, nextPreferred: ['III', 'VII', 'iv'] },
        'VII': { function: 'subdominant', tension: 3, nextPreferred: ['i', 'III'] }
      }
    };
    
    // Histórico de acordes
    this.chordHistory = [];
    this.maxHistoryLength = 8;
  }
  
  /**
   * Adicionar acorde ao histórico
   */
  addChord(chord) {
    this.chordHistory.push(chord);
    
    if (this.chordHistory.length > this.maxHistoryLength) {
      this.chordHistory.shift();
    }
  }
  
  /**
   * Limpar histórico
   */
  clearHistory() {
    this.chordHistory = [];
  }
  
  /**
   * Obter histórico
   */
  getHistory() {
    return [...this.chordHistory];
  }
  
  /**
   * Sugerir próximo acorde
   */
  suggestNext(currentKey = 'C', mode = 'major', count = 3) {
    const suggestions = [];
    const lastChord = this.chordHistory[this.chordHistory.length - 1];
    
    // Se não há histórico, sugerir acordes iniciais
    if (!lastChord) {
      return this.suggestInitialChords(mode, count);
    }
    
    // Análise baseada em progressões comuns
    const progressionSuggestions = this.analyzeProgressions(mode);
    
    // Análise baseada em função harmônica
    const functionSuggestions = this.analyzeFunctions(lastChord, mode);
    
    // Combinar sugestões
    const combined = this.combineAndRank(
      progressionSuggestions,
      functionSuggestions,
      mode
    );
    
    // Retornar top N sugestões
    return combined.slice(0, count);
  }
  
  /**
   * Sugerir acordes iniciais
   */
  suggestInitialChords(mode, count) {
    const suggestions = [];
    
    if (mode === 'major') {
      suggestions.push(
        { chord: 'I', confidence: 100, reason: 'Tônica - início ideal' },
        { chord: 'IV', confidence: 70, reason: 'Subdominante - início comum' },
        { chord: 'vi', confidence: 60, reason: 'Relativa menor - início alternativo' }
      );
    } else {
      suggestions.push(
        { chord: 'i', confidence: 100, reason: 'Tônica menor - início ideal' },
        { chord: 'iv', confidence: 70, reason: 'Subdominante menor - início comum' },
        { chord: 'VI', confidence: 60, reason: 'Relativa maior - início alternativo' }
      );
    }
    
    return suggestions.slice(0, count);
  }
  
  /**
   * Analisar progressões comuns
   */
  analyzeProgressions(mode) {
    const suggestions = new Map();
    const progressions = this.commonProgressions[mode] || [];
    const historyLength = this.chordHistory.length;
    
    // Para cada progressão conhecida
    progressions.forEach(progression => {
      const pattern = progression.pattern;
      
      // Verificar se o histórico recente combina com parte da progressão
      for (let i = 0; i < pattern.length - 1; i++) {
        const patternSlice = pattern.slice(i, i + historyLength);
        
        if (this.matchesHistory(patternSlice)) {
          const nextChord = pattern[i + historyLength];
          
          if (nextChord) {
            const currentScore = suggestions.get(nextChord) || 0;
            suggestions.set(
              nextChord,
              currentScore + progression.weight
            );
          }
        }
      }
    });
    
    // Converter para array de objetos
    return Array.from(suggestions.entries()).map(([chord, score]) => ({
      chord,
      score,
      source: 'progression'
    }));
  }
  
  /**
   * Verificar se padrão combina com histórico
   */
  matchesHistory(pattern) {
    if (pattern.length > this.chordHistory.length) {
      return false;
    }
    
    const recentHistory = this.chordHistory.slice(-pattern.length);
    
    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] !== recentHistory[i]) {
        return false;
      }
    }
    
    return true;
  }
  
  /**
   * Analisar funções harmônicas
   */
  analyzeFunctions(lastChord, mode) {
    const suggestions = [];
    const functions = this.harmonicFunctions[mode] || {};
    const chordData = functions[lastChord];
    
    if (!chordData) {
      return suggestions;
    }
    
    // Sugerir acordes preferidos baseado na função
    chordData.nextPreferred.forEach((chord, index) => {
      const score = 10 - index; // Decrescente por preferência
      suggestions.push({
        chord,
        score,
        source: 'function'
      });
    });
    
    return suggestions;
  }
  
  /**
   * Combinar e rankear sugestões
   */
  combineAndRank(progressionSuggestions, functionSuggestions, mode) {
    const combined = new Map();
    
    // Adicionar sugestões de progressão (peso 2x)
    progressionSuggestions.forEach(({ chord, score }) => {
      combined.set(chord, (combined.get(chord) || 0) + score * 2);
    });
    
    // Adicionar sugestões de função (peso 1x)
    functionSuggestions.forEach(({ chord, score }) => {
      combined.set(chord, (combined.get(chord) || 0) + score);
    });
    
    // Converter para array e ordenar
    const ranked = Array.from(combined.entries())
      .map(([chord, score]) => {
        const confidence = Math.min(100, Math.round((score / 30) * 100));
        const reason = this.getReasonForChord(chord, mode);
        
        return { chord, confidence, reason };
      })
      .sort((a, b) => b.confidence - a.confidence);
    
    return ranked;
  }
  
  /**
   * Obter razão para sugestão de acorde
   */
  getReasonForChord(chord, mode) {
    const functions = this.harmonicFunctions[mode] || {};
    const chordData = functions[chord];
    
    if (!chordData) {
      return 'Acorde válido no campo harmônico';
    }
    
    const functionName = {
      'tonic': 'Tônica',
      'subdominant': 'Subdominante',
      'dominant': 'Dominante'
    }[chordData.function] || chordData.function;
    
    const tensionLevel = chordData.tension > 6 ? 'Alta tensão' :
                        chordData.tension > 3 ? 'Média tensão' :
                        'Baixa tensão';
    
    return `${functionName} - ${tensionLevel}`;
  }
  
  /**
   * Analisar progressão atual
   */
  analyzeCurrentProgression() {
    if (this.chordHistory.length < 2) {
      return {
        quality: 'Iniciando',
        suggestions: ['Continue adicionando acordes para análise']
      };
    }
    
    const analysis = {
      length: this.chordHistory.length,
      pattern: this.chordHistory.join(' - '),
      quality: 'Boa',
      suggestions: []
    };
    
    // Verificar se termina em tônica
    const lastChord = this.chordHistory[this.chordHistory.length - 1];
    if (lastChord === 'I' || lastChord === 'i') {
      analysis.suggestions.push('Progressão finalizada na tônica - soa resolvida');
    } else {
      analysis.suggestions.push('Considere finalizar na tônica para resolução');
    }
    
    // Verificar tensão
    const hasDominant = this.chordHistory.some(c => c === 'V' || c === 'V7');
    if (hasDominant) {
      analysis.suggestions.push('Contém dominante - boa tensão harmônica');
    }
    
    return analysis;
  }
}

// Exportar instância singleton
export const aiChordSuggester = new AIChordSuggester();
export default AIChordSuggester;

