/**
 * EXEMPLO_INTEGRACAO_COMPLETA.jsx
 * 
 * Este arquivo demonstra como integrar todos os componentes de áudio profissional
 * ao App.jsx do TrasTeoria v5.0
 * 
 * Copie e adapte este código para seu App.jsx
 */

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// Importar componentes de áudio
import { BandCreatorPro } from '@/components/BandCreatorPro.jsx';
import { KeyboardTimbreSelector } from '@/components/KeyboardTimbreSelector.jsx';
import { StringTimbreSelector } from '@/components/StringTimbreSelector.jsx';
import { ProBackingTrackPlayer } from '@/components/ProBackingTrackPlayer.jsx';
import { ProMixerPanel } from '@/components/ProMixerPanel.jsx';

// Importar engines
import { keyboardSampleEngine } from '@/utils/keyboardSampleEngine.js';
import { stringSampleEngine } from '@/utils/stringSampleEngine.js';
import { drumSampleEngine } from '@/utils/drumSampleEngine.js';
import { proSampleMixer } from '@/utils/proSampleMixer.js';

/**
 * Componente Principal - App com Integração Completa
 */
export default function AppWithAudioUpgrade() {
  // Estado de timbres selecionados
  const [selectedKeyboardTimbre, setSelectedKeyboardTimbre] = useState('acoustic_piano');
  const [selectedStringTimbre, setSelectedStringTimbre] = useState('violin');
  const [selectedStringTechnique, setSelectedStringTechnique] = useState('arco');

  // Estado de mixer
  const [mixerState, setMixerState] = useState({
    drums: { volume: 0.8, pan: 0, mute: false },
    bass: { volume: 0.7, pan: 0, mute: false },
    piano: { volume: 0.6, pan: 0, mute: false },
    guitar: { volume: 0.5, pan: 0, mute: false },
    master: { volume: 0.9, pan: 0, mute: false }
  });

  // Estado de BPM
  const [bpm, setBpm] = useState(120);

  // Estado de carregamento
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');

  /**
   * Carregar samples ao montar o componente
   */
  useEffect(() => {
    loadSamples();
  }, []);

  /**
   * Carregar samples de áudio
   */
  async function loadSamples() {
    setIsLoading(true);
    try {
      setLoadingStatus('Carregando samples de teclado...');
      await keyboardSampleEngine.loadTimbreKit(selectedKeyboardTimbre);

      setLoadingStatus('Carregando samples de cordas...');
      await stringSampleEngine.loadTimbreKit(selectedStringTimbre, selectedStringTechnique);

      setLoadingStatus('Carregando samples de bateria...');
      await drumSampleEngine.loadDrumKit();

      setLoadingStatus('Pronto!');
      setTimeout(() => setLoadingStatus(''), 2000);
    } catch (error) {
      setLoadingStatus(`Erro: ${error.message}`);
      console.error('Erro ao carregar samples:', error);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Testar reprodução de nota de teclado
   */
  async function testKeyboardNote() {
    try {
      await keyboardSampleEngine.playNote(
        'C4',
        selectedKeyboardTimbre,
        0.8,
        1.0
      );
    } catch (error) {
      console.error('Erro ao reproduzir nota:', error);
    }
  }

  /**
   * Testar reprodução de nota de cordas
   */
  async function testStringNote() {
    try {
      await stringSampleEngine.playNote(
        'E4',
        selectedStringTimbre,
        selectedStringTechnique,
        0.8,
        1.0
      );
    } catch (error) {
      console.error('Erro ao reproduzir nota:', error);
    }
  }

  /**
   * Testar reprodução de acorde de teclado
   */
  async function testKeyboardChord() {
    try {
      await keyboardSampleEngine.playChord(
        'C4',
        'major',
        selectedKeyboardTimbre,
        0.8,
        2.0
      );
    } catch (error) {
      console.error('Erro ao reproduzir acorde:', error);
    }
  }

  /**
   * Testar reprodução de acorde de cordas
   */
  async function testStringChord() {
    try {
      await stringSampleEngine.playChord(
        'C4',
        'major',
        selectedStringTimbre,
        selectedStringTechnique,
        0.8,
        2.0
      );
    } catch (error) {
      console.error('Erro ao reproduzir acorde:', error);
    }
  }

  /**
   * Testar reprodução de padrão de bateria
   */
  async function testDrumPattern() {
    try {
      await drumSampleEngine.playPattern('rock', 0, bpm);
    } catch (error) {
      console.error('Erro ao reproduzir padrão:', error);
    }
  }

  /**
   * Atualizar volume do mixer
   */
  function updateMixerVolume(channel, volume) {
    setMixerState(prev => ({
      ...prev,
      [channel]: { ...prev[channel], volume: volume[0] / 100 }
    }));
    proSampleMixer.setChannelVolume(channel, volume[0] / 100);
  }

  /**
   * Atualizar pan do mixer
   */
  function updateMixerPan(channel, pan) {
    setMixerState(prev => ({
      ...prev,
      [channel]: { ...prev[channel], pan: pan[0] }
    }));
    proSampleMixer.setChannelPan(channel, pan[0]);
  }

  /**
   * Toggle mute do mixer
   */
  function toggleMute(channel) {
    setMixerState(prev => ({
      ...prev,
      [channel]: { ...prev[channel], mute: !prev[channel].mute }
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎵 TrasTeoria v5.0
          </h1>
          <p className="text-slate-400">
            Plataforma de Educação Musical com Áudio Profissional
          </p>
        </div>

        {/* Status de Carregamento */}
        {isLoading && (
          <Card className="bg-blue-900/20 border-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="animate-spin">⏳</div>
                <div>
                  <p className="text-white font-semibold">Carregando...</p>
                  <p className="text-slate-400 text-sm">{loadingStatus}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs Principais */}
        <Tabs defaultValue="timbres" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
            <TabsTrigger value="timbres" className="text-white">
              🎹 Timbres
            </TabsTrigger>
            <TabsTrigger value="player" className="text-white">
              ▶️ Player
            </TabsTrigger>
            <TabsTrigger value="mixer" className="text-white">
              🎛️ Mixer
            </TabsTrigger>
            <TabsTrigger value="bandcreator" className="text-white">
              🎸 Band Creator
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Seletores de Timbres */}
          <TabsContent value="timbres" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Seletor de Teclados */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">🎹 Timbres de Teclado</CardTitle>
                  <CardDescription>Selecione um timbre de teclado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <KeyboardTimbreSelector
                    defaultTimbre={selectedKeyboardTimbre}
                    onTimbreChange={(timbreId) => {
                      setSelectedKeyboardTimbre(timbreId);
                      loadSamples();
                    }}
                  />
                  <Button
                    onClick={testKeyboardNote}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    🔊 Testar Nota (C4)
                  </Button>
                  <Button
                    onClick={testKeyboardChord}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    🎼 Testar Acorde (C Maior)
                  </Button>
                </CardContent>
              </Card>

              {/* Seletor de Cordas */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">🎻 Timbres de Cordas</CardTitle>
                  <CardDescription>Selecione um timbre e técnica de cordas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <StringTimbreSelector
                    defaultTimbre={selectedStringTimbre}
                    defaultTechnique={selectedStringTechnique}
                    onTimbreChange={(timbreId) => {
                      setSelectedStringTimbre(timbreId);
                      loadSamples();
                    }}
                    onTechniqueChange={(techniqueId) => {
                      setSelectedStringTechnique(techniqueId);
                      loadSamples();
                    }}
                  />
                  <Button
                    onClick={testStringNote}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    🔊 Testar Nota (E4)
                  </Button>
                  <Button
                    onClick={testStringChord}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    🎼 Testar Acorde (C Maior)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Tester de Bateria */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">🥁 Testar Padrões de Bateria</CardTitle>
                <CardDescription>Reproduza padrões de bateria</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-white font-semibold">BPM:</label>
                  <Slider
                    value={[bpm]}
                    onValueChange={setBpm}
                    min={60}
                    max={200}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-white font-semibold w-12 text-right">{bpm}</span>
                </div>
                <Button
                  onClick={testDrumPattern}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  🥁 Reproduzir Padrão Rock
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Player de Backing Tracks */}
          <TabsContent value="player" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">▶️ Player de Backing Tracks</CardTitle>
                <CardDescription>Reproduza backing tracks profissionais</CardDescription>
              </CardHeader>
              <CardContent>
                <ProBackingTrackPlayer defaultPreset="rock" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Mixer Profissional */}
          <TabsContent value="mixer" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">🎛️ Mixer Profissional</CardTitle>
                <CardDescription>Controle o mix de áudio</CardDescription>
              </CardHeader>
              <CardContent>
                <ProMixerPanel onMixChange={setMixerState} />
              </CardContent>
            </Card>

            {/* Controles Manuais de Mixer */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(mixerState).map(([channel, state]) => (
                <Card key={channel} className="bg-slate-800 border-slate-700">
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-white font-semibold capitalize text-center">
                      {channel}
                    </h3>

                    {/* Volume */}
                    <div>
                      <label className="text-slate-300 text-sm">Volume</label>
                      <Slider
                        value={[state.volume * 100]}
                        onValueChange={(value) => updateMixerVolume(channel, value)}
                        min={0}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                      <p className="text-slate-400 text-xs text-center mt-1">
                        {Math.round(state.volume * 100)}%
                      </p>
                    </div>

                    {/* Pan */}
                    <div>
                      <label className="text-slate-300 text-sm">Pan</label>
                      <Slider
                        value={[state.pan]}
                        onValueChange={(value) => updateMixerPan(channel, value)}
                        min={-100}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                      <p className="text-slate-400 text-xs text-center mt-1">
                        {state.pan > 0 ? 'R' : state.pan < 0 ? 'L' : 'C'} {Math.abs(state.pan)}
                      </p>
                    </div>

                    {/* Mute */}
                    <Button
                      onClick={() => toggleMute(channel)}
                      variant={state.mute ? 'destructive' : 'outline'}
                      className="w-full"
                    >
                      {state.mute ? '🔇 Muted' : '🔊 Mute'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab 4: Band Creator Pro */}
          <TabsContent value="bandcreator" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">🎸 Band Creator Pro</CardTitle>
                <CardDescription>Crie backing tracks personalizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <BandCreatorPro defaultPreset="rock" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Informações de Status */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">ℹ️ Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-slate-300">
            <p>✓ Teclado Selecionado: <span className="text-white font-semibold">{selectedKeyboardTimbre}</span></p>
            <p>✓ Cordas Selecionadas: <span className="text-white font-semibold">{selectedStringTimbre} ({selectedStringTechnique})</span></p>
            <p>✓ BPM Atual: <span className="text-white font-semibold">{bpm}</span></p>
            <p>✓ Mixer Ativo: <span className="text-white font-semibold">5 Canais</span></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * INSTRUÇÕES DE INTEGRAÇÃO
 * 
 * 1. Copie este arquivo para src/pages/AudioUpgrade.jsx (ou similar)
 * 
 * 2. Importe no seu App.jsx:
 *    import AudioUpgrade from '@/pages/AudioUpgrade.jsx';
 * 
 * 3. Adicione a rota:
 *    <Route path="/audio-upgrade" element={<AudioUpgrade />} />
 * 
 * 4. Ou use como componente principal:
 *    export default AppWithAudioUpgrade;
 * 
 * 5. Certifique-se de que todos os componentes estão importados corretamente
 * 
 * 6. Baixe samples reais e organize em public/samples/
 * 
 * 7. Execute: npm run dev
 * 
 * 8. Teste no navegador em: http://localhost:5173/audio-upgrade
 */
