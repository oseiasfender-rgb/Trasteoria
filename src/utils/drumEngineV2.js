/**
 * 🥁 Drum Engine V2 - Integração com Professional Drum Engine
 * Sistema expandido de bateria com 144 padrões (12 gêneros × 12 estilos)
 * Agora com síntese profissional de alta qualidade
 */

import ProfessionalDrumEngine from './professionalDrumEngine';
import { bandCreatorData } from '../data/bandCreatorData';

class DrumEngineV2 {
  constructor() {
    this.audioContext = null;
    this.professionalDrum = null;
    this.isPlaying = false;
    this.currentPattern = null;
    this.intervalId = null;
    this.bpm = 120;
    this.volume = 0.7;
    this.currentGenre = 'rock';
    this.currentStyle = 1;
    this.currentBeat = 0;
    this.drumStyle = 'acoustic'; // 'acoustic', 'electronic', 'rock'
  }

  /**
   * Inicializar contexto de áudio e engine profissional
   */
  async ensureContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.professionalDrum = new ProfessionalDrumEngine(this.audioContext);
    }
    
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    return this.audioContext;
  }

  /**
   * Gerar padrão baseado em gênero e estilo
   */
  generatePattern(genreId, styleId) {
    const genre = bandCreatorData[genreId];
    if (!genre) return this.getDefaultPattern();
    
    const style = genre.styles.find(s => s.id === styleId);
    if (!style) return this.getDefaultPattern();
    
    // Determinar estilo de bateria baseado no gênero
    this.drumStyle = this.getDrumStyleForGenre(genreId);
    
    // Gerar padrão baseado nas características do estilo
    return this.createPatternFromStyle(style, genreId);
  }

  /**
   * Determinar estilo de bateria baseado no gênero
   */
  getDrumStyleForGenre(genreId) {
    const electronicGenres = ['electronic', 'pop'];
    const rockGenres = ['rock', 'metal'];
    
    if (electronicGenres.includes(genreId)) {
      return 'electronic';
    } else if (rockGenres.includes(genreId)) {
      return 'rock';
    } else {
      return 'acoustic';
    }
  }

  /**
   * Criar padrão a partir do estilo
   */
  createPatternFromStyle(style, genreId) {
    // Mapear padrões por gênero
    const patternMap = {
      'rock': this.getRockPattern(style.name),
      'blues': this.getBluesPattern(style.name),
      'jazz': this.getJazzPattern(style.name),
      'pop': this.getPopPattern(style.name),
      'rb': this.getRnBPattern(style.name),
      'funk': this.getFunkPattern(style.name),
      'country': this.getCountryPattern(style.name),
      'folk': this.getFolkPattern(style.name),
      'latin': this.getLatinPattern(style.name),
      'gospel': this.getGospelPattern(style.name),
      'electronic': this.getElectronicPattern(style.name),
      'metal': this.getMetalPattern(style.name)
    };

    return patternMap[genreId] || this.getDefaultPattern();
  }

  /**
   * Padrões de Rock
   */
  getRockPattern(styleName) {
    // Classic Rock (4/4 básico)
    if (styleName.includes('Classic') || styleName.includes('Clássico')) {
      return [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ];
    }
    // Hard Rock (mais kicks)
    else if (styleName.includes('Hard') || styleName.includes('Pesado')) {
      return [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['snare', 'hihat'] },
        { time: 0.75, drums: ['kick', 'hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.5, drums: ['snare', 'hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['snare', 'hihat'] },
        { time: 2.75, drums: ['kick', 'hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.5, drums: ['snare', 'hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ];
    }
    // Default rock
    else {
      return [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ];
    }
  }

  /**
   * Padrões de Blues
   */
  getBluesPattern(styleName) {
    // Shuffle (triplet feel)
    return [
      { time: 0, drums: ['kick', 'ride'] },
      { time: 0.67, drums: ['ride'] },
      { time: 1, drums: ['snare', 'ride'] },
      { time: 1.67, drums: ['ride'] },
      { time: 2, drums: ['kick', 'ride'] },
      { time: 2.67, drums: ['ride'] },
      { time: 3, drums: ['snare', 'ride'] },
      { time: 3.67, drums: ['ride'] }
    ];
  }

  /**
   * Padrões de Jazz
   */
  getJazzPattern(styleName) {
    // Swing
    if (styleName.includes('Swing')) {
      return [
        { time: 0, drums: ['kick', 'ride'] },
        { time: 0.67, drums: ['ride'] },
        { time: 1, drums: ['snare', 'ride'] },
        { time: 1.33, drums: ['ride'] },
        { time: 2, drums: ['kick', 'ride'] },
        { time: 2.67, drums: ['ride'] },
        { time: 3, drums: ['snare', 'ride'] },
        { time: 3.33, drums: ['ride'] }
      ];
    }
    // Bebop (mais complexo)
    else {
      return [
        { time: 0, drums: ['ride'] },
        { time: 0.33, drums: ['ride'] },
        { time: 0.5, drums: ['kick'] },
        { time: 0.67, drums: ['ride'] },
        { time: 1, drums: ['ride', 'snare'] },
        { time: 1.33, drums: ['ride'] },
        { time: 1.67, drums: ['ride'] },
        { time: 2, drums: ['ride'] },
        { time: 2.33, drums: ['ride'] },
        { time: 2.5, drums: ['kick'] },
        { time: 2.67, drums: ['ride'] },
        { time: 3, drums: ['ride', 'snare'] },
        { time: 3.33, drums: ['ride'] },
        { time: 3.67, drums: ['ride'] }
      ];
    }
  }

  /**
   * Padrões de Pop
   */
  getPopPattern(styleName) {
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 0.5, drums: ['hihat'] },
      { time: 1, drums: ['snare', 'hihat'] },
      { time: 1.5, drums: ['hihat'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 2.5, drums: ['kick', 'hihat'] },
      { time: 3, drums: ['snare', 'hihat'] },
      { time: 3.5, drums: ['hihat'] }
    ];
  }

  /**
   * Padrões de R&B
   */
  getRnBPattern(styleName) {
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 0.25, drums: ['hihat'] },
      { time: 0.5, drums: ['hihat'] },
      { time: 0.75, drums: ['hihat'] },
      { time: 1, drums: ['snare', 'hihat'] },
      { time: 1.25, drums: ['hihat'] },
      { time: 1.5, drums: ['hihat'] },
      { time: 1.75, drums: ['hihat'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 2.25, drums: ['hihat'] },
      { time: 2.5, drums: ['kick', 'hihat'] },
      { time: 2.75, drums: ['hihat'] },
      { time: 3, drums: ['snare', 'hihat'] },
      { time: 3.25, drums: ['hihat'] },
      { time: 3.5, drums: ['hihat'] },
      { time: 3.75, drums: ['hihat'] }
    ];
  }

  /**
   * Padrões de Funk
   */
  getFunkPattern(styleName) {
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 0.25, drums: ['hihat'] },
      { time: 0.5, drums: ['hihat'] },
      { time: 0.75, drums: ['kick', 'hihat'] },
      { time: 1, drums: ['snare', 'hihat'] },
      { time: 1.25, drums: ['hihat'] },
      { time: 1.5, drums: ['kick', 'hihat'] },
      { time: 1.75, drums: ['hihat'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 2.25, drums: ['hihat'] },
      { time: 2.5, drums: ['hihat'] },
      { time: 2.75, drums: ['kick', 'hihat'] },
      { time: 3, drums: ['snare', 'hihat'] },
      { time: 3.25, drums: ['hihat'] },
      { time: 3.5, drums: ['kick', 'hihat'] },
      { time: 3.75, drums: ['hihat'] }
    ];
  }

  /**
   * Padrões de Country
   */
  getCountryPattern(styleName) {
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 0.5, drums: ['hihat'] },
      { time: 1, drums: ['snare', 'hihat'] },
      { time: 1.5, drums: ['hihat'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 2.5, drums: ['hihat'] },
      { time: 3, drums: ['snare', 'hihat'] },
      { time: 3.5, drums: ['kick', 'hihat'] }
    ];
  }

  /**
   * Padrões de Folk
   */
  getFolkPattern(styleName) {
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 1, drums: ['snare', 'hihat'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 3, drums: ['snare', 'hihat'] }
    ];
  }

  /**
   * Padrões de Latin
   */
  getLatinPattern(styleName) {
    // Bossa Nova
    if (styleName.includes('Bossa')) {
      return [
        { time: 0, drums: ['kick', 'ride'] },
        { time: 0.5, drums: ['ride'] },
        { time: 1, drums: ['snare', 'ride'] },
        { time: 1.5, drums: ['ride'] },
        { time: 2, drums: ['kick', 'ride'] },
        { time: 2.5, drums: ['ride'] },
        { time: 3, drums: ['ride'] },
        { time: 3.5, drums: ['snare', 'ride'] }
      ];
    }
    // Samba
    else if (styleName.includes('Samba')) {
      return [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['snare', 'hihat'] },
        { time: 0.75, drums: ['hihat'] },
        { time: 1, drums: ['kick', 'hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.5, drums: ['snare', 'hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['snare', 'hihat'] },
        { time: 2.75, drums: ['hihat'] },
        { time: 3, drums: ['kick', 'hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.5, drums: ['snare', 'hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ];
    }
    // Default Latin
    else {
      return [
        { time: 0, drums: ['kick', 'ride'] },
        { time: 0.5, drums: ['ride'] },
        { time: 1, drums: ['snare', 'ride'] },
        { time: 1.5, drums: ['kick', 'ride'] },
        { time: 2, drums: ['kick', 'ride'] },
        { time: 2.5, drums: ['ride'] },
        { time: 3, drums: ['snare', 'ride'] },
        { time: 3.5, drums: ['ride'] }
      ];
    }
  }

  /**
   * Padrões de Gospel
   */
  getGospelPattern(styleName) {
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 0.5, drums: ['hihat'] },
      { time: 1, drums: ['snare', 'hihat'] },
      { time: 1.5, drums: ['hihat'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 2.5, drums: ['kick', 'hihat'] },
      { time: 3, drums: ['snare', 'hihat'] },
      { time: 3.5, drums: ['hihat'] }
    ];
  }

  /**
   * Padrões de Electronic
   */
  getElectronicPattern(styleName) {
    // Four-on-the-floor (House, Techno)
    if (styleName.includes('House') || styleName.includes('Techno')) {
      return [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.25, drums: ['hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 0.75, drums: ['hihat'] },
        { time: 1, drums: ['kick', 'snare', 'hihat'] },
        { time: 1.25, drums: ['hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 1.75, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.25, drums: ['hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 2.75, drums: ['hihat'] },
        { time: 3, drums: ['kick', 'snare', 'hihat'] },
        { time: 3.25, drums: ['hihat'] },
        { time: 3.5, drums: ['hihat'] },
        { time: 3.75, drums: ['hihat'] }
      ];
    }
    // Default electronic
    else {
      return [
        { time: 0, drums: ['kick', 'hihat'] },
        { time: 0.5, drums: ['hihat'] },
        { time: 1, drums: ['snare', 'hihat'] },
        { time: 1.5, drums: ['hihat'] },
        { time: 2, drums: ['kick', 'hihat'] },
        { time: 2.5, drums: ['hihat'] },
        { time: 3, drums: ['snare', 'hihat'] },
        { time: 3.5, drums: ['hihat'] }
      ];
    }
  }

  /**
   * Padrões de Metal
   */
  getMetalPattern(styleName) {
    // Double bass (kicks rápidos)
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 0.125, drums: ['kick'] },
      { time: 0.25, drums: ['kick', 'hihat'] },
      { time: 0.375, drums: ['kick'] },
      { time: 0.5, drums: ['kick', 'snare', 'hihat'] },
      { time: 0.625, drums: ['kick'] },
      { time: 0.75, drums: ['kick', 'hihat'] },
      { time: 0.875, drums: ['kick'] },
      { time: 1, drums: ['kick', 'hihat'] },
      { time: 1.125, drums: ['kick'] },
      { time: 1.25, drums: ['kick', 'hihat'] },
      { time: 1.375, drums: ['kick'] },
      { time: 1.5, drums: ['kick', 'snare', 'hihat'] },
      { time: 1.625, drums: ['kick'] },
      { time: 1.75, drums: ['kick', 'hihat'] },
      { time: 1.875, drums: ['kick'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 2.125, drums: ['kick'] },
      { time: 2.25, drums: ['kick', 'hihat'] },
      { time: 2.375, drums: ['kick'] },
      { time: 2.5, drums: ['kick', 'snare', 'hihat'] },
      { time: 2.625, drums: ['kick'] },
      { time: 2.75, drums: ['kick', 'hihat'] },
      { time: 2.875, drums: ['kick'] },
      { time: 3, drums: ['kick', 'hihat'] },
      { time: 3.125, drums: ['kick'] },
      { time: 3.25, drums: ['kick', 'hihat'] },
      { time: 3.375, drums: ['kick'] },
      { time: 3.5, drums: ['kick', 'snare', 'hihat'] },
      { time: 3.625, drums: ['kick'] },
      { time: 3.75, drums: ['kick', 'hihat'] },
      { time: 3.875, drums: ['kick'] }
    ];
  }

  /**
   * Padrão default
   */
  getDefaultPattern() {
    return [
      { time: 0, drums: ['kick', 'hihat'] },
      { time: 0.5, drums: ['hihat'] },
      { time: 1, drums: ['snare', 'hihat'] },
      { time: 1.5, drums: ['hihat'] },
      { time: 2, drums: ['kick', 'hihat'] },
      { time: 2.5, drums: ['hihat'] },
      { time: 3, drums: ['snare', 'hihat'] },
      { time: 3.5, drums: ['hihat'] }
    ];
  }

  /**
   * Tocar padrão
   */
  async playPattern(genreId, styleId, bpm = 120) {
    await this.ensureContext();
    
    this.bpm = bpm;
    this.currentGenre = genreId;
    this.currentStyle = styleId;
    this.currentPattern = this.generatePattern(genreId, styleId);
    this.isPlaying = true;
    this.currentBeat = 0;
    
    // Duração de 1 beat em milissegundos
    const beatDuration = (60 / this.bpm) * 1000;
    
    // Tocar padrão em loop
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      
      // Tocar todos os drums no beat atual
      const currentBeatEvents = this.currentPattern.filter(
        event => event.time === this.currentBeat
      );
      
      currentBeatEvents.forEach(event => {
        event.drums.forEach(drum => {
          this.playDrum(drum);
        });
      });
      
      // Avançar beat
      this.currentBeat += 0.25; // 16th notes
      
      // Reset ao final do compasso (4 beats)
      if (this.currentBeat >= 4) {
        this.currentBeat = 0;
      }
    }, beatDuration / 4); // 16th note resolution
  }

  /**
   * Tocar instrumento individual
   */
  playDrum(drumType) {
    if (!this.professionalDrum) return;
    
    const velocity = this.volume;
    
    switch (drumType) {
      case 'kick':
        this.professionalDrum.playKick(this.drumStyle, velocity);
        break;
      case 'snare':
        this.professionalDrum.playSnare(this.drumStyle, velocity);
        break;
      case 'hihat':
        this.professionalDrum.playHihatClosed(this.drumStyle, velocity);
        break;
      case 'hihat-open':
        this.professionalDrum.playHihatOpen(this.drumStyle, velocity);
        break;
      case 'crash':
        this.professionalDrum.playCrash(velocity);
        break;
      case 'ride':
        this.professionalDrum.playRide(velocity);
        break;
      case 'tom-high':
        this.professionalDrum.playTom('high', velocity);
        break;
      case 'tom-mid':
        this.professionalDrum.playTom('mid', velocity);
        break;
      case 'tom-low':
        this.professionalDrum.playTom('low', velocity);
        break;
      default:
    }
  }

  /**
   * Parar padrão
   */
  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentBeat = 0;
  }

  /**
   * Ajustar BPM
   */
  setBPM(bpm) {
    const wasPlaying = this.isPlaying;
    if (wasPlaying) {
      this.stop();
    }
    this.bpm = bpm;
    if (wasPlaying) {
      this.playPattern(this.currentGenre, this.currentStyle, this.bpm);
    }
  }

  /**
   * Ajustar volume
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.professionalDrum) {
      this.professionalDrum.setVolume(this.volume);
    }
  }

  /**
   * Ajustar estilo de bateria
   */
  setDrumStyle(style) {
    if (['acoustic', 'electronic', 'rock'].includes(style)) {
      this.drumStyle = style;
    }
  }
}

export default DrumEngineV2;

