import { bassSampleEngine } from './bassSampleEngine.js';
import { pianoSampleEngine } from './pianoSampleEngine.js';

class ProSampleMixer {
  constructor(sampleEngine, drumSampleEngine) {
    this.sampleEngine = sampleEngine;
    this.drumSampleEngine = drumSampleEngine;
    this.audioContext = null;
    this.channels = new Map();
    this.bpm = 120;
    this.isPlaying = false;
    this.channelNames = ["drums", "bass", "piano", "guitar", "master"];
    this.isInitialized = false;
    this.initPromise = null;
  }

  init() {
    if (this.initPromise) {
      return this.initPromise;
    }
    this.initPromise = this._init();
    return this.initPromise;
  }

  async _init() {
    if (this.isInitialized) {
      return true;
    }

    try {
      if (!this.audioContext) {
        this.audioContext = await this.sampleEngine.initAudioContext();
      }
      this.channels.clear();
      for (const name of this.channelNames) {
        this.createChannel(name);
      }
      this.isInitialized = true;
      return true;
    } catch (error) {
      this.isInitialized = false;
      return false;
    }
  }

  createChannel(name) {
    const channel = {
      name,
      gainNode: this.audioContext.createGain(),
      panNode: this.audioContext.createStereoPanner(),
      eqNodes: {
        low: this.audioContext.createBiquadFilter(),
        mid: this.audioContext.createBiquadFilter(),
        high: this.audioContext.createBiquadFilter(),
      },
      reverbNode: null,
      volume: 1.0,
      pan: 0,
      eq: { low: 0, mid: 0, high: 0 },
      reverb: 0,
      muted: false,
      solo: false,
    };

    channel.eqNodes.low.type = "lowshelf";
    channel.eqNodes.low.frequency.value = 200;
    channel.eqNodes.mid.type = "peaking";
    channel.eqNodes.mid.frequency.value = 1000;
    channel.eqNodes.high.type = "highshelf";
    channel.eqNodes.high.frequency.value = 5000;

    channel.gainNode.connect(channel.eqNodes.low);
    channel.eqNodes.low.connect(channel.eqNodes.mid);
    channel.eqNodes.mid.connect(channel.eqNodes.high);
    channel.eqNodes.high.connect(channel.panNode);
    channel.panNode.connect(this.audioContext.destination);

    this.channels.set(name, channel);
  }

  getChannel(name) {
    return this.channels.get(name);
  }

  setChannelVolume(channelName, volume) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.volume = Math.max(0, Math.min(1, volume));
      channel.gainNode.gain.value = channel.volume;
    }
  }

  setChannelPan(channelName, pan) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.pan = Math.max(-1, Math.min(1, pan));
      channel.panNode.pan.value = channel.pan;
    }
  }

  setChannelEQ(channelName, low, mid, high) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.eq = { low, mid, high };
      channel.eqNodes.low.gain.value = low;
      channel.eqNodes.mid.gain.value = mid;
      channel.eqNodes.high.gain.value = high;
    }
  }

  setChannelReverb(channelName, amount) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.reverb = Math.max(0, Math.min(1, amount));
    }
  }

  muteChannel(channelName, muted = true) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.muted = muted;
      channel.gainNode.gain.value = muted ? 0 : channel.volume;
    }
  }

  soloChannel(channelName, solo = true) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.solo = solo;
      if (solo) {
        for (const [name, ch] of this.channels) {
          if (name !== channelName) {
            ch.gainNode.gain.value = 0;
          }
        }
      } else {
        for (const [name, ch] of this.channels) {
          ch.gainNode.gain.value = ch.muted ? 0 : ch.volume;
        }
      }
    }
  }

  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(300, bpm));
    this.drumSampleEngine.setBPM(this.bpm);
  }

  getBPM() {
    return this.bpm;
  }

  async playBackingTrack(config) {
    const {
      drumStyle = "rock",
      drumPattern = 0,
      bassMode = "root",
      chordNotes = ["C4"],
      chordType = "major",
      bpm = 120,
      duration = 4,
    } = config;

    try {
      this.setBPM(bpm);
      this.isPlaying = true;

      if (!this.drumSampleEngine.currentKit) {
        await this.drumSampleEngine.loadDrumKit(drumStyle);
      }
      if (!bassSampleEngine.currentKit) {
        await bassSampleEngine.loadBassKit("electric");
      }
      if (!pianoSampleEngine.currentKit) {
        await pianoSampleEngine.loadPiano("acoustic");
      }

      const patterns = this.drumSampleEngine.getPatterns(drumStyle);
      const pattern = patterns[drumPattern] || patterns[0];

      this.drumSampleEngine.playPattern(pattern, bpm, true);

      const bassLine = bassSampleEngine.generateBassLine(
        chordNotes,
        bassMode,
        duration
      );
      bassSampleEngine.playBassLine(bassLine, bassMode, bpm);

      pianoSampleEngine.playChord(chordNotes[0], chordType, 4, 0.7);
    } catch (error) {
      this.isPlaying = false;
    }
  }

  stopBackingTrack() {
    this.drumSampleEngine.stopPattern();
    this.sampleEngine.stopAll();
    this.isPlaying = false;
  }

  getStatus() {
    return {
      isPlaying: this.isPlaying,
      bpm: this.bpm,
      channels: Array.from(this.channels.values()).map((ch) => ({
        name: ch.name,
        volume: ch.volume,
        pan: ch.pan,
        muted: ch.muted,
        solo: ch.solo,
      })),
    };
  }

  async exportAudio(filename = "backing-track.wav") {}

  async close() {
    this.stopBackingTrack();
    await this.sampleEngine.close();
    this.isInitialized = false;
  }
}

export default ProSampleMixer;
