/**
 * 🎙️ Backing Track Recorder
 * Gravação de backing tracks com export MP3/WAV e visualização harmônica
 */

class BackingTrackRecorder {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;
    this.chordHistory = [];
    this.maxChordHistoryLength = 100;
    
    this.callbacks = {
      onRecordingStart: null,
      onRecordingStop: null,
      onChordChange: null,
      onVisualizationUpdate: null
    };
  }

  /**
   * Iniciar gravação
   */
  startRecording(stream) {
    if (this.isRecording) return;
    
    this.recordedChunks = [];
    this.chordHistory = [];
    
    try {
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      
      this.mediaRecorder.start();
      this.isRecording = true;
      
      if (this.callbacks.onRecordingStart) {
        this.callbacks.onRecordingStart();
      }
    } catch (e) {
      console.error('Erro ao iniciar gravação:', e);
    }
  }

  /**
   * Parar gravação
   */
  stopRecording() {
    if (!this.isRecording || !this.mediaRecorder) return;
    
    this.mediaRecorder.stop();
    this.isRecording = false;
    
    if (this.callbacks.onRecordingStop) {
      this.callbacks.onRecordingStop();
    }
    
    return this.getRecordedData();
  }

  /**
   * Obter dados gravados
   */
  getRecordedData() {
    return new Blob(this.recordedChunks, { type: 'audio/webm;codecs=opus' });
  }

  /**
   * Registrar mudança de acorde
   */
  recordChordChange(chord) {
    const entry = {
      timestamp: this.audioContext.currentTime,
      chord,
      confidence: chord.confidence || 0.8
    };
    
    this.chordHistory.push(entry);
    
    // Manter histórico limitado
    if (this.chordHistory.length > this.maxChordHistoryLength) {
      this.chordHistory.shift();
    }
    
    if (this.callbacks.onChordChange) {
      this.callbacks.onChordChange(chord);
    }
  }

  /**
   * Obter histórico de acordes
   */
  getChordHistory() {
    return this.chordHistory;
  }

  /**
   * Exportar como MP3
   */
  async exportAsMP3() {
    const blob = this.getRecordedData();
    return this.convertToMP3(blob);
  }

  /**
   * Exportar como WAV
   */
  async exportAsWAV() {
    const blob = this.getRecordedData();
    return this.convertToWAV(blob);
  }

  /**
   * Exportar histórico de acordes como JSON
   */
  exportChordHistory() {
    return JSON.stringify(this.chordHistory, null, 2);
  }

  /**
   * Converter para MP3 (simplificado)
   */
  async convertToMP3(blob) {
    // Em produção, usar uma biblioteca como lamejs ou enviar para servidor
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backing-track-${Date.now()}.mp3`;
    a.click();
    URL.revokeObjectURL(url);
    return blob;
  }

  /**
   * Converter para WAV (simplificado)
   */
  async convertToWAV(blob) {
    // Em produção, usar uma biblioteca como wav-encoder
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backing-track-${Date.now()}.wav`;
    a.click();
    URL.revokeObjectURL(url);
    return blob;
  }

  /**
   * Atualizar visualização harmônica
   */
  updateVisualization(analysisData) {
    if (this.callbacks.onVisualizationUpdate) {
      this.callbacks.onVisualizationUpdate({
        timestamp: this.audioContext.currentTime,
        data: analysisData,
        chordHistory: this.chordHistory.slice(-10) // Últimos 10 acordes
      });
    }
  }

  /**
   * Registrar callback
   */
  onRecordingStart(callback) {
    this.callbacks.onRecordingStart = callback;
  }

  /**
   * Registrar callback
   */
  onRecordingStop(callback) {
    this.callbacks.onRecordingStop = callback;
  }

  /**
   * Registrar callback
   */
  onChordChange(callback) {
    this.callbacks.onChordChange = callback;
  }

  /**
   * Registrar callback
   */
  onVisualizationUpdate(callback) {
    this.callbacks.onVisualizationUpdate = callback;
  }

  /**
   * Limpar histórico
   */
  clearHistory() {
    this.chordHistory = [];
  }
}

export default BackingTrackRecorder;
export { BackingTrackRecorder };
