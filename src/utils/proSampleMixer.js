/**
 * ProSampleMixer - Gerenciador de mix profissional
 * 
 * Responsabilidades:
 * - Gerenciar múltiplos channels de áudio
 * - Controle de volume, pan, EQ, reverb
 * - Sincronização de BPM entre engines
 * - Exportação de áudio
 */

import { sampleEngine } from './sampleEngine.js';
import { drumSampleEngine } from './drumSampleEngine.js';
import { bassSampleEngine } from './bassSampleEngine.js';
import { pianoSampleEngine } from './pianoSampleEngine.js';

class ProSampleMixer {
  constructor() {
    this.audioContext = null;
    this.channels = new Map();
    this.bpm = 120;
    this.isPlaying = false;
    
    // Canais padrão
    this.channelNames = ['drums', 'bass', 'piano', 'guitar', 'master'];
  }

  /**
   * Inicializar mixer
   */
  async init() {
    try {
      this.audioContext = await sampleEngine.initAudioContext();
      
      // Criar canais
      for (const name of this.channelNames) {
        this.createChannel(name);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Criar canal de áudio
   */
  createChannel(name) {
    const channel = {
      name,
      gainNode: this.audioContext.createGain(),
      panNode: this.audioContext.createStereoPanner(),
      eqNodes: {
        low: this.audioContext.createBiquadFilter(),
        mid: this.audioContext.createBiquadFilter(),
        high: this.audioContext.createBiquadFilter()
      },
      reverbNode: null,
      volume: 1.0,
      pan: 0,
      eq: { low: 0, mid: 0, high: 0 },
      reverb: 0,
      muted: false,
      solo: false
    };

    // Configurar filtros EQ
    channel.eqNodes.low.type = 'lowshelf';
    channel.eqNodes.low.frequency.value = 200;
    
    channel.eqNodes.mid.type = 'peaking';
    channel.eqNodes.mid.frequency.value = 1000;
    
    channel.eqNodes.high.type = 'highshelf';
    channel.eqNodes.high.frequency.value = 5000;

    // Conectar nós
    channel.gainNode.connect(channel.eqNodes.low);
    channel.eqNodes.low.connect(channel.eqNodes.mid);
    channel.eqNodes.mid.connect(channel.eqNodes.high);
    channel.eqNodes.high.connect(channel.panNode);
    channel.panNode.connect(this.audioContext.destination);

    this.channels.set(name, channel);
  }

  /**
   * Obter canal
   */
  getChannel(name) {
    return this.channels.get(name);
  }

  /**
   * Definir volume do canal
   */
  setChannelVolume(channelName, volume) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.volume = Math.max(0, Math.min(1, volume));
      channel.gainNode.gain.value = channel.volume;
    }
  }

  /**
   * Definir pan do canal
   */
  setChannelPan(channelName, pan) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.pan = Math.max(-1, Math.min(1, pan));
      channel.panNode.pan.value = channel.pan;
    }
  }

  /**
   * Definir EQ do canal
   */
  setChannelEQ(channelName, low, mid, high) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.eq = { low, mid, high };
      channel.eqNodes.low.gain.value = low;
      channel.eqNodes.mid.gain.value = mid;
      channel.eqNodes.high.gain.value = high;
    }
  }

  /**
   * Definir reverb do canal
   */
  setChannelReverb(channelName, amount) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.reverb = Math.max(0, Math.min(1, amount));
      // Implementação de reverb seria mais complexa (convolver)
      // Por enquanto, apenas armazenar o valor
    }
  }

  /**
   * Mutar canal
   */
  muteChannel(channelName, muted = true) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.muted = muted;
      channel.gainNode.gain.value = muted ? 0 : channel.volume;
    }
  }

  /**
   * Solo de canal
   */
  soloChannel(channelName, solo = true) {
    const channel = this.getChannel(channelName);
    if (channel) {
      channel.solo = solo;
      
      // Se solo ativado, mutar outros canais
      if (solo) {
        for (const [name, ch] of this.channels) {
          if (name !== channelName) {
            ch.gainNode.gain.value = 0;
          }
        }
      } else {
        // Restaurar volumes
        for (const [name, ch] of this.channels) {
          ch.gainNode.gain.value = ch.muted ? 0 : ch.volume;
        }
      }
    }
  }

  /**
   * Definir BPM global
   */
  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(300, bpm));
    drumSampleEngine.setBPM(this.bpm);
  }

  /**
   * Obter BPM
   */
  getBPM() {
    return this.bpm;
  }

  /**
   * Reproduzir backing track completo
   */
  async playBackingTrack(config) {
    const {
      drumStyle = 'rock',
      drumPattern = 0,
      bassMode = 'root',
      chordNotes = ['C4'],
      chordType = 'major',
      bpm = 120,
      duration = 4 // compassos
    } = config;

    try {
      this.setBPM(bpm);
      this.isPlaying = true;

      // Carregar kits se necessário
      if (!drumSampleEngine.currentKit) {
        await drumSampleEngine.loadDrumKit(drumStyle);
      }
      if (!bassSampleEngine.currentKit) {
        await bassSampleEngine.loadBassKit('electric');
      }
      if (!pianoSampleEngine.currentKit) {
        await pianoSampleEngine.loadPiano('acoustic');
      }

      // Obter padrão de bateria
      const patterns = drumSampleEngine.getPatterns(drumStyle);
      const pattern = patterns[drumPattern] || patterns[0];

      // Reproduzir bateria
      drumSampleEngine.playPattern(pattern, bpm, true);

      // Reproduzir baixo
      const bassLine = bassSampleEngine.generateBassLine(chordNotes, bassMode, duration);
      bassSampleEngine.playBassLine(bassLine, bassMode, bpm);

      // Reproduzir piano
      pianoSampleEngine.playChord(chordNotes[0], chordType, 4, 0.7);
    } catch (error) {
      this.isPlaying = false;
    }
  }

  /**
   * Parar backing track
   */
  stopBackingTrack() {
    drumSampleEngine.stopPattern();
    sampleEngine.stopAll();
    this.isPlaying = false;
  }

  /**
   * Obter status do mixer
   */
  getStatus() {
    return {
      isPlaying: this.isPlaying,
      bpm: this.bpm,
      channels: Array.from(this.channels.entries()).map(([name, ch]) => ({
        name,
        volume: ch.volume,
        pan: ch.pan,
        muted: ch.muted,
        solo: ch.solo
      }))
    };
  }

  /**
   * Exportar áudio (futuro)
   */
  async exportAudio(filename = 'backing-track.wav') {
    // Implementação futura usando MediaRecorder ou similar
  }

  /**
   * Fechar mixer
   */
  async close() {
    this.stopBackingTrack();
    await sampleEngine.close();
  }
}

// Exportar singleton
export const proSampleMixer = new ProSampleMixer();
export default ProSampleMixer;
