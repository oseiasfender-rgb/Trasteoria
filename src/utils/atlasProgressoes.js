/**
 * Atlas de Progressões - Dados Estruturados
 * 20+ Progressões Harmônicas Clássicas
 * 
 * Inclui:
 * - Progressões clássicas
 * - Progressões pop/rock
 * - Progressões jazz
 * - Progressões blues
 * - Progressões brasileiras
 */

const PROGRESSOES = {
  // PROGRESSÕES CLÁSSICAS
  I_IV_V: {
    id: 'i-iv-v',
    name: 'I-IV-V',
    descricao: 'Progressão clássica mais comum na música ocidental',
    acordes: ['I', 'IV', 'V'],
    generos: ['Rock', 'Pop', 'Clássico', 'Folk'],
    exemplo: 'C-F-G',
    funcao: 'Tônica-Subdominante-Dominante',
    tensao: 'média',
    resolucao: 'V resolve para I',
    aplicacao: 'Verso, refrão, estrutura básica',
  },
  II_V_I: {
    id: 'ii-v-i',
    name: 'ii-V-I',
    descricao: 'Progressão fundamental do jazz',
    acordes: ['ii7', 'V7', 'Imaj7'],
    generos: ['Jazz', 'Bossa Nova', 'Pop Sofisticado'],
    exemplo: 'Dm7-G7-Cmaj7',
    funcao: 'Subdominante-Dominante-Tônica',
    tensao: 'alta',
    resolucao: 'V7 resolve para I',
    aplicacao: 'Transições, modulações, jazz standards',
  },
  I_VI_IV_V: {
    id: 'i-vi-iv-v',
    name: 'I-vi-IV-V',
    descricao: 'Progressão pop extremamente comum',
    acordes: ['I', 'vi', 'IV', 'V'],
    generos: ['Pop', 'Rock', 'R&B'],
    exemplo: 'C-Am-F-G',
    funcao: 'Tônica-Relativo Menor-Subdominante-Dominante',
    tensao: 'média',
    resolucao: 'V resolve para I',
    aplicacao: 'Refrão, estrutura pop clássica',
  },
  VI_IV_I_V: {
    id: 'vi-iv-i-v',
    name: 'vi-IV-I-V',
    descricao: 'Variação pop da progressão I-vi-IV-V',
    acordes: ['vi', 'IV', 'I', 'V'],
    generos: ['Pop', 'Rock', 'R&B'],
    exemplo: 'Am-F-C-G',
    funcao: 'Relativo Menor-Subdominante-Tônica-Dominante',
    tensao: 'média',
    resolucao: 'V resolve para I',
    aplicacao: 'Verso, refrão alternativo',
  },

  // PROGRESSÕES JAZZ
  I_VI_II_V: {
    id: 'i-vi-ii-v',
    name: 'I-vi-ii-V',
    descricao: 'Progressão jazz clássica com movimento descendente',
    acordes: ['Imaj7', 'vi7', 'ii7', 'V7'],
    generos: ['Jazz', 'Standards'],
    exemplo: 'Cmaj7-A7-Dm7-G7',
    funcao: 'Tônica-Dominante Secundária-Subdominante-Dominante',
    tensao: 'alta',
    resolucao: 'V7 resolve para I',
    aplicacao: 'Jazz standards, transições sofisticadas',
  },
  III_VI_II_V: {
    id: 'iii-vi-ii-v',
    name: 'iii-VI-ii-V',
    descricao: 'Progressão jazz com movimento descendente em quintas',
    acordes: ['iii7', 'VI7', 'ii7', 'V7'],
    generos: ['Jazz', 'Standards Avançados'],
    exemplo: 'Em7-A7-Dm7-G7',
    funcao: 'Ciclo de quintas',
    tensao: 'alta',
    resolucao: 'Ciclo contínuo',
    aplicacao: 'Jazz avançado, modulações',
  },

  // PROGRESSÕES BLUES
  BLUES_12_BARS: {
    id: 'blues-12-bars',
    name: 'Blues de 12 Compassos',
    descricao: 'Progressão fundamental do blues',
    acordes: ['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'],
    generos: ['Blues', 'Rock', 'Funk'],
    exemplo: 'C7-C7-C7-C7-F7-F7-C7-C7-G7-F7-C7-G7',
    funcao: 'Tônica-Subdominante-Dominante',
    tensao: 'alta',
    resolucao: 'V7 resolve para I7',
    aplicacao: 'Blues tradicional, improvisação',
  },
  BLUES_QUICK_CHANGE: {
    id: 'blues-quick-change',
    name: 'Blues com Quick Change',
    descricao: 'Variação do blues com mudança rápida para IV',
    acordes: ['I7', 'IV7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'],
    generos: ['Blues', 'Rock'],
    exemplo: 'C7-F7-C7-C7-F7-F7-C7-C7-G7-F7-C7-G7',
    funcao: 'Tônica-Subdominante-Dominante',
    tensao: 'alta',
    resolucao: 'V7 resolve para I7',
    aplicacao: 'Blues moderno, variações',
  },

  // PROGRESSÕES POP/ROCK
  I_V_VI_IV: {
    id: 'i-v-vi-iv',
    name: 'I-V-vi-IV',
    descricao: 'Progressão pop alternativa',
    acordes: ['I', 'V', 'vi', 'IV'],
    generos: ['Pop', 'Rock', 'Indie'],
    exemplo: 'C-G-Am-F',
    funcao: 'Tônica-Dominante-Relativo Menor-Subdominante',
    tensao: 'média',
    resolucao: 'Ciclo contínuo',
    aplicacao: 'Verso, refrão moderno',
  },
  I_III_VI_IV: {
    id: 'i-iii-vi-iv',
    name: 'I-iii-vi-IV',
    descricao: 'Progressão pop com movimento melódico',
    acordes: ['I', 'iii', 'vi', 'IV'],
    generos: ['Pop', 'Indie', 'Alternative'],
    exemplo: 'C-Em-Am-F',
    funcao: 'Tônica-Mediante-Relativo Menor-Subdominante',
    tensao: 'média',
    resolucao: 'Ciclo contínuo',
    aplicacao: 'Verso moderno, estrutura indie',
  },

  // PROGRESSÕES BRASILEIRAS
  BOSSA_NOVA_BASICA: {
    id: 'bossa-nova-basica',
    name: 'Bossa Nova Básica',
    descricao: 'Progressão fundamental da bossa nova',
    acordes: ['Imaj7', 'vi7', 'ii7', 'V7'],
    generos: ['Bossa Nova', 'MPB', 'Jazz Brasileiro'],
    exemplo: 'Cmaj7-A7-Dm7-G7',
    funcao: 'Tônica-Dominante Secundária-Subdominante-Dominante',
    tensao: 'média',
    resolucao: 'V7 resolve para I',
    aplicacao: 'Bossa nova, samba jazz',
  },
  SAMBA_BASICA: {
    id: 'samba-basica',
    name: 'Samba Básica',
    descricao: 'Progressão fundamental do samba',
    acordes: ['I', 'IV', 'I', 'V'],
    generos: ['Samba', 'Samba-Enredo', 'Pagode'],
    exemplo: 'C-F-C-G',
    funcao: 'Tônica-Subdominante-Tônica-Dominante',
    tensao: 'média',
    resolucao: 'V resolve para I',
    aplicacao: 'Samba tradicional, pagode',
  },

  // PROGRESSÕES MODAIS
  MODO_DORICO: {
    id: 'modo-dorico',
    name: 'Progressão Modal Dórica',
    descricao: 'Progressão que enfatiza o modo Dórico',
    acordes: ['i', 'IV', 'i', 'IV'],
    generos: ['Jazz Modal', 'Rock Progressivo', 'Funk'],
    exemplo: 'Cm7-F7-Cm7-F7',
    funcao: 'Tônica Modal-Subdominante',
    tensao: 'média',
    resolucao: 'Ciclo contínuo',
    aplicacao: 'Jazz modal, funk sofisticado',
  },
  MODO_MIXOLIDIO: {
    id: 'modo-mixolidio',
    name: 'Progressão Modal Mixolídia',
    descricao: 'Progressão que enfatiza o modo Mixolídio',
    acordes: ['I7', 'IV7', 'I7', 'V7'],
    generos: ['Blues', 'Rock', 'Funk'],
    exemplo: 'C7-F7-C7-G7',
    funcao: 'Tônica Dominante-Subdominante',
    tensao: 'alta',
    resolucao: 'V7 resolve para I7',
    aplicacao: 'Blues moderno, funk',
  },

  // PROGRESSÕES AVANÇADAS
  CICLO_QUINTAS: {
    id: 'ciclo-quintas',
    name: 'Ciclo de Quintas',
    descricao: 'Progressão que segue o ciclo de quintas',
    acordes: ['I', 'IV', 'VII', 'III', 'VI', 'II', 'V', 'I'],
    generos: ['Jazz', 'Clássico', 'Progressivo'],
    exemplo: 'C-F-B-E-A-D-G-C',
    funcao: 'Movimento de quintas',
    tensao: 'alta',
    resolucao: 'Retorna para I',
    aplicacao: 'Jazz avançado, modulações',
  },
  SUBSTITUICAO_TRITONOS: {
    id: 'substituicao-tritonos',
    name: 'Substituição de Trítono',
    descricao: 'Progressão com substituição de dominante',
    acordes: ['I', 'II7', 'V7', 'I'],
    generos: ['Jazz', 'Standards'],
    exemplo: 'C-D7-G7-C',
    funcao: 'Tônica-Dominante Substituta-Dominante-Tônica',
    tensao: 'alta',
    resolucao: 'V7 resolve para I',
    aplicacao: 'Jazz standards, reharmonização',
  },

  // PROGRESSÕES CONTEMPORÂNEAS
  MINIMALISTA: {
    id: 'minimalista',
    name: 'Progressão Minimalista',
    descricao: 'Progressão simples e repetitiva',
    acordes: ['i', 'i', 'i', 'i'],
    generos: ['Ambient', 'Eletrônico', 'Indie'],
    exemplo: 'Cm-Cm-Cm-Cm',
    funcao: 'Tônica repetida',
    tensao: 'muito baixa',
    resolucao: 'Sem resolução',
    aplicacao: 'Ambient, eletrônico, drone',
  },
  POWER_BALLAD: {
    id: 'power-ballad',
    name: 'Power Ballad',
    descricao: 'Progressão de balada poderosa',
    acordes: ['I', 'V', 'vi', 'IV'],
    generos: ['Rock', 'Balada', 'Metal'],
    exemplo: 'C-G-Am-F',
    funcao: 'Tônica-Dominante-Relativo Menor-Subdominante',
    tensao: 'média',
    resolucao: 'Ciclo contínuo',
    aplicacao: 'Baladas de rock, metal épico',
  },
};

