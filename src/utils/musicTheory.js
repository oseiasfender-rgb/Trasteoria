// Módulo de Teoria Musical
// Construção de acordes, escalas e modos gregos

// Notas cromáticas
export const CHROMATIC_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Fórmulas de intervalos (em semitons a partir da fundamental)
export const CHORD_FORMULAS = {
  major: [0, 4, 7],           // 1 - 3 - 5
  minor: [0, 3, 7],           // 1 - b3 - 5
  diminished: [0, 3, 6],      // 1 - b3 - b5
  augmented: [0, 4, 8],       // 1 - 3 - #5
  sus2: [0, 2, 7],            // 1 - 2 - 5
  sus4: [0, 5, 7],            // 1 - 4 - 5
  major7: [0, 4, 7, 11],      // 1 - 3 - 5 - 7
  minor7: [0, 3, 7, 10],      // 1 - b3 - 5 - b7
  dominant7: [0, 4, 7, 10],   // 1 - 3 - 5 - b7
  minor7b5: [0, 3, 6, 10],    // 1 - b3 - b5 - b7 (half-diminished)
  diminished7: [0, 3, 6, 9]   // 1 - b3 - b5 - bb7
};

// Fórmulas dos Modos Gregos (em semitons)
export const MODE_FORMULAS = {
  ionian: [0, 2, 4, 5, 7, 9, 11],      // 1 2 3 4 5 6 7 (Jônio - Maior)
  dorian: [0, 2, 3, 5, 7, 9, 10],      // 1 2 b3 4 5 6 b7 (Dórico)
  phrygian: [0, 1, 3, 5, 7, 8, 10],    // 1 b2 b3 4 5 b6 b7 (Frígio)
  lydian: [0, 2, 4, 6, 7, 9, 11],      // 1 2 3 #4 5 6 7 (Lídio)
  mixolydian: [0, 2, 4, 5, 7, 9, 10],  // 1 2 3 4 5 6 b7 (Mixolídio)
  aeolian: [0, 2, 3, 5, 7, 8, 10],     // 1 2 b3 4 5 b6 b7 (Eólio - Menor Natural)
  locrian: [0, 1, 3, 5, 6, 8, 10]      // 1 b2 b3 4 b5 b6 b7 (Lócrio)
};

// Nomes dos modos em português
export const MODE_NAMES = {
  ionian: 'Jônio',
  dorian: 'Dórico',
  phrygian: 'Frígio',
  lydian: 'Lídio',
  mixolydian: 'Mixolídio',
  aeolian: 'Eólio',
  locrian: 'Lócrio'
};

/**
 * Obter índice de uma nota no array cromático
 */
export function getNoteIndex(note) {
  // Normalizar bemóis para sustenidos
  const normalizedNote = note
    .replace('Db', 'C#')
    .replace('Eb', 'D#')
    .replace('Gb', 'F#')
    .replace('Ab', 'G#')
    .replace('Bb', 'A#');
  
  return CHROMATIC_NOTES.indexOf(normalizedNote);
}

/**
 * Obter nota a partir de um índice
 */
export function getNoteFromIndex(index) {
  return CHROMATIC_NOTES[index % 12];
}

/**
 * Transpor uma nota por um número de semitons
 */
export function transposeNote(note, semitones) {
  const index = getNoteIndex(note);
  if (index === -1) return null;
  
  const newIndex = (index + semitones + 12) % 12;
  return CHROMATIC_NOTES[newIndex];
}

/**
 * Construir um acorde a partir de uma nota fundamental e tipo
 */
export function buildChord(rootNote, chordType = 'major') {
  const rootIndex = getNoteIndex(rootNote);
  if (rootIndex === -1) return [];
  
  const formula = CHORD_FORMULAS[chordType];
  if (!formula) return [];
  
  return formula.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return CHROMATIC_NOTES[noteIndex];
  });
}

/**
 * Construir voicing de acorde em múltiplas oitavas
 * @param {string} rootNote - Nota fundamental
 * @param {string} chordType - Tipo do acorde
 * @param {string} voicingType - Tipo de voicing ('spread', 'close', 'drop2')
 * @param {number} baseOctave - Oitava base (padrão: 3)
 * @returns {Array} Array de objetos {note, octave}
 */
export function buildChordVoicing(rootNote, chordType = 'major', voicingType = 'spread', baseOctave = 3) {
  const chordNotes = buildChord(rootNote, chordType);
  if (chordNotes.length === 0) return [];
  
  const voicing = [];
  
  if (voicingType === 'spread') {
    // Voicing espalhado em 3 oitavas (som mais rico e completo)
    chordNotes.forEach((note, index) => {
      const octaveOffset = Math.floor(index / 3);
      voicing.push({
        note,
        octave: baseOctave + octaveOffset
      });
    });
  } else if (voicingType === 'close') {
    // Voicing fechado (todas as notas na mesma oitava)
    chordNotes.forEach(note => {
      voicing.push({
        note,
        octave: baseOctave
      });
    });
  } else if (voicingType === 'drop2') {
    // Drop 2 voicing (segunda nota uma oitava abaixo - comum em guitarra jazz)
    chordNotes.forEach((note, index) => {
      voicing.push({
        note,
        octave: index === 1 ? baseOctave - 1 : baseOctave
      });
    });
  } else if (voicingType === 'bass') {
    // Voicing com baixo grave (fundamental 2 oitavas abaixo)
    voicing.push({
      note: chordNotes[0],
      octave: baseOctave - 1  // Baixo uma oitava abaixo
    });
    chordNotes.forEach((note, index) => {
      if (index > 0) {
        voicing.push({
          note,
          octave: baseOctave
        });
      }
    });
  }
  
  return voicing;
}

