// bandCreatorData.js
// Estrutura completa de 12 Gêneros × 12 Estilos = 144 Combinações
// Baseado em iReal Pro, Band-in-a-Box e DigiTech TRIO+

export const GENRES = {
  BLUES: 'blues',
  RB: 'rb',
  ROCK: 'rock',
  ALT_ROCK: 'alt_rock',
  METAL: 'metal',
  POP: 'pop',
  E_POP: 'e_pop',
  HIP_HOP: 'hip_hop',
  COUNTRY: 'country',
  FOLK: 'folk',
  LATIN: 'latin',
  JAZZ: 'jazz'
};

export const BASS_MODES = {
  ROOT: 'root',         // Apenas fundamentais
  WALKING: 'walking',   // Walking bass (jazz style)
  MELODIC: 'melodic'    // Linhas melódicas
};

export const bandCreatorData = {
  
  // ============================================
  // BLUES
  // ============================================
  blues: {
    id: 'blues',
    name: 'Blues',
    icon: '🎸',
    description: 'Fundação da música moderna, com swing e feeling',
    defaultBpm: [80, 140],
    timeSignatures: ['4/4', '12/8'],
    
    styles: [
      {
        id: 1,
        name: 'Shuffle Blues',
        bpm: [80, 120],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Swing clássico com triplets',
        drumPattern: 'shuffle',
        bassPattern: 'walking',
        intensity: 0.7,
        characteristics: {
          kick: 'on 1 and 3',
          snare: 'on 2 and 4',
          hihat: 'shuffle pattern',
          ride: 'optional swing'
        }
      },
      {
        id: 2,
        name: 'Slow Blues',
        bpm: [50, 75],
        timeSignature: '12/8',
        swing: 0.70,
        feel: 'Lento e expressivo',
        drumPattern: 'slow_blues',
        bassPattern: 'root',
        intensity: 0.5,
        characteristics: {
          kick: 'on 1',
          snare: 'on 3',
          hihat: 'triplet feel',
          brushes: true
        }
      },
      {
        id: 3,
        name: 'Chicago Blues',
        bpm: [90, 130],
        timeSignature: '4/4',
        swing: 0.65,
        feel: 'Urbano e energético',
        drumPattern: 'chicago',
        bassPattern: 'walking',
        intensity: 0.8
      },
      {
        id: 4,
        name: 'Texas Blues',
        bpm: [100, 140],
        timeSignature: '4/4',
        swing: 0.60,
        feel: 'Driving e poderoso',
        drumPattern: 'texas',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 5,
        name: 'Jump Blues',
        bpm: [140, 180],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Rápido e dançante',
        drumPattern: 'jump',
        bassPattern: 'walking',
        intensity: 0.9
      },
      {
        id: 6,
        name: 'Blues Rock',
        bpm: [110, 150],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Rock com raízes blues',
        drumPattern: 'blues_rock',
        bassPattern: 'melodic',
        intensity: 0.9
      },
      {
        id: 7,
        name: 'Delta Blues',
        bpm: [70, 100],
        timeSignature: '4/4',
        swing: 0.70,
        feel: 'Acústico e tradicional',
        drumPattern: 'delta',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 8,
        name: 'Blues Ballad',
        bpm: [50, 70],
        timeSignature: '4/4',
        swing: 0.65,
        feel: 'Romântico e melancólico',
        drumPattern: 'ballad',
        bassPattern: 'root',
        intensity: 0.4
      },
      {
        id: 9,
        name: 'Boogie Blues',
        bpm: [120, 160],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Groove contagiante',
        drumPattern: 'boogie',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 10,
        name: 'Blues Swing',
        bpm: [110, 140],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Jazz meets blues',
        drumPattern: 'swing',
        bassPattern: 'walking',
        intensity: 0.75
      },
      {
        id: 11,
        name: 'Minor Blues',
        bpm: [80, 120],
        timeSignature: '4/4',
        swing: 0.65,
        feel: 'Sombrio e intenso',
        drumPattern: 'minor_blues',
        bassPattern: 'walking',
        intensity: 0.8
      },
      {
        id: 12,
        name: 'Blues Funk',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Groove funk com blues',
        drumPattern: 'funk',
        bassPattern: 'melodic',
        intensity: 0.85
      }
    ]
  },

  // ============================================
  // R&B
  // ============================================
  rb: {
    id: 'rb',
    name: 'R&B',
    icon: '🎤',
    description: 'Rhythm & Blues com groove e soul',
    defaultBpm: [70, 110],
    timeSignatures: ['4/4'],
    
    styles: [
      {
        id: 1,
        name: 'Classic R&B',
        bpm: [75, 95],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Motown style',
        drumPattern: 'classic_rb',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 2,
        name: 'Neo Soul',
        bpm: [80, 100],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Moderno e sofisticado',
        drumPattern: 'neo_soul',
        bassPattern: 'melodic',
        intensity: 0.6
      },
      {
        id: 3,
        name: 'Slow Jam',
        bpm: [60, 75],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Romântico e suave',
        drumPattern: 'slow_jam',
        bassPattern: 'root',
        intensity: 0.4
      },
      {
        id: 4,
        name: 'Contemporary R&B',
        bpm: [85, 110],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Pop meets R&B',
        drumPattern: 'contemporary',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 5,
        name: 'Funk Soul',
        bpm: [95, 115],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Groove pesado',
        drumPattern: 'funk_soul',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 6,
        name: 'Gospel R&B',
        bpm: [70, 95],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Espiritual e emotivo',
        drumPattern: 'gospel',
        bassPattern: 'walking',
        intensity: 0.7
      },
      {
        id: 7,
        name: 'Quiet Storm',
        bpm: [65, 80],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Smooth e relaxante',
        drumPattern: 'quiet_storm',
        bassPattern: 'root',
        intensity: 0.5
      },
      {
        id: 8,
        name: 'New Jack Swing',
        bpm: [100, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Hip-hop meets R&B',
        drumPattern: 'new_jack',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 9,
        name: 'Doo-Wop',
        bpm: [110, 140],
        timeSignature: '4/4',
        swing: 0.60,
        feel: 'Vintage e dançante',
        drumPattern: 'doo_wop',
        bassPattern: 'walking',
        intensity: 0.7
      },
      {
        id: 10,
        name: 'Motown',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Clássico Detroit sound',
        drumPattern: 'motown',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 11,
        name: 'Soul Ballad',
        bpm: [55, 70],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Profundo e emotivo',
        drumPattern: 'soul_ballad',
        bassPattern: 'root',
        intensity: 0.4
      },
      {
        id: 12,
        name: 'Funk R&B',
        bpm: [95, 115],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Groove irresistível',
        drumPattern: 'funk_rb',
        bassPattern: 'melodic',
        intensity: 0.85
      }
    ]
  },

  // ============================================
  // ROCK
  // ============================================
  rock: {
    id: 'rock',
    name: 'Rock',
    icon: '🤘',
    description: 'Rock clássico com energia e atitude',
    defaultBpm: [110, 140],
    timeSignatures: ['4/4'],
    
    styles: [
      {
        id: 1,
        name: 'Classic Rock',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Driving e poderoso',
        drumPattern: 'classic_rock',
        bassPattern: 'root',
        intensity: 0.8
      },
      {
        id: 2,
        name: 'Hard Rock',
        bpm: [120, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Pesado e agressivo',
        drumPattern: 'hard_rock',
        bassPattern: 'root',
        intensity: 0.9
      },
      {
        id: 3,
        name: 'Rock Ballad',
        bpm: [60, 80],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Emotivo e épico',
        drumPattern: 'rock_ballad',
        bassPattern: 'root',
        intensity: 0.5
      },
      {
        id: 4,
        name: 'Southern Rock',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Bluesy e groovy',
        drumPattern: 'southern',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 5,
        name: 'Arena Rock',
        bpm: [115, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Anthemic e grandioso',
        drumPattern: 'arena',
        bassPattern: 'root',
        intensity: 0.85
      },
      {
        id: 6,
        name: 'Garage Rock',
        bpm: [130, 160],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Cru e energético',
        drumPattern: 'garage',
        bassPattern: 'root',
        intensity: 0.85
      },
      {
        id: 7,
        name: 'Surf Rock',
        bpm: [140, 170],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Rápido e instrumental',
        drumPattern: 'surf',
        bassPattern: 'root',
        intensity: 0.8
      },
      {
        id: 8,
        name: 'Psychedelic Rock',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Experimental e atmosférico',
        drumPattern: 'psychedelic',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 9,
        name: 'Glam Rock',
        bpm: [120, 145],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Teatral e energético',
        drumPattern: 'glam',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 10,
        name: 'Blues Rock',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Blues com distorção',
        drumPattern: 'blues_rock',
        bassPattern: 'walking',
        intensity: 0.8
      },
      {
        id: 11,
        name: 'Rockabilly',
        bpm: [150, 180],
        timeSignature: '4/4',
        swing: 0.60,
        feel: 'Vintage e dançante',
        drumPattern: 'rockabilly',
        bassPattern: 'walking',
        intensity: 0.85
      },
      {
        id: 12,
        name: 'Power Pop',
        bpm: [130, 160],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Melódico e energético',
        drumPattern: 'power_pop',
        bassPattern: 'melodic',
        intensity: 0.8
      }
    ]
  },

  // ============================================
  // ALT ROCK
  // ============================================
  alt_rock: {
    id: 'alt_rock',
    name: 'Alt Rock',
    icon: '🎧',
    description: 'Rock alternativo e indie',
    defaultBpm: [100, 140],
    timeSignatures: ['4/4', '7/8'],
    
    styles: [
      {
        id: 1,
        name: 'Grunge',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Pesado e angustiado',
        drumPattern: 'grunge',
        bassPattern: 'root',
        intensity: 0.85
      },
      {
        id: 2,
        name: 'Indie Rock',
        bpm: [110, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Criativo e melódico',
        drumPattern: 'indie',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 3,
        name: 'Post-Punk',
        bpm: [120, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Angular e tenso',
        drumPattern: 'post_punk',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 4,
        name: 'Shoegaze',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Atmosférico e denso',
        drumPattern: 'shoegaze',
        bassPattern: 'root',
        intensity: 0.7
      },
      {
        id: 5,
        name: 'Britpop',
        bpm: [120, 145],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Anthemic e melódico',
        drumPattern: 'britpop',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 6,
        name: 'Emo',
        bpm: [140, 170],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Emotivo e energético',
        drumPattern: 'emo',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 7,
        name: 'Math Rock',
        bpm: [110, 150],
        timeSignature: '7/8',
        swing: 0.50,
        feel: 'Complexo e técnico',
        drumPattern: 'math_rock',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 8,
        name: 'Post-Rock',
        bpm: [80, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Cinematográfico e crescente',
        drumPattern: 'post_rock',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 9,
        name: 'New Wave',
        bpm: [120, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Synth-driven e dançante',
        drumPattern: 'new_wave',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 10,
        name: 'College Rock',
        bpm: [120, 145],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Jangly e melódico',
        drumPattern: 'college',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 11,
        name: 'Dream Pop',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Etéreo e atmosférico',
        drumPattern: 'dream_pop',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 12,
        name: 'Noise Rock',
        bpm: [100, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Caótico e experimental',
        drumPattern: 'noise',
        bassPattern: 'root',
        intensity: 0.9
      }
    ]
  },

  // ============================================
  // METAL
  // ============================================
  metal: {
    id: 'metal',
    name: 'Metal',
    icon: '⚡',
    description: 'Heavy metal em todas as suas formas',
    defaultBpm: [120, 180],
    timeSignatures: ['4/4', '7/8'],
    
    styles: [
      {
        id: 1,
        name: 'Heavy Metal',
        bpm: [120, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Clássico e poderoso',
        drumPattern: 'heavy_metal',
        bassPattern: 'root',
        intensity: 0.9
      },
      {
        id: 2,
        name: 'Thrash Metal',
        bpm: [160, 200],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Rápido e agressivo',
        drumPattern: 'thrash',
        bassPattern: 'root',
        intensity: 0.95
      },
      {
        id: 3,
        name: 'Death Metal',
        bpm: [140, 180],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Brutal e técnico',
        drumPattern: 'death_metal',
        bassPattern: 'root',
        intensity: 1.0
      },
      {
        id: 4,
        name: 'Black Metal',
        bpm: [160, 200],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Atmosférico e veloz',
        drumPattern: 'black_metal',
        bassPattern: 'root',
        intensity: 0.95
      },
      {
        id: 5,
        name: 'Power Metal',
        bpm: [150, 190],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Épico e melódico',
        drumPattern: 'power_metal',
        bassPattern: 'melodic',
        intensity: 0.9
      },
      {
        id: 6,
        name: 'Doom Metal',
        bpm: [60, 90],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Lento e pesado',
        drumPattern: 'doom',
        bassPattern: 'root',
        intensity: 0.85
      },
      {
        id: 7,
        name: 'Progressive Metal',
        bpm: [120, 160],
        timeSignature: '7/8',
        swing: 0.50,
        feel: 'Complexo e técnico',
        drumPattern: 'prog_metal',
        bassPattern: 'melodic',
        intensity: 0.9
      },
      {
        id: 8,
        name: 'Metalcore',
        bpm: [150, 180],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Breakdown-heavy',
        drumPattern: 'metalcore',
        bassPattern: 'root',
        intensity: 0.95
      },
      {
        id: 9,
        name: 'Nu Metal',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Groove pesado',
        drumPattern: 'nu_metal',
        bassPattern: 'root',
        intensity: 0.85
      },
      {
        id: 10,
        name: 'Symphonic Metal',
        bpm: [130, 160],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Orquestral e épico',
        drumPattern: 'symphonic',
        bassPattern: 'melodic',
        intensity: 0.9
      },
      {
        id: 11,
        name: 'Groove Metal',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Groove pesado e sincopado',
        drumPattern: 'groove_metal',
        bassPattern: 'root',
        intensity: 0.9
      },
      {
        id: 12,
        name: 'Industrial Metal',
        bpm: [120, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Mecânico e eletrônico',
        drumPattern: 'industrial',
        bassPattern: 'root',
        intensity: 0.9
      }
    ]
  },

  // ============================================
  // POP
  // ============================================
  pop: {
    id: 'pop',
    name: 'Pop',
    icon: '🎵',
    description: 'Pop contemporâneo e comercial',
    defaultBpm: [100, 130],
    timeSignatures: ['4/4'],
    
    styles: [
      {
        id: 1,
        name: 'Pop Rock',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Energético e melódico',
        drumPattern: 'pop_rock',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 2,
        name: 'Dance Pop',
        bpm: [120, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Dançante e eletrônico',
        drumPattern: 'dance_pop',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 3,
        name: 'Teen Pop',
        bpm: [115, 135],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Jovem e energético',
        drumPattern: 'teen_pop',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 4,
        name: 'Synth Pop',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Sintético e retro',
        drumPattern: 'synth_pop',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 5,
        name: 'Power Pop',
        bpm: [130, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Energético e melódico',
        drumPattern: 'power_pop',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 6,
        name: 'Bubblegum Pop',
        bpm: [120, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Alegre e cativante',
        drumPattern: 'bubblegum',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 7,
        name: 'Soft Pop',
        bpm: [90, 110],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Suave e relaxante',
        drumPattern: 'soft_pop',
        bassPattern: 'root',
        intensity: 0.5
      },
      {
        id: 8,
        name: 'Indie Pop',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Alternativo e melódico',
        drumPattern: 'indie_pop',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 9,
        name: 'Art Pop',
        bpm: [100, 125],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Experimental e artístico',
        drumPattern: 'art_pop',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 10,
        name: 'Electropop',
        bpm: [120, 135],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Eletrônico e dançante',
        drumPattern: 'electropop',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 11,
        name: 'Pop Ballad',
        bpm: [60, 80],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Emotivo e dramático',
        drumPattern: 'pop_ballad',
        bassPattern: 'root',
        intensity: 0.5
      },
      {
        id: 12,
        name: 'K-Pop',
        bpm: [120, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Energético e produzido',
        drumPattern: 'kpop',
        bassPattern: 'melodic',
        intensity: 0.85
      }
    ]
  },

  // ============================================
  // E-POP (Electronic Pop)
  // ============================================
  e_pop: {
    id: 'e_pop',
    name: 'E-Pop',
    icon: '🎹',
    description: 'Pop eletrônico e EDM',
    defaultBpm: [120, 140],
    timeSignatures: ['4/4'],
    
    styles: [
      {
        id: 1,
        name: 'EDM Pop',
        bpm: [128, 132],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Festival-ready',
        drumPattern: 'edm',
        bassPattern: 'melodic',
        intensity: 0.9
      },
      {
        id: 2,
        name: 'Future Bass',
        bpm: [140, 160],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Moderno e atmosférico',
        drumPattern: 'future_bass',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 3,
        name: 'Tropical House',
        bpm: [100, 115],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Relaxante e dançante',
        drumPattern: 'tropical',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 4,
        name: 'Deep House',
        bpm: [120, 125],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Groove profundo',
        drumPattern: 'deep_house',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 5,
        name: 'Progressive House',
        bpm: [125, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Build-ups épicos',
        drumPattern: 'prog_house',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 6,
        name: 'Electro House',
        bpm: [128, 132],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Energético e pesado',
        drumPattern: 'electro_house',
        bassPattern: 'melodic',
        intensity: 0.9
      },
      {
        id: 7,
        name: 'Dubstep',
        bpm: [140, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Wobble bass pesado',
        drumPattern: 'dubstep',
        bassPattern: 'melodic',
        intensity: 0.95
      },
      {
        id: 8,
        name: 'Trap',
        bpm: [135, 145],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Hi-hats rápidos',
        drumPattern: 'trap',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 9,
        name: 'Chillwave',
        bpm: [90, 110],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Nostálgico e relaxante',
        drumPattern: 'chillwave',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 10,
        name: 'Synthwave',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Retro 80s',
        drumPattern: 'synthwave',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 11,
        name: 'Drum & Bass',
        bpm: [170, 180],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Breakbeats rápidos',
        drumPattern: 'dnb',
        bassPattern: 'melodic',
        intensity: 0.9
      },
      {
        id: 12,
        name: 'Downtempo',
        bpm: [80, 100],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Chill e atmosférico',
        drumPattern: 'downtempo',
        bassPattern: 'root',
        intensity: 0.5
      }
    ]
  },

  // ============================================
  // HIP-HOP
  // ============================================
  hip_hop: {
    id: 'hip_hop',
    name: 'Hip-Hop',
    icon: '🎤',
    description: 'Hip-hop e rap em diversos estilos',
    defaultBpm: [80, 110],
    timeSignatures: ['4/4'],
    
    styles: [
      {
        id: 1,
        name: 'Boom Bap',
        bpm: [85, 95],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Clássico NY style',
        drumPattern: 'boom_bap',
        bassPattern: 'root',
        intensity: 0.7
      },
      {
        id: 2,
        name: 'Trap',
        bpm: [135, 145],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Hi-hats triplets',
        drumPattern: 'trap',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 3,
        name: 'G-Funk',
        bpm: [90, 105],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'West Coast groove',
        drumPattern: 'g_funk',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 4,
        name: 'Drill',
        bpm: [60, 75],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Dark e agressivo',
        drumPattern: 'drill',
        bassPattern: 'root',
        intensity: 0.8
      },
      {
        id: 5,
        name: 'Cloud Rap',
        bpm: [70, 90],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Atmosférico e etéreo',
        drumPattern: 'cloud_rap',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 6,
        name: 'Crunk',
        bpm: [70, 85],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Energético e pesado',
        drumPattern: 'crunk',
        bassPattern: 'root',
        intensity: 0.85
      },
      {
        id: 7,
        name: 'Miami Bass',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Bass pesado e dançante',
        drumPattern: 'miami_bass',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 8,
        name: 'Conscious Hip-Hop',
        bpm: [85, 100],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Lírico e melódico',
        drumPattern: 'conscious',
        bassPattern: 'melodic',
        intensity: 0.65
      },
      {
        id: 9,
        name: 'Lo-Fi Hip-Hop',
        bpm: [70, 90],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Chill e nostálgico',
        drumPattern: 'lofi',
        bassPattern: 'root',
        intensity: 0.5
      },
      {
        id: 10,
        name: 'Mumble Rap',
        bpm: [130, 150],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Moderno e melódico',
        drumPattern: 'mumble',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 11,
        name: 'Old School',
        bpm: [95, 110],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Vintage e funky',
        drumPattern: 'old_school',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 12,
        name: 'UK Grime',
        bpm: [140, 145],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Agressivo e sincopado',
        drumPattern: 'grime',
        bassPattern: 'melodic',
        intensity: 0.85
      }
    ]
  },

  // ============================================
  // COUNTRY
  // ============================================
  country: {
    id: 'country',
    name: 'Country',
    icon: '🤠',
    description: 'Country e música americana',
    defaultBpm: [100, 140],
    timeSignatures: ['4/4', '3/4'],
    
    styles: [
      {
        id: 1,
        name: 'Traditional Country',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Clássico Nashville',
        drumPattern: 'trad_country',
        bassPattern: 'walking',
        intensity: 0.7
      },
      {
        id: 2,
        name: 'Country Rock',
        bpm: [120, 145],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Energético e elétrico',
        drumPattern: 'country_rock',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 3,
        name: 'Bluegrass',
        bpm: [140, 180],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Acústico e virtuoso',
        drumPattern: 'bluegrass',
        bassPattern: 'walking',
        intensity: 0.75
      },
      {
        id: 4,
        name: 'Honky Tonk',
        bpm: [120, 150],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Bar room style',
        drumPattern: 'honky_tonk',
        bassPattern: 'walking',
        intensity: 0.75
      },
      {
        id: 5,
        name: 'Country Pop',
        bpm: [100, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Comercial e melódico',
        drumPattern: 'country_pop',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 6,
        name: 'Outlaw Country',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Rebelde e cru',
        drumPattern: 'outlaw',
        bassPattern: 'walking',
        intensity: 0.75
      },
      {
        id: 7,
        name: 'Country Ballad',
        bpm: [60, 80],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Emotivo e narrativo',
        drumPattern: 'country_ballad',
        bassPattern: 'root',
        intensity: 0.5
      },
      {
        id: 8,
        name: 'Western Swing',
        bpm: [120, 160],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Jazz meets country',
        drumPattern: 'western_swing',
        bassPattern: 'walking',
        intensity: 0.75
      },
      {
        id: 9,
        name: 'Americana',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Roots e autêntico',
        drumPattern: 'americana',
        bassPattern: 'root',
        intensity: 0.65
      },
      {
        id: 10,
        name: 'Country Waltz',
        bpm: [90, 120],
        timeSignature: '3/4',
        swing: 0.50,
        feel: 'Dançante em 3/4',
        drumPattern: 'waltz',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 11,
        name: 'Bro Country',
        bpm: [110, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Moderno e produzido',
        drumPattern: 'bro_country',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 12,
        name: 'Country Gospel',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.55,
        feel: 'Espiritual e emotivo',
        drumPattern: 'gospel',
        bassPattern: 'walking',
        intensity: 0.7
      }
    ]
  },

  // ============================================
  // FOLK
  // ============================================
  folk: {
    id: 'folk',
    name: 'Folk',
    icon: '🎻',
    description: 'Folk e música acústica',
    defaultBpm: [90, 130],
    timeSignatures: ['4/4', '3/4', '6/8'],
    
    styles: [
      {
        id: 1,
        name: 'Traditional Folk',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Acústico e tradicional',
        drumPattern: 'trad_folk',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 2,
        name: 'Folk Rock',
        bpm: [110, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Elétrico e energético',
        drumPattern: 'folk_rock',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 3,
        name: 'Celtic Folk',
        bpm: [110, 150],
        timeSignature: '6/8',
        swing: 0.50,
        feel: 'Jig e reel',
        drumPattern: 'celtic',
        bassPattern: 'root',
        intensity: 0.7
      },
      {
        id: 4,
        name: 'Singer-Songwriter',
        bpm: [80, 110],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Intimista e lírico',
        drumPattern: 'singer_songwriter',
        bassPattern: 'root',
        intensity: 0.5
      },
      {
        id: 5,
        name: 'Indie Folk',
        bpm: [100, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Moderno e atmosférico',
        drumPattern: 'indie_folk',
        bassPattern: 'melodic',
        intensity: 0.65
      },
      {
        id: 6,
        name: 'Folk Ballad',
        bpm: [60, 90],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Narrativo e emotivo',
        drumPattern: 'folk_ballad',
        bassPattern: 'root',
        intensity: 0.4
      },
      {
        id: 7,
        name: 'Bluegrass',
        bpm: [140, 180],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Rápido e virtuoso',
        drumPattern: 'bluegrass',
        bassPattern: 'walking',
        intensity: 0.75
      },
      {
        id: 8,
        name: 'Folk Waltz',
        bpm: [90, 120],
        timeSignature: '3/4',
        swing: 0.50,
        feel: 'Dançante em 3/4',
        drumPattern: 'folk_waltz',
        bassPattern: 'root',
        intensity: 0.6
      },
      {
        id: 9,
        name: 'Protest Folk',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Político e direto',
        drumPattern: 'protest',
        bassPattern: 'root',
        intensity: 0.65
      },
      {
        id: 10,
        name: 'Psychedelic Folk',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Experimental e atmosférico',
        drumPattern: 'psych_folk',
        bassPattern: 'melodic',
        intensity: 0.6
      },
      {
        id: 11,
        name: 'Chamber Folk',
        bpm: [80, 110],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Orquestral e sofisticado',
        drumPattern: 'chamber_folk',
        bassPattern: 'root',
        intensity: 0.55
      },
      {
        id: 12,
        name: 'Freak Folk',
        bpm: [90, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Experimental e estranho',
        drumPattern: 'freak_folk',
        bassPattern: 'melodic',
        intensity: 0.65
      }
    ]
  },

  // ============================================
  // LATIN
  // ============================================
  latin: {
    id: 'latin',
    name: 'Latin',
    icon: '🎺',
    description: 'Ritmos latinos e caribenhos',
    defaultBpm: [100, 140],
    timeSignatures: ['4/4', '3/4', '6/8'],
    
    styles: [
      {
        id: 1,
        name: 'Salsa',
        bpm: [160, 220],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Clave e percussão',
        drumPattern: 'salsa',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 2,
        name: 'Bossa Nova',
        bpm: [120, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Suave e sofisticado',
        drumPattern: 'bossa',
        bassPattern: 'melodic',
        intensity: 0.6
      },
      {
        id: 3,
        name: 'Samba',
        bpm: [160, 200],
        timeSignature: '2/4',
        swing: 0.50,
        feel: 'Festivo e dançante',
        drumPattern: 'samba',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 4,
        name: 'Cha-Cha',
        bpm: [120, 130],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Dançante e romântico',
        drumPattern: 'chacha',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 5,
        name: 'Mambo',
        bpm: [180, 220],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Energético e big band',
        drumPattern: 'mambo',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 6,
        name: 'Rumba',
        bpm: [120, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Sensual e rítmico',
        drumPattern: 'rumba',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 7,
        name: 'Tango',
        bpm: [120, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Dramático e passional',
        drumPattern: 'tango',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 8,
        name: 'Merengue',
        bpm: [120, 160],
        timeSignature: '2/4',
        swing: 0.50,
        feel: 'Rápido e dançante',
        drumPattern: 'merengue',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 9,
        name: 'Bachata',
        bpm: [120, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Romântico e melódico',
        drumPattern: 'bachata',
        bassPattern: 'melodic',
        intensity: 0.65
      },
      {
        id: 10,
        name: 'Cumbia',
        bpm: [90, 110],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Festivo e tropical',
        drumPattern: 'cumbia',
        bassPattern: 'melodic',
        intensity: 0.75
      },
      {
        id: 11,
        name: 'Reggaeton',
        bpm: [90, 100],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Dembow e urbano',
        drumPattern: 'reggaeton',
        bassPattern: 'melodic',
        intensity: 0.8
      },
      {
        id: 12,
        name: 'Latin Jazz',
        bpm: [140, 180],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Jazz com clave',
        drumPattern: 'latin_jazz',
        bassPattern: 'walking',
        intensity: 0.8
      }
    ]
  },

  // ============================================
  // JAZZ
  // ============================================
  jazz: {
    id: 'jazz',
    name: 'Jazz',
    icon: '🎷',
    description: 'Jazz em todas as suas formas',
    defaultBpm: [100, 180],
    timeSignatures: ['4/4', '3/4', '5/4'],
    
    styles: [
      {
        id: 1,
        name: 'Swing',
        bpm: [120, 160],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Clássico big band',
        drumPattern: 'swing',
        bassPattern: 'walking',
        intensity: 0.75
      },
      {
        id: 2,
        name: 'Bebop',
        bpm: [200, 280],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Rápido e virtuoso',
        drumPattern: 'bebop',
        bassPattern: 'walking',
        intensity: 0.85
      },
      {
        id: 3,
        name: 'Cool Jazz',
        bpm: [100, 140],
        timeSignature: '4/4',
        swing: 0.60,
        feel: 'Relaxado e sofisticado',
        drumPattern: 'cool_jazz',
        bassPattern: 'walking',
        intensity: 0.6
      },
      {
        id: 4,
        name: 'Hard Bop',
        bpm: [160, 220],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Bluesy e energético',
        drumPattern: 'hard_bop',
        bassPattern: 'walking',
        intensity: 0.8
      },
      {
        id: 5,
        name: 'Modal Jazz',
        bpm: [120, 160],
        timeSignature: '4/4',
        swing: 0.60,
        feel: 'Hipnótico e modal',
        drumPattern: 'modal',
        bassPattern: 'melodic',
        intensity: 0.7
      },
      {
        id: 6,
        name: 'Free Jazz',
        bpm: [140, 200],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Experimental e livre',
        drumPattern: 'free_jazz',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 7,
        name: 'Fusion',
        bpm: [100, 140],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Rock meets jazz',
        drumPattern: 'fusion',
        bassPattern: 'melodic',
        intensity: 0.85
      },
      {
        id: 8,
        name: 'Smooth Jazz',
        bpm: [90, 120],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Comercial e melódico',
        drumPattern: 'smooth_jazz',
        bassPattern: 'melodic',
        intensity: 0.6
      },
      {
        id: 9,
        name: 'Gypsy Jazz',
        bpm: [180, 240],
        timeSignature: '4/4',
        swing: 0.67,
        feel: 'Django style',
        drumPattern: 'gypsy',
        bassPattern: 'walking',
        intensity: 0.8
      },
      {
        id: 10,
        name: 'Jazz Ballad',
        bpm: [60, 80],
        timeSignature: '4/4',
        swing: 0.60,
        feel: 'Romântico e expressivo',
        drumPattern: 'jazz_ballad',
        bassPattern: 'root',
        intensity: 0.4
      },
      {
        id: 11,
        name: 'Jazz Waltz',
        bpm: [140, 180],
        timeSignature: '3/4',
        swing: 0.60,
        feel: 'Elegante em 3/4',
        drumPattern: 'jazz_waltz',
        bassPattern: 'walking',
        intensity: 0.7
      },
      {
        id: 12,
        name: 'Afro-Cuban Jazz',
        bpm: [140, 180],
        timeSignature: '4/4',
        swing: 0.50,
        feel: 'Clave e percussão',
        drumPattern: 'afro_cuban',
        bassPattern: 'melodic',
        intensity: 0.85
      }
    ]
  }
};

// Helper functions
export const getGenreById = (genreId) => {
  return bandCreatorData[genreId];
};

export const getStyleById = (genreId, styleId) => {
  const genre = getGenreById(genreId);
  if (!genre) return null;
  return genre.styles.find(style => style.id === styleId);
};

export const getAllGenres = () => {
  return Object.values(GENRES).map(id => ({
    id,
    ...bandCreatorData[id]
  }));
};

export const getGenreStyles = (genreId) => {
  const genre = getGenreById(genreId);
  return genre ? genre.styles : [];
};

// Total combinations
export const getTotalCombinations = () => {
  return Object.keys(bandCreatorData).length * 12; // 12 gêneros × 12 estilos
};

console.log(`Band Creator Data loaded: ${getTotalCombinations()} combinations`);

