/**
 * 🎵 Band Creator Engine — v3 (Corrigido)
 * Coordena todos os engines profissionais para criar backing tracks completas
 * Inspirado em DigiTech TRIO+, iReal Pro e Band-in-a-Box
 *
 * CORREÇÕES v3:
 * 1. AudioContext unificado: drum, bass e piano usam o mesmo ctx
 * 2. Lookahead scheduler (Web Audio API) substitui setInterval → sem drift
 * 3. Adicionado setVolumes() e setMutes() para compatibilidade com BandCreator.jsx
 * 4. Constructor aceita audioContext externo (opcional)
 * 5. Walking bass com approach note real (semitom abaixo do próximo acorde)
 * 6. Genre/Style ID mapping corrigido (rnb→rb, electronic→e_pop)
 */

import { CHROMATIC_SHARP, noteToIndex, indexToNote, getKeyPreference } from './noteNaming';
import DrumEngineV2 from './drumEngineV2';
import ProfessionalBassEngine from './professionalBassEngine';
import ProfessionalPianoEngine from './professionalPianoEngine';
import { bandCreatorData } from '../utils/bandCreatorData';

// ─── Mapeamento de gêneros do BandCreator.jsx → bandCreatorData ───────────────
const GENRE_ID_MAP = {
  'rnb':        'rb',
  'electronic': 'e_pop',
  // os demais coincidem (rock, blues, jazz, pop, funk, country, latin, metal, folk, gospel→rock fallback)
};

// ─── Lookahead Scheduler (Chris Wilson technique) ─────────────────────────────
class LookaheadScheduler {
  constructor(audioCtx, options = {}) {
    this.ctx           = audioCtx;
    this.bpm           = options.bpm || 120;
    this.lookahead     = options.lookahead ?? 0.1;     // 100ms à frente
    this.scheduleInterval = options.scheduleInterval ?? 25; // acorda a cada 25ms
    this._isRunning    = false;
    this._nextBeatTime = 0;
    this._currentBeat  = 0;
    this._totalBeats   = options.totalBeats || 4;
    this._timerId      = null;
    this._callbacks    = [];
  }

  get beatDuration() { return 60 / this.bpm; }

  onBeat(fn) {
    this._callbacks.push(fn);
    return () => { this._callbacks = this._callbacks.filter(f => f !== fn); };
  }

  start() {
    if (this._isRunning) this.stop();
    this._isRunning    = true;
    this._currentBeat  = 0;
    this._nextBeatTime = this.ctx.currentTime + 0.05;
    this._schedule();
  }

  stop() {
    this._isRunning = false;
    if (this._timerId !== null) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
    this._currentBeat = 0;
  }

  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(240, bpm));
  }

  _schedule() {
    if (!this._isRunning) return;
    while (this._nextBeatTime < this.ctx.currentTime + this.lookahead) {
      const beat = this._currentBeat % this._totalBeats;
      const time = this._nextBeatTime;
      this._callbacks.forEach(fn => { try { fn(beat, time); } catch (e) {} });
      this._nextBeatTime += this.beatDuration;
      this._currentBeat++;
    }
    this._timerId = setTimeout(() => this._schedule(), this.scheduleInterval);
  }
}

// ─── BandCreatorEngine ────────────────────────────────────────────────────────
class BandCreatorEngine {
  /**
   * @param {AudioContext} [externalCtx] - AudioContext externo (opcional)
   */
  constructor(externalCtx) {
    this._externalCtx  = externalCtx || null;
    this.audioContext  = null;
    this.drumEngine    = null;
    this.bassEngine    = null;
    this.pianoEngine   = null;
    this.scheduler     = null;

    this.isPlaying     = false;
    this.currentGenre  = 'rock';
    this.currentStyle  = 1;
    this.bpm           = 120;

    this.chordProgression  = [];
    this.currentChordIndex = 0;
    this.currentChord      = null;

    // Mixer — chaves 'drums', 'bass', 'keys', 'loop'
    this.mixer = {
      drums: { volume: 0.85, mute: false },
      bass:  { volume: 0.70, mute: false },
      keys:  { volume: 0.60, mute: false },
      loop:  { volume: 0.80, mute: false },
    };

    this.bassMode = 'root'; // 'root' | 'walking' | 'melodic'

    // Compatibilidade: beat counter para mudança de acorde
    this._beatCounter = 0;
    this._beatsPerChord = 4;
  }

