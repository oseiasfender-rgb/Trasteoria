/**
 * 🎵 noteNaming.js — Sistema Central de Nomenclatura de Notas
 *
 * Implementa o ciclo das quintas e das quartas com enarmonias corretas.
 *
 * CICLO DAS QUINTAS (sustenidos):  C → G → D → A → E → B → F# → C# → G# → D# → A# → E#(=F)
 * CICLO DAS QUARTAS (bemóis):      C → F → Bb → Eb → Ab → Db → Gb → Cb(=B) → Fb(=E) → ...
 *
 * Regra de enarmonia por tonalidade:
 *   - Tonalidades com sustenidos (G, D, A, E, B, F#, C#) → usar sustenidos para acidentes
 *   - Tonalidades com bemóis (F, Bb, Eb, Ab, Db, Gb) → usar bemóis para acidentes
 *   - C → neutro (sem acidentes)
 *
 * Índice cromático (0–11):
 *   0=C  1=C#/Db  2=D  3=D#/Eb  4=E  5=F  6=F#/Gb  7=G  8=G#/Ab  9=A  10=A#/Bb  11=B
 */

// ─── Arrays cromáticos ────────────────────────────────────────────────────────

/** Notas com sustenidos (padrão para engines e cálculos internos) */
export const CHROMATIC_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/** Notas com bemóis */
export const CHROMATIC_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// ─── Ciclo das quintas ────────────────────────────────────────────────────────

/**
 * Ordem do ciclo das quintas (sentido horário):
 * C G D A E B F# C# G# D# A# F
 * (G# = Ab, D# = Eb, A# = Bb são as enarmonias dos bemóis)
 */
export const CIRCLE_OF_FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F'];

/**
 * Ordem do ciclo das quartas (sentido anti-horário / bemóis):
 * C F Bb Eb Ab Db Gb B E A D G
 */
export const CIRCLE_OF_FOURTHS = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];

// ─── Mapa de tonalidades → preferência de acidente ───────────────────────────

/**
 * Para cada tonalidade, define se usa sustenidos (#) ou bemóis (b).
 * Baseado na assinatura de clave (key signature) padrão da teoria musical.
 */
export const KEY_PREFERENCE = {
  // Tonalidades com sustenidos
  'C':  'natural', // 0 acidentes
  'G':  'sharp',   // 1# (F#)
  'D':  'sharp',   // 2# (F#, C#)
  'A':  'sharp',   // 3# (F#, C#, G#)
  'E':  'sharp',   // 4# (F#, C#, G#, D#)
  'B':  'sharp',   // 5# (F#, C#, G#, D#, A#)
  'F#': 'sharp',   // 6# (F#, C#, G#, D#, A#, E#)
  'C#': 'sharp',   // 7# (todos)

  // Tonalidades com bemóis
  'F':  'flat',    // 1b (Bb)
  'Bb': 'flat',    // 2b (Bb, Eb)
  'Eb': 'flat',    // 3b (Bb, Eb, Ab)
  'Ab': 'flat',    // 4b (Bb, Eb, Ab, Db)
  'Db': 'flat',    // 5b (Bb, Eb, Ab, Db, Gb)
  'Gb': 'flat',    // 6b (Bb, Eb, Ab, Db, Gb, Cb)
  'Cb': 'flat',    // 7b (todos)

  // Menores com sustenidos (relativas)
  'Am': 'natural',
  'Em': 'sharp',
  'Bm': 'sharp',
  'F#m':'sharp',
  'C#m':'sharp',
  'G#m':'sharp',
  'D#m':'sharp',

  // Menores com bemóis
  'Dm': 'flat',
  'Gm': 'flat',
  'Cm': 'flat',
  'Fm': 'flat',
  'Bbm':'flat',
  'Ebm':'flat',
  'Abm':'flat',
};

// ─── Escalas diatônicas corretas por tonalidade ───────────────────────────────

/**
 * Notas diatônicas corretas para cada tonalidade maior.
 * Seguem rigorosamente a teoria: cada grau usa uma letra diferente.
 */
