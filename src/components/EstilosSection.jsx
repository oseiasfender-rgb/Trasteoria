import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Music4, Guitar, Disc, Heart, Volume2, Play, BookOpen, Pause, RotateCcw } from 'lucide-react';
import { drumEngine } from '../utils/drumEngine.js';
import { BackingTrackEngine } from '../utils/backingTrackEngine';
import { useToast } from '../hooks/useToast';

export function EstilosSection() {
  const { showSuccess, showInfo, showAudioSuccess } = useToast();
  const [activeTab, setActiveTab] = useState('jazz');
  const [selectedArtist, setSelectedArtist] = useState('');
  
  // Estados para controle da bateria
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPattern, setCurrentPattern] = useState('');
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(0.7);
  
  // Estados para backing tracks
  const [isPlayingTrack, setIsPlayingTrack] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('');
  const backingTrackEngineRef = useRef(null);
  const audioContextRef = useRef(null);

  // Initialize audio context and backing track engine
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    backingTrackEngineRef.current = new BackingTrackEngine(audioContextRef.current);

    return () => {
      if (backingTrackEngineRef.current) {
        backingTrackEngineRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Função para tocar/parar bateria
  const toggleDrums = async (patternName) => {
    if (isPlaying && currentPattern === patternName) {
      drumEngine.stop();
      setIsPlaying(false);
      setCurrentPattern('');
    } else {
      if (isPlaying) {
        drumEngine.stop();
      }
      await drumEngine.playPattern(patternName);
      setIsPlaying(true);
      setCurrentPattern(patternName);
    }
  };
  
  // Função para parar todos os drums
  const stopAllDrums = () => {
    drumEngine.stop();
    setIsPlaying(false);
    setCurrentPattern('');
  };
  
  // Função para alterar BPM
  const handleBpmChange = (newBpm) => {
    setBpm(newBpm[0]);
    drumEngine.setBPM(newBpm[0]);
  };
  
  // Função para alterar volume
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    drumEngine.setVolume(newVolume[0]);
  };

  // Progressões de exemplo por estilo
  const styleProgressions = {
    jazz_iivi: { chords: ['Dm7', 'G7', 'Cmaj7', 'Cmaj7'], bpm: 120, nome: 'Jazz II-V-I' },
    jazz_minor: { chords: ['Cm7', 'F7', 'Bbmaj7', 'Bbmaj7'], bpm: 120, nome: 'Jazz II-V-I Menor' },
    blues: { chords: ['A7', 'D7', 'A7', 'E7'], bpm: 90, nome: 'Blues em A' },
    rock: { chords: ['E', 'A', 'D', 'A'], bpm: 140, nome: 'Rock Progressivo' },
    bossa: { chords: ['Cmaj7', 'Dm7', 'G7', 'Cmaj7'], bpm: 130, nome: 'Bossa Nova' },
    funk: { chords: ['Em7', 'Em7', 'A7', 'A7'], bpm: 110, nome: 'Funk Groove' }
  };

  // Handler para tocar progressão de estilo
  const handlePlayProgression = (progressionKey) => {
    if (!backingTrackEngineRef.current) return;

    if (isPlayingTrack && currentTrack === progressionKey) {
      backingTrackEngineRef.current.stop();
      setIsPlayingTrack(false);
      setCurrentTrack('');
      showInfo('Progressão parada');
    } else {
      if (isPlayingTrack) {
        backingTrackEngineRef.current.stop();
      }
      const progression = styleProgressions[progressionKey];
      backingTrackEngineRef.current.playProgression(
        progression.chords,
        progression.bpm,
        'rock'
      );
      setIsPlayingTrack(true);
      setCurrentTrack(progressionKey);
      showAudioSuccess(`Tocando: ${progression.nome}`);
    }
  };

  // Handler para tocar exemplo de estilo
  const handlePlayStyleExample = (styleName, chords, bpm) => {
    if (!backingTrackEngineRef.current) return;

    if (isPlayingTrack) {
      backingTrackEngineRef.current.stop();
      setIsPlayingTrack(false);
      setCurrentTrack('');
    }

    backingTrackEngineRef.current.playProgression(chords, bpm, 'rock');
    setIsPlayingTrack(true);
    setCurrentTrack(styleName);
    showAudioSuccess(`Tocando exemplo: ${styleName}`);
  };

  // Estilos de Jazz
  const jazzStyles = [
    {
      nome: 'Bebop',
      periodo: '1940s',
      caracteristicas: 'Tempos rápidos, harmonias complexas, improvisação virtuosística',
      acordes: 'Acordes com extensões (9ª, 11ª, 13ª)',
      escalas: 'Bebop maior, bebop dominante, cromáticas',
      artistas: ['Charlie Parker', 'Dizzy Gillespie', 'Bud Powell'],
      exemplos: ['Ornithology', 'Salt Peanuts', 'Cherokee']
    },
    {
      nome: 'Cool Jazz',
      periodo: '1950s',
      caracteristicas: 'Tempos moderados, sonoridade suave, arranjos elaborados',
      acordes: 'Acordes com 6ª, 9ª, voicings espaçados',
      escalas: 'Modos gregos, menor melódica',
      artistas: ['Miles Davis', 'Bill Evans', 'Chet Baker'],
      exemplos: ['Kind of Blue', 'Waltz for Debby', 'My Funny Valentine']
    },
    {
      nome: 'Hard Bop',
      periodo: '1950s-60s',
      caracteristicas: 'Influência do blues e gospel, ritmo marcante',
      acordes: 'Progressões ii-V-I, acordes de 7ª',
      escalas: 'Blues, pentatônicas, modos gregos',
      artistas: ['Art Blakey', 'Horace Silver', 'Clifford Brown'],
      exemplos: ['Moanin', 'Song for My Father', 'Joy Spring']
    },
    {
      nome: 'Modal Jazz',
      periodo: '1960s',
      caracteristicas: 'Baseado em modos, menos mudanças harmônicas',
      acordes: 'Acordes sustentados, quartas',
      escalas: 'Modos gregos, escalas exóticas',
      artistas: ['Miles Davis', 'John Coltrane', 'Bill Evans'],
      exemplos: ['So What', 'Impressions', 'Maiden Voyage']
    },
    {
      nome: 'Fusion',
      periodo: '1970s',
      caracteristicas: 'Fusão com rock, instrumentos elétricos, ritmos complexos',
      acordes: 'Acordes suspensos, quartas, clusters',
      escalas: 'Menor melódica, simétricas, pentatônicas',
      artistas: ['Weather Report', 'Mahavishnu Orchestra', 'Return to Forever'],
      exemplos: ['Birdland', 'Meeting of the Spirits', 'Spain']
    }
  ];

  // Estilos de Blues
  const bluesStyles = [
    {
      nome: 'Delta Blues',
      origem: 'Mississippi Delta',
      caracteristicas: 'Guitarra slide, fingerpicking, letras narrativas',
      estrutura: '12 compassos, AAB',
      escalas: 'Pentatônica menor, blues',
      artistas: ['Robert Johnson', 'Son House', 'Skip James'],
      tecnicas: ['Slide guitar', 'Fingerpicking', 'Bottleneck']
    },
    {
      nome: 'Chicago Blues',
      origem: 'Chicago',
      caracteristicas: 'Guitarra elétrica, harmônica, banda completa',
      estrutura: '12 compassos, forma elétrica',
      escalas: 'Blues, pentatônica menor',
      artistas: ['Muddy Waters', 'Howlin Wolf', 'Little Walter'],
      tecnicas: ['Bending', 'Vibrato', 'Amplificação']
    },
    {
      nome: 'Texas Blues',
      origem: 'Texas',
      caracteristicas: 'Guitarra lead, solos longos, swing shuffle',
      estrutura: '12 compassos, extensões',
      escalas: 'Pentatônica menor, mixolídio',
      artistas: ['T-Bone Walker', 'Stevie Ray Vaughan', 'Albert Collins'],
      tecnicas: ['String bending', 'Vibrato', 'Hybrid picking']
    },
    {
      nome: 'British Blues',
      origem: 'Reino Unido',
      caracteristicas: 'Influência do rock, distorção, power trios',
      estrutura: '12 compassos, rock blues',
      escalas: 'Pentatônica menor, blues rock',
      artistas: ['Eric Clapton', 'Jeff Beck', 'Jimmy Page'],
      tecnicas: ['Distorção', 'Feedback', 'Power chords']
    }
  ];

  // Estilos de Rock
  const rockStyles = [
    {
      nome: 'Classic Rock',
      periodo: '1960s-70s',
      caracteristicas: 'Riffs marcantes, solos de guitarra, estruturas simples',
      acordes: 'Power chords, tríades, acordes abertos',
      escalas: 'Pentatônica menor, blues, maior',
      artistas: ['Led Zeppelin', 'Deep Purple', 'Black Sabbath'],
      tecnicas: ['Power chords', 'Palm muting', 'Bending']
    },
    {
      nome: 'Progressive Rock',
      periodo: '1970s',
      caracteristicas: 'Composições longas, mudanças de compasso, virtuosismo',
      acordes: 'Acordes complexos, extensões, modulações',
      escalas: 'Modos gregos, escalas exóticas, cromáticas',
      artistas: ['Yes', 'Genesis', 'King Crimson'],
      tecnicas: ['Tapping', 'Sweep picking', 'Odd time signatures']
    },
    {
      nome: 'Heavy Metal',
      periodo: '1980s',
      caracteristicas: 'Distorção pesada, velocidade, técnica avançada',
      acordes: 'Power chords, diminutos, cromáticos',
      escalas: 'Pentatônica menor, menor harmônica, frígio',
      artistas: ['Iron Maiden', 'Judas Priest', 'Metallica'],
      tecnicas: ['Alternate picking', 'Tremolo picking', 'Harmonics']
    },
    {
      nome: 'Grunge',
      periodo: '1990s',
      caracteristicas: 'Som sujo, acordes dissonantes, dinâmicas extremas',
      acordes: 'Power chords, acordes suspensos, dissonâncias',
      escalas: 'Pentatônica menor, dórico, eólio',
      artistas: ['Nirvana', 'Pearl Jam', 'Soundgarden'],
      tecnicas: ['Drop tuning', 'Feedback', 'Dynamics']
    }
  ];

  // Música Brasileira
  const brasilianStyles = [
    {
      nome: 'Bossa Nova',
      origem: 'Rio de Janeiro, 1950s',
      caracteristicas: 'Ritmo suave, harmonias sofisticadas, violão fingerstyle',
      acordes: 'Acordes com 6ª, 9ª, 11ª, inversões',
      escalas: 'Jônico, dórico, menor melódica',
      artistas: ['João Gilberto', 'Tom Jobim', 'Baden Powell'],
      ritmos: ['Bossa nova', 'Samba canção']
    },
    {
      nome: 'Samba',
      origem: 'Rio de Janeiro, início 1900s',
      caracteristicas: 'Ritmo sincopado, percussão marcante, melodias alegres',
      acordes: 'Tríades, acordes de 7ª, progressões simples',
      escalas: 'Maior, menor natural, pentatônicas',
      artistas: ['Pixinguinha', 'Cartola', 'Noel Rosa'],
      ritmos: ['Samba', 'Partido alto', 'Pagode']
    },
    {
      nome: 'Choro',
      origem: 'Rio de Janeiro, 1870s',
      caracteristicas: 'Virtuosismo, improvisação, forma rondó',
      acordes: 'Acordes de 7ª, diminutos, modulações',
      escalas: 'Maior, menor harmônica, cromáticas',
      artistas: ['Pixinguinha', 'Jacob do Bandolim', 'Hermeto Pascoal'],
      ritmos: ['Choro', 'Maxixe']
    },
    {
      nome: 'MPB',
      origem: 'Brasil, 1960s',
      caracteristicas: 'Fusão de estilos, letras poéticas, experimentação',
      acordes: 'Harmonias complexas, acordes alterados',
      escalas: 'Modos gregos, escalas exóticas, jazz',
      artistas: ['Caetano Veloso', 'Gilberto Gil', 'Milton Nascimento'],
      ritmos: ['Baião', 'Maracatu', 'Ijexá']
    },
    {
      nome: 'Forró',
      origem: 'Nordeste, tradicional',
      caracteristicas: 'Sanfona, zabumba, triângulo, dança',
      acordes: 'Tríades, acordes simples, tonalidades maiores',
      escalas: 'Maior, mixolídio, pentatônica',
      artistas: ['Luiz Gonzaga', 'Dominguinhos', 'Sivuca'],
      ritmos: ['Baião', 'Xote', 'Arrasta-pé']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <Music4 className="w-6 h-6" />
            <span>Estilos Musicais</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Jazz, Blues, Rock e Música Brasileira - características e aplicações
          </p>
        </CardHeader>
      </Card>

      {/* Módulo de Bateria para Backing Tracks */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-center space-x-2">
            <Music4 className="w-5 h-5" />
            <span>Backing Tracks - Bateria</span>
          </CardTitle>
          <p className="text-muted-foreground text-center">
            Ritmos de bateria para praticar com os diferentes estilos musicais
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {drumEngine.getAvailablePatterns().map((pattern) => (
              <Card key={pattern.id} className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm">{pattern.name}</h4>
                    <Badge variant="secondary">{pattern.beats}/4</Badge>
                  </div>
                  <Button 
                    variant={currentPattern === pattern.id ? "default" : "outline"}
                    size="sm" 
                    className="w-full"
                    onClick={() => toggleDrums(pattern.id)}
                  >
                    {isPlaying && currentPattern === pattern.id ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Parar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Tocar
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Controles de BPM e Volume */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">BPM: {bpm}</label>
              <Slider
                value={[bpm]}
                onValueChange={handleBpmChange}
                min={60}
                max={200}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Volume2 className="w-4 h-4 mr-1" />
                Volume: {Math.round(volume * 100)}%
              </label>
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={stopAllDrums}
                className="w-full"
                disabled={!isPlaying}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Parar Tudo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-4">
          <TabsTrigger role="tab" value="jazz">Jazz</TabsTrigger>
          <TabsTrigger role="tab" value="blues">Blues</TabsTrigger>
          <TabsTrigger role="tab" value="rock">Rock</TabsTrigger>
          <TabsTrigger role="tab" value="brasileiro">Música Brasileira</TabsTrigger>
        </TabsList>

        {/* Jazz */}
        <TabsContent value="jazz" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Disc className="w-5 h-5" />
                <span>Estilos de Jazz</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Evolução histórica e características de cada estilo
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {jazzStyles.map((style, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{style.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{style.caracteristicas}</p>
                        </div>
                        <Badge variant="outline">{style.periodo}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Acordes Típicos:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.acordes}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Escalas Usadas:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.escalas}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Artistas Principais:</h5>
                          <div className="space-y-1">
                            {style.artistas.map((artist, i) => (
                              <Badge key={i} variant="secondary" className="text-xs mr-1">
                                {artist}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Exemplos Clássicos:</h5>
                          <div className="space-y-1">
                            {style.exemplos.map((exemplo, i) => (
                              <div key={i} className="text-xs bg-background/50 p-1 rounded">
                                {exemplo}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => alert('Exemplos Sonoros\n\nEm breve: áudios de referência!')}
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Exemplos Sonoros
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => alert('Licks Típicos\n\nEm breve: biblioteca de licks!')}
                        >
                          <Guitar className="w-4 h-4 mr-2" />
                          Licks Típicos
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => alert('Estudar Estilo\n\nEm breve: guia completo do estilo!')}
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Estudar Estilo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progressões de Jazz */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Progressões Essenciais do Jazz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">ii-V-I Maior</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Progressão:</strong> Dm7 - G7 - Cmaj7</div>
                      <div><strong>Escalas:</strong> Dórico - Mixolídio - Jônico</div>
                      <div><strong>Uso:</strong> Base do jazz tradicional</div>
                      <Button 
                        variant={currentTrack === 'jazz_iivi' ? 'default' : 'outline'} 
                        size="sm" 
                        className="w-full"
                        onClick={() => handlePlayProgression('jazz_iivi')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {currentTrack === 'jazz_iivi' ? 'Parar' : 'Tocar Exemplo'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">ii-V-i Menor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Progressão:</strong> Dm7b5 - G7alt - Cm7</div>
                      <div><strong>Escalas:</strong> Lócrio - Alterado - Dórico</div>
                      <div><strong>Uso:</strong> Seções menores, modulações</div>
                      <Button 
                        variant={currentTrack === 'jazz_minor' ? 'default' : 'outline'} 
                        size="sm" 
                        className="w-full"
                        onClick={() => handlePlayProgression('jazz_minor')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {currentTrack === 'jazz_minor' ? 'Parar' : 'Tocar Exemplo'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blues */}
        <TabsContent value="blues" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Guitar className="w-5 h-5" />
                <span>Estilos de Blues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {bluesStyles.map((style, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{style.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{style.caracteristicas}</p>
                        </div>
                        <Badge variant="outline">{style.origem}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Estrutura:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.estrutura}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Escalas:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.escalas}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Artistas:</h5>
                          <div className="space-y-1">
                            {style.artistas.map((artist, i) => (
                              <Badge key={i} variant="secondary" className="text-xs mr-1">
                                {artist}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Técnicas:</h5>
                          <div className="space-y-1">
                            {style.tecnicas.map((tecnica, i) => (
                              <div key={i} className="text-xs bg-background/50 p-1 rounded">
                                {tecnica}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePlayStyleExample(
                            style.nome,
                            ['A7', 'D7', 'A7', 'E7'],
                            120
                          )}
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Ouvir Exemplo
                        </Button>
                        <Button variant="outline" size="sm">
                          <Guitar className="w-4 h-4 mr-2" />
                          Ver Técnicas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Forma Blues */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Forma Blues de 12 Compassos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-2 mb-6">
                {[
                  'I', 'I', 'I', 'I',
                  'IV', 'IV', 'I', 'I',
                  'V', 'IV', 'I', 'V'
                ].map((chord, index) => (
                  <div key={index} className="bg-primary text-primary-foreground p-3 rounded text-center font-bold">
                    <div className="text-xs">C{index + 1}</div>
                    <div>{chord}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Seção A (C1-4)</h4>
                  <p className="text-sm">Estabelece a tônica</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Seção B (C5-8)</h4>
                  <p className="text-sm">Contraste com IV grau</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Seção C (C9-12)</h4>
                  <p className="text-sm">Tensão e resolução</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rock */}
        <TabsContent value="rock" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Guitar className="w-5 h-5" />
                <span>Estilos de Rock</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rockStyles.map((style, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{style.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{style.caracteristicas}</p>
                        </div>
                        <Badge variant="outline">{style.periodo}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Acordes:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.acordes}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Escalas:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.escalas}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Bandas:</h5>
                          <div className="space-y-1">
                            {style.artistas.map((artist, i) => (
                              <Badge key={i} variant="secondary" className="text-xs mr-1">
                                {artist}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Técnicas:</h5>
                          <div className="space-y-1">
                            {style.tecnicas.map((tecnica, i) => (
                              <div key={i} className="text-xs bg-background/50 p-1 rounded">
                                {tecnica}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePlayProgression('bossa')}
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Ouvir Exemplo
                        </Button>
                        <Button variant="outline" size="sm">
                          <Guitar className="w-4 h-4 mr-2" />
                          Ver Técnicas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Música Brasileira */}
        <TabsContent value="brasileiro" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Música Brasileira</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {brasilianStyles.map((style, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{style.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{style.caracteristicas}</p>
                        </div>
                        <Badge variant="outline">{style.origem}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Acordes:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.acordes}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Escalas:</h5>
                          <p className="text-sm bg-background/50 p-2 rounded">{style.escalas}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Artistas:</h5>
                          <div className="space-y-1">
                            {style.artistas.map((artist, i) => (
                              <Badge key={i} variant="secondary" className="text-xs mr-1">
                                {artist}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Ritmos:</h5>
                          <div className="space-y-1">
                            {style.ritmos.map((ritmo, i) => (
                              <div key={i} className="text-xs bg-background/50 p-1 rounded">
                                {ritmo}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Exemplos Rítmicos
                        </Button>
                        <Button variant="outline" size="sm">
                          <Guitar className="w-4 h-4 mr-2" />
                          Levadas Típicas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ritmos Brasileiros */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Padrões Rítmicos Brasileiros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Bossa Nova</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Compasso:</strong> 4/4</div>
                      <div><strong>Acentos:</strong> 1, 2+, 4</div>
                      <div><strong>Característica:</strong> Suingue sutil</div>
                      <Button 
                        variant={currentTrack === 'bossa' ? 'default' : 'outline'} 
                        size="sm" 
                        className="w-full"
                        onClick={() => handlePlayProgression('bossa')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {currentTrack === 'bossa' ? 'Parar' : 'Ouvir Padrão'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Samba</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div><strong>Compasso:</strong> 2/4</div>
                      <div><strong>Acentos:</strong> Síncopes características</div>
                      <div><strong>Característica:</strong> Ginga marcante</div>
                      <Button 
                        variant={currentTrack === 'bossa' ? 'default' : 'outline'} 
                        size="sm" 
                        className="w-full"
                        onClick={() => handlePlayProgression('bossa')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {currentTrack === 'bossa' ? 'Parar' : 'Ouvir Padrão'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

