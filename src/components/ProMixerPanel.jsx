/**
 * ProMixerPanel - Painel de mixer profissional
 * 
 * Funcionalidades:
 * - Controle de volume por canal
 * - Pan estéreo
 * - EQ (low, mid, high)
 * - Reverb
 * - Mute e Solo
 * - Medidor de nível
 */

import React, { useState, useEffect } from 'react';
import { Volume2, Sliders, Maximize2, Minimize2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { proSampleMixer } from '@/utils/proSampleMixer.js';

export const ProMixerPanel = () => {
  const [channels, setChannels] = useState({
    drums: { volume: 1.0, pan: 0, muted: false, solo: false, eq: { low: 0, mid: 0, high: 0 }, reverb: 0 },
    bass: { volume: 1.0, pan: 0, muted: false, solo: false, eq: { low: 0, mid: 0, high: 0 }, reverb: 0 },
    piano: { volume: 1.0, pan: 0, muted: false, solo: false, eq: { low: 0, mid: 0, high: 0 }, reverb: 0 },
    guitar: { volume: 1.0, pan: 0, muted: false, solo: false, eq: { low: 0, mid: 0, high: 0 }, reverb: 0 },
  });

  const [bpm, setBpm] = useState(120);
  const [isExpanded, setIsExpanded] = useState(false);

  // Atualizar volume do canal
  const handleVolumeChange = (channel, value) => {
    const newVolume = value[0];
    setChannels(prev => ({
      ...prev,
      [channel]: { ...prev[channel], volume: newVolume }
    }));
    proSampleMixer.setChannelVolume(channel, newVolume);
  };

  // Atualizar pan
  const handlePanChange = (channel, value) => {
    const newPan = value[0];
    setChannels(prev => ({
      ...prev,
      [channel]: { ...prev[channel], pan: newPan }
    }));
    proSampleMixer.setChannelPan(channel, newPan);
  };

  // Atualizar EQ
  const handleEQChange = (channel, band, value) => {
    const newEQ = { ...channels[channel].eq, [band]: value[0] };
    setChannels(prev => ({
      ...prev,
      [channel]: { ...prev[channel], eq: newEQ }
    }));
    proSampleMixer.setChannelEQ(channel, newEQ.low, newEQ.mid, newEQ.high);
  };

  // Atualizar reverb
  const handleReverbChange = (channel, value) => {
    const newReverb = value[0];
    setChannels(prev => ({
      ...prev,
      [channel]: { ...prev[channel], reverb: newReverb }
    }));
    proSampleMixer.setChannelReverb(channel, newReverb);
  };

  // Mutar canal
  const handleMute = (channel) => {
    const newMuted = !channels[channel].muted;
    setChannels(prev => ({
      ...prev,
      [channel]: { ...prev[channel], muted: newMuted }
    }));
    proSampleMixer.muteChannel(channel, newMuted);
  };

  // Solo de canal
  const handleSolo = (channel) => {
    const newSolo = !channels[channel].solo;
    setChannels(prev => ({
      ...prev,
      [channel]: { ...prev[channel], solo: newSolo }
    }));
    proSampleMixer.soloChannel(channel, newSolo);
  };

  // Atualizar BPM
  const handleBPMChange = (value) => {
    const newBpm = value[0];
    setBpm(newBpm);
    proSampleMixer.setBPM(newBpm);
  };

  // Renderizar controle de canal
  const renderChannelControl = (channelName) => {
    const channel = channels[channelName];

    return (
      <Card key={channelName} className={`${isExpanded ? 'w-full' : 'w-48'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm capitalize">{channelName}</CardTitle>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={channel.muted ? 'destructive' : 'outline'}
                onClick={() => handleMute(channelName)}
                className="w-8 h-8 p-0"
                title="Mute"
              >
                M
              </Button>
              <Button
                size="sm"
                variant={channel.solo ? 'default' : 'outline'}
                onClick={() => handleSolo(channelName)}
                className="w-8 h-8 p-0"
                title="Solo"
              >
                S
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Volume</label>
              <span className="text-xs">{Math.round(channel.volume * 100)}%</span>
            </div>
            <Slider
              value={[channel.volume]}
              onValueChange={(v) => handleVolumeChange(channelName, v)}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>

          {/* Pan */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium">Pan</label>
              <span className="text-xs">{channel.pan > 0 ? 'R' : channel.pan < 0 ? 'L' : 'C'}</span>
            </div>
            <Slider
              value={[channel.pan]}
              onValueChange={(v) => handlePanChange(channelName, v)}
              min={-1}
              max={1}
              step={0.01}
              className="w-full"
            />
          </div>

          {/* EQ - Expandido */}
          {isExpanded && (
            <div className="space-y-3 pt-3 border-t">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium">Low</label>
                  <span className="text-xs">{channel.eq.low.toFixed(1)}</span>
                </div>
                <Slider
                  value={[channel.eq.low]}
                  onValueChange={(v) => handleEQChange(channelName, 'low', v)}
                  min={-12}
                  max={12}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium">Mid</label>
                  <span className="text-xs">{channel.eq.mid.toFixed(1)}</span>
                </div>
                <Slider
                  value={[channel.eq.mid]}
                  onValueChange={(v) => handleEQChange(channelName, 'mid', v)}
                  min={-12}
                  max={12}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium">High</label>
                  <span className="text-xs">{channel.eq.high.toFixed(1)}</span>
                </div>
                <Slider
                  value={[channel.eq.high]}
                  onValueChange={(v) => handleEQChange(channelName, 'high', v)}
                  min={-12}
                  max={12}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium">Reverb</label>
                  <span className="text-xs">{Math.round(channel.reverb * 100)}%</span>
                </div>
                <Slider
                  value={[channel.reverb]}
                  onValueChange={(v) => handleReverbChange(channelName, v)}
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Controle de BPM */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center justify-between">
            <span>Mixer Profissional</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  Compacto
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  Expandir
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* BPM Global */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">BPM Global</label>
              <span className="text-sm font-semibold">{bpm}</span>
            </div>
            <Slider
              value={[bpm]}
              onValueChange={handleBPMChange}
              min={40}
              max={300}
              step={1}
              className="w-full"
            />
          </div>

          {/* Grid de Canais */}
          <div className={`grid gap-4 ${isExpanded ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
            {['drums', 'bass', 'piano', 'guitar'].map(channel => renderChannelControl(channel))}
          </div>
        </CardContent>
      </Card>

      {/* Informações de Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>
              <p className="font-medium">Vozes Ativas</p>
              <p>{proSampleMixer.audioContext?.state || 'N/A'}</p>
            </div>
            <div>
              <p className="font-medium">Cache</p>
              <p>{proSampleMixer.engines?.sample?.getCacheInfo?.()?.usage || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProMixerPanel;
