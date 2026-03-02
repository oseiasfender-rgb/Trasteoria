import { 
  gerarEscala, 
  gerarCampoHarmonico, 
  obterFormulaPortugues, 
  escalaParaPortugues,
  tonalidades 
} from './musicTheory.js';

// Imports dos diagramas
import jonioBraco from '../assets/diagramas/jonio_graus_braco.png';
import jonioBoxes from '../assets/diagramas/jonio_graus_boxes.png';
import doricoBraco from '../assets/diagramas/dorico_graus_braco.png';
import doricoBoxes from '../assets/diagramas/dorico_graus_boxes.png';
import frigioBraco from '../assets/diagramas/frigio_graus_braco.png';
import frigioBoxes from '../assets/diagramas/frigio_graus_boxes.png';
import lidioBraco from '../assets/diagramas/lidio_graus_braco.png';
import lidioBoxes from '../assets/diagramas/lidio_graus_boxes.png';
import mixolidioBraco from '../assets/diagramas/mixolidio_graus_braco.png';
import mixolidioBoxes from '../assets/diagramas/mixolidio_graus_boxes.png';
import eolioBraco from '../assets/diagramas/eolio_graus_braco.png';
import eolioBoxes from '../assets/diagramas/eolio_graus_boxes.png';
import locrioBraco from '../assets/diagramas/locrio_graus_braco.png';
import locrioBoxes from '../assets/diagramas/locrio_graus_boxes.png';

// Informações base dos modos (independente da tonalidade)
export const modosInfo = {
  jonio: {
    nome: "Jônio",
    descricao: "Alegre e brilhante",
    caracteristicas: "O modo mais familiar, base da música ocidental. Transmite alegria, estabilidade e brilho.",
    aplicacoes: "Pop, rock, country, música clássica. Ideal para melodias principais e harmonias estáveis.",
    cor: "bg-blue-500",
    corTexto: "text-blue-500",
    diagramaBraco: jonioBraco,
    diagramaBoxes: jonioBoxes
  },
  dorico: {
    nome: "Dórico",
    descricao: "Melancólico e nostálgico",
    caracteristicas: "Menor com sexta maior. Equilibra melancolia com esperança, criando um som sofisticado.",
    aplicacoes: "Jazz, fusion, rock progressivo, música celta. Excelente para solos expressivos.",
    cor: "bg-green-500",
    corTexto: "text-green-500",
    diagramaBraco: doricoBraco,
    diagramaBoxes: doricoBoxes
  },
  frigio: {
    nome: "Frígio",
    descricao: "Exótico e misterioso",
    caracteristicas: "Menor com segunda menor. Som oriental e dramático, muito expressivo e tenso.",
    aplicacoes: "Flamenco, metal, música árabe, trilhas cinematográficas. Ideal para criar tensão.",
    cor: "bg-red-500",
    corTexto: "text-red-500",
    diagramaBraco: frigioBraco,
    diagramaBoxes: frigioBoxes
  },
  lidio: {
    nome: "Lídio",
    descricao: "Sonhador e etéreo",
    caracteristicas: "Maior com quarta aumentada. Som etéreo e suspenso, muito usado em trilhas de filmes.",
    aplicacoes: "Trilhas sonoras, jazz fusion, rock progressivo. Perfeito para atmosferas mágicas.",
    cor: "bg-purple-500",
    corTexto: "text-purple-500",
    diagramaBraco: lidioBraco,
    diagramaBoxes: lidioBoxes
  },
  mixolidio: {
    nome: "Mixolídio",
    descricao: "Bluesy e groovy",
    caracteristicas: "Maior com sétima menor. Som bluesy e groovy, muito usado no rock e blues.",
    aplicacoes: "Blues, rock, funk, country. Essencial para solos de guitarra e riffs.",
    cor: "bg-orange-500",
    corTexto: "text-orange-500",
    diagramaBraco: mixolidioBraco,
    diagramaBoxes: mixolidioBoxes
  },
  eolio: {
    nome: "Eólio",
    descricao: "Triste e introspectivo",
    caracteristicas: "Escala menor natural. Som melancólico e introspectivo, base da música menor.",
    aplicacoes: "Baladas, rock, pop, música clássica. Fundamental para expressões melancólicas.",
    cor: "bg-indigo-500",
    corTexto: "text-indigo-500",
    diagramaBraco: eolioBraco,
    diagramaBoxes: eolioBoxes
  },
  locrio: {
    nome: "Lócrio",
    descricao: "Tenso e instável",
    caracteristicas: "Menor com quinta diminuta. Som muito tenso e instável, raramente usado como centro tonal.",
    aplicacoes: "Jazz avançado, metal progressivo, música experimental. Usado para criar máxima tensão.",
    cor: "bg-gray-500",
    corTexto: "text-gray-500",
    diagramaBraco: locrioBraco,
    diagramaBoxes: locrioBoxes
  }
};

// Função para gerar dados completos de um modo em uma tonalidade específica
export function gerarDadosModo(modoKey, tonalidade) {
  const info = modosInfo[modoKey];
  if (!info) return null;

  const escala = gerarEscala(tonalidade, modoKey);
  const campoHarmonico = gerarCampoHarmonico(tonalidade, modoKey);
  const formula = obterFormulaPortugues(modoKey);
  const exemploTonalidade = escalaParaPortugues(escala);

  return {
    ...info,
    formula,
    exemploTonalidade,
    escala,
    campoHarmonico,
    tonalidade,
    tonalidades: tonalidades.find(t => t.key === tonalidade)
  };
}

// Função para gerar todos os dados de todos os modos em todas as tonalidades
export function gerarTodosDados() {
  const todosDados = {};
  
  tonalidades.forEach(tonalidade => {
    todosDados[tonalidade.key] = {};
    
    Object.keys(modosInfo).forEach(modoKey => {
      todosDados[tonalidade.key][modoKey] = gerarDadosModo(modoKey, tonalidade.key);
    });
  });
  
  return todosDados;
}

// Lista dos modos para iteração
export const modosList = Object.keys(modosInfo);

// Função para obter dados de um modo específico
export function getModoData(modoKey, tonalidade = 'C') {
  return gerarDadosModo(modoKey, tonalidade);
}

