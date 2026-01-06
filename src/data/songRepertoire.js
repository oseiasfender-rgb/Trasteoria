/**
 * 🎵 Repertório de Músicas
 * Biblioteca de músicas populares para praticar
 */

export const songRepertoire = [
  {
    id: 'wonderwall',
    title: 'Wonderwall',
    artist: 'Oasis',
    genre: 'Rock',
    difficulty: 'Iniciante',
    key: 'Em',
    tempo: 87,
    chords: ['Em', 'G', 'D', 'A7sus4'],
    progression: 'Em - G - D - A7sus4',
    strummingPattern: 'D D U U D U',
    lyrics: `Today is gonna be the day
That they're gonna throw it back to you
By now you should've somehow
Realized what you gotta do`,
    tips: [
      'Use capotraste no 2º traste para tocar na tonalidade original',
      'Pratique a mudança entre Em e G lentamente',
      'O padrão de batida é crucial para o feeling da música'
    ]
  },
  {
    id: 'knockin',
    title: 'Knockin\' on Heaven\'s Door',
    artist: 'Bob Dylan',
    genre: 'Folk',
    difficulty: 'Iniciante',
    key: 'G',
    tempo: 68,
    chords: ['G', 'D', 'Am', 'C'],
    progression: 'G - D - Am - Am | G - D - C - C',
    strummingPattern: 'D D U D U',
    lyrics: `Mama, take this badge off of me
I can't use it anymore
It's gettin' dark, too dark to see
I feel I'm knockin' on heaven's door`,
    tips: [
      'Música perfeita para iniciantes',
      'Apenas 4 acordes simples',
      'Foque no timing e na expressão'
    ]
  },
  {
    id: 'hotel-california',
    title: 'Hotel California',
    artist: 'Eagles',
    genre: 'Rock',
    difficulty: 'Intermediário',
    key: 'Bm',
    tempo: 74,
    chords: ['Bm', 'F#', 'A', 'E', 'G', 'D', 'Em'],
    progression: 'Bm - F# - A - E - G - D - Em - F#',
    strummingPattern: 'D D U U D U',
    lyrics: `On a dark desert highway, cool wind in my hair
Warm smell of colitas, rising up through the air
Up ahead in the distance, I saw a shimmering light
My head grew heavy and my sight grew dim`,
    tips: [
      'Progressão de acordes complexa',
      'Pratique as mudanças lentamente',
      'O solo é icônico mas avançado'
    ]
  },
  {
    id: 'garota-ipanema',
    title: 'Garota de Ipanema',
    artist: 'Tom Jobim',
    genre: 'Bossa Nova',
    difficulty: 'Intermediário',
    key: 'F',
    tempo: 120,
    chords: ['Fmaj7', 'G7', 'Gm7', 'Gb7', 'Fmaj7', 'Gb7', 'B7', 'Fm7', 'D7', 'Gm7', 'Eb7', 'Am7', 'D7b9'],
    progression: 'Fmaj7 - G7 | Gm7 - Gb7 | Fmaj7 - Gb7 | Fm7 - B7',
    strummingPattern: 'Bossa Nova (polegar + dedos)',
    lyrics: `Olha que coisa mais linda
Mais cheia de graça
É ela, menina
Que vem e que passa`,
    tips: [
      'Ritmo de bossa nova é essencial',
      'Use acordes com sétima',
      'Pratique o padrão de polegar + dedos'
    ]
  },
  {
    id: 'stairway',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    genre: 'Rock',
    difficulty: 'Avançado',
    key: 'Am',
    tempo: 72,
    chords: ['Am', 'E', 'C', 'D', 'F', 'G'],
    progression: 'Am - E - C - D - F - G - Am',
    strummingPattern: 'Fingerstyle intro, depois D U D U',
    lyrics: `There's a lady who's sure all that glitters is gold
And she's buying a stairway to heaven
When she gets there she knows, if the stores are all closed
With a word she can get what she came for`,
    tips: [
      'Intro em fingerstyle é icônica',
      'Música longa com várias seções',
      'Requer técnica avançada'
    ]
  },
  {
    id: 'sweet-child',
    title: 'Sweet Child O\' Mine',
    artist: 'Guns N\' Roses',
    genre: 'Rock',
    difficulty: 'Avançado',
    key: 'D',
    tempo: 122,
    chords: ['D', 'C', 'G', 'A'],
    progression: 'D - C - G - D | D - C - G - A',
    strummingPattern: 'Riff icônico + power chords',
    lyrics: `She's got a smile that it seems to me
Reminds me of childhood memories
Where everything was as fresh as the bright blue sky`,
    tips: [
      'Riff de intro é um dos mais famosos',
      'Use técnica de alternate picking',
      'Solo requer bend e vibrato'
    ]
  },
  {
    id: 'stand-by-me',
    title: 'Stand By Me',
    artist: 'Ben E. King',
    genre: 'Soul',
    difficulty: 'Iniciante',
    key: 'A',
    tempo: 118,
    chords: ['A', 'F#m', 'D', 'E'],
    progression: 'A - F#m - D - E - A',
    strummingPattern: 'D D U U D U',
    lyrics: `When the night has come
And the land is dark
And the moon is the only light we'll see`,
    tips: [
      'Progressão I-vi-IV-V clássica',
      'Apenas 4 acordes',
      'Groove é fundamental'
    ]
  },
  {
    id: 'asa-branca',
    title: 'Asa Branca',
    artist: 'Luiz Gonzaga',
    genre: 'Forró',
    difficulty: 'Iniciante',
    key: 'G',
    tempo: 120,
    chords: ['G', 'C', 'D7', 'Em'],
    progression: 'G - C - D7 - G',
    strummingPattern: 'Baião (D U D U D U)',
    lyrics: `Quando olhei a terra ardendo
Qual fogueira de São João
Eu perguntei a Deus do céu, ai
Por que tamanha judiação`,
    tips: [
      'Clássico da música brasileira',
      'Ritmo de baião característico',
      'Simples mas expressivo'
    ]
  },
  {
    id: 'nothing-else-matters',
    title: 'Nothing Else Matters',
    artist: 'Metallica',
    genre: 'Rock',
    difficulty: 'Intermediário',
    key: 'Em',
    tempo: 46,
    chords: ['Em', 'D', 'C', 'G', 'B7', 'Am'],
    progression: 'Em - D - C - Em - D - C - G - B7',
    strummingPattern: 'Fingerstyle intro',
    lyrics: `So close, no matter how far
Couldn't be much more from the heart
Forever trusting who we are
And nothing else matters`,
    tips: [
      'Intro em fingerstyle é linda',
      'Balada lenta e emotiva',
      'Pratique os arpejos lentamente'
    ]
  },
  {
    id: 'imagine',
    title: 'Imagine',
    artist: 'John Lennon',
    genre: 'Pop',
    difficulty: 'Iniciante',
    key: 'C',
    tempo: 76,
    chords: ['C', 'Cmaj7', 'F', 'Am', 'Dm', 'G', 'E7'],
    progression: 'C - Cmaj7 - F | C - Cmaj7 - F',
    strummingPattern: 'Arpejo suave',
    lyrics: `Imagine there's no heaven
It's easy if you try
No hell below us
Above us, only sky`,
    tips: [
      'Melodia icônica e simples',
      'Use arpejos suaves',
      'Foque na expressão vocal'
    ]
  }
];

export const repertoireGenres = ['Todos', 'Rock', 'Pop', 'Folk', 'Bossa Nova', 'Soul', 'Forró'];
export const repertoireDifficulties = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

// Função para filtrar músicas
export function filterSongs(songs, genre = 'Todos', difficulty = 'Todos', searchTerm = '') {
  return songs.filter(song => {
    const genreMatch = genre === 'Todos' || song.genre === genre;
    const difficultyMatch = difficulty === 'Todos' || song.difficulty === difficulty;
    const searchMatch = searchTerm === '' || 
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return genreMatch && difficultyMatch && searchMatch;
  });
}

