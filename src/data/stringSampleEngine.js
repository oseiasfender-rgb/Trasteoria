/**
 * StringSampleEngine - Gerenciador de samples de instrumentos de corda
 * 
 * Responsabilidades:
 * - Carregar samples de instrumentos de corda
 * - Reproduzir notas com diferentes timbres de corda
 * - Suportar diferentes técnicas de arco (arco, pizzicato, tremolo, etc.)
 * - Gerenciar diferentes tipos de cordas
 * 
 * Instrumentos Suportados:
 * 1. Violino (violin) - Agudo, brilhante, expressivo
 * 2. Viola (viola) - Médio, quente, melancólico
 * 3. Violoncelo (cello) - Grave, profundo, cantante
 * 4. Contrabaixo (double_bass) - Muito grave, ressonante
 * 5. Violino Solista (solo_violin) - Expressivo, dramático
 * 6. Violino Ensemble (ensemble_violin) - Múltiplos violinos
 * 7. Cordas Orquestrais (orchestral_strings) - Seção completa de cordas
 */

import { sampleEngine } from './sampleEngine.js';

class StringSampleEngine {
  constructor() {
    this.currentTimbre = 'violin';
    this.currentTechnique = 'arco';
    this.currentKit = null;
    this.kits = new Map();
    
    // Notas de cordas: G2 (98 Hz) a E7 (2637 Hz)
    // Violino: G3 a E7
    // Viola: C3 a E6
    // Cello: C2 a E5
    // Contrabaixo: E1 a E4
    this.notes = this.generateNotes();
    this.noteMap = this.createNoteMap();
    
    // Voicings de acordes
    this.voicings = this.generateVoicings();
    
    // Definição de timbres
    this.timbres = this.defineTimbres();
    
    // Técnicas de arco
    this.techniques = this.defineTechniques();
    
    // Características de cada timbre
    this.timbreCharacteristics = this.defineTimbreCharacteristics();
  }

  /**
   * Definir timbres disponíveis de cordas
   */
  defineTimbres() {
    return {
      violin: {
        name: 'Violino',
        category: 'strings',
        description: 'Violino clássico - Agudo, brilhante, expressivo',
        range: { low: 'G3', high: 'E7' },
        characteristics: {
          brightness: 0.85,
          warmth: 0.6,
          vibrato: 0.7,
          sustain: 0.8
        },
        genres: ['clássico', 'jazz', 'folk', 'cinematic'],
        midiProgram: 40
      },
      viola: {
        name: 'Viola',
        category: 'strings',
        description: 'Viola clássica - Médio, quente, melancólico',
        range: { low: 'C3', high: 'E6' },
        characteristics: {
          brightness: 0.7,
          warmth: 0.8,
          vibrato: 0.6,
          sustain: 0.85
        },
        genres: ['clássico', 'jazz', 'folk', 'cinematic'],
        midiProgram: 41
      },
      cello: {
        name: 'Violoncelo',
        category: 'strings',
        description: 'Violoncelo clássico - Grave, profundo, cantante',
        range: { low: 'C2', high: 'E5' },
        characteristics: {
          brightness: 0.6,
          warmth: 0.9,
          vibrato: 0.8,
          sustain: 0.9
        },
        genres: ['clássico', 'jazz', 'folk', 'cinematic'],
        midiProgram: 42
      },
      double_bass: {
        name: 'Contrabaixo',
        category: 'strings',
        description: 'Contrabaixo clássico - Muito grave, ressonante',
        range: { low: 'E1', high: 'E4' },
        characteristics: {
          brightness: 0.5,
          warmth: 0.95,
          vibrato: 0.4,
          sustain: 0.95
        },
        genres: ['clássico', 'jazz', 'folk', 'cinematic'],
        midiProgram: 43
      },
      solo_violin: {
        name: 'Violino Solista',
        category: 'strings',
        description: 'Violino solista expressivo - Dramático, cantante',
        range: { low: 'G3', high: 'E7' },
        characteristics: {
          brightness: 0.9,
          warmth: 0.7,
          vibrato: 0.9,
          sustain: 0.85
        },
        genres: ['clássico', 'cinematic', 'folk', 'experimental'],
        midiProgram: 110
      },
      ensemble_violin: {
        name: 'Violinos Ensemble',
        category: 'strings',
        description: 'Múltiplos violinos - Orquestral, luso',
        range: { low: 'G3', high: 'E7' },
        characteristics: {
          brightness: 0.8,
          warmth: 0.65,
          vibrato: 0.6,
          sustain: 0.8
        },
        genres: ['clássico', 'cinematic', 'new age', 'ambient'],
        midiProgram: 111
      },
      orchestral_strings: {
        name: 'Cordas Orquestrais',
        category: 'strings',
        description: 'Seção completa de cordas - Luso, cinematográfico',
        range: { low: 'E1', high: 'E7' },
        characteristics: {
          brightness: 0.75,
          warmth: 0.8,
          vibrato: 0.7,
          sustain: 0.85
        },
        genres: ['clássico', 'cinematic', 'new age', 'ambient'],
        midiProgram: 48
      }
    };
  }

