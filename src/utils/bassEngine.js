// bassEngine.js
// Sistema de baixo com 3 modos: Root Notes, Walking Bass, Melodic Bass
// Web Audio API para síntese de som de baixo

import { buildChord, transposeNote } from './musicTheory';

class BassEngine {
  constructor() {
    this.audioContext = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.bpm = 120;
    this.volume = 0.7;
    this.mode = 'root'; // 'root', 'walking', 'melodic'
    this.currentChordProgression = ['C', 'F', 'G', 'C'];
    this.currentBeat = 0;
    this.key = 'C';
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

  // Criar som de baixo usando síntese
  playBassNote(note, duration = 0.5, startTime = 0) {
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime + startTime;
    const freq = this.noteToFrequency(note);
    
    // Oscilador principal (onda senoidal para baixo)
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    // Configurar oscilador
    osc.type = 'sawtooth'; // Som mais rico para baixo
    osc.frequency.setValueAtTime(freq, now);
    
    // Configurar filtro (passa-baixa para som mais "gordo")
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.value = 1;
    
    // Envelope ADSR
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.volume * 0.8, now + 0.01); // Attack
    gain.gain.linearRampToValueAtTime(this.volume * 0.6, now + 0.1); // Decay
    gain.gain.setValueAtTime(this.volume * 0.6, now + duration - 0.1); // Sustain
    gain.gain.linearRampToValueAtTime(0, now + duration); // Release
    
    // Conectar
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioContext.destination);
    
