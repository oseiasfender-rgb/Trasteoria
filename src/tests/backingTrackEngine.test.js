import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BackingTrackEngine } from '../utils/backingTrackEngine.js';

describe("BackingTrackEngine", () => {
  let engine;
  let mockAudioContext;

  beforeEach(() => {
    mockAudioContext = new AudioContext();
    engine = new BackingTrackEngine(mockAudioContext);
  });

  afterEach(() => {
    if (engine && engine.isPlaying) {
      engine.stop();
    }
  });

  describe('Initialization', () => {
    it('should create BackingTrackEngine', () => {
      expect(engine).toBeDefined();
      expect(engine.audioContext).toBeDefined();
    });

    it('should not be playing initially', () => {
      expect(engine.isPlaying).toBe(false);
    });

    it('should have default BPM', () => {
      expect(engine.bpm).toBe(120);
    });

    it('should have note frequencies map', () => {
      expect(engine.noteFrequencies).toBeDefined();
      expect(engine.noteFrequencies['C']).toBeCloseTo(130.81, 1);
      expect(engine.noteFrequencies['A']).toBeCloseTo(220.00, 1);
    });
  });

  describe('Chord Parsing', () => {
    it('should parse major chords', () => {
      const chord = engine.parseChord('C');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('C');
      expect(chord.quality).toBe('maj');
    });

    it('should parse minor chords', () => {
      const chord = engine.parseChord('Cm');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('C');
      expect(chord.quality).toBe('m');
    });

    it('should parse dominant 7th chords', () => {
      const chord = engine.parseChord('C7');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('C');
      expect(chord.quality).toBe('7');
    });

    it('should parse major 7th chords', () => {
      const chord = engine.parseChord('Cmaj7');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('C');
      expect(chord.quality).toBe('maj7');
    });

    it('should parse minor 7th chords', () => {
      const chord = engine.parseChord('Cm7');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('C');
      expect(chord.quality).toBe('m7');
    });

    it('should handle sharp notes', () => {
      const chord = engine.parseChord('C#');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('C#');
    });

    it('should handle flat notes', () => {
      const chord = engine.parseChord('Db');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('Db');
    });

    it('should handle suspended chords', () => {
      const chord = engine.parseChord('Csus4');
      expect(chord).toBeDefined();
      expect(chord.quality).toBe('sus4');
    });

    it('should handle invalid chord gracefully', () => {
      const chord = engine.parseChord('Invalid');
      expect(chord).toBeDefined();
      expect(chord.root).toBe('C'); // Default
      expect(chord.quality).toBe('maj');
    });
  });

  describe('Chord Tones (Frequencies)', () => {
    it('should get tones for C major (3 notes)', () => {
      const tones = engine.getChordTones('C', 'maj');
      expect(tones).toBeDefined();
      expect(tones.length).toBe(3);
      expect(tones[0]).toBeCloseTo(130.81, 1); // C
    });

    it('should get tones for C minor (3 notes)', () => {
      const tones = engine.getChordTones('C', 'm');
      expect(tones).toBeDefined();
      expect(tones.length).toBe(3);
    });

    it('should get tones for C7 (4 notes)', () => {
      const tones = engine.getChordTones('C', '7');
      expect(tones).toBeDefined();
      expect(tones.length).toBe(4);
    });

    it('should get tones for Cmaj7 (4 notes)', () => {
      const tones = engine.getChordTones('C', 'maj7');
      expect(tones).toBeDefined();
      expect(tones.length).toBe(4);
    });

    it('should handle invalid quality with default (major)', () => {
      const tones = engine.getChordTones('C', 'invalid');
      expect(tones).toBeDefined();
      expect(tones.length).toBe(3); // Default to major
    });
  });

  describe('Play Chord', () => {
    it('should play chord without errors', () => {
      expect(() => {
        engine.playChord('C');
      }).not.toThrow();
    });

    it('should play major chords', () => {
      expect(() => engine.playChord('C')).not.toThrow();
      expect(() => engine.playChord('G')).not.toThrow();
      expect(() => engine.playChord('D')).not.toThrow();
    });

    it('should play minor chords', () => {
      expect(() => engine.playChord('Am')).not.toThrow();
      expect(() => engine.playChord('Em')).not.toThrow();
    });

    it('should play 7th chords', () => {
      expect(() => engine.playChord('C7')).not.toThrow();
      expect(() => engine.playChord('Cmaj7')).not.toThrow();
    });

    it('should accept duration parameter', () => {
      expect(() => engine.playChord('C', 2.0)).not.toThrow();
    });
  });

  describe('Play Bass', () => {
    it('should play bass note without errors', () => {
      expect(() => {
        engine.playBass('C');
      }).not.toThrow();
    });

    it('should play bass for different chords', () => {
      expect(() => engine.playBass('C')).not.toThrow();
      expect(() => engine.playBass('Am')).not.toThrow();
      expect(() => engine.playBass('F')).not.toThrow();
    });
  });

  describe('Play Drum Beat', () => {
    it('should play drum beat without errors', () => {
      expect(() => {
        engine.playDrumBeat(0);
      }).not.toThrow();
    });

    it('should play kick on even beats', () => {
      expect(() => engine.playDrumBeat(0)).not.toThrow();
      expect(() => engine.playDrumBeat(2)).not.toThrow();
    });

    it('should play snare on odd beats', () => {
      expect(() => engine.playDrumBeat(1)).not.toThrow();
      expect(() => engine.playDrumBeat(3)).not.toThrow();
    });
  });

  describe('Play Progression', () => {
    it('should start playing progression', () => {
      const chords = ['C', 'Am', 'F', 'G'];
      engine.playProgression(chords, 120);
      
      expect(engine.isPlaying).toBe(true);
      expect(engine.progression).toEqual(chords);
      expect(engine.bpm).toBe(120);
    });

    it('should handle empty progression', () => {
      expect(() => {
        engine.playProgression([], 120);
      }).not.toThrow();
    });

    it('should handle single chord', () => {
      expect(() => {
        engine.playProgression(['C'], 120);
      }).not.toThrow();
      expect(engine.isPlaying).toBe(true);
    });

    it('should accept BPM parameter', () => {
      engine.playProgression(['C', 'G'], 80);
      expect(engine.bpm).toBe(80);
    });

    it('should accept style parameter', () => {
      engine.playProgression(['C', 'G'], 120, 'jazz');
      expect(engine.style).toBe('jazz');
    });

    it('should stop previous progression when starting new one', () => {
      engine.playProgression(['C', 'G'], 120);
      expect(engine.isPlaying).toBe(true);
      
      engine.playProgression(['Am', 'F'], 140);
      expect(engine.isPlaying).toBe(true);
      expect(engine.progression).toEqual(['Am', 'F']);
      expect(engine.bpm).toBe(140);
    });
  });

  describe('Stop', () => {
    it('should stop playing', () => {
      engine.playProgression(['C', 'G'], 120);
      expect(engine.isPlaying).toBe(true);
      
      engine.stop();
      expect(engine.isPlaying).toBe(false);
      expect(engine.intervalId).toBeNull();
    });

    it('should handle stop when not playing', () => {
      expect(() => {
        engine.stop();
      }).not.toThrow();
      expect(engine.isPlaying).toBe(false);
    });

    it('should reset beat counters', () => {
      engine.playProgression(['C', 'G'], 120);
      engine.stop();
      
      expect(engine.currentBeat).toBe(0);
      expect(engine.currentChordIndex).toBe(0);
    });
  });

  describe('Get Current Chord', () => {
    it('should return current chord object when playing', () => {
      engine.playProgression(['C', 'Am', 'F', 'G'], 120);
      const currentChord = engine.getCurrentChord();
      
      expect(currentChord).toBeDefined();
      expect(currentChord).toHaveProperty('chord');
      expect(currentChord).toHaveProperty('index');
      expect(currentChord).toHaveProperty('beat');
      expect(['C', 'Am', 'F', 'G']).toContain(currentChord.chord);
    });

    it('should return null when not playing', () => {
      const currentChord = engine.getCurrentChord();
      expect(currentChord).toBeNull();
    });

    it('should return null for empty progression', () => {
      engine.playProgression([], 120);
      const currentChord = engine.getCurrentChord();
      expect(currentChord).toBeNull();
    });
  });

  describe('BPM Validation', () => {
    it('should accept valid BPM range (40-200)', () => {
      expect(() => engine.playProgression(['C'], 40)).not.toThrow();
      expect(() => engine.playProgression(['C'], 120)).not.toThrow();
      expect(() => engine.playProgression(['C'], 200)).not.toThrow();
    });

    it('should handle very low BPM', () => {
      expect(() => engine.playProgression(['C'], 20)).not.toThrow();
      expect(engine.bpm).toBe(20);
    });

    it('should handle very high BPM', () => {
      expect(() => engine.playProgression(['C'], 300)).not.toThrow();
      expect(engine.bpm).toBe(300);
    });
  });

  describe('Common Progressions', () => {
    it('should play Blues progression (12 bar)', () => {
      const blues = ['A7', 'A7', 'A7', 'A7', 'D7', 'D7', 'A7', 'A7', 'E7', 'D7', 'A7', 'E7'];
      expect(() => {
        engine.playProgression(blues, 120);
      }).not.toThrow();
      expect(engine.progression).toEqual(blues);
    });

    it('should play Jazz II-V-I', () => {
      const jazz = ['Dm7', 'G7', 'Cmaj7'];
      expect(() => {
        engine.playProgression(jazz, 140);
      }).not.toThrow();
      expect(engine.progression).toEqual(jazz);
    });

    it('should play Pop progression (I-V-vi-IV)', () => {
      const pop = ['C', 'G', 'Am', 'F'];
      expect(() => {
        engine.playProgression(pop, 120);
      }).not.toThrow();
      expect(engine.progression).toEqual(pop);
    });

    it('should play Bossa Nova progression', () => {
      const bossa = ['Fmaj7', 'G7', 'Gm7', 'Gb7'];
      expect(() => {
        engine.playProgression(bossa, 120);
      }).not.toThrow();
      expect(engine.progression).toEqual(bossa);
    });
  });

  describe('Performance', () => {
    it('should handle rapid start/stop', () => {
      for (let i = 0; i < 10; i++) {
        engine.playProgression(['C', 'G'], 120);
        engine.stop();
      }
      expect(engine.isPlaying).toBe(false);
    });

    it('should handle progression change while playing', () => {
      engine.playProgression(['C', 'G'], 120);
      expect(() => {
        engine.playProgression(['Am', 'F'], 140);
      }).not.toThrow();
      expect(engine.progression).toEqual(['Am', 'F']);
    });
  });

  describe('Error Handling', () => {
    it('should handle null chords array', () => {
      expect(() => {
        engine.playProgression(null, 120);
      }).not.toThrow();
    });

    it('should handle undefined BPM', () => {
      expect(() => {
        engine.playProgression(['C'], undefined);
      }).not.toThrow();
    });

    it('should handle invalid chord names gracefully', () => {
      expect(() => {
        engine.playProgression(['Invalid', 'XYZ'], 120);
      }).not.toThrow();
      expect(engine.isPlaying).toBe(true);
    });

    it('should handle playChord without audioContext', () => {
      const engineNoContext = new BackingTrackEngine(null);
      expect(() => {
        engineNoContext.playChord('C');
      }).not.toThrow();
    });

    it('should handle playBass without audioContext', () => {
      const engineNoContext = new BackingTrackEngine(null);
      expect(() => {
        engineNoContext.playBass('C');
      }).not.toThrow();
    });
  });

  describe('Noise Buffer Creation', () => {
    it('should create noise buffer for snare', () => {
      const buffer = engine.createNoiseBuffer();
      expect(buffer).toBeDefined();
      expect(buffer.length).toBeGreaterThan(0);
    });
  });
});

