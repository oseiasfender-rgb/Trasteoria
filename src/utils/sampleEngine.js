/**
 * SampleEngine - Core para carregamento e reprodução de samples de áudio
 * 
 * Responsabilidades:
 * - Carregar samples de áudio (WAV, MP3)
 * - Cache de samples em memória
 * - Reprodução com controle de volume, playback rate, loop
 * - Suporte a múltiplas instâncias simultâneas
 * - Gerenciamento de AudioContext
 */

class SampleEngine {
  constructor() {
    // Inicializar AudioContext (lazy initialization)
    this.audioContext = null;
    this.sampleCache = new Map();
    this.activeVoices = [];
    this.masterVolume = 1.0;
    
    // Configurações
    this.maxVoices = 32;
    this.cacheLimit = 100 * 1024 * 1024; // 100 MB
    this.currentCacheSize = 0;
  }

  /**
   * Inicializar AudioContext (lazy)
   */
  async initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Resume AudioContext se necessário (browsers modernos)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    }
    return this.audioContext;
  }

  /**
   * Carregar sample de áudio
   * @param {string} url - URL do arquivo de áudio
   * @param {object} options - Opções de carregamento
   * @returns {Promise<AudioBuffer>}
   */
  async loadSample(url, options = {}) {
    const {
      cache = true,
      force = false
    } = options;

    // Verificar cache
    if (cache && this.sampleCache.has(url) && !force) {
      return this.sampleCache.get(url);
    }

    try {
      // Inicializar AudioContext se necessário
      const ctx = await this.initAudioContext();

      // Fazer download do arquivo
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      
      // Decodificar áudio
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      
      // Armazenar em cache
      if (cache) {
        const bufferSize = arrayBuffer.byteLength;
        
        // Verificar limite de cache
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

  /**
   * Reproduzir sample
   * @param {AudioBuffer} buffer - Buffer de áudio
   * @param {object} options - Opções de reprodução
   * @returns {object} Voice object com controles
   */
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
      // Limitar número de vozes simultâneas
      if (this.activeVoices.length >= this.maxVoices) {

        this.activeVoices[0].stop();
        this.activeVoices.shift();
      }

      const ctx = this.audioContext;
      const now = ctx.currentTime;

      // Criar nós de áudio
      const source = ctx.createBufferSource();
      const gainNode = ctx.createGain();
      const panNode = ctx.createStereoPanner();

      // Configurar source
      source.buffer = buffer;
      source.playbackRate.value = playbackRate;
      source.loop = loop;

      // Configurar volume e pan
      gainNode.gain.value = volume * this.masterVolume;
      panNode.pan.value = pan;

      // Conectar nós
      source.connect(gainNode);
      gainNode.connect(panNode);
      panNode.connect(ctx.destination);

      // Calcular duração
      let actualDuration = duration || buffer.duration;
      if (loop && !duration) {
        actualDuration = buffer.duration;
      }

      // Iniciar reprodução
      source.start(now + startTime, 0, actualDuration);

      // Parar após duração
      if (!loop) {
        source.stop(now + startTime + actualDuration);
      }

      // Criar voice object
      const voice = {
        source,
        gainNode,
        panNode,
        buffer,
        startTime: now + startTime,
        duration: actualDuration,
        isPlaying: true,
        
        // Controles
        stop: () => {
          try {
            source.stop();
            voice.isPlaying = false;
          } catch (e) {
            // Já foi parado
          }
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

      // Callback ao terminar
      if (onEnded) {
        source.onended = () => {
          voice.isPlaying = false;
          onEnded();
          this.activeVoices = this.activeVoices.filter(v => v !== voice);
        };
      } else {
        source.onended = () => {
          voice.isPlaying = false;
          this.activeVoices = this.activeVoices.filter(v => v !== voice);
        };
      }

      // Adicionar à lista de vozes ativas
      this.activeVoices.push(voice);

      return voice;
    } catch (error) {
      return null;
    }
  }

  /**
   * Parar todas as vozes ativas
   */
  stopAll() {
    this.activeVoices.forEach(voice => {
      try {
        voice.stop();
      } catch (e) {
        // Já foi parado
      }
    });
    this.activeVoices = [];
  }

  /**
   * Definir volume mestre
   * @param {number} volume - Volume (0-1)
   */
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Obter volume mestre
   */
  getMasterVolume() {
    return this.masterVolume;
  }

  /**
   * Limpar cache de samples
   */
  clearCache() {
    this.sampleCache.clear();
    this.currentCacheSize = 0;
  }

  /**
   * Remover sample específico do cache
   * @param {string} url - URL do sample
   */
  removeSampleFromCache(url) {
    if (this.sampleCache.has(url)) {
      const buffer = this.sampleCache.get(url);
      this.currentCacheSize -= buffer.length * buffer.numberOfChannels * 4; // 32-bit float
      this.sampleCache.delete(url);
    }
  }

  /**
   * Obter informações de cache
   */
  getCacheInfo() {
    return {
      size: this.currentCacheSize,
      limit: this.cacheLimit,
      samples: this.sampleCache.size,
      usage: `${(this.currentCacheSize / 1024 / 1024).toFixed(2)} MB / ${(this.cacheLimit / 1024 / 1024).toFixed(0)} MB`
    };
  }

  /**
   * Obter número de vozes ativas
   */
  getActiveVoices() {
    return this.activeVoices.length;
  }

  /**
   * Fechar AudioContext
   */
  async close() {
    this.stopAll();
    if (this.audioContext) {
      await this.audioContext.close();
      this.audioContext = null;
    }
    this.clearCache();
  }
}

// Exportar singleton
export const sampleEngine = new SampleEngine();
export default SampleEngine;