  // ─── Inicialização ──────────────────────────────────────────────────────────

  async init() {
    if (this.audioContext) return;

    // CORREÇÃO 1: usar AudioContext externo se fornecido, senão criar um
    this.audioContext = this._externalCtx || new (window.AudioContext || window.webkitAudioContext)();

    // CORREÇÃO 1 (cont.): forçar DrumEngineV2 a usar o MESMO AudioContext
    this.drumEngine = new DrumEngineV2();
    // Injetar o audioContext antes de ensureContext() criar um novo
    this.drumEngine.audioContext = this.audioContext;
    this.drumEngine.professionalDrum = null; // será criado em ensureContext com o ctx correto
    await this.drumEngine.ensureContext();

    this.bassEngine  = new ProfessionalBassEngine(this.audioContext);
    this.pianoEngine = new ProfessionalPianoEngine(this.audioContext);

    // CORREÇÃO 2: Lookahead scheduler usando o mesmo AudioContext
    this.scheduler = new LookaheadScheduler(this.audioContext, {
      bpm: this.bpm,
      totalBeats: 4,
    });

    this.updateMixer();
  }

  // ─── Play / Stop ────────────────────────────────────────────────────────────

  async play(genreId, styleId, bpm = 120, chordProgression = null) {
    await this.init();

    if (this.isPlaying) this.stop();

    // CORREÇÃO 8: normalizar genre ID
    const normalizedGenre = GENRE_ID_MAP[genreId] || genreId;

    // CORREÇÃO 7: normalizar style ID (string → número via índice)
    const normalizedStyle = this._resolveStyleId(normalizedGenre, styleId);

    this.currentGenre  = normalizedGenre;
    this.currentStyle  = normalizedStyle;
    this.bpm           = bpm;
    this.isPlaying     = true;
    this._beatCounter  = 0;

    this.chordProgression  = chordProgression || this.getDefaultChordProgression(genreId);
    this.currentChordIndex = 0;
    this.currentChord      = this.chordProgression[0];

    // Iniciar bateria (usa o mesmo AudioContext)
    if (!this.mixer.drums.mute) {
      this.drumEngine.playPattern(normalizedGenre, normalizedStyle, bpm);
    }

    // CORREÇÃO 2: usar scheduler para bass e piano (sem drift)
    this.scheduler.setBPM(bpm);
    this.scheduler.onBeat((beat, time) => {
      if (!this.isPlaying) return;

      // Mudança de acorde a cada _beatsPerChord beats
      if (beat === 0) {
        this._beatCounter++;
        if (this._beatCounter >= this._beatsPerChord) {
          this._beatCounter = 0;
          this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;
          this.currentChord = this.chordProgression[this.currentChordIndex];
        }
      }

      // Baixo: toca no beat 0 e beat 2 (tempo 1 e 3)
      if (!this.mixer.bass.mute && this.currentChord) {
        if (beat === 0 || beat === 2) {
          this._scheduleBass(beat, time);
        }
      }

      // Piano: toca no beat 0 (início do compasso)
      if (!this.mixer.keys.mute && this.currentChord) {
        if (beat === 0) {
          this._schedulePiano(time);
        }
      }
    });

    this.scheduler.start();
  }

  stop() {
    this.isPlaying = false;
    if (this.scheduler) this.scheduler.stop();
    if (this.drumEngine) this.drumEngine.stop();
    if (this.bassEngine) this.bassEngine.stopAll();
    if (this.pianoEngine) this.pianoEngine.stopAll();
    this._beatCounter = 0;
  }

  // ─── Scheduling de instrumentos ─────────────────────────────────────────────

