/**
 * audioEngineFixed.js - Engine de Áudio Corrigido e Otimizado
 * 
 * Versão 2.0 - Corrige problemas de áudio e integra melhor com Web Audio API
 */

class AudioEngineFixed {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.isInitialized = false;
    this.activeOscillators = new Map();
    this.activeGains = new Map();
    this.oscillatorId = 0;
    
    // Frequências das notas (C4 = 261.63Hz como referência)
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
    
    // Range de oitavas
    this.octaveRange = {
      min: 0,
      max: 6,
      default: 4
    };

    // Presets de timbres melhorados
    this.timbres = {
      guitar: {
        type: 'sawtooth',
        attack: 0.01,
        decay: 0.3,
        sustain: 0.7,
        release: 1.0,
        filterFreq: 2000,
        filterQ: 1,
        volume: 0.3
      },
      piano: {
        type: 'triangle',
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 0.8,
        filterFreq: 3000,
        filterQ: 0.5,
        volume: 0.3
      },
      bass: {
        type: 'sine',
        attack: 0.01,
        decay: 0.2,
        sustain: 0.8,
        release: 0.5,
        filterFreq: 800,
        filterQ: 2,
        volume: 0.25
      },
      lead: {
        type: 'square',
        attack: 0.01,
        decay: 0.1,
        sustain: 0.9,
        release: 0.3,
        filterFreq: 4000,
        filterQ: 3,
        volume: 0.2
      },
      sine: {
        type: 'sine',
        attack: 0.01,
        decay: 0.1,
        sustain: 0.5,
        release: 0.5,
        filterFreq: 5000,
        filterQ: 1,
        volume: 0.3
      }
    };
  }

  /**
   * Inicializar o engine de áudio
   */
  async initialize() {
    try {
      // Criar contexto de áudio
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
      
      if (!this.audioContext) {
        throw new Error('Não foi possível criar o contexto de áudio');
      }

      // Criar nó de ganho master
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.setValueAtTime(0.3, this.audioContext.currentTime);

      // Resumir o contexto se estiver suspenso
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.isInitialized = true;
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Calcular frequência de uma nota
   */
  getFrequency(note, octave = 4) {
    try {
      // Extrair a nota base (sem oitava)
      const noteBase = note.replace(/\d/g, '');
      
      if (!this.noteFrequencies[noteBase]) {
        throw new Error(`Nota inválida: ${noteBase}`);
      }

      // Calcular frequência baseada na oitava
      const baseFreq = this.noteFrequencies[noteBase];
      const octaveDiff = octave - 4; // C4 é a referência
      const frequency = baseFreq * Math.pow(2, octaveDiff);

      return frequency;
    } catch (error) {
      return 440; // Fallback para A4
    }
  }

  /**
   * Reproduzir uma nota simples
   */
  playNote(note, octave = 4, duration = 1, timbre = 'piano', volume = 0.3) {
    try {
      if (!this.isInitialized) {
        return;
      }

      const frequency = this.getFrequency(note, octave);
      const timbreConfig = this.timbres[timbre] || this.timbres.piano;
      
      // Criar oscilador
      const oscillator = this.audioContext.createOscillator();
      oscillator.type = timbreConfig.type;
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

      // Criar ganho para ADSR
      const gain = this.audioContext.createGain();
      const now = this.audioContext.currentTime;

      // ADSR Envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume, now + timbreConfig.attack);
      gain.gain.linearRampToValueAtTime(
        volume * timbreConfig.sustain,
        now + timbreConfig.attack + timbreConfig.decay
      );
      gain.gain.linearRampToValueAtTime(0, now + duration + timbreConfig.release);

      // Conectar
      oscillator.connect(gain);
      gain.connect(this.masterGain);

      // Iniciar e parar
      oscillator.start(now);
      oscillator.stop(now + duration + timbreConfig.release);

      // Armazenar referência
      const id = this.oscillatorId++;
      this.activeOscillators.set(id, oscillator);
      this.activeGains.set(id, gain);

      // Limpar referência após terminar
      setTimeout(() => {
        this.activeOscillators.delete(id);
        this.activeGains.delete(id);
      }, (duration + timbreConfig.release) * 1000 + 100);

      return id;
    } catch (error) {
      return null;
    }
  }

  /**
   * Reproduzir um acorde
   */
  playChord(baseNote, chordType = 'major', octave = 4, duration = 2, timbre = 'piano', volume = 0.3) {
    try {
      if (!this.isInitialized) {
        return;
      }

      // Definir intervalos de acordes em semitons
      const chords = {
        major: [0, 4, 7],
        minor: [0, 3, 7],
        dominant7: [0, 4, 7, 10],
        maj7: [0, 4, 7, 11],
        min7: [0, 3, 7, 10],
        sus2: [0, 2, 7],
        sus4: [0, 5, 7],
        diminished: [0, 3, 6],
        augmented: [0, 4, 8]
      };

      const intervals = chords[chordType] || chords.major;
      const ids = [];

      // Tocar cada nota do acorde
      for (const interval of intervals) {
        // Calcular a nota
        const semitones = interval;
        const noteFreq = this.getFrequency(baseNote, octave) * Math.pow(2, semitones / 12);
        
        // Criar oscilador
        const oscillator = this.audioContext.createOscillator();
        const timbreConfig = this.timbres[timbre] || this.timbres.piano;
        oscillator.type = timbreConfig.type;
        oscillator.frequency.setValueAtTime(noteFreq, this.audioContext.currentTime);

        // Criar ganho
        const gain = this.audioContext.createGain();
        const now = this.audioContext.currentTime;

        // ADSR
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + timbreConfig.attack);
        gain.gain.linearRampToValueAtTime(
          volume * timbreConfig.sustain,
          now + timbreConfig.attack + timbreConfig.decay
        );
        gain.gain.linearRampToValueAtTime(0, now + duration + timbreConfig.release);

        // Conectar
        oscillator.connect(gain);
        gain.connect(this.masterGain);

        // Iniciar e parar
        oscillator.start(now);
        oscillator.stop(now + duration + timbreConfig.release);

        // Armazenar
        const id = this.oscillatorId++;
        this.activeOscillators.set(id, oscillator);
        this.activeGains.set(id, gain);
        ids.push(id);

        // Limpar
        setTimeout(() => {
          this.activeOscillators.delete(id);
          this.activeGains.delete(id);
        }, (duration + timbreConfig.release) * 1000 + 100);
      }

      return ids;
    } catch (error) {
      return [];
    }
  }

  /**
   * Parar todos os sons
   */
  stopAll() {
    try {
      for (const [id, oscillator] of this.activeOscillators) {
        try {
          oscillator.stop();
        } catch (e) {
          // Ignorar se já foi parado
        }
      }
      this.activeOscillators.clear();
      this.activeGains.clear();
    } catch (error) {
    }
  }

  /**
   * Definir volume master
   */
  setMasterVolume(volume) {
    try {
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(
          Math.max(0, Math.min(1, volume)),
          this.audioContext.currentTime
        );
      }
    } catch (error) {
    }
  }

  /**
   * Obter estado do contexto de áudio
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      contextState: this.audioContext?.state || 'not initialized',
      activeOscillators: this.activeOscillators.size,
      masterVolume: this.masterGain?.gain.value || 0
    };
  }
}

// Exportar instância singleton
export const audioEngine = new AudioEngineFixed();

// Exportar classe para testes
export default AudioEngineFixed;
