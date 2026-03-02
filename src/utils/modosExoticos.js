// Modos Exóticos e Híbridos - Expansão do Conteúdo Teórico

export const modosExoticos = {
  // Modos de Melodia Menor Harmônica
  harmonico_menor: {
    nome: 'Harmônico Menor',
    categoria: 'Melodia Menor',
    formula: '1 - 2 - b3 - 4 - 5 - b6 - 7',
    intervalos: [0, 2, 3, 5, 7, 8, 11],
    caracteristica: 'Exótico e oriental',
    cor: 'bg-amber-600',
    corHex: '#d97706',
    corTexto: 'text-amber-400',
    descricao: 'Som exótico com sétima maior',
    caracteristicas: 'O modo harmônico menor possui um som distintamente exótico devido ao intervalo aumentado entre a sexta menor e a sétima maior. Este intervalo de segunda aumentada cria uma tensão característica que evoca sonoridades orientais e do Oriente Médio.',
    aplicacoes: 'Amplamente usado em música clássica, flamenco, música árabe, metal neoclássico e jazz fusion. Compositores como Bach e Chopin fizeram uso extensivo deste modo. No metal, bandas como Yngwie Malmsteen popularizaram seu uso.',
    acordesCaracteristicos: ['Am(maj7)', 'Bdim', 'Caug', 'Dm', 'E7', 'Fmaj7', 'G#dim']
  },

  // Modos de Tons Inteiros
  tons_inteiros: {
    nome: 'Tons Inteiros',
    categoria: 'Simétrica',
    formula: '1 - 2 - 3 - #4 - #5 - b7',
    intervalos: [0, 2, 4, 6, 8, 10],
    caracteristica: 'Flutuante e impressionista',
    cor: 'bg-cyan-600',
    corHex: '#0891b2',
    corTexto: 'text-cyan-400',
    descricao: 'Escala simétrica de tons inteiros',
    caracteristicas: 'Composta inteiramente por tons inteiros (intervalos de segunda maior), esta escala cria uma sensação de flutuação e indefinição tonal. Não possui um centro tonal claro, gerando uma atmosfera etérea e suspensa.',
    aplicacoes: 'Fundamental no impressionismo musical (Debussy, Ravel), jazz moderno, trilhas sonoras de filmes de suspense e terror. Muito usada para criar atmosferas oníricas e surreais.',
    acordesCaracteristicos: ['Caug', 'Daug', 'Eaug', 'F#aug', 'G#aug', 'A#aug']
  },

  // Escala Diminuta (Semitom-Tom)
  diminuta_st: {
    nome: 'Diminuta (Semitom-Tom)',
    categoria: 'Simétrica',
    formula: '1 - b2 - b3 - 3 - #4 - 5 - 6 - b7',
    intervalos: [0, 1, 3, 4, 6, 7, 9, 10],
    caracteristica: 'Tensa e cromática',
    cor: 'bg-red-700',
    corHex: '#b91c1c',
    corTexto: 'text-red-400',
    descricao: 'Escala simétrica alternando semitons e tons',
    caracteristicas: 'Escala de oito notas que alterna semitons e tons. Cria uma tensão constante e um som muito cromático. É simétrica, repetindo-se a cada três semitons.',
    aplicacoes: 'Jazz avançado, música clássica moderna, metal progressivo. Muito usada sobre acordes diminutos e dominantes alterados. Compositores como Bartók e Stravinsky fizeram uso extensivo.',
    acordesCaracteristicos: ['Cdim7', 'C7alt', 'Ebdim7', 'F#dim7', 'Adim7']
  },

  // Escala Diminuta (Tom-Semitom)
  diminuta_ts: {
    nome: 'Diminuta (Tom-Semitom)',
    categoria: 'Simétrica',
    formula: '1 - 2 - b3 - 4 - b5 - b6 - bb7 - 7',
    intervalos: [0, 2, 3, 5, 6, 8, 9, 11],
    caracteristica: 'Dominante alterada',
    cor: 'bg-orange-700',
    corHex: '#c2410c',
    corTexto: 'text-orange-400',
    descricao: 'Versão inversa da diminuta',
    caracteristicas: 'Versão inversa da escala diminuta, começando com tom. Muito usada sobre acordes dominantes alterados, fornecendo todas as tensões alteradas (b9, #9, #11, b13).',
    aplicacoes: 'Jazz bebop e pós-bebop, improvisação sobre dominantes alterados. Essencial no vocabulário de músicos como Charlie Parker, John Coltrane e Pat Metheny.',
    acordesCaracteristicos: ['C7alt', 'C7b9', 'C7#9', 'C7#11', 'C7b13']
  },

  // Modos Húngaros
  hungaro_maior: {
    nome: 'Húngaro Maior',
    categoria: 'Étnica',
    formula: '1 - #2 - 3 - #4 - 5 - 6 - b7',
    intervalos: [0, 3, 4, 6, 7, 9, 10],
    caracteristica: 'Folclórico e dramático',
    cor: 'bg-emerald-700',
    corHex: '#047857',
    corTexto: 'text-emerald-400',
    descricao: 'Modo tradicional húngaro',
    caracteristicas: 'Modo tradicional da música folclórica húngara, caracterizado pela segunda aumentada e quarta aumentada. Cria um som distintamente dramático e folclórico.',
    aplicacoes: 'Música folclórica húngara, música clássica (Liszt, Bartók), metal sinfônico, trilhas sonoras épicas. Muito usado para evocar atmosferas dramáticas e heroicas.',
    acordesCaracteristicos: ['Cmaj7#11', 'D#dim', 'Em', 'F#dim', 'G7', 'Am', 'Bb7']
  },

  // Escala Pentatônica Japonesa (Hirajoshi)
  hirajoshi: {
    nome: 'Hirajoshi',
    categoria: 'Pentatônica Oriental',
    formula: '1 - 2 - b3 - 5 - b6',
    intervalos: [0, 2, 3, 7, 8],
    caracteristica: 'Contemplativo e oriental',
    cor: 'bg-pink-700',
    corHex: '#be185d',
    corTexto: 'text-pink-400',
    descricao: 'Escala pentatônica japonesa',
    caracteristicas: 'Escala pentatônica tradicional japonesa que evoca tranquilidade e contemplação. Ausência da quarta e sétima cria um som suspenso e meditativo.',
    aplicacoes: 'Música tradicional japonesa, new age, ambient, trilhas sonoras contemplativas. Muito usada em meditação e música relaxante.',
    acordesCaracteristicos: ['Cm', 'Dm', 'Fm', 'Gm', 'Abmaj7']
  },

  // Escala Árabe (Hijaz)
  hijaz: {
    nome: 'Hijaz',
    categoria: 'Árabe/Oriental',
    formula: '1 - b2 - 3 - 4 - 5 - b6 - b7',
    intervalos: [0, 1, 4, 5, 7, 8, 10],
    caracteristica: 'Exótico e oriental',
    cor: 'bg-violet-700',
    corHex: '#7c3aed',
    corTexto: 'text-violet-400',
    descricao: 'Modo árabe tradicional',
    caracteristicas: 'Modo fundamental da música árabe, caracterizado pela segunda menor e terça maior, criando um intervalo de segunda aumentada. Som distintamente oriental e exótico.',
    aplicacoes: 'Música árabe tradicional, flamenco, música sefardita, world music. Muito usado para evocar atmosferas do Oriente Médio e Norte da África.',
    acordesCaracteristicos: ['Cm', 'Dbmaj7', 'Em', 'Fm', 'Gm', 'Abmaj7', 'Bb7']
  },

  // Escala Cigana (Romani)
  cigana: {
    nome: 'Cigana',
    categoria: 'Étnica',
    formula: '1 - b2 - 3 - 4 - 5 - b6 - 7',
    intervalos: [0, 1, 4, 5, 7, 8, 11],
    caracteristica: 'Apaixonada e dramática',
    cor: 'bg-rose-700',
    corHex: '#be123c',
    corTexto: 'text-rose-400',
    descricao: 'Escala da música cigana',
    caracteristicas: 'Escala tradicional da música cigana (romani), combinando elementos do modo harmônico menor com a sétima maior. Cria um som intensamente emocional e dramático.',
    aplicacoes: 'Música cigana tradicional, flamenco, tango, jazz manouche (Django Reinhardt). Muito usada para expressar paixão e drama.',
    acordesCaracteristicos: ['Cm(maj7)', 'Dbmaj7', 'Em', 'Fm', 'G7', 'Abmaj7', 'Bdim']
  }
};

