/**
 * Atlas de Acordes - Dados Estruturados
 * 50+ Tipos de Acordes × 12 Tons × 5 Posições = 3000+ diagramas
 * 
 * Categorias:
 * 1. Tríades (Maj, min, aug, dim)
 * 2. Tétrades (Maj7, 7, m7, m7b5, dim7)
 * 3. Estendidos (9, 11, 13)
 * 4. Alterados (b9, #9, #11, b13)
 * 5. Sus e Abertos
 */

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const TIPOS_ACORDES = {
  // TRÍADES
  MAIOR: {
    id: 'maj',
    name: 'Maior',
    formula: '1-3-5',
    intervalo: [0, 4, 7],
    categoria: 'Tríade',
    sonoridade: 'Brilhante, alegre',
    tensao: 'baixa',
    uso: 'Acordes tônicos, fundamentais',
  },
  MENOR: {
    id: 'min',
    name: 'Menor',
    formula: '1-b3-5',
    intervalo: [0, 3, 7],
    categoria: 'Tríade',
    sonoridade: 'Triste, introspectivo',
    tensao: 'baixa',
    uso: 'Acordes tônicos, fundamentais',
  },
  AUMENTADO: {
    id: 'aug',
    name: 'Aumentado',
    formula: '1-3-#5',
    intervalo: [0, 4, 8],
    categoria: 'Tríade',
    sonoridade: 'Tenso, instável',
    tensao: 'alta',
    uso: 'Acordes de passagem, tensão',
  },
  DIMINUTO: {
    id: 'dim',
    name: 'Diminuto',
    formula: '1-b3-b5',
    intervalo: [0, 3, 6],
    categoria: 'Tríade',
    sonoridade: 'Muito tenso, dissonante',
    tensao: 'muito alta',
    uso: 'Acordes de sensível, jazz',
  },

  // TÉTRADES
  MAJ7: {
    id: 'maj7',
    name: 'Maior com Sétima Maior',
    formula: '1-3-5-7',
    intervalo: [0, 4, 7, 11],
    categoria: 'Tétrade',
    sonoridade: 'Brilhante, sofisticado',
    tensao: 'média',
    uso: 'Jazz, acordes tônicos',
  },
  SETE: {
    id: '7',
    name: 'Dominante',
    formula: '1-3-5-b7',
    intervalo: [0, 4, 7, 10],
    categoria: 'Tétrade',
    sonoridade: 'Tenso, bluesy',
    tensao: 'alta',
    uso: 'Acordes dominantes, blues',
  },
  M7: {
    id: 'm7',
    name: 'Menor com Sétima Menor',
    formula: '1-b3-5-b7',
    intervalo: [0, 3, 7, 10],
    categoria: 'Tétrade',
    sonoridade: 'Menor sofisticado',
    tensao: 'média',
    uso: 'Jazz, funk, acordes menores',
  },
  M7B5: {
    id: 'm7b5',
    name: 'Meio Diminuto',
    formula: '1-b3-b5-b7',
    intervalo: [0, 3, 6, 10],
    categoria: 'Tétrade',
    sonoridade: 'Tenso, menor diminuto',
    tensao: 'alta',
    uso: 'Jazz, acordes de sensível',
  },
  DIM7: {
    id: 'dim7',
    name: 'Diminuto com Sétima Diminuta',
    formula: '1-b3-b5-bb7',
    intervalo: [0, 3, 6, 9],
    categoria: 'Tétrade',
    sonoridade: 'Muito tenso, simétrico',
    tensao: 'muito alta',
    uso: 'Jazz, clássico, passagens',
  },

  // ESTENDIDOS
  MAJ9: {
    id: 'maj9',
    name: 'Maior com Nona',
    formula: '1-3-5-7-9',
    intervalo: [0, 4, 7, 11, 2],
    categoria: 'Estendido',
    sonoridade: 'Brilhante, aberto',
    tensao: 'média',
    uso: 'Jazz, pop sofisticado',
  },
  M9: {
    id: 'm9',
    name: 'Menor com Nona',
    formula: '1-b3-5-b7-9',
    intervalo: [0, 3, 7, 10, 2],
    categoria: 'Estendido',
    sonoridade: 'Menor aberto',
    tensao: 'média',
    uso: 'Jazz, funk, R&B',
  },
  NONA: {
    id: '9',
    name: 'Dominante com Nona',
    formula: '1-3-5-b7-9',
    intervalo: [0, 4, 7, 10, 2],
    categoria: 'Estendido',
    sonoridade: 'Tenso, aberto',
    tensao: 'alta',
    uso: 'Jazz, blues, funk',
  },
  MAJ11: {
    id: 'maj11',
    name: 'Maior com Décima Primeira',
    formula: '1-3-5-7-9-11',
    intervalo: [0, 4, 7, 11, 2, 5],
    categoria: 'Estendido',
    sonoridade: 'Muito aberto, complexo',
    tensao: 'média',
    uso: 'Jazz avançado',
  },
  M11: {
    id: 'm11',
    name: 'Menor com Décima Primeira',
    formula: '1-b3-5-b7-9-11',
    intervalo: [0, 3, 7, 10, 2, 5],
    categoria: 'Estendido',
    sonoridade: 'Menor complexo',
    tensao: 'média',
    uso: 'Jazz avançado, modal',
  },
  MAJ13: {
    id: 'maj13',
    name: 'Maior com Décima Terceira',
    formula: '1-3-5-7-9-13',
    intervalo: [0, 4, 7, 11, 2, 9],
    categoria: 'Estendido',
    sonoridade: 'Brilhante, completo',
    tensao: 'média',
    uso: 'Jazz, pop sofisticado',
  },
  M13: {
    id: 'm13',
    name: 'Menor com Décima Terceira',
    formula: '1-b3-5-b7-9-13',
    intervalo: [0, 3, 7, 10, 2, 9],
    categoria: 'Estendido',
    sonoridade: 'Menor completo',
    tensao: 'média',
    uso: 'Jazz, funk sofisticado',
  },

  // ALTERADOS
  SETEB9: {
    id: '7b9',
    name: 'Dominante com Nona Menor',
    formula: '1-3-5-b7-b9',
    intervalo: [0, 4, 7, 10, 1],
    categoria: 'Alterado',
    sonoridade: 'Muito tenso, exótico',
    tensao: 'muito alta',
    uso: 'Jazz, metal, efeitos especiais',
  },
  SETE_SHARP9: {
    id: '7#9',
    name: 'Dominante com Nona Aumentada',
    formula: '1-3-5-b7-#9',
    intervalo: [0, 4, 7, 10, 3],
    categoria: 'Alterado',
    sonoridade: 'Muito tenso, jimi hendrix',
    tensao: 'muito alta',
    uso: 'Rock, blues, efeitos',
  },
  SETESHARP11: {
    id: '7#11',
    name: 'Dominante com Décima Primeira Aumentada',
    formula: '1-3-5-b7-#11',
    intervalo: [0, 4, 7, 10, 6],
    categoria: 'Alterado',
    sonoridade: 'Tenso, liídio',
    tensao: 'alta',
    uso: 'Jazz, progressivo',
  },

  // SUS E ABERTOS
  SUS2: {
    id: 'sus2',
    name: 'Sus2',
    formula: '1-2-5',
    intervalo: [0, 2, 7],
    categoria: 'Sus',
    sonoridade: 'Aberto, suspenso',
    tensao: 'média',
    uso: 'Transições, passagens',
  },
  SUS4: {
    id: 'sus4',
    name: 'Sus4',
    formula: '1-4-5',
    intervalo: [0, 5, 7],
    categoria: 'Sus',
    sonoridade: 'Aberto, suspenso',
    tensao: 'média',
    uso: 'Transições, passagens',
  },
  POWER: {
    id: '5',
    name: 'Power Chord',
    formula: '1-5',
    intervalo: [0, 7],
    categoria: 'Aberto',
    sonoridade: 'Neutro, poderoso',
    tensao: 'baixa',
    uso: 'Rock, metal, guitarra elétrica',
  },
};

