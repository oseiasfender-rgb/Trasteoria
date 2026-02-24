/**
 * Atlas de Campos Harmônicos - Dados Estruturados
 * 4 Tipos × 12 Tons = 48 combinações
 * 
 * Tipos:
 * 1. Maior (Diatônico Maior)
 * 2. Menor Natural (Eólio)
 * 3. Menor Harmônico
 * 4. Menor Melódico
 */

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const GRAUS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const CAMPOS_HARMONICOS = {
  MAIOR: {
    id: 'maior',
    name: 'Campo Harmônico Maior',
    tipo: 'Diatônico Maior',
    descricao: 'Acordes formados a partir da escala maior',
    acordes: [
      { grau: 'I', tipo: 'maj7', funcao: 'Tônica', tensao: 'baixa' },
      { grau: 'II', tipo: 'm7', funcao: 'Subdominante', tensao: 'média' },
      { grau: 'III', tipo: 'm7', funcao: 'Relativo Menor', tensao: 'média' },
      { grau: 'IV', tipo: 'maj7', funcao: 'Subdominante', tensao: 'baixa' },
      { grau: 'V', tipo: '7', funcao: 'Dominante', tensao: 'alta' },
      { grau: 'VI', tipo: 'm7', funcao: 'Relativo Menor', tensao: 'média' },
      { grau: 'VII', tipo: 'm7b5', funcao: 'Sensível', tensao: 'alta' },
    ],
    progressoes: [
      { nome: 'I-IV-V', descricao: 'Progressão clássica' },
      { nome: 'ii-V-I', descricao: 'Progressão de jazz' },
      { nome: 'I-vi-IV-V', descricao: 'Progressão pop' },
      { nome: 'vi-IV-I-V', descricao: 'Variação pop' },
    ],
    aplicacao: 'Pop, Rock, Jazz, Clássico',
  },
  MENOR_NATURAL: {
    id: 'menor_natural',
    name: 'Campo Harmônico Menor Natural',
    tipo: 'Eólio (Menor Natural)',
    descricao: 'Acordes formados a partir da escala menor natural',
    acordes: [
      { grau: 'I', tipo: 'm7', funcao: 'Tônica', tensao: 'baixa' },
      { grau: 'II', tipo: 'm7b5', funcao: 'Subdominante', tensao: 'alta' },
      { grau: 'III', tipo: 'maj7', funcao: 'Relativo Maior', tensao: 'baixa' },
      { grau: 'IV', tipo: 'm7', funcao: 'Subdominante', tensao: 'média' },
      { grau: 'V', tipo: 'm7', funcao: 'Dominante', tensao: 'média' },
      { grau: 'VI', tipo: 'maj7', funcao: 'Relativo Maior', tensao: 'baixa' },
      { grau: 'VII', tipo: 'maj7', funcao: 'Subtônica', tensao: 'baixa' },
    ],
    progressoes: [
      { nome: 'i-VII-VI', descricao: 'Progressão menor clássica' },
      { nome: 'i-iv-V', descricao: 'Progressão menor com dominante' },
      { nome: 'vi-VII-i', descricao: 'Variação menor' },
    ],
    aplicacao: 'Rock, Metal, Balada, Blues',
  },
  MENOR_HARMONICO: {
    id: 'menor_harmonico',
    name: 'Campo Harmônico Menor Harmônico',
    tipo: 'Menor Harmônico',
    descricao: 'Acordes formados a partir da escala menor harmônica (com sensível)',
    acordes: [
      { grau: 'I', tipo: 'm-maj7', funcao: 'Tônica', tensao: 'média' },
      { grau: 'II', tipo: 'm7b5', funcao: 'Subdominante', tensao: 'alta' },
      { grau: 'III', tipo: 'maj7#5', funcao: 'Relativo Maior', tensao: 'alta' },
      { grau: 'IV', tipo: 'm7', funcao: 'Subdominante', tensao: 'média' },
      { grau: 'V', tipo: '7', funcao: 'Dominante', tensao: 'alta' },
      { grau: 'VI', tipo: 'maj7', funcao: 'Relativo Maior', tensao: 'baixa' },
      { grau: 'VII', tipo: 'dim7', funcao: 'Sensível', tensao: 'muito alta' },
    ],
    progressoes: [
      { nome: 'i-V-i', descricao: 'Progressão menor harmônica clássica' },
      { nome: 'i-VI-VII', descricao: 'Progressão menor com sensível' },
    ],
    aplicacao: 'Jazz, Clássico, Metal Progressivo',
  },
  MENOR_MELODICO: {
    id: 'menor_melodico',
    name: 'Campo Harmônico Menor Melódico',
    tipo: 'Menor Melódico',
    descricao: 'Acordes formados a partir da escala menor melódica (híbrida)',
    acordes: [
      { grau: 'I', tipo: 'm-maj7', funcao: 'Tônica', tensao: 'média' },
      { grau: 'II', tipo: 'm7', funcao: 'Subdominante', tensao: 'média' },
      { grau: 'III', tipo: 'maj7#5', funcao: 'Relativo Maior', tensao: 'alta' },
      { grau: 'IV', tipo: '7', funcao: 'Dominante Secundária', tensao: 'alta' },
      { grau: 'V', tipo: '7', funcao: 'Dominante', tensao: 'alta' },
      { grau: 'VI', tipo: 'm7b5', funcao: 'Sensível', tensao: 'alta' },
      { grau: 'VII', tipo: 'm7b5', funcao: 'Sensível', tensao: 'alta' },
    ],
    progressoes: [
      { nome: 'i-iv-V', descricao: 'Progressão menor melódica' },
      { nome: 'i-III-VI', descricao: 'Progressão com relativos' },
    ],
    aplicacao: 'Jazz Avançado, Clássico Moderno',
  },
};