  _scheduleBass(beat, time) {
    if (!this.bassEngine || !this.currentChord) return;
    const style = this._getBassStyle(this.currentGenre);
    const beatDur = 60 / this.bpm;

    switch (this.bassMode) {
      case 'root':
        this.bassEngine.playNoteAt(this.currentChord.root, 1, style, beatDur * 0.9, 0.8, time);
        break;

      case 'walking': {
        // CORREÇÃO 6: walking bass com approach note real
        const nextChord = this.chordProgression[(this.currentChordIndex + 1) % this.chordProgression.length];
        const walkNotes = this._generateWalkingBass(this.currentChord, nextChord);
        walkNotes.forEach((n, i) => {
          this.bassEngine.playNoteAt(n.note, n.octave, style, beatDur * 0.85, 0.7, time + i * beatDur);
        });
        break;
      }

      case 'melodic': {
        const melNotes = this._generateMelodicBass(this.currentChord);
        melNotes.forEach(n => {
          this.bassEngine.playNoteAt(n.note, n.octave, style, n.duration, n.velocity, time + n.offset);
        });
        break;
      }
    }
  }

  _schedulePiano(time) {
    if (!this.pianoEngine || !this.currentChord) return;
    const beatDur = 60 / this.bpm;
    const voicing = this._getPianoVoicing(this.currentChord, this.currentGenre);
    this.pianoEngine.playChordAt(voicing, beatDur * 3.8, 0.6, time);
  }

  // ─── Geração musical ────────────────────────────────────────────────────────

  /**
   * CORREÇÃO 6: Walking bass com approach note real (semitom abaixo do próximo acorde)
   */
  _generateWalkingBass(chord, nextChord) {
    const chromatic = CHROMATIC_SHARP;
    const rootIdx   = chromatic.indexOf(chord.root);
    const thirdIdx  = chromatic.indexOf(chord.third  || this._getThird(chord.root, chord.quality));
    const fifthIdx  = chromatic.indexOf(chord.fifth  || this._getFifth(chord.root));

    // Approach note: semitom abaixo da fundamental do próximo acorde
    const nextRoot     = nextChord ? nextChord.root : chord.root;
    const nextRootIdx  = chromatic.indexOf(nextRoot);
    const approachIdx  = ((nextRootIdx - 1) + 12) % 12;
    const approachNote = chromatic[approachIdx];

    return [
      { note: chord.root,  octave: 1 },
      { note: chromatic[thirdIdx  !== -1 ? thirdIdx  : (rootIdx + 4) % 12], octave: 1 },
      { note: chromatic[fifthIdx  !== -1 ? fifthIdx  : (rootIdx + 7) % 12], octave: 1 },
      { note: approachNote, octave: 1 },
    ];
  }

  _generateMelodicBass(chord) {
    const beatDur = 60 / this.bpm;
    return [
      { note: chord.root,                                                    octave: 1, duration: 0.4, velocity: 0.8, offset: 0 },
      { note: chord.fifth  || this._getFifth(chord.root),                   octave: 1, duration: 0.3, velocity: 0.6, offset: beatDur * 1.5 },
      { note: chord.third  || this._getThird(chord.root, chord.quality),    octave: 1, duration: 0.3, velocity: 0.7, offset: beatDur * 2.5 },
      { note: chord.root,                                                    octave: 1, duration: 0.4, velocity: 0.8, offset: beatDur * 3.5 },
    ];
  }

  _getPianoVoicing(chord, genreId) {
    const notes = [
      { note: chord.root,                                                  octave: 3 },
      { note: chord.third || this._getThird(chord.root, chord.quality),   octave: 3 },
      { note: chord.fifth || this._getFifth(chord.root),                  octave: 3 },
    ];
    if (chord.seventh) notes.push({ note: chord.seventh, octave: 3 });
    return notes;
  }

  // ─── Helpers musicais ───────────────────────────────────────────────────────

  _getThird(root, quality = 'major') {
    const notes    = CHROMATIC_SHARP;
    const rootIdx  = notes.indexOf(root);
    if (rootIdx === -1) return 'E';
    const interval = quality === 'minor' ? 3 : 4;
    return notes[(rootIdx + interval) % 12];
  }

  _getFifth(root) {
    const notes   = CHROMATIC_SHARP;
    const rootIdx = notes.indexOf(root);
    if (rootIdx === -1) return 'G';
    return notes[(rootIdx + 7) % 12];
  }

