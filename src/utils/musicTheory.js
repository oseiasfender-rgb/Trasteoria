/**
 * musicTheory.js — Teoria Musical Base
 * Nomenclatura de notas corrigida pelo ciclo das quintas/quartas.
 */
import {
  CHROMATIC_SHARP, CHROMATIC_FLAT,
  noteToIndex, indexToNote, getKeyPreference, getModePreference,
  generateScale, noteToPortuguese
} from './noteNaming';

// ─── Arrays de notas ──────────────────────────────────────────────────────────

/** Array cromático com sustenidos (compatibilidade legada) */
export const notas = CHROMATIC_SHARP;

/** Array cromático com bemóis */
export const notasBemois = CHROMATIC_FLAT;

/** Nomes em português (sustenidos) */
export const notasPortugues = notas.map(noteToPortuguese);

/** Mapeamento nota → português (inclui bemóis e sustenidos) */
export const notaParaPortugues = {
  'C': 'Dó',   'C#': 'Dó#',  'Db': 'Réb',
  'D': 'Ré',   'D#': 'Ré#',  'Eb': 'Mib',
  'E': 'Mi',   'E#': 'Fá',   'Fb': 'Mi',
  'F': 'Fá',   'F#': 'Fá#',  'Gb': 'Solb',
  'G': 'Sol',  'G#': 'Sol#', 'Ab': 'Láb',
  'A': 'Lá',   'A#': 'Lá#',  'Bb': 'Sib',
  'B': 'Si',   'B#': 'Dó',   'Cb': 'Si',
};

// ─── Intervalos dos modos gregos ──────────────────────────────────────────────

export const intervalosModosGrecos = {
  jonio:     [0, 2, 4, 5, 7, 9, 11],  // T T S T T T S  (Maior)
  dorico:    [0, 2, 3, 5, 7, 9, 10],  // T S T T T S T
  frigio:    [0, 1, 3, 5, 7, 8, 10],  // S T T T S T T
  lidio:     [0, 2, 4, 6, 7, 9, 11],  // T T T S T T S
  mixolidio: [0, 2, 4, 5, 7, 9, 10],  // T T S T T S T
  eolio:     [0, 2, 3, 5, 7, 8, 10],  // T S T T S T T  (Menor Natural)
  locrio:    [0, 1, 3, 5, 6, 8, 10],  // S T T S T T T
};

// ─── Qualidades dos acordes por modo ─────────────────────────────────────────

export const qualidadesAcordes = {
  jonio:     ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'],
  dorico:    ['m7', 'm7b5', 'maj7', '7', 'm7', 'm7b5', 'maj7'],
  frigio:    ['m7', 'maj7', '7', 'm7', 'm7b5', 'maj7', 'm7'],
  lidio:     ['maj7', '7', 'm7', 'm7b5', 'maj7', 'm7', 'm7'],
  mixolidio: ['7', 'm7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7'],
  eolio:     ['m7', 'm7b5', 'maj7', 'm7', 'm7', 'maj7', '7'],
  locrio:    ['m7b5', 'maj7', 'm7', 'm7', 'maj7', '7', 'm7'],
};

// ─── Funções principais ───────────────────────────────────────────────────────

/**
 * Transpõe uma nota por N semitons, respeitando a preferência de acidente.
 */
export function transporNota(nota, semitons, key) {
  const idx = noteToIndex(nota);
  if (idx === -1) return nota;
  const pref = key ? getKeyPreference(key) : 'sharp';
  return indexToNote((idx + semitons + 12) % 12, pref);
}

/**
 * Gera a escala de um modo em uma tonalidade com nomenclatura correta.
 * Usa o ciclo das quintas para determinar sustenidos vs bemóis.
 */
export function gerarEscala(tonica, modo) {
  const intervalos = intervalosModosGrecos[modo];
  if (!intervalos) return [];
  // getModePreference considera tanto a tonalidade quanto os intervalos do modo:
  // modos com graus bemolizados (Dórico, Frígio, Mixolídio, Eólio, Lócrio)
  // usam bemóis mesmo quando a tônica é natural (ex: Lócrio em C → Db Eb Gb Ab Bb)
  const pref = getModePreference(tonica, intervalos);
  return generateScale(tonica, intervalos, pref);
}

/**
 * Gera o campo harmônico de um modo em uma tonalidade.
 */
export function gerarCampoHarmonico(tonica, modo) {
  const escala = gerarEscala(tonica, modo);
  const qualidades = qualidadesAcordes[modo];
  if (!escala.length || !qualidades) return [];
  return escala.map((nota, index) => nota + qualidades[index]);
}

/**
 * Fórmula intervalar em português para cada modo.
 */
export function obterFormulaPortugues(modo) {
  const formulas = {
    jonio:     '1 - 2 - 3 - 4 - 5 - 6 - 7',
    dorico:    '1 - 2 - b3 - 4 - 5 - 6 - b7',
    frigio:    '1 - b2 - b3 - 4 - 5 - b6 - b7',
    lidio:     '1 - 2 - 3 - #4 - 5 - 6 - 7',
    mixolidio: '1 - 2 - 3 - 4 - 5 - 6 - b7',
    eolio:     '1 - 2 - b3 - 4 - 5 - b6 - b7',
    locrio:    '1 - b2 - b3 - 4 - b5 - b6 - b7',
  };
  return formulas[modo] || '';
}

/**
 * Converte escala para notação portuguesa.
 */
