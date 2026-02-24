// Módulo de Bateria para Backing Tracks
// Utiliza Web Audio API para gerar ritmos de bateria

class DrumEngine {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.currentPattern = null;
    this.intervalId = null;
    this.bpm = 120;
    this.volume = 0.7;
    
    // Padrões rítmicos por estilo
    this.patterns = {
      rock: {
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
      },
      blues: {
        name: 'Blues Shuffle',
        beats: 4,
        pattern: [
          { time: 0, drums: ['kick', 'hihat'] },
          { time: 0.67, drums: ['hihat'] },
          { time: 1, drums: ['snare', 'hihat'] },
          { time: 1.67, drums: ['hihat'] },
          { time: 2, drums: ['kick', 'hihat'] },
          { time: 2.67, drums: ['hihat'] },
          { time: 3, drums: ['snare', 'hihat'] },
          { time: 3.67, drums: ['hihat'] }
        ]
      },
      jazz: {
        name: 'Jazz Swing',
        beats: 4,
        pattern: [
          { time: 0, drums: ['kick', 'ride'] },
          { time: 0.67, drums: ['ride'] },
          { time: 1, drums: ['snare', 'ride'] },
          { time: 1.33, drums: ['ride'] },
          { time: 2, drums: ['kick', 'ride'] },
          { time: 2.67, drums: ['ride'] },
          { time: 3, drums: ['snare', 'ride'] },
          { time: 3.33, drums: ['ride'] }
        ]
      },
      latin: {
        name: 'Bossa Nova',
        beats: 4,
        pattern: [
          { time: 0, drums: ['kick', 'hihat'] },
          { time: 0.5, drums: ['hihat'] },
          { time: 1, drums: ['snare', 'hihat'] },
          { time: 1.25, drums: ['kick'] },
          { time: 1.5, drums: ['hihat'] },
          { time: 2, drums: ['kick', 'hihat'] },
          { time: 2.5, drums: ['hihat'] },
          { time: 3, drums: ['snare', 'hihat'] },
          { time: 3.5, drums: ['hihat'] }
        ]
      },
      funk: {
        name: 'Funk Groove',
        beats: 4,
        pattern: [
          { time: 0, drums: ['kick', 'hihat'] },
          { time: 0.25, drums: ['hihat'] },
          { time: 0.5, drums: ['hihat'] },
          { time: 0.75, drums: ['hihat'] },
          { time: 1, drums: ['snare', 'hihat'] },
          { time: 1.25, drums: ['hihat'] },
          { time: 1.5, drums: ['kick', 'hihat'] },
          { time: 1.75, drums: ['hihat'] },
          { time: 2, drums: ['kick', 'hihat'] },
          { time: 2.25, drums: ['hihat'] },
          { time: 2.5, drums: ['hihat'] },
          { time: 2.75, drums: ['hihat'] },
          { time: 3, drums: ['snare', 'hihat'] },
          { time: 3.25, drums: ['hihat'] },
          { time: 3.5, drums: ['hihat'] },
          { time: 3.75, drums: ['hihat'] }
        ]
      },
      ballad: {
        name: 'Balada',
        beats: 4,
        pattern: [
          { time: 0, drums: ['kick', 'hihat'] },
          { time: 1, drums: ['snare', 'hihat'] },
          { time: 2, drums: ['kick', 'hihat'] },
          { time: 3, drums: ['snare', 'hihat'] }
        ]
      }
    };
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

  // Gerar som de bateria usando síntese
  createDrumSound(type) {
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    switch (type) {
      case 'kick':
        return this.createKick(now);
      case 'snare':
        return this.createSnare(now);
      case 'hihat':
        return this.createHiHat(now);
      case 'ride':
        return this.createRide(now);
      default:
        return null;
    }
  }

  // Criar som de bumbo (kick)
  createKick(startTime) {
    const ctx = this.audioContext;
    
    // Oscilador principal (frequência baixa)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, startTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    
    gain.gain.setValueAtTime(this.volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + 0.5);
  }

  // Criar som de caixa (snare)
  createSnare(startTime) {
    const ctx = this.audioContext;
    
    // Ruído branco para o "estalo"
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
    
    // Tom da caixa
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

  // Criar som de chimbal (hi-hat)
  createHiHat(startTime) {
    const ctx = this.audioContext;
    
    // Ruído branco filtrado
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

  // Criar som de condução (ride)
  createRide(startTime) {
    const ctx = this.audioContext;
    
    // Combinação de frequências para simular o ride
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

  // Tocar padrão rítmico
  async playPattern(patternName) {
    if (this.isPlaying) {
      this.stop();
    }

    await this.ensureContext();
    
    const pattern = this.patterns[patternName];
    if (!pattern) {
      return;
    }

    this.currentPattern = pattern;
    this.isPlaying = true;
    
    const beatDuration = (60 / this.bpm) * 1000; // duração de um beat em ms
    const patternDuration = beatDuration * pattern.beats;
    
    const playBeat = () => {
      if (!this.isPlaying) return;
      
      const startTime = this.audioContext.currentTime;
      
      pattern.pattern.forEach(beat => {
        const beatTime = startTime + (beat.time * (60 / this.bpm));
        beat.drums.forEach(drum => {
          this.createDrumSound(drum, beatTime);
        });
      });
    };
    
    // Tocar imediatamente
    playBeat();
    
    // Configurar loop
    this.intervalId = setInterval(playBeat, patternDuration);
  }

  // Parar reprodução
  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentPattern = null;
  }

  // Definir BPM
  setBPM(bpm) {
    this.bpm = Math.max(60, Math.min(200, bpm));
    
    // Se estiver tocando, reiniciar com novo BPM
    if (this.isPlaying && this.currentPattern) {
      const currentPatternName = Object.keys(this.patterns).find(
        key => this.patterns[key] === this.currentPattern
      );
      this.playPattern(currentPatternName);
    }
  }

  // Definir volume
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Obter lista de padrões disponíveis
  getAvailablePatterns() {
    return Object.keys(this.patterns).map(key => ({
      id: key,
      name: this.patterns[key].name,
      beats: this.patterns[key].beats
    }));
  }

  // Verificar se está tocando
  getIsPlaying() {
    return this.isPlaying;
  }

  // Obter BPM atual
  getCurrentBPM() {
    return this.bpm;
  }

  // Obter volume atual
  getCurrentVolume() {
    return this.volume;
  }
}

// Instância global
export const drumEngine = new DrumEngine();

