import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AudioEngine } from '../utils/audioEngine.js';

describe("AudioEngine", () => {
  let audioEngine;

  beforeEach(async () => {
    audioEngine = new AudioEngine();
    await audioEngine.initialize();
  });

  describe('Initialization', () => {
    it('should create AudioContext', () => {
      expect(audioEngine.audioContext).toBeDefined();
      expect(audioEngine.audioContext).toBeInstanceOf(AudioContext);
    });

    it('should have frequency map', () => {
      expect(audioEngine.noteFrequencies).toBeDefined();
      expect(typeof audioEngine.noteFrequencies).toBe('object');
    });

    it('should have notes from C to B', () => {
      const notes = Object.keys(audioEngine.noteFrequencies);
      expect(notes).toContain('C');
      expect(notes).toContain('D');
      expect(notes).toContain('E');
      expect(notes).toContain('F');
      expect(notes).toContain('G');
      expect(notes).toContain('A');
      expect(notes).toContain('B');
    });
  });

  describe('Note Frequencies', () => {
    it('should have correct frequency for A4 (440 Hz)', () => {
      const freq = audioEngine.getNoteFrequency('A', 4);
      expect(freq).toBeCloseTo(440, 1);
    });

    it('should have correct frequency for C4 (261.63 Hz)', () => {
      const freq = audioEngine.getNoteFrequency('C', 4);
      expect(freq).toBeCloseTo(261.63, 1);
    });

    it('should support octaves 0-6', () => {
      const c0 = audioEngine.getNoteFrequency('C', 0);
      const c6 = audioEngine.getNoteFrequency('C', 6);
      
      expect(c0).toBeGreaterThan(0);
      expect(c6).toBeGreaterThan(c0);
      expect(c6 / c0).toBeCloseTo(64, 1); // 2^6 = 64
    });

    it('should handle sharp notes', () => {
      const cSharp = audioEngine.getNoteFrequency('C#', 4);
      const c = audioEngine.getNoteFrequency('C', 4);
      const d = audioEngine.getNoteFrequency('D', 4);
      
      expect(cSharp).toBeGreaterThan(c);
      expect(cSharp).toBeLessThan(d);
    });
  });

  describe('Play Note', () => {
    it('should play note without errors', async () => {
      expect(() => {
        audioEngine.playNote('C', 4, 1.0, 0.5);
      }).not.toThrow();
    });

    it('should accept valid octaves (2-5)', () => {
      expect(() => audioEngine.playNote('C', 2, 1.0, 0.5)).not.toThrow();
      expect(() => audioEngine.playNote('C', 3, 1.0, 0.5)).not.toThrow();
      expect(() => audioEngine.playNote('C', 4, 1.0, 0.5)).not.toThrow();
      expect(() => audioEngine.playNote('C', 5, 1.0, 0.5)).not.toThrow();
    });

    it('should handle invalid note gracefully', () => {
      expect(() => {
        audioEngine.playNote('X', 4, 1.0, 0.5);
      }).not.toThrow();
    });

    it('should handle volume range 0-1', () => {
      expect(() => audioEngine.playNote('C', 4, 0.0, 0.5)).not.toThrow();
      expect(() => audioEngine.playNote('C', 4, 0.5, 0.5)).not.toThrow();
      expect(() => audioEngine.playNote('C', 4, 1.0, 0.5)).not.toThrow();
    });
  });

  describe('Play Scale', () => {
    it('should play scale without errors', async () => {
      const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
      expect(() => {
        audioEngine.playScale(notes, 4, 1.0);
      }).not.toThrow();
    });

    it('should handle empty scale', () => {
      expect(() => {
        audioEngine.playScale([], 4, 1.0);
      }).not.toThrow();
    });

    it('should handle single note scale', () => {
      expect(() => {
        audioEngine.playScale(['C'], 4, 1.0);
      }).not.toThrow();
    });
  });

  describe('Play Chord', () => {
    it('should play chord without errors', async () => {
      const notes = ['C', 'E', 'G'];
      expect(() => {
        audioEngine.playChord(notes, 4, 1.0, 2.0);
      }).not.toThrow();
    });

    it('should handle major chords', () => {
      expect(() => audioEngine.playChord(['C', 'E', 'G'], 4)).not.toThrow();
      expect(() => audioEngine.playChord(['D', 'F#', 'A'], 4)).not.toThrow();
      expect(() => audioEngine.playChord(['G', 'B', 'D'], 4)).not.toThrow();
    });

    it('should handle minor chords', () => {
      expect(() => audioEngine.playChord(['A', 'C', 'E'], 4)).not.toThrow();
      expect(() => audioEngine.playChord(['E', 'G', 'B'], 4)).not.toThrow();
    });

    it('should handle 7th chords (4 notes)', () => {
      expect(() => audioEngine.playChord(['C', 'E', 'G', 'B'], 4)).not.toThrow();
    });
  });

  describe('Octave System', () => {
    it('should support octave range C2-C5', () => {
      const c2 = audioEngine.getNoteFrequency('C', 2);
      const c5 = audioEngine.getNoteFrequency('C', 5);
      
      expect(c2).toBeCloseTo(65.41, 1);
      expect(c5).toBeCloseTo(523.25, 1);
    });

    it('should have correct octave ratios', () => {
      const c2 = audioEngine.getNoteFrequency('C', 2);
      const c3 = audioEngine.getNoteFrequency('C', 3);
      const c4 = audioEngine.getNoteFrequency('C', 4);
      
      expect(c3 / c2).toBeCloseTo(2, 0.1);
      expect(c4 / c3).toBeCloseTo(2, 0.1);
    });
  });

  describe('Performance', () => {
    it('should handle multiple simultaneous notes', () => {
      expect(() => {
        for (let i = 0; i < 10; i++) {
          audioEngine.playNote('C', 4, 1.0, 0.5);
        }
      }).not.toThrow();
    });

    it('should not leak memory on repeated calls', () => {
      const initialMemory = performance.memory?.usedJSHeapSize || 0;
      
      for (let i = 0; i < 100; i++) {
        audioEngine.playNote('C', 4, 1.0, 0.1);
      }
      
      const finalMemory = performance.memory?.usedJSHeapSize || 0;
      
      // Memory should not grow significantly (allow 10MB growth)
      if (initialMemory > 0) {
        expect(finalMemory - initialMemory).toBeLessThan(10 * 1024 * 1024);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle null note', () => {
      expect(() => audioEngine.playNote(null, 4, 1.0, 0.5)).not.toThrow();
    });

    it('should handle undefined octave', () => {
      expect(() => audioEngine.playNote('C', undefined, 1.0, 0.5)).not.toThrow();
    });

    it('should handle negative volume', () => {
      expect(() => audioEngine.playNote('C', 4, -1, 0.5)).not.toThrow();
    });

    it('should handle very high volume', () => {
      expect(() => audioEngine.playNote('C', 4, 100, 0.5)).not.toThrow();
    });
  });
});

