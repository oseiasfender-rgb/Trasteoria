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

