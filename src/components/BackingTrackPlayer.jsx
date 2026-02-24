import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, Settings, Music, Drum } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const BackingTrackPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(70);
  const [selectedStyle, setSelectedStyle] = useState('Rock');
  const audioContextRef = useRef(null);
  const nextNoteTimeRef = useRef(0);
  const timerIDRef = useRef(null);
  
  const styles = [
    { name: 'Rock', pattern: [1, 0, 0, 0, 1, 0, 0, 0] },
    { name: 'Blues', pattern: [1, 0, 1, 0, 1, 0, 1, 0] },
    { name: 'Jazz', pattern: [1, 0, 0, 1, 0, 0, 1, 0] },
    { name: 'Funk', pattern: [1, 1, 0, 1, 1, 0, 1, 1] },
    { name: 'Bossa Nova', pattern: [1, 0, 1, 1, 0, 1, 0, 1] },
  ];

  const playClick = (time) => {
    const osc = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    osc.frequency.value = selectedStyle === 'Rock' ? 150 : 200;
    envelope.gain.value = volume / 100;
    envelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

    osc.connect(envelope);
    envelope.connect(audioContextRef.current.destination);

    osc.start(time);
    osc.stop(time + 0.1);
  };

  const scheduler = () => {
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      playClick(nextNoteTimeRef.current);
      const secondsPerBeat = 60.0 / bpm;
      nextNoteTimeRef.current += 0.5 * secondsPerBeat; // 8th notes
    }
    timerIDRef.current = setTimeout(scheduler, 25.0);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      setIsPlaying(true);
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      scheduler();
    } else {
      setIsPlaying(false);
      clearTimeout(timerIDRef.current);
    }
  };

  return (
    <Card className="bg-slate-900/80 border-purple-500/40 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Drum className="w-6 h-6" />
          Backing Track: Ritmos de Bateria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className={`p-4 rounded-full transition-all ${
                isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white shadow-lg shadow-purple-500/20`}
            >
              {isPlaying ? <Square className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
            </button>
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Status</p>
              <p className={`text-lg font-mono ${isPlaying ? 'text-green-400 animate-pulse' : 'text-gray-500'}`}>
                {isPlaying ? 'EXECUTANDO' : 'PARADO'}
              </p>
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Tempo: {bpm} BPM</span>
            </div>
            <input
              type="range"
              min="40"
              max="220"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <Music className="w-4 h-4" /> Estilo Musical
            </label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((style) => (
                <button
                  key={style.name}
                  onClick={() => setSelectedStyle(style.name)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedStyle === style.name
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-gray-800 text-gray-400 border-transparent hover:bg-gray-700'
                  } border`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Volume do Mix
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Mudo</span>
              <span>Máximo</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
          <p className="text-xs text-purple-300 flex items-center gap-2">
            <Settings className="w-3 h-3" />
            Dica: Use fones de ouvido para uma melhor percepção rítmica durante o treino.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackingTrackPlayer;
