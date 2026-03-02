/**
 * DrumSampleEngine - Gerenciador de samples de bateria
 * 
 * Responsabilidades:
 * - Carregar kits de bateria
 * - Reproduzir peças individuais (kick, snare, hihat, tom, crash, etc.)
 * - Reproduzir padrões rítmicos
 * - Suporte a múltiplos estilos (acoustic, electronic, rock, etc.)
 */

class DrumSampleEngine {
  constructor(sampleEngine) {
    this.sampleEngine = sampleEngine;
    this.currentKit = null;
    this.kits = new Map();
    this.currentPattern = null;
    this.patternPlaying = false;
    this.patternStartTime = 0;
    this.bpm = 120;
    
    // Tipos de bateria disponíveis
    this.drumTypes = [
      'kick',
      'snare',
      'hihat-closed',
      'hihat-open',
      'tom-high',
      'tom-mid',
      'tom-low',
      'crash',
      'ride',
      'cowbell',
      'tambourine',
      'shaker'
    ];

    // Padrões de bateria (144 padrões - 6 estilos x 24 padrões)
    this.patterns = this.generatePatterns();
  }

  /**
   * Gerar 144 padrões de bateria
   * Formato: 6 estilos x 24 padrões por estilo
   */
  generatePatterns() {
    const styles = ['rock', 'blues', 'jazz', 'bossa', 'funk', 'balada'];
    const patterns = {};

    styles.forEach(style => {
      patterns[style] = this.generateStylePatterns(style);
    });

    return patterns;
  }

  /**
   * Gerar 24 padrões para um estilo específico
   */
  generateStylePatterns(style) {
    const patterns = [];
    
    // Cada padrão tem 16 steps (1 compasso em 4/4 com 16ª notas)
    for (let i = 0; i < 24; i++) {
      patterns.push(this.generatePattern(style, i));
    }
    
    return patterns;
  }

  /**
   * Gerar um padrão específico baseado no estilo
   */
  generatePattern(style, index) {
    const pattern = {
      name: `${style.charAt(0).toUpperCase() + style.slice(1)} ${index + 1}`,
      style,
      steps: []
    };

    // Gerar 16 steps
    for (let step = 0; step < 16; step++) {
      const stepData = {
        step,
        drums: []
      };

      // Padrões base para cada estilo
      switch (style) {
        case 'rock':
          stepData.drums = this.generateRockPattern(step);
          break;
        case 'blues':
          stepData.drums = this.generateBluesPattern(step);
          break;
        case 'jazz':
          stepData.drums = this.generateJazzPattern(step);
          break;
        case 'bossa':
          stepData.drums = this.generateBossaPattern(step);
          break;
        case 'funk':
          stepData.drums = this.generateFunkPattern(step);
          break;
        case 'balada':
          stepData.drums = this.generateBaladaPattern(step);
          break;
      }

      // Adicionar variação baseada no índice do padrão
      if (index > 0) {
        stepData.drums = this.addPatternVariation(stepData.drums, index);
      }

      pattern.steps.push(stepData);
    }

    return pattern;
  }