// Modos Híbridos (combinações de modos tradicionais)
export const modosHibridos = {
  jonio_lidio: {
    nome: 'Jônio-Lídio',
    categoria: 'Híbrido',
    formula: '1 - 2 - 3 - #4 - 5 - 6 - 7',
    intervalos: [0, 2, 4, 6, 7, 9, 11],
    caracteristica: 'Brilhante e etéreo',
    cor: 'bg-sky-600',
    corHex: '#0284c7',
    corTexto: 'text-sky-400',
    descricao: 'Combinação de Jônio com quarta aumentada',
    caracteristicas: 'Combina a estabilidade do modo jônio com a cor etérea da quarta aumentada do lídio. Mantém o caráter maior mas adiciona uma dimensão sonhadora.',
    aplicacoes: 'Jazz fusion, rock progressivo, trilhas sonoras cinematográficas. Muito usado quando se quer um som maior mas com uma cor especial.',
    acordesCaracteristicos: ['Cmaj7#11', 'Dm7', 'Em7', 'F#m7b5', 'Gmaj7', 'Am7', 'Bm7']
  },

  dorico_eolio: {
    nome: 'Dórico-Eólio',
    categoria: 'Híbrido',
    formula: '1 - 2 - b3 - 4 - 5 - b6 - b7',
    intervalos: [0, 2, 3, 5, 7, 8, 10],
    caracteristica: 'Melancólico profundo',
    cor: 'bg-slate-600',
    corHex: '#475569',
    corTexto: 'text-slate-400',
    descricao: 'Menor natural com sexta menor',
    caracteristicas: 'Combina elementos do dórico e eólio, criando um som menor mais sombrio que o dórico tradicional. A sexta menor adiciona uma melancolia mais profunda.',
    aplicacoes: 'Blues menor, rock alternativo, música introspectiva. Usado quando se quer um som menor mais sombrio que o dórico padrão.',
    acordesCaracteristicos: ['Cm7', 'Dm7b5', 'Ebmaj7', 'Fm7', 'Gm7', 'Abmaj7', 'Bb7']
  }
};

