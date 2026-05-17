/**
 * 🎬 Video Gallery — TrasTeoria v8.0
 * Galeria de vídeos tutoriais com filtros por categoria e nível
 */

import React, { useState } from 'react';
import { Play, Clock, User, X, Filter, BookOpen, Music, Guitar, Layers, Mic2 } from 'lucide-react';

// ─── Vídeos tutoriais reais de guitarra ───────────────────────────────────────
const DEFAULT_VIDEOS = [
  // FUNDAMENTOS
  {
    id: 1,
    title: 'Anatomia da Guitarra Elétrica',
    description: 'Partes da guitarra, captadores, braço e como tudo funciona',
    duration: '11:20',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/fX9EpEqABaU/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/fX9EpEqABaU',
    category: 'Fundamentos',
    level: 'Iniciante',
  },
  {
    id: 2,
    title: 'Postura e Ergonomia na Guitarra',
    description: 'Como segurar a guitarra corretamente e evitar lesões',
    duration: '08:45',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/3VIBOdxLMJQ/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/3VIBOdxLMJQ',
    category: 'Fundamentos',
    level: 'Iniciante',
  },
  {
    id: 3,
    title: 'As 12 Notas Cromáticas',
    description: 'O sistema musical ocidental e as 12 notas cromáticas explicadas',
    duration: '14:30',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/Eq3bUFgEcb4/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/Eq3bUFgEcb4',
    category: 'Fundamentos',
    level: 'Iniciante',
  },
  // HARMONIA
  {
    id: 4,
    title: 'Campo Harmônico Maior Completo',
    description: 'Construção e aplicação do campo harmônico maior em todos os tons',
    duration: '22:15',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/rgaTLrZGlk0/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/rgaTLrZGlk0',
    category: 'Harmonia',
    level: 'Intermediário',
  },
  {
    id: 5,
    title: 'Acordes com Sétima — Tétrades',
    description: 'Maj7, m7, 7, m7b5 e dim7 — teoria e aplicação prática',
    duration: '19:40',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/6Wr5aFBm4kc/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/6Wr5aFBm4kc',
    category: 'Harmonia',
    level: 'Intermediário',
  },
  // ESCALAS
  {
    id: 6,
    title: 'Escala Pentatônica Menor — 5 Posições',
    description: 'As 5 posições da pentatônica menor no braço da guitarra',
    duration: '25:10',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/NBp3GkB1lFE/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/NBp3GkB1lFE',
    category: 'Escalas',
    level: 'Intermediário',
  },
  {
    id: 7,
    title: 'Escala Maior — Posição Aberta e CAGED',
    description: 'Sistema CAGED aplicado à escala maior em todos os tons',
    duration: '20:55',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/s4oIBqcSBJE/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/s4oIBqcSBJE',
    category: 'Escalas',
    level: 'Intermediário',
  },
  // IMPROVISAÇÃO
  {
    id: 8,
    title: 'Improvisação com Pentatônica — Primeiros Solos',
    description: 'Como criar seus primeiros solos usando a escala pentatônica',
    duration: '17:30',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/GkD7bqFBDs4/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/GkD7bqFBDs4',
    category: 'Improvisação',
    level: 'Intermediário',
  },
  {
    id: 9,
    title: 'Frases Melódicas e Vocabulário de Blues',
    description: 'Licks e frases essenciais do vocabulário blues para guitarra',
    duration: '23:00',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/sBJ8YDTD0nk/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/sBJ8YDTD0nk',
    category: 'Improvisação',
    level: 'Intermediário',
  },
  // TÉCNICAS
  {
    id: 10,
    title: 'Técnica de Bending — Tipos e Aplicações',
    description: 'Full bend, half bend, pre-bend e bend com vibrato',
    duration: '16:45',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/9GkVHaLMHMg/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/9GkVHaLMHMg',
    category: 'Técnicas',
    level: 'Intermediário',
  },
  {
    id: 11,
    title: 'Sweep Picking — Técnica Avançada',
    description: 'Fundamentos do sweep picking com arpegios de 3, 4 e 5 cordas',
    duration: '28:20',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/Fh-q2BPQMQU/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/Fh-q2BPQMQU',
    category: 'Técnicas',
    level: 'Avançado',
  },
  // ESTILOS
  {
    id: 12,
    title: 'Blues Clássico — Estrutura e Feeling',
    description: 'Progressão de 12 compassos, shuffle e feeling blues',
    duration: '21:15',
    instructor: 'TrasTeoria',
    thumbnail: `https://img.youtube.com/vi/0CRoqNRnHY4/hqdefault.jpg`,
    videoUrl: 'https://www.youtube.com/embed/0CRoqNRnHY4',
    category: 'Estilos',
    level: 'Intermediário',
  },
];

const CATEGORIES = ['Todos', 'Fundamentos', 'Harmonia', 'Escalas', 'Improvisação', 'Técnicas', 'Estilos'];
const LEVELS = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

const LEVEL_COLORS = {
  'Iniciante':    'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Intermediário':'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Avançado':     'bg-orange-500/20 text-orange-300 border-orange-500/30',
};

export const VideoGallery = ({ videos = [] }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeLevel, setActiveLevel] = useState('Todos');

  const videoList = videos.length > 0 ? videos : DEFAULT_VIDEOS;

  const filtered = videoList.filter(v => {
    const catOk  = activeCategory === 'Todos' || v.category === activeCategory;
    const lvlOk  = activeLevel    === 'Todos' || v.level    === activeLevel;
    return catOk && lvlOk;
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
          <Play className="w-7 h-7 text-purple-400" />
          Galeria de Vídeos
        </h2>
        <p className="text-slate-400 text-sm">Tutoriais em vídeo organizados por tema e nível</p>
      </div>

      {/* Filtros */}
      <div className="space-y-3">
        {/* Categorias */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white border-purple-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-purple-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Níveis */}
        <div className="flex items-center gap-2 flex-wrap">
          <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {LEVELS.map(lvl => (
            <button
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeLevel === lvl
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-blue-500/50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      <p className="text-slate-400 text-sm">{filtered.length} vídeo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>

      {/* Grid de Vídeos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-900/20 text-left"
            aria-label={`Assistir: ${video.title}`}
          >
            {/* Thumbnail */}
            <div className="relative bg-black aspect-video overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.src = `https://img.youtube.com/vi/default/hqdefault.jpg`; }}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="bg-purple-600 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded">
                {video.duration}
              </span>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-block bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {video.category}
                </span>
                {video.level && (
                  <span className={`inline-block border text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[video.level] || ''}`}>
                    {video.level}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-white text-sm mb-1.5 group-hover:text-purple-300 transition-colors leading-snug">
                {video.title}
              </h3>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <User className="w-3 h-3" />
                <span>{video.instructor}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Estado vazio */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <Play className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-medium">Nenhum vídeo encontrado</p>
          <p className="text-sm mt-1">Tente outro filtro de categoria ou nível</p>
        </div>
      )}

      {/* Modal de Vídeo */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedVideo(null); }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="relative bg-black aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.videoUrl + '?autoplay=1'}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {selectedVideo.category}
                    </span>
                    {selectedVideo.level && (
                      <span className={`border text-xs font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLORS[selectedVideo.level] || ''}`}>
                        {selectedVideo.level}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{selectedVideo.title}</h2>
                  <p className="text-slate-400 text-sm mb-3">{selectedVideo.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{selectedVideo.instructor}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{selectedVideo.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors flex-shrink-0"
                  aria-label="Fechar vídeo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