  /**
   * Definir técnicas de arco
   */
  defineTechniques() {
    return {
      arco: {
        name: 'Arco',
        description: 'Som clássico com arco',
        attack: 0.1,
        sustain: 0.9,
        release: 0.3
      },
      pizzicato: {
        name: 'Pizzicato',
        description: 'Som percussivo com dedos',
        attack: 0.02,
        sustain: 0.3,
        release: 0.1
      },
      tremolo: {
        name: 'Tremolo',
        description: 'Som tremulante com arco rápido',
        attack: 0.05,
        sustain: 0.8,
        release: 0.2
      },
      staccato: {
        name: 'Staccato',
        description: 'Notas curtas e separadas',
        attack: 0.03,
        sustain: 0.2,
        release: 0.1
      },
      legato: {
        name: 'Legato',
        description: 'Som suave e conectado',
        attack: 0.15,
        sustain: 0.95,
        release: 0.4
      },
      spiccato: {
        name: 'Spiccato',
        description: 'Arco saltitante',
        attack: 0.02,
        sustain: 0.25,
        release: 0.08
      }
    };
  }

  /**
   * Definir características de cada timbre
   */
  defineTimbreCharacteristics() {
    return {
      violin: {
        attack: 0.08,
        decay: 0.6,
        sustain: 0.8,
        release: 0.4,
        reverbAmount: 0.3,
        chorusAmount: 0.1
      },
      viola: {
        attack: 0.1,
        decay: 0.7,
        sustain: 0.85,
        release: 0.45,
        reverbAmount: 0.35,
        chorusAmount: 0.1
      },
      cello: {
        attack: 0.12,
        decay: 0.8,
        sustain: 0.9,
        release: 0.5,
        reverbAmount: 0.4,
        chorusAmount: 0.1
      },
      double_bass: {
        attack: 0.15,
        decay: 0.9,
        sustain: 0.95,
        release: 0.6,
        reverbAmount: 0.45,
        chorusAmount: 0.05
      },
      solo_violin: {
        attack: 0.1,
        decay: 0.65,
        sustain: 0.85,
        release: 0.45,
        reverbAmount: 0.35,
        chorusAmount: 0.15
      },
      ensemble_violin: {
        attack: 0.12,
        decay: 0.7,
        sustain: 0.8,
        release: 0.4,
        reverbAmount: 0.4,
        chorusAmount: 0.2
      },
      orchestral_strings: {
        attack: 0.15,
        decay: 0.75,
        sustain: 0.85,
        release: 0.5,
        reverbAmount: 0.5,
        chorusAmount: 0.15
      }
    };
  }

