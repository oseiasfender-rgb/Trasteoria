import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { VideoPlayer } from './VideoPlayer.jsx';
import { techniquesVideos, videoCategories, difficultyLevels, filterVideos } from '../data/techniquesVideos.js';
import { Play, CheckCircle, Filter, Video } from 'lucide-react';

export function TechniquesVideosSection() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');

  const handleVideoComplete = (videoId) => {
    setCompletedVideos(prev => new Set([...prev, videoId]));
    // Salvar no localStorage
    const completed = Array.from(completedVideos);
    completed.push(videoId);
    localStorage.setItem('completedVideos', JSON.stringify(completed));
  };

  // Carregar vídeos completados do localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('completedVideos');
    if (saved) {
      setCompletedVideos(new Set(JSON.parse(saved)));
    }
  }, []);

  const filteredVideos = filterVideos(techniquesVideos, selectedCategory, selectedDifficulty);
  const completionPercentage = Math.round((completedVideos.size / techniquesVideos.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Video className="w-8 h-8 text-purple-400" />
              <div>
                <CardTitle className="text-3xl">Vídeos de Técnicas</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Aprenda técnicas fundamentais com vídeos didáticos
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-400">{completionPercentage}%</div>
              <div className="text-sm text-muted-foreground">
                {completedVideos.size}/{techniquesVideos.length} completos
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold">Filtros:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <div className="flex flex-wrap gap-2">
                {videoCategories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Dificuldade</label>
              <div className="flex flex-wrap gap-2">
                {difficultyLevels.map(level => (
                  <Button
                    key={level}
                    variant={selectedDifficulty === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDifficulty(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Player or Grid */}
      {selectedVideo ? (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => setSelectedVideo(null)}
          >
            ← Voltar para lista
          </Button>
          <VideoPlayer
            video={selectedVideo}
            onComplete={handleVideoComplete}
          />
        </div>
      ) : (
        /* Video Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => {
            const isCompleted = completedVideos.has(video.id);
            
            return (
              <Card
                key={video.id}
                className="group hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                    {video.duration}
                  </div>
                  {/* Completed Badge */}
                  {isCompleted && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg line-clamp-2 flex-1">{video.title}</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {video.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      video.difficulty === 'Iniciante' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      video.difficulty === 'Intermediário' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {video.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>

                  {/* Topics */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {video.topics.slice(0, 3).map((topic, index) => (
                      <span
                        key={index}
                        className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                    {video.topics.length > 3 && (
                      <span className="text-xs text-muted-foreground px-2 py-0.5">
                        +{video.topics.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhum vídeo encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros para ver mais vídeos
            </p>
          </CardContent>
        </Card>
      )}

      {/* Progress Summary */}
      {completedVideos.size > 0 && !selectedVideo && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <div className="font-semibold">Parabéns pelo progresso!</div>
                  <div className="text-sm text-muted-foreground">
                    Você completou {completedVideos.size} de {techniquesVideos.length} vídeos
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-500">{completionPercentage}%</div>
              </div>
            </div>
            <div className="mt-3 w-full bg-secondary rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

