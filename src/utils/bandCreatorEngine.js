/**
 * 🎵 Band Creator Engine
 * Coordena todos os engines profissionais para criar backing tracks completas
 * Inspirado em DigiTech TRIO+, iReal Pro e Band-in-a-Box
 */

import DrumEngineV2 from './drumEngineV2';
import ProfessionalBassEngine from './professionalBassEngine';
import ProfessionalPianoEngine from './professionalPianoEngine';
import { bandCreatorData } from '../data/bandCreatorData';

class BandCreatorEngine {
  constructor() {
    this.audioContext = null;
    this.drumEngine = null;
    this.bassEngine = null;
    this.pianoEngine = null;
    
    // Estado
    this.isPlaying = false;
    this.currentGenre = 'rock';
    this.currentStyle = 1;
    this.bpm = 120;
    this.currentChord = null;
    this.chordProgression = [];
    this.currentChordIndex = 0;
    
    // Mixer
    this.mixer = {
      drums: { volume: 0.85, mute: false },
      bass: { volume: 0.70, mute: false },
      keys: { volume: 0.60, mute: false },
      loop: { volume: 0.80, mute: false }
    };
    
    // Bass mode
    this.bassMode = 'root'; // 'root', 'walking', 'melodic'
    
    // Intervals
    this.drumInterval = null;
    this.bassInterval = null;
    this.pianoInterval = null;
    this.chordChangeInterval = null;
  }

  /**
   * Inicializar engines
   */
  async init() {
    if (this.audioContext) return;
    
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Inicializar engines
    this.drumEngine = new DrumEngineV2();
    await this.drumEngine.ensureContext();
    
    this.bassEngine = new ProfessionalBassEngine(this.audioContext);
    this.pianoEngine = new ProfessionalPianoEngine(this.audioContext);
    
    // Aplicar volumes iniciais
    this.updateMixer();
  }

  /**
   * Tocar backing track completa
   */
  async play(genreId, styleId, bpm = 120, chordProgression = null) {
    await this.init();
    
    if (this.isPlaying) {
      this.stop();
    }
    
    this.currentGenre = genreId;
    this.currentStyle = styleId;
    this.bpm = bpm;
    this.isPlaying = true;
    
    // Definir progressão de acordes (se não fornecida, usar default)
    this.chordProgression = chordProgression || this.getDefaultChordProgression(genreId);
    this.currentChordIndex = 0;
    this.currentChord = this.chordProgression[0];
    
    // Iniciar engines
    this.startDrums();
    this.startBass();
    this.startPiano();
    this.startChordChanges();
  }

  /**
   * Iniciar bateria
   */
  startDrums() {
    if (!this.mixer.drums.mute) {
      this.drumEngine.playPattern(this.currentGenre, this.currentStyle, this.bpm);
    }
  }

  /**
   * Iniciar baixo
   */
  startBass() {
    if (!this.mixer.bass.mute && this.currentChord) {
      const beatDuration = (60 / this.bpm) * 1000; // ms
      
      // Tocar baixo baseado no modo
      const playBassNote = () => {
        if (!this.isPlaying || this.mixer.bass.mute) return;
        
        const style = this.getBassStyle(this.currentGenre);
        
        switch (this.bassMode) {
          case 'root':
            // Tocar fundamental nos tempos 1 e 3
            this.bassEngine.playNote(this.currentChord.root, 1, style, beatDuration * 0.9 / 1000, 0.8);
            setTimeout(() => {
              if (this.isPlaying && !this.mixer.bass.mute) {
                this.bassEngine.playNote(this.currentChord.root, 1, style, beatDuration * 0.9 / 1000, 0.8);
              }
            }, beatDuration * 2);
            break;
            
          case 'walking':
            // Walking bass (4 notas por compasso)
            const walkingNotes = this.generateWalkingBass(this.currentChord);
            walkingNotes.forEach((note, index) => {
              setTimeout(() => {
                if (this.isPlaying && !this.mixer.bass.mute) {
                  this.bassEngine.playNote(note.note, note.octave, style, beatDuration * 0.9 / 1000, 0.7);
                }
              }, beatDuration * index);
            });
            break;
            
          case 'melodic':
            // Linha melódica (mais variada)
            const melodicNotes = this.generateMelodicBass(this.currentChord);
            melodicNotes.forEach((note, index) => {
              setTimeout(() => {
                if (this.isPlaying && !this.mixer.bass.mute) {
                  this.bassEngine.playNote(note.note, note.octave, style, note.duration, note.velocity);
                }
              }, note.time);
            });
            break;
        }
      };
      
      // Tocar imediatamente e depois a cada 4 beats
      playBassNote();
      this.bassInterval = setInterval(playBassNote, beatDuration * 4);
    }
  }