/**
 * Gera campo harmônico em uma tonalidade específica
 */
function generateCampoInTonality(campoId, tonalityIndex) {
  const campo = CAMPOS_HARMONICOS[campoId.toUpperCase()];
  if (!campo) return null;

  const root = NOTES[tonalityIndex];
  const acordesGerados = campo.acordes.map((acorde, index) => {
    const notaDoAcorde = NOTES[(tonalityIndex + index * 2) % 12];
    return {
      ...acorde,
      nota: notaDoAcorde,
      cifra: `${notaDoAcorde}${acorde.tipo === 'maj7' ? 'maj7' : acorde.tipo}`,
    };
  });

  return {
    ...campo,
    root: root,
    tonalidade: `${root} ${campo.name}`,
    acordes: acordesGerados,
  };
}

/**
 * Gera atlas completo de campos harmônicos (4 tipos × 12 tons)
 */
function generateAtlasCampos() {
  const atlas = {};

  NOTES.forEach((note, noteIndex) => {
    atlas[note] = {};
    Object.keys(CAMPOS_HARMONICOS).forEach((campoKey) => {
      atlas[note][campoKey.toLowerCase()] = generateCampoInTonality(campoKey, noteIndex);
    });
  });

  return atlas;
}

/**
 * Obtém um campo harmônico específico em uma tonalidade
 */
function getCampo(tonalidade, tipo) {
  const atlas = generateAtlasCampos();
  return atlas[tonalidade]?.[tipo.toLowerCase()];
}

/**
 * Lista todos os tipos de campos harmônicos
 */
function listCampos() {
  return Object.keys(CAMPOS_HARMONICOS).map((key) => ({
    id: CAMPOS_HARMONICOS[key].id,
    name: CAMPOS_HARMONICOS[key].name,
    tipo: CAMPOS_HARMONICOS[key].tipo,
    descricao: CAMPOS_HARMONICOS[key].descricao,
  }));
}

/**
 * Obtém progressões recomendadas para um campo
 */
function getProgressoes(tipo) {
  const campo = CAMPOS_HARMONICOS[tipo.toUpperCase()];
  return campo?.progressoes || [];
}

/**
 * Analisa um acorde dentro de um campo
 */
function analisarAcorde(tonalidade, tipo, grau) {
  const campo = getCampo(tonalidade, tipo);
  if (!campo) return null;

  const acordeIndex = GRAUS.indexOf(grau);
  if (acordeIndex === -1) return null;

  return campo.acordes[acordeIndex];
}

export {
  CAMPOS_HARMONICOS,
  NOTES,
  GRAUS,
  generateAtlasCampos,
  generateCampoInTonality,
  getCampo,
  listCampos,
  getProgressoes,
  analisarAcorde,
};