// Escalas Sintéticas Modernas
export const escalasSinteticas = {
  prometheus: {
    nome: 'Prometheus',
    categoria: 'Sintética',
    formula: '1 - 2 - 3 - #4 - 6 - b7',
    intervalos: [0, 2, 4, 6, 9, 10],
    caracteristica: 'Mística e suspensa',
    cor: 'bg-indigo-700',
    corHex: '#4338ca',
    corTexto: 'text-indigo-400',
    descricao: 'Escala criada por Scriabin',
    caracteristicas: 'Escala hexatônica criada pelo compositor Alexander Scriabin. Ausência da quinta justa e presença da quarta aumentada criam um som suspenso e místico.',
    aplicacoes: 'Música clássica moderna, jazz experimental, ambient. Usada para criar atmosferas místicas e suspensas.',
    acordesCaracteristicos: ['Cmaj7#11', 'D7sus4', 'Em7', 'F#m7b5', 'Am7', 'Bb7']
  },

  enigmatica: {
    nome: 'Enigmática',
    categoria: 'Sintética',
    formula: '1 - b2 - 3 - #4 - #5 - #6 - 7',
    intervalos: [0, 1, 4, 6, 8, 10, 11],
    caracteristica: 'Misteriosa e complexa',
    cor: 'bg-purple-800',
    corHex: '#6b21a8',
    corTexto: 'text-purple-400',
    descricao: 'Escala de caráter enigmático',
    caracteristicas: 'Escala sintética com múltiplas alterações que criam um caráter verdadeiramente enigmático. A combinação de intervalos cria tensões constantes e resoluções inesperadas.',
    aplicacoes: 'Música clássica contemporânea, jazz avant-garde, trilhas sonoras de suspense. Usada para criar atmosferas misteriosas e inquietantes.',
    acordesCaracteristicos: ['Cmaj7#5', 'Dbmaj7', 'Em', 'F#7#11', 'G#m', 'A#dim', 'Bmaj7']
  }
};

// Função para obter todos os modos expandidos
export const getTodosModosExpandidos = () => {
  return {
    ...modosExoticos,
    ...modosHibridos,
    ...escalasSinteticas
  };
};

// Função para obter modos por categoria
export const getModosPorCategoria = (categoria) => {
  const todosOsModos = getTodosModosExpandidos();
  return Object.entries(todosOsModos)
    .filter(([key, modo]) => modo.categoria === categoria)
    .reduce((acc, [key, modo]) => {
      acc[key] = modo;
      return acc;
    }, {});
};

// Categorias disponíveis
export const categorias = [
  'Melodia Menor',
  'Simétrica', 
  'Étnica',
  'Pentatônica Oriental',
  'Árabe/Oriental',
  'Híbrido',
  'Sintética'
];

// Função para transpor escalas exóticas
export const transporEscalaExotica = (intervalos, tonalidade) => {
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const baseIndex = noteNames.indexOf(tonalidade);
  
  return intervalos.map(intervalo => {
    const noteIndex = (baseIndex + intervalo) % 12;
    return noteNames[noteIndex];
  });
};