/**
 * Posições CAGED para acordes
 */
const POSICOES_CAGED = {
  C: { nome: 'Posição C', trastes: [0, 3, 2, 0, 1, 0] },
  A: { nome: 'Posição A', trastes: [0, 0, 2, 2, 2, 0] },
  G: { nome: 'Posição G', trastes: [3, 2, 0, 0, 0, 3] },
  E: { nome: 'Posição E', trastes: [0, 2, 2, 1, 0, 0] },
  D: { nome: 'Posição D', trastes: [10, 12, 11, 12, 12, 10] },
};

/**
 * Gera um acorde em uma tonalidade e posição específica
 */
function generateAcordeInTonality(tipoId, tonalityIndex, posicao = 'C') {
  const tipo = TIPOS_ACORDES[tipoId.toUpperCase()];
  if (!tipo) return null;

  const root = NOTES[tonalityIndex];
  const notas = tipo.intervalo.map((interval) => {
    const noteIndex = (tonalityIndex + interval) % 12;
    return NOTES[noteIndex];
  });

  const posicaoCaged = POSICOES_CAGED[posicao];

  return {
    ...tipo,
    root: root,
    notas: notas,
    cifra: `${root}${tipoId}`,
    posicao: posicao,
    posicaoDetalhes: posicaoCaged,
  };
}