  _getBassStyle(genreId) {
    if (['e_pop', 'hip_hop'].includes(genreId)) return 'pick';
    if (['funk'].includes(genreId))             return 'slap';
    return 'fingerstyle';
  }

  /**
   * CORREÇÃO 7: resolver styleId — aceita número ou string
   * Se for string, tenta encontrar o índice do estilo pelo nome
   */
  _resolveStyleId(genreId, styleId) {
    if (typeof styleId === 'number') return styleId;
    const genre = bandCreatorData[genreId];
    if (!genre) return 1;
    const match = genre.styles.find(s =>
      s.name.toLowerCase().includes(styleId.toLowerCase()) ||
      s.id === styleId
    );
    return match ? match.id : 1;
  }

  // ─── Progressões de acordes ─────────────────────────────────────────────────

  getDefaultChordProgression(genreId) {
    const progressions = {
      'rock':       [
        { root: 'C', quality: 'major',     third: 'E',  fifth: 'G' },
        { root: 'G', quality: 'major',     third: 'B',  fifth: 'D' },
        { root: 'A', quality: 'minor',     third: 'C',  fifth: 'E' },
        { root: 'F', quality: 'major',     third: 'A',  fifth: 'C' },
      ],
      'blues':      [
        { root: 'A', quality: 'dominant7', third: 'C#', fifth: 'E', seventh: 'G' },
        { root: 'D', quality: 'dominant7', third: 'F#', fifth: 'A', seventh: 'C' },
        { root: 'A', quality: 'dominant7', third: 'C#', fifth: 'E', seventh: 'G' },
        { root: 'E', quality: 'dominant7', third: 'G#', fifth: 'B', seventh: 'D' },
      ],
      'jazz':       [
        { root: 'C', quality: 'major7',    third: 'E',  fifth: 'G', seventh: 'B' },
        { root: 'A', quality: 'minor7',    third: 'C',  fifth: 'E', seventh: 'G' },
        { root: 'D', quality: 'minor7',    third: 'F',  fifth: 'A', seventh: 'C' },
        { root: 'G', quality: 'dominant7', third: 'B',  fifth: 'D', seventh: 'F' },
      ],
      'pop':        [
        { root: 'C', quality: 'major',     third: 'E',  fifth: 'G' },
        { root: 'G', quality: 'major',     third: 'B',  fifth: 'D' },
        { root: 'A', quality: 'minor',     third: 'C',  fifth: 'E' },
        { root: 'F', quality: 'major',     third: 'A',  fifth: 'C' },
      ],
      'funk':       [
        { root: 'E', quality: 'minor7',    third: 'G',  fifth: 'B', seventh: 'D' },
        { root: 'A', quality: 'minor7',    third: 'C',  fifth: 'E', seventh: 'G' },
      ],
      'latin':      [
        { root: 'D', quality: 'minor',     third: 'F',  fifth: 'A' },
        { root: 'G', quality: 'dominant7', third: 'B',  fifth: 'D', seventh: 'F' },
        { root: 'C', quality: 'major',     third: 'E',  fifth: 'G' },
        { root: 'A', quality: 'minor',     third: 'C',  fifth: 'E' },
      ],
      'metal':      [
        { root: 'E', quality: 'minor',     third: 'G',  fifth: 'B' },
        { root: 'D', quality: 'major',     third: 'F#', fifth: 'A' },
        { root: 'C', quality: 'major',     third: 'E',  fifth: 'G' },
        { root: 'B', quality: 'minor',     third: 'D',  fifth: 'F#' },
      ],
      'country':    [
        { root: 'G', quality: 'major',     third: 'B',  fifth: 'D' },
        { root: 'C', quality: 'major',     third: 'E',  fifth: 'G' },
        { root: 'D', quality: 'major',     third: 'F#', fifth: 'A' },
        { root: 'G', quality: 'major',     third: 'B',  fifth: 'D' },
      ],
      'rb':         [
        { root: 'F', quality: 'minor7',    third: 'Ab', fifth: 'C', seventh: 'Eb' },
        { root: 'Bb', quality: 'dominant7',third: 'D',  fifth: 'F', seventh: 'Ab' },
        { root: 'Eb', quality: 'major7',   third: 'G',  fifth: 'Bb', seventh: 'D' },
      ],
      'e_pop':      [
        { root: 'A', quality: 'minor',     third: 'C',  fifth: 'E' },
        { root: 'F', quality: 'major',     third: 'A',  fifth: 'C' },
        { root: 'C', quality: 'major',     third: 'E',  fifth: 'G' },
        { root: 'G', quality: 'major',     third: 'B',  fifth: 'D' },
      ],
    };
    return progressions[genreId] || progressions['rock'];
  }

