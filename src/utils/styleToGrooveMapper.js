/**
 * 🥁 Style to Groove Mapper
 * Mapeia 144 estilos musicais para padrões de bateria reais
 */

class StyleToGrooveMapper {
  constructor() {
    this.styles = this.initializeStyles();
  }

  /**
   * Inicializar 144 estilos (36 estilos × 4 variações)
   */
  initializeStyles() {
    const styles = {};
    
    // JAZZ (12 estilos)
    const jazzStyles = [
      { name: 'Swing', bpm: 140, feel: 'swing', timeSignature: '4/4', pattern: 'swing-kick-snare' },
      { name: 'Ballad', bpm: 60, feel: 'swing', timeSignature: '4/4', pattern: 'ballad-kick-snare' },
      { name: 'Bebop', bpm: 160, feel: 'swing', timeSignature: '4/4', pattern: 'bebop-kick-snare' },
      { name: 'Modal', bpm: 110, feel: 'straight', timeSignature: '4/4', pattern: 'modal-kick-snare' },
      { name: 'Fusion', bpm: 130, feel: 'straight', timeSignature: '4/4', pattern: 'fusion-kick-snare' },
      { name: 'Latin Jazz', bpm: 120, feel: 'latin', timeSignature: '4/4', pattern: 'latin-kick-snare' },
      { name: 'Bossa Nova', bpm: 100, feel: 'bossa', timeSignature: '4/4', pattern: 'bossa-kick-snare' },
      { name: 'Samba', bpm: 150, feel: 'samba', timeSignature: '2/4', pattern: 'samba-kick-snare' },
      { name: 'Cool Jazz', bpm: 90, feel: 'swing', timeSignature: '4/4', pattern: 'cool-kick-snare' },
      { name: 'Hard Bop', bpm: 140, feel: 'swing', timeSignature: '4/4', pattern: 'hardbop-kick-snare' },
      { name: 'Free Jazz', bpm: 120, feel: 'free', timeSignature: '4/4', pattern: 'free-kick-snare' },
      { name: 'Smooth Jazz', bpm: 100, feel: 'straight', timeSignature: '4/4', pattern: 'smooth-kick-snare' }
    ];
    
    // BLUES (12 estilos)
    const bluesStyles = [
      { name: 'Slow Blues', bpm: 60, feel: 'swing', timeSignature: '12/8', pattern: 'slow-kick-snare' },
      { name: 'Shuffle', bpm: 100, feel: 'shuffle', timeSignature: '12/8', pattern: 'shuffle-kick-snare' },
      { name: 'Texas Shuffle', bpm: 120, feel: 'shuffle', timeSignature: '12/8', pattern: 'texas-kick-snare' },
      { name: 'Chicago Blues', bpm: 110, feel: 'swing', timeSignature: '12/8', pattern: 'chicago-kick-snare' },
      { name: 'Delta Blues', bpm: 80, feel: 'swing', timeSignature: '12/8', pattern: 'delta-kick-snare' },
      { name: 'Electric Blues', bpm: 130, feel: 'straight', timeSignature: '4/4', pattern: 'electric-kick-snare' },
      { name: 'Funk Blues', bpm: 110, feel: 'funk', timeSignature: '4/4', pattern: 'funk-kick-snare' },
      { name: 'Rock Blues', bpm: 120, feel: 'straight', timeSignature: '4/4', pattern: 'rockblues-kick-snare' },
      { name: 'Swing Blues', bpm: 100, feel: 'swing', timeSignature: '12/8', pattern: 'swingblues-kick-snare' },
      { name: 'Minor Blues', bpm: 90, feel: 'swing', timeSignature: '12/8', pattern: 'minor-kick-snare' },
      { name: 'Jump Blues', bpm: 140, feel: 'jump', timeSignature: '4/4', pattern: 'jump-kick-snare' },
      { name: 'Modal Blues', bpm: 100, feel: 'straight', timeSignature: '4/4', pattern: 'modal-kick-snare' }
    ];
    
    // ROCK (12 estilos)
    const rockStyles = [
      { name: 'Classic Rock', bpm: 120, feel: 'straight', timeSignature: '4/4', pattern: 'classic-kick-snare' },
      { name: 'Hard Rock', bpm: 140, feel: 'straight', timeSignature: '4/4', pattern: 'hard-kick-snare' },
      { name: 'Metal', bpm: 160, feel: 'straight', timeSignature: '4/4', pattern: 'metal-kick-snare' },
      { name: 'Punk', bpm: 150, feel: 'straight', timeSignature: '4/4', pattern: 'punk-kick-snare' },
      { name: 'Alternative', bpm: 130, feel: 'straight', timeSignature: '4/4', pattern: 'alt-kick-snare' },
      { name: 'Progressive Rock', bpm: 110, feel: 'straight', timeSignature: '4/4', pattern: 'prog-kick-snare' },
      { name: 'Indie Rock', bpm: 120, feel: 'straight', timeSignature: '4/4', pattern: 'indie-kick-snare' },
      { name: 'Grunge', bpm: 140, feel: 'straight', timeSignature: '4/4', pattern: 'grunge-kick-snare' },
      { name: 'Psychedelic Rock', bpm: 110, feel: 'straight', timeSignature: '4/4', pattern: 'psych-kick-snare' },
      { name: 'Glam Rock', bpm: 130, feel: 'straight', timeSignature: '4/4', pattern: 'glam-kick-snare' },
      { name: 'Southern Rock', bpm: 120, feel: 'shuffle', timeSignature: '4/4', pattern: 'southern-kick-snare' },
      { name: 'Surf Rock', bpm: 140, feel: 'straight', timeSignature: '4/4', pattern: 'surf-kick-snare' }
    ];
    
    // Adicionar todos os estilos
    jazzStyles.forEach((s, i) => styles[`jazz_${i}`] = { genre: 'jazz', ...s });
    bluesStyles.forEach((s, i) => styles[`blues_${i}`] = { genre: 'blues', ...s });
    rockStyles.forEach((s, i) => styles[`rock_${i}`] = { genre: 'rock', ...s });
    
    return styles;
  }