    // Tocar
    osc.start(now);
    osc.stop(now + duration);
  }

  // Converter nota para frequência (baixo usa oitavas graves 0-2)
  // Suporta baixo de 5 cordas (B0) e 4 cordas (E1)
  noteToFrequency(note, octaveOverride = null) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Extrair nota e oitava
    let noteName = note.replace(/[0-9]/g, '');
    let octave = octaveOverride || parseInt(note.match(/[0-9]/)?.[0] || '1'); // Baixo em oitava 1 por padrão (E1 = corda E do baixo)
    
    // Normalizar bemóis para sustenidos
    noteName = noteName.replace('Db', 'C#').replace('Eb', 'D#')
                       .replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#');
    
    const noteIndex = notes.indexOf(noteName);
    if (noteIndex === -1) return 110; // A2 como fallback
    
    // Fórmula: f = 440 * 2^((n-69)/12)
    // A4 = 440Hz, A2 = 110Hz
    const midiNote = (octave + 1) * 12 + noteIndex;
    const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);
    
    return frequency;
  }

  // Extrair nota fundamental do acorde
  getRootNote(chord) {
    // Remove qualidade do acorde (maj7, m, dim, etc.)
    const root = chord.replace(/maj7|min7|m7|dim7|7|maj|min|m|dim|aug|\+|-|sus4|sus2|add9|6|9|11|13/g, '');
    return root + '1'; // Adiciona oitava 1 para baixo (E1 = 41.20 Hz, range real de baixo)
  }

  // Modo 1: Root Notes (apenas fundamentais)
  generateRootPattern(chordProgression, beatsPerChord = 4) {
    const pattern = [];
    
    chordProgression.forEach((chord, index) => {
      const root = this.getRootNote(chord);
      const time = index * beatsPerChord;
      
      // Tocar fundamental no primeiro tempo de cada acorde
      pattern.push({
        time: time,
        note: root,
        duration: 0.5
      });
      
      // Opcional: repetir no terceiro tempo
      if (beatsPerChord >= 4) {
        pattern.push({
          time: time + 2,
          note: root,
          duration: 0.4
        });
      }
    });
    
    return pattern;
  }

  // Modo 2: Walking Bass (linha melódica jazz/blues)
  generateWalkingPattern(chordProgression, beatsPerChord = 4) {
    const pattern = [];
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    chordProgression.forEach((chord, chordIndex) => {
      const root = this.getRootNote(chord).replace('2', '');
      const rootIndex = notes.indexOf(root);
      
      const baseTime = chordIndex * beatsPerChord;
      
      for (let beat = 0; beat < beatsPerChord; beat++) {
        let noteIndex;
        
        if (beat === 0) {
          // Primeiro tempo: fundamental
          noteIndex = rootIndex;
        } else if (beat === 1) {
          // Segundo tempo: terça ou quinta
          noteIndex = (rootIndex + (Math.random() > 0.5 ? 4 : 7)) % 12;
        } else if (beat === 2) {
          // Terceiro tempo: quinta ou sétima
          noteIndex = (rootIndex + (Math.random() > 0.5 ? 7 : 10)) % 12;
        } else {
          // Último tempo: aproximação cromática para próximo acorde
          if (chordIndex < chordProgression.length - 1) {
            const nextRoot = this.getRootNote(chordProgression[chordIndex + 1]).replace('2', '');
            const nextRootIndex = notes.indexOf(nextRoot);
            // Nota um semitom abaixo ou acima do próximo acorde
            noteIndex = (nextRootIndex + (Math.random() > 0.5 ? -1 : 1) + 12) % 12;
          } else {
            noteIndex = (rootIndex + 10) % 12; // Sétima
          }
        }
        
        pattern.push({
          time: baseTime + beat,
          note: notes[noteIndex] + '2',
          duration: 0.9
        });
      }
    });
    
    return pattern;
  }

  // Modo 3: Melodic Bass (linha elaborada funk/R&B)
  generateMelodicPattern(chordProgression, beatsPerChord = 4) {
    const pattern = [];
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    chordProgression.forEach((chord, chordIndex) => {
      const root = this.getRootNote(chord).replace('2', '');
      const rootIndex = notes.indexOf(root);
      
      const baseTime = chordIndex * beatsPerChord;
      
      // Padrão funk típico: fundamental + oitava + quinta + passagem
      const funkPattern = [
        { offset: 0, interval: 0, duration: 0.4 },      // Fundamental
        { offset: 0.5, interval: 12, duration: 0.3 },   // Oitava acima
        { offset: 1, interval: 0, duration: 0.4 },      // Fundamental
        { offset: 1.5, interval: 7, duration: 0.3 },    // Quinta
        { offset: 2, interval: 0, duration: 0.4 },      // Fundamental
        { offset: 2.5, interval: 5, duration: 0.2 },    // Quarta
        { offset: 2.75, interval: 7, duration: 0.2 },   // Quinta
        { offset: 3, interval: 10, duration: 0.3 },     // Sétima menor
        { offset: 3.5, interval: 11, duration: 0.3 }    // Sétima maior (passagem)
      ];
      
      funkPattern.forEach(({ offset, interval, duration }) => {
        if (offset < beatsPerChord) {
          let noteIndex = (rootIndex + interval) % 12;
          let octave = interval >= 12 ? '3' : '2';
          
          pattern.push({
            time: baseTime + offset,
            note: notes[noteIndex] + octave,
            duration: duration
          });
        }
      });
    });
    
    return pattern;
  }

  // Gerar padrão baseado no modo atual
  generatePattern(chordProgression, beatsPerChord = 4) {
    switch (this.mode) {
      case 'root':
        return this.generateRootPattern(chordProgression, beatsPerChord);
      case 'walking':
        return this.generateWalkingPattern(chordProgression, beatsPerChord);
      case 'melodic':
        return this.generateMelodicPattern(chordProgression, beatsPerChord);
      default:
        return this.generateRootPattern(chordProgression, beatsPerChord);
    }
  }

  // Tocar linha de baixo
  async play(chordProgression, bpm, mode = 'root', volume = 0.7) {
    this.stop();
    await this.ensureContext();
    
    this.bpm = bpm;
    this.mode = mode;
    this.volume = volume;
    this.currentChordProgression = chordProgression;
    this.currentBeat = 0;
    this.isPlaying = true;
    
    const beatsPerChord = 4; // 4 beats por acorde (compasso 4/4)
    const pattern = this.generatePattern(chordProgression, beatsPerChord);
    
    const beatDuration = (60 / this.bpm) * 1000; // ms por beat
    const patternDuration = chordProgression.length * beatsPerChord * beatDuration;
    
    const playPattern = () => {
      if (!this.isPlaying) return;
      
      const startTime = this.audioContext.currentTime;
      
      pattern.forEach(({ time, note, duration }) => {
        const noteTime = (time * 60 / this.bpm); // converter beat para segundos
        this.playBassNote(note, duration, noteTime);
      });
    };
    
    // Tocar imediatamente
    playPattern();
    
    // Loop
    this.intervalId = setInterval(playPattern, patternDuration);
  }

  // Parar
  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Setters
  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(300, bpm));
    if (this.isPlaying) {
      this.play(this.currentChordProgression, this.bpm, this.mode, this.volume);
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setMode(mode) {
    if (['root', 'walking', 'melodic'].includes(mode)) {
      this.mode = mode;
      if (this.isPlaying) {
        this.play(this.currentChordProgression, this.bpm, this.mode, this.volume);
      }
    }
  }

  setChordProgression(chordProgression) {
    this.currentChordProgression = chordProgression;
    if (this.isPlaying) {
      this.play(this.currentChordProgression, this.bpm, this.mode, this.volume);
    }
  }

  // Getters
  getIsPlaying() {
    return this.isPlaying;
  }

  getCurrentBPM() {
    return this.bpm;
  }

  getCurrentVolume() {
    return this.volume;
  }

  getCurrentMode() {
    return this.mode;
  }
}

// Instância global
export const bassEngine = new BassEngine();
export default bassEngine;

