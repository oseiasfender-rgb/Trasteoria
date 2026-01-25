/**
 * PianoSampleEngine - Gerenciador de samples de piano
 * 
 * Responsabilidades:
 * - Carregar samples de piano (A0 a C8)
 * - Reproduzir notas individuais
 * - Reproduzir acordes com voicings
 * - Suporte a diferentes articulações
 */

import { sampleEngine } from './sampleEngine.js';

class PianoSampleEngine {
  constructor() {
    this.currentKit = null;
    this.kits = new Map();
    
    // Notas de piano: A0 (27.50 Hz) a C8 (4186.01 Hz)
    // Total: 88 notas (padrão de piano)
    this.notes = this.generateNotes();
    this.noteMap = this.createNoteMap();
    
    // Voicings de acordes
    this.voicings = this.generateVoicings();
  }

  /**
   * Gerar lista de notas de piano (88 notas)
   * A0 a C8
   */
  generateNotes() {
    const notes = [];
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Começar em A0 (índice 9)
    for (let octave = 0; octave <= 8; octave++) {
      for (let i = 0; i < noteNames.length; i++) {
        const noteName = `${noteNames[i]}${octave}`;
        
        // Começar em A0
        if (octave === 0 && i < 9) continue;
        
        // Parar em C8
        if (octave === 8 && i > 0) continue;
        
        notes.push({
          name: noteName,
          octave,
          index: i,
          frequency: this.noteToFrequency(i, octave),
          midiNote: this.noteToMidi(i, octave)
        });
      }
    }
    
    return notes;
  }

  /**
   * Converter nota para frequência
   */
  noteToFrequency(noteIndex, octave) {
    // A4 = 440 Hz
    const noteNumber = (octave + 1) * 12 + noteIndex;
    const semitones = noteNumber - 57; // 57 = A4
    return 440 * Math.pow(2, semitones / 12);
  }

  /**
   * Converter nota para MIDI
   */
  noteToMidi(noteIndex, octave) {
    // C-1 = 0, C0 = 12, A0 = 21, C8 = 108
    return (octave + 1) * 12 + noteIndex;
  }

  /**
   * Criar mapa de notas para acesso rápido
   */
  createNoteMap() {
    const map = new Map();
    this.notes.forEach(note => {
      map.set(note.name, note);
    });
    return map;
  }

  /**
   * Gerar voicings de acordes
   */
  generateVoicings() {
    return {
      major: [0, 4, 7],           // Tônica, terça maior, quinta
      minor: [0, 3, 7],           // Tônica, terça menor, quinta
      dominant7: [0, 4, 7, 10],   // Tônica, terça maior, quinta, sétima menor
      major7: [0, 4, 7, 11],      // Tônica, terça maior, quinta, sétima maior
      minor7: [0, 3, 7, 10],      // Tônica, terça menor, quinta, sétima menor
      minorMajor7: [0, 3, 7, 11], // Tônica, terça menor, quinta, sétima maior
      sus2: [0, 2, 7],            // Tônica, segunda, quinta
      sus4: [0, 5, 7],            // Tônica, quarta, quinta
      diminished: [0, 3, 6],      // Tônica, terça menor, quinta diminuta
      augmented: [0, 4, 8],       // Tônica, terça maior, quinta aumentada
      maj9: [0, 4, 7, 11, 14],    // Acorde com nona maior
      min9: [0, 3, 7, 10, 14],    // Acorde com nona menor
      dominant9: [0, 4, 7, 10, 14] // Acorde dominante com nona
    };
  }

