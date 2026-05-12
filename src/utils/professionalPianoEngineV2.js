/**
 * 🎹 Professional Piano Engine V2
 * Voicings profissionais (drop 2, rootless, spread) e comping rítmico
 */

import { noteToFrequency } from './musicTheory';

class ProfessionalPianoEngineV2 {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.masterGain = audioContext.createGain();
    this.masterGain.connect(audioContext.destination);
    this.masterGain.gain.value = 0.6;
    
    this.activeOscillators = [];
    this.volume = 0.6;
  }

  /**
   * Gerar voicing por gênero
   */
  generateVoicing(chord, genre = 'jazz') {
    const voicings = {
      jazz: this.generateJazzVoicing(chord),
      pop: this.generatePopVoicing(chord),
      gospel: this.generateGospelVoicing(chord),
      blues: this.generateBluesVoicing(chord),
      classical: this.generateClassicalVoicing(chord)
    };
    
    return voicings[genre] || voicings.jazz;
  }

  /**
   * Jazz voicing (drop 2, rootless)
   */
  generateJazzVoicing(chord) {
    const root = chord.root || 'C';
    const third = this.getThird(root, chord.quality);
    const fifth = this.getFifth(root);
    const seventh = this.getSeventh(root, chord.quality);
    
    // Drop 2 voicing: root, 7th, 3rd, 5th (com 7th uma oitava abaixo)
    return [
      { note: root + '4', duration: 2, velocity: 0.7 },
      { note: seventh + '3', duration: 2, velocity: 0.7 },
      { note: third + '4', duration: 2, velocity: 0.7 },
      { note: fifth + '4', duration: 2, velocity: 0.6 }
    ];
  }

  /**
   * Pop voicing (rootless, simples)
   */
  generatePopVoicing(chord) {
    const root = chord.root || 'C';
    const third = this.getThird(root, chord.quality);
    const fifth = this.getFifth(root);
    
    // Rootless voicing: 3rd, 5th, root (uma oitava acima)
    return [
      { note: third + '4', duration: 2, velocity: 0.8 },
      { note: fifth + '4', duration: 2, velocity: 0.8 },
      { note: root + '5', duration: 2, velocity: 0.7 }
    ];
  }

  /**
   * Gospel voicing (rich, full)
   */
  generateGospelVoicing(chord) {
    const root = chord.root || 'C';
    const third = this.getThird(root, chord.quality);
    const fifth = this.getFifth(root);
    const seventh = this.getSeventh(root, chord.quality);
    
    // Open voicing: root, 3rd, 5th, 7th (spread)
    return [
      { note: root + '3', duration: 2, velocity: 0.8 },
      { note: third + '4', duration: 2, velocity: 0.8 },
      { note: fifth + '4', duration: 2, velocity: 0.8 },
      { note: seventh + '4', duration: 2, velocity: 0.7 }
    ];
  }

  /**
   * Blues voicing (dominant 7, simples)
   */
  generateBluesVoicing(chord) {
    const root = chord.root || 'C';
    const third = this.getThird(root, 'major');
    const fifth = this.getFifth(root);
    
    // Dominant 7 voicing: root, 3rd, 5th, flat 7
    return [
      { note: root + '4', duration: 2, velocity: 0.8 },
      { note: third + '4', duration: 2, velocity: 0.8 },
      { note: fifth + '4', duration: 2, velocity: 0.7 }
    ];
  }

  /**
   * Classical voicing (triads)
   */
  generateClassicalVoicing(chord) {
    const root = chord.root || 'C';
    const third = this.getThird(root, chord.quality);
    const fifth = this.getFifth(root);
    
    return [
      { note: root + '3', duration: 2, velocity: 0.8 },
      { note: third + '4', duration: 2, velocity: 0.8 },
      { note: fifth + '4', duration: 2, velocity: 0.8 }
    ];
  }

  /**
   * Comping rítmico (acompanhamento)
   */
  generateCompingPattern(genre, bpm) {
    const beatDuration = (60 / bpm) * 1000;
    
    const patterns = {
      jazz: [
        { time: 0, intensity: 0.8 },
        { time: beatDuration * 2, intensity: 0.6 },
        { time: beatDuration * 3, intensity: 0.7 }
      ],
      funk: [
        { time: 0, intensity: 0.9 },
        { time: beatDuration * 1.5, intensity: 0.5 },
        { time: beatDuration * 3, intensity: 0.8 }
      ],
      gospel: [
        { time: 0, intensity: 0.85 },
        { time: beatDuration * 1, intensity: 0.7 },
        { time: beatDuration * 2, intensity: 0.85 },
        { time: beatDuration * 3, intensity: 0.7 }
      ],
      pop: [
        { time: 0, intensity: 0.8 },
        { time: beatDuration * 2, intensity: 0.8 }
      ]
    };
    
    return patterns[genre] || patterns.pop;
  }

  /**
   * Tocar acorde
   */
  playChord(voicing, duration, velocity = 0.7) {
    voicing.forEach(note => {
      const frequency = noteToFrequency(note.note);
      
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.frequency.value = frequency;
      osc.type = 'sine';
      
      const finalVelocity = (note.velocity || velocity) * this.volume;
      gain.gain.setValueAtTime(finalVelocity, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(this.audioContext.currentTime);
      osc.stop(this.audioContext.currentTime + duration);
      
      this.activeOscillators.push(osc);
    });
  }

  /**
   * Obter terça
   */
  getThird(root, quality = 'major') {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const index = notes.indexOf(root);
    const semitones = quality === 'major' ? 4 : 3;
    return notes[(index + semitones) % 12];
  }

  /**
   * Obter quinta
   */
  getFifth(root) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const index = notes.indexOf(root);
    return notes[(index + 7) % 12];
  }

  /**
   * Obter sétima
   */
  getSeventh(root, quality = 'major') {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const index = notes.indexOf(root);
    const semitones = quality === 'major' ? 11 : 10;
    return notes[(index + semitones) % 12];
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

export default ProfessionalPianoEngineV2;
export { ProfessionalPianoEngineV2 };