  setChordProgression(progression) {
    this.chordProgression  = progression;
    this.currentChordIndex = 0;
    this.currentChord      = progression[0];
  }

  // ─── Mixer ──────────────────────────────────────────────────────────────────

  updateMixer() {
    if (this.drumEngine)  this.drumEngine.setVolume(this.mixer.drums.volume);
    if (this.bassEngine)  this.bassEngine.setVolume(this.mixer.bass.volume);
    if (this.pianoEngine) this.pianoEngine.setVolume(this.mixer.keys.volume);
  }

  setChannelVolume(channel, volume) {
    if (this.mixer[channel]) {
      this.mixer[channel].volume = Math.max(0, Math.min(1, volume));
      this.updateMixer();
    }
  }

  /**
   * CORREÇÃO 3: setVolumes() — compatibilidade com BandCreator.jsx
   * Aceita { drums, bass, piano, master } com valores 0-1
   */
  setVolumes({ drums, bass, piano, master } = {}) {
    if (drums  !== undefined) this.setChannelVolume('drums', drums);
    if (bass   !== undefined) this.setChannelVolume('bass',  bass);
    if (piano  !== undefined) this.setChannelVolume('keys',  piano);
    // master: aplicar como gain global se possível
    if (master !== undefined && this.audioContext) {
      try {
        // Ajustar gain do destination (não é ideal mas funciona)
        if (this.bassEngine?.masterGain)  this.bassEngine.masterGain.gain.value  = Math.min(1, this.mixer.bass.volume  * master);
        if (this.pianoEngine?.masterGain) this.pianoEngine.masterGain.gain.value = Math.min(1, this.mixer.keys.volume  * master);
      } catch (e) {}
    }
  }

  /**
   * CORREÇÃO 4: setMutes() — compatibilidade com BandCreator.jsx
   * Aceita { drums, bass, piano }
   */
  setMutes({ drums, bass, piano } = {}) {
    if (drums !== undefined) {
      const wasMuted = this.mixer.drums.mute;
      this.mixer.drums.mute = !!drums;
      if (this.isPlaying && wasMuted !== this.mixer.drums.mute) {
        if (this.mixer.drums.mute) {
          this.drumEngine?.stop();
        } else {
          this.drumEngine?.playPattern(this.currentGenre, this.currentStyle, this.bpm);
        }
      }
    }
    if (bass  !== undefined) this.mixer.bass.mute  = !!bass;
    if (piano !== undefined) this.mixer.keys.mute  = !!piano;
  }

  toggleChannelMute(channel) {
    if (this.mixer[channel]) {
      this.mixer[channel].mute = !this.mixer[channel].mute;
      if (this.isPlaying && channel === 'drums') {
        if (this.mixer.drums.mute) {
          this.drumEngine?.stop();
        } else {
          this.drumEngine?.playPattern(this.currentGenre, this.currentStyle, this.bpm);
        }
      }
    }
  }

  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(240, bpm));
    if (this.scheduler) this.scheduler.setBPM(this.bpm);
    if (this.drumEngine) this.drumEngine.setBPM(this.bpm);
  }

  setBassMode(mode) {
    if (['root', 'walking', 'melodic'].includes(mode)) {
      this.bassMode = mode;
    }
  }
}

// Exportar instância singleton e classe
const bandCreatorEngine = new BandCreatorEngine();
export default bandCreatorEngine;
export { BandCreatorEngine };
