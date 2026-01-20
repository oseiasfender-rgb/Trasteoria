/**
 * samplesConfig.js - Configuração de samples para TrasTeoria
 * 
 * Este arquivo centraliza todas as configurações de samples:
 * - Mapeamento de instrumentos
 * - Fontes de samples (local, CDN, Freesound, etc.)
 * - Configurações de cache
 * - Fallbacks para samples não disponíveis
 */

export const SAMPLES_CONFIG = {
  // Versão da configuração
  version: '2.0',
  
  // Diretório base de samples
  baseDir: '/samples',
  
  // Configurações de cache
  cache: {
    enabled: true,
    maxSize: 100 * 1024 * 1024, // 100 MB
    ttl: 24 * 60 * 60 * 1000 // 24 horas
  },

  // Instrumentos de Bateria
  drums: {
    enabled: true,
    directory: '/samples/drums',
    styles: {
      rock: {
        name: 'Rock',
        patterns: 24,
        bpm: 120,
        samples: ['kick', 'snare', 'hihat_closed', 'hihat_open', 'tom_high', 'tom_mid', 'tom_low', 'crash', 'ride']
      },
      blues: {
        name: 'Blues',
        patterns: 24,
        bpm: 100,
        samples: ['kick', 'snare', 'hihat_closed', 'hihat_open', 'tom_high', 'tom_mid', 'tom_low', 'crash', 'ride']
      },
      jazz: {
        name: 'Jazz',
        patterns: 24,
        bpm: 110,
        samples: ['kick', 'snare', 'hihat_closed', 'hihat_open', 'tom_high', 'tom_mid', 'tom_low', 'crash', 'ride']
      },
      bossa: {
        name: 'Bossa Nova',
        patterns: 24,
        bpm: 100,
        samples: ['kick', 'snare', 'hihat_closed', 'hihat_open', 'tom_high', 'tom_mid', 'tom_low', 'crash', 'ride']
      },
      funk: {
        name: 'Funk',
        patterns: 24,
        bpm: 110,
        samples: ['kick', 'snare', 'hihat_closed', 'hihat_open', 'tom_high', 'tom_mid', 'tom_low', 'crash', 'ride']
      },
      ballad: {
        name: 'Balada',
        patterns: 24,
        bpm: 80,
        samples: ['kick', 'snare', 'hihat_closed', 'hihat_open', 'tom_high', 'tom_mid', 'tom_low', 'crash', 'ride']
      }
    }
  },

  // Instrumentos de Baixo
  bass: {
    enabled: true,
    directory: '/samples/bass',
    styles: {
      fingerstyle: {
        name: 'Fingerstyle',
        notes: 36,
        range: { low: 'B0', high: 'G2' }
      },
      slap: {
        name: 'Slap',
        notes: 36,
        range: { low: 'B0', high: 'G2' }
      },
      pick: {
        name: 'Pick',
        notes: 36,
        range: { low: 'B0', high: 'G2' }
      }
    }
  },

  // Teclados e Pianos
  keyboards: {
    enabled: true,
    directory: '/samples/keyboards',
    timbres: {
      acoustic_piano: {
        name: 'Piano Acústico',
        category: 'piano',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/acoustic_piano' },
          { type: 'fallback', path: '/samples/keyboards/acoustic_piano_fallback' }
        ]
      },
      electric_piano: {
        name: 'Piano Elétrico',
        category: 'piano',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/electric_piano' },
          { type: 'fallback', path: '/samples/keyboards/electric_piano_fallback' }
        ]
      },
      hammond_organ: {
        name: 'Órgão Hammond',
        category: 'organ',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/hammond_organ' },
          { type: 'fallback', path: '/samples/keyboards/hammond_organ_fallback' }
        ]
      },
      analog_synth: {
        name: 'Sintetizador Analógico',
        category: 'synth',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/analog_synth' },
          { type: 'fallback', path: '/samples/keyboards/analog_synth_fallback' }
        ]
      },
      digital_synth: {
        name: 'Sintetizador Digital',
        category: 'synth',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/digital_synth' },
          { type: 'fallback', path: '/samples/keyboards/digital_synth_fallback' }
        ]
      },
      synth_pad: {
        name: 'Pad Sintetizado',
        category: 'synth',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/synth_pad' },
          { type: 'fallback', path: '/samples/keyboards/synth_pad_fallback' }
        ]
      },
      synth_lead: {
        name: 'Lead Sintetizado',
        category: 'synth',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/synth_lead' },
          { type: 'fallback', path: '/samples/keyboards/synth_lead_fallback' }
        ]
      },
      synth_strings: {
        name: 'Strings Sintetizadas',
        category: 'synth',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/synth_strings' },
          { type: 'fallback', path: '/samples/keyboards/synth_strings_fallback' }
        ]
      },
      vibraphone: {
        name: 'Vibraphone',
        category: 'percussion',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/vibraphone' },
          { type: 'fallback', path: '/samples/keyboards/vibraphone_fallback' }
        ]
      },
      marimba: {
        name: 'Marimba',
        category: 'percussion',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/marimba' },
          { type: 'fallback', path: '/samples/keyboards/marimba_fallback' }
        ]
      },
      xylophone: {
        name: 'Xilofone',
        category: 'percussion',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/xylophone' },
          { type: 'fallback', path: '/samples/keyboards/xylophone_fallback' }
        ]
      },
      harpsichord: {
        name: 'Clavicórdio',
        category: 'piano',
        notes: 88,
        range: { low: 'A0', high: 'C8' },
        sources: [
          { type: 'local', path: '/samples/keyboards/harpsichord' },
          { type: 'fallback', path: '/samples/keyboards/harpsichord_fallback' }
        ]
      }
    }
  },

  // Instrumentos de Cordas
  strings: {
    enabled: true,
    directory: '/samples/strings',
    timbres: {
      violin: {
        name: 'Violino',
        category: 'strings',
        notes: 60,
        range: { low: 'G3', high: 'E7' },
        techniques: ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'],
        sources: [
          { type: 'local', path: '/samples/strings/violin' },
          { type: 'philharmonia', url: 'https://philharmonia.co.uk/resources/sound-samples/' },
          { type: 'fallback', path: '/samples/strings/violin_fallback' }
        ]
      },
      viola: {
        name: 'Viola',
        category: 'strings',
        notes: 48,
        range: { low: 'C3', high: 'E6' },
        techniques: ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'],
        sources: [
          { type: 'local', path: '/samples/strings/viola' },
          { type: 'philharmonia', url: 'https://philharmonia.co.uk/resources/sound-samples/' },
          { type: 'fallback', path: '/samples/strings/viola_fallback' }
        ]
      },
      cello: {
        name: 'Violoncelo',
        category: 'strings',
        notes: 48,
        range: { low: 'C2', high: 'E5' },
        techniques: ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'],
        sources: [
          { type: 'local', path: '/samples/strings/cello' },
          { type: 'philharmonia', url: 'https://philharmonia.co.uk/resources/sound-samples/' },
          { type: 'fallback', path: '/samples/strings/cello_fallback' }
        ]
      },
      double_bass: {
        name: 'Contrabaixo',
        category: 'strings',
        notes: 36,
        range: { low: 'E1', high: 'E4' },
        techniques: ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'],
        sources: [
          { type: 'local', path: '/samples/strings/double_bass' },
          { type: 'philharmonia', url: 'https://philharmonia.co.uk/resources/sound-samples/' },
          { type: 'fallback', path: '/samples/strings/double_bass_fallback' }
        ]
      },
      solo_violin: {
        name: 'Violino Solista',
        category: 'strings',
        notes: 60,
        range: { low: 'G3', high: 'E7' },
        techniques: ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'],
        sources: [
          { type: 'local', path: '/samples/strings/solo_violin' },
          { type: 'fallback', path: '/samples/strings/solo_violin_fallback' }
        ]
      },
      ensemble_violin: {
        name: 'Violinos Ensemble',
        category: 'strings',
        notes: 60,
        range: { low: 'G3', high: 'E7' },
        techniques: ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'],
        sources: [
          { type: 'local', path: '/samples/strings/ensemble_violin' },
          { type: 'fallback', path: '/samples/strings/ensemble_violin_fallback' }
        ]
      },
      orchestral_strings: {
        name: 'Cordas Orquestrais',
        category: 'strings',
        notes: 60,
        range: { low: 'E1', high: 'E7' },
        techniques: ['arco', 'pizzicato', 'tremolo', 'staccato', 'legato', 'spiccato'],
        sources: [
          { type: 'local', path: '/samples/strings/orchestral_strings' },
          { type: 'philharmonia', url: 'https://philharmonia.co.uk/resources/sound-samples/' },
          { type: 'fallback', path: '/samples/strings/orchestral_strings_fallback' }
        ]
      }
    }
  },

  // Fontes de samples externas
  sources: {
    freesound: {
      name: 'Freesound.org',
      url: 'https://freesound.org',
      apiUrl: 'https://freesound.org/api/v2',
      requiresAuth: true,
      license: 'Creative Commons'
    },
    philharmonia: {
      name: 'Philharmonia Orchestra',
      url: 'https://philharmonia.co.uk/resources/sound-samples/',
      requiresAuth: false,
      license: 'Free to use'
    },
    pixabay: {
      name: 'Pixabay Sound Effects',
      url: 'https://pixabay.com/sound-effects',
      requiresAuth: false,
      license: 'Creative Commons'
    },
    zapsplat: {
      name: 'Zapsplat',
      url: 'https://www.zapsplat.com',
      requiresAuth: false,
      license: 'Creative Commons'
    }
  },

  // Configurações de fallback
  fallback: {
    enabled: true,
    strategy: 'synthesize', // 'synthesize' ou 'silence'
    synthesizer: 'web-audio-api'
  },

  // Configurações de compressão
  compression: {
    enabled: true,
    format: 'mp3', // 'mp3', 'ogg', 'wav'
    bitrate: 192 // kbps
  },

  // Configurações de streaming
  streaming: {
    enabled: true,
    chunkSize: 64 * 1024, // 64 KB
    bufferSize: 512 * 1024 // 512 KB
  }
};

