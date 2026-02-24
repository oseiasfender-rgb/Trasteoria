// looperEngine.js
// Looper com gravação de áudio, overdubs ilimitados e sincronização com BPM
// Web Audio API + MediaRecorder API

class LooperEngine {
  constructor() {
    this.audioContext = null;
    this.mediaRecorder = null;
    this.stream = null;
    
    // Estado
    this.isRecording = false;
    this.isPlaying = false;
    this.isOverdubbing = false;
    
    // Camadas de áudio (overdubs)
    this.layers = []; // Array de AudioBuffers
    this.currentRecordingChunks = [];
    
    // Configurações
    this.bpm = 120;
    this.bars = 4; // Duração do loop em compassos
    this.beatsPerBar = 4;
    this.maxDuration = 60; // segundos
    this.volume = 0.8;
    
    // Sincronização
    this.loopDuration = 0; // segundos
    this.startTime = 0;
    this.currentTime = 0;
    
    // Playback
    this.playbackSources = [];
    this.playbackIntervalId = null;
    
    // Callbacks
    this.onRecordingStart = null;
    this.onRecordingStop = null;
    this.onPlaybackStart = null;
    this.onPlaybackStop = null;
    this.onTimeUpdate = null;
  }

  // Inicializar contexto de áudio
  async ensureContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    return this.audioContext;
  }

  // Solicitar permissão de microfone
  async requestMicrophone() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Calcular duração do loop baseado em BPM e compassos
  calculateLoopDuration() {
    const secondsPerBeat = 60 / this.bpm;
    const totalBeats = this.bars * this.beatsPerBar;
    this.loopDuration = totalBeats * secondsPerBeat;
    return this.loopDuration;
  }

  // Iniciar gravação
  async startRecording() {
    await this.ensureContext();
    
    // Se é a primeira camada, solicitar microfone
    if (this.layers.length === 0 && !this.stream) {
      const hasPermission = await this.requestMicrophone();
      if (!hasPermission) {
        throw new Error('Permissão de microfone negada');
      }
    }
    
    // Calcular duração do loop
    this.calculateLoopDuration();
    
    // Configurar MediaRecorder
    this.mediaRecorder = new MediaRecorder(this.stream);
    this.currentRecordingChunks = [];
    
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.currentRecordingChunks.push(event.data);
      }
    };
    
    this.mediaRecorder.onstop = async () => {
      await this.processRecording();
    };
    
    // Iniciar gravação
    this.mediaRecorder.start();
    this.isRecording = true;
    this.startTime = this.audioContext.currentTime;
    
    // Se já tem camadas, está fazendo overdub
    if (this.layers.length > 0) {
      this.isOverdubbing = true;
      this.playAllLayers(); // Tocar camadas existentes durante overdub
    }
    
    // Parar gravação automaticamente após duração do loop
    setTimeout(() => {
      this.stopRecording();
    }, this.loopDuration * 1000);
    
    if (this.onRecordingStart) {
      this.onRecordingStart();
    }
  }

  // Parar gravação
  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.isOverdubbing = false;
      
      if (this.onRecordingStop) {
        this.onRecordingStop();
      }
    }
  }

  // Processar gravação e adicionar como nova camada
  async processRecording() {
    const blob = new Blob(this.currentRecordingChunks, { type: 'audio/webm' });
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    
    // Adicionar como nova camada
    this.layers.push({
      id: Date.now(),
      buffer: audioBuffer,
      volume: 1.0,
      muted: false,
      solo: false
    });
    
    this.currentRecordingChunks = [];
    
    // Se era a primeira camada, iniciar playback automático
    if (this.layers.length === 1) {
      this.play();
    }
  }

  // Tocar todas as camadas
  playAllLayers() {
    this.stopAllLayers();
    
    const startTime = this.audioContext.currentTime;
    
    this.layers.forEach(layer => {
      if (layer.muted) return;
      
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = layer.buffer;
      gainNode.gain.value = layer.volume * this.volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start(startTime);
      
      this.playbackSources.push({ source, layer: layer.id });
    });
  }

  // Parar todas as camadas
  stopAllLayers() {
    this.playbackSources.forEach(({ source }) => {
      try {
        source.stop();
      } catch (e) {
        // Ignorar erro se já parou
      }
    });
    this.playbackSources = [];
  }

  // Iniciar playback em loop
  play() {
    if (this.layers.length === 0) return;
    
    this.isPlaying = true;
    this.startTime = this.audioContext.currentTime;
    
    const playLoop = () => {
      if (!this.isPlaying) return;
      
      this.playAllLayers();
      
      // Agendar próximo loop
      this.playbackIntervalId = setTimeout(playLoop, this.loopDuration * 1000);
    };
    
    playLoop();
    
    if (this.onPlaybackStart) {
      this.onPlaybackStart();
    }
  }

  // Parar playback
  stop() {
    this.isPlaying = false;
    this.stopAllLayers();
    
    if (this.playbackIntervalId) {
      clearTimeout(this.playbackIntervalId);
      this.playbackIntervalId = null;
    }
    
    if (this.onPlaybackStop) {
      this.onPlaybackStop();
    }
  }

  // Pausar/retomar
  togglePlayPause() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  // Limpar todas as camadas
  clear() {
    this.stop();
    this.layers = [];
  }

  // Remover última camada (Undo)
  undoLastLayer() {
    if (this.layers.length > 0) {
      this.layers.pop();
      
      if (this.layers.length === 0) {
        this.stop();
      } else if (this.isPlaying) {
        // Reiniciar playback com camadas restantes
        this.stop();
        this.play();
      }
      
      return true;
    }
    return false;
  }

  // Remover camada específica
  removeLayer(layerId) {
    const index = this.layers.findIndex(l => l.id === layerId);
    if (index !== -1) {
      this.layers.splice(index, 1);
      
      if (this.layers.length === 0) {
        this.stop();
      } else if (this.isPlaying) {
        this.stop();
        this.play();
      }
      
      return true;
    }
    return false;
  }

  // Mutar/desmutar camada
  toggleMute(layerId) {
    const layer = this.layers.find(l => l.id === layerId);
    if (layer) {
      layer.muted = !layer.muted;
      
      if (this.isPlaying) {
        this.stop();
        this.play();
      }
      
      return layer.muted;
    }
    return false;
  }

  // Solo camada
  toggleSolo(layerId) {
    const layer = this.layers.find(l => l.id === layerId);
    if (layer) {
      layer.solo = !layer.solo;
      
      // Se ativou solo, mutar todas as outras
      if (layer.solo) {
        this.layers.forEach(l => {
          if (l.id !== layerId) {
            l.muted = true;
          }
        });
      } else {
        // Se desativou solo, desmutar todas
        this.layers.forEach(l => {
          l.muted = false;
        });
      }
      
      if (this.isPlaying) {
        this.stop();
        this.play();
      }
      
      return layer.solo;
    }
    return false;
  }

  // Ajustar volume de camada
  setLayerVolume(layerId, volume) {
    const layer = this.layers.find(l => l.id === layerId);
    if (layer) {
      layer.volume = Math.max(0, Math.min(1, volume));
      
      if (this.isPlaying) {
        this.stop();
        this.play();
      }
      
      return true;
    }
    return false;
  }

  // Exportar loop como WAV
  async exportWAV() {
    if (this.layers.length === 0) return null;
    
    // Criar buffer offline para mixar todas as camadas
    const offlineContext = new OfflineAudioContext(
      2, // stereo
      this.audioContext.sampleRate * this.loopDuration,
      this.audioContext.sampleRate
    );
    
    // Adicionar todas as camadas não mutadas
    this.layers.forEach(layer => {
      if (layer.muted) return;
      
      const source = offlineContext.createBufferSource();
      const gainNode = offlineContext.createGain();
      
      source.buffer = layer.buffer;
      gainNode.gain.value = layer.volume;
      
      source.connect(gainNode);
      gainNode.connect(offlineContext.destination);
      
      source.start(0);
    });
    
    // Renderizar
    const renderedBuffer = await offlineContext.startRendering();
    
    // Converter para WAV
    const wav = this.audioBufferToWav(renderedBuffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    
    return blob;
  }

  // Converter AudioBuffer para WAV
  audioBufferToWav(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    
    const data = [];
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i];
        const s = Math.max(-1, Math.min(1, sample));
        data.push(s < 0 ? s * 0x8000 : s * 0x7FFF);
      }
    }
    
    const dataLength = data.length * bytesPerSample;
    const arrayBuffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(arrayBuffer);
    
    // WAV header
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);
    
    // Write data
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
      view.setInt16(offset, data[i], true);
      offset += 2;
    }
    
    return arrayBuffer;
  }

  // Setters
  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(300, bpm));
    this.calculateLoopDuration();
  }

  setBars(bars) {
    this.bars = Math.max(1, Math.min(16, bars));
    this.calculateLoopDuration();
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    
    if (this.isPlaying) {
      this.stop();
      this.play();
    }
  }

  // Getters
  getIsRecording() {
    return this.isRecording;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getIsOverdubbing() {
    return this.isOverdubbing;
  }

  getLayers() {
    return this.layers;
  }

  getLayerCount() {
    return this.layers.length;
  }

  getLoopDuration() {
    return this.loopDuration;
  }

  getBPM() {
    return this.bpm;
  }

  getBars() {
    return this.bars;
  }

  getVolume() {
    return this.volume;
  }
}

// Instância global
export const looperEngine = new LooperEngine();
export default looperEngine;

