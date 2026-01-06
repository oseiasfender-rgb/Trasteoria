// sequencerEngine.js
// Sequenciador de 5 partes para estruturar músicas
// Controla ordem, repetições e intensidades de cada parte

class SequencerEngine {
  constructor() {
    this.parts = [
      {
        id: 1,
        name: 'Intro',
        chords: ['C', 'Am', 'F', 'G'],
        bars: 4,
        intensity: 0.5, // 0-1 (volume/densidade)
        drumIntensity: 0.6,
        bassIntensity: 0.5,
        active: true
      },
      {
        id: 2,
        name: 'Verso',
        chords: ['C', 'G', 'Am', 'F'],
        bars: 8,
        intensity: 0.7,
        drumIntensity: 0.7,
        bassIntensity: 0.7,
        active: true
      },
      {
        id: 3,
        name: 'Refrão',
        chords: ['F', 'G', 'C', 'Am'],
        bars: 8,
        intensity: 1.0,
        drumIntensity: 1.0,
        bassIntensity: 0.9,
        active: true
      },
      {
        id: 4,
        name: 'Ponte',
        chords: ['Am', 'F', 'C', 'G'],
        bars: 4,
        intensity: 0.6,
        drumIntensity: 0.5,
        bassIntensity: 0.6,
        active: false
      },
      {
        id: 5,
        name: 'Solo',
        chords: ['C', 'G', 'Am', 'F'],
        bars: 8,
        intensity: 0.9,
        drumIntensity: 0.9,
        bassIntensity: 0.8,
        active: false
      }
    ];
    
    // Sequência de execução (IDs das partes)
    this.sequence = [1, 2, 3, 2, 3]; // Intro → Verso → Refrão → Verso → Refrão
    
    this.currentPartIndex = 0;
    this.isPlaying = false;
    this.loopEnabled = true;
    this.onPartChange = null; // Callback quando muda de parte
  }

  // Obter parte atual
  getCurrentPart() {
    if (this.sequence.length === 0) return null;
    const partId = this.sequence[this.currentPartIndex];
    return this.parts.find(p => p.id === partId);
  }

  // Obter próxima parte
  getNextPart() {
    if (this.sequence.length === 0) return null;
    const nextIndex = (this.currentPartIndex + 1) % this.sequence.length;
    const partId = this.sequence[nextIndex];
    return this.parts.find(p => p.id === partId);
  }

  // Avançar para próxima parte
  nextPart() {
    if (this.sequence.length === 0) return null;
    
    this.currentPartIndex++;
    
    // Se chegou ao fim da sequência
    if (this.currentPartIndex >= this.sequence.length) {
      if (this.loopEnabled) {
        this.currentPartIndex = 0; // Volta ao início
      } else {
        this.stop();
        return null;
      }
    }
    
    const currentPart = this.getCurrentPart();
    
    // Chamar callback se definido
    if (this.onPartChange && currentPart) {
      this.onPartChange(currentPart);
    }
    
    return currentPart;
  }

  // Voltar para parte anterior
  previousPart() {
    if (this.sequence.length === 0) return null;
    
    this.currentPartIndex--;
    
    if (this.currentPartIndex < 0) {
      this.currentPartIndex = this.sequence.length - 1;
    }
    
    const currentPart = this.getCurrentPart();
    
    if (this.onPartChange && currentPart) {
      this.onPartChange(currentPart);
    }
    
    return currentPart;
  }

  // Ir para parte específica
  goToPart(partId) {
    const index = this.sequence.findIndex(id => id === partId);
    if (index !== -1) {
      this.currentPartIndex = index;
      const currentPart = this.getCurrentPart();
      
      if (this.onPartChange && currentPart) {
        this.onPartChange(currentPart);
      }
      
      return currentPart;
    }
    return null;
  }

  // Atualizar parte
  updatePart(partId, updates) {
    const part = this.parts.find(p => p.id === partId);
    if (part) {
      Object.assign(part, updates);
      return part;
    }
    return null;
  }

  // Atualizar sequência
  setSequence(newSequence) {
    // Validar que todos os IDs existem
    const validSequence = newSequence.filter(id => 
      this.parts.some(p => p.id === id)
    );
    
    if (validSequence.length > 0) {
      this.sequence = validSequence;
      this.currentPartIndex = 0;
      return true;
    }
    return false;
  }

  // Adicionar parte à sequência
  addToSequence(partId, position = -1) {
    const part = this.parts.find(p => p.id === partId);
    if (!part) return false;
    
    if (position === -1 || position >= this.sequence.length) {
      this.sequence.push(partId);
    } else {
      this.sequence.splice(position, 0, partId);
    }
    
    return true;
  }

  // Remover parte da sequência
  removeFromSequence(position) {
    if (position >= 0 && position < this.sequence.length) {
      this.sequence.splice(position, 1);
      
      // Ajustar currentPartIndex se necessário
      if (this.currentPartIndex >= this.sequence.length) {
        this.currentPartIndex = Math.max(0, this.sequence.length - 1);
      }
      
      return true;
    }
    return false;
  }

