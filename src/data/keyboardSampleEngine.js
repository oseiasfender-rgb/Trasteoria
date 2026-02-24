/**
 * KeyboardSampleEngine - Gerenciador de samples de teclados e sintetizadores
 * 
 * Responsabilidades:
 * - Carregar samples de múltiplos timbres de teclado
 * - Reproduzir notas com diferentes timbres
 * - Suportar 88 notas (A0 a C8)
 * - Gerenciar diferentes tipos de sintetizadores
 * 
 * Timbres Suportados:
 * 1. Piano Acústico (acoustic_piano)
 * 2. Piano Elétrico (electric_piano) - Fender Rhodes
 * 3. Órgão Hammond (hammond_organ)
 * 4. Sintetizador Analógico (analog_synth)
 * 5. Sintetizador Digital (digital_synth)
 * 6. Pad Sintetizado (synth_pad)
 * 7. Lead Sintetizado (synth_lead)
 * 8. Strings Sintetizadas (synth_strings)
 * 9. Vibraphone (vibraphone)
 * 10. Marimba (marimba)
 * 11. Xilofone (xylophone)
 * 12. Clavicórdio (harpsichord)
 */

import { sampleEngine } from './sampleEngine.js';

class KeyboardSampleEngine {
  constructor() {
    this.currentTimbre = 'acoustic_piano';
    this.currentKit = null;
    this.kits = new Map();
    
    // Notas de teclado: A0 (27.50 Hz) a C8 (4186.01 Hz)
    // Total: 88 notas (padrão de piano)
    this.notes = this.generateNotes();
    this.noteMap = this.createNoteMap();
    
    // Voicings de acordes
    this.voicings = this.generateVoicings();
    
    // Definição de timbres
    this.timbres = this.defineTimbres();
    
    // Características de cada timbre
    this.timbreCharacteristics = this.defineTimbreCharacteristics();
  }

  /**
   * Definir timbres disponíveis
   */
  defineTimbres() {
    return {
      acoustic_piano: {
        name: 'Piano Acústico',
        category: 'piano',
        description: 'Piano de cauda clássico',
        characteristics: {
          brightness: 0.6,
          decay: 0.8,
          resonance: 0.7,
          dynamics: 0.9
        },
        genres: ['clássico', 'jazz', 'pop', 'bossa'],
        midiProgram: 0
      },
      electric_piano: {
        name: 'Piano Elétrico',
        category: 'piano',
        description: 'Fender Rhodes - Clássico dos anos 70',
        characteristics: {
          brightness: 0.8,
          decay: 0.5,
          resonance: 0.4,
          dynamics: 0.6
        },
        genres: ['funk', 'soul', 'rock', 'jazz'],
        midiProgram: 4
      },
      hammond_organ: {
        name: 'Órgão Hammond',
        category: 'organ',
        description: 'Órgão Hammond B3 clássico',
        characteristics: {
          brightness: 0.9,
          decay: 0.1,
          resonance: 0.3,
          dynamics: 0.3
        },
        genres: ['soul', 'funk', 'rock', 'gospel'],
        midiProgram: 16
      },
      analog_synth: {
        name: 'Sintetizador Analógico',
        category: 'synth',
        description: 'Moog, Minimoog - Clássico dos anos 70',
        characteristics: {
          brightness: 0.7,
          decay: 0.6,
          resonance: 0.8,
          dynamics: 0.5
        },
        genres: ['eletrônico', 'synthwave', 'progressive', 'experimental'],
        midiProgram: 38
      },
      digital_synth: {
        name: 'Sintetizador Digital',
        category: 'synth',
        description: 'Yamaha DX7 - Clássico dos anos 80',
        characteristics: {
          brightness: 0.85,
          decay: 0.4,
          resonance: 0.5,
          dynamics: 0.4
        },
        genres: ['pop', 'new wave', 'synthpop', 'eletrônico'],
        midiProgram: 39
      },
      synth_pad: {
        name: 'Pad Sintetizado',
        category: 'synth',
        description: 'Pad longo e envolvente',
        characteristics: {
          brightness: 0.6,
          decay: 1.0,
          resonance: 0.9,
          dynamics: 0.2
        },
        genres: ['ambient', 'new age', 'cinematic', 'experimental'],
        midiProgram: 88
      },
      synth_lead: {
        name: 'Lead Sintetizado',
        category: 'synth',
        description: 'Lead agressivo e penetrante',
        characteristics: {
          brightness: 0.95,
          decay: 0.3,
          resonance: 0.7,
          dynamics: 0.8
        },
        genres: ['eletrônico', 'house', 'trance', 'progressive'],
        midiProgram: 87
      },
      synth_strings: {
        name: 'Strings Sintetizadas',
        category: 'synth',
        description: 'Orquestra sintetizada',
        characteristics: {
          brightness: 0.7,
          decay: 0.9,
          resonance: 0.8,
          dynamics: 0.7
        },
        genres: ['clássico', 'cinematic', 'new age', 'ambient'],
        midiProgram: 48
      },
      vibraphone: {
        name: 'Vibraphone',
        category: 'percussion',
        description: 'Vibrafone com vibrato',
        characteristics: {
          brightness: 0.85,
          decay: 0.4,
          resonance: 0.6,
          dynamics: 0.6
        },
        genres: ['jazz', 'pop', 'clássico', 'world'],
        midiProgram: 11
      },
      marimba: {
        name: 'Marimba',
        category: 'percussion',
        description: 'Marimba de madeira',
        characteristics: {
          brightness: 0.75,
          decay: 0.5,
          resonance: 0.4,
          dynamics: 0.7
        },
        genres: ['jazz', 'clássico', 'world', 'pop'],
        midiProgram: 12
      },
      xylophone: {
        name: 'Xilofone',
        category: 'percussion',
        description: 'Xilofone brilhante',
        characteristics: {
          brightness: 0.95,
          decay: 0.3,
          resonance: 0.3,
          dynamics: 0.8
        },
        genres: ['clássico', 'world', 'pop', 'children'],
        midiProgram: 13
      },
      harpsichord: {
        name: 'Clavicórdio',
        category: 'piano',
        description: 'Clavicórdio barroco',
        characteristics: {
          brightness: 0.9,
          decay: 0.2,
          resonance: 0.2,
          dynamics: 0.4
        },
        genres: ['clássico', 'barroco', 'renascença', 'experimental'],
        midiProgram: 6
      }
    };
  }

