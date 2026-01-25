import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useToast } from '../hooks/useToast.js';
import { songRepertoire, repertoireGenres, repertoireDifficulties, filterSongs } from '../data/songRepertoire.js';
import { Music, Play, Heart, Search, Book, Clock, TrendingUp } from 'lucide-react';

export function RepertorioSection() {
  const { playChord, playProgression } = useAppContext();
  const { showSuccess, showInfo } = useToast();
  
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSong, setSelectedSong] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  // Carregar favoritos
  React.useEffect(() => {
    const saved = localStorage.getItem('favoriteSongs');
    if (saved) {
      setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  const filteredSongs = filterSongs(songRepertoire, selectedGenre, selectedDifficulty, searchTerm);

  const toggleFavorite = (songId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(songId)) {
      newFavorites.delete(songId);
      showInfo('Removido dos favoritos');
    } else {
      newFavorites.add(songId);
      showSuccess('Adicionado aos favoritos');
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSongs', JSON.stringify(Array.from(newFavorites)));
  };

  const handlePlayProgression = async (song) => {
    try {
      await playProgression(song.chords, null, 2.0);
      showSuccess(`Tocando: ${song.title}`);
    } catch (error) {
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Music className="w-8 h-8 text-pink-400" />
              <div>
                <CardTitle className="text-3xl">Repertório</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Biblioteca de músicas para praticar
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-pink-400">{songRepertoire.length}</div>
              <div className="text-sm text-muted-foreground">músicas</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {selectedSong ? (
        /* Song Detail View */
        <div className="space-y-4">
          <Button variant="outline" onClick={() => setSelectedSong(null)}>
            ← Voltar para lista
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{selectedSong.title}</CardTitle>
                  <p className="text-xl text-muted-foreground">{selectedSong.artist}</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
                      {selectedSong.genre}
                    </span>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      selectedSong.difficulty === 'Iniciante' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      selectedSong.difficulty === 'Intermediário' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {selectedSong.difficulty}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Tom: {selectedSong.key} • {selectedSong.tempo} BPM
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => toggleFavorite(selectedSong.id)}
                >
                  <Heart className={`w-6 h-6 ${favorites.has(selectedSong.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chords */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Acordes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSong.chords.map((chord, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="font-mono text-lg h-12 px-4"
                      onClick={async () => {
                        await playChord(chord);
                        showInfo(`Tocando ${chord}`);
                      }}
                    >
                      {chord}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Progression */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Progressão</h3>
                <div className="bg-secondary p-4 rounded-lg font-mono">
                  {selectedSong.progression}
                </div>
                <Button
                  className="mt-3 w-full"
                  onClick={() => handlePlayProgression(selectedSong)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Ouvir Progressão
                </Button>
              </div>

              {/* Strumming Pattern */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Padrão de Batida</h3>
                <div className="bg-primary/5 p-4 rounded-lg font-mono text-center text-xl">
                  {selectedSong.strummingPattern}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  D = Para baixo, U = Para cima
                </p>
              </div>

              {/* Lyrics */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Letra (trecho)</h3>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {selectedSong.lyrics}
                  </pre>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="font-semibold text-lg mb-3">💡 Dicas</h3>
                <ul className="space-y-2">
                  {selectedSong.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Song List View */
        <>
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por música ou artista..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Gênero</label>
                  <div className="flex flex-wrap gap-2">
                    {repertoireGenres.map(genre => (
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
                    {repertoireDifficulties.map(diff => (
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

          {/* Songs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSongs.map(song => (
              <Card
                key={song.id}
                className="hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedSong(song)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg line-clamp-1">{song.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{song.artist}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(song.id);
                      }}
                    >
                      <Heart className={`w-5 h-5 ${favorites.has(song.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {song.genre}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      song.difficulty === 'Iniciante' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      song.difficulty === 'Intermediário' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {song.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Music className="w-4 h-4" />
                      <span>{song.key}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{song.tempo} BPM</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mb-3">
                    {song.chords.length} acordes
                  </div>

                  <Button className="w-full" variant="outline" size="sm">
                    <Book className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredSongs.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Music className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma música encontrada</h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou buscar por outro termo
                </p>
              </CardContent>
            </Card>
          )}

          {/* Favorites Summary */}
          {favorites.size > 0 && (
            <Card className="bg-pink-500/10 border-pink-500/20">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                    <div>
                      <div className="font-semibold">Favoritos</div>
                      <div className="text-sm text-muted-foreground">
                        Você tem {favorites.size} música{favorites.size > 1 ? 's' : ''} favorita{favorites.size > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}

