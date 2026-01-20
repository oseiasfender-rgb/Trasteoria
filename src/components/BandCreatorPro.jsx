/**
 * BandCreatorPro - Versão profissional do Band Creator com samples reais
 * 
 * Integra:
 * - ProBackingTrackPlayer (controles de backing track)
 * - ProMixerPanel (mixer profissional)
 * - Presets de backing tracks
 * - Sincronização de BPM
 */

import React, { useState, useEffect } from 'react';
import { Music, Settings, Save, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { ProBackingTrackPlayer } from '@/components/ProBackingTrackPlayer.jsx';
import { ProMixerPanel } from '@/components/ProMixerPanel.jsx';
import useSampleEngine from '@/hooks/useSampleEngine.js';

// Presets de backing tracks
const BACKING_TRACK_PRESETS = {
  rock: {
    name: 'Rock',
    description: 'Padrão rock clássico',
    config: {
      drumStyle: 'rock',
      drumPattern: 0,
      bassMode: 'root',
      chordType: 'major',
      bpm: 120
    }
  },
  blues: {
    name: 'Blues',
    description: 'Blues com swing',
    config: {
      drumStyle: 'blues',
      drumPattern: 0,
      bassMode: 'walking',
      chordType: 'dominant7',
      bpm: 100
    }
  },
  jazz: {
    name: 'Jazz',
    description: 'Jazz swing',
    config: {
      drumStyle: 'jazz',
      drumPattern: 0,
      bassMode: 'walking',
      chordType: 'major7',
      bpm: 140
    }
  },
  bossa: {
    name: 'Bossa Nova',
    description: 'Bossa nova brasileira',
    config: {
      drumStyle: 'bossa',
      drumPattern: 0,
      bassMode: 'melodic',
      chordType: 'major7',
      bpm: 90
    }
  },
  funk: {
    name: 'Funk',
    description: 'Funk groovy',
    config: {
      drumStyle: 'funk',
      drumPattern: 0,
      bassMode: 'root',
      chordType: 'dominant7',
      bpm: 110
    }
  },
  balada: {
    name: 'Balada',
    description: 'Balada romântica',
    config: {
      drumStyle: 'balada',
      drumPattern: 0,
      bassMode: 'melodic',
      chordType: 'major',
      bpm: 80
    }
  }
};

export const BandCreatorPro = () => {
  const { isInitialized, error } = useSampleEngine();
  const [currentPreset, setCurrentPreset] = useState('rock');
  const [config, setConfig] = useState(BACKING_TRACK_PRESETS.rock.config);
  const [savedConfigs, setSavedConfigs] = useState([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('');

  // Carregar configurações salvas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('backingTrackConfigs');
    if (saved) {
      try {
        setSavedConfigs(JSON.parse(saved));
      } catch (err) {
        console.error('Erro ao carregar configurações salvas:', err);
      }
    }
  }, []);

  // Aplicar preset
  const applyPreset = (presetKey) => {
    const preset = BACKING_TRACK_PRESETS[presetKey];
    if (preset) {
      setCurrentPreset(presetKey);
      setConfig(preset.config);
    }
  };

  // Salvar configuração
  const saveConfig = () => {
    if (!saveName.trim()) return;

    const newConfig = {
      id: Date.now(),
      name: saveName,
      config,
      createdAt: new Date().toISOString()
    };

    const updated = [...savedConfigs, newConfig];
    setSavedConfigs(updated);
    localStorage.setItem('backingTrackConfigs', JSON.stringify(updated));

    setSaveName('');
    setShowSaveDialog(false);
  };

  // Carregar configuração salva
  const loadSavedConfig = (id) => {
    const saved = savedConfigs.find(c => c.id === id);
    if (saved) {
      setConfig(saved.config);
      setCurrentPreset('custom');
    }
  };

  // Deletar configuração salva
  const deleteSavedConfig = (id) => {
    const updated = savedConfigs.filter(c => c.id !== id);
    setSavedConfigs(updated);
    localStorage.setItem('backingTrackConfigs', JSON.stringify(updated));
  };

  // Resetar para padrão
  const resetToDefault = () => {
    applyPreset('rock');
  };

  if (!isInitialized) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="animate-spin">
              <Music className="w-8 h-8 mx-auto text-primary" />
            </div>
            <p className="text-muted-foreground">Inicializando engines de áudio...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-red-600 font-semibold">Erro ao inicializar</p>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Band Creator Pro
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={resetToDefault}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs Principal */}
      <Tabs defaultValue="presets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="player">Player</TabsTrigger>
          <TabsTrigger value="mixer">Mixer</TabsTrigger>
        </TabsList>

        {/* Aba Presets */}
        <TabsContent value="presets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Presets Inclusos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Grid de Presets */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(BACKING_TRACK_PRESETS).map(([key, preset]) => (
                  <Button
                    key={key}
                    onClick={() => applyPreset(key)}
                    variant={currentPreset === key ? 'default' : 'outline'}
                    className="h-auto flex flex-col items-start p-3"
                  >
                    <span className="font-semibold">{preset.name}</span>
                    <span className="text-xs opacity-75">{preset.description}</span>
                  </Button>
                ))}
              </div>

              {/* Configurações Salvas */}
              {savedConfigs.length > 0 && (
                <div className="pt-4 border-t space-y-3">
                  <h3 className="font-semibold text-sm">Minhas Configurações</h3>
                  <div className="space-y-2">
                    {savedConfigs.map(saved => (
                      <div key={saved.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{saved.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(saved.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => loadSavedConfig(saved.id)}
                            size="sm"
                            variant="outline"
                          >
                            Carregar
                          </Button>
                          <Button
                            onClick={() => deleteSavedConfig(saved.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-700"
                          >
                            Deletar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botão Salvar */}
              <div className="pt-4 border-t">
                <Button
                  onClick={() => setShowSaveDialog(true)}
                  className="w-full gap-2"
                >
                  <Save className="w-4 h-4" />
                  Salvar Configuração Atual
                </Button>

                {showSaveDialog && (
                  <div className="mt-4 p-4 bg-muted rounded space-y-3">
                    <input
                      type="text"
                      placeholder="Nome da configuração..."
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={saveConfig}
                        size="sm"
                        className="flex-1"
                      >
                        Salvar
                      </Button>
                      <Button
                        onClick={() => setShowSaveDialog(false)}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Player */}
        <TabsContent value="player">
          <ProBackingTrackPlayer
            defaultConfig={config}
            onStatusChange={(status) => setConfig(status.config)}
          />
        </TabsContent>

        {/* Aba Mixer */}
        <TabsContent value="mixer">
          <ProMixerPanel />
        </TabsContent>
      </Tabs>

      {/* Informações de Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Preset Atual</p>
              <p className="font-semibold capitalize">{currentPreset}</p>
            </div>
            <div>
              <p className="text-muted-foreground">BPM</p>
              <p className="font-semibold">{config.bpm}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estilo</p>
              <p className="font-semibold capitalize">{config.drumStyle}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Acorde</p>
              <p className="font-semibold capitalize">{config.chordType}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BandCreatorPro;
