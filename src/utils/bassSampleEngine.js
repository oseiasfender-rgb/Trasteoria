/**
 * BassSampleEngine - Gerenciador de samples de baixo
 * 
 * Responsabilidades:
 * - Carregar samples de baixo (B0 a G2)
 * - Reproduzir notas individuais
 * - Reproduzir linhas de baixo (root, walking, melodic)
 * - Suporte a diferentes estilos (fingerstyle, slap, pick)
 */

import { sampleEngine } from './sampleEngine.js';

class BassSampleEngine {
  constructor() {
    this.currentKit = null;
    this.kits = new Map();
    this.styles = ['fingerstyle', 'slap', 'pick'];
    this.modes = ['root', 'walking', 'melodic'];
    
    // Notas de baixo: B0 (30.87 Hz) a G2 (98.00 Hz)
    // Total: 36 notas (3 oitavas)
    this.notes = this.generateNotes();
    this.noteMap = this.createNoteMap();
  }

  /**
   * Gerar lista de notas de baixo
   * B0, C1, C#1, D1, D#1, E1, F1, F#1, G1, G#1, A1, A#1, B1,
   * C2, C#2, D2, D#2, E2, F2, F#2, G2
   */
  generateNotes() {
    const notes = [];
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Começar em B0 (índice 11 da oitava 0)
    for (let octave = 0; octave <= 2; octave++) {
      for (let i = 0; i < noteNames.length; i++) {
        const noteName = `${noteNames[i]}${octave}`;
        
        // Começar em B0
        if (octave === 0 && i < 11) continue;
        
        // Parar em G2
        if (octave === 2 && i > 7) continue;
        
        notes.push({
          name: noteName,
          octave,
          index: i,
          frequency: this.noteToFrequency(i, octave)
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
    // Fórmula: f = 440 * 2^((n - 48) / 12)
    // Onde n é o número da nota (0-127)
    
    const noteNumber = (octave + 1) * 12 + noteIndex;
    const semitones = noteNumber - 57; // 57 = A4
    return 440 * Math.pow(2, semitones / 12);
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
   * Carregar kit de baixo
   * @param {string} style - Estilo de baixo ('electric', 'acoustic', 'synth')
   */
  async loadBassKit(style = 'electric') {
    try {
      const kit = {
        name: style,
        samples: {}
      };

      // URLs base dos samples
      const baseUrl = `/samples/bass/${style}`;

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
   * Reproduzir nota de baixo
   * @param {string} note - Nome da nota (e.g., 'C1', 'G2')
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
   * Reproduzir linha de baixo
   * @param {array} notes - Array de notas
   * @param {string} mode - Modo ('root', 'walking', 'melodic')
   * @param {number} bpm - BPM
   * @param {number} velocity - Velocidade (0-1)
   */
  async playBassLine(notes, mode = 'root', bpm = 120, velocity = 1.0) {
    if (!this.currentKit) {
      return;
    }

    try {
      // Calcular duração de cada nota baseado no BPM
      // 1 beat = 60 / BPM segundos
      const beatDuration = 60 / bpm;

      for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        
        // Calcular duração baseado no modo
        let noteDuration = beatDuration;
        
        switch (mode) {
          case 'walking':
            // Walking bass: 4 notas por compasso
            noteDuration = beatDuration;
            break;
          case 'melodic':
            // Melodic: duração variável
            noteDuration = beatDuration * (note.duration || 1);
            break;
          case 'root':
          default:
            // Root: nota por beat
            noteDuration = beatDuration;
            break;
        }

        // Agendar reprodução
        setTimeout(() => {
          this.playNote(note.name, noteDuration, velocity);
        }, i * beatDuration * 1000);
      }
    } catch (error) {
    }
  }

  /**
   * Gerar linha de baixo automática
   * @param {array} chordNotes - Notas do acorde
   * @param {string} mode - Modo ('root', 'walking', 'melodic')
   * @param {number} bars - Número de compassos
   * @returns {array} Notas geradas
   */
  generateBassLine(chordNotes, mode = 'root', bars = 1) {
    const bassLine = [];
    const rootNote = chordNotes[0];
    
    for (let bar = 0; bar < bars; bar++) {
      switch (mode) {
        case 'walking':
          // Walking bass: 4 notas por compasso
          bassLine.push({ name: rootNote, duration: 1 });
          bassLine.push({ name: chordNotes[1] || rootNote, duration: 1 });
          bassLine.push({ name: chordNotes[2] || rootNote, duration: 1 });
          bassLine.push({ name: rootNote, duration: 1 });
          break;
          
        case 'melodic':
          // Melodic: padrão mais interessante
          bassLine.push({ name: rootNote, duration: 2 });
          bassLine.push({ name: chordNotes[1] || rootNote, duration: 1 });
          bassLine.push({ name: chordNotes[2] || rootNote, duration: 1 });
          break;
          
        case 'root':
        default:
          // Root: apenas nota raiz
          bassLine.push({ name: rootNote, duration: 4 });
          break;
      }
    }
    
    return bassLine;
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
   * Obter lista de estilos disponíveis
   */
  getStyles() {
    return this.styles;
  }

  /**
   * Obter lista de modos disponíveis
   */
  getModes() {
    return this.modes;
  }

  /**
   * Verificar se nota existe
   */
  hasNote(name) {
    return this.noteMap.has(name);
  }
}

// Exportar singleton
export const bassSampleEngine = new BassSampleEngine();
export default BassSampleEngine;
