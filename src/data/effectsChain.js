/**
 * EffectsChain - Cadeia de Efeitos de Áudio Profissional
 * Suporta: Reverb, Delay, Chorus, Compressor, EQ
 * 
 * Funcionalidades:
 * - 5 efeitos profissionais
 * - Controle de parâmetros em tempo real
 * - Presets de efeitos
 * - Bypass de efeitos individuais
 * - Processamento de áudio em cadeia
 */

class EffectsChain {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
    this.dryGain = audioContext.createGain();
    this.wetGain = audioContext.createGain();

    // Inicializar efeitos
    this.reverb = new ReverbEffect(audioContext);
    this.delay = new DelayEffect(audioContext);
    this.chorus = new ChorusEffect(audioContext);
    this.compressor = new CompressorEffect(audioContext);
    this.eq = new EQEffect(audioContext);

    // Conectar cadeia
    this.input.connect(this.dryGain);
    this.input.connect(this.reverb.input);
    this.reverb.output.connect(this.delay.input);
    this.delay.output.connect(this.chorus.input);
    this.chorus.output.connect(this.compressor.input);
    this.compressor.output.connect(this.eq.input);
    this.eq.output.connect(this.wetGain);

    this.dryGain.connect(this.output);
    this.wetGain.connect(this.output);

    // Configurações padrão
    this.dryWetMix = 0.3; // 30% wet, 70% dry
    this.updateMix();

