/**
 * KeyboardTimbreSelector - Seletor de timbres de teclado
 * 
 * Permite selecionar entre 12 timbres diferentes de teclados e sintetizadores
 */

import React, { useState, useEffect } from 'react';
import { Music, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { keyboardSampleEngine } from '@/utils/keyboardSampleEngine.js';

export const KeyboardTimbreSelector = ({ onTimbreChange, defaultTimbre = 'acoustic_piano' }) => {
  const [selectedTimbre, setSelectedTimbre] = useState(defaultTimbre);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterGenre, setFilterGenre] = useState(null);
  const [timbres, setTimbres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);

  // Carregar dados ao montar
  useEffect(() => {
    const allTimbres = keyboardSampleEngine.getTimbres();
    setTimbres(allTimbres);
    setCategories(keyboardSampleEngine.getCategories());
    setGenres(keyboardSampleEngine.getGenres());
  }, []);

  // Filtrar timbres
  const filteredTimbres = timbres.filter(timbre => {
    const matchCategory = !filterCategory || timbre.category === filterCategory;
    const matchGenre = !filterGenre || timbre.genres.includes(filterGenre);
    return matchCategory && matchGenre;
  });

  // Selecionar timbre
  const handleSelectTimbre = (timbreId) => {
    setSelectedTimbre(timbreId);
    keyboardSampleEngine.setTimbre(timbreId);
    onTimbreChange?.(timbreId);
  };

  // Obter cor por categoria
  const getCategoryColor = (category) => {
    const colors = {
      piano: 'bg-blue-100 text-blue-800',
      organ: 'bg-purple-100 text-purple-800',
      synth: 'bg-pink-100 text-pink-800',
      percussion: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Obter ícone por categoria
  const getCategoryIcon = (category) => {
    const icons = {
      piano: '🎹',
      organ: '🎵',
      synth: '⚡',
      percussion: '🥁'
    };
    return icons[category] || '🎼';
  };

  return (
    <div className="w-full space-y-6">
      {/* Cabeçalho */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Music className="w-5 h-5" />
              Seletor de Timbres de Teclado
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

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtro por Categoria */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Categoria</label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterCategory(null)}
                variant={filterCategory === null ? 'default' : 'outline'}
                size="sm"
              >
                Todas
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtro por Gênero */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Gênero Musical</label>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterGenre(null)}
                variant={filterGenre === null ? 'default' : 'outline'}
                size="sm"
              >
                Todos
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
          </div>

          {/* Contador */}
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredTimbres.length} de {timbres.length} timbres
          </div>
        </CardContent>
      </Card>

      {/* Timbres - Visualização em Grid */}
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
                      <div className="text-3xl mb-2">{getCategoryIcon(timbre.category)}</div>
                      <h3 className="font-semibold">{timbre.name}</h3>
                      <p className="text-xs text-muted-foreground">{timbre.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(timbre.category)}`}>
                      {timbre.category}
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
                      <span className="text-muted-foreground">Ressonância:</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${timbre.characteristics.resonance * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dinâmica:</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${timbre.characteristics.dynamics * 100}%` }}
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

      {/* Timbres - Visualização em Lista */}
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
                    <div className="text-2xl">{getCategoryIcon(timbre.category)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{timbre.name}</h3>
                      <p className="text-sm text-muted-foreground">{timbre.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2">
                      {timbre.genres.slice(0, 2).map(genre => (
                        <span key={genre} className="text-xs bg-secondary px-2 py-1 rounded capitalize">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${getCategoryColor(timbre.category)}`}>
                      {timbre.category}
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
                      <p className="text-sm text-muted-foreground">Categoria</p>
                      <p className="font-semibold capitalize">{timbre.category}</p>
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

export default KeyboardTimbreSelector;