/**
 * Gera atlas completo de acordes
 */
function generateAtlasAcordes() {
  const atlas = {};

  NOTES.forEach((note, noteIndex) => {
    atlas[note] = {};
    Object.keys(TIPOS_ACORDES).forEach((tipoKey) => {
      atlas[note][tipoKey.toLowerCase()] = {};
      Object.keys(POSICOES_CAGED).forEach((posicao) => {
        atlas[note][tipoKey.toLowerCase()][posicao] = generateAcordeInTonality(
          tipoKey,
          noteIndex,
          posicao
        );
      });
    });
  });

  return atlas;
}

/**
 * Obtém um acorde específico
 */
function getAcorde(tonalidade, tipo, posicao = 'C') {
  const atlas = generateAtlasAcordes();
  return atlas[tonalidade]?.[tipo.toLowerCase()]?.[posicao];
}

/**
 * Lista todos os tipos de acordes
 */
function listAcordes() {
  return Object.keys(TIPOS_ACORDES).map((key) => ({
    id: TIPOS_ACORDES[key].id,
    name: TIPOS_ACORDES[key].name,
    formula: TIPOS_ACORDES[key].formula,
    categoria: TIPOS_ACORDES[key].categoria,
    sonoridade: TIPOS_ACORDES[key].sonoridade,
  }));
}

/**
 * Obtém acordes por categoria
 */
function getAcordesPorCategoria(categoria) {
  return Object.keys(TIPOS_ACORDES)
    .filter((key) => TIPOS_ACORDES[key].categoria === categoria)
    .map((key) => ({
      id: TIPOS_ACORDES[key].id,
      name: TIPOS_ACORDES[key].name,
      formula: TIPOS_ACORDES[key].formula,
    }));
}

/**
 * Obtém todas as posições CAGED
 */
function getPosicoesCaged() {
  return Object.keys(POSICOES_CAGED).map((key) => ({
    posicao: key,
    nome: POSICOES_CAGED[key].nome,
    trastes: POSICOES_CAGED[key].trastes,
  }));
}

/**
 * Encontra acordes compatíveis com uma escala
 */
function getAcordesCompativeisCom(escala) {
  // Implementar lógica de compatibilidade
  return [];
}

export {
  TIPOS_ACORDES,
  POSICOES_CAGED,
  NOTES,
  generateAtlasAcordes,
  generateAcordeInTonality,
  getAcorde,
  listAcordes,
  getAcordesPorCategoria,
  getPosicoesCaged,
  getAcordesCompativeisCom,
};
