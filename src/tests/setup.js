import { afterEach, vi } from 'vitest';

// Mock Web Audio API
global.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn().mockReturnValue({
    type: 'sine',
    frequency: { value: 440 },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }),
  createGain: vi.fn().mockReturnValue({
    gain: { value: 1, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    connect: vi.fn(),
  }),
  createBiquadFilter: vi.fn().mockReturnValue({
    type: 'lowpass',
    frequency: { value: 1000 },
    Q: { value: 1 },
    connect: vi.fn(),
  }),
  createBufferSource: vi.fn().mockReturnValue({
    buffer: null,
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }),
  createDynamicsCompressor: vi.fn().mockReturnValue({
    threshold: { value: -50 },
    knee: { value: 40 },
    ratio: { value: 12 },
    attack: { value: 0 },
    release: { value: 0.25 },
    connect: vi.fn(),
  }),
  destination: {},
  currentTime: 0,
  sampleRate: 44100,
  state: 'running',
  resume: vi.fn().mockResolvedValue(undefined),
  suspend: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
}));

// Cleanup after each test
afterEach(() => {
  // Cleanup logic here if needed
});

