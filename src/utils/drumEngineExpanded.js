// drumEngineExpanded.js
// Sistema expandido de bateria com 144 padrões (12 gêneros × 12 estilos)
// Mantém compatibilidade com drumEngine.js existente

import { bandCreatorData } from '../data/bandCreatorData';

class DrumEngineExpanded {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.currentPattern = null;
    this.intervalId = null;
    this.bpm = 120;
    this.volume = 0.7;
    this.currentGenre = 'rock';
    this.currentStyle = 1;
  }

  // Inicializar contexto de áudio
  async ensureContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    return this.audioContext;
  }

  // Criar sons de bateria (mantido do original)
  createKick(startTime) {
    const ctx = this.audioContext;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, startTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    
    gain.gain.setValueAtTime(this.volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 0.5);
  }

  createSnare(startTime) {
    const ctx = this.audioContext;
    
    // Ruído branco
    const bufferSize = ctx.sampleRate * 0.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.3;
    }
    
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();
    
    noise.buffer = buffer;
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    
    noiseGain.gain.setValueAtTime(this.volume * 0.7, startTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
    
    // Tom
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, startTime);
    osc.frequency.exponentialRampToValueAtTime(100, startTime + 0.1);
    
    oscGain.gain.setValueAtTime(this.volume * 0.5, startTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    
    noise.start(startTime);
    osc.start(startTime);
    noise.stop(startTime + 0.2);
    osc.stop(startTime + 0.1);
  }

  createHiHat(startTime) {
    const ctx = this.audioContext;
    
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.1;
    }
    
    const noise = ctx.createBufferSource();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    noise.buffer = buffer;
    filter.type = 'highpass';
    filter.frequency.value = 7000;
    
    gain.gain.setValueAtTime(this.volume * 0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    
    noise.start(startTime);
    noise.stop(startTime + 0.1);
  }

  createRide(startTime) {
    const ctx = this.audioContext;
    const frequencies = [800, 1200, 1600, 2000];
    
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      
      const volume = this.volume * 0.1 * (1 - index * 0.2);
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  // Criar som de bateria genérico
  createDrumSound(type, startTime) {
    switch (type) {
      case 'kick':
        return this.createKick(startTime);
      case 'snare':
        return this.createSnare(startTime);
      case 'hihat':
        return this.createHiHat(startTime);
      case 'ride':
        return this.createRide(startTime);
      default:
        return null;
    }
  }

  // Gerar padrão baseado em gênero e estilo
  generatePattern(genreId, styleId) {
    const genre = bandCreatorData[genreId];
    if (!genre) return this.getDefaultPattern();
    
    const style = genre.styles.find(s => s.id === styleId);
    if (!style) return this.getDefaultPattern();
    
    // Gerar padrão baseado nas características do estilo
    return this.createPatternFromStyle(style);
  }

  createPatternFromStyle(style) {
    // Padrões básicos por tipo de drum pattern
    const basePatterns = {
      // Rock patterns
      'classic_rock': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ],
      'hard_rock': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['snare', 'hihat'] },
        { time: 0.75, drums: ['kick', 'hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.5, drums: ['snare', 'hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['snare', 'hihat'] },
        { time: 2.75, drums: ['kick', 'hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.5, drums: ['snare', 'hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ],
      // Blues patterns
      'shuffle': [
        { time: 0, drums: ['kick', 'ride'] },
        { time: 0.67, drums: ['ride'] },
        { time: 1, drums: ['snare', 'ride'] },
        { time: 1.67, drums: ['ride'] },
        { time: 2, drums: ['kick', 'ride'] },
        { time: 2.67, drums: ['ride'] },
        { time: 3, drums: ['snare', 'ride'] },
        { time: 3.67, drums: ['ride'] }
      ],
      // Jazz patterns
      'swing': [
        { time: 0, drums: ['kick', 'ride'] },
        { time: 0.67, drums: ['ride'] },
        { time: 1, drums: ['snare', 'ride'] },
        { time: 1.33, drums: ['ride'] },
        { time: 2, drums: ['kick', 'ride'] },
        { time: 2.67, drums: ['ride'] },
        { time: 3, drums: ['snare', 'ride'] },
        { time: 3.33, drums: ['ride'] }
      ],
      'bebop': [
        { time: 0, drums: ['ride'] },
        { time: 0.33, drums: ['ride'] },
        { time: 0.5, drums: ['kick'] },
        { time: 0.67, drums: ['ride'] },
        { time: 1, drums: ['ride', 'snare'] },
        { time: 1.33, drums: ['ride'] },
        { time: 1.67, drums: ['ride'] },
        { time: 2, drums: ['ride'] },
        { time: 2.33, drums: ['ride'] },
        { time: 2.5, drums: ['kick'] },
        { time: 2.67, drums: ['ride'] },
        { time: 3, drums: ['ride', 'snare'] },
        { time: 3.33, drums: ['ride'] },
        { time: 3.67, drums: ['ride'] }
      ],
      // Latin patterns
      'bossa': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['snare'] },
        { time: 0.75, drums: ['kick'] },
        { time: 1, drums: ['hihat'] },
        { time: 1.5, drums: ['snare'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['snare'] },
        { time: 3, drums: ['hihat'] },
        { time: 3.25, drums: ['kick'] },
        { time: 3.5, drums: ['snare'] }
      ],
      'salsa': [
        { time: 0, drums: ['kick', 'ride'] },
        { time: 0.5, drums: ['snare', 'hihat'] },
        { time: 1, drums: ['kick', 'ride'] },
        { time: 1.5, drums: ['snare', 'hihat'] },
        { time: 2, drums: ['kick', 'ride'] },
        { time: 2.5, drums: ['snare', 'hihat'] },
        { time: 3, drums: ['kick', 'ride'] },
        { time: 3.5, drums: ['snare', 'hihat'] }
      ],
      // Funk patterns
      'funk': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['snare', 'hihat'] },
        { time: 0.75, drums: ['hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.25, drums: ['kick', 'hihat'] },
        { time: 1.5, drums: ['snare', 'hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['snare', 'hihat'] },
        { time: 2.75, drums: ['hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.25, drums: ['kick', 'hihat'] },
        { time: 3.5, drums: ['snare', 'hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ],
      // Hip-hop patterns
      'boom_bap': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['hihat'] },
        { time: 2.25, drums: ['kick'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ],
      'trap': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.125, drums: ['hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.375, drums: ['hihat'] },
        { time: 0.5, drums: ['snare', 'hihat'] },
        { time: 0.625, drums: ['hihat'] },
        { time: 0.75, drums: ['hihat'] },
        { time: 0.875, drums: ['hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.125, drums: ['hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.375, drums: ['hihat'] },
        { time: 1.5, drums: ['snare', 'hihat'] },
        { time: 1.625, drums: ['hihat'] },
        { time: 1.75, drums: ['kick', 'hihat'] },
        { time: 1.875, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.125, drums: ['hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.375, drums: ['hihat'] },
        { time: 2.5, drums: ['snare', 'hihat'] },
        { time: 2.625, drums: ['hihat'] },
        { time: 2.75, drums: ['hihat'] },
        { time: 2.875, drums: ['hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.125, drums: ['hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.375, drums: ['hihat'] },
        { time: 3.5, drums: ['snare', 'hihat'] },
        { time: 3.625, drums: ['hihat'] },
        { time: 3.75, drums: ['hihat'] },
        { time: 3.875, drums: ['hihat'] }
      ],
      // Metal patterns
      'heavy_metal': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 0.75, drums: ['hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 2.75, drums: ['hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ],
      // Pop patterns
      'pop_rock': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ],
      'dance_pop': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['snare', 'hihat'] },
        { time: 0.75, drums: ['hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.5, drums: ['snare', 'hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['snare', 'hihat'] },
        { time: 2.75, drums: ['hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.5, drums: ['snare', 'hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ],
      // Country patterns
      'trad_country': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ],
      // Folk patterns
      'trad_folk': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 3, drums: ['snare', 'hihat'] }
      ],
      // EDM patterns
      'edm': [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 0.75, drums: ['hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 2.75, drums: ['hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.5, drums: ['kick', 'snare', 'hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ],
      // Alt Rock patterns
      'grunge': [
        { time: 0, drums: ['kick', 'ride'] },
        { time: 0.5, drums: ['snare', 'ride'] },
        { time: 0.75, drums: ['kick'] },
        { time: 1, drums: ['kick', 'ride'] },
        { time: 1.5, drums: ['snare', 'ride'] },
        { time: 2, drums: ['kick', 'ride'] },
        { time: 2.5, drums: ['snare', 'ride'] },
        { time: 2.75, drums: ['kick'] },
        { time: 3, drums: ['kick', 'ride'] },
        { time: 3.5, drums: ['snare', 'ride'] }
      ]
    };

    // Retornar padrão baseado no drumPattern do estilo
    const pattern = basePatterns[style.drumPattern] || basePatterns['classic_rock'];
    
    return {
      name: style.name,
      beats: 4,
      pattern: pattern,
      swing: style.swing || 0.5,
      intensity: style.intensity || 0.7
    };
  }

  getDefaultPattern() {
    return {
      name: 'Rock Básico',
      beats: 4,
      pattern: [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ]
    };
  }

  // Tocar padrão
  async play(genreId, styleId, bpm, volume = 0.7) {
    if (this.isPlaying) {
      this.stop();
    }

    await this.ensureContext();
    
    this.currentGenre = genreId;
    this.currentStyle = styleId;
    this.bpm = bpm;
    this.volume = volume;
    this.currentPattern = this.generatePattern(genreId, styleId);
    this.isPlaying = true;
    
    const beatDuration = (60 / this.bpm) * 1000;
    const patternDuration = beatDuration * this.currentPattern.beats;
    
    const playBeat = () => {
      if (!this.isPlaying) return;
      
      const startTime = this.audioContext.currentTime;
      
      this.currentPattern.pattern.forEach(beat => {
        const beatTime = startTime + (beat.time * (60 / this.bpm));
        beat.drums.forEach(drum => {
          this.createDrumSound(drum, beatTime);
        });
      });
    };
    
    playBeat();
    this.intervalId = setInterval(playBeat, patternDuration);
  }

  // Parar
  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentPattern = null;
  }

  // Setters
  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(300, bpm));
    if (this.isPlaying) {
      this.play(this.currentGenre, this.currentStyle, this.bpm, this.volume);
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Getters
  getIsPlaying() {
    return this.isPlaying;
  }

  getCurrentBPM() {
    return this.bpm;
  }

  getCurrentVolume() {
    return this.volume;
  }
}

// Instância global
export const drumEngineExpanded = new DrumEngineExpanded();
export default drumEngineExpanded;

