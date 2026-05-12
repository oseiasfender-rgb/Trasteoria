/**
 * 🥁 Transition Fill Engine
 * Fills de bateria e transições suaves entre seções
 */

class TransitionFillEngine {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.masterGain = audioContext.createGain();
    this.masterGain.connect(audioContext.destination);
    this.masterGain.gain.value = 0.7;
    
    this.activeOscillators = [];
    this.volume = 0.7;
  }

  /**
   * Gerar fill de bateria
   */
  generateFill(genre, bpm, duration = 4) {
    const beatDuration = (60 / bpm) * 1000;
    const fills = {
      jazz: this.generateJazzFill(beatDuration, duration),
      funk: this.generateFunkFill(beatDuration, duration),
      rock: this.generateRockFill(beatDuration, duration),
      metal: this.generateMetalFill(beatDuration, duration),
      blues: this.generateBluesFill(beatDuration, duration)
    };
    
    return fills[genre] || fills.rock;
  }

  /**
   * Jazz fill (swing, complexo)
   */
  generateJazzFill(beatDuration, duration) {
    const beats = Math.floor((duration * beatDuration) / beatDuration);
    return [
      { drum: 'kick', time: 0, velocity: 0.7 },
      { drum: 'snare', time: beatDuration * 0.5, velocity: 0.6 },
      { drum: 'kick', time: beatDuration * 1, velocity: 0.7 },
      { drum: 'tom', time: beatDuration * 1.5, velocity: 0.8 },
      { drum: 'snare', time: beatDuration * 2, velocity: 0.7 },
      { drum: 'tom', time: beatDuration * 2.5, velocity: 0.8 },
      { drum: 'kick', time: beatDuration * 3, velocity: 0.7 },
      { drum: 'crash', time: beatDuration * 3.5, velocity: 0.9 }
    ];
  }

  /**
   * Funk fill (syncopado)
   */
  generateFunkFill(beatDuration, duration) {
    return [
      { drum: 'kick', time: 0, velocity: 0.9 },
      { drum: 'kick', time: beatDuration * 0.5, velocity: 0.8 },
      { drum: 'snare', time: beatDuration * 1, velocity: 0.9 },
      { drum: 'kick', time: beatDuration * 1.5, velocity: 0.8 },
      { drum: 'kick', time: beatDuration * 2, velocity: 0.9 },
      { drum: 'snare', time: beatDuration * 2.5, velocity: 0.9 },
      { drum: 'kick', time: beatDuration * 3, velocity: 0.9 },
      { drum: 'crash', time: beatDuration * 3.5, velocity: 0.95 }
    ];
  }

  /**
   * Rock fill (direto)
   */
  generateRockFill(beatDuration, duration) {
    return [
      { drum: 'kick', time: 0, velocity: 0.8 },
      { drum: 'snare', time: beatDuration * 0.5, velocity: 0.8 },
      { drum: 'kick', time: beatDuration * 1, velocity: 0.8 },
      { drum: 'tom', time: beatDuration * 1.5, velocity: 0.85 },
      { drum: 'snare', time: beatDuration * 2, velocity: 0.8 },
      { drum: 'tom', time: beatDuration * 2.5, velocity: 0.85 },
      { drum: 'kick', time: beatDuration * 3, velocity: 0.8 },
      { drum: 'crash', time: beatDuration * 3.5, velocity: 0.9 }
    ];
  }

  /**
   * Metal fill (duplo kick)
   */
  generateMetalFill(beatDuration, duration) {
    return [
      { drum: 'kick', time: 0, velocity: 0.9 },
      { drum: 'kick', time: beatDuration * 0.25, velocity: 0.9 },
      { drum: 'snare', time: beatDuration * 0.5, velocity: 0.85 },
      { drum: 'kick', time: beatDuration * 0.75, velocity: 0.9 },
      { drum: 'kick', time: beatDuration * 1, velocity: 0.9 },
      { drum: 'tom', time: beatDuration * 1.5, velocity: 0.9 },
      { drum: 'kick', time: beatDuration * 2, velocity: 0.9 },
      { drum: 'kick', time: beatDuration * 2.25, velocity: 0.9 },
      { drum: 'crash', time: beatDuration * 3.5, velocity: 0.95 }
    ];
  }

  /**
   * Blues fill
   */
  generateBluesFill(beatDuration, duration) {
    return [
      { drum: 'kick', time: 0, velocity: 0.8 },
      { drum: 'snare', time: beatDuration * 1, velocity: 0.8 },
      { drum: 'kick', time: beatDuration * 2, velocity: 0.8 },
      { drum: 'tom', time: beatDuration * 2.5, velocity: 0.8 },
      { drum: 'snare', time: beatDuration * 3, velocity: 0.8 },
      { drum: 'crash', time: beatDuration * 3.5, velocity: 0.9 }
    ];
  }

  /**
   * Transição suave com fade
   */
  generateTransition(fromIntensity = 1, toIntensity = 1, duration = 2) {
    return {
      fromIntensity,
      toIntensity,
      duration,
      curve: 'exponential' // linear, exponential, logarithmic
    };
  }

  /**
   * Dinâmica de intensidade (crescendo/decrescendo)
   */
  generateDynamics(pattern, intensity = 1) {
    return pattern.map(note => ({
      ...note,
      velocity: note.velocity * intensity
    }));
  }

  /**
   * Ajustar volume
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.masterGain.gain.value = this.volume;
  }

  /**
   * Parar todos os osciladores
   */
  stopAll() {
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.activeOscillators = [];
  }
}

export default TransitionFillEngine;
export { TransitionFillEngine };
