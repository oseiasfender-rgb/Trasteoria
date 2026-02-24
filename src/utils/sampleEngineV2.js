
import Soundfont from "@marmooo/soundfont-parser";
import MockAudioContext from "../tests/mocks/AudioContext";

class SampleEngineV2 {
  constructor() {
    this.audioContext = null;
    this.samples = new Map();
    this.soundfont = null;
  }

  async initAudioContext() {
    if (!this.audioContext) {
      if (typeof window === "undefined") {
        this.audioContext = new MockAudioContext();
      } else {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }
      }
    }
    return this.audioContext;
  }

  async loadSample(instrument, url) {
    try {
      const ctx = await this.initAudioContext();
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      this.soundfont = new Soundfont(new Uint8Array(arrayBuffer));
      console.log(`Soundfont for ${instrument} loaded successfully.`);
    } catch (error) {
      console.error(`Error loading soundfont for ${instrument}:`, error);
    }
  }

  play(instrument, note) {
    if (this.soundfont) {
      const sample = this.soundfont.getSample(note);
      const source = this.audioContext.createBufferSource();
      source.buffer = this.audioContext.createBuffer(1, sample.length, this.soundfont.sampleRate);
      source.buffer.getChannelData(0).set(sample);
      source.connect(this.audioContext.destination);
      source.start(0);
    } else {
      console.warn(`Soundfont for ${instrument} not loaded.`);
    }
  }
}

export const sampleEngineV2 = new SampleEngineV2();
