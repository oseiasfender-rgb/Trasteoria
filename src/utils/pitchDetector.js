/**
 * 🎸 Pitch Detector
 * Detecção de pitch (nota musical) em tempo real usando autocorrelação
 */

class PitchDetector {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.scriptProcessor = null;
    this.buffer = null;
    this.bufferSize = 4096;
    this.sampleRate = 44100;
    
    // Callbacks
    this.onPitchDetected = null;
    this.onVolumeChange = null;
    
    // Estado
    this.isRunning = false;
    this.lastPitch = null;
    this.lastVolume = 0;
    
    // Configurações
    this.minVolume = 0.01; // Volume mínimo para detectar
    this.minConfidence = 0.9; // Confiança mínima
    
    // Notas musicais
    this.noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  }
  
  /**
   * Inicializar e começar detecção
   */
  async start() {
    try {
      // Criar AudioContext
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.sampleRate = this.audioContext.sampleRate;
      
      // Solicitar acesso ao microfone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });
      
      // Criar nós de áudio
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.bufferSize;
      this.scriptProcessor = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1);
      
      // Conectar nós
      this.microphone.connect(this.analyser);
      this.analyser.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);
      
      // Buffer para dados
      this.buffer = new Float32Array(this.bufferSize);
      
      // Processar áudio
      this.scriptProcessor.onaudioprocess = (event) => {
        this.processAudio(event.inputBuffer.getChannelData(0));
      };
      
      this.isRunning = true;
      return true;
    } catch (error) {
      throw new Error('Não foi possível acessar o microfone');
    }
  }
  
  /**
   * Parar detecção
   */
  stop() {
    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }
    
    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }
    
    if (this.microphone) {
      this.microphone.disconnect();
      this.microphone.mediaStream.getTracks().forEach(track => track.stop());
      this.microphone = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.isRunning = false;
  }
  
  /**
   * Processar áudio
   */
  processAudio(buffer) {
    // Calcular volume (RMS)
    const volume = this.calculateRMS(buffer);
    this.lastVolume = volume;
    
    if (this.onVolumeChange) {
      this.onVolumeChange(volume);
    }
    
    // Só detectar pitch se volume for suficiente
    if (volume < this.minVolume) {
      return;
    }
    
    // Detectar pitch usando autocorrelação
    const pitch = this.detectPitch(buffer);
    
    if (pitch && pitch.confidence >= this.minConfidence) {
      this.lastPitch = pitch;
      
      if (this.onPitchDetected) {
        this.onPitchDetected(pitch);
      }
    }
  }
  
  /**
   * Calcular RMS (Root Mean Square) - volume
   */
  calculateRMS(buffer) {
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) {
      sum += buffer[i] * buffer[i];
    }
    return Math.sqrt(sum / buffer.length);
  }
  
  /**
   * Detectar pitch usando autocorrelação
   */
  detectPitch(buffer) {
    // Implementação do algoritmo de autocorrelação
    const SIZE = buffer.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);
    let best_offset = -1;
    let best_correlation = 0;
    let rms = 0;
    
    // Calcular RMS
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    
    // Não detectar se volume muito baixo
    if (rms < this.minVolume) {
      return null;
    }
    
    // Autocorrelação
    let lastCorrelation = 1;
    for (let offset = 1; offset < MAX_SAMPLES; offset++) {
      let correlation = 0;
      
      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs(buffer[i] - buffer[i + offset]);
      }
      
      correlation = 1 - (correlation / MAX_SAMPLES);
      
      if (correlation > 0.9 && correlation > lastCorrelation) {
        const foundGoodCorrelation = correlation > best_correlation;
        if (foundGoodCorrelation) {
          best_correlation = correlation;
          best_offset = offset;
        }
      }
      
      lastCorrelation = correlation;
    }
    
    if (best_correlation > 0.01 && best_offset !== -1) {
      const frequency = this.sampleRate / best_offset;
      const note = this.frequencyToNote(frequency);
      
      return {
        frequency: frequency,
        note: note.note,
        octave: note.octave,
        cents: note.cents,
        confidence: best_correlation
      };
    }
    
    return null;
  }
  
  /**
   * Converter frequência para nota musical
   */
  frequencyToNote(frequency) {
    // A4 = 440 Hz
    const A4 = 440;
    const C0 = A4 * Math.pow(2, -4.75); // C0 = ~16.35 Hz
    
    const halfSteps = 12 * Math.log2(frequency / C0);
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = Math.round(halfSteps % 12);
    const note = this.noteStrings[noteIndex];
    
    // Calcular cents (desvio da nota)
    const exactHalfSteps = 12 * Math.log2(frequency / C0);
    const cents = Math.round((exactHalfSteps - Math.round(exactHalfSteps)) * 100);
    
    return {
      note,
      octave,
      cents,
      frequency
    };
  }
  
  /**
   * Converter nota para frequência
   */
  noteToFrequency(note, octave) {
    const A4 = 440;
    const noteIndex = this.noteStrings.indexOf(note);
    const halfStepsFromA4 = (octave - 4) * 12 + (noteIndex - 9);
    return A4 * Math.pow(2, halfStepsFromA4 / 12);
  }
  
  /**
   * Obter último pitch detectado
   */
  getLastPitch() {
    return this.lastPitch;
  }
  
  /**
   * Obter último volume
   */
  getLastVolume() {
    return this.lastVolume;
  }
  
  /**
   * Verificar se está rodando
   */
  isActive() {
    return this.isRunning;
  }
}

export default PitchDetector;

