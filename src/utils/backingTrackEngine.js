/**
 * BackingTrackEngine
 * Engine para backing tracks de improvisação
 * Usa os engines existentes (Drums, Bass, Piano) para criar acompanhamentos
 */

export class BackingTrackEngine {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.isPlaying = false;
    this.currentBeat = 0;
    this.currentChordIndex = 0;
    this.intervalId = null;
    this.progression = [];
    this.bpm = 120;
    this.style = 'rock';
    
    // Frequências das notas (C2-C5)
    this.noteFrequencies = {
      'C': 130.81, 'C#': 138.59, 'Db': 138.59,
      'D': 146.83, 'D#': 155.56, 'Eb': 155.56,
      'E': 164.81,
      'F': 174.61, 'F#': 185.00, 'Gb': 185.00,
      'G': 196.00, 'G#': 207.65, 'Ab': 207.65,
      'A': 220.00, 'A#': 233.08, 'Bb': 233.08,
      'B': 246.94
    };
  }

  /**
   * Parse chord name to root and quality
   * Examples: "Cmaj7" -> {root: "C", quality: "maj7"}
   */
  parseChord(chordName) {
    const match = chordName.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return { root: 'C', quality: 'maj' };
    
    return {
      root: match[1],
      quality: match[2] || 'maj'
    };
  }

  /**
   * Get chord tones based on quality
   */
  getChordTones(root, quality) {
    const rootFreq = this.noteFrequencies[root] || 130.81;
    
    // Intervalos em semitons
    const intervals = {
      'maj': [0, 4, 7],
      '': [0, 4, 7], // Maior por padrão
      'm': [0, 3, 7],
      'min': [0, 3, 7],
      '7': [0, 4, 7, 10],
      'maj7': [0, 4, 7, 11],
      'm7': [0, 3, 7, 10],
      'min7': [0, 3, 7, 10],
      'dim': [0, 3, 6],
      'aug': [0, 4, 8],
      'sus2': [0, 2, 7],
      'sus4': [0, 5, 7]
    };
    
    const chordIntervals = intervals[quality] || intervals['maj'];
    return chordIntervals.map(semitones => rootFreq * Math.pow(2, semitones / 12));
  }

  /**
   * Play a single chord
   */
  playChord(chordName, duration = 1.0) {
    if (!this.audioContext) return;
    
    const { root, quality } = this.parseChord(chordName);
    const frequencies = this.getChordTones(root, quality);
    const now = this.audioContext.currentTime;
    
    frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = freq;
      
      // Envelope ADSR
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15 / frequencies.length, now + 0.05);
      gainNode.gain.setValueAtTime(0.12 / frequencies.length, now + duration - 0.1);
      gainNode.gain.linearRampToValueAtTime(0, now + duration);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start(now);
      oscillator.stop(now + duration);
    });
  }

  /**
   * Play bass note for chord
   */
  playBass(chordName, duration = 1.0) {
    if (!this.audioContext) return;
    
    const { root } = this.parseChord(chordName);
    const rootFreq = (this.noteFrequencies[root] || 130.81) / 2; // Uma oitava abaixo
    const now = this.audioContext.currentTime;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.value = rootFreq;
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gainNode.gain.setValueAtTime(0.2, now + duration - 0.05);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  /**
   * Play drum pattern (simple kick/snare)
   */
  playDrumBeat(beatNumber) {
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    
    // Kick on beats 1 and 3
    if (beatNumber % 2 === 0) {
      const kickOsc = this.audioContext.createOscillator();
      const kickGain = this.audioContext.createGain();
      
      kickOsc.frequency.setValueAtTime(150, now);
      kickOsc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      
      kickGain.gain.setValueAtTime(0.5, now);
      kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      
      kickOsc.connect(kickGain);
      kickGain.connect(this.audioContext.destination);
      
      kickOsc.start(now);
      kickOsc.stop(now + 0.15);
    }
    
    // Snare on beats 2 and 4
    if (beatNumber % 2 === 1) {
      const snareOsc = this.audioContext.createOscillator();
      const snareGain = this.audioContext.createGain();
      const noiseBuffer = this.createNoiseBuffer();
      const noiseSource = this.audioContext.createBufferSource();
      const noiseGain = this.audioContext.createGain();
      
      snareOsc.frequency.value = 200;
      snareGain.gain.setValueAtTime(0.3, now);
      snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      
      noiseSource.buffer = noiseBuffer;
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      
      snareOsc.connect(snareGain);
      snareGain.connect(this.audioContext.destination);
      noiseSource.connect(noiseGain);
      noiseGain.connect(this.audioContext.destination);
      
      snareOsc.start(now);
      snareOsc.stop(now + 0.1);
      noiseSource.start(now);
      noiseSource.stop(now + 0.08);
    }
  }

  /**
   * Create noise buffer for snare
   */
  createNoiseBuffer() {
    const bufferSize = this.audioContext.sampleRate * 0.1;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    return buffer;
  }

  /**
   * Start playing progression
   */
  playProgression(chords, bpm = 120, style = 'rock') {
    if (this.isPlaying) {
      this.stop();
    }
    
    this.progression = chords;
    this.bpm = bpm;
    this.style = style;
    this.isPlaying = true;
    this.currentChordIndex = 0;
    this.currentBeat = 0;
    
    const beatDuration = (60 / bpm) * 1000; // ms por beat
    const beatsPerChord = 4; // 4 beats por acorde
    
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      
      const currentChord = this.progression[this.currentChordIndex];
      
      // Play chord on beat 1
      if (this.currentBeat % beatsPerChord === 0) {
        this.playChord(currentChord, (60 / this.bpm) * 4);
        this.playBass(currentChord, (60 / this.bpm) * 4);
      }
      
      // Play drum beat
      this.playDrumBeat(this.currentBeat);
      
      this.currentBeat++;
      
      // Move to next chord after 4 beats
      if (this.currentBeat % beatsPerChord === 0) {
        this.currentChordIndex = (this.currentChordIndex + 1) % this.progression.length;
      }
    }, beatDuration);
  }

  /**
   * Stop playing
   */
  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentBeat = 0;
    this.currentChordIndex = 0;
  }

  /**
   * Get current chord info
   */
  getCurrentChord() {
    if (!this.isPlaying || this.progression.length === 0) {
      return null;
    }
    return {
      chord: this.progression[this.currentChordIndex],
      index: this.currentChordIndex,
      beat: this.currentBeat % 4
    };
  }
}

export default BackingTrackEngine;

