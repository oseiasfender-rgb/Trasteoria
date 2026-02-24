/**
 * 🎵 Band Creator V2 - Funcional
 * Interface profissional com engines reais integrados
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, Music, Settings } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import AnimatedButton from './AnimatedButton';
import LoadingSpinner from './LoadingSpinner';

// Import dos engines profissionais
import { ProfessionalDrumEngine } from '../utils/professionalDrumEngine';
import { ProfessionalBassEngine } from '../utils/professionalBassEngine';
import { ProfessionalPianoEngine } from '../utils/professionalPianoEngine';
import { DrumEngineV2 } from '../utils/drumEngineV2';
import { BandCreatorEngine } from '../utils/bandCreatorEngine';

const BandCreatorV2 = () => {
  const { showBandCreatorStart, showBandCreatorStop, showInfo } = useToast();
  
  // Estados
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGenre, setCurrentGenre] = useState('rock');
  const [currentStyle, setCurrentStyle] = useState('classic');
  const [bpm, setBpm] = useState(120);
  
  // Mixer
  const [volumes, setVolumes] = useState({
    drums: 70,
    bass: 60,
    piano: 30,
    master: 80
  });
  
  const [mutes, setMutes] = useState({
    drums: false,
    bass: false,
    piano: false
  });
  
  // Bass mode
  const [bassMode, setBassMode] = useState('root');
  
  // Ref para engine
  const engineRef = useRef(null);
  const audioContextRef = useRef(null);
  
  // Gêneros disponíveis
  const genres = [
    { id: 'rock', name: 'Rock', styles: ['classic', 'hard', 'progressive'] },
    { id: 'blues', name: 'Blues', styles: ['shuffle', 'slow', 'uptempo'] },
    { id: 'jazz', name: 'Jazz', styles: ['swing', 'bebop', 'latin'] },
    { id: 'pop', name: 'Pop', styles: ['modern', 'ballad', 'dance'] },
    { id: 'funk', name: 'Funk', styles: ['groove', 'slap', 'fusion'] },
    { id: 'country', name: 'Country', styles: ['classic', 'modern', 'bluegrass'] },
    { id: 'latin', name: 'Latin', styles: ['bossa', 'samba', 'salsa'] },
    { id: 'gospel', name: 'Gospel', styles: ['traditional', 'contemporary', 'praise'] },
    { id: 'electronic', name: 'Electronic', styles: ['house', 'techno', 'ambient'] },
    { id: 'metal', name: 'Metal', styles: ['classic', 'thrash', 'progressive'] },
    { id: 'rnb', name: 'R&B', styles: ['classic', 'neo', 'soul'] },
    { id: 'folk', name: 'Folk', styles: ['traditional', 'contemporary', 'celtic'] }
  ];
  
  // Inicializar AudioContext e Engine
  useEffect(() => {
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        engineRef.current = new BandCreatorEngine(audioContextRef.current);
      } catch (error) {
      }
    };
    
    initAudio();
    
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Atualizar volumes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setVolumes({
        drums: volumes.drums / 100,
        bass: volumes.bass / 100,
        piano: volumes.piano / 100,
        master: volumes.master / 100
      });
    }
  }, [volumes]);
  
  // Atualizar mutes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setMutes(mutes);
    }
  }, [mutes]);
  
  // Atualizar bass mode
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setBassMode(bassMode);
    }
  }, [bassMode]);
  
  // Play/Stop
  const togglePlay = async () => {
    if (!engineRef.current) return;
    
    if (isPlaying) {
      engineRef.current.stop();
      setIsPlaying(false);
      showBandCreatorStop();
    } else {
      setIsLoading(true);
      try {
        // Resume AudioContext se necessário
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        await engineRef.current.play(currentGenre, currentStyle, bpm);
        setIsPlaying(true);
        showBandCreatorStart(currentGenre, currentStyle);
      } catch (error) {
        showInfo('Erro ao iniciar Band Creator');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Atualizar BPM
  const handleBpmChange = (newBpm) => {
    setBpm(newBpm);
    if (engineRef.current && isPlaying) {
      engineRef.current.setBPM(newBpm);
    }
  };
  
  // Atualizar volume
  const handleVolumeChange = (channel, value) => {
    setVolumes(prev => ({ ...prev, [channel]: value }));
  };
  
  // Toggle mute
  const toggleMute = (channel) => {
    setMutes(prev => ({ ...prev, [channel]: !prev[channel] }));
  };
  
  // Obter estilos do gênero atual
  const currentGenreData = genres.find(g => g.id === currentGenre);
  const availableStyles = currentGenreData?.styles || [];
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-2">🎵 Band Creator</h2>
        <p className="text-slate-300">Crie sua banda virtual com 144 estilos diferentes!</p>
      </div>
      
      {/* Main Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Genre Selection */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Gênero
          </label>
          <select
            value={currentGenre}
            onChange={(e) => {
              setCurrentGenre(e.target.value);
              const newGenre = genres.find(g => g.id === e.target.value);
              setCurrentStyle(newGenre.styles[0]);
            }}
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none"
            disabled={isPlaying}
          >
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
        
        {/* Style Selection */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Estilo
          </label>
          <select
            value={currentStyle}
            onChange={(e) => setCurrentStyle(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-green-500 focus:outline-none"
            disabled={isPlaying}
          >
            {availableStyles.map(style => (
              <option key={style} value={style}>
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* BPM Control */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            BPM: {bpm}
          </label>
          <input
            type="range"
            min="40"
            max="240"
            value={bpm}
            onChange={(e) => handleBpmChange(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>40</span>
            <span>240</span>
          </div>
        </div>
      </div>
      
      {/* Play/Stop Button */}
      <div className="flex justify-center mb-6">
        <AnimatedButton
          variant={isPlaying ? "danger" : "primary"}
          size="lg"
          onClick={togglePlay}
          disabled={isLoading}
          loading={isLoading}
          icon={isPlaying ? <Square /> : <Play />}
        >
          {isLoading ? 'Carregando...' : isPlaying ? 'Parar' : 'Tocar'}
        </AnimatedButton>
      </div>
      
      {/* Mixer */}
      <div className="bg-slate-800 p-6 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Mixer
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Drums Channel */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">🥁 Drums</span>
              <button
                onClick={() => toggleMute('drums')}
                className={`px-2 py-1 text-xs rounded ${
                  mutes.drums ? 'bg-red-500 text-white' : 'bg-slate-600 text-slate-300'
                }`}
              >
                {mutes.drums ? 'MUTE' : 'ON'}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volumes.drums}
              onChange={(e) => handleVolumeChange('drums', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="text-center text-xs text-slate-400 mt-1">{volumes.drums}%</div>
          </div>
          
          {/* Bass Channel */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">🎸 Bass</span>
              <button
                onClick={() => toggleMute('bass')}
                className={`px-2 py-1 text-xs rounded ${
                  mutes.bass ? 'bg-red-500 text-white' : 'bg-slate-600 text-slate-300'
                }`}
              >
                {mutes.bass ? 'MUTE' : 'ON'}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volumes.bass}
              onChange={(e) => handleVolumeChange('bass', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="text-center text-xs text-slate-400 mt-1">{volumes.bass}%</div>
          </div>
          
          {/* Piano Channel */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">🎹 Piano</span>
              <button
                onClick={() => toggleMute('piano')}
                className={`px-2 py-1 text-xs rounded ${
                  mutes.piano ? 'bg-red-500 text-white' : 'bg-slate-600 text-slate-300'
                }`}
              >
                {mutes.piano ? 'MUTE' : 'ON'}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volumes.piano}
              onChange={(e) => handleVolumeChange('piano', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="text-center text-xs text-slate-400 mt-1">{volumes.piano}%</div>
          </div>
          
          {/* Master Channel */}
          <div className="bg-slate-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white">🎚️ Master</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={volumes.master}
              onChange={(e) => handleVolumeChange('master', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="text-center text-xs text-slate-400 mt-1">{volumes.master}%</div>
          </div>
        </div>
      </div>
      
      {/* Bass Mode */}
      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Modo do Baixo
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setBassMode('root')}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              bassMode === 'root'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Root Notes
          </button>
          <button
            onClick={() => setBassMode('walking')}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              bassMode === 'walking'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Walking Bass
          </button>
          <button
            onClick={() => setBassMode('melodic')}
            className={`px-4 py-3 rounded-lg font-medium transition-all ${
              bassMode === 'melodic'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Melodic
          </button>
        </div>
      </div>
      
      {/* Info */}
      <div className="mt-6 p-4 bg-slate-800 rounded-lg">
        <p className="text-sm text-slate-300 text-center">
          <Music className="inline w-4 h-4 mr-1" />
          {isPlaying ? (
            <span className="text-green-400 font-medium">
              Tocando: {currentGenreData?.name} - {currentStyle} @ {bpm} BPM
            </span>
          ) : (
            <span>
              Selecione um gênero e estilo, depois clique em Tocar!
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default BandCreatorV2;

