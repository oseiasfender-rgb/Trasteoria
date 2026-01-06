// BandCreator.jsx
// Interface do Band Creator inspirada no DigiTech TRIO+
// UI profissional com knobs, LEDs e controles visuais

import React, { useState, useEffect } from 'react';
import { Play, Square, Circle, Volume2, Music, Download, Trash2 } from 'lucide-react';
import { bandCreatorData, GENRES, BASS_MODES } from '../data/bandCreatorData';
import { bassEngine } from '../utils/bassEngine';
import { sequencerEngine } from '../utils/sequencerEngine';
import { looperEngine } from '../utils/looperEngine';
import { drumEngineExpanded } from '../utils/drumEngineExpanded';

const BandCreator = () => {
  // Estado principal
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(GENRES.ROCK);
  const [currentStyle, setCurrentStyle] = useState(1);
  const [bpm, setBpm] = useState(120);
  const [altTime, setAltTime] = useState(false);
  const [altTimeBpm, setAltTimeBpm] = useState(140);
  
  // Mixer
  const [mixer, setMixer] = useState({
    loop: { level: 80, mute: false },
    bass: { level: 70, mute: false },
    drums: { level: 85, mute: false },
    keys: { level: 60, mute: false }
  });
  
  // Bass mode
  const [bassMode, setBassMode] = useState(BASS_MODES.ROOT);
  const [simpleBass, setSimpleBass] = useState(false);
  
  // Parts (sequenciador)
  const [parts, setParts] = useState([
    { id: 1, active: true, bars: 8, intensity: 0.5 },
    { id: 2, active: true, bars: 16, intensity: 0.7 },
    { id: 3, active: true, bars: 8, intensity: 0.9 },
    { id: 4, active: false, bars: 16, intensity: 0.7 },
    { id: 5, active: false, bars: 8, intensity: 0.5 }
  ]);
  const [currentPart, setCurrentPart] = useState(1);
  
  // Looper
  const [looperRecording, setLooperRecording] = useState(false);
  const [looperPlaying, setLooperPlaying] = useState(false);
  const [looperLayers, setLooperLayers] = useState([]);
  
  // Initialize engines
  useEffect(() => {
    // Configurar callbacks do looper
    looperEngine.onRecordingStart = () => setLooperRecording(true);
    looperEngine.onRecordingStop = () => {
      setLooperRecording(false);
      setLooperLayers([...looperEngine.getLayers()]);
    };
    looperEngine.onPlaybackStart = () => setLooperPlaying(true);
    looperEngine.onPlaybackStop = () => setLooperPlaying(false);
    
    // Configurar callback do sequenciador
    sequencerEngine.onPartChange = (part) => {
      setCurrentPart(part.id);
    };
    
    return () => {
      bassEngine.stop();
      looperEngine.stop();
      sequencerEngine.stop();
    };
  }, []);
  
  // Atualizar BPM nos engines
  useEffect(() => {
    const currentBpm = altTime ? altTimeBpm : bpm;
    bassEngine.setBPM(currentBpm);
    looperEngine.setBPM(currentBpm);
  }, [bpm, altTime, altTimeBpm]);
  
  // Atualizar modo do baixo
  useEffect(() => {
    bassEngine.setMode(bassMode);
  }, [bassMode]);
  
  // Atualizar volumes do mixer
  useEffect(() => {
    bassEngine.setVolume(mixer.bass.level / 100);
    looperEngine.setVolume(mixer.loop.level / 100);
  }, [mixer]);
  
  // Get current style data
  const genreData = bandCreatorData[currentGenre];
  const styleData = genreData?.styles.find(s => s.id === currentStyle);
  
  // Knob component
  const Knob = ({ label, value, onChange, min = 0, max = 100, size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-24 h-24',
      lg: 'w-32 h-32'
    };
    
    const rotation = ((value - min) / (max - min)) * 270 - 135;
    
    return (
      <div className="flex flex-col items-center gap-2">
        <div className={`relative ${sizeClasses[size]} cursor-pointer`}
             onClick={() => {
               const newValue = value + 10 > max ? min : value + 10;
               onChange(newValue);
             }}>
          {/* Knob background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg">
            {/* Knob indicator */}
            <div 
              className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center"
              style={{ transform: `rotate(${rotation}deg)` }}>
              <div className="w-1 h-8 bg-blue-400 rounded-full absolute top-2"></div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
          <div className="text-sm font-bold text-white">{value}{label === 'TEMPO' ? ' BPM' : '%'}</div>
        </div>
      </div>
    );
  };
  
  // LED component
  const LED = ({ active, color = 'green' }) => {
    const colors = {
      green: 'bg-green-500',
      red: 'bg-red-500',
      yellow: 'bg-yellow-500',
      blue: 'bg-blue-500'
    };
    
    return (
      <div className={`w-3 h-3 rounded-full ${active ? colors[color] : 'bg-gray-700'} 
                      ${active ? 'shadow-lg shadow-' + color + '-500/50' : ''} 
                      transition-all duration-200`}>
      </div>
    );
  };
  
  // Genre selector (circular)
  const GenreSelector = () => {
    const genres = Object.values(GENRES);
    const angleStep = 360 / genres.length;
    
    return (
      <div className="relative w-64 h-64">
        {/* Center display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-900 border-4 border-gray-700 flex flex-col items-center justify-center">
            <div className="text-2xl">{genreData?.icon}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">GENRE</div>
            <div className="text-sm font-bold text-white">{genreData?.name}</div>
          </div>
        </div>
        
        {/* Genre LEDs in circle */}
        {genres.map((genre, index) => {
          const angle = (angleStep * index - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 110 + 128;
          const y = Math.sin(angle) * 110 + 128;
          
          return (
            <div 
              key={genre}
              className="absolute cursor-pointer"
              style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setCurrentGenre(genre)}>
              <div className="flex flex-col items-center gap-1">
                <LED active={currentGenre === genre} color="yellow" />
                <div className="text-[10px] text-gray-400 uppercase whitespace-nowrap">
                  {bandCreatorData[genre]?.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Style selector (circular)
  const StyleSelector = () => {
    const styles = genreData?.styles || [];
    const angleStep = 360 / 12;
    
    return (
      <div className="relative w-64 h-64">
        {/* Center display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gray-900 border-4 border-gray-700 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-400 uppercase tracking-wider">STYLE</div>
            <div className="text-2xl font-bold text-white">{currentStyle}</div>
            <div className="text-[10px] text-gray-400 text-center px-2">
              {styleData?.name}
            </div>
          </div>
        </div>
        
        {/* Style LEDs in circle */}
        {[...Array(12)].map((_, index) => {
          const styleNum = index + 1;
          const angle = (angleStep * index - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 110 + 128;
          const y = Math.sin(angle) * 110 + 128;
          
          return (
            <div 
              key={styleNum}
              className="absolute cursor-pointer"
              style={{ left: `${x}px`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setCurrentStyle(styleNum)}>
              <div className="flex flex-col items-center gap-1">
                <LED active={currentStyle === styleNum} color="green" />
                <div className="text-xs text-white font-bold">{styleNum}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Mixer section
  const MixerSection = () => {
    return (
      <div className="flex gap-8 justify-center items-end">
        {/* Loop */}
        <div className="flex flex-col items-center gap-2">
          <Knob 
            label="LOOP" 
            value={mixer.loop.level} 
            onChange={(v) => setMixer({...mixer, loop: {...mixer.loop, level: v}})} 
          />
          <button 
            className={`px-3 py-1 rounded text-xs ${mixer.loop.mute ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => setMixer({...mixer, loop: {...mixer.loop, mute: !mixer.loop.mute}})}>
            {mixer.loop.mute ? 'MUTED' : 'ACTIVE'}
          </button>
        </div>
        
        {/* Bass */}
        <div className="flex flex-col items-center gap-2">
          <Knob 
            label="BASS" 
            value={mixer.bass.level} 
            onChange={(v) => setMixer({...mixer, bass: {...mixer.bass, level: v}})} 
          />
          <button 
            className={`px-3 py-1 rounded text-xs ${simpleBass ? 'bg-blue-600' : 'bg-gray-700'}`}
            onClick={() => setSimpleBass(!simpleBass)}>
            {simpleBass ? 'SIMPLE' : 'COMPLEX'}
          </button>
          <button 
            className={`px-3 py-1 rounded text-xs ${mixer.bass.mute ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => setMixer({...mixer, bass: {...mixer.bass, mute: !mixer.bass.mute}})}>
            {mixer.bass.mute ? 'MUTED' : 'ACTIVE'}
          </button>
        </div>
        
        {/* Drums */}
        <div className="flex flex-col items-center gap-2">
          <Knob 
            label="DRUMS" 
            value={mixer.drums.level} 
            onChange={(v) => setMixer({...mixer, drums: {...mixer.drums, level: v}})} 
          />
          <LED active={isPlaying} color="red" />
          <button 
            className={`px-3 py-1 rounded text-xs ${mixer.drums.mute ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => setMixer({...mixer, drums: {...mixer.drums, mute: !mixer.drums.mute}})}>
            {mixer.drums.mute ? 'MUTED' : 'ACTIVE'}
          </button>
        </div>
        
        {/* Keys */}
        <div className="flex flex-col items-center gap-2">
          <Knob 
            label="KEYS" 
            value={mixer.keys.level} 
            onChange={(v) => setMixer({...mixer, keys: {...mixer.keys, level: v}})} 
          />
          <button 
            className={`px-3 py-1 rounded text-xs ${mixer.keys.mute ? 'bg-red-600' : 'bg-gray-700'}`}
            onClick={() => setMixer({...mixer, keys: {...mixer.keys, mute: !mixer.keys.mute}})}>
            {mixer.keys.mute ? 'MUTED' : 'ACTIVE'}
          </button>
        </div>
      </div>
    );
  };
  
  // Parts sequencer
  const PartsSequencer = () => {
    return (
      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-400 uppercase tracking-wider">PART</div>
        {parts.map(part => (
          <div 
            key={part.id}
            className={`cursor-pointer ${part.active ? 'opacity-100' : 'opacity-30'}`}
            onClick={() => setCurrentPart(part.id)}>
            <div className="flex flex-col items-center gap-1">
              <LED active={currentPart === part.id} color="green" />
              <div className="text-sm font-bold text-white">{part.id}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Funções de controle
  const handleLooperClick = async () => {
    if (looperRecording) {
      looperEngine.stopRecording();
    } else if (looperLayers.length > 0) {
      // Se já tem camadas, fazer overdub
      await looperEngine.startRecording();
    } else {
      // Primeira gravação
      await looperEngine.startRecording();
    }
  };
  
  const handleBandClick = () => {
    if (isPlaying) {
      // Parar tudo
      bassEngine.stop();
      setIsPlaying(false);
    } else {
      // Iniciar banda
      const currentPart = sequencerEngine.getCurrentPart();
      if (currentPart && !mixer.bass.mute) {
        bassEngine.play(currentPart.chords, bpm, bassMode, mixer.bass.level / 100);
      }
      setIsPlaying(true);
    }
  };
  
  const handleClearLooper = () => {
    looperEngine.clear();
    setLooperLayers([]);
  };
  
  const handleUndoLooper = () => {
    looperEngine.undoLastLayer();
    setLooperLayers([...looperEngine.getLayers()]);
  };
  
  const handleExportLooper = async () => {
    const blob = await looperEngine.exportWAV();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `loop_${Date.now()}.wav`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  
  // Main play/stop controls
  const MainControls = () => {
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-6 justify-center items-center">
          {/* Looper footswitch */}
          <button 
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-2
                       ${looperRecording ? 'bg-red-600' : looperLayers.length > 0 ? 'bg-orange-600' : 'bg-gray-800'} 
                       border-4 border-gray-600 hover:border-gray-500 transition-all`}
            onClick={handleLooperClick}>
            <Circle className="w-8 h-8" />
            <div className="text-xs uppercase tracking-wider">Looper</div>
          </button>
          
          {/* Band footswitch */}
          <button 
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-2
                       ${isPlaying ? 'bg-green-600' : 'bg-gray-800'} 
                       border-4 border-gray-600 hover:border-gray-500 transition-all`}
            onClick={handleBandClick}>
            {isPlaying ? <Square className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            <div className="text-xs uppercase tracking-wider">Band</div>
          </button>
        </div>
        
        {/* Looper controls */}
        {looperLayers.length > 0 && (
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center gap-2"
              onClick={handleUndoLooper}>
              <Trash2 className="w-4 h-4" />
              Undo ({looperLayers.length} layers)
            </button>
            <button 
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm flex items-center gap-2"
              onClick={handleExportLooper}>
              <Download className="w-4 h-4" />
              Export WAV
            </button>
            <button 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm flex items-center gap-2"
              onClick={handleClearLooper}>
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            MODOS GREGOS
          </h1>
          <h2 className="text-2xl font-bold text-orange-500">BAND CREATOR + LOOPER</h2>
          <p className="text-gray-400 text-sm mt-2">Professional Backing Track Generator</p>
        </div>
        
        {/* Main panel */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border-2 border-gray-700">
          
          {/* Top row: Tempo, Genre, Style */}
          <div className="flex justify-around items-center mb-12">
            {/* Tempo knob */}
            <div className="flex flex-col items-center gap-4">
              <Knob 
                label="TEMPO" 
                value={bpm} 
                onChange={setBpm} 
                min={40} 
                max={300}
                size="lg"
              />
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={altTime}
                  onChange={(e) => setAltTime(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs text-gray-400 uppercase">Alt Time</span>
              </div>
            </div>
            
            {/* Genre selector */}
            <GenreSelector />
            
            {/* Style selector */}
            <StyleSelector />
          </div>
          
          {/* Parts sequencer */}
          <div className="flex justify-center mb-8">
            <PartsSequencer />
          </div>
          
          {/* Mixer section */}
          <div className="mb-12">
            <MixerSection />
          </div>
          
          {/* Style info */}
          {styleData && (
            <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 uppercase text-xs mb-1">Feel</div>
                  <div className="text-white font-semibold">{styleData.feel}</div>
                </div>
                <div>
                  <div className="text-gray-400 uppercase text-xs mb-1">BPM Range</div>
                  <div className="text-white font-semibold">{styleData.bpm[0]} - {styleData.bpm[1]}</div>
                </div>
                <div>
                  <div className="text-gray-400 uppercase text-xs mb-1">Time Signature</div>
                  <div className="text-white font-semibold">{styleData.timeSignature}</div>
                </div>
                <div>
                  <div className="text-gray-400 uppercase text-xs mb-1">Swing</div>
                  <div className="text-white font-semibold">{Math.round(styleData.swing * 100)}%</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Main controls */}
          <MainControls />
          
        </div>
        
        {/* Status bar */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {isPlaying ? (
            <div className="flex items-center justify-center gap-2 text-green-400">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Playing: {genreData?.name} - {styleData?.name} @ {bpm} BPM</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Music className="w-4 h-4" />
              <span>Ready to jam</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BandCreator;

