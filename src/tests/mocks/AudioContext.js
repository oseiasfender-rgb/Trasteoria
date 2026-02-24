
import { vi } from 'vitest';

class MockAudioContext {
  constructor() {
    this.destination = {};
    this.currentTime = 0;
    this.sampleRate = 44100;
    this.state = 'running';
  }

  createOscillator = vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    type: 'sine',
    frequency: { value: 440, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    detune: { value: 0, setValueAtTime: vi.fn() },
    onended: null,
  }));

  createGain = vi.fn(() => ({
    connect: vi.fn(),
    gain: { value: 1, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
  }));

  createBufferSource = vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    buffer: null,
    loop: false,
    onended: null,
  }));

  createBuffer = vi.fn((numberOfChannels, length, sampleRate) => ({
    numberOfChannels,
    length,
    sampleRate,
    getChannelData: vi.fn(() => new Float32Array(length)),
  }));

  decodeAudioData = vi.fn(async (audioData, successCallback) => {
    const buffer = {
      numberOfChannels: 2,
      length: 44100,
      sampleRate: 44100,
      getChannelData: vi.fn(() => new Float32Array(44100)),
    };
    if (successCallback) {
      successCallback(buffer);
    }
    return buffer;
  });

  createBiquadFilter = vi.fn(() => ({
    connect: vi.fn(),
    type: 'lowpass',
    frequency: { value: 1000, setValueAtTime: vi.fn() },
    Q: { value: 1, setValueAtTime: vi.fn() },
    gain: { value: 0, setValueAtTime: vi.fn() },
  }));

  createStereoPanner = vi.fn(() => ({
    connect: vi.fn(),
    pan: { value: 0, setValueAtTime: vi.fn() },
  }));

  close = vi.fn().mockResolvedValue(undefined);
  resume = vi.fn().mockResolvedValue(undefined);
  suspend = vi.fn().mockResolvedValue(undefined);
}

global.AudioContext = MockAudioContext;
global.webkitAudioContext = MockAudioContext;