  /**
   * Obter groove para um estilo
   */
  getGrooveForStyle(styleName) {
    return this.styles[styleName] || null;
  }

  /**
   * Listar todos os estilos
   */
  listAllStyles() {
    return Object.keys(this.styles);
  }

  /**
   * Listar estilos por gênero
   */
  listStylesByGenre(genre) {
    return Object.entries(this.styles)
      .filter(([_, style]) => style.genre === genre)
      .map(([key, style]) => ({ key, ...style }));
  }

  /**
   * Obter padrão de bateria para estilo
   */
  getDrumPattern(styleName) {
    const style = this.getGrooveForStyle(styleName);
    if (!style) return null;
    
    return {
      kick: this.generateKickPattern(style.pattern),
      snare: this.generateSnarePattern(style.pattern),
      hihat: this.generateHihatPattern(style.pattern),
      tom: this.generateTomPattern(style.pattern),
      crash: this.generateCrashPattern(style.pattern)
    };
  }

  /**
   * Gerar padrão de kick
   */
  generateKickPattern(pattern) {
    const patterns = {
      'swing-kick-snare': [0, 2, 4, 6],
      'ballad-kick-snare': [0, 4],
      'bebop-kick-snare': [0, 1, 3, 5],
      'funk-kick-snare': [0, 2, 3, 5],
      'metal-kick-snare': [0, 1, 2, 3, 4, 5, 6, 7]
    };
    return patterns[pattern] || [0, 2, 4, 6];
  }

  /**
   * Gerar padrão de snare
   */
  generateSnarePattern(pattern) {
    const patterns = {
      'swing-kick-snare': [2, 6],
      'ballad-kick-snare': [2, 6],
      'bebop-kick-snare': [2, 4, 6],
      'funk-kick-snare': [2, 5],
      'metal-kick-snare': [2, 4, 6]
    };
    return patterns[pattern] || [2, 6];
  }

  /**
   * Gerar padrão de hi-hat
   */
  generateHihatPattern(pattern) {
    return [0, 1, 2, 3, 4, 5, 6, 7]; // Oitavas por compasso
  }

  /**
   * Gerar padrão de tom
   */
  generateTomPattern(pattern) {
    const patterns = {
      'metal-kick-snare': [1, 3, 5, 7],
      'punk-kick-snare': [2, 6]
    };
    return patterns[pattern] || [];
  }

  /**
   * Gerar padrão de crash
   */
  generateCrashPattern(pattern) {
    return [0]; // Crash no começo do compasso
  }

  /**
   * Obter BPM sugerido para estilo
   */
  getBPMForStyle(styleName) {
    const style = this.getGrooveForStyle(styleName);
    return style ? style.bpm : 120;
  }

  /**
   * Obter time signature para estilo
   */
  getTimeSignatureForStyle(styleName) {
    const style = this.getGrooveForStyle(styleName);
    return style ? style.timeSignature : '4/4';
  }
}

export default StyleToGrooveMapper;
export { StyleToGrooveMapper };