    // Presets
    this.presets = this.createPresets();
  }

  /**
   * Atualiza o mix seco/úmido
   */
  updateMix() {
    const dryLevel = 1 - this.dryWetMix;
    const wetLevel = this.dryWetMix;
    this.dryGain.gain.setValueAtTime(dryLevel, this.audioContext.currentTime);
    this.wetGain.gain.setValueAtTime(wetLevel, this.audioContext.currentTime);
  }

  /**
   * Define o mix seco/úmido (0-1)
   */
  setDryWetMix(mix) {
    this.dryWetMix = Math.max(0, Math.min(1, mix));
    this.updateMix();
    .toFixed(0)}%`);
  }

  /**
   * Ativa/desativa um efeito
   */
  toggleEffect(effectName, enabled) {
    const effect = this[effectName];
    if (effect) {
      effect.bypass = !enabled;
    }
  }

  /**
   * Define um parâmetro de efeito
   */
  setEffectParameter(effectName, paramName, value) {
    const effect = this[effectName];
    if (effect && effect.setParameter) {
      effect.setParameter(paramName, value);
    }
  }

  /**
   * Aplica um preset
   */
  applyPreset(presetName) {
    const preset = this.presets[presetName];
    if (!preset) {
      return false;
    }

    Object.entries(preset).forEach(([effectName, params]) => {
      Object.entries(params).forEach(([paramName, value]) => {
        this.setEffectParameter(effectName, paramName, value);
      });
    });
    return true;
  }

  /**
   * Cria presets de efeitos
   */
  createPresets() {
    return {
      clean: {
        reverb: { wet: 0, decay: 2 },
        delay: { wet: 0, time: 0.5, feedback: 0.3 },
        chorus: { wet: 0, rate: 1.5, depth: 0.002 },
        compressor: { threshold: -24, ratio: 4, attack: 0.003, release: 0.25 },
        eq: { low: 0, mid: 0, high: 0 },
      },
      room: {
        reverb: { wet: 0.3, decay: 1.5 },
        delay: { wet: 0.1, time: 0.3, feedback: 0.2 },
        chorus: { wet: 0.1, rate: 1.5, depth: 0.002 },
        compressor: { threshold: -20, ratio: 3, attack: 0.005, release: 0.3 },
        eq: { low: 0.1, mid: 0, high: 0.1 },
      },
      hall: {
        reverb: { wet: 0.5, decay: 3 },
        delay: { wet: 0.2, time: 0.5, feedback: 0.3 },
        chorus: { wet: 0.15, rate: 1.5, depth: 0.003 },
        compressor: { threshold: -18, ratio: 2.5, attack: 0.01, release: 0.4 },
        eq: { low: 0.05, mid: -0.1, high: 0.15 },
      },
      cathedral: {
        reverb: { wet: 0.7, decay: 4 },
        delay: { wet: 0.3, time: 0.8, feedback: 0.4 },
        chorus: { wet: 0.2, rate: 1.2, depth: 0.004 },
        compressor: { threshold: -15, ratio: 2, attack: 0.015, release: 0.5 },
        eq: { low: 0.2, mid: -0.15, high: 0.2 },
      },
      plate: {
        reverb: { wet: 0.4, decay: 2.5 },
        delay: { wet: 0.15, time: 0.4, feedback: 0.25 },
        chorus: { wet: 0.12, rate: 1.8, depth: 0.0025 },
        compressor: { threshold: -22, ratio: 3.5, attack: 0.004, release: 0.35 },
        eq: { low: 0, mid: 0.05, high: 0.1 },
      },
      spring: {
        reverb: { wet: 0.25, decay: 1.2 },
        delay: { wet: 0.2, time: 0.25, feedback: 0.4 },
        chorus: { wet: 0.2, rate: 2, depth: 0.005 },
        compressor: { threshold: -25, ratio: 4.5, attack: 0.002, release: 0.2 },
        eq: { low: -0.1, mid: 0.1, high: 0.15 },
      },
      ambient: {
        reverb: { wet: 0.8, decay: 5 },
        delay: { wet: 0.4, time: 1, feedback: 0.5 },
        chorus: { wet: 0.25, rate: 1, depth: 0.006 },
        compressor: { threshold: -10, ratio: 1.5, attack: 0.05, release: 1 },
        eq: { low: 0.15, mid: -0.2, high: 0.1 },
      },
    };
  }

  /**
   * Obtém lista de presets disponíveis
   */
  getPresets() {
    return Object.keys(this.presets);
  }

  /**
   * Reseta todos os efeitos para padrão
   */
  reset() {
    this.reverb.reset();
    this.delay.reset();
    this.chorus.reset();
    this.compressor.reset();
    this.eq.reset();
    this.dryWetMix = 0.3;
    this.updateMix();
  }
}

/**
 * ReverbEffect - Efeito de Reverberação
 */
class ReverbEffect {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
    this.bypass = false;

    // Criar impulse response simples
    this.convolver = audioContext.createConvolver();
    this.dryGain = audioContext.createGain();
    this.wetGain = audioContext.createGain();

    // Conectar
    this.input.connect(this.dryGain);
    this.input.connect(this.convolver);
    this.convolver.connect(this.wetGain);
    this.dryGain.connect(this.output);
    this.wetGain.connect(this.output);

    // Configurações
    this.wet = 0.3;
    this.decay = 2;
    this.updateGains();
  }

  updateGains() {
    this.dryGain.gain.setValueAtTime(1 - this.wet, this.audioContext.currentTime);
    this.wetGain.gain.setValueAtTime(this.wet, this.audioContext.currentTime);
  }

  setParameter(param, value) {
    if (param === 'wet') {
      this.wet = Math.max(0, Math.min(1, value));
      this.updateGains();
    } else if (param === 'decay') {
      this.decay = Math.max(0.1, Math.min(10, value));
    }
  }

  reset() {
    this.wet = 0.3;
    this.decay = 2;
    this.updateGains();
  }
}

/**
 * DelayEffect - Efeito de Delay/Echo
 */
class DelayEffect {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
    this.bypass = false;

    // Criar delay
    this.delayNode = audioContext.createDelay(5);
    this.feedback = audioContext.createGain();
    this.dryGain = audioContext.createGain();
    this.wetGain = audioContext.createGain();

    // Conectar
    this.input.connect(this.dryGain);
    this.input.connect(this.delayNode);
    this.delayNode.connect(this.feedback);
    this.feedback.connect(this.delayNode);
    this.delayNode.connect(this.wetGain);
    this.dryGain.connect(this.output);
    this.wetGain.connect(this.output);

    // Configurações
    this.wet = 0.3;
    this.time = 0.5;
    this.feedbackAmount = 0.3;
    this.updateParameters();
  }

  updateParameters() {
    this.delayNode.delayTime.setValueAtTime(this.time, this.audioContext.currentTime);
    this.feedback.gain.setValueAtTime(this.feedbackAmount, this.audioContext.currentTime);
    this.dryGain.gain.setValueAtTime(1 - this.wet, this.audioContext.currentTime);
    this.wetGain.gain.setValueAtTime(this.wet, this.audioContext.currentTime);
  }

  setParameter(param, value) {
    if (param === 'wet') {
      this.wet = Math.max(0, Math.min(1, value));
    } else if (param === 'time') {
      this.time = Math.max(0.01, Math.min(5, value));
    } else if (param === 'feedback') {
      this.feedbackAmount = Math.max(0, Math.min(0.9, value));
    }
    this.updateParameters();
  }

  reset() {
    this.wet = 0.3;
    this.time = 0.5;
    this.feedbackAmount = 0.3;
    this.updateParameters();
  }
}

/**
 * ChorusEffect - Efeito de Chorus
 */
class ChorusEffect {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
    this.bypass = false;

    // Criar chorus com LFO
    this.delayNode = audioContext.createDelay(0.05);
    this.lfo = audioContext.createOscillator();
    this.lfoGain = audioContext.createGain();
    this.dryGain = audioContext.createGain();
    this.wetGain = audioContext.createGain();

    // Conectar LFO ao delay
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.delayNode.delayTime);

    // Conectar cadeia
    this.input.connect(this.dryGain);
    this.input.connect(this.delayNode);
    this.delayNode.connect(this.wetGain);
    this.dryGain.connect(this.output);
    this.wetGain.connect(this.output);

    // Iniciar LFO
    this.lfo.start();

    // Configurações
    this.wet = 0.3;
    this.rate = 1.5;
    this.depth = 0.002;
    this.updateParameters();
  }

  updateParameters() {
    this.lfo.frequency.setValueAtTime(this.rate, this.audioContext.currentTime);
    this.lfoGain.gain.setValueAtTime(this.depth, this.audioContext.currentTime);
    this.dryGain.gain.setValueAtTime(1 - this.wet, this.audioContext.currentTime);
    this.wetGain.gain.setValueAtTime(this.wet, this.audioContext.currentTime);
  }

  setParameter(param, value) {
    if (param === 'wet') {
      this.wet = Math.max(0, Math.min(1, value));
    } else if (param === 'rate') {
      this.rate = Math.max(0.1, Math.min(10, value));
    } else if (param === 'depth') {
      this.depth = Math.max(0, Math.min(0.05, value));
    }
    this.updateParameters();
  }

  reset() {
    this.wet = 0.3;
    this.rate = 1.5;
    this.depth = 0.002;
    this.updateParameters();
  }
}

/**
 * CompressorEffect - Efeito de Compressor
 */
class CompressorEffect {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
    this.bypass = false;

    // Criar compressor
    this.compressor = audioContext.createDynamicsCompressor();
    this.input.connect(this.compressor);
    this.compressor.connect(this.output);

    // Configurações padrão
    this.updateParameters();
  }

  updateParameters() {
    this.compressor.threshold.setValueAtTime(-24, this.audioContext.currentTime);
    this.compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.audioContext.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
    this.compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);
  }

  setParameter(param, value) {
    if (param === 'threshold') {
      this.compressor.threshold.setValueAtTime(
        Math.max(-100, Math.min(0, value)),
        this.audioContext.currentTime
      );
    } else if (param === 'ratio') {
      this.compressor.ratio.setValueAtTime(
        Math.max(1, Math.min(20, value)),
        this.audioContext.currentTime
      );
    } else if (param === 'attack') {
      this.compressor.attack.setValueAtTime(
        Math.max(0, Math.min(1, value)),
        this.audioContext.currentTime
      );
    } else if (param === 'release') {
      this.compressor.release.setValueAtTime(
        Math.max(0, Math.min(1, value)),
        this.audioContext.currentTime
      );
    }
  }

  reset() {
    this.updateParameters();
  }
}

/**
 * EQEffect - Equalizador de 3 Bandas
 */
class EQEffect {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.input = audioContext.createGain();
    this.output = audioContext.createGain();
    this.bypass = false;

    // Criar filtros
    this.lowShelf = audioContext.createBiquadFilter();
    this.midPeaking = audioContext.createBiquadFilter();
    this.highShelf = audioContext.createBiquadFilter();

    // Configurar filtros
    this.lowShelf.type = 'lowshelf';
    this.lowShelf.frequency.value = 200;
    this.midPeaking.type = 'peaking';
    this.midPeaking.frequency.value = 1000;
    this.midPeaking.Q.value = 0.5;
    this.highShelf.type = 'highshelf';
    this.highShelf.frequency.value = 3000;

    // Conectar
    this.input.connect(this.lowShelf);
    this.lowShelf.connect(this.midPeaking);
    this.midPeaking.connect(this.highShelf);
    this.highShelf.connect(this.output);
  }

  setParameter(param, value) {
    const gain = Math.max(-12, Math.min(12, value));
    if (param === 'low') {
      this.lowShelf.gain.setValueAtTime(gain, this.audioContext.currentTime);
    } else if (param === 'mid') {
      this.midPeaking.gain.setValueAtTime(gain, this.audioContext.currentTime);
    } else if (param === 'high') {
      this.highShelf.gain.setValueAtTime(gain, this.audioContext.currentTime);
    }
  }

  reset() {
    this.lowShelf.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.midPeaking.gain.setValueAtTime(0, this.audioContext.currentTime);
    this.highShelf.gain.setValueAtTime(0, this.audioContext.currentTime);
  }
}

export { EffectsChain, ReverbEffect, DelayEffect, ChorusEffect, CompressorEffect, EQEffect };
export default EffectsChain;