  /**
   * Carregar kit de piano
   * @param {string} style - Estilo de piano ('acoustic', 'electric', 'grand')
   */
  async loadPiano(style = 'acoustic') {
    try {
      const kit = {
        name: style,
        samples: {}
      };

      // URLs base dos samples
      const baseUrl = `/samples/piano/${style}`;

      // Carregar samples para cada nota
      for (const note of this.notes) {
        try {
          const url = `${baseUrl}/${note.name}.wav`;
          kit.samples[note.name] = await sampleEngine.loadSample(url);
        } catch (error) {
        }
      }

      this.currentKit = kit;
      this.kits.set(style, kit);
      
      return kit;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reproduzir nota de piano
   * @param {string} note - Nome da nota (e.g., 'C4', 'G5')
   * @param {number} duration - Duração em segundos
   * @param {number} velocity - Velocidade (0-1)
   * @param {object} options - Opções adicionais
   */
  playNote(note, duration = 1.0, velocity = 1.0, options = {}) {
    if (!this.currentKit || !this.currentKit.samples[note]) {
      return null;
    }

    const buffer = this.currentKit.samples[note];
    
    return sampleEngine.playSample(buffer, {
      volume: velocity,
      duration,
      ...options
    });
  }

  /**
   * Reproduzir acorde
   * @param {string} rootNote - Nota raiz (e.g., 'C4')
   * @param {string} chordType - Tipo de acorde ('major', 'minor', 'dominant7', etc.)
   * @param {number} duration - Duração em segundos
   * @param {number} velocity - Velocidade (0-1)
   * @param {number} spread - Espaçamento entre notas (em semitons)
   */
  playChord(rootNote, chordType = 'major', duration = 1.0, velocity = 1.0, spread = 12) {
    if (!this.noteMap.has(rootNote)) {
      return [];
    }

    const voicing = this.voicings[chordType];
    if (!voicing) {
      return [];
    }

    const rootMidi = this.noteMap.get(rootNote).midiNote;
    const voices = [];

    // Reproduzir cada nota do acorde
    for (const interval of voicing) {
      const noteMidi = rootMidi + interval;
      const noteName = this.midiToNote(noteMidi);

      if (this.noteMap.has(noteName)) {
        const voice = this.playNote(noteName, duration, velocity);
        if (voice) {
          voices.push(voice);
        }
      }
    }

    return voices;
  }

  /**
   * Reproduzir acorde com arpejo
   * @param {string} rootNote - Nota raiz
   * @param {string} chordType - Tipo de acorde
   * @param {number} bpm - BPM
   * @param {number} velocity - Velocidade
   */
  async playArpeggio(rootNote, chordType = 'major', bpm = 120, velocity = 1.0) {
    if (!this.noteMap.has(rootNote)) {
      return;
    }

    const voicing = this.voicings[chordType];
    if (!voicing) {
      return;
    }

    const rootMidi = this.noteMap.get(rootNote).midiNote;
    const noteDuration = 60 / bpm; // Duração de cada nota em segundos

    try {
      for (let i = 0; i < voicing.length; i++) {
        const interval = voicing[i];
        const noteMidi = rootMidi + interval;
        const noteName = this.midiToNote(noteMidi);

        if (this.noteMap.has(noteName)) {
          // Agendar reprodução
          setTimeout(() => {
            this.playNote(noteName, noteDuration * 0.8, velocity);
          }, i * noteDuration * 1000);
        }
      }
    } catch (error) {
    }
  }

  /**
   * Converter MIDI para nota
   */
  midiToNote(midiNote) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midiNote / 12) - 1;
    const noteIndex = midiNote % 12;
    return `${noteNames[noteIndex]}${octave}`;
  }

  /**
   * Obter lista de notas disponíveis
   */
  getNotes() {
    return this.notes;
  }

  /**
   * Obter nota por nome
   */
  getNote(name) {
    return this.noteMap.get(name);
  }

  /**
   * Obter tipos de acordes disponíveis
   */
  getChordTypes() {
    return Object.keys(this.voicings);
  }

  /**
   * Obter voicing de um acorde
   */
  getVoicing(chordType) {
    return this.voicings[chordType];
  }

  /**
   * Verificar se nota existe
   */
  hasNote(name) {
    return this.noteMap.has(name);
  }

  /**
   * Obter range de piano em MIDI
   */
  getMidiRange() {
    return {
      min: 21,  // A0
      max: 108  // C8
    };
  }
}

// Exportar singleton
export const pianoSampleEngine = new PianoSampleEngine();
export default PianoSampleEngine;
