import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';

export function VideoPlayer({ video, onComplete }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleProgress = (state) => {
    setPlayed(state.played);
    
    // Marcar como completo se assistiu 90%+
    if (state.played > 0.9 && !completed) {
      setCompleted(true);
      if (onComplete) {
        onComplete(video.id);
      }
    }
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Player Container */}
        <div className="relative aspect-video bg-black">
          <ReactPlayer
            url={youtubeUrl}
            playing={playing}
            volume={volume}
            muted={muted}
            width="100%"
            height="100%"
            onProgress={handleProgress}
            onEnded={() => {
              setCompleted(true);
              if (onComplete) {
                onComplete(video.id);
              }
            }}
            controls={true}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                }
              }
            }}
          />
          
          {/* Completed Badge */}
          {completed && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              <span>Completo</span>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6 space-y-4">
          {/* Title and Category */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold">{video.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                video.difficulty === 'Iniciante' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                video.difficulty === 'Intermediário' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
              }`}>
                {video.difficulty}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">{video.category}</span>
              <span>⏱ {video.duration}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground">{video.description}</p>

          {/* Key Points */}
          <div>
            <h4 className="font-semibold mb-2">📌 Pontos-Chave:</h4>
            <ul className="space-y-1">
              {video.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="font-semibold mb-2">🎯 Tópicos Abordados:</h4>
            <div className="flex flex-wrap gap-2">
              {video.topics.map((topic, index) => (
                <span
                  key={index}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Progresso</span>
              <span>{Math.round(played * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${played * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

