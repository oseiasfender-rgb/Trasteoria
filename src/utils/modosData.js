export const modosGrecos = {
  jonio: {
    nome: "Jônio",
    descricao: "Alegre e brilhante",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - 7",
    exemploDoMaior: "C - D - E - F - G - A - B",
    campoHarmonico: ["Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bm7b5"],
    cor: "bg-blue-500",
    corTexto: "text-blue-500",
    diagramaBraco: "/src/assets/diagramas/jonio_graus_braco.png",
    diagramaBoxes: "/src/assets/diagramas/jonio_graus_boxes.png"
  },
  dorico: {
    nome: "Dórico",
    descricao: "Melancólico e nostálgico",
    formula: "1 - 2 - b3 - 4 - 5 - 6 - b7",
    exemploDoMaior: "D - E - F - G - A - B - C",
    campoHarmonico: ["Dm7", "Em7b5", "Fmaj7", "G7", "Am7", "Bm7b5", "Cmaj7"],
    cor: "bg-green-500",
    corTexto: "text-green-500",
    diagramaBraco: "/src/assets/diagramas/dorico_graus_braco.png",
    diagramaBoxes: "/src/assets/diagramas/dorico_graus_boxes.png"
  },
  frigio: {
    nome: "Frígio",
    descricao: "Exótico e misterioso",
    formula: "1 - b2 - b3 - 4 - 5 - b6 - b7",
    exemploDoMaior: "E - F - G - A - B - C - D",
    campoHarmonico: ["Em7b5", "Fmaj7", "G7", "Am7", "Bm7b5", "Cmaj7", "Dm7"],
    cor: "bg-red-500",
    corTexto: "text-red-500",
    diagramaBraco: "/src/assets/diagramas/frigio_graus_braco.png",
    diagramaBoxes: "/src/assets/diagramas/frigio_graus_boxes.png"
  },
  lidio: {
    nome: "Lídio",
    descricao: "Sonhador e etéreo",
    formula: "1 - 2 - 3 - #4 - 5 - 6 - 7",
    exemploDoMaior: "F - G - A - B - C - D - E",
    campoHarmonico: ["Fmaj7", "G7", "Am7", "Bm7b5", "Cmaj7", "Dm7", "Em7b5"],
    cor: "bg-purple-500",
    corTexto: "text-purple-500",
    diagramaBraco: "/src/assets/diagramas/lidio_graus_braco.png",
    diagramaBoxes: "/src/assets/diagramas/lidio_graus_boxes.png"
  },
  mixolidio: {
    nome: "Mixolídio",
    descricao: "Bluesy e groovy",
    formula: "1 - 2 - 3 - 4 - 5 - 6 - b7",
    exemploDoMaior: "G - A - B - C - D - E - F",
    campoHarmonico: ["G7", "Am7", "Bm7b5", "Cmaj7", "Dm7", "Em7b5", "Fmaj7"],
    cor: "bg-orange-500",
    corTexto: "text-orange-500",
    diagramaBraco: "/src/assets/diagramas/mixolidio_graus_braco.png",
    diagramaBoxes: "/src/assets/diagramas/mixolidio_graus_boxes.png"
  },
  eolio: {
    nome: "Eólio",
    descricao: "Triste e introspectivo",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - b7",
    exemploDoMaior: "A - B - C - D - E - F - G",
    campoHarmonico: ["Am7", "Bm7b5", "Cmaj7", "Dm7", "Em7b5", "Fmaj7", "G7"],
    cor: "bg-indigo-500",
    corTexto: "text-indigo-500",
    diagramaBraco: "/src/assets/diagramas/eolio_graus_braco.png",
    diagramaBoxes: "/src/assets/diagramas/eolio_graus_boxes.png"
  },
  locrio: {
    nome: "Lócrio",
    descricao: "Tenso e instável",
    formula: "1 - b2 - b3 - 4 - b5 - b6 - b7",
    exemploDoMaior: "B - C - D - E - F - G - A",
    campoHarmonico: ["Bm7b5", "Cmaj7", "Dm7", "Em7b5", "Fmaj7", "G7", "Am7"],
    cor: "bg-gray-500",
    corTexto: "text-gray-500",
    diagramaBraco: "/src/assets/diagramas/locrio_graus_braco.png",
    diagramaBoxes: "/src/assets/diagramas/locrio_graus_boxes.png"
  }
};

export const modosList = Object.keys(modosGrecos);

export const getModoData = (modoKey) => {
  return modosGrecos[modoKey] || null;
};