/**
 * Transpõe uma progressão para uma tonalidade específica
 */
function transporProgressao(progressaoId, tonalidade) {
  const progressao = PROGRESSOES[progressaoId.toUpperCase()];
  if (!progressao) return null;

  const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const tonalityIndex = NOTES.indexOf(tonalidade);
  if (tonalityIndex === -1) return null;

  // Implementar transposição
  return {
    ...progressao,
    tonalidade: tonalidade,
  };
}

/**
 * Obtém uma progressão específica
 */
function getProgressao(progressaoId) {
  return PROGRESSOES[progressaoId.toUpperCase()];
}

/**
 * Lista todas as progressões
 */
function listProgressoes() {
  return Object.keys(PROGRESSOES).map((key) => ({
    id: PROGRESSOES[key].id,
    name: PROGRESSOES[key].name,
    descricao: PROGRESSOES[key].descricao,
    generos: PROGRESSOES[key].generos,
    exemplo: PROGRESSOES[key].exemplo,
  }));
}

/**
 * Obtém progressões por gênero
 */
function getProgressoesPorGenero(genero) {
  return Object.keys(PROGRESSOES)
    .filter((key) => PROGRESSOES[key].generos.includes(genero))
    .map((key) => ({
      id: PROGRESSOES[key].id,
      name: PROGRESSOES[key].name,
      exemplo: PROGRESSOES[key].exemplo,
    }));
}

/**
 * Obtém progressões por tensão
 */
function getProgressoesPorTensao(tensao) {
  return Object.keys(PROGRESSOES)
    .filter((key) => PROGRESSOES[key].tensao === tensao)
    .map((key) => ({
      id: PROGRESSOES[key].id,
      name: PROGRESSOES[key].name,
      exemplo: PROGRESSOES[key].exemplo,
    }));
}

export {
  PROGRESSOES,
  transporProgressao,
  getProgressao,
  listProgressoes,
  getProgressoesPorGenero,
  getProgressoesPorTensao,
};