  /**
   * Definir características de cada timbre
   */
  defineTimbreCharacteristics() {
    return {
      acoustic_piano: {
        attack: 0.05,
        decay: 1.2,
        sustain: 0.8,
        release: 0.5,
        reverbAmount: 0.3,
        chorusAmount: 0.0
      },
      electric_piano: {
        attack: 0.02,
        decay: 0.8,
        sustain: 0.5,
        release: 0.3,
        reverbAmount: 0.2,
        chorusAmount: 0.4
      },
      hammond_organ: {
        attack: 0.01,
        decay: 0.1,
        sustain: 1.0,
        release: 0.1,
        reverbAmount: 0.4,
        chorusAmount: 0.6
      },
      analog_synth: {
        attack: 0.1,
        decay: 0.5,
        sustain: 0.7,
        release: 0.3,
        reverbAmount: 0.2,
        chorusAmount: 0.3
      },
      digital_synth: {
        attack: 0.05,
        decay: 0.4,
        sustain: 0.6,
        release: 0.2,
        reverbAmount: 0.1,
        chorusAmount: 0.5
      },
      synth_pad: {
        attack: 0.5,
        decay: 1.0,
        sustain: 0.9,
        release: 1.0,
        reverbAmount: 0.6,
        chorusAmount: 0.4
      },
      synth_lead: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.8,
        release: 0.2,
        reverbAmount: 0.1,
        chorusAmount: 0.2
      },
      synth_strings: {
        attack: 0.3,
        decay: 0.8,
        sustain: 0.85,
        release: 0.6,
        reverbAmount: 0.5,
        chorusAmount: 0.3
      },
      vibraphone: {
        attack: 0.02,
        decay: 0.6,
        sustain: 0.4,
        release: 0.3,
        reverbAmount: 0.3,
        chorusAmount: 0.0
      },
      marimba: {
        attack: 0.01,
        decay: 0.5,
        sustain: 0.2,
        release: 0.2,
        reverbAmount: 0.2,
        chorusAmount: 0.0
      },
      xylophone: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.1,
        release: 0.1,
        reverbAmount: 0.1,
        chorusAmount: 0.0
      },
      harpsichord: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.2,
        release: 0.1,
        reverbAmount: 0.1,
        chorusAmount: 0.0
      }
    };
  }

  /**
   * Gerar lista de notas de teclado (88 notas)
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
      major: [0, 4, 7],
      minor: [0, 3, 7],
      dominant7: [0, 4, 7, 10],
      major7: [0, 4, 7, 11],
      minor7: [0, 3, 7, 10],
      minorMajor7: [0, 3, 7, 11],
      sus2: [0, 2, 7],
      sus4: [0, 5, 7],
      diminished: [0, 3, 6],
      augmented: [0, 4, 8],
      maj9: [0, 4, 7, 11, 14],
      min9: [0, 3, 7, 10, 14],
      dominant9: [0, 4, 7, 10, 14]
    };
  }

  /**
   * Obter lista de timbres disponíveis
   */
  getTimbres() {
    return Object.entries(this.timbres).map(([key, value]) => ({
      id: key,
      ...value
    }));
  }

  /**
   * Obter timbres por categoria
   */
  getTimbresByCategory(category) {
    return Object.entries(this.timbres)
      .filter(([_, timbre]) => timbre.category === category)
      .map(([key, value]) => ({
        id: key,
        ...value
      }));
  }

  /**
   * Obter timbres por gênero
   */
  getTimbresByGenre(genre) {
    return Object.entries(this.timbres)
      .filter(([_, timbre]) => timbre.genres.includes(genre))
      .map(([key, value]) => ({
        id: key,
        ...value
      }));
  }

  /**
   * Definir timbre atual
   */
  setTimbre(timbreId) {
    if (!this.timbres[timbreId]) {
      return false;
    }
    this.currentTimbre = timbreId;
    return true;
  }

  /**
   * Obter timbre atual
   */
  getCurrentTimbre() {
    return {
      id: this.currentTimbre,
      ...this.timbres[this.currentTimbre]
    };
  }

  /**
   * Obter características do timbre atual
   */
  getTimbreCharacteristics() {
    return this.timbreCharacteristics[this.currentTimbre];
  }

  /**
   * Carregar kit de samples para um timbre
   */
  async loadTimbreKit(timbreId) {
    if (!this.timbres[timbreId]) {
      throw new Error(`Timbre não encontrado: ${timbreId}`);
    }

    // Verificar se já está carregado
    if (this.kits.has(timbreId)) {
      this.currentKit = this.kits.get(timbreId);
      return this.currentKit;
    }

    // Carregar samples
    const kit = new Map();
    for (const note of this.notes) {
      const samplePath = `/samples/keyboards/${timbreId}/${note.name}.wav`;
      try {
        const audioBuffer = await sampleEngine.loadSample(samplePath);
        kit.set(note.name, audioBuffer);
      } catch (err) {
      }
    }

    this.kits.set(timbreId, kit);
    this.currentKit = kit;
    return kit;
  }

  /**
   * Reproduzir nota individual
   */
  async playNote(noteName, timbreId = null, volume = 0.8, duration = 1.0) {
    const timbre = timbreId || this.currentTimbre;
    
    // Carregar kit se necessário
    if (!this.kits.has(timbre)) {
      await this.loadTimbreKit(timbre);
    }

    const kit = this.kits.get(timbre);
    const audioBuffer = kit.get(noteName);

    if (!audioBuffer) {
      `);
      return;
    }

    const characteristics = this.timbreCharacteristics[timbre];
    await sampleEngine.playSound(audioBuffer, {
      volume,
      duration: duration || characteristics.sustain,
      playbackRate: 1.0,
      pan: 0
    });
  }

  /**
   * Reproduzir acorde
   */
  async playChord(rootNote, chordType = 'major', timbreId = null, volume = 0.8, duration = 1.0) {
    const timbre = timbreId || this.currentTimbre;
    const voicing = this.voicings[chordType];

    if (!voicing) {
      return;
    }

    const rootNoteObj = this.noteMap.get(rootNote);
    if (!rootNoteObj) {
      return;
    }

    // Obter notas do acorde
    const chordNotes = voicing.map(interval => {
      const noteIndex = this.notes.indexOf(rootNoteObj) + interval;
      return this.notes[noteIndex];
    }).filter(note => note !== undefined);

    // Reproduzir todas as notas simultaneamente
    const promises = chordNotes.map(note =>
      this.playNote(note.name, timbre, volume / chordNotes.length, duration)
    );

    await Promise.all(promises);
  }

  /**
   * Reproduzir arpejo
   */
  async playArpeggio(rootNote, chordType = 'major', timbreId = null, volume = 0.8, speed = 0.5) {
    const timbre = timbreId || this.currentTimbre;
    const voicing = this.voicings[chordType];

    if (!voicing) {
      return;
    }

    const rootNoteObj = this.noteMap.get(rootNote);
    if (!rootNoteObj) {
      return;
    }

    // Obter notas do acorde
    const chordNotes = voicing.map(interval => {
      const noteIndex = this.notes.indexOf(rootNoteObj) + interval;
      return this.notes[noteIndex];
    }).filter(note => note !== undefined);

    // Reproduzir notas uma por uma
    for (const note of chordNotes) {
      await this.playNote(note.name, timbre, volume, speed);
      await new Promise(resolve => setTimeout(resolve, speed * 1000));
    }
  }

  /**
   * Obter informações sobre um timbre
   */
  getTimbreInfo(timbreId) {
    const timbre = this.timbres[timbreId];
    if (!timbre) return null;

    return {
      id: timbreId,
      ...timbre,
      characteristics: this.timbreCharacteristics[timbreId]
    };
  }

  /**
   * Listar todas as categorias de timbres
   */
  getCategories() {
    const categories = new Set();
    Object.values(this.timbres).forEach(timbre => {
      categories.add(timbre.category);
    });
    return Array.from(categories);
  }

  /**
   * Listar todos os gêneros
   */
  getGenres() {
    const genres = new Set();
    Object.values(this.timbres).forEach(timbre => {
      timbre.genres.forEach(genre => genres.add(genre));
    });
    return Array.from(genres);
  }

  /**
   * Obter recomendações de timbres para um gênero
   */
  recommendTimbresForGenre(genre) {
    return this.getTimbresByGenre(genre);
  }

  /**
   * Parar todos os sons
   */
  stopAll() {
    sampleEngine.stopAll();
  }
}

// Exportar singleton
export const keyboardSampleEngine = new KeyboardSampleEngine();
export default keyboardSampleEngine;
