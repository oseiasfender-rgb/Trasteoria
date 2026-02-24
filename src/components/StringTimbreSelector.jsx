/**
 * StringTimbreSelector - Seletor de timbres de cordas (violino, viola, cello, etc.)
 * 
 * Permite selecionar entre 7 timbres diferentes de instrumentos de corda
 * e 6 técnicas de arco diferentes
 */

import React, { useState, useEffect } from 'react';
import { Music, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { stringSampleEngine } from '@/utils/stringSampleEngine.js';

export const StringTimbreSelector = ({ onTimbreChange, onTechniqueChange, defaultTimbre = 'violin', defaultTechnique = 'arco' }) => {
  const [selectedTimbre, setSelectedTimbre] = useState(defaultTimbre);
  const [selectedTechnique, setSelectedTechnique] = useState(defaultTechnique);
  const [viewMode, setViewMode] = useState('grid');
  const [filterGenre, setFilterGenre] = useState(null);
  const [timbres, setTimbres] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [genres, setGenres] = useState([]);

  // Carregar dados ao montar
  useEffect(() => {
    const allTimbres = stringSampleEngine.getTimbres();
    const allTechniques = stringSampleEngine.getTechniques();
    setTimbres(allTimbres);
    setTechniques(allTechniques);
    setGenres(stringSampleEngine.getGenres());
  }, []);

  // Filtrar timbres
  const filteredTimbres = timbres.filter(timbre => {
    const matchGenre = !filterGenre || timbre.genres.includes(filterGenre);
    return matchGenre;
  });

  // Selecionar timbre
  const handleSelectTimbre = (timbreId) => {
    setSelectedTimbre(timbreId);
    stringSampleEngine.setTimbre(timbreId);
    onTimbreChange?.(timbreId);
  };

  // Selecionar técnica
  const handleSelectTechnique = (techniqueId) => {
    setSelectedTechnique(techniqueId);
    stringSampleEngine.setTechnique(techniqueId);
    onTechniqueChange?.(techniqueId);
  };

  // Obter ícone por instrumento
  const getInstrumentIcon = (timbreId) => {
    const icons = {
      violin: '🎻',
      viola: '🎻',
      cello: '🎻',
      double_bass: '🎸',
      solo_violin: '🎻',
      ensemble_violin: '🎻',
      orchestral_strings: '🎼'
    };
    return icons[timbreId] || '🎵';
  };

  // Obter cor por instrumento
  const getTimbreColor = (timbreId) => {
    const colors = {
      violin: 'bg-amber-100 text-amber-800',
      viola: 'bg-orange-100 text-orange-800',
      cello: 'bg-red-100 text-red-800',
      double_bass: 'bg-purple-100 text-purple-800',
      solo_violin: 'bg-yellow-100 text-yellow-800',
      ensemble_violin: 'bg-pink-100 text-pink-800',
      orchestral_strings: 'bg-indigo-100 text-indigo-800'
    };
    return colors[timbreId] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Seletor de Timbres de Cordas
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs para Timbres e Técnicas */}
      <Tabs defaultValue="timbres" className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-2">
          <TabsTrigger role="tab" value="timbres">Timbres de Cordas</TabsTrigger>
          <TabsTrigger role="tab" value="tecnicas">Técnicas de Arco</TabsTrigger>
        </TabsList>

        {/* Aba Timbres */}
        <TabsContent value="timbres" className="space-y-4">
          {/* Filtro por Gênero */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setFilterGenre(null)}
                  variant={filterGenre === null ? 'default' : 'outline'}
                  size="sm"
                >
                  Todos os Gêneros
                </Button>
                {genres.map(genre => (
                  <Button
                    key={genre}
                    onClick={() => setFilterGenre(genre)}
                    variant={filterGenre === genre ? 'default' : 'outline'}
                    size="sm"
                    className="capitalize"
                  >
                    {genre}
                  </Button>
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-3">
                Mostrando {filteredTimbres.length} de {timbres.length} timbres
              </div>
            </CardContent>
          </Card>

          {/* Timbres - Grid */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTimbres.map(timbre => (
                <Card
                  key={timbre.id}
                  className={`cursor-pointer transition-all ${
                    selectedTimbre === timbre.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleSelectTimbre(timbre.id)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {/* Ícone e Nome */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-3xl mb-2">{getInstrumentIcon(timbre.id)}</div>
                          <h3 className="font-semibold">{timbre.name}</h3>
                          <p className="text-xs text-muted-foreground">{timbre.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getTimbreColor(timbre.id)}`}>
                          {timbre.range.low} - {timbre.range.high}
                        </span>
                      </div>

                      {/* Características */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brilho:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${timbre.characteristics.brightness * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Calor:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${timbre.characteristics.warmth * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vibrato:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${timbre.characteristics.vibrato * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sustain:</span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${timbre.characteristics.sustain * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Gêneros */}
                      <div className="flex flex-wrap gap-1">
                        {timbre.genres.slice(0, 3).map(genre => (
                          <span key={genre} className="text-xs bg-secondary px-2 py-1 rounded capitalize">
                            {genre}
                          </span>
                        ))}
                        {timbre.genres.length > 3 && (
                          <span className="text-xs bg-secondary px-2 py-1 rounded">
                            +{timbre.genres.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Botão de Seleção */}
                      <Button
                        onClick={() => handleSelectTimbre(timbre.id)}
                        variant={selectedTimbre === timbre.id ? 'default' : 'outline'}
                        className="w-full"
                      >
                        {selectedTimbre === timbre.id ? '✓ Selecionado' : 'Selecionar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Timbres - Lista */}
          {viewMode === 'list' && (
            <div className="space-y-2">
              {filteredTimbres.map(timbre => (
                <Card
                  key={timbre.id}
                  className={`cursor-pointer transition-all ${
                    selectedTimbre === timbre.id
                      ? 'ring-2 ring-primary shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleSelectTimbre(timbre.id)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-2xl">{getInstrumentIcon(timbre.id)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{timbre.name}</h3>
                          <p className="text-sm text-muted-foreground">{timbre.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">
                          {timbre.range.low} - {timbre.range.high}
                        </span>
                        <Button
                          onClick={() => handleSelectTimbre(timbre.id)}
                          variant={selectedTimbre === timbre.id ? 'default' : 'outline'}
                          size="sm"
                        >
                          {selectedTimbre === timbre.id ? '✓' : 'Selecionar'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Aba Técnicas */}
        <TabsContent value="tecnicas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Técnicas de Arco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {techniques.map(technique => (
                  <Card
                    key={technique.id}
                    className={`cursor-pointer transition-all ${
                      selectedTechnique === technique.id
                        ? 'ring-2 ring-primary shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleSelectTechnique(technique.id)}
                  >
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{technique.name}</h3>
                        <p className="text-sm text-muted-foreground">{technique.description}</p>
                        
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Attack:</span>
                            <span className="font-mono">{(technique.attack * 1000).toFixed(0)}ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sustain:</span>
                            <span className="font-mono">{(technique.sustain * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Release:</span>
                            <span className="font-mono">{(technique.release * 1000).toFixed(0)}ms</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleSelectTechnique(technique.id)}
                          variant={selectedTechnique === technique.id ? 'default' : 'outline'}
                          className="w-full mt-2"
                          size="sm"
                        >
                          {selectedTechnique === technique.id ? '✓ Selecionado' : 'Selecionar'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Informações do Timbre Selecionado */}
      {selectedTimbre && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informações do Timbre Selecionado</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const timbre = timbres.find(t => t.id === selectedTimbre);
              if (!timbre) return null;

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nome</p>
                      <p className="font-semibold">{timbre.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Range</p>
                      <p className="font-semibold">{timbre.range.low} - {timbre.range.high}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Programa MIDI</p>
                      <p className="font-semibold">{timbre.midiProgram}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gêneros</p>
                      <p className="font-semibold">{timbre.genres.length}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Descrição</p>
                    <p className="text-sm">{timbre.description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Gêneros Recomendados</p>
                    <div className="flex flex-wrap gap-2">
                      {timbre.genres.map(genre => (
                        <span key={genre} className="text-sm bg-secondary px-3 py-1 rounded capitalize">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StringTimbreSelector;