export const MAJOR_SCALE_NOTES = {
  'C':  ['C',  'D',  'E',  'F',  'G',  'A',  'B'],
  'G':  ['G',  'A',  'B',  'C',  'D',  'E',  'F#'],
  'D':  ['D',  'E',  'F#', 'G',  'A',  'B',  'C#'],
  'A':  ['A',  'B',  'C#', 'D',  'E',  'F#', 'G#'],
  'E':  ['E',  'F#', 'G#', 'A',  'B',  'C#', 'D#'],
  'B':  ['B',  'C#', 'D#', 'E',  'F#', 'G#', 'A#'],
  'F#': ['F#', 'G#', 'A#', 'B',  'C#', 'D#', 'E#'],
  'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
  'F':  ['F',  'G',  'A',  'Bb', 'C',  'D',  'E'],
  'Bb': ['Bb', 'C',  'D',  'Eb', 'F',  'G',  'A'],
  'Eb': ['Eb', 'F',  'G',  'Ab', 'Bb', 'C',  'D'],
  'Ab': ['Ab', 'Bb', 'C',  'Db', 'Eb', 'F',  'G'],
  'Db': ['Db', 'Eb', 'F',  'Gb', 'Ab', 'Bb', 'C'],
  'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'],
  'Cb': ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'],
};

/**
 * Notas diatônicas corretas para cada tonalidade menor natural.
 */
export const MINOR_SCALE_NOTES = {
  'Am': ['A',  'B',  'C',  'D',  'E',  'F',  'G'],
  'Em': ['E',  'F#', 'G',  'A',  'B',  'C',  'D'],
  'Bm': ['B',  'C#', 'D',  'E',  'F#', 'G',  'A'],
  'F#m':['F#', 'G#', 'A',  'B',  'C#', 'D',  'E'],
  'C#m':['C#', 'D#', 'E',  'F#', 'G#', 'A',  'B'],
  'G#m':['G#', 'A#', 'B',  'C#', 'D#', 'E',  'F#'],
  'D#m':['D#', 'E#', 'F#', 'G#', 'A#', 'B',  'C#'],
  'Dm': ['D',  'E',  'F',  'G',  'A',  'Bb', 'C'],
  'Gm': ['G',  'A',  'Bb', 'C',  'D',  'Eb', 'F'],
  'Cm': ['C',  'D',  'Eb', 'F',  'G',  'Ab', 'Bb'],
  'Fm': ['F',  'G',  'Ab', 'Bb', 'C',  'Db', 'Eb'],
  'Bbm':['Bb', 'C',  'Db', 'Eb', 'F',  'Gb', 'Ab'],
  'Ebm':['Eb', 'F',  'Gb', 'Ab', 'Bb', 'Cb', 'Db'],
  'Abm':['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'],
};

// ─── Funções utilitárias ──────────────────────────────────────────────────────

/**
 * Retorna o índice cromático (0–11) de uma nota, aceitando # e b.
 */
export function noteToIndex(note) {
  const sharp = CHROMATIC_SHARP.indexOf(note);
  if (sharp !== -1) return sharp;
  const flat = CHROMATIC_FLAT.indexOf(note);
  if (flat !== -1) return flat;
  // Casos especiais: E#=F, B#=C, Fb=E, Cb=B
  const special = { 'E#': 5, 'B#': 0, 'Fb': 4, 'Cb': 11, 'A##': 10, 'G##': 9 };
  return special[note] ?? -1;
}

/**
 * Converte índice cromático para nome de nota, usando preferência de acidente.
 * @param {number} index - 0 a 11
 * @param {'sharp'|'flat'|'natural'} preference - padrão 'sharp'
 */
export function indexToNote(index, preference = 'sharp') {
  const i = ((index % 12) + 12) % 12;
  if (preference === 'flat') return CHROMATIC_FLAT[i];
  return CHROMATIC_SHARP[i];
}

/**
 * Retorna a nota correta para um grau de uma escala diatônica,
 * usando a tonalidade para determinar a enarmonia correta.
 * @param {number} rootIndex - índice cromático da tônica
 * @param {number} interval - semitom do grau (0–11)
 * @param {'sharp'|'flat'|'natural'} preference
 */
export function diatonicNote(rootIndex, interval, preference = 'sharp') {
  const idx = (rootIndex + interval) % 12;
  return indexToNote(idx, preference);
}

/**
 * Retorna a preferência de acidente para uma tonalidade.
 * @param {string} key - ex: 'C', 'F#', 'Bb'
 */
export function getKeyPreference(key) {
  return KEY_PREFERENCE[key] ?? 'sharp';
}

/**
 * Gera a escala diatônica maior correta para uma tonalidade.
 * Usa MAJOR_SCALE_NOTES se disponível, senão calcula com preferência.
 */
export function getMajorScale(key) {
  if (MAJOR_SCALE_NOTES[key]) return MAJOR_SCALE_NOTES[key];
  const pref = getKeyPreference(key);
  const root = noteToIndex(key);
  if (root === -1) return [];
  return [0, 2, 4, 5, 7, 9, 11].map(i => indexToNote((root + i) % 12, pref));
}

