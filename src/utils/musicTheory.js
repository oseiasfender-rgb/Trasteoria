// Teoria musical base para transposição
export const notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const notasPortugues = ['Dó', 'Dó#', 'Ré', 'Ré#', 'Mi', 'Fá', 'Fá#', 'Sol', 'Sol#', 'Lá', 'Lá#', 'Si'];

// Mapeamento de notas para português
export const notaParaPortugues = {
  'C': 'Dó', 'C#': 'Dó#', 'Db': 'Réb',
  'D': 'Ré', 'D#': 'Ré#', 'Eb': 'Mib',
  'E': 'Mi',
  'F': 'Fá', 'F#': 'Fá#', 'Gb': 'Solb',
  'G': 'Sol', 'G#': 'Sol#', 'Ab': 'Láb',
  'A': 'Lá', 'A#': 'Lá#', 'Bb': 'Sib',
  'B': 'Si'
};

// Intervalos dos modos gregos (em semitons)
export const intervalosModosGrecos = {
  jonio: [0, 2, 4, 5, 7, 9, 11],      // T T S T T T S
  dorico: [0, 2, 3, 5, 7, 9, 10],     // T S T T T S T
  frigio: [0, 1, 3, 5, 7, 8, 10],     // S T T T S T T
  lidio: [0, 2, 4, 6, 7, 9, 11],      // T T T S T T S
  mixolidio: [0, 2, 4, 5, 7, 9, 10],  // T T S T T S T
  eolio: [0, 2, 3, 5, 7, 8, 10],      // T S T T S T T
  locrio: [0, 1, 3, 5, 6, 8, 10]      // S T T S T T T
};

// Qualidades dos acordes para cada grau dos modos
export const qualidadesAcordes = {
  jonio: ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'],
  dorico: ['m7', 'm7b5', 'maj7', '7', 'm7', 'm7b5', 'maj7'],
  frigio: ['m7', 'maj7', '7', 'm7', 'm7b5', 'maj7', 'm7'],
  lidio: ['maj7', '7', 'm7', 'm7b5', 'maj7', 'm7', 'm7'],
  mixolidio: ['7', 'm7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7'],
  eolio: ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7'],
  locrio: ['m7b5', 'maj7', 'm7', 'm7', 'maj7', '7', 'm7']
};

// Função para transpor uma nota
export function transporNota(nota, semitons) {
  const indice = notas.indexOf(nota);
  if (indice === -1) return nota;
  
  const novoIndice = (indice + semitons) % 12;
  return notas[novoIndice];
}

// Função para gerar escala de um modo em uma tonalidade
export function gerarEscala(tonica, modo) {
  const intervalos = intervalosModosGrecos[modo];
  if (!intervalos) return [];
  
  const tonicaIndice = notas.indexOf(tonica);
  if (tonicaIndice === -1) return [];
  
  return intervalos.map(intervalo => {
    const indice = (tonicaIndice + intervalo) % 12;
    return notas[indice];
  });
}

// Função para gerar campo harmônico de um modo em uma tonalidade
export function gerarCampoHarmonico(tonica, modo) {
  const escala = gerarEscala(tonica, modo);
  const qualidades = qualidadesAcordes[modo];
  
  if (!escala.length || !qualidades) return [];
  
  return escala.map((nota, index) => {
    return nota + qualidades[index];
  });
}

// Função para obter fórmula intervalar em português
export function obterFormulaPortugues(modo) {
  const formulas = {
    jonio: '1 - 2 - 3 - 4 - 5 - 6 - 7',
    dorico: '1 - 2 - b3 - 4 - 5 - 6 - b7',
    frigio: '1 - b2 - b3 - 4 - 5 - b6 - b7',
    lidio: '1 - 2 - 3 - #4 - 5 - 6 - 7',
    mixolidio: '1 - 2 - 3 - 4 - 5 - 6 - b7',
    eolio: '1 - 2 - b3 - 4 - 5 - b6 - b7',
    locrio: '1 - b2 - b3 - 4 - b5 - b6 - b7'
  };
  
  return formulas[modo] || '';
}

// Função para converter escala para notação portuguesa
export function escalaParaPortugues(escala) {
  return escala.map(nota => notaParaPortugues[nota] || nota).join(' - ');
}

// Lista de todas as tonalidades
export const tonalidades = [
  { key: 'C', nome: 'Dó Maior', notaPortugues: 'Dó' },
  { key: 'C#', nome: 'Dó# Maior', notaPortugues: 'Dó#' },
  { key: 'D', nome: 'Ré Maior', notaPortugues: 'Ré' },
  { key: 'D#', nome: 'Ré# Maior', notaPortugues: 'Ré#' },
  { key: 'E', nome: 'Mi Maior', notaPortugues: 'Mi' },
  { key: 'F', nome: 'Fá Maior', notaPortugues: 'Fá' },
  { key: 'F#', nome: 'Fá# Maior', notaPortugues: 'Fá#' },
  { key: 'G', nome: 'Sol Maior', notaPortugues: 'Sol' },
  { key: 'G#', nome: 'Sol# Maior', notaPortugues: 'Sol#' },
  { key: 'A', nome: 'Lá Maior', notaPortugues: 'Lá' },
  { key: 'A#', nome: 'Lá# Maior', notaPortugues: 'Lá#' },
  { key: 'B', nome: 'Si Maior', notaPortugues: 'Si' }
];


// Funções auxiliares para AppContext
export function extractRootNote(chordInput) {
  if (!chordInput) return 'C';
  const match = chordInput.match(/^([A-G][#b]?)/);
  return match ? match[1] : 'C';
}

export function identifyChordType(chordInput) {
  if (!chordInput) return 'major';
  const withoutRoot = chordInput.replace(/^[A-G][#b]?/, '');
  if (withoutRoot.includes('m7b5') || withoutRoot.includes('ø')) return 'half_diminished';
  if (withoutRoot.includes('dim7') || withoutRoot.includes('°7')) return 'diminished7';
  if (withoutRoot.includes('dim') || withoutRoot.includes('°')) return 'diminished';
  if (withoutRoot.includes('aug') || withoutRoot.includes('+')) return 'augmented';
  if (withoutRoot.includes('maj7') || withoutRoot.includes('M7')) return 'major7';
  if (withoutRoot.includes('m7') || withoutRoot.includes('min7')) return 'minor7';
  if (withoutRoot.includes('7')) return 'dominant7';
  if (withoutRoot.includes('m') || withoutRoot.includes('min')) return 'minor';
  if (withoutRoot.includes('sus4')) return 'sus4';
  if (withoutRoot.includes('sus2')) return 'sus2';
  return 'major';
}

export function buildChord(root, type) {
  const intervals = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
    major7: [0, 4, 7, 11],
    minor7: [0, 3, 7, 10],
    dominant7: [0, 4, 7, 10],
    diminished7: [0, 3, 6, 9],
    half_diminished: [0, 3, 6, 10],
    sus4: [0, 5, 7],
    sus2: [0, 2, 7],
  };
  const rootIdx = notas.indexOf(root);
  if (rootIdx === -1) return [root];
  const steps = intervals[type] || intervals.major;
  return steps.map(s => notas[(rootIdx + s) % 12]);
}

export function buildScale(root, mode) {
  return gerarEscala(root, mode || 'jonio');
}