export function escalaParaPortugues(escala) {
  return escala.map(nota => notaParaPortugues[nota] || nota).join(' - ');
}

// ─── Lista de tonalidades (ciclo das quintas) ─────────────────────────────────

/**
 * Tonalidades maiores na ordem do ciclo das quintas.
 * Usa as enarmonias preferidas pela teoria.
 */
export const tonalidades = [
  { key: 'C',  nome: 'Dó Maior',   notaPortugues: 'Dó',   acidentes: 0, tipo: 'natural' },
  { key: 'G',  nome: 'Sol Maior',  notaPortugues: 'Sol',  acidentes: 1, tipo: 'sharp'   },
  { key: 'D',  nome: 'Ré Maior',   notaPortugues: 'Ré',   acidentes: 2, tipo: 'sharp'   },
  { key: 'A',  nome: 'Lá Maior',   notaPortugues: 'Lá',   acidentes: 3, tipo: 'sharp'   },
  { key: 'E',  nome: 'Mi Maior',   notaPortugues: 'Mi',   acidentes: 4, tipo: 'sharp'   },
  { key: 'B',  nome: 'Si Maior',   notaPortugues: 'Si',   acidentes: 5, tipo: 'sharp'   },
  { key: 'F#', nome: 'Fá# Maior',  notaPortugues: 'Fá#',  acidentes: 6, tipo: 'sharp'   },
  { key: 'C#', nome: 'Dó# Maior',  notaPortugues: 'Dó#',  acidentes: 7, tipo: 'sharp'   },
  { key: 'F',  nome: 'Fá Maior',   notaPortugues: 'Fá',   acidentes: 1, tipo: 'flat'    },
  { key: 'Bb', nome: 'Sib Maior',  notaPortugues: 'Sib',  acidentes: 2, tipo: 'flat'    },
  { key: 'Eb', nome: 'Mib Maior',  notaPortugues: 'Mib',  acidentes: 3, tipo: 'flat'    },
  { key: 'Ab', nome: 'Láb Maior',  notaPortugues: 'Láb',  acidentes: 4, tipo: 'flat'    },
  { key: 'Db', nome: 'Réb Maior',  notaPortugues: 'Réb',  acidentes: 5, tipo: 'flat'    },
  { key: 'Gb', nome: 'Solb Maior', notaPortugues: 'Solb', acidentes: 6, tipo: 'flat'    },
];

/**
 * Tonalidades menores na ordem do ciclo das quintas.
 */
export const tonalidadesMenores = [
  { key: 'Am',  nome: 'Lá Menor',   notaPortugues: 'Lá',   acidentes: 0, tipo: 'natural' },
  { key: 'Em',  nome: 'Mi Menor',   notaPortugues: 'Mi',   acidentes: 1, tipo: 'sharp'   },
  { key: 'Bm',  nome: 'Si Menor',   notaPortugues: 'Si',   acidentes: 2, tipo: 'sharp'   },
  { key: 'F#m', nome: 'Fá# Menor',  notaPortugues: 'Fá#',  acidentes: 3, tipo: 'sharp'   },
  { key: 'C#m', nome: 'Dó# Menor',  notaPortugues: 'Dó#',  acidentes: 4, tipo: 'sharp'   },
  { key: 'G#m', nome: 'Sol# Menor', notaPortugues: 'Sol#', acidentes: 5, tipo: 'sharp'   },
  { key: 'D#m', nome: 'Ré# Menor',  notaPortugues: 'Ré#',  acidentes: 6, tipo: 'sharp'   },
  { key: 'Dm',  nome: 'Ré Menor',   notaPortugues: 'Ré',   acidentes: 1, tipo: 'flat'    },
  { key: 'Gm',  nome: 'Sol Menor',  notaPortugues: 'Sol',  acidentes: 2, tipo: 'flat'    },
  { key: 'Cm',  nome: 'Dó Menor',   notaPortugues: 'Dó',   acidentes: 3, tipo: 'flat'    },
  { key: 'Fm',  nome: 'Fá Menor',   notaPortugues: 'Fá',   acidentes: 4, tipo: 'flat'    },
  { key: 'Bbm', nome: 'Sib Menor',  notaPortugues: 'Sib',  acidentes: 5, tipo: 'flat'    },
  { key: 'Ebm', nome: 'Mib Menor',  notaPortugues: 'Mib',  acidentes: 6, tipo: 'flat'    },
];

// ─── Funções auxiliares para AppContext ───────────────────────────────────────

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

export function buildChord(root, type, key) {
  const intervals = {
    major:          [0, 4, 7],
    minor:          [0, 3, 7],
    diminished:     [0, 3, 6],
    augmented:      [0, 4, 8],
    major7:         [0, 4, 7, 11],
    minor7:         [0, 3, 7, 10],
    dominant7:      [0, 4, 7, 10],
    diminished7:    [0, 3, 6, 9],
    half_diminished:[0, 3, 6, 10],
    sus4:           [0, 5, 7],
    sus2:           [0, 2, 7],
  };
  const pref = key ? getKeyPreference(key) : getKeyPreference(root);
  const rootIdx = noteToIndex(root);
  if (rootIdx === -1) return [root];
  const steps = intervals[type] || intervals.major;
  return steps.map(s => indexToNote((rootIdx + s) % 12, pref));
}

export function buildScale(root, mode) {
  return gerarEscala(root, mode || 'jonio');
}
