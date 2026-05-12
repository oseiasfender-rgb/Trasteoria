/**
 * 🎵 Polyphonic Chord Detector
 * Detecção de acordes em tempo real via FFT e análise harmônica
 */

class PolyphonicChordDetector {
  constructor(audioContext, onChordDetected = null, onAnalysisUpdate = null) {
    this.audioContext = audioContext;
    this.onChordDetected = onChordDetected;
    this.onAnalysisUpdate = onAnalysisUpdate;
    
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 4096;
    this.analyser.smoothingTimeConstant = 0.8;
    
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.isAnalyzing = false;
    this.confidenceThreshold = 0.6;
    
    // Notas MIDI
    this.noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    this.chordDatabase = this.initChordDatabase();
  }

  /**
   * Inicializar banco de dados de acordes
   */
  initChordDatabase() {
    return {
      'major': [0, 4, 7],
      'minor': [0, 3, 7],
      'diminished': [0, 3, 6],
      'augmented': [0, 4, 8],
      'dominant7': [0, 4, 7, 10],
      'major7': [0, 4, 7, 11],
      'minor7': [0, 3, 7, 10],
      'sus2': [0, 2, 7],
      'sus4': [0, 5, 7]
    };
  }

  /**
   * Conectar stream de áudio
   */
  connectAudioStream(source) {
    source.connect(this.analyser);
  }

  /**
   * Iniciar análise
   */
  startAnalysis() {
    this.isAnalyzing = true;
    this.analyze();
  }

  /**
   * Parar análise
   */
  stopAnalysis() {
    this.isAnalyzing = false;
  }

  /**
   * Analisar áudio em tempo real
   */
  analyze() {
    if (!this.isAnalyzing) return;
    
    this.analyser.getByteFrequencyData(this.dataArray);
    
    // Detectar picos de frequência
    const peaks = this.detectPeaks();
    
    // Converter picos para notas MIDI
    const notes = peaks.map(peak => this.frequencyToNote(peak.frequency));
    
    // Identificar acorde
    const chord = this.identifyChord(notes);
    
    if (this.onAnalysisUpdate) {
      this.onAnalysisUpdate({
        peaks,
        notes,
        chord
      });
    }
    
    if (chord && chord.confidence >= this.confidenceThreshold) {
      if (this.onChordDetected) {
        this.onChordDetected(chord);
      }
    }
    
    requestAnimationFrame(() => this.analyze());
  }

  /**
   * Detectar picos de frequência
   */
  detectPeaks(threshold = 30) {
    const peaks = [];
    const nyquist = this.audioContext.sampleRate / 2;
    const binWidth = nyquist / this.dataArray.length;
    
    for (let i = 1; i < this.dataArray.length - 1; i++) {
      const current = this.dataArray[i];
      const prev = this.dataArray[i - 1];
      const next = this.dataArray[i + 1];
      
      if (current > threshold && current > prev && current > next) {
        const frequency = i * binWidth;
        
        // Filtrar frequências muito baixas ou muito altas
        if (frequency > 50 && frequency < 2000) {
          peaks.push({
            frequency,
            magnitude: current
          });
        }
      }
    }
    
    // Retornar top 5 picos
    return peaks.sort((a, b) => b.magnitude - a.magnitude).slice(0, 5);
  }

  /**
   * Converter frequência para nota MIDI
   */
  frequencyToNote(frequency) {
    // A4 = 440 Hz, MIDI note 69
    const a4 = 440;
    const c0 = a4 * Math.pow(2, -4.75);
    const h = 12 * Math.log2(frequency / c0);
    const octave = Math.floor(h / 12);
    const noteIndex = Math.round(h % 12);
    
    return {
      note: this.noteNames[noteIndex],
      octave,
      frequency,
      midiNote: Math.round(h) + 12
    };
  }

  /**
   * Identificar acorde
   */
  identifyChord(notes) {
    if (notes.length < 2) return null;
    
    // Normalizar notas para semitones relativos à nota mais baixa
    const baseNote = notes[0].midiNote % 12;
    const intervals = notes.map(n => (n.midiNote % 12 - baseNote + 12) % 12);
    
    // Procurar correspondência no banco de dados
    let bestMatch = null;
    let bestScore = 0;
    
    for (const [chordType, chordIntervals] of Object.entries(this.chordDatabase)) {
      let score = 0;
      
      for (const interval of chordIntervals) {
        if (intervals.includes(interval)) {
          score++;
        }
      }
      
      const confidence = score / Math.max(chordIntervals.length, intervals.length);
      
      if (confidence > bestScore) {
        bestScore = confidence;
        bestMatch = {
          root: notes[0].note,
          type: chordType,
          confidence,
          notes: notes.slice(0, 3)
        };
      }
    }
    
    return bestMatch;
  }

  /**
   * Buscar nota por enarmonia
   */
  findNoteByEnharmony(note, targetNote) {
    const enharmonicMap = {
      'C#': 'Db',
      'D#': 'Eb',
      'F#': 'Gb',
      'G#': 'Ab',
      'A#': 'Bb'
    };
    
    return note === targetNote || enharmonicMap[note] === targetNote;
  }

  /**
   * Ajustar threshold de confiança
   */
  setConfidenceThreshold(threshold) {
    this.confidenceThreshold = Math.max(0, Math.min(1, threshold));
  }
}

export default PolyphonicChordDetector;
export { PolyphonicChordDetector };
