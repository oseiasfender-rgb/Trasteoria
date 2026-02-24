// Módulo de Síntese de Áudio para o Aplicativo de Modos Gregos
// Usando Web Audio API para geração de áudio em tempo real

class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.isInitialized = false;
    this.activeOscillators = new Map();
    
    // Frequências das notas (C4 = 261.63Hz como referência - oitava central)
    this.noteFrequencies = {
      'C': 261.63,
      'C#': 277.18, 'Db': 277.18,
      'D': 293.66,
      'D#': 311.13, 'Eb': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99, 'Gb': 369.99,
      'G': 392.00,
      'G#': 415.30, 'Ab': 415.30,
      'A': 440.00,
      'A#': 466.16, 'Bb': 466.16,
      'B': 493.88
    };
    
    // Range de oitavas disponíveis (baixo de 5 cordas até guitarra aguda)
    this.octaveRange = {
      min: 0,  // B0 (corda B grave do baixo de 5 cordas = 30.87 Hz)
      max: 6,  // E6 (notas mais agudas da guitarra)
      default: 4  // C4 (oitava central de referência)
    };
    
    // Referências de frequência por oitava
    // Oitava 0: B0 = 30.87 Hz (baixo de 5 cordas)
    // Oitava 1: E1 = 41.20 Hz (corda E do baixo de 4 cordas)
    // Oitava 2: E2 = 82.41 Hz (corda E grave da guitarra)
    // Oitava 4: C4 = 261.63 Hz (oitava central)
    // Oitava 6: E6 = 1318.51 Hz (notas agudas da guitarra)

    // Presets de timbres
    this.timbres = {
      guitar: {
        type: 'sawtooth',
        attack: 0.01,
        decay: 0.3,
        sustain: 0.7,
        release: 1.0,
        filterFreq: 2000,
        filterQ: 1
      },
      piano: {
        type: 'triangle',
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.8,
        filterFreq: 3000,
        filterQ: 0.5
      },
      bass: {
        type: 'sine',
        attack: 0.01,
        decay: 0.2,
        sustain: 0.8,
        release: 0.5,
        filterFreq: 800,
        filterQ: 2
      },
      lead: {
        type: 'square',
        attack: 0.01,
        decay: 0.1,
        sustain: 0.9,
        release: 0.3,
        filterFreq: 4000,
        filterQ: 3
      }
    };
  }

  async initialize() {
    try {
      // Criar contexto de áudio com fallback para diferentes navegadores
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Verificar se o contexto foi criado com sucesso
      if (!this.audioContext) {
        throw new Error('Não foi possível criar o contexto de áudio');
      }

      // Criar nó de ganho master
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);

      // Resumir o contexto se estiver suspenso (necessário para alguns navegadores)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      this.isInitialized = false;
      return false;
    }
  }

  // Método para garantir que o contexto está ativo
  async ensureContext() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    return this.isInitialized;
  }

  // Obter frequência de uma nota em uma oitava específica
  getNoteFrequency(note, octave = 4) {
    const baseFreq = this.noteFrequencies[note];
    if (!baseFreq) return null;
    
    // Calcular frequência baseada na oitava (A4 = 440Hz é a referência)
    const octaveMultiplier = Math.pow(2, octave - 4);
    return baseFreq * octaveMultiplier;
  }

  // Tocar uma nota individual
  async playNote(note, octave = 4, duration = 1.0, timbre = 'guitar') {
    if (!await this.ensureContext()) {
      return;
    }

    const frequency = this.getNoteFrequency(note, octave);
    if (!frequency) {
      return;
    }

    const preset = this.timbres[timbre] || this.timbres.guitar;
    const now = this.audioContext.currentTime;

    // Criar oscilador
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = preset.type;
    oscillator.frequency.setValueAtTime(frequency, now);

    // Criar envelope ADSR
    const gainNode = this.audioContext.createGain();
    
    // Criar filtro
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(preset.filterFreq, now);
    filter.Q.setValueAtTime(preset.filterQ, now);

    // Conectar nós
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Configurar envelope ADSR
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + preset.attack);
    gainNode.gain.exponentialRampToValueAtTime(preset.sustain, now + preset.attack + preset.decay);
    gainNode.gain.setValueAtTime(preset.sustain, now + duration - preset.release);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Iniciar e parar oscilador
    oscillator.start(now);
    oscillator.stop(now + duration);

    // Limpar referências
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
      filter.disconnect();
    };

    return oscillator;
  }

  // Tocar um intervalo (duas notas sequenciais)
  async playInterval(semitons, baseNote = 'C', octave = 4, timbre = 'guitar') {
    if (!await this.ensureContext()) {
      return;
    }

    // Tocar nota base
    await this.playNote(baseNote, octave, 1.0, timbre);
    
    // Aguardar um pouco e tocar a segunda nota
    setTimeout(async () => {
      // Calcular a segunda nota baseada nos semitons
      const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const baseIndex = notes.indexOf(baseNote);
      const targetIndex = (baseIndex + semitons) % 12;
      const targetOctave = octave + Math.floor((baseIndex + semitons) / 12);
      const targetNote = notes[targetIndex];
      
      await this.playNote(targetNote, targetOctave, 1.0, timbre);
    }, 600);
  }

  // Tocar um acorde (múltiplas notas simultaneamente) com voicing em múltiplas oitavas
  async playChord(notes, baseOctave = 3, duration = 2.0, timbre = 'guitar', voicing = 'spread') {
    if (!Array.isArray(notes)) return;
    
    const oscillators = [];
    
    if (voicing === 'spread') {
      // Voicing espalhado em 3 oitavas (som mais rico)
      for (let i = 0; i < notes.length; i++) {
        const octaveOffset = Math.floor(i / 3); // Distribui em 3 oitavas
        const currentOctave = baseOctave + octaveOffset;
        const osc = await this.playNote(notes[i], currentOctave, duration, timbre);
        if (osc) oscillators.push(osc);
      }
    } else if (voicing === 'close') {
      // Voicing fechado (todas as notas na mesma oitava)
      for (const note of notes) {
        const osc = await this.playNote(note, baseOctave, duration, timbre);
        if (osc) oscillators.push(osc);
      }
    } else if (voicing === 'drop2') {
      // Drop 2 voicing (segunda nota uma oitava abaixo)
      for (let i = 0; i < notes.length; i++) {
        const octave = i === 1 ? baseOctave - 1 : baseOctave;
        const osc = await this.playNote(notes[i], octave, duration, timbre);
        if (osc) oscillators.push(osc);
      }
    }
    
    return oscillators;
  }

  // Tocar uma progressão de acordes
  async playProgression(chords, octave = 4, chordDuration = 2.0, timbre = 'guitar') {
    if (!Array.isArray(chords)) return;
    
    for (let i = 0; i < chords.length; i++) {
      setTimeout(() => {
        this.playChord(chords[i], octave, chordDuration, timbre);
      }, i * chordDuration * 1000);
    }
  }

  // Tocar uma escala em múltiplas oitavas
  async playScale(notes, startOctave = 3, numOctaves = 3, noteDuration = 0.3, timbre = 'guitar', direction = 'ascending') {
    if (!Array.isArray(notes)) return;
    
    const allNotes = [];
    
    // Gerar notas para todas as oitavas
    for (let oct = 0; oct < numOctaves; oct++) {
      const currentOctave = startOctave + oct;
      notes.forEach(note => {
        allNotes.push({ note, octave: currentOctave });
      });
    }
    
    // Inverter se descendente
    if (direction === 'descending') {
      allNotes.reverse();
    }
    
    // Tocar todas as notas sequencialmente
    for (let i = 0; i < allNotes.length; i++) {
      setTimeout(() => {
        this.playNote(allNotes[i].note, allNotes[i].octave, noteDuration, timbre);
      }, i * noteDuration * 1000);
    }
  }

  // Definir volume master
  setMasterVolume(volume) {
    if (this.masterGain && volume >= 0 && volume <= 1) {
      this.masterGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
    }
  }

  // Parar todos os sons
  stopAll() {
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscilador já parado
      }
    });
    this.activeOscillators.clear();
  }

  // Método estático para parsing de acordes (ex: "Cmaj7" -> ["C", "E", "G", "B"])
  static parseChord(chordSymbol) {
    // Implementação básica - pode ser expandida
    const chordMap = {
      'C': ['C', 'E', 'G'],
      'Cmaj7': ['C', 'E', 'G', 'B'],
      'Cm': ['C', 'Eb', 'G'],
      'Cm7': ['C', 'Eb', 'G', 'Bb'],
      'D': ['D', 'F#', 'A'],
      'Dm': ['D', 'F', 'A'],
      'Dm7': ['D', 'F', 'A', 'C'],
      'E': ['E', 'G#', 'B'],
      'Em': ['E', 'G', 'B'],
      'Em7': ['E', 'G', 'B', 'D'],
      'F': ['F', 'A', 'C'],
      'Fmaj7': ['F', 'A', 'C', 'E'],
      'G': ['G', 'B', 'D'],
      'G7': ['G', 'B', 'D', 'F'],
      'A': ['A', 'C#', 'E'],
      'Am': ['A', 'C', 'E'],
      'Am7': ['A', 'C', 'E', 'G'],
      'B': ['B', 'D#', 'F#'],
      'Bm7b5': ['B', 'D', 'F', 'A']
    };
    
    return chordMap[chordSymbol] || ['C', 'E', 'G'];
  }
}

// Criar instância global
const audioEngine = new AudioEngine();

// Funções de conveniência para exportação


export { AudioEngine, audioEngine };
export default AudioEngine;

