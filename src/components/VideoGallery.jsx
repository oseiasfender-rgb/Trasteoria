/**
 * 🎬 Video Gallery
 * Componente para exibir galeria de vídeos tutoriais
 */

import React, { useState } from 'react';
import { Play, Clock, User } from 'lucide-react';

export const VideoGallery = ({ videos = [] }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const defaultVideos = [
    {
      id: 1,
      title: 'Introdução à Guitarra',
      description: 'Aprenda os fundamentos básicos da guitarra',
      duration: '12:34',
      instructor: 'João Silva',
      thumbnail: 'https://via.placeholder.com/300x170?text=Intro+Guitarra',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      category: 'Fundamentos',
    },
    {
      id: 2,
      title: 'Acordes Maiores',
      description: 'Domine os acordes maiores básicos',
      duration: '15:20',
      instructor: 'Maria Santos',
      thumbnail: 'https://via.placeholder.com/300x170?text=Acordes+Maiores',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      category: 'Harmonia',
    },
    {
      id: 3,
      title: 'Escalas Pentatônicas',
      description: 'Aprenda as escalas pentatônicas para improvisar',
      duration: '18:45',
      instructor: 'Pedro Costa',
      thumbnail: 'https://via.placeholder.com/300x170?text=Escalas',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      category: 'Escalas',
    },
  ];

  const videoList = videos.length > 0 ? videos : defaultVideos;

  return (
    <div className="space-y-6">
      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-card rounded-lg max-w-4xl w-full overflow-hidden">
            <div className="relative bg-black aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
              <p className="text-muted-foreground mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedVideo.instructor}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedVideo.duration}
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-full px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors font-semibold"
                aria-label="Fechar vídeo"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoList.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
            aria-label={`Assistir: ${video.title}`}
          >
            {/* Thumbnail */}
            <div className="relative bg-black aspect-video overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="bg-primary p-3 rounded-full">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                {video.duration}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2">
                <span className="inline-block bg-primary/20 text-primary text-xs font-semibold px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="font-bold text-left mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground text-left mb-3">
                {video.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="w-3 h-3" />
                <span>{video.instructor}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {videoList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Nenhum vídeo disponível</p>
          <p className="text-sm text-muted-foreground">
            Volte em breve para novos tutoriais em vídeo
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