  /**
   * Gerar lista de notas de cordas
   * Violino: G3 a E7
   * Viola: C3 a E6
   * Cello: C2 a E5
   * Contrabaixo: E1 a E4
   */
  generateNotes() {
    const notes = [];
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Gerar todas as notas de E1 a E7
    for (let octave = 1; octave <= 7; octave++) {
      for (let i = 0; i < noteNames.length; i++) {
        const noteName = `${noteNames[i]}${octave}`;
        
        // Começar em E1
        if (octave === 1 && i < 4) continue;
        
        // Parar em E7
        if (octave === 7 && i > 4) continue;
        
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
    // C-1 = 0, C0 = 12, E1 = 28, E7 = 100
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
   * Obter técnicas disponíveis
   */
  getTechniques() {
    return Object.entries(this.techniques).map(([key, value]) => ({
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
   * Definir técnica atual
   */
  setTechnique(techniqueId) {
    if (!this.techniques[techniqueId]) {
      return false;
    }
    this.currentTechnique = techniqueId;
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
   * Obter técnica atual
   */
  getCurrentTechnique() {
    return {
      id: this.currentTechnique,
      ...this.techniques[this.currentTechnique]
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
  async loadTimbreKit(timbreId, techniqueId = 'arco') {
    if (!this.timbres[timbreId]) {
      throw new Error(`Timbre não encontrado: ${timbreId}`);
    }

    const kitKey = `${timbreId}_${techniqueId}`;

    // Verificar se já está carregado
    if (this.kits.has(kitKey)) {
      this.currentKit = this.kits.get(kitKey);
      return this.currentKit;
    }

    // Carregar samples
    const kit = new Map();
    for (const note of this.notes) {
      const samplePath = `/samples/strings/${timbreId}/${techniqueId}/${note.name}.wav`;
      try {
        const audioBuffer = await sampleEngine.loadSample(samplePath);
        kit.set(note.name, audioBuffer);
      } catch (err) {
      }
    }

    this.kits.set(kitKey, kit);
    this.currentKit = kit;
    return kit;
  }

  /**
   * Reproduzir nota individual
   */
  async playNote(noteName, timbreId = null, techniqueId = null, volume = 0.8, duration = 1.0) {
    const timbre = timbreId || this.currentTimbre;
    const technique = techniqueId || this.currentTechnique;
    
    // Carregar kit se necessário
    const kitKey = `${timbre}_${technique}`;
    if (!this.kits.has(kitKey)) {
      await this.loadTimbreKit(timbre, technique);
    }

    const kit = this.kits.get(kitKey);
    const audioBuffer = kit?.get(noteName);

    if (!audioBuffer) {
      `);
      return;
    }

    const characteristics = this.timbreCharacteristics[timbre];
    const technique_char = this.techniques[technique];
    
    const finalDuration = duration || technique_char.sustain;

    await sampleEngine.playSound(audioBuffer, {
      volume,
      duration: finalDuration,
      playbackRate: 1.0,
      pan: 0
    });
  }

  /**
   * Reproduzir acorde
   */
  async playChord(rootNote, chordType = 'major', timbreId = null, techniqueId = null, volume = 0.8, duration = 1.0) {
    const timbre = timbreId || this.currentTimbre;
    const technique = techniqueId || this.currentTechnique;
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
      this.playNote(note.name, timbre, technique, volume / chordNotes.length, duration)
    );

    await Promise.all(promises);
  }

  /**
   * Reproduzir arpejo
   */
  async playArpeggio(rootNote, chordType = 'major', timbreId = null, techniqueId = null, volume = 0.8, speed = 0.5) {
    const timbre = timbreId || this.currentTimbre;
    const technique = techniqueId || this.currentTechnique;
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
      await this.playNote(note.name, timbre, technique, volume, speed);
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
   * Obter informações sobre uma técnica
   */
  getTechniqueInfo(techniqueId) {
    const technique = this.techniques[techniqueId];
    if (!technique) return null;

    return {
      id: techniqueId,
      ...technique
    };
  }

  /**
   * Listar todas as categorias
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
export const stringSampleEngine = new StringSampleEngine();
export default stringSampleEngine;
