import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useToast } from '../hooks/useToast.js';
import { chordProgressions, progressionGenres, progressionDifficulties, filterProgressions } from '../data/chordProgressions.js';
import { Music2, Play, Plus, Trash2, Save, Download, Lightbulb } from 'lucide-react';

export function ComposicaoSection() {
  const { playChord, playProgression, currentKey } = useAppContext();
  const { showSuccess, showInfo } = useToast();
  
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [customProgression, setCustomProgression] = useState([]);
  const [savedProgressions, setSavedProgressions] = useState([]);

  // Carregar progressões salvas
  React.useEffect(() => {
    const saved = localStorage.getItem('savedProgressions');
    if (saved) {
      setSavedProgressions(JSON.parse(saved));
    }
  }, []);

  const filteredProgressions = filterProgressions(chordProgressions, selectedGenre, selectedDifficulty);

  const handlePlayProgression = async (progression) => {
    try {
      // Converter graus romanos para acordes reais
      const chords = progression.example.split(' - ');
      await playProgression(chords, null, 2.0);
      showSuccess(`Tocando: ${progression.name}`);
    } catch (error) {
    }
  };

  const handleAddToCustom = (chord) => {
    setCustomProgression([...customProgression, chord]);
    showInfo(`Acorde ${chord} adicionado`);
  };

  const handlePlayCustom = async () => {
    if (customProgression.length === 0) {
      showInfo('Adicione acordes primeiro');
      return;
    }
    try {
      await playProgression(customProgression, null, 2.0);
      showSuccess('Tocando sua progressão');
    } catch (error) {
    }
  };

  const handleSaveProgression = () => {
    if (customProgression.length === 0) {
      showInfo('Adicione acordes primeiro');
      return;
    }
    
    const newProgression = {
      id: Date.now(),
      name: `Minha Progressão ${savedProgressions.length + 1}`,
      chords: [...customProgression],
      date: new Date().toLocaleDateString()
    };
    
    const updated = [...savedProgressions, newProgression];
    setSavedProgressions(updated);
    localStorage.setItem('savedProgressions', JSON.stringify(updated));
    showSuccess('Progressão salva!');
  };

  const handleClearCustom = () => {
    setCustomProgression([]);
    showInfo('Progressão limpa');
  };

  const commonChords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim', 'Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7', 'Am7'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Music2 className="w-8 h-8 text-blue-400" />
            <div>
              <CardTitle className="text-3xl">Composição</CardTitle>
              <p className="text-muted-foreground mt-1">
                Crie e experimente com progressões de acordes
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="biblioteca" className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-2">
          <TabsTrigger role="tab" value="biblioteca">Biblioteca de Progressões</TabsTrigger>
          <TabsTrigger role="tab" value="criador">Criador de Progressões</TabsTrigger>
        </TabsList>

        {/* Biblioteca de Progressões */}
        <TabsContent value="biblioteca" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Gênero</label>
                  <div className="flex flex-wrap gap-2">
                    {progressionGenres.map(genre => (
                      <Button
                        key={genre}
                        variant={selectedGenre === genre ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedGenre(genre)}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Dificuldade</label>
                  <div className="flex flex-wrap gap-2">
                    {progressionDifficulties.map(diff => (
                      <Button
                        key={diff}
                        variant={selectedDifficulty === diff ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedDifficulty(diff)}
                      >
                        {diff}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progressions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProgressions.map(progression => (
              <Card key={progression.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{progression.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                          {progression.genre}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          progression.difficulty === 'Iniciante' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                          progression.difficulty === 'Intermediário' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {progression.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{progression.description}</p>

                  {/* Chords */}
                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Graus:</div>
                    <div className="flex flex-wrap gap-2">
                      {progression.chords.map((chord, index) => (
                        <span key={index} className="bg-secondary px-3 py-1 rounded font-mono text-sm">
                          {chord}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Example */}
                  <div className="mb-3">
                    <div className="text-sm font-medium mb-1">Exemplo em C:</div>
                    <div className="bg-primary/5 px-3 py-2 rounded font-mono text-sm">
                      {progression.example}
                    </div>
                  </div>

                  {/* Feeling */}
                  <div className="mb-3 text-sm">
                    <span className="font-medium">Sensação:</span> {progression.feeling}
                  </div>

                  {/* Songs */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Músicas que usam:</div>
                    <div className="text-xs text-muted-foreground">
                      {progression.songs.join(' • ')}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1"
                      onClick={() => handlePlayProgression(progression)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Ouvir
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const chords = progression.example.split(' - ');
                        setCustomProgression(chords);
                        showSuccess('Progressão copiada para o criador');
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Criador de Progressões */}
        <TabsContent value="criador" className="space-y-4">
          {/* Chord Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paleta de Acordes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {commonChords.map(chord => (
                  <Button
                    key={chord}
                    variant="outline"
                    onClick={() => handleAddToCustom(chord)}
                  >
                    {chord}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Progression */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Sua Progressão</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleClearCustom}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Limpar
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSaveProgression}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {customProgression.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Clique nos acordes acima para criar sua progressão</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {customProgression.map((chord, index) => (
                      <div key={index} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-mono text-lg flex items-center space-x-2">
                        <span>{chord}</span>
                        <button
                          onClick={() => {
                            const updated = customProgression.filter((_, i) => i !== index);
                            setCustomProgression(updated);
                          }}
                          className="hover:bg-primary-foreground/20 rounded p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" size="lg" onClick={handlePlayCustom}>
                    <Play className="w-5 h-5 mr-2" />
                    Tocar Progressão
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Progressions */}
          {savedProgressions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progressões Salvas ({savedProgressions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedProgressions.map(prog => (
                    <div key={prog.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div>
                        <div className="font-medium">{prog.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {prog.chords.join(' - ')} • {prog.date}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            await playProgression(prog.chords, null, 2.0);
                            showSuccess('Tocando progressão salva');
                          }}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = savedProgressions.filter(p => p.id !== prog.id);
                            setSavedProgressions(updated);
                            localStorage.setItem('savedProgressions', JSON.stringify(updated));
                            showInfo('Progressão removida');
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