  /**
   * Padrão Rock
   */
  generateRockPattern(step) {
    const drums = [];
    
    // Kick: 1, 3, 5, 7, 9, 11, 13, 15 (8ª notas)
    if ([0, 2, 4, 6, 8, 10, 12, 14].includes(step)) {
      drums.push({ type: 'kick', velocity: 0.9 });
    }
    
    // Snare: 4, 12 (2 e 4)
    if ([4, 12].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.8 });
    }
    
    // Hihat fechado: todos os steps
    if (step % 2 === 0) {
      drums.push({ type: 'hihat-closed', velocity: 0.6 });
    }

    return drums;
  }

  /**
   * Padrão Blues
   */
  generateBluesPattern(step) {
    const drums = [];
    
    // Kick: 1, 3, 5, 7, 9, 11, 13, 15 com swing
    if ([0, 2, 4, 6, 8, 10, 12, 14].includes(step)) {
      drums.push({ type: 'kick', velocity: 0.85 });
    }
    
    // Snare: 4, 12 com ghost notes
    if ([4, 12].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.85 });
    } else if ([3, 5, 11, 13].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.3 }); // Ghost notes
    }
    
    // Hihat: shuffle pattern
    if (step % 3 === 0 || step % 3 === 2) {
      drums.push({ type: 'hihat-closed', velocity: 0.5 });
    }

    return drums;
  }

  /**
   * Padrão Jazz
   */
  generateJazzPattern(step) {
    const drums = [];
    
    // Kick: syncopado
    if ([0, 3, 6, 9, 12].includes(step)) {
      drums.push({ type: 'kick', velocity: 0.7 });
    }
    
    // Snare: 4, 12
    if ([4, 12].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.8 });
    }
    
    // Ride cymbal: jazz swing
    if (step % 3 === 0) {
      drums.push({ type: 'ride', velocity: 0.6 });
    }

    return drums;
  }

  /**
   * Padrão Bossa Nova
   */
  generateBossaPattern(step) {
    const drums = [];
    
    // Kick: padrão típico de bossa
    if ([0, 3, 6, 9, 12].includes(step)) {
      drums.push({ type: 'kick', velocity: 0.75 });
    }
    
    // Snare: 4, 12
    if ([4, 12].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.75 });
    }
    
    // Hihat: padrão de bossa
    if ([1, 3, 5, 7, 9, 11, 13, 15].includes(step)) {
      drums.push({ type: 'hihat-closed', velocity: 0.5 });
    }

    return drums;
  }

  /**
   * Padrão Funk
   */
  generateFunkPattern(step) {
    const drums = [];
    
    // Kick: syncopado e groovy
    if ([0, 2, 5, 8, 10, 13].includes(step)) {
      drums.push({ type: 'kick', velocity: 0.9 });
    }
    
    // Snare: 4, 12 com ghost notes
    if ([4, 12].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.85 });
    } else if ([3, 5, 11, 13].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.25 });
    }
    
    // Hihat: 16ª notas
    if (step % 1 === 0) {
      drums.push({ type: 'hihat-closed', velocity: 0.4 });
    }

    return drums;
  }

  /**
   * Padrão Balada
   */
  generateBaladaPattern(step) {
    const drums = [];
    
    // Kick: simples e melódico
    if ([0, 4, 8, 12].includes(step)) {
      drums.push({ type: 'kick', velocity: 0.7 });
    }
    
    // Snare: 4, 12
    if ([4, 12].includes(step)) {
      drums.push({ type: 'snare', velocity: 0.8 });
    }
    
    // Hihat: aberto para mais espaço
    if ([0, 4, 8, 12].includes(step)) {
      drums.push({ type: 'hihat-open', velocity: 0.5 });
    }

    return drums;
  }

  /**
   * Adicionar variação a um padrão
   */
  addPatternVariation(drums, variationIndex) {
    const varied = [...drums];
    
    // Adicionar fills e variações baseadas no índice
    const variation = variationIndex % 4;
    
    switch (variation) {
      case 1:
        // Adicionar tom high
        if (Math.random() > 0.5) {
          varied.push({ type: 'tom-high', velocity: 0.6 });
        }
        break;
      case 2:
        // Adicionar crash
        if (Math.random() > 0.7) {
          varied.push({ type: 'crash', velocity: 0.7 });
        }
        break;
      case 3:
        // Adicionar shaker
        if (Math.random() > 0.6) {
          varied.push({ type: 'shaker', velocity: 0.5 });
        }
        break;
    }
    
    return varied;
  }

  /**
   * Carregar kit de bateria
   * @param {string} kitName - Nome do kit (e.g., 'acoustic', 'electronic', 'rock')
   */
  async loadDrumKit(kitName = 'rock') {
    try {
      const kit = {
        name: kitName,
        samples: {}
      };

      // URLs base dos samples (será substituído por URLs reais)
      const baseUrl = `/samples/drums/${kitName}`;

      // Carregar samples para cada tipo de bateria
      for (const drumType of this.drumTypes) {
        try {
          const url = `${baseUrl}/${drumType}.wav`;
          kit.samples[drumType] = await this.sampleEngine.loadSample(url);
        } catch (error) {
          // Continuar com outros samples mesmo se um falhar
        }
      }

      this.currentKit = kit;
      this.kits.set(kitName, kit);
      
      return kit;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reproduzir peça individual de bateria
   * @param {string} drumType - Tipo de bateria
   * @param {number} velocity - Velocidade (0-1)
   * @param {object} options - Opções adicionais
   */
  playDrum(drumType, velocity = 1.0, options = {}) {
    if (!this.currentKit || !this.currentKit.samples[drumType]) {
      return null;
    }

    const buffer = this.currentKit.samples[drumType];
    
    return this.sampleEngine.playSample(buffer, {
      volume: velocity,
      ...options
    });
  }

  /**
   * Reproduzir padrão rítmico
   * @param {object} pattern - Padrão a reproduzir
   * @param {number} bpm - BPM
   * @param {boolean} loop - Loop?
   */
  async playPattern(pattern, bpm = 120, loop = false) {
    if (!this.currentKit) {
      return;
    }

    this.bpm = bpm;
    this.currentPattern = pattern;
    this.patternPlaying = true;

    // Calcular duração de cada step em segundos
    // 1 compasso = 4 tempos = 16 steps
    // Duração do compasso = 60 / BPM * 4 segundos
    const compassDuration = (60 / bpm) * 4;
    const stepDuration = compassDuration / 16;

    try {
      do {
        for (let stepIndex = 0; stepIndex < pattern.steps.length; stepIndex++) {
          if (!this.patternPlaying) {
            return;
          }

          const step = pattern.steps[stepIndex];
          const stepTime = stepIndex * stepDuration;

          // Agendar reprodução de cada drum neste step
          for (const drum of step.drums) {
            setTimeout(() => {
              if (this.patternPlaying) {
                this.playDrum(drum.type, drum.velocity);
              }
            }, stepTime * 1000);
          }
        }

        if (!loop) {
          this.patternPlaying = false;
          break;
        }

        // Aguardar fim do padrão antes de repetir
        await new Promise(resolve => 
          setTimeout(resolve, compassDuration * 1000)
        );
      } while (loop && this.patternPlaying);
    } catch (error) {
      this.patternPlaying = false;
    }
  }

  /**
   * Parar padrão
   */
  stopPattern() {
    this.patternPlaying = false;
    this.currentPattern = null;
  }

  /**
   * Obter lista de padrões para um estilo
   */
  getPatterns(style) {
    return this.patterns[style] || [];
  }

  /**
   * Obter lista de estilos disponíveis
   */
  getStyles() {
    return Object.keys(this.patterns);
  }

  /**
   * Obter lista de tipos de bateria
   */
  getDrumTypes() {
    return this.drumTypes;
  }

  /**
   * Definir BPM
   */
  setBPM(bpm) {
    this.bpm = Math.max(40, Math.min(300, bpm));
  }

  /**
   * Obter BPM atual
   */
  getBPM() {
    return this.bpm;
  }

  /**
   * Verificar se padrão está tocando
   */
  isPlaying() {
    return this.patternPlaying;
  }
}

export default DrumSampleEngine;
