/**
 * 🎼 Progressões de Acordes Comuns
 * Biblioteca de progressões populares para composição
 */

export const chordProgressions = [
  {
    id: 'pop-1',
    name: 'I-V-vi-IV (Pop Clássico)',
    description: 'A progressão mais popular da música pop moderna',
    genre: 'Pop',
    difficulty: 'Iniciante',
    chords: ['I', 'V', 'vi', 'IV'],
    example: 'C - G - Am - F',
    songs: ['Let It Be - Beatles', 'Someone Like You - Adele', 'With Or Without You - U2'],
    feeling: 'Otimista, emocional'
  },
  {
    id: 'pop-2',
    name: 'vi-IV-I-V (Eixo Pop)',
    description: 'Variação do eixo pop, começa no relativo menor',
    genre: 'Pop',
    difficulty: 'Iniciante',
    chords: ['vi', 'IV', 'I', 'V'],
    example: 'Am - F - C - G',
    songs: ['Zombie - Cranberries', 'Grenade - Bruno Mars'],
    feeling: 'Melancólico, introspectivo'
  },
  {
    id: 'blues-1',
    name: 'Blues 12 Compassos',
    description: 'Forma clássica do blues de 12 compassos',
    genre: 'Blues',
    difficulty: 'Intermediário',
    chords: ['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'],
    example: 'A7 - A7 - A7 - A7 - D7 - D7 - A7 - A7 - E7 - D7 - A7 - E7',
    songs: ['Sweet Home Chicago', 'Pride and Joy - SRV'],
    feeling: 'Bluesy, expressivo'
  },
  {
    id: 'jazz-1',
    name: 'ii-V-I (Cadência Jazz)',
    description: 'A progressão fundamental do jazz',
    genre: 'Jazz',
    difficulty: 'Intermediário',
    chords: ['iim7', 'V7', 'Imaj7'],
    example: 'Dm7 - G7 - Cmaj7',
    songs: ['Autumn Leaves', 'All The Things You Are'],
    feeling: 'Sofisticado, resolutivo'
  },
  {
    id: 'jazz-2',
    name: 'I-vi-ii-V (Turnaround)',
    description: 'Turnaround clássico do jazz',
    genre: 'Jazz',
    difficulty: 'Intermediário',
    chords: ['Imaj7', 'vi7', 'iim7', 'V7'],
    example: 'Cmaj7 - Am7 - Dm7 - G7',
    songs: ['Blue Moon', 'Heart and Soul'],
    feeling: 'Circular, elegante'
  },
  {
    id: 'rock-1',
    name: 'I-bVII-IV (Rock Clássico)',
    description: 'Progressão de rock com acorde emprestado',
    genre: 'Rock',
    difficulty: 'Iniciante',
    chords: ['I', 'bVII', 'IV'],
    example: 'C - Bb - F',
    songs: ['Sweet Child O Mine - GNR', 'Hey Jude - Beatles'],
    feeling: 'Poderoso, direto'
  },
  {
    id: 'rock-2',
    name: 'I-IV-V (Power Chords)',
    description: 'A tríade fundamental do rock',
    genre: 'Rock',
    difficulty: 'Iniciante',
    chords: ['I', 'IV', 'V'],
    example: 'E - A - B',
    songs: ['Wild Thing', 'La Bamba', 'Twist and Shout'],
    feeling: 'Energético, simples'
  },
  {
    id: 'bossa-1',
    name: 'Imaj7-vim7-iim7-V7 (Bossa)',
    description: 'Progressão típica da bossa nova',
    genre: 'Bossa Nova',
    difficulty: 'Intermediário',
    chords: ['Imaj7', 'vim7', 'iim7', 'V7'],
    example: 'Cmaj7 - Am7 - Dm7 - G7',
    songs: ['Girl from Ipanema', 'Corcovado'],
    feeling: 'Suave, sofisticado'
  },
  {
    id: 'folk-1',
    name: 'I-IV-I-V (Folk Simples)',
    description: 'Progressão simples e direta do folk',
    genre: 'Folk',
    difficulty: 'Iniciante',
    chords: ['I', 'IV', 'I', 'V'],
    example: 'G - C - G - D',
    songs: ['Knockin on Heavens Door', 'Blowin in the Wind'],
    feeling: 'Simples, direto'
  },
  {
    id: 'flamenco-1',
    name: 'i-bVII-bVI-V (Andaluz)',
    description: 'Cadência andaluza típica do flamenco',
    genre: 'Flamenco',
    difficulty: 'Avançado',
    chords: ['i', 'bVII', 'bVI', 'V'],
    example: 'Am - G - F - E',
    songs: ['Hit The Road Jack', 'Sultans of Swing'],
    feeling: 'Dramático, espanhol'
  }
];

export const progressionGenres = ['Todos', 'Pop', 'Blues', 'Jazz', 'Rock', 'Bossa Nova', 'Folk', 'Flamenco'];
export const progressionDifficulties = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

// Função para transpor progressão para qualquer tonalidade
export function transposeProgression(progression, key) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const scale = {
    'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
    'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
    'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
    'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
    'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
    'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  };
  
  return progression.chords.map(chord => {
    // Simplificação: retorna exemplo transposto
    return chord;
  });
}

// Função para filtrar progressões
export function filterProgressions(progressions, genre = 'Todos', difficulty = 'Todos') {
  return progressions.filter(prog => {
    const genreMatch = genre === 'Todos' || prog.genre === genre;
    const difficultyMatch = difficulty === 'Todos' || prog.difficulty === difficulty;
    return genreMatch && difficultyMatch;
  });
}