/**
 * Construir uma escala a partir de uma nota fundamental e modo
 */
export function buildScale(rootNote, mode = 'ionian') {
  const rootIndex = getNoteIndex(rootNote);
  if (rootIndex === -1) return [];
  
  const formula = MODE_FORMULAS[mode];
  if (!formula) return [];
  
  return formula.map(interval => {
    const noteIndex = (rootIndex + interval) % 12;
    return CHROMATIC_NOTES[noteIndex];
  });
}

/**
 * Construir escala em múltiplas oitavas (para cobrir extensão do braço da guitarra)
 * @param {string} rootNote - Nota fundamental
 * @param {string} mode - Modo grego
 * @param {number} numOctaves - Número de oitavas (padrão: 3)
 * @returns {Array} Array de objetos {note, octave}
 */
export function buildScaleMultiOctave(rootNote, mode = 'ionian', numOctaves = 3, startOctave = 3) {
  const singleOctaveScale = buildScale(rootNote, mode);
  if (singleOctaveScale.length === 0) return [];
  
  const multiOctaveScale = [];
  
  for (let oct = 0; oct < numOctaves; oct++) {
    const currentOctave = startOctave + oct;
    singleOctaveScale.forEach(note => {
      multiOctaveScale.push({
        note,
        octave: currentOctave
      });
    });
  }
  
  return multiOctaveScale;
}

/**
 * Identificar tipo de acorde a partir do nome
 * Ex: "Cmaj7" -> "major7", "Dm" -> "minor", "G7" -> "dominant7"
 */
export function identifyChordType(chordName) {
  const name = chordName.toLowerCase();
  
  // Tétrades
  if (name.includes('maj7') || name.includes('m7+') || name.includes('δ')) return 'major7';
  if (name.includes('m7b5') || name.includes('ø')) return 'minor7b5';
  if (name.includes('dim7') || name.includes('°7')) return 'diminished7';
  if (name.includes('m7') || name.includes('min7')) return 'minor7';
  if (name.includes('7')) return 'dominant7';
  
  // Tríades
  if (name.includes('dim') || name.includes('°')) return 'diminished';
  if (name.includes('aug') || name.includes('+')) return 'augmented';
  if (name.includes('sus4')) return 'sus4';
  if (name.includes('sus2')) return 'sus2';
  if (name.includes('m') || name.includes('min') || name.includes('-')) return 'minor';
  
  // Padrão: maior
  return 'major';
}

/**
 * Extrair nota fundamental de um nome de acorde
 * Ex: "Cmaj7" -> "C", "D#m" -> "D#", "Bb7" -> "A#"
 */
export function extractRootNote(chordName) {
  // Pegar os primeiros 1 ou 2 caracteres (nota + possível sustenido/bemol)
  const match = chordName.match(/^([A-G][#b]?)/);
  if (!match) return null;
  
  let note = match[1];
  
  // Normalizar bemóis para sustenidos
  note = note
    .replace('Db', 'C#')
    .replace('Eb', 'D#')
    .replace('Gb', 'F#')
    .replace('Ab', 'G#')
    .replace('Bb', 'A#');
  
  return note;
}

/**
 * Construir campo harmônico de um modo
 * Retorna os 7 acordes do campo harmônico
 */
export function buildHarmonicField(rootNote, mode = 'ionian') {
  const scale = buildScale(rootNote, mode);
  if (scale.length !== 7) return [];
  
  // Fórmulas de acordes para cada grau (baseado em tríades diatônicas)
  const chordTypes = {
    ionian: ['major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished'],
    dorian: ['minor', 'minor', 'major', 'major', 'minor', 'diminished', 'major'],
    phrygian: ['minor', 'major', 'major', 'minor', 'diminished', 'major', 'minor'],
    lydian: ['major', 'major', 'minor', 'diminished', 'major', 'minor', 'minor'],
    mixolydian: ['major', 'minor', 'diminished', 'major', 'minor', 'minor', 'major'],
    aeolian: ['minor', 'diminished', 'major', 'minor', 'minor', 'major', 'major'],
    locrian: ['diminished', 'major', 'minor', 'minor', 'major', 'major', 'minor']
  };
  
  const types = chordTypes[mode] || chordTypes.ionian;
  
  return scale.map((note, index) => ({
    degree: index + 1,
    root: note,
    type: types[index],
    notes: buildChord(note, types[index])
  }));
}

/**
 * Obter intervalo entre duas notas (em semitons)
 */
export function getInterval(note1, note2) {
  const index1 = getNoteIndex(note1);
  const index2 = getNoteIndex(note2);
  
  if (index1 === -1 || index2 === -1) return null;
  
  return (index2 - index1 + 12) % 12;
}

/**
 * Nomes dos intervalos
 */
export const INTERVAL_NAMES = {
  0: 'Uníssono',
  1: 'Segunda Menor',
  2: 'Segunda Maior',
  3: 'Terça Menor',
  4: 'Terça Maior',
  5: 'Quarta Justa',
  6: 'Trítono',
  7: 'Quinta Justa',
  8: 'Sexta Menor',
  9: 'Sexta Maior',
  10: 'Sétima Menor',
  11: 'Sétima Maior'
};

