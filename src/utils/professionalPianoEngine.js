/**
 * 🎹 Professional Piano Engine
 * Síntese de piano com qualidade profissional
 * Suporte a acordes, voicings e dinâmica
 */

class ProfessionalPianoEngine {
  constructor(audioContext) {
    this.audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.connect(this.audioContext.destination);
    this.masterGain.gain.value = 0.3;
    
    // Reverb para profundidade
    this.reverb = this.createReverb();
    
    // Notas ativas
    this.activeNotes = [];
  }

  /**
   * Criar reverb para piano
   */
  createReverb() {
    const convolver = this.audioContext.createConvolver();
    const rate = this.audioContext.sampleRate;
    const length = rate * 3; // 3 segundos
    const impulse = this.audioContext.createBuffer(2, length, rate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3);
      }
    }
    
    convolver.buffer = impulse;
    
    // Wet/Dry mix
    const wetGain = this.audioContext.createGain();
    const dryGain = this.audioContext.createGain();
    wetGain.gain.value = 0.3; // 30% wet
    dryGain.gain.value = 0.7; // 70% dry
    
    convolver.connect(wetGain);
    wetGain.connect(this.audioContext.destination);
    
    return { convolver, wetGain, dryGain };
  }

  /**
   * Obter frequência de nota
   */
  getNoteFrequency(note, octave) {
    const noteFrequencies = {
      'C': 16.35,
      'C#': 17.32, 'Db': 17.32,
      'D': 18.35,
      'D#': 19.45, 'Eb': 19.45,
      'E': 20.60,
      'F': 21.83,
      'F#': 23.12, 'Gb': 23.12,
      'G': 24.50,
      'G#': 25.96, 'Ab': 25.96,
      'A': 27.50,
      'A#': 29.14, 'Bb': 29.14,
      'B': 30.87
    };
    
    const baseFreq = noteFrequencies[note];
    if (!baseFreq) {
      return 261.63; // C4 default
    }
    
    return baseFreq * Math.pow(2, octave);
  }

  /**
   * 🎹 PIANO NOTE - Síntese realista
   */
  playNote(note, octave, duration = 2.0, velocity = 0.7) {
    const now = this.audioContext.currentTime;
    const frequency = this.getNoteFrequency(note, octave);
    
    // Fundamental
    const fundamental = this.audioContext.createOscillator();
    const fundamentalGain = this.audioContext.createGain();
    
    // Harmônicos (piano tem muitos harmônicos)
    const harmonics = [];
    const harmonicGains = [];
    const harmonicRatios = [2, 3, 4, 5, 6, 7, 8];
    const harmonicAmplitudes = [0.5, 0.3, 0.2, 0.15, 0.1, 0.08, 0.05];
    
    harmonicRatios.forEach((ratio, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * ratio, now);
      
      harmonics.push(osc);
      harmonicGains.push(gain);
    });
    
    // Filtro para simular corpo do piano
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    
    // Frequência do filtro varia com a nota (mais brilhante nas agudas)
    const filterFreq = Math.min(8000, frequency * 8);
    filter.frequency.setValueAtTime(filterFreq, now);
    filter.Q.setValueAtTime(1, now);
    
    // Configurar fundamental
    fundamental.type = 'sine';
    fundamental.frequency.setValueAtTime(frequency, now);
    
    // Envelope ADSR para piano
    const attackTime = 0.002; // Ataque muito rápido
    const decayTime = 0.1;
    const sustainLevel = velocity * 0.6;
    const releaseTime = duration * 0.3; // Release proporcional à duração
    
    // Fundamental envelope
    fundamentalGain.gain.setValueAtTime(0, now);
    fundamentalGain.gain.linearRampToValueAtTime(velocity, now + attackTime);
    fundamentalGain.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    fundamentalGain.gain.setValueAtTime(sustainLevel, now + duration);
    fundamentalGain.gain.exponentialRampToValueAtTime(0.001, now + duration + releaseTime);
    
    // Harmonic envelopes (decaem mais rápido)
    harmonics.forEach((osc, index) => {
      const gain = harmonicGains[index];
      const amplitude = harmonicAmplitudes[index] * velocity;
      const harmonicDecay = decayTime * (1 + index * 0.2);
      const harmonicSustain = amplitude * 0.4;
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(amplitude, now + attackTime);
      gain.gain.exponentialRampToValueAtTime(harmonicSustain, now + attackTime + harmonicDecay);
      gain.gain.setValueAtTime(harmonicSustain, now + duration);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration + releaseTime);
    });
    
    // Conexões
    fundamental.connect(fundamentalGain);
    fundamentalGain.connect(filter);
    
    harmonics.forEach((osc, index) => {
      osc.connect(harmonicGains[index]);
      harmonicGains[index].connect(filter);
    });
    
    // Conectar ao reverb e master
    filter.connect(this.reverb.dryGain);
    this.reverb.dryGain.connect(this.masterGain);
    
    filter.connect(this.reverb.convolver);
    
    // Start e stop
    fundamental.start(now);
    harmonics.forEach(osc => osc.start(now));
    
    const stopTime = now + duration + releaseTime + 0.1;
    fundamental.stop(stopTime);
    harmonics.forEach(osc => osc.stop(stopTime));
    
    // Guardar referências
    this.activeNotes.push({
      oscillators: [fundamental, ...harmonics],
      stopTime: stopTime
    });
    
    this.cleanupActiveNotes();
  }

  /**
   * 🎹 Tocar acorde
   */
  playChord(notes, duration = 2.0, velocity = 0.7) {
    notes.forEach(noteData => {
      this.playNote(noteData.note, noteData.octave, duration, velocity);
    });
  }

  /**
   * 🎹 Tocar acorde com voicing específico
   */
  playChordWithVoicing(chord, voicingType = 'close', duration = 2.0, velocity = 0.7) {
    const voicing = this.getVoicing(chord, voicingType);
    this.playChord(voicing, duration, velocity);
  }

  /**
   * Obter voicing baseado no tipo
   */
  getVoicing(chord, voicingType) {
    const { root, third, fifth, seventh } = chord;
    
    switch (voicingType) {
      case 'close':
        // Voicing fechado (notas próximas)
        return [
          { note: root, octave: 3 },
          { note: third, octave: 3 },
          { note: fifth, octave: 3 },
          ...(seventh ? [{ note: seventh, octave: 3 }] : [])
        ];
      
      case 'spread':
        // Voicing aberto (notas espaçadas)
        return [
          { note: root, octave: 2 },
          { note: fifth, octave: 3 },
          { note: third, octave: 4 },
          ...(seventh ? [{ note: seventh, octave: 4 }] : [])
        ];
      
      case 'drop2':
        // Drop 2 voicing (segunda nota de cima desce uma oitava)
        return [
          { note: root, octave: 3 },
          { note: fifth, octave: 3 },
          ...(seventh ? [{ note: seventh, octave: 3 }] : []),
          { note: third, octave: 4 }
        ];
      
      case 'rootless':
        // Voicing sem fundamental (jazz)
        return [
          { note: third, octave: 3 },
          { note: fifth, octave: 3 },
          ...(seventh ? [{ note: seventh, octave: 3 }] : [])
        ];
      
      default:
        return [
          { note: root, octave: 3 },
          { note: third, octave: 3 },
          { note: fifth, octave: 3 }
        ];
    }
  }

  /**
   * 🎹 Tocar arpejo
   */
  playArpeggio(notes, bpm = 120, pattern = 'up') {
    const noteDuration = (60 / bpm) / 2; // 8th notes
    
    let sequence = [...notes];
    
    switch (pattern) {
      case 'down':
        sequence = sequence.reverse();
        break;
      case 'updown':
        sequence = [...notes, ...notes.slice(1, -1).reverse()];
        break;
      case 'random':
        sequence = notes.sort(() => Math.random() - 0.5);
        break;
      default: // 'up'
        break;
    }
    
    sequence.forEach((noteData, index) => {
      setTimeout(() => {
        this.playNote(noteData.note, noteData.octave, noteDuration * 0.9, 0.6);
      }, noteDuration * index * 1000);
    });
  }

  /**
   * 🎹 Tocar progressão de acordes
   */
  playChordProgression(chords, bpm = 120, voicingType = 'close') {
    const chordDuration = (60 / bpm) * 4; // 4 beats por acorde
    
    chords.forEach((chord, index) => {
      setTimeout(() => {
        this.playChordWithVoicing(chord, voicingType, chordDuration * 0.95, 0.7);
      }, chordDuration * index * 1000);
    });
  }

  /**
   * 🎹 Tocar comping (acompanhamento rítmico)
   */
  playComping(chord, bpm = 120, style = 'jazz') {
    const beatDuration = 60 / bpm;
    
    if (style === 'jazz') {
      // Comping jazz (2 e 4)
      [1, 3].forEach(beat => {
        setTimeout(() => {
          this.playChordWithVoicing(chord, 'rootless', beatDuration * 0.3, 0.5);
        }, beatDuration * beat * 1000);
      });
    } else if (style === 'bossa') {
      // Comping bossa nova
      [0, 1.5, 2.5].forEach(beat => {
        setTimeout(() => {
          this.playChordWithVoicing(chord, 'close', beatDuration * 0.4, 0.4);
        }, beatDuration * beat * 1000);
      });
    } else { // 'pop'
      // Comping pop (todos os beats)
      [0, 1, 2, 3].forEach(beat => {
        setTimeout(() => {
          this.playChordWithVoicing(chord, 'close', beatDuration * 0.5, 0.5);
        }, beatDuration * beat * 1000);
      });
    }
  }

  /**
   * Limpar notas antigas
   */
  cleanupActiveNotes() {
    const now = this.audioContext.currentTime;
    this.activeNotes = this.activeNotes.filter(note => note.stopTime > now);
  }

  /**
   * Parar todas as notas
   */
  stopAll() {
    const now = this.audioContext.currentTime;
    this.activeNotes.forEach(note => {
      note.oscillators.forEach(osc => {
        try {
          osc.stop(now);
        } catch (e) {
          // Oscilador já parado
        }
      });
    });
    this.activeNotes = [];
  }

  /**
   * Ajustar volume master
   */
  setVolume(value) {
    this.masterGain.gain.setValueAtTime(value, this.audioContext.currentTime);
  }

  /**
   * Ajustar reverb
   */
  setReverb(amount) {
    const wet = Math.max(0, Math.min(1, amount));
    const dry = 1 - wet;
    
    this.reverb.wetGain.gain.setValueAtTime(wet, this.audioContext.currentTime);
    this.reverb.dryGain.gain.setValueAtTime(dry, this.audioContext.currentTime);
  }
}

export default ProfessionalPianoEngine;

