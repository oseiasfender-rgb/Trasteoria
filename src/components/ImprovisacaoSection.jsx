import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Play, Pause, Volume2, Lightbulb, Zap, TrendingUp, Music, Target } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { BackingTrackEngine } from '../utils/backingTrackEngine';
// import AudioRecorder from './AudioRecorder';

export function ImprovisacaoSection() {
  const { showInfo, showSuccess, showAudioSuccess, showAudioError } = useToast();
  const [activeTab, setActiveTab] = useState('fundamentos');
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedTempo, setSelectedTempo] = useState([120]);
  const [selectedTrack, setSelectedTrack] = useState('blues');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChord, setCurrentChord] = useState(null);
  const backingTrackEngineRef = useRef(null);
  const audioContextRef = useRef(null);

  // Initialize audio context and engine
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

  // Update current chord display
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (backingTrackEngineRef.current) {
        const chordInfo = backingTrackEngineRef.current.getCurrentChord();
        setCurrentChord(chordInfo);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Backing tracks pré-definidos
  const backingTracks = {
    blues: {
      nome: 'Blues em A',
      chords: ['A7', 'A7', 'A7', 'A7', 'D7', 'D7', 'A7', 'A7', 'E7', 'D7', 'A7', 'E7'],
      bpm: 90,
      style: 'shuffle',
      tonalidade: 'A',
      escala: 'Pentatônica Menor + Blues',
      dificuldade: 'Básico'
    },
    jazz: {
      nome: 'Jazz II-V-I',
      chords: ['Dm7', 'G7', 'Cmaj7', 'Cmaj7'],
      bpm: 120,
      style: 'swing',
      tonalidade: 'C',
      escala: 'Dórico / Mixolídio / Jônio',
      dificuldade: 'Intermediário'
    },
    rock: {
      nome: 'Rock Progressivo',
      chords: ['Em', 'C', 'G', 'D'],
      bpm: 140,
      style: 'rock',
      tonalidade: 'E menor',
      escala: 'Pentatônica Menor / Eólio',
      dificuldade: 'Básico'
    },
    funk: {
      nome: 'Funk Groove',
      chords: ['Em7', 'Em7', 'A7', 'A7'],
      bpm: 110,
      style: 'funk',
      tonalidade: 'E menor',
      escala: 'Pentatônica Menor / Dórico',
      dificuldade: 'Intermediário'
    },
    bossa: {
      nome: 'Bossa Nova',
      chords: ['Cmaj7', 'Dm7', 'G7', 'Cmaj7'],
      bpm: 130,
      style: 'bossa',
      tonalidade: 'C',
      escala: 'Jônio / Dórico / Mixolídio',
      dificuldade: 'Avançado'
    }
  };

  // Handlers
  const handlePlayTrack = () => {
    if (!backingTrackEngineRef.current) return;

    if (isPlaying) {
      backingTrackEngineRef.current.stop();
      setIsPlaying(false);
      setCurrentChord(null);
      showInfo('Backing track parado');
    } else {
      const track = backingTracks[selectedTrack];
      backingTrackEngineRef.current.playProgression(
        track.chords,
        selectedTempo[0],
        track.style
      );
      setIsPlaying(true);
      showAudioSuccess(`Tocando: ${track.nome}`);
    }
  };

  const handleTrackChange = (trackName) => {
    if (isPlaying) {
      backingTrackEngineRef.current.stop();
      setIsPlaying(false);
      setCurrentChord(null);
    }
    setSelectedTrack(trackName);
    const track = backingTracks[trackName];
    setSelectedTempo([track.bpm]);
  };

  // Hierarquia de notas
  const hierarquiaNotas = [
    {
      nivel: 1,
      nome: 'Notas do Acorde',
      notas: ['1', '3', '5', '7'],
      importancia: 'Máxima',
      cor: 'bg-green-500',
      uso: 'Sempre soam bem, use para resolver frases'
    },
    {
      nivel: 2,
      nome: 'Extensões',
      notas: ['9', '11', '13'],
      importancia: 'Alta',
      cor: 'bg-blue-500',
      uso: 'Adicionam cor e sofisticação'
    },
    {
      nivel: 3,
      nome: 'Notas da Escala',
      notas: ['2', '4', '6'],
      importancia: 'Média',
      cor: 'bg-yellow-500',
      uso: 'Conectam as notas do acorde'
    },
    {
      nivel: 4,
      nome: 'Notas de Passagem',
      notas: ['b2', '#4', 'b6'],
      importancia: 'Baixa',
      cor: 'bg-orange-500',
      uso: 'Movimento melódico, não repousar'
    },
    {
      nivel: 5,
      nome: 'Notas Evitadas',
      notas: ['b5', 'b9', '#9'],
      importancia: 'Cuidado',
      cor: 'bg-red-500',
      uso: 'Apenas como passagem ou efeito especial'
    }
  ];

  // Técnicas de improvisação
  const tecnicasImprov = [
    {
      nome: 'Notas Alvo',
      descricao: 'Mire em notas específicas do acorde',
      exemplo: 'Toque uma frase que termine na 3ª do acorde',
      dificuldade: 'Básico',
      exercicio: 'Pratique escalas terminando sempre em notas do acorde'
    },
    {
      nome: 'Aproximações Cromáticas',
      descricao: 'Aproxime-se da nota alvo por semitom',
      exemplo: 'Para chegar no Dó, toque Si-Dó ou Réb-Dó',
      dificuldade: 'Intermediário',
      exercicio: 'Pratique aproximar cada nota do acorde'
    },
    {
      nome: 'Desenvolvimento Motívico',
      descricao: 'Desenvolva pequenas ideias musicais',
      exemplo: 'Repita um motivo em diferentes alturas',
      dificuldade: 'Intermediário',
      exercicio: 'Crie um motivo de 3 notas e varie-o'
    },
    {
      nome: 'Sequências',
      descricao: 'Repita padrões em diferentes graus',
      exemplo: 'Toque o mesmo padrão começando em cada nota da escala',
      dificuldade: 'Avançado',
      exercicio: 'Pratique sequências de terças e quartas'
    },
    {
      nome: 'Outside Playing',
      descricao: 'Toque "fora" da harmonia temporariamente',
      exemplo: 'Use escalas que não pertencem ao acorde',
      dificuldade: 'Avançado',
      exercicio: 'Pratique entrar e sair da tonalidade'
    }
  ];

  // Conceitos de fraseado
  const conceitosFraseado = [
    {
      conceito: 'Respiração Musical',
      descricao: 'Deixe espaços entre as frases',
      importancia: 'Fundamental',
      dica: 'Música é feita de sons E silêncios'
    },
    {
      conceito: 'Pergunta e Resposta',
      descricao: 'Crie diálogo musical',
      importancia: 'Fundamental',
      dica: 'Primeira frase = pergunta, segunda = resposta'
    },
    {
      conceito: 'Dinâmica',
      descricao: 'Varie o volume e intensidade',
      importancia: 'Alta',
      dica: 'Crescendos e diminuendos criam emoção'
    },
    {
      conceito: 'Articulação',
      descricao: 'Como você ataca cada nota',
      importancia: 'Alta',
      dica: 'Legato vs staccato mudam o caráter'
    },
    {
      conceito: 'Ritmo',
      descricao: 'Varie as durações das notas',
      importancia: 'Fundamental',
      dica: 'Não toque sempre em colcheias'
    }
  ];

  // Exercícios de improvisação
  const exerciciosImprov = [
    {
      nome: 'Uma Nota Só',
      objetivo: 'Desenvolver ritmo e articulação',
      instrucoes: 'Improvise usando apenas uma nota, focando no ritmo',
      tempo: '5 minutos',
      nivel: 'Iniciante'
    },
    {
      nome: 'Duas Notas',
      objetivo: 'Criar melodias simples',
      instrucoes: 'Use apenas duas notas (ex: Dó e Sol)',
      tempo: '5 minutos',
      nivel: 'Iniciante'
    },
    {
      nome: 'Notas do Acorde',
      objetivo: 'Focar na harmonia',
      instrucoes: 'Use apenas as notas do acorde atual',
      tempo: '10 minutos',
      nivel: 'Básico'
    },
    {
      nome: 'Escala Pentatônica',
      objetivo: 'Desenvolver vocabulário melódico',
      instrucoes: 'Improvise usando apenas a pentatônica',
      tempo: '10 minutos',
      nivel: 'Básico'
    },
    {
      nome: 'Call and Response',
      objetivo: 'Desenvolver fraseado',
      instrucoes: 'Toque uma frase, depois responda com outra',
      tempo: '15 minutos',
      nivel: 'Intermediário'
    },
    {
      nome: 'Motivos',
      objetivo: 'Desenvolvimento temático',
      instrucoes: 'Crie um motivo e desenvolva-o por 2 minutos',
      tempo: '15 minutos',
      nivel: 'Intermediário'
    }
  ];



  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <Play className="w-6 h-6" />
            <span>Improvisação</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Técnicas de solo, desenvolvimento melódico e expressão musical
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fundamentos">Fundamentos</TabsTrigger>
          <TabsTrigger value="backing_tracks">Backing Tracks</TabsTrigger>
          <TabsTrigger value="tecnicas">Técnicas</TabsTrigger>
          <TabsTrigger value="fraseado">Fraseado</TabsTrigger>
          <TabsTrigger value="pratica">Prática</TabsTrigger>
        </TabsList>

        {/* Fundamentos */}
        <TabsContent value="fundamentos" className="space-y-6">
          {/* Hierarquia de Notas */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Hierarquia de Notas</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Entenda a importância de cada nota na improvisação
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hierarquiaNotas.map((nivel, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full ${nivel.cor} flex items-center justify-center text-white font-bold`}>
                          {nivel.nivel}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{nivel.nome}</h4>
                            <Badge variant="outline">{nivel.importancia}</Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <strong>Notas:</strong> {nivel.notas.join(', ')}
                            </div>
                            <div className="md:col-span-2">
                              <strong>Como usar:</strong> {nivel.uso}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conceitos Básicos */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Conceitos Fundamentais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Escala vs Acorde</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <strong>Pensamento por Escala:</strong>
                        <p className="text-sm">Use a escala que funciona sobre a progressão toda</p>
                      </div>
                      <div>
                        <strong>Pensamento por Acorde:</strong>
                        <p className="text-sm">Mude a escala/arpejo para cada acorde</p>
                      </div>
                      <div>
                        <strong>Recomendação:</strong>
                        <p className="text-sm">Comece por escala, evolua para acorde</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Horizontal vs Vertical</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <strong>Pensamento Horizontal:</strong>
                        <p className="text-sm">Melodias lineares, escalas</p>
                      </div>
                      <div>
                        <strong>Pensamento Vertical:</strong>
                        <p className="text-sm">Arpejos, notas do acorde</p>
                      </div>
                      <div>
                        <strong>Combinação:</strong>
                        <p className="text-sm">Use ambos para criar interesse</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backing Tracks */}
        <TabsContent value="backing_tracks" className="space-y-6">
          {/* Player de Backing Track */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Music className="w-5 h-5" />
                <span>Player de Backing Track</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Pratique improvisação com backing tracks profissionais
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Seletor de Track */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Backing Track:</label>
                    <Select value={selectedTrack} onValueChange={handleTrackChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(backingTracks).map(([key, track]) => (
                          <SelectItem key={key} value={key}>{track.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Tempo: {selectedTempo[0]} BPM</label>
                    <Slider
                      value={selectedTempo}
                      onValueChange={setSelectedTempo}
                      min={60}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Informações da Track */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm mb-2">
                          <strong>Tonalidade:</strong> {backingTracks[selectedTrack].tonalidade}
                        </div>
                        <div className="text-sm mb-2">
                          <strong>Escala:</strong> {backingTracks[selectedTrack].escala}
                        </div>
                        <div className="text-sm">
                          <strong>Dificuldade:</strong>{' '}
                          <Badge variant="outline">{backingTracks[selectedTrack].dificuldade}</Badge>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm mb-2">
                          <strong>Progressão:</strong>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {backingTracks[selectedTrack].chords.map((chord, idx) => (
                            <Badge
                              key={idx}
                              variant={currentChord && currentChord.index === idx ? 'default' : 'outline'}
                              className={currentChord && currentChord.index === idx ? 'bg-primary' : ''}
                            >
                              {chord}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Controles */}
                <div className="flex justify-center space-x-4">
                  <Button
                    size="lg"
                    onClick={handlePlayTrack}
                    className="w-48"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Parar
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Tocar
                      </>
                    )}
                  </Button>
                </div>

                {/* Acorde Atual */}
                {isPlaying && currentChord && (
                  <Card className="bg-primary/20 border-primary">
                    <CardContent className="p-6 text-center">
                      <div className="text-sm text-muted-foreground mb-2">Acorde Atual:</div>
                      <div className="text-4xl font-bold">{currentChord.chord}</div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Beat {currentChord.beat + 1}/4
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Dicas de Improvisação */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Dicas para Improvisar</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">1. Começe Simples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Use poucas notas, foque no ritmo e articulação</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">2. Escute o Backing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Preste atenção na mudança de acordes</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">3. Use Espaços</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Silêncios são tão importantes quanto notas</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-sm">4. Resolva nas Notas do Acorde</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Termine frases nas notas do acorde atual</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Gravador de Prática */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Music className="w-5 h-5" />
                <span>Grave Sua Prática</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Grave sua improvisação sobre o backing track e ouça seu progresso
              </p>
            </CardHeader>
            <CardContent>
              {/* AudioRecorder temporariamente desabilitado */}
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Recurso de gravação em manutenção</p>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-400">💡 Dica:</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">
                  Inicie o backing track primeiro, depois clique em "Iniciar Gravação" para gravar sua improvisação junto com a base.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Técnicas */}
        <TabsContent value="tecnicas" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Técnicas de Improvisação</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {tecnicasImprov.map((tecnica, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{tecnica.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{tecnica.descricao}</p>
                        </div>
                        <Badge 
                          variant={
                            tecnica.dificuldade === 'Básico' ? 'default' :
                            tecnica.dificuldade === 'Intermediário' ? 'secondary' : 'destructive'
                          }
                        >
                          {tecnica.dificuldade}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Exemplo:</h5>
                          <p className="text-sm bg-background/50 p-3 rounded">{tecnica.exemplo}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Exercício:</h5>
                          <p className="text-sm bg-background/50 p-3 rounded">{tecnica.exercicio}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Demonstração
                        </Button>
                        <Button variant="outline" size="sm">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Exercício Guiado
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fraseado */}
        <TabsContent value="fraseado" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Fraseado e Expressão</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Como dar vida e emoção às suas improvisações
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conceitosFraseado.map((conceito, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{conceito.conceito}</CardTitle>
                        <Badge 
                          variant={conceito.importancia === 'Fundamental' ? 'default' : 'secondary'}
                        >
                          {conceito.importancia}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm">{conceito.descricao}</p>
                        <div className="bg-blue-500/20 p-3 rounded">
                          <strong className="text-blue-400">Dica:</strong>
                          <p className="text-sm mt-1">{conceito.dica}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => alert(`Exemplo Sonoro: ${conceito.nome}\n\n${conceito.descricao}\n\nEm breve: áudio demonstrativo!`)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Exemplo Sonoro
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estrutura de Solo */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Estrutura de um Solo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-500/20 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-400">Introdução</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Estabeleça o tom</li>
                      <li>• Comece simples</li>
                      <li>• Apresente o tema</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-blue-500/20 border-blue-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-400">Desenvolvimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Explore ideias</li>
                      <li>• Aumente complexidade</li>
                      <li>• Varie ritmos</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-orange-500/20 border-orange-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-400">Clímax</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Ponto alto</li>
                      <li>• Máxima intensidade</li>
                      <li>• Técnica avançada</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500/20 border-purple-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-400">Resolução</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1">
                      <li>• Diminua tensão</li>
                      <li>• Retorne ao tema</li>
                      <li>• Finalize com impacto</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prática */}
        <TabsContent value="pratica" className="space-y-6">
          {/* Exercícios Progressivos */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Exercícios Progressivos</CardTitle>
              <p className="text-muted-foreground">
                Desenvolva suas habilidades de improvisação gradualmente
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exerciciosImprov.map((exercicio, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{exercicio.nome}</CardTitle>
                        <div className="flex space-x-2">
                          <Badge variant="outline">{exercicio.nivel}</Badge>
                          <Badge variant="secondary">{exercicio.tempo}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <strong>Objetivo:</strong> {exercicio.objetivo}
                        </div>
                        <div>
                          <strong>Como fazer:</strong>
                          <p className="text-sm mt-1">{exercicio.instrucoes}</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar Exercício
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Backing Tracks */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Music className="w-5 h-5" />
                <span>Backing Tracks para Prática</span>
              </CardTitle>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Tempo:</span>
                  <div className="w-32">
                    <Slider
                      value={selectedTempo}
                      onValueChange={setSelectedTempo}
                      max={200}
                      min={60}
                      step={5}
                    />
                  </div>
                  <span className="text-sm font-mono">{selectedTempo[0]} BPM</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backingTracks.map((track, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{track.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{track.estilo}</p>
                        </div>
                        <Badge 
                          variant={
                            track.dificuldade === 'Básico' ? 'default' :
                            track.dificuldade === 'Intermediário' ? 'secondary' : 'destructive'
                          }
                        >
                          {track.dificuldade}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <strong>Acordes:</strong>
                          <p className="font-mono text-sm">{track.acordes}</p>
                        </div>
                        <div>
                          <strong>Tempo:</strong>
                          <p className="text-sm">{track.tempo}</p>
                        </div>
                        <div>
                          <strong>Escalas sugeridas:</strong>
                          <p className="text-sm">{track.escalas}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Tocar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Target className="w-4 h-4 mr-2" />
                          Dicas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Metrônomo Integrado */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Metrônomo Integrado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-6">
                <Button size="lg" variant="outline">
                  <Play className="w-6 h-6 mr-2" />
                  Iniciar Metrônomo
                </Button>
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold">{selectedTempo[0]}</div>
                  <div className="text-sm text-muted-foreground">BPM</div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm">4/4</Button>
                  <Button variant="outline" size="sm">3/4</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