  /**
   * Iniciar piano
   */
  startPiano() {
    if (!this.mixer.keys.mute && this.currentChord) {
      const beatDuration = (60 / this.bpm) * 1000; // ms
      
      const playPianoChord = () => {
        if (!this.isPlaying || this.mixer.keys.mute) return;
        
        const voicing = this.getPianoVoicing(this.currentChord, this.currentGenre);
        const duration = beatDuration * 4 / 1000; // 4 beats
        
        this.pianoEngine.playChord(voicing, duration, 0.6);
      };
      
      // Tocar imediatamente e depois a cada 4 beats
      playPianoChord();
      this.pianoInterval = setInterval(playPianoChord, beatDuration * 4);
    }
  }

  /**
   * Iniciar mudanças de acorde
   */
  startChordChanges() {
    const beatDuration = (60 / this.bpm) * 1000; // ms
    const chordDuration = beatDuration * 4; // 4 beats por acorde
    
    this.chordChangeInterval = setInterval(() => {
      if (!this.isPlaying) return;
      
      // Avançar para próximo acorde
      this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;
      this.currentChord = this.chordProgression[this.currentChordIndex];
    }, chordDuration);
  }

  /**
   * Parar tudo
   */
  stop() {
    this.isPlaying = false;
    
    // Parar engines
    if (this.drumEngine) {
      this.drumEngine.stop();
    }
    if (this.bassEngine) {
      this.bassEngine.stopAll();
    }
    if (this.pianoEngine) {
      this.pianoEngine.stopAll();
    }
    
    // Limpar intervals
    if (this.drumInterval) {
      clearInterval(this.drumInterval);
      this.drumInterval = null;
    }
    if (this.bassInterval) {
      clearInterval(this.bassInterval);
      this.bassInterval = null;
    }
    if (this.pianoInterval) {
      clearInterval(this.pianoInterval);
      this.pianoInterval = null;
    }
    if (this.chordChangeInterval) {
      clearInterval(this.chordChangeInterval);
      this.chordChangeInterval = null;
    }
  }

  /**
   * Atualizar mixer
   */
  updateMixer() {
    if (this.drumEngine) {
      this.drumEngine.setVolume(this.mixer.drums.volume);
    }
    if (this.bassEngine) {
      this.bassEngine.setVolume(this.mixer.bass.volume);
    }
    if (this.pianoEngine) {
      this.pianoEngine.setVolume(this.mixer.keys.volume);
    }
  }

  /**
   * Ajustar volume de canal
   */
  setChannelVolume(channel, volume) {
    if (this.mixer[channel]) {
      this.mixer[channel].volume = Math.max(0, Math.min(1, volume));
      this.updateMixer();
    }
  }

  /**
   * Mute/Unmute canal
   */
  toggleChannelMute(channel) {
    if (this.mixer[channel]) {
      this.mixer[channel].mute = !this.mixer[channel].mute;
      
      // Se estiver tocando, reiniciar canal
      if (this.isPlaying) {
        if (channel === 'drums') {
          if (this.mixer.drums.mute) {
            this.drumEngine.stop();
          } else {
            this.startDrums();
          }
        }
      }
    }
  }

