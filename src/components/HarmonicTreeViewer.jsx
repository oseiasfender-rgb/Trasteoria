import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';

export function HarmonicTreeViewer() {
  const [selectedTone, setSelectedTone] = useState('C');
  const [selectedMode, setSelectedMode] = useState('jonio');

  // Modos Gregos em ordem didática
  const modes = [
    { id: 'jonio', name: 'Jônio', intervals: [0, 2, 4, 5, 7, 9, 11], quality: 'Maior', symbol: 'I' },
    { id: 'dorico', name: 'Dórico', intervals: [0, 2, 3, 5, 7, 9, 10], quality: 'Menor com 6ª', symbol: 'II' },
    { id: 'frigio', name: 'Frígio', intervals: [0, 1, 3, 5, 7, 8, 10], quality: 'Menor com 2ª menor', symbol: 'III' },
    { id: 'lidio', name: 'Lídio', intervals: [0, 2, 4, 6, 7, 9, 11], quality: 'Maior com 4ª aumentada', symbol: 'IV' },
    { id: 'mixolidio', name: 'Mixolídio', intervals: [0, 2, 4, 5, 7, 9, 10], quality: 'Maior com 7ª menor', symbol: 'V' },
    { id: 'eolio', name: 'Eólio', intervals: [0, 2, 3, 5, 7, 8, 10], quality: 'Menor natural', symbol: 'VI' },
    { id: 'locrio', name: 'Lócrio', intervals: [0, 1, 3, 5, 6, 8, 10], quality: 'Menor com 2ª menor e 5ª diminuta', symbol: 'VII' }
  ];

  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Calcular as notas do modo
  const getNotesForMode = (tone, mode) => {
    const toneIndex = notes.indexOf(tone);
    const modeData = modes.find(m => m.id === mode);
    
    return modeData.intervals.map(interval => {
      const noteIndex = (toneIndex + interval) % 12;
      return notes[noteIndex];
    });
  };

  // Calcular acordes equivalentes (Árvore Harmônica)
  const getEquivalentChords = (tone, mode) => {
    const modeData = modes.find(m => m.id === mode);
    const modeNotes = getNotesForMode(tone, mode);
    
    // Acordes equivalentes (mesmo conjunto de notas, diferentes raízes)
    const equivalentChords = [];
    
    modeNotes.forEach((root, index) => {
      const correspondingMode = modes[index];
      equivalentChords.push({
        root,
        mode: correspondingMode.id,
        modeName: correspondingMode.name,
        symbol: correspondingMode.symbol,
        quality: correspondingMode.quality
      });
    });

    return equivalentChords;
  };

  const equivalentChords = getEquivalentChords(selectedTone, selectedMode);
  const centerChord = equivalentChords.find(c => c.root === selectedTone);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-sm border-green-500/50">
        <CardHeader>
          <CardTitle className="text-2xl">🌳 Árvore Harmônica - Centro Tonal</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Visualize os acordes equivalentes e suas relações modais. O centro tonal é a referência.
          </p>
        </CardHeader>
      </Card>

      {/* Seleção de Tom e Modo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Seleção de Tom e Modo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tom (Centro Tonal)</label>
              <div className="grid grid-cols-4 gap-2">
                {notes.map(note => (
                  <Button
                    key={note}
                    onClick={() => setSelectedTone(note)}
                    variant={selectedTone === note ? 'default' : 'outline'}
                    size="sm"
                    className="font-bold"
                  >
                    {note}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Modo</label>
              <div className="space-y-2">
                {modes.map(mode => (
                  <Button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    variant={selectedMode === mode.id ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <span className="font-bold mr-2">{mode.symbol}</span>
                    {mode.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Árvore Harmônica */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Árvore Harmônica - {selectedTone} {selectedMode}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Centro Tonal */}
            {centerChord && (
              <div className="text-center p-6 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500 rounded-lg">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">🎯 Centro Tonal</h3>
                <div className="text-3xl font-bold mb-2">{centerChord.root}</div>
                <div className="text-lg font-semibold mb-1">{centerChord.modeName}</div>
                <div className="text-sm text-muted-foreground">{centerChord.quality}</div>
              </div>
            )}

            {/* Acordes Equivalentes */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Acordes Equivalentes (Mesma Escala)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equivalentChords.map((chord, index) => {
                  const isCenter = chord.root === selectedTone;
                  const position = index < 4 ? 'Esquerda (Subdominante)' : 'Direita (Dominante)';
                  
                  return (
                    <div
                      key={`${chord.root}-${chord.mode}`}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCenter
                          ? 'bg-yellow-500/20 border-yellow-500 ring-2 ring-yellow-400'
                          : 'bg-muted/50 border-muted-foreground/50 hover:border-primary'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-2xl font-bold">{chord.root}</div>
                          <div className="text-sm font-medium">{chord.modeName}</div>
                        </div>
                        <Badge variant={isCenter ? 'default' : 'secondary'}>
                          {chord.symbol}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{chord.quality}</p>
                      {isCenter && <p className="text-xs font-semibold text-yellow-400">🎯 Centro Tonal</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notas da Escala */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Notas da Escala {selectedTone} {selectedMode}</h4>
              <div className="flex flex-wrap gap-2">
                {getNotesForMode(selectedTone, selectedMode).map((note, index) => (
                  <Badge key={`${note}-${index}`} className="text-lg py-2 px-3">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Informações Educacionais */}
            <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-400 mb-2">💡 Informação Educacional</h5>
              <p className="text-sm text-muted-foreground mb-2">
                A Árvore Harmônica mostra todos os acordes que podem ser formados a partir da mesma escala. 
                O <strong>Centro Tonal</strong> é a referência (tônica), e os outros acordes são equivalentes 
                porque compartilham as mesmas notas.
              </p>
              <p className="text-sm text-muted-foreground">
                Use Dó (C) como referência para aprender a estrutura em qualquer tom. Os graus (I, II, III, etc.) 
                indicam a posição do acorde na escala.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Referência */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tabela de Modos Gregos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2">Símbolo</th>
                  <th className="text-left py-2 px-2">Nome</th>
                  <th className="text-left py-2 px-2">Qualidade</th>
                  <th className="text-left py-2 px-2">Intervalos</th>
                </tr>
              </thead>
              <tbody>
                {modes.map(mode => (
                  <tr key={mode.id} className="border-b hover:bg-muted/50">
                    <td className="py-2 px-2 font-bold">{mode.symbol}</td>
                    <td className="py-2 px-2">{mode.name}</td>
                    <td className="py-2 px-2 text-xs">{mode.quality}</td>
                    <td className="py-2 px-2 text-xs font-mono">{mode.intervals.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
