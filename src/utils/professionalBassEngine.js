/**
 * 🎸 Professional Bass Engine
 * Síntese de baixo com qualidade profissional
 * Suporte completo a baixo de 6 cordas (B-1 a G2)
 */

class ProfessionalBassEngine {
  constructor(audioContext) {
    this.audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.6;
    
    // Compressor para controle dinâmico
    this.compressor = this.createCompressor();
    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.audioContext.destination);
    
    // Notas ativas (para stop)
    this.activeNotes = [];
  }

  /**
   * Criar compressor para baixo
   */
  createCompressor() {
    const compressor = this.audioContext.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, this.audioContext.currentTime);
    compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, this.audioContext.currentTime);
    compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);
    return compressor;
  }

  /**
   * Obter frequência de nota
   * Suporte completo: B-1 (15.43 Hz) até G2 (98.00 Hz) e além
   * Baixo de 6 cordas: B-1, E0, A0, D1, G1, C2
   */
  getNoteFrequency(note, octave) {
    const noteFrequencies = {
      'C': 16.35,
      'C#': 17.32, 'Db': 17.32,
      'D': 18.35,
      'D#': 19.45, 'Eb': 19.45,
      'E': 20.60,
      'F': 21.83,
      'F#': 23.12, 'Gb': 23.12,
      'G': 24.50,
      'G#': 25.96, 'Ab': 25.96,
      'A': 27.50,
      'A#': 29.14, 'Bb': 29.14,
      'B': 30.87
    };
    
    const baseFreq = noteFrequencies[note];
    if (!baseFreq) {
      return 65.41; // C2 default
    }
    
    // Calcular frequência na oitava correta
    return baseFreq * Math.pow(2, octave);
  }

  /**
   * 🎸 BASS NOTE - Fingerstyle (Estilo dedos)
   * Som mais suave e natural
   */
  playNoteFingerstyle(note, octave, duration = 1.0, velocity = 1.0) {
    const now = this.audioContext.currentTime;
    const frequency = this.getNoteFrequency(note, octave);
    
    // Fundamental (oscilador principal)
    const fundamental = this.audioContext.createOscillator();
    const fundamentalGain = this.audioContext.createGain();
    
    // Harmônicos (para riqueza tonal)
    const harmonic2 = this.audioContext.createOscillator();
    const harmonic2Gain = this.audioContext.createGain();
    
    const harmonic3 = this.audioContext.createOscillator();
    const harmonic3Gain = this.audioContext.createGain();
    
    // Filtro para simular corpo do baixo
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1, now);
    
    // Configurar fundamental
    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(frequency, now);
    
    // Configurar harmônicos
    harmonic2.type = 'sine';
    harmonic2.frequency.setValueAtTime(frequency * 2, now);
    
    harmonic3.type = 'triangle';
    harmonic3.frequency.setValueAtTime(frequency * 3, now);
    
    // Envelope ADSR
    const attackTime = 0.01;
    const decayTime = 0.1;
    const sustainLevel = velocity * 0.7;
    const releaseTime = 0.3;
    
    // Fundamental envelope
    fundamentalGain.gain.setValueAtTime(0, now);
    fundamentalGain.gain.linearRampToValueAtTime(velocity, now + attackTime);
    fundamentalGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    fundamentalGain.gain.setValueAtTime(sustainLevel, now + duration);
    fundamentalGain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Harmonic 2 envelope (mais suave)
    harmonic2Gain.gain.setValueAtTime(0, now);
    harmonic2Gain.gain.linearRampToValueAtTime(velocity * 0.3, now + attackTime);
    harmonic2Gain.gain.linearRampToValueAtTime(velocity * 0.2, now + attackTime + decayTime);
    harmonic2Gain.gain.setValueAtTime(velocity * 0.2, now + duration);
    harmonic2Gain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Harmonic 3 envelope (ainda mais suave)
    harmonic3Gain.gain.setValueAtTime(0, now);
    harmonic3Gain.gain.linearRampToValueAtTime(velocity * 0.15, now + attackTime);
    harmonic3Gain.gain.linearRampToValueAtTime(velocity * 0.1, now + attackTime + decayTime);
    harmonic3Gain.gain.setValueAtTime(velocity * 0.1, now + duration);
    harmonic3Gain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Conexões
    fundamental.connect(fundamentalGain);
    fundamentalGain.connect(filter);
    
    harmonic2.connect(harmonic2Gain);
    harmonic2Gain.connect(filter);
    
    harmonic3.connect(harmonic3Gain);
    harmonic3Gain.connect(filter);
    
    filter.connect(this.masterGain);
    
    // Start e stop
    fundamental.start(now);
    harmonic2.start(now);
    harmonic3.start(now);
    
    const stopTime = now + duration + releaseTime + 0.1;
    fundamental.stop(stopTime);
    harmonic2.stop(stopTime);
    harmonic3.stop(stopTime);
    
    // Guardar referências
    this.activeNotes.push({
      oscillators: [fundamental, harmonic2, harmonic3],
      stopTime: stopTime
    });
    
    // Limpar referências antigas
    this.cleanupActiveNotes();
  }

  /**
   * 🎸 BASS NOTE - Slap (Estilo slap/pop)
   * Som mais agressivo e percussivo
   */
  playNoteSlap(note, octave, duration = 0.5, velocity = 1.0) {
    const now = this.audioContext.currentTime;
    const frequency = this.getNoteFrequency(note, octave);
    
    // Fundamental
    const fundamental = this.audioContext.createOscillator();
    const fundamentalGain = this.audioContext.createGain();
    
    // Harmônicos mais presentes
    const harmonic2 = this.audioContext.createOscillator();
    const harmonic2Gain = this.audioContext.createGain();
    
    const harmonic3 = this.audioContext.createOscillator();
    const harmonic3Gain = this.audioContext.createGain();
    
    const harmonic4 = this.audioContext.createOscillator();
    const harmonic4Gain = this.audioContext.createGain();
    
    // Noise para ataque percussivo
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    
    // Filtro mais aberto para slap
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(2, now);
    
    // Configurar osciladores
    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(frequency, now);
    
    harmonic2.type = 'sine';
    harmonic2.frequency.setValueAtTime(frequency * 2, now);
    
    harmonic3.type = 'triangle';
    harmonic3.frequency.setValueAtTime(frequency * 3, now);
    
    harmonic4.type = 'sawtooth';
    harmonic4.frequency.setValueAtTime(frequency * 4, now);
    
    // Configurar noise
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1000, now);
    
    // Envelope ADSR (mais rápido para slap)
    const attackTime = 0.001;
    const decayTime = 0.05;
    const sustainLevel = velocity * 0.5;
    const releaseTime = 0.2;
    
    // Fundamental envelope
    fundamentalGain.gain.setValueAtTime(0, now);
    fundamentalGain.gain.linearRampToValueAtTime(velocity * 1.2, now + attackTime);
    fundamentalGain.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    fundamentalGain.gain.setValueAtTime(sustainLevel, now + duration);
    fundamentalGain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Harmonic 2 envelope
    harmonic2Gain.gain.setValueAtTime(0, now);
    harmonic2Gain.gain.linearRampToValueAtTime(velocity * 0.6, now + attackTime);
    harmonic2Gain.gain.exponentialRampToValueAtTime(velocity * 0.3, now + attackTime + decayTime);
    harmonic2Gain.gain.setValueAtTime(velocity * 0.3, now + duration);
    harmonic2Gain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Harmonic 3 envelope
    harmonic3Gain.gain.setValueAtTime(0, now);
    harmonic3Gain.gain.linearRampToValueAtTime(velocity * 0.4, now + attackTime);
    harmonic3Gain.gain.exponentialRampToValueAtTime(velocity * 0.2, now + attackTime + decayTime);
    harmonic3Gain.gain.setValueAtTime(velocity * 0.2, now + duration);
    harmonic3Gain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Harmonic 4 envelope
    harmonic4Gain.gain.setValueAtTime(0, now);
    harmonic4Gain.gain.linearRampToValueAtTime(velocity * 0.3, now + attackTime);
    harmonic4Gain.gain.exponentialRampToValueAtTime(velocity * 0.15, now + attackTime + decayTime);
    harmonic4Gain.gain.setValueAtTime(velocity * 0.15, now + duration);
    harmonic4Gain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Noise envelope (ataque percussivo)
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(velocity * 0.8, now + attackTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.02);
    
    // Conexões
    fundamental.connect(fundamentalGain);
    fundamentalGain.connect(filter);
    
    harmonic2.connect(harmonic2Gain);
    harmonic2Gain.connect(filter);
    
    harmonic3.connect(harmonic3Gain);
    harmonic3Gain.connect(filter);
    
    harmonic4.connect(harmonic4Gain);
    harmonic4Gain.connect(filter);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(filter);
    
    filter.connect(this.masterGain);
    
    // Start e stop
    fundamental.start(now);
    harmonic2.start(now);
    harmonic3.start(now);
    harmonic4.start(now);
    noise.start(now);
    
    const stopTime = now + duration + releaseTime + 0.1;
    fundamental.stop(stopTime);
    harmonic2.stop(stopTime);
    harmonic3.stop(stopTime);
    harmonic4.stop(stopTime);
    noise.stop(now + 0.05);
    
    // Guardar referências
    this.activeNotes.push({
      oscillators: [fundamental, harmonic2, harmonic3, harmonic4],
      stopTime: stopTime
    });
    
    this.cleanupActiveNotes();
  }

  /**
   * 🎸 BASS NOTE - Pick (Estilo palheta)
   * Som intermediário, com ataque definido
   */
  playNotePick(note, octave, duration = 0.8, velocity = 1.0) {
    const now = this.audioContext.currentTime;
    const frequency = this.getNoteFrequency(note, octave);
    
    // Fundamental
    const fundamental = this.audioContext.createOscillator();
    const fundamentalGain = this.audioContext.createGain();
    
    // Harmônicos
    const harmonic2 = this.audioContext.createOscillator();
    const harmonic2Gain = this.audioContext.createGain();
    
    const harmonic3 = this.audioContext.createOscillator();
    const harmonic3Gain = this.audioContext.createGain();
    
    // Filtro
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);
    
    // Configurar osciladores
    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(frequency, now);
    
    harmonic2.type = 'triangle';
    harmonic2.frequency.setValueAtTime(frequency * 2, now);
    
    harmonic3.type = 'sawtooth';
    harmonic3.frequency.setValueAtTime(frequency * 3, now);
    
    // Envelope ADSR
    const attackTime = 0.005;
    const decayTime = 0.08;
    const sustainLevel = velocity * 0.6;
    const releaseTime = 0.25;
    
    // Fundamental envelope
    fundamentalGain.gain.setValueAtTime(0, now);
    fundamentalGain.gain.linearRampToValueAtTime(velocity, now + attackTime);
    fundamentalGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    fundamentalGain.gain.setValueAtTime(sustainLevel, now + duration);
    fundamentalGain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Harmonic 2 envelope
    harmonic2Gain.gain.setValueAtTime(0, now);
    harmonic2Gain.gain.linearRampToValueAtTime(velocity * 0.4, now + attackTime);
    harmonic2Gain.gain.linearRampToValueAtTime(velocity * 0.25, now + attackTime + decayTime);
    harmonic2Gain.gain.setValueAtTime(velocity * 0.25, now + duration);
    harmonic2Gain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Harmonic 3 envelope
    harmonic3Gain.gain.setValueAtTime(0, now);
    harmonic3Gain.gain.linearRampToValueAtTime(velocity * 0.25, now + attackTime);
    harmonic3Gain.gain.linearRampToValueAtTime(velocity * 0.15, now + attackTime + decayTime);
    harmonic3Gain.gain.setValueAtTime(velocity * 0.15, now + duration);
    harmonic3Gain.gain.exponentialRampToValueAtTime(0.01, now + duration + releaseTime);
    
    // Conexões
    fundamental.connect(fundamentalGain);
    fundamentalGain.connect(filter);
    
    harmonic2.connect(harmonic2Gain);
    harmonic2Gain.connect(filter);
    
    harmonic3.connect(harmonic3Gain);
    harmonic3Gain.connect(filter);
    
    filter.connect(this.masterGain);
    
    // Start e stop
    fundamental.start(now);
    harmonic2.start(now);
    harmonic3.start(now);
    
    const stopTime = now + duration + releaseTime + 0.1;
    fundamental.stop(stopTime);
    harmonic2.stop(stopTime);
    harmonic3.stop(stopTime);
    
    // Guardar referências
    this.activeNotes.push({
      oscillators: [fundamental, harmonic2, harmonic3],
      stopTime: stopTime
    });
    
    this.cleanupActiveNotes();
  }

  /**
   * Tocar nota (método genérico)
   */
  playNote(note, octave, style = 'fingerstyle', duration = 1.0, velocity = 1.0) {
    switch (style) {
      case 'slap':
        this.playNoteSlap(note, octave, duration, velocity);
        break;
      case 'pick':
        this.playNotePick(note, octave, duration, velocity);
        break;
      case 'fingerstyle':
      default:
        this.playNoteFingerstyle(note, octave, duration, velocity);
        break;
    }
  }

  /**
   * Criar gerador de ruído branco
   */
  createNoise() {
    const bufferSize = this.audioContext.sampleRate * 0.1;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    
    return noise;
  }

  /**
   * Limpar notas antigas
   */
  cleanupActiveNotes() {
    const now = this.audioContext.currentTime;
    this.activeNotes = this.activeNotes.filter(note => note.stopTime > now);
  }

  /**
   * Parar todas as notas
   */
  stopAll() {
    const now = this.audioContext.currentTime;
    this.activeNotes.forEach(note => {
      note.oscillators.forEach(osc => {
        try {
          osc.stop(now);
        } catch (e) {
          // Oscilador já parado
        }
      });
    });
    this.activeNotes = [];
  }

  /**
   * Ajustar volume master
   */
  setVolume(value) {
    this.masterGain.gain.setValueAtTime(value, this.audioContext.currentTime);
  }

  /**
   * Tocar linha de baixo (root notes)
   */
  playRootLine(chord, bpm = 120, style = 'fingerstyle') {
    const beatDuration = 60 / bpm;
    const now = this.audioContext.currentTime;
    
    // Tocar fundamental no tempo 0
    this.playNote(chord.root, 1, style, beatDuration * 0.9, 0.8);
    
    // Tocar fundamental no tempo 2
    setTimeout(() => {
      this.playNote(chord.root, 1, style, beatDuration * 0.9, 0.8);
    }, beatDuration * 2 * 1000);
  }

  /**
   * Tocar linha de baixo walking
   */
  playWalkingLine(chord, nextChord, bpm = 120, style = 'fingerstyle') {
    const beatDuration = 60 / bpm;
    const notes = this.generateWalkingNotes(chord, nextChord);
    
    notes.forEach((note, index) => {
      setTimeout(() => {
        this.playNote(note.note, note.octave, style, beatDuration * 0.9, 0.7);
      }, beatDuration * index * 1000);
    });
  }

  /**
   * Gerar notas para walking bass
   */
  generateWalkingNotes(chord, nextChord) {
    // Simplificado: root, 3rd, 5th, approach note
    return [
      { note: chord.root, octave: 1 },
      { note: chord.third, octave: 1 },
      { note: chord.fifth, octave: 1 },
      { note: nextChord ? nextChord.root : chord.root, octave: 1 }
    ];
  }
}

export default ProfessionalBassEngine;