  /**
   * Ajustar BPM
   */
  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(240, bpm));
    
    if (this.isPlaying) {
      // Reiniciar com novo BPM
      const wasPlaying = this.isPlaying;
      const currentGenre = this.currentGenre;
      const currentStyle = this.currentStyle;
      const currentProgression = this.chordProgression;
      
      this.stop();
      
      if (wasPlaying) {
        setTimeout(() => {
          this.play(currentGenre, currentStyle, this.bpm, currentProgression);
        }, 100);
      }
    }
    
    if (this.drumEngine) {
      this.drumEngine.setBPM(this.bpm);
    }
  }

  /**
   * Ajustar modo do baixo
   */
  setBassMode(mode) {
    if (['root', 'walking', 'melodic'].includes(mode)) {
      this.bassMode = mode;
      
      // Se estiver tocando, reiniciar baixo
      if (this.isPlaying && !this.mixer.bass.mute) {
        if (this.bassInterval) {
          clearInterval(this.bassInterval);
        }
        this.startBass();
      }
    }
  }

  /**
   * Obter estilo de baixo baseado no gênero
   */
  getBassStyle(genreId) {
    const electronicGenres = ['e_pop', 'hip_hop'];
    const slapGenres = ['funk'];
    
    if (electronicGenres.includes(genreId)) {
      return 'pick';
    } else if (slapGenres.includes(genreId)) {
      return 'slap';
    } else {
      return 'fingerstyle';
    }
  }

  /**
   * Gerar walking bass
   */
  generateWalkingBass(chord) {
    // Simplificado: root, 3rd, 5th, approach
    return [
      { note: chord.root, octave: 1 },
      { note: chord.third || this.getThird(chord.root, chord.quality), octave: 1 },
      { note: chord.fifth || this.getFifth(chord.root), octave: 1 },
      { note: chord.root, octave: 1 }
    ];
  }

  /**
   * Gerar linha melódica de baixo
   */
  generateMelodicBass(chord) {
    const beatDuration = (60 / this.bpm) * 1000;
    
    return [
      { note: chord.root, octave: 1, duration: 0.4, velocity: 0.8, time: 0 },
      { note: chord.fifth || this.getFifth(chord.root), octave: 1, duration: 0.3, velocity: 0.6, time: beatDuration * 1.5 },
      { note: chord.third || this.getThird(chord.root, chord.quality), octave: 1, duration: 0.3, velocity: 0.7, time: beatDuration * 2.5 },
      { note: chord.root, octave: 1, duration: 0.4, velocity: 0.8, time: beatDuration * 3.5 }
    ];
  }

  /**
   * Obter voicing de piano baseado no gênero
   */
  getPianoVoicing(chord, genreId) {
    const jazzGenres = ['jazz'];
    const voicingType = jazzGenres.includes(genreId) ? 'rootless' : 'close';
    
    // Construir voicing
    const notes = [
      { note: chord.root, octave: 3 },
      { note: chord.third || this.getThird(chord.root, chord.quality), octave: 3 },
      { note: chord.fifth || this.getFifth(chord.root), octave: 3 }
    ];
    
    if (chord.seventh) {
      notes.push({ note: chord.seventh, octave: 3 });
    }
    
    return notes;
  }

  /**
   * Obter terça do acorde
   */
  getThird(root, quality = 'major') {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    
    if (rootIndex === -1) return 'E';
    
    const interval = quality === 'minor' ? 3 : 4; // Semitones
    return notes[(rootIndex + interval) % 12];
  }

  /**
   * Obter quinta do acorde
   */
  getFifth(root) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);
    
    if (rootIndex === -1) return 'G';
    
    return notes[(rootIndex + 7) % 12]; // 7 semitones = quinta justa
  }

  /**
   * Obter progressão de acordes default baseada no gênero
   */
  getDefaultChordProgression(genreId) {
    const progressions = {
      'rock': [
        { root: 'C', quality: 'major', third: 'E', fifth: 'G' },
        { root: 'G', quality: 'major', third: 'B', fifth: 'D' },
        { root: 'A', quality: 'minor', third: 'C', fifth: 'E' },
        { root: 'F', quality: 'major', third: 'A', fifth: 'C' }
      ],
      'blues': [
        { root: 'A', quality: 'dominant7', third: 'C#', fifth: 'E', seventh: 'G' },
        { root: 'D', quality: 'dominant7', third: 'F#', fifth: 'A', seventh: 'C' },
        { root: 'A', quality: 'dominant7', third: 'C#', fifth: 'E', seventh: 'G' },
        { root: 'E', quality: 'dominant7', third: 'G#', fifth: 'B', seventh: 'D' }
      ],
      'jazz': [
        { root: 'C', quality: 'major7', third: 'E', fifth: 'G', seventh: 'B' },
        { root: 'A', quality: 'minor7', third: 'C', fifth: 'E', seventh: 'G' },
        { root: 'D', quality: 'minor7', third: 'F', fifth: 'A', seventh: 'C' },
        { root: 'G', quality: 'dominant7', third: 'B', fifth: 'D', seventh: 'F' }
      ],
      'pop': [
        { root: 'C', quality: 'major', third: 'E', fifth: 'G' },
        { root: 'G', quality: 'major', third: 'B', fifth: 'D' },
        { root: 'A', quality: 'minor', third: 'C', fifth: 'E' },
        { root: 'F', quality: 'major', third: 'A', fifth: 'C' }
      ]
    };
    
    // Retornar progressão específica ou default (I-V-vi-IV)
    return progressions[genreId] || progressions['rock'];
  }

  /**
   * Definir progressão de acordes customizada
   */
  setChordProgression(progression) {
    this.chordProgression = progression;
    this.currentChordIndex = 0;
    this.currentChord = progression[0];
  }
}

// Exportar instância singleton
const bandCreatorEngine = new BandCreatorEngine();
export default bandCreatorEngine;

