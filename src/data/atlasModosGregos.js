/**
 * Atlas de Modos Gregos - Dados Estruturados
 * 7 Modos × 12 Tons = 84 combinações
 * 
 * Inclui:
 * - Notas do modo
 * - Intervalos
 * - Acordes compatíveis
 * - Características sonoras
 * - Aplicações práticas
 * - Licks e frases
 */

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const MODOS = {
  JONIO: {
    id: 'jonio',
    name: 'Jônio',
    intervals: [0, 2, 4, 5, 7, 9, 11], // W-W-H-W-W-W-H
    formula: '1-2-3-4-5-6-7',
    sonoridade: 'Maior, brilhante, alegre',
    funcao: 'I grau da escala maior',
    compativel: ['maj', 'maj7', 'maj9', 'sus2', 'sus4'],
    aplicacao: 'Rock, Pop, Jazz, Clássico',
    caracteristicas: [
      'Sonoridade maior completa',
      'Sem tensões características',
      'Versátil para qualquer contexto',
      'Fundamental para improvisação',
    ],
    shapes: [
      {
        id: 'shape1',
        name: 'Shape 1 - Posição Fundamental',
        trastes: [
          { corda: 6, traste: 0, nota: 'C' },
          { corda: 5, traste: 3, nota: 'C' },
          { corda: 4, traste: 2, nota: 'C' },
          { corda: 3, traste: 0, nota: 'C' },
          { corda: 2, traste: 1, nota: 'C' },
          { corda: 1, traste: 0, nota: 'C' },
        ],
        descricao: 'Posição fundamental começando na corda 6',
      },
      {
        id: 'shape2',
        name: 'Shape 2 - Posição A',
        trastes: [
          { corda: 5, traste: 0, nota: 'A' },
          { corda: 4, traste: 2, nota: 'A' },
          { corda: 3, traste: 2, nota: 'A' },
          { corda: 2, traste: 0, nota: 'A' },
          { corda: 1, traste: 0, nota: 'A' },
        ],
        descricao: 'Posição A começando na corda 5',
      },
      {
        id: 'shape3',
        name: 'Shape 3 - Posição G',
        trastes: [
          { corda: 6, traste: 3, nota: 'G' },
          { corda: 5, traste: 5, nota: 'G' },
          { corda: 4, traste: 4, nota: 'G' },
          { corda: 3, traste: 5, nota: 'G' },
          { corda: 2, traste: 3, nota: 'G' },
          { corda: 1, traste: 3, nota: 'G' },
        ],
        descricao: 'Posição G começando na corda 6',
      },
      {
        id: 'shape4',
        name: 'Shape 4 - Posição E',
        trastes: [
          { corda: 6, traste: 0, nota: 'E' },
          { corda: 5, traste: 2, nota: 'E' },
          { corda: 4, traste: 2, nota: 'E' },
          { corda: 3, traste: 1, nota: 'E' },
          { corda: 2, traste: 0, nota: 'E' },
          { corda: 1, traste: 0, nota: 'E' },
        ],
        descricao: 'Posição E começando na corda 6',
      },
      {
        id: 'shape5',
        name: 'Shape 5 - Posição D',
        trastes: [
          { corda: 6, traste: 10, nota: 'D' },
          { corda: 5, traste: 12, nota: 'D' },
          { corda: 4, traste: 11, nota: 'D' },
          { corda: 3, traste: 12, nota: 'D' },
          { corda: 2, traste: 10, nota: 'D' },
          { corda: 1, traste: 10, nota: 'D' },
        ],
        descricao: 'Posição D começando na corda 6',
      },
    ],
    licks: [
      {
        nome: 'Lick Melódico Maior',
        notas: ['C', 'E', 'G', 'A', 'G', 'E', 'C'],
        descricao: 'Arpejo com passing tones',
      },
      {
        nome: 'Frase Ascendente',
        notas: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
        descricao: 'Escala completa ascendente',
      },
    ],
  },
  DORICO: {
    id: 'dorico',
    name: 'Dórico',
    intervals: [0, 2, 3, 5, 7, 9, 10], // W-H-W-W-W-H-W
    formula: '1-2-b3-4-5-6-b7',
    sonoridade: 'Menor com 6ª maior, melancólico',
    funcao: 'II grau da escala maior',
    compativel: ['m7', 'm9', 'm11', 'm6', 'sus2'],
    aplicacao: 'Jazz, Funk, Rock Moderno, Bossa',
    caracteristicas: [
      'Menor com 6ª maior',
      'Menos escuro que Eólio',
      'Perfeito para funk e jazz',
      'Sonoridade sofisticada',
    ],
    shapes: [
      {
        id: 'shape1',
        name: 'Shape 1 - Posição Fundamental',
        trastes: [],
        descricao: 'Posição fundamental',
      },
    ],
    licks: [],
  },
  FRIGIO: {
    id: 'frigio',
    name: 'Frígio',
    intervals: [0, 1, 3, 5, 7, 8, 10], // H-W-W-W-H-W-W
    formula: '1-b2-b3-4-5-b6-b7',
    sonoridade: 'Menor com 2ª menor, exótico',
    funcao: 'III grau da escala maior',
    compativel: ['m7', 'm7b9', 'm7b13', 'sus4'],
    aplicacao: 'Flamenco, Metal, Música Étnica',
    caracteristicas: [
      'Sonoridade exótica e oriental',
      'Menor com 2ª menor',
      'Perfeito para flamenco',
      'Muito expressivo',
    ],
    shapes: [],
    licks: [],
  },
  LIDIO: {
    id: 'lidio',
    name: 'Lídio',
    intervals: [0, 2, 4, 6, 7, 9, 11], // W-W-W-H-W-W-H
    formula: '1-2-3-#4-5-6-7',
    sonoridade: 'Maior com 4ª aumentada, onírico',
    funcao: 'IV grau da escala maior',
    compativel: ['maj7#11', 'maj9#11', 'sus4'],
    aplicacao: 'Jazz, Clássico Moderno, Ambient',
    caracteristicas: [
      'Maior com 4ª aumentada',
      'Sonoridade onírica e brilhante',
      'Perfeito para passagens líricas',
      'Muito cinematográfico',
    ],
    shapes: [],
    licks: [],
  },
  MIXOLIDIO: {
    id: 'mixolidio',
    name: 'Mixolídio',
    intervals: [0, 2, 4, 5, 7, 9, 10], // W-W-H-W-W-H-W
    formula: '1-2-3-4-5-6-b7',
    sonoridade: 'Dominante, bluesy',
    funcao: 'V grau da escala maior',
    compativel: ['7', '9', '13', 'sus4'],
    aplicacao: 'Blues, Rock, Funk, Gospel',
    caracteristicas: [
      'Sonoridade dominante',
      'Perfeito para blues',
      'Muito groovy',
      'Fundamental em rock',
    ],
    shapes: [],
    licks: [],
  },
  EOLIO: {
    id: 'eolio',
    name: 'Eólio',
    intervals: [0, 2, 3, 5, 7, 8, 10], // W-H-W-W-H-W-W
    formula: '1-2-b3-4-5-b6-b7',
    sonoridade: 'Menor natural, triste',
    funcao: 'VI grau da escala maior',
    compativel: ['m7', 'm9', 'm11', 'm13'],
    aplicacao: 'Rock, Metal, Clássico, Balada',
    caracteristicas: [
      'Escala menor natural',
      'Sonoridade triste e introspectiva',
      'Muito usado em rock',
      'Fundamental para improviso menor',
    ],
    shapes: [],
    licks: [],
  },
  LOCRIO: {
    id: 'locrio',
    name: 'Lócrio',
    intervals: [0, 1, 3, 5, 6, 8, 10], // H-W-W-H-W-W-W
    formula: '1-b2-b3-4-b5-b6-b7',
    sonoridade: 'Diminuto, tenso',
    funcao: 'VII grau da escala maior',
    compativel: ['m7b5', 'dim7', 'sus4'],
    aplicacao: 'Jazz, Metal Progressivo, Clássico',
    caracteristicas: [
      'Sonoridade diminuta',
      'Muito tenso e dissonante',
      'Perfeito para acordes m7b5',
      'Usado em jazz avançado',
    ],
    shapes: [],
    licks: [],
  },
};

