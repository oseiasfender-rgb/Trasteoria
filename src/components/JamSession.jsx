/**
 * 🎸 Jam Session Component
 * Sistema de jam session com compartilhamento de progressões e sincronização
 * Versão simplificada sem WebRTC (usa compartilhamento de links)
 */

import React, { useState, useEffect } from 'react';
import { Users, Share2, Copy, Play, Pause, Music, Download, Upload } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { useToast } from '../hooks/useToast';
import AnimatedButton from './AnimatedButton';
import AnimatedCard from './AnimatedCard';

const JamSession = () => {
  const { playChord } = useAppContext();
  const { showSuccess, showError, showInfo } = useToast();
  
  const [sessionName, setSessionName] = useState('');
  const [progression, setProgression] = useState([]);
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [savedSessions, setSavedSessions] = useState([]);
  
  // Carregar sessões salvas
  useEffect(() => {
    loadSavedSessions();
  }, []);
  
  // Carregar sessões do localStorage
  const loadSavedSessions = () => {
    try {
      const saved = localStorage.getItem('jamSessions');
      if (saved) {
        setSavedSessions(JSON.parse(saved));
      }
    } catch (error) {
    }
  };
  
  // Salvar sessão
  const saveSession = () => {
    if (!sessionName.trim()) {
      showError('Digite um nome para a sessão');
      return;
    }
    
    if (progression.length === 0) {
      showError('Adicione acordes à progressão');
      return;
    }
    
    const session = {
      id: Date.now(),
      name: sessionName,
      progression,
      bpm,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedSessions, session];
    setSavedSessions(updated);
    localStorage.setItem('jamSessions', JSON.stringify(updated));
    
    showSuccess(`Sessão "${sessionName}" salva!`);
    setSessionName('');
  };
  
  // Carregar sessão
  const loadSession = (session) => {
    setProgression(session.progression);
    setBpm(session.bpm);
    setSessionName(session.name);
    showSuccess(`Sessão "${session.name}" carregada!`);
  };
  
  // Deletar sessão
  const deleteSession = (id) => {
    const updated = savedSessions.filter(s => s.id !== id);
    setSavedSessions(updated);
    localStorage.setItem('jamSessions', JSON.stringify(updated));
    showInfo('Sessão deletada');
  };
  
  // Adicionar acorde
  const addChord = (chord) => {
    setProgression([...progression, chord]);
    showSuccess(`${chord} adicionado`);
  };
  
  // Remover último acorde
  const removeLastChord = () => {
    if (progression.length > 0) {
      setProgression(progression.slice(0, -1));
    }
  };
  
  // Limpar progressão
  const clearProgression = () => {
    setProgression([]);
    setCurrentChordIndex(0);
    setIsPlaying(false);
  };
  
  // Tocar progressão
  const playProgression = async () => {
    if (progression.length === 0) {
      showError('Adicione acordes primeiro');
      return;
    }
    
    setIsPlaying(true);
    const beatDuration = (60 / bpm) * 1000 * 4; // 4 beats por acorde
    
    for (let i = 0; i < progression.length; i++) {
      if (!isPlaying) break;
      
      setCurrentChordIndex(i);
      await playChord(progression[i], 'C');
      await new Promise(resolve => setTimeout(resolve, beatDuration));
    }
    
    setIsPlaying(false);
    setCurrentChordIndex(0);
  };
  
  // Parar
  const stopPlaying = () => {
    setIsPlaying(false);
    setCurrentChordIndex(0);
  };
  
  // Exportar sessão (JSON)
  const exportSession = () => {
    if (progression.length === 0) {
      showError('Adicione acordes primeiro');
      return;
    }
    
    const session = {
      name: sessionName || 'Jam Session',
      progression,
      bpm,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(session, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${session.name.replace(/\s+/g, '_')}.json`;
    link.click();
    
    showSuccess('Sessão exportada!');
  };
  
  // Importar sessão
  const importSession = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const session = JSON.parse(e.target.result);
        setProgression(session.progression || []);
        setBpm(session.bpm || 120);
        setSessionName(session.name || 'Importada');
        showSuccess('Sessão importada!');
      } catch (error) {
        showError('Erro ao importar sessão');
      }
    };
    reader.readAsText(file);
  };
  
  // Compartilhar (copiar link)
  const shareSession = () => {
    if (progression.length === 0) {
      showError('Adicione acordes primeiro');
      return;
    }
    
    const sessionData = btoa(JSON.stringify({ progression, bpm }));
    const url = `${window.location.origin}${window.location.pathname}?jam=${sessionData}`;
    
    navigator.clipboard.writeText(url).then(() => {
      showSuccess('Link copiado! Compartilhe com seus amigos');
    }).catch(() => {
      showError('Erro ao copiar link');
    });
  };
  
  // Carregar sessão da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jamData = params.get('jam');
    
    if (jamData) {
      try {
        const session = JSON.parse(atob(jamData));
        setProgression(session.progression || []);
        setBpm(session.bpm || 120);
        showInfo('Sessão compartilhada carregada!');
      } catch (error) {
      }
    }
  }, []);
  
  // Acordes comuns
  const commonChords = [
    'C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim',
    'Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7', 'Am7',
    'D', 'E', 'A', 'B', 'F#m', 'Bm'
  ];
  
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <AnimatedCard delay={0.1}>
        <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Jam Session</h3>
          </div>
          <p className="text-pink-100">
            Crie, salve e compartilhe progressões de acordes para tocar com amigos
          </p>
        </div>
      </AnimatedCard>
      
      {/* Controles Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progressão Atual */}
        <AnimatedCard delay={0.2}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-500" />
              Sua Progressão
            </h4>
            
            {/* Nome da Sessão */}
            <input
              type="text"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              placeholder="Nome da sessão..."
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-purple-500 focus:outline-none mb-4"
            />
            
            {/* Progressão */}
            {progression.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p>Nenhum acorde adicionado</p>
                <p className="text-sm mt-2">Clique nos acordes abaixo para adicionar</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mb-4">
                {progression.map((chord, index) => (
                  <div
                    key={index}
                    className={`
                      px-4 py-2 rounded-lg font-bold text-white transition-all
                      ${currentChordIndex === index && isPlaying
                        ? 'bg-purple-500 scale-110'
                        : 'bg-slate-700'
                      }
                    `}
                  >
                    {chord}
                  </div>
                ))}
              </div>
            )}
            
            {/* BPM */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                BPM: {bpm}
              </label>
              <input
                type="range"
                min="40"
                max="240"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            {/* Controles */}
            <div className="flex flex-wrap gap-2">
              <AnimatedButton
                variant={isPlaying ? "danger" : "primary"}
                onClick={isPlaying ? stopPlaying : playProgression}
                icon={isPlaying ? <Pause /> : <Play />}
                disabled={progression.length === 0}
              >
                {isPlaying ? 'Parar' : 'Tocar'}
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                onClick={removeLastChord}
                disabled={progression.length === 0}
              >
                Remover Último
              </AnimatedButton>
              
              <AnimatedButton
                variant="danger"
                onClick={clearProgression}
                disabled={progression.length === 0}
              >
                Limpar
              </AnimatedButton>
            </div>
          </div>
        </AnimatedCard>
        
        {/* Ações */}
        <AnimatedCard delay={0.3}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">Ações</h4>
            
            <div className="space-y-3">
              <AnimatedButton
                variant="success"
                onClick={saveSession}
                className="w-full"
                disabled={progression.length === 0}
              >
                Salvar Sessão
              </AnimatedButton>
              
              <AnimatedButton
                variant="primary"
                onClick={shareSession}
                icon={<Share2 />}
                className="w-full"
                disabled={progression.length === 0}
              >
                Compartilhar Link
              </AnimatedButton>
              
              <AnimatedButton
                variant="outline"
                onClick={exportSession}
                icon={<Download />}
                className="w-full"
                disabled={progression.length === 0}
              >
                Exportar JSON
              </AnimatedButton>
              
              <label className="block">
                <input
                  type="file"
                  accept=".json"
                  onChange={importSession}
                  className="hidden"
                  id="import-session"
                />
                <AnimatedButton
                  variant="outline"
                  icon={<Upload />}
                  className="w-full"
                  onClick={() => document.getElementById('import-session').click()}
                >
                  Importar JSON
                </AnimatedButton>
              </label>
            </div>
          </div>
        </AnimatedCard>
      </div>
      
      {/* Paleta de Acordes */}
      <AnimatedCard delay={0.4}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <h4 className="text-xl font-bold text-white mb-4">Adicionar Acordes</h4>
          
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {commonChords.map(chord => (
              <button
                key={chord}
                onClick={() => addChord(chord)}
                className="px-4 py-3 bg-slate-700 hover:bg-purple-600 text-white rounded-lg font-medium transition-all hover:scale-105"
              >
                {chord}
              </button>
            ))}
          </div>
        </div>
      </AnimatedCard>
      
      {/* Sessões Salvas */}
      {savedSessions.length > 0 && (
        <AnimatedCard delay={0.5}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <h4 className="text-xl font-bold text-white mb-4">Sessões Salvas</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {savedSessions.map(session => (
                <div
                  key={session.id}
                  className="bg-slate-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-white">{session.name}</h5>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="text-red-500 hover:text-red-400 text-sm"
                    >
                      Deletar
                    </button>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">
                    {session.progression.join(' → ')}
                  </p>
                  <p className="text-xs text-slate-500 mb-3">
                    {session.bpm} BPM
                  </p>
                  <AnimatedButton
                    variant="outline"
                    size="sm"
                    onClick={() => loadSession(session)}
                    className="w-full"
                  >
                    Carregar
                  </AnimatedButton>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
};

export default JamSession;

