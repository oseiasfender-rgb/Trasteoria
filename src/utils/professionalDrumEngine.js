/**
 * 🥁 Professional Drum Engine
 * Síntese de bateria com qualidade profissional
 * Simula samples reais usando Web Audio API avançado
 */

class ProfessionalDrumEngine {
  constructor(audioContext) {
    this.audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.8;
    
    // Reverb para profundidade
    this.reverb = this.createReverb();
  }

  /**
   * Criar reverb para profundidade
   */
  createReverb() {
    const convolver = this.audioContext.createConvolver();
    const rate = this.audioContext.sampleRate;
    const length = rate * 2; // 2 segundos
    const impulse = this.audioContext.createBuffer(2, length, rate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
      }
    }
    
    convolver.buffer = impulse;
    return convolver;
  }

  /**
   * 🥁 KICK DRUM (Bumbo)
   * Síntese realista de kick acústico/eletrônico
   */
  playKick(style = 'acoustic', velocity = 1.0) {
    const now = this.audioContext.currentTime;
    
    // Oscilador principal (fundamental)
    const osc = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    // Oscilador de clique (ataque)
    const clickOsc = this.audioContext.createOscillator();
    const clickGain = this.audioContext.createGain();
    
    // Noise para textura
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    
    if (style === 'acoustic') {
      // Kick acústico: mais grave e natural
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);
      
      clickOsc.frequency.setValueAtTime(1000, now);
      clickOsc.frequency.exponentialRampToValueAtTime(100, now + 0.01);
      
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(200, now);
      
      oscGain.gain.setValueAtTime(velocity, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      clickGain.gain.setValueAtTime(velocity * 0.5, now);
      clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.01);
      
      noiseGain.gain.setValueAtTime(velocity * 0.1, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
    } else if (style === 'electronic') {
      // Kick eletrônico: mais punch e sustain
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
      
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(2000, now);
      clickOsc.frequency.exponentialRampToValueAtTime(100, now + 0.005);
      
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(300, now);
      
      oscGain.gain.setValueAtTime(velocity * 1.2, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      clickGain.gain.setValueAtTime(velocity * 0.7, now);
      clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.005);
      
      noiseGain.gain.setValueAtTime(velocity * 0.15, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
    } else { // 'rock'
      // Kick rock: médio grave com punch
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);
      
      clickOsc.frequency.setValueAtTime(1500, now);
      clickOsc.frequency.exponentialRampToValueAtTime(100, now + 0.008);
      
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(250, now);
      
      oscGain.gain.setValueAtTime(velocity * 1.1, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      
      clickGain.gain.setValueAtTime(velocity * 0.6, now);
      clickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.008);
      
      noiseGain.gain.setValueAtTime(velocity * 0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    }
    
    // Conexões
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    clickOsc.connect(clickGain);
    clickGain.connect(this.masterGain);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    // Start e stop
    osc.start(now);
    clickOsc.start(now);
    noise.start(now);
    
    osc.stop(now + 0.5);
    clickOsc.stop(now + 0.02);
    noise.stop(now + 0.2);
  }

  /**
   * 🥁 SNARE DRUM (Caixa)
   * Síntese realista de snare com esteira
   */
  playSnare(style = 'acoustic', velocity = 1.0) {
    const now = this.audioContext.currentTime;
    
    // Tom da caixa (fundamental)
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    // Esteira (snare wires)
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    
    if (style === 'acoustic') {
      // Snare acústico: tom + esteira balanceados
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(330, now);
      osc2.frequency.exponentialRampToValueAtTime(150, now + 0.1);
      
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1000, now);
      noiseFilter.Q.setValueAtTime(1, now);
      
      oscGain.gain.setValueAtTime(velocity * 0.4, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      noiseGain.gain.setValueAtTime(velocity * 0.6, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      
    } else if (style === 'electronic') {
      // Snare eletrônico: mais esteira, menos tom
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(200, now);
      osc1.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(400, now);
      osc2.frequency.exponentialRampToValueAtTime(150, now + 0.05);
      
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1500, now);
      noiseFilter.Q.setValueAtTime(2, now);
      
      oscGain.gain.setValueAtTime(velocity * 0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      noiseGain.gain.setValueAtTime(velocity * 0.8, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
    } else { // 'rock'
      // Snare rock: punch e esteira agressiva
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(190, now);
      osc1.frequency.exponentialRampToValueAtTime(90, now + 0.12);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(350, now);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.12);
      
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1200, now);
      noiseFilter.Q.setValueAtTime(1.5, now);
      
      oscGain.gain.setValueAtTime(velocity * 0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      
      noiseGain.gain.setValueAtTime(velocity * 0.7, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    }
    
    // Conexões
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    // Start e stop
    osc1.start(now);
    osc2.start(now);
    noise.start(now);
    
    osc1.stop(now + 0.2);
    osc2.stop(now + 0.2);
    noise.stop(now + 0.2);
  }

  /**
   * 🥁 HI-HAT CLOSED (Chimbal Fechado)
   */
  playHihatClosed(style = 'acoustic', velocity = 1.0) {
    const now = this.audioContext.currentTime;
    
    // Noise filtrado para simular metal
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Osciladores para frequências metálicas
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    if (style === 'acoustic') {
      // Hihat acústico: curto e brilhante
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(8000, now);
      filter.Q.setValueAtTime(2, now);
      
      osc1.frequency.setValueAtTime(325, now);
      osc2.frequency.setValueAtTime(800, now);
      
      noiseGain.gain.setValueAtTime(velocity * 0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
      oscGain.gain.setValueAtTime(velocity * 0.2, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
    } else { // 'electronic' ou 'rock'
      // Hihat eletrônico: mais brilho
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, now);
      filter.Q.setValueAtTime(1, now);
      
      osc1.frequency.setValueAtTime(350, now);
      osc2.frequency.setValueAtTime(900, now);
      
      noiseGain.gain.setValueAtTime(velocity * 0.6, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      
      oscGain.gain.setValueAtTime(velocity * 0.15, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    }
    
    // Conexões
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    // Start e stop
    noise.start(now);
    osc1.start(now);
    osc2.start(now);
    
    noise.stop(now + 0.1);
    osc1.stop(now + 0.1);
    osc2.stop(now + 0.1);
  }

  /**
   * 🥁 HI-HAT OPEN (Chimbal Aberto)
   */
  playHihatOpen(style = 'acoustic', velocity = 1.0) {
    const now = this.audioContext.currentTime;
    
    // Noise filtrado para simular metal
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Osciladores para frequências metálicas
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    if (style === 'acoustic') {
      // Hihat aberto acústico: longo e brilhante
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(7000, now);
      filter.Q.setValueAtTime(1.5, now);
      
      osc1.frequency.setValueAtTime(325, now);
      osc2.frequency.setValueAtTime(800, now);
      
      noiseGain.gain.setValueAtTime(velocity * 0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      oscGain.gain.setValueAtTime(velocity * 0.15, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
    } else { // 'electronic' ou 'rock'
      // Hihat aberto eletrônico: mais sustain
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(6000, now);
      filter.Q.setValueAtTime(1, now);
      
      osc1.frequency.setValueAtTime(350, now);
      osc2.frequency.setValueAtTime(900, now);
      
      noiseGain.gain.setValueAtTime(velocity * 0.5, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      
      oscGain.gain.setValueAtTime(velocity * 0.2, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    }
    
    // Conexões
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    // Start e stop
    noise.start(now);
    osc1.start(now);
    osc2.start(now);
    
    noise.stop(now + 0.8);
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  }

  /**
   * 🥁 CRASH CYMBAL (Prato de Ataque)
   */
  playCrash(velocity = 1.0) {
    const now = this.audioContext.currentTime;
    
    // Noise filtrado para simular prato
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Múltiplos osciladores para frequências metálicas complexas
    const frequencies = [523, 800, 1200, 1800, 2400];
    const oscillators = [];
    const oscGain = this.audioContext.createGain();
    
    // Configurar filtro
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.setValueAtTime(0.5, now);
    
    // Criar osciladores
    frequencies.forEach(freq => {
      const osc = this.audioContext.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(oscGain);
      oscillators.push(osc);
    });
    
    // Envelopes
    noiseGain.gain.setValueAtTime(velocity * 0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
    
    oscGain.gain.setValueAtTime(velocity * 0.3, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 2.0);
    
    // Conexões
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.reverb);
    this.reverb.connect(this.masterGain);
    
    oscGain.connect(this.reverb);
    
    // Start e stop
    noise.start(now);
    oscillators.forEach(osc => osc.start(now));
    
    noise.stop(now + 2.5);
    oscillators.forEach(osc => osc.stop(now + 2.5));
  }

  /**
   * 🥁 RIDE CYMBAL (Prato de Condução)
   */
  playRide(velocity = 1.0) {
    const now = this.audioContext.currentTime;
    
    // Noise filtrado
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Osciladores para tom metálico
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const osc3 = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    // Configurar
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(5000, now);
    filter.Q.setValueAtTime(1, now);
    
    osc1.frequency.setValueAtTime(800, now);
    osc2.frequency.setValueAtTime(1200, now);
    osc3.frequency.setValueAtTime(2000, now);
    
    // Envelopes
    noiseGain.gain.setValueAtTime(velocity * 0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
    
    oscGain.gain.setValueAtTime(velocity * 0.4, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
    
    // Conexões
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    osc3.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    // Start e stop
    noise.start(now);
    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    
    noise.stop(now + 1.5);
    osc1.stop(now + 1.5);
    osc2.stop(now + 1.5);
    osc3.stop(now + 1.5);
  }

  /**
   * 🥁 TOM (Tom-tom)
   */
  playTom(pitch = 'mid', velocity = 1.0) {
    const now = this.audioContext.currentTime;
    
    // Dois osciladores para corpo do tom
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const oscGain = this.audioContext.createGain();
    
    // Noise para ataque
    const noise = this.createNoise();
    const noiseGain = this.audioContext.createGain();
    const noiseFilter = this.audioContext.createBiquadFilter();
    
    // Frequências baseadas no pitch
    let freq1, freq2;
    if (pitch === 'high') {
      freq1 = 200;
      freq2 = 350;
    } else if (pitch === 'mid') {
      freq1 = 150;
      freq2 = 250;
    } else { // 'low'
      freq1 = 100;
      freq2 = 180;
    }
    
    // Configurar osciladores
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq1, now);
    osc1.frequency.exponentialRampToValueAtTime(freq1 * 0.5, now + 0.3);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq2, now);
    osc2.frequency.exponentialRampToValueAtTime(freq2 * 0.5, now + 0.3);
    
    // Configurar noise
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(500, now);
    
    // Envelopes
    oscGain.gain.setValueAtTime(velocity * 0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    noiseGain.gain.setValueAtTime(velocity * 0.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    // Conexões
    osc1.connect(oscGain);
    osc2.connect(oscGain);
    oscGain.connect(this.masterGain);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    // Start e stop
    osc1.start(now);
    osc2.start(now);
    noise.start(now);
    
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
    noise.stop(now + 0.15);
  }

  /**
   * Criar gerador de ruído branco
   */
  createNoise() {
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    
    return noise;
  }

  /**
   * Tocar padrão rítmico
   */
  playPattern(pattern, bpm = 120, style = 'acoustic') {
    const beatDuration = 60 / bpm; // Duração de 1 beat em segundos
    const now = this.audioContext.currentTime;
    
    pattern.forEach((beat, index) => {
      const time = now + (index * beatDuration / 4); // Subdivisão de 16th notes
      
      if (beat.kick) {
        setTimeout(() => this.playKick(style, beat.kick), (time - now) * 1000);
      }
      if (beat.snare) {
        setTimeout(() => this.playSnare(style, beat.snare), (time - now) * 1000);
      }
      if (beat.hihatClosed) {
        setTimeout(() => this.playHihatClosed(style, beat.hihatClosed), (time - now) * 1000);
      }
      if (beat.hihatOpen) {
        setTimeout(() => this.playHihatOpen(style, beat.hihatOpen), (time - now) * 1000);
      }
      if (beat.crash) {
        setTimeout(() => this.playCrash(beat.crash), (time - now) * 1000);
      }
      if (beat.ride) {
        setTimeout(() => this.playRide(beat.ride), (time - now) * 1000);
      }
      if (beat.tom) {
        setTimeout(() => this.playTom(beat.tom.pitch, beat.tom.velocity), (time - now) * 1000);
      }
    });
  }

  /**
   * Ajustar volume master
   */
  setVolume(value) {
    this.masterGain.gain.setValueAtTime(value, this.audioContext.currentTime);
  }
}

export default ProfessionalDrumEngine;