/**
 * Gera dados de um modo em uma tonalidade específica
 */
function generateModoInTonality(modoId, tonalityIndex) {
  const modo = MODOS[modoId.toUpperCase()];
  if (!modo) return null;

  const root = NOTES[tonalityIndex];
  const notas = modo.intervals.map((interval) => {
    const noteIndex = (tonalityIndex + interval) % 12;
    return NOTES[noteIndex];
  });

  return {
    ...modo,
    root: root,
    notas: notas,
    tonalidade: `${root} ${modo.name}`,
  };
}

/**
 * Gera atlas completo de modos (7 modos × 12 tons)
 */
function generateAtlasModos() {
  const atlas = {};

  NOTES.forEach((note, noteIndex) => {
    atlas[note] = {};
    Object.keys(MODOS).forEach((modoKey) => {
      atlas[note][modoKey.toLowerCase()] = generateModoInTonality(modoKey, noteIndex);
    });
  });

  return atlas;
}

/**
 * Obtém um modo específico em uma tonalidade
 */
function getModo(tonalidade, modo) {
  const atlas = generateAtlasModos();
  return atlas[tonalidade]?.[modo.toLowerCase()];
}

/**
 * Lista todos os modos disponíveis
 */
function listModos() {
  return Object.keys(MODOS).map((key) => ({
    id: MODOS[key].id,
    name: MODOS[key].name,
    formula: MODOS[key].formula,
    sonoridade: MODOS[key].sonoridade,
  }));
}

/**
 * Lista todas as tonalidades
 */
function listTonalidades() {
  return NOTES;
}

export {
  MODOS,
  NOTES,
  generateAtlasModos,
  generateModoInTonality,
  getModo,
  listModos,
  listTonalidades,
};