/**
 * Obter configuração de um instrumento
 */
export function getInstrumentConfig(instrumentType, instrumentId) {
  const config = SAMPLES_CONFIG[instrumentType];
  if (!config) return null;

  if (instrumentType === 'keyboards' || instrumentType === 'strings') {
    return config.timbres[instrumentId];
  }

  return config;
}

/**
 * Obter todas as fontes de um instrumento
 */
export function getInstrumentSources(instrumentType, instrumentId) {
  const config = getInstrumentConfig(instrumentType, instrumentId);
  return config?.sources || [];
}

/**
 * Obter diretório de um instrumento
 */
export function getInstrumentDirectory(instrumentType, instrumentId) {
  const config = getInstrumentConfig(instrumentType, instrumentId);
  
  if (instrumentType === 'keyboards' || instrumentType === 'strings') {
    return `${SAMPLES_CONFIG[instrumentType].directory}/${instrumentId}`;
  }

  return SAMPLES_CONFIG[instrumentType].directory;
}

/**
 * Verificar se um instrumento está habilitado
 */
export function isInstrumentEnabled(instrumentType) {
  return SAMPLES_CONFIG[instrumentType]?.enabled || false;
}

/**
 * Obter todas as técnicas de um instrumento
 */
export function getInstrumentTechniques(instrumentType, instrumentId) {
  const config = getInstrumentConfig(instrumentType, instrumentId);
  return config?.techniques || [];
}

/**
 * Obter range de um instrumento
 */
export function getInstrumentRange(instrumentType, instrumentId) {
  const config = getInstrumentConfig(instrumentType, instrumentId);
  return config?.range || null;
}

export default SAMPLES_CONFIG;