  // Mover parte na sequência
  moveInSequence(fromPosition, toPosition) {
    if (fromPosition >= 0 && fromPosition < this.sequence.length &&
        toPosition >= 0 && toPosition < this.sequence.length) {
      const partId = this.sequence.splice(fromPosition, 1)[0];
      this.sequence.splice(toPosition, 0, partId);
      return true;
    }
    return false;
  }

  // Ativar/desativar parte
  togglePart(partId) {
    const part = this.parts.find(p => p.id === partId);
    if (part) {
      part.active = !part.active;
      return part.active;
    }
    return false;
  }

  // Obter duração total da sequência (em compassos)
  getTotalBars() {
    return this.sequence.reduce((total, partId) => {
      const part = this.parts.find(p => p.id === partId);
      return total + (part ? part.bars : 0);
    }, 0);
  }

  // Obter duração total em segundos
  getTotalDuration(bpm) {
    const totalBars = this.getTotalBars();
    const beatsPerBar = 4; // Assumindo 4/4
    const totalBeats = totalBars * beatsPerBar;
    const secondsPerBeat = 60 / bpm;
    return totalBeats * secondsPerBeat;
  }

  // Calcular em qual parte está baseado no tempo decorrido
  getPartAtTime(elapsedSeconds, bpm) {
    const beatsPerBar = 4;
    const secondsPerBeat = 60 / bpm;
    const secondsPerBar = secondsPerBeat * beatsPerBar;
    
    let accumulatedSeconds = 0;
    
    for (let i = 0; i < this.sequence.length; i++) {
      const partId = this.sequence[i];
      const part = this.parts.find(p => p.id === partId);
      
      if (!part) continue;
      
      const partDuration = part.bars * secondsPerBar;
      
      if (elapsedSeconds < accumulatedSeconds + partDuration) {
        return { index: i, part, timeInPart: elapsedSeconds - accumulatedSeconds };
      }
      
      accumulatedSeconds += partDuration;
    }
    
    return null;
  }

  // Iniciar reprodução
  start() {
    this.isPlaying = true;
    this.currentPartIndex = 0;
    
    const currentPart = this.getCurrentPart();
    if (this.onPartChange && currentPart) {
      this.onPartChange(currentPart);
    }
  }

  // Parar reprodução
  stop() {
    this.isPlaying = false;
  }

  // Pausar/retomar
  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    return this.isPlaying;
  }

  // Resetar para início
  reset() {
    this.currentPartIndex = 0;
    this.isPlaying = false;
  }

  // Ativar/desativar loop
  toggleLoop() {
    this.loopEnabled = !this.loopEnabled;
    return this.loopEnabled;
  }

  // Exportar configuração
  export() {
    return {
      parts: JSON.parse(JSON.stringify(this.parts)),
      sequence: [...this.sequence],
      loopEnabled: this.loopEnabled
    };
  }

  // Importar configuração
  import(config) {
    if (config.parts) {
      this.parts = config.parts;
    }
    if (config.sequence) {
      this.sequence = config.sequence;
    }
    if (typeof config.loopEnabled !== 'undefined') {
      this.loopEnabled = config.loopEnabled;
    }
    this.currentPartIndex = 0;
  }

  // Criar sequência padrão para um gênero
  createDefaultSequence(genre) {
    const templates = {
      rock: [1, 2, 3, 2, 3, 5, 3], // Intro, Verso, Refrão, Verso, Refrão, Solo, Refrão
      blues: [1, 2, 2, 3, 2, 5, 3], // Intro, Verso, Verso, Refrão, Verso, Solo, Refrão
      jazz: [1, 2, 3, 2, 4, 5, 3], // Intro, Verso, Refrão, Verso, Ponte, Solo, Refrão
      pop: [1, 2, 3, 2, 3, 4, 3, 3], // Intro, Verso, Refrão, Verso, Refrão, Ponte, Refrão, Refrão
      metal: [1, 2, 3, 2, 5, 3, 3], // Intro, Verso, Refrão, Verso, Solo, Refrão, Refrão
      country: [1, 2, 3, 2, 3, 5, 3], // Intro, Verso, Refrão, Verso, Refrão, Solo, Refrão
      default: [1, 2, 3, 2, 3] // Intro, Verso, Refrão, Verso, Refrão
    };
    
    this.setSequence(templates[genre] || templates.default);
  }

  // Getters
  getParts() {
    return this.parts;
  }

  getSequence() {
    return this.sequence;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getLoopEnabled() {
    return this.loopEnabled;
  }

  getCurrentPartIndex() {
    return this.currentPartIndex;
  }
}

// Instância global
export const sequencerEngine = new SequencerEngine();
export default sequencerEngine;

