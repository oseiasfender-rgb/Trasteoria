import MockAudioContext from "../tests/mocks/AudioContext";

class SampleEngine {
  constructor() {
    this.audioContext = null;
    this.sampleCache = new Map();
    this.activeVoices = [];
    this.masterVolume = 1.0;
    this.maxVoices = 32;
    this.cacheLimit = 100 * 1024 * 1024; // 100 MB
    this.currentCacheSize = 0;
    this.initPromise = null;
  }

  initAudioContext() {
    if (this.initPromise) {
      return this.initPromise;
    }
    this.initPromise = this._initAudioContext();
    return this.initPromise;
  }

  async _initAudioContext() {
    if (this.audioContext) {
      return this.audioContext;
    }

    if (typeof window === 'undefined') {
      this.audioContext = new MockAudioContext();
    } else {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    }
    return this.audioContext;
  }

  async loadSample(url, options = {}) {
    const { cache = true, force = false } = options;
    if (cache && this.sampleCache.has(url) && !force) {
      return this.sampleCache.get(url);
    }

    try {
      const ctx = await this.initAudioContext();
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      if (cache) {
        const bufferSize = arrayBuffer.byteLength;
        if (this.currentCacheSize + bufferSize > this.cacheLimit) {
          this.clearCache();
        }
        this.sampleCache.set(url, audioBuffer);
        this.currentCacheSize += bufferSize;
      }
      return audioBuffer;
    } catch (error) {
      throw error;
    }
  }

  playSample(buffer, options = {}) {
    const {
      volume = 1.0,
      playbackRate = 1.0,
      loop = false,
      startTime = 0,
      duration = null,
      pan = 0,
      onEnded = null
    } = options;

    if (!this.audioContext) {
      return null;
    }

    try {
      if (this.activeVoices.length >= this.maxVoices) {
        this.activeVoices[0].stop();
        this.activeVoices.shift();
      }

      const ctx = this.audioContext;
      const now = ctx.currentTime;
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      const panNode = ctx.createStereoPanner();

      source.buffer = buffer;
      source.playbackRate.value = playbackRate;
      source.loop = loop;
      gainNode.gain.value = volume * this.masterVolume;
      panNode.pan.value = pan;

      source.connect(gainNode);
      gainNode.connect(panNode);
      panNode.connect(ctx.destination);

      let actualDuration = duration || buffer.duration;
      if (loop && !duration) {
        actualDuration = buffer.duration;
      }

      source.start(now + startTime, 0, actualDuration);

      if (!loop) {
        source.stop(now + startTime + actualDuration);
      }

      const voice = {
        source,
        gainNode,
        panNode,
        buffer,
        startTime: now + startTime,
        duration: actualDuration,
        isPlaying: true,
        stop: () => {
          try {
            source.stop();
            voice.isPlaying = false;
          } catch (e) {}
        },
        setVolume: (vol) => {
          gainNode.gain.value = vol * this.masterVolume;
        },
        setPan: (p) => {
          panNode.pan.value = p;
        },
        setPlaybackRate: (rate) => {
          source.playbackRate.value = rate;
        }
      };

      const onEnd = () => {
        voice.isPlaying = false;
        if (onEnded) {
          onEnded();
        }
        this.activeVoices = this.activeVoices.filter(v => v !== voice);
      };

      source.onended = onEnd;

      this.activeVoices.push(voice);
      return voice;
    } catch (error) {
      return null;
    }
  }

  stopAll() {
    this.activeVoices.forEach(voice => {
      try {
        voice.stop();
      } catch (e) {}
    });
    this.activeVoices = [];
  }

  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  getMasterVolume() {
    return this.masterVolume;
  }

  clearCache() {
    this.sampleCache.clear();
    this.currentCacheSize = 0;
  }

  removeSampleFromCache(url) {
    if (this.sampleCache.has(url)) {
      const buffer = this.sampleCache.get(url);
      this.currentCacheSize -= buffer.length * buffer.numberOfChannels * 4;
      this.sampleCache.delete(url);
    }
  }

  getCacheInfo() {
    return {
      size: this.currentCacheSize,
      limit: this.cacheLimit,
      samples: this.sampleCache.size,
      usage: `${(this.currentCacheSize / 1024 / 1024).toFixed(2)} MB / ${(this.cacheLimit / 1024 / 1024).toFixed(0)} MB`
    };
  }

  getActiveVoices() {
    return this.activeVoices.length;
  }

  async close() {
    this.stopAll();
    if (this.audioContext) {
      await this.audioContext.close();
      this.audioContext = null;
    }
    this.clearCache();
  }
}

export default SampleEngine;