/**
 * Gera a escala menor natural correta para uma tonalidade.
 */
export function getMinorScale(key) {
  const minKey = key.endsWith('m') ? key : key + 'm';
  if (MINOR_SCALE_NOTES[minKey]) return MINOR_SCALE_NOTES[minKey];
  const pref = getKeyPreference(key);
  const root = noteToIndex(key);
  if (root === -1) return [];
  return [0, 2, 3, 5, 7, 8, 10].map(i => indexToNote((root + i) % 12, pref));
}

/**
 * Retorna o nome correto de uma nota enarmônica dado o contexto da tonalidade.
 * Ex: noteInKey('A#', 'F') → 'Bb'
 *     noteInKey('Bb', 'G') → 'A#' (não existe A# em G, mas em contexto de sustenido)
 */
export function noteInKey(note, key) {
  const pref = getKeyPreference(key);
  const idx = noteToIndex(note);
  if (idx === -1) return note;
  return indexToNote(idx, pref);
}

/**
 * Converte um array de notas para a nomenclatura correta de uma tonalidade.
 */
export function normalizeNotesForKey(notes, key) {
  const pref = getKeyPreference(key);
  return notes.map(n => {
    const idx = noteToIndex(n);
    return idx === -1 ? n : indexToNote(idx, pref);
  });
}

/**
 * Retorna o nome em português de uma nota.
 */
export function noteToPortuguese(note) {
  const map = {
    'C': 'Dó',   'C#': 'Dó#',  'Db': 'Réb',
    'D': 'Ré',   'D#': 'Ré#',  'Eb': 'Mib',
    'E': 'Mi',   'E#': 'Fá',   'Fb': 'Mi',
    'F': 'Fá',   'F#': 'Fá#',  'Gb': 'Solb',
    'G': 'Sol',  'G#': 'Sol#', 'Ab': 'Láb',
    'A': 'Lá',   'A#': 'Lá#',  'Bb': 'Sib',
    'B': 'Si',   'B#': 'Dó',   'Cb': 'Si',
  };
  return map[note] ?? note;
}

/**
 * Retorna o nome em português com bemol/sustenido correto para a tonalidade.
 */
export function noteToPortugueseInKey(note, key) {
  return noteToPortuguese(noteInKey(note, key));
}

/**
 * Array de tonalidades na ordem do ciclo das quintas (para UIs de seleção).
 * Inclui as enarmonias mais usadas.
 */
export const KEYS_CIRCLE_OF_FIFTHS = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F#',
  'Db', 'Ab', 'Eb', 'Bb', 'F'
];

/**
 * Mapa de enarmonias equivalentes (para lookup bidirecional).
 */
export const ENHARMONIC_MAP = {
  'C#': 'Db', 'Db': 'C#',
  'D#': 'Eb', 'Eb': 'D#',
  'F#': 'Gb', 'Gb': 'F#',
  'G#': 'Ab', 'Ab': 'G#',
  'A#': 'Bb', 'Bb': 'A#',
  'E#': 'F',  'F':  'E#',
  'B#': 'C',  'C':  'B#',
  'Fb': 'E',  'E':  'Fb',
  'Cb': 'B',  'B':  'Cb',
};

/**
 * Retorna a enarmônica equivalente de uma nota.
 */
export function getEnharmonic(note) {
  return ENHARMONIC_MAP[note] ?? note;
}

/**
 * Gera escala de qualquer modo para uma tonalidade, com nomenclatura correta.
 * @param {string} key - tonalidade (ex: 'F#', 'Bb')
 * @param {number[]} intervals - array de semitons (ex: [0,2,4,5,7,9,11] para maior)
 * @param {'sharp'|'flat'|'natural'|null} forcePref - forçar preferência (null = auto)
 */
export function generateScale(key, intervals, forcePref = null) {
  const pref = forcePref ?? getKeyPreference(key);
  const root = noteToIndex(key);
  if (root === -1) return [];
  return intervals.map(i => indexToNote((root + i) % 12, pref));
}

// ─── Exportação de compatibilidade ───────────────────────────────────────────

/**
 * Array NOTES padrão (sustenidos) — mantido para compatibilidade com código legado.
 * Para novos usos, prefira CHROMATIC_SHARP ou generateScale().
 */
export const NOTES = CHROMATIC_SHARP;

/**
 * Mapa de notas para índice (lookup rápido).
 */
export const NOTE_INDEX = Object.fromEntries(
  CHROMATIC_SHARP.map((n, i) => [n, i]).concat(
    CHROMATIC_FLAT.map((n, i) => [n, i])
  )
);
