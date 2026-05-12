import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Play, Pause, RotateCcw, Save, Download } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext.jsx';

export function StudioPro() {
  const { audioInitialized } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('jazz');
  const [selectedStyle, setSelectedStyle] = useState('swing');
  const [bpm, setBpm] = useState(120);
  const [looperActive, setLooperActive] = useState(false);
  const [recordingLoop, setRecordingLoop] = useState(false);
  
  // Controles de volume
  const [volumes, setVolumes] = useState({
    drums: 0.7,
    bass: 0.7,
    keyboards: 0.6,
    loops: 0.5
  });

  // Modos de baixo
  const [bassMode, setBassMode] = useState('walking'); // walking, funk, melodic

  // Gêneros e estilos
  const genres = {
    jazz: ['swing', 'ballad', 'bebop', 'modal', 'fusion', 'latin', 'bossa', 'samba', 'cool', 'hard-bop', 'free', 'smooth'],
    blues: ['slow', 'shuffle', 'texas-shuffle', 'chicago', 'delta', 'electric', 'funk', 'rock', 'swing', 'minor', 'jump', 'modal'],
    rock: ['classic', 'hard', 'metal', 'punk', 'alternative', 'progressive', 'indie', 'grunge', 'psychedelic', 'glam', 'southern', 'surf'],
    pop: ['upbeat', 'ballad', 'funk', 'disco', 'synthpop', 'indie-pop', 'britpop', 'k-pop', 'hip-hop', 'r-and-b', 'soul', 'reggae'],
    funk: ['classic', 'p-funk', 'slap', 'synth', 'acid', 'house', 'techno', 'drum-and-bass', 'dubstep', 'trap', 'grime', 'garage'],
    latin: ['samba', 'bossa', 'mambo', 'cha-cha', 'tango', 'salsa', 'merengue', 'cumbia', 'reggaeton', 'bachata', 'bolero', 'son'],
    gospel: ['traditional', 'contemporary', 'soul', 'praise', 'hymn', 'spiritual', 'pentecostal', 'charismatic', 'ccm', 'worship', 'revival', 'jubilee'],
    country: ['classic', 'outlaw', 'honky-tonk', 'bluegrass', 'western', 'alt-country', 'americana', 'folk', 'progressive', 'texas', 'nashville', 'southern'],
    metal: ['classic', 'thrash', 'death', 'black', 'power', 'progressive', 'doom', 'symphonic', 'industrial', 'alternative', 'nu-metal', 'metalcore'],
    electronic: ['house', 'techno', 'trance', 'drum-and-bass', 'dubstep', 'trap', 'ambient', 'industrial', 'synthwave', 'vaporwave', 'chillwave', 'lo-fi'],
    classical: ['baroque', 'classical', 'romantic', 'contemporary', 'minimalist', 'impressionist', 'expressionist', 'serialist', 'aleatoric', 'spectral', 'postmodern', 'avant-garde'],
    world: ['african', 'asian', 'middle-eastern', 'indian', 'celtic', 'flamenco', 'klezmer', 'balkan', 'caribbean', 'pacific', 'indigenous', 'fusion']
  };

  const handleVolumeChange = (instrument, value) => {
    setVolumes(prev => ({
      ...prev,
      [instrument]: value[0]
    }));
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setBpm(120);
    setVolumes({
      drums: 0.7,
      bass: 0.7,
      keyboards: 0.6,
      loops: 0.5
    });
  };

  const handleLooperToggle = () => {
    setLooperActive(!looperActive);
    if (!looperActive) {
      setRecordingLoop(true);
      setTimeout(() => setRecordingLoop(false), 2000);
    }
  };

  const handleSaveSession = () => {
    const session = {
      genre: selectedGenre,
      style: selectedStyle,
      bpm,
      volumes,
      bassMode,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`trasteoria-session-${Date.now()}`, JSON.stringify(session));
    alert('Sessão salva com sucesso!');
  };

  const handleExportAudio = () => {
    alert('Funcionalidade de export em desenvolvimento. Use o gravador de backing track para exportar.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-2xl">🎹 Studio Pro - Backing Track Creator</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Crie backing tracks profissionais com 12 gêneros, 144 estilos e controle total sobre cada instrumento.
          </p>
        </CardHeader>
      </Card>

      {/* Seleção de Gênero e Estilo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gênero e Estilo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Gênero</label>
              <select
                value={selectedGenre}
                onChange={(e) => {
                  setSelectedGenre(e.target.value);
                  setSelectedStyle(genres[e.target.value][0]);
                }}
                className="w-full px-3 py-2 bg-background border border-input rounded-md"
              >
                {Object.keys(genres).map(genre => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Estilo</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md"
              >
                {genres[selectedGenre].map(style => (
                  <option key={style} value={style}>
                    {style.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controles de Reprodução */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controles de Reprodução</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="flex-1"
              variant={isPlaying ? 'destructive' : 'default'}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2" size={20} />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="mr-2" size={20} />
                  Reproduzir
                </>
              )}
            </Button>
            <Button size="lg" onClick={handleReset} variant="outline">
              <RotateCcw size={20} />
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">BPM: {bpm}</label>
            <Slider
              value={[bpm]}
              onValueChange={(value) => setBpm(value[0])}
              min={40}
              max={240}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Controles de Volume */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controles de Volume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(volumes).map(([instrument, volume]) => (
            <div key={instrument}>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium capitalize">
                  {instrument === 'keyboards' ? 'Teclados' : instrument.charAt(0).toUpperCase() + instrument.slice(1)}
                </label>
                <span className="text-sm text-muted-foreground">{Math.round(volume * 100)}%</span>
              </div>
              <Slider
                value={[volume]}
                onValueChange={(value) => handleVolumeChange(instrument, value)}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modo de Baixo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modo de Baixo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {['walking', 'funk', 'melodic'].map(mode => (
              <Button
                key={mode}
                onClick={() => setBassMode(mode)}
                variant={bassMode === mode ? 'default' : 'outline'}
                className="capitalize"
              >
                {mode === 'walking' ? 'Walking' : mode === 'funk' ? 'Funk' : 'Melódico'}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Looper */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Looper Integrado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleLooperToggle}
            size="lg"
            className="w-full"
            variant={looperActive ? 'destructive' : 'default'}
          >
            {looperActive ? 'Parar Looper' : 'Iniciar Looper'}
          </Button>
          {recordingLoop && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-sm text-red-300">
              🔴 Gravando loop...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Salvar e Exportar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Salvar e Exportar</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={handleSaveSession} className="flex-1">
            <Save className="mr-2" size={20} />
            Salvar Sessão
          </Button>
          <Button onClick={handleExportAudio} variant="outline" className="flex-1">
            <Download className="mr-2" size={20} />
            Exportar Áudio
          </Button>
        </CardContent>
      </Card>

      {/* Informações do Status */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Gênero:</span>
              <p className="font-medium capitalize">{selectedGenre}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Estilo:</span>
              <p className="font-medium capitalize">{selectedStyle.replace(/-/g, ' ')}</p>
            </div>
            <div>
              <span className="text-muted-foreground">BPM:</span>
              <p className="font-medium">{bpm}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Status:</span>
              <p className="font-medium">{isPlaying ? '▶️ Reproduzindo' : '⏸️ Parado'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
