/**
 * 🎸 Professional Bass Engine V2
 * Expressividade avançada com approach notes, variações rítmicas por gênero
 */

import { noteToFrequency, frequencyToNote } from './musicTheory';

class ProfessionalBassEngineV2 {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.masterGain = audioContext.createGain();
    this.masterGain.connect(audioContext.destination);
    this.masterGain.gain.value = 0.7;
    
    this.activeOscillators = [];
    this.volume = 0.7;
  }

  /**
   * Gerar approach notes (cromatismos)
   */
  generateApproachNotes(targetNote, style = 'chromatic') {
    const notes = [];
    const targetFreq = noteToFrequency(targetNote);
    
    switch(style) {
      case 'chromatic':
        // Aproximação cromática (semitom acima)
        notes.push({
          note: this.getApproachNote(targetNote, -1),
          duration: 0.15,
          velocity: 0.6
        });
        break;
        
      case 'tritone':
        // Tritone substitution (tritone abaixo)
        notes.push({
          note: this.getApproachNote(targetNote, -6),
          duration: 0.15,
          velocity: 0.5
        });
        break;
        
      case 'blues':
        // Blue note approach
        notes.push({
          note: this.getApproachNote(targetNote, -3), // Flat 3
          duration: 0.1,
          velocity: 0.7
        });
        break;
    }
    
    return notes;
  }

  /**
   * Obter nota de aproximação
   */
  getApproachNote(note, semitones) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteIndex = notes.indexOf(note.replace(/\d+$/, ''));
    const octave = parseInt(note.match(/\d+$/)[0]) || 4;
    
    let newIndex = noteIndex + semitones;
    let newOctave = octave;
    
    if (newIndex < 0) {
      newOctave--;
      newIndex += 12;
    } else if (newIndex >= 12) {
      newOctave++;
      newIndex -= 12;
    }
    
    return notes[newIndex] + newOctave;
  }

  /**
   * Gerar padrão de baixo por gênero
   */
  generateBassPattern(genre, chord, bpm) {
    const beatDuration = (60 / bpm) * 1000;
    const patterns = {
      jazz: this.generateJazzBass(chord, beatDuration),
      funk: this.generateFunkBass(chord, beatDuration),
      blues: this.generateBluesBass(chord, beatDuration),
      rock: this.generateRockBass(chord, beatDuration),
      pop: this.generatePopBass(chord, beatDuration),
      latin: this.generateLatinBass(chord, beatDuration),
      gospel: this.generateGospelBass(chord, beatDuration)
    };
    
    return patterns[genre] || patterns.rock;
  }

  /**
   * Jazz bass pattern (walking bass)
   */
  generateJazzBass(chord, beatDuration) {
    const root = chord.root || 'C';
    const third = this.getThird(root, chord.quality);
    const fifth = this.getFifth(root);
    
    return [
      { note: root + '1', duration: 0.4, velocity: 0.8, time: 0 },
      { note: third + '1', duration: 0.3, velocity: 0.7, time: beatDuration * 1 },
      { note: fifth + '1', duration: 0.3, velocity: 0.7, time: beatDuration * 2 },
      { note: root + '2', duration: 0.4, velocity: 0.8, time: beatDuration * 3 }
    ];
  }

  /**
   * Funk bass pattern (syncopated)
   */
  generateFunkBass(chord, beatDuration) {
    const root = chord.root || 'C';
    
    return [
      { note: root + '1', duration: 0.15, velocity: 0.9, time: 0 },
      { note: root + '1', duration: 0.1, velocity: 0.4, time: beatDuration * 0.5 }, // Ghost note
      { note: root + '1', duration: 0.15, velocity: 0.8, time: beatDuration * 1.5 },
      { note: root + '1', duration: 0.1, velocity: 0.4, time: beatDuration * 2 }, // Ghost note
      { note: root + '1', duration: 0.15, velocity: 0.9, time: beatDuration * 3 }
    ];
  }

  /**
   * Blues bass pattern
   */
  generateBluesBass(chord, beatDuration) {
    const root = chord.root || 'C';
    const flatThird = this.getApproachNote(root, 3); // Flat 3
    
    return [
      { note: root + '1', duration: 0.4, velocity: 0.85, time: 0 },
      { note: flatThird + '1', duration: 0.2, velocity: 0.7, time: beatDuration * 1.5 },
      { note: root + '1', duration: 0.4, velocity: 0.85, time: beatDuration * 2.5 }
    ];
  }

  /**
   * Rock bass pattern
   */
  generateRockBass(chord, beatDuration) {
    const root = chord.root || 'C';
    const fifth = this.getFifth(root);
    
    return [
      { note: root + '1', duration: 0.4, velocity: 0.85, time: 0 },
      { note: fifth + '1', duration: 0.3, velocity: 0.75, time: beatDuration * 2 },
      { note: root + '1', duration: 0.4, velocity: 0.85, time: beatDuration * 3.5 }
    ];
  }

  /**
   * Pop bass pattern
   */
  generatePopBass(chord, beatDuration) {
    const root = chord.root || 'C';
    
    return [
      { note: root + '1', duration: 0.3, velocity: 0.8, time: 0 },
      { note: root + '1', duration: 0.3, velocity: 0.8, time: beatDuration * 2 },
      { note: root + '1', duration: 0.3, velocity: 0.8, time: beatDuration * 3 }
    ];
  }

  /**
   * Latin bass pattern
   */
  generateLatinBass(chord, beatDuration) {
    const root = chord.root || 'C';
    const fifth = this.getFifth(root);
    
    return [
      { note: root + '1', duration: 0.2, velocity: 0.85, time: 0 },
      { note: fifth + '1', duration: 0.15, velocity: 0.7, time: beatDuration * 1 },
      { note: root + '1', duration: 0.2, velocity: 0.85, time: beatDuration * 2 },
      { note: fifth + '1', duration: 0.15, velocity: 0.7, time: beatDuration * 3 }
    ];
  }

  /**
   * Gospel bass pattern
   */
  generateGospelBass(chord, beatDuration) {
    const root = chord.root || 'C';
    const third = this.getThird(root, chord.quality);
    
    return [
      { note: root + '1', duration: 0.3, velocity: 0.85, time: 0 },
      { note: third + '1', duration: 0.2, velocity: 0.75, time: beatDuration * 1.5 },
      { note: root + '1', duration: 0.3, velocity: 0.85, time: beatDuration * 2.5 }
    ];
  }

  /**
   * Tocar nota com técnica específica
   */
  playNote(note, duration, technique = 'fingerstyle', velocity = 0.8) {
    const frequency = noteToFrequency(note);
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.frequency.value = frequency;
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(velocity * this.volume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + duration);
    
    this.activeOscillators.push(osc);
  }

  /**
   * Obter terça do acorde
   */
  getThird(root, quality = 'major') {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const index = notes.indexOf(root);
    
    const semitones = quality === 'major' ? 4 : 3;
    return notes[(index + semitones) % 12];
  }

  /**
   * Obter quinta do acorde
   */
  getFifth(root) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const index = notes.indexOf(root);
    return notes[(index + 7) % 12];
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

export default ProfessionalBassEngineV2;
export { ProfessionalBassEngineV2 };
