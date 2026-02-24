/**
 * ProBackingTrackPlayer - Componente para reproduzir backing tracks profissionais
 * 
 * Funcionalidades:
 * - Seleção de estilo de bateria
 * - Seleção de padrão
 * - Controle de BPM
 * - Seleção de modo de baixo
 * - Seleção de tipo de acorde
 * - Mixer com controle de volume por canal
 * - Reprodução e parada
 */

import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Music, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import useSampleEngine from '@/hooks/useSampleEngine.js';

export const ProBackingTrackPlayer = ({ 
  onStatusChange = null,
  defaultConfig = {}
}) => {
  const { isInitialized, engines, playBackingTrack, stopBackingTrack } = useSampleEngine();
  
  // Estado de configuração
  const [config, setConfig] = useState({
    drumStyle: defaultConfig.drumStyle || 'rock',
    drumPattern: defaultConfig.drumPattern || 0,
    bassMode: defaultConfig.bassMode || 'root',
    chordNotes: defaultConfig.chordNotes || ['C4'],
    chordType: defaultConfig.chordType || 'major',
    bpm: defaultConfig.bpm || 120,
    duration: defaultConfig.duration || 4,
    ...defaultConfig
  });

  // Estado de reprodução
  const [isPlaying, setIsPlaying] = useState(false);
  const [mixerState, setMixerState] = useState({
    drums: 1.0,
    bass: 1.0,
    piano: 1.0,
    guitar: 1.0
  });

  // Obter dados dos engines
  const [drumStyles, setDrumStyles] = useState([]);
  const [drumPatterns, setDrumPatterns] = useState([]);
  const [bassNotes, setBassNotes] = useState([]);
  const [chordTypes, setChordTypes] = useState([]);

  // Carregar dados ao inicializar
  useEffect(() => {
    if (isInitialized && engines) {
      // Obter estilos de bateria
      setDrumStyles(engines.drum.getStyles());
      
      // Obter tipos de acordes
      setChordTypes(engines.piano.getChordTypes());
      
      // Obter notas de baixo
      const notes = engines.bass.getNotes();
      setBassNotes(notes.map(n => n.name));
    }
  }, [isInitialized, engines]);

  // Atualizar padrões quando estilo muda
  useEffect(() => {
    if (engines && config.drumStyle) {
      const patterns = engines.drum.getPatterns(config.drumStyle);
      setDrumPatterns(patterns);
    }
  }, [config.drumStyle, engines]);

  // Notificar mudança de status
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange({
        isPlaying,
        config,
        mixerState
      });
    }
  }, [isPlaying, config, mixerState, onStatusChange]);

  // Iniciar reprodução
  const handlePlay = async () => {
    if (!isInitialized) {
      return;
    }

    try {
      // Carregar kits se necessário
      if (!engines.drum.currentKit) {
        await engines.drum.loadDrumKit(config.drumStyle);
      }
      if (!engines.bass.currentKit) {
        await engines.bass.loadBassKit('electric');
      }
      if (!engines.piano.currentKit) {
        await engines.piano.loadPiano('acoustic');
      }

      // Reproduzir backing track
      await playBackingTrack(config);
      setIsPlaying(true);
    } catch (error) {
    }
  };

  // Parar reprodução
  const handleStop = () => {
    stopBackingTrack();
    setIsPlaying(false);
  };

  // Atualizar volume do canal
  const handleChannelVolume = (channel, value) => {
    const newVolume = value[0];
    setMixerState(prev => ({
      ...prev,
      [channel]: newVolume
    }));
    
    // Atualizar mixer
    if (engines.mixer) {
      engines.mixer.setChannelVolume(channel, newVolume);
    }
  };

  // Atualizar configuração
  const updateConfig = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!isInitialized) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Inicializando engines de áudio...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5" />
          Backing Track Profissional
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Controles de Reprodução */}
        <div className="flex gap-2">
          <Button
            onClick={handlePlay}
            disabled={isPlaying}
            className="gap-2"
            size="lg"
          >
            <Play className="w-4 h-4" />
            Reproduzir
          </Button>
          
          <Button
            onClick={handleStop}
            disabled={!isPlaying}
            variant="outline"
            size="lg"
          >
            <Pause className="w-4 h-4" />
            Parar
          </Button>
        </div>

        {/* Tabs de Configuração */}
        <Tabs defaultValue="drums" className="w-full">
          <TabsList role="tablist" className="grid w-full grid-cols-4">
            <TabsTrigger role="tab" value="drums">Bateria</TabsTrigger>
            <TabsTrigger role="tab" value="bass">Baixo</TabsTrigger>
            <TabsTrigger role="tab" value="piano">Piano</TabsTrigger>
            <TabsTrigger role="tab" value="mixer">Mixer</TabsTrigger>
          </TabsList>

          {/* Aba Bateria */}
          <TabsContent value="drums" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Estilo</label>
                <Select value={config.drumStyle} onValueChange={(v) => updateConfig('drumStyle', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drumStyles.map(style => (
                      <SelectItem key={style} value={style}>
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Padrão</label>
                <Select value={config.drumPattern.toString()} onValueChange={(v) => updateConfig('drumPattern', parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {drumPatterns.map((pattern, idx) => (
                      <SelectItem key={idx} value={idx.toString()}>
                        {pattern.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Aba Baixo */}
          <TabsContent value="bass" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Modo de Baixo</label>
              <Select value={config.bassMode} onValueChange={(v) => updateConfig('bassMode', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root (Nota Raiz)</SelectItem>
                  <SelectItem value="walking">Walking Bass</SelectItem>
                  <SelectItem value="melodic">Melodic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* Aba Piano */}
          <TabsContent value="piano" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nota Raiz</label>
                <Select value={config.chordNotes[0]} onValueChange={(v) => updateConfig('chordNotes', [v])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bassNotes.map(note => (
                      <SelectItem key={note} value={note}>
                        {note}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Tipo de Acorde</label>
                <Select value={config.chordType} onValueChange={(v) => updateConfig('chordType', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {chordTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          {/* Aba Mixer */}
          <TabsContent value="mixer" className="space-y-4">
            <div className="space-y-4">
              {['drums', 'bass', 'piano', 'guitar'].map(channel => (
                <div key={channel} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium capitalize">{channel}</label>
                    <span className="text-xs text-muted-foreground">
                      {Math.round(mixerState[channel] * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[mixerState[channel]]}
                    onValueChange={(v) => handleChannelVolume(channel, v)}
                    min={0}
                    max={1}
                    step={0.01}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Controle de BPM */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">BPM</label>
            <span className="text-sm font-semibold">{config.bpm}</span>
          </div>
          <Slider
            value={[config.bpm]}
            onValueChange={(v) => updateConfig('bpm', v[0])}
            min={40}
            max={300}
            step={1}
            className="w-full"
          />
        </div>

        {/* Status */}
        <div className="pt-4 border-t">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Status: {isPlaying ? '▶️ Reproduzindo' : '⏸️ Parado'}</p>
            <p>Estilo: {config.drumStyle} | Modo Baixo: {config.bassMode}</p>
            <p>Acorde: {config.chordNotes[0]} {config.chordType}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProBackingTrackPlayer;
