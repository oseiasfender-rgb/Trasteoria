import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Zap, Grid, Music2, Target, Volume2, Eye, Shuffle, ArrowRight } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useAppContext } from '../contexts/AppContext.jsx';
import ChordDiagram from './ChordDiagram';

export function EscalasArpejosSection() {
  const { playScale, playArpeggio } = useAppContext();
  const { showInfo, showAudioSuccess, showAudioError } = useToast();
  const [activeTab, setActiveTab] = useState('modos_gregos');
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedCAGEDForm, setSelectedCAGEDForm] = useState('C');
  const [showDiagram, setShowDiagram] = useState(null);

  // Handler para tocar escalas
  const handlePlayScale = (scaleName, key = selectedKey) => {
    try {
      playScale(scaleName, key);
      showAudioSuccess(`Escala ${scaleName} em ${key}`);
    } catch (error) {
      showAudioError('Erro ao tocar escala');
    }
  };

  // Handler para tocar arpejos
  const handlePlayArpeggio = (arpeggioType, key = selectedKey) => {
    try {
      playArpeggio(arpeggioType, key);
      showAudioSuccess(`Arpejo ${arpeggioType} em ${key}`);
    } catch (error) {
      showAudioError('Erro ao tocar arpejo');
    }
  };

  // Handler para mostrar diagrama
  const handleShowDiagram = (chordName) => {
    setShowDiagram(showDiagram === chordName ? null : chordName);
  };

  // Sistema CAGED
  const cagedSystem = {
    C: {
      nome: 'Forma C',
      posicao: 'Casa 8 (em C)',
      caracteristicas: 'Forma aberta, fácil visualização',
      acordeBase: 'C maior aberto',
      escalaPosicao: 'Posição 1 da escala maior'
    },
    A: {
      nome: 'Forma A',
      posicao: 'Casa 3 (em C)',
      caracteristicas: 'Pestana no 3º traste',
      acordeBase: 'A maior com pestana',
      escalaPosicao: 'Posição 2 da escala maior'
    },
    G: {
      nome: 'Forma G',
      posicao: 'Casa 10 (em C)',
      caracteristicas: 'Forma complexa, som cheio',
      acordeBase: 'G maior aberto',
      escalaPosicao: 'Posição 3 da escala maior'
    },
    E: {
      nome: 'Forma E',
      posicao: 'Casa 8 (em C)',
      caracteristicas: 'Pestana completa',
      acordeBase: 'E maior com pestana',
      escalaPosicao: 'Posição 4 da escala maior'
    },
    D: {
      nome: 'Forma D',
      posicao: 'Casa 10 (em C)',
      caracteristicas: 'Forma triangular',
      acordeBase: 'D maior aberto',
      escalaPosicao: 'Posição 5 da escala maior'
    }
  };

  // Escalas exóticas
  const escalasExoticas = [
    {
      nome: 'Escala Diminuta (Tom-Semitom)',
      formula: 'T - S - T - S - T - S - T - S',
      exemplo: 'C - D - Eb - F - F# - G# - A - B',
      caracteristica: 'Simétrica, 8 notas',
      uso: 'Jazz avançado, acordes diminutos',
      sonoridade: 'Misteriosa, instável'
    },
    {
      nome: 'Escala de Tons Inteiros',
      formula: 'T - T - T - T - T - T',
      exemplo: 'C - D - E - F# - G# - A#',
      caracteristica: 'Simétrica, 6 notas',
      uso: 'Impressionismo, jazz moderno',
      sonoridade: 'Etérea, flutuante'
    },
    {
      nome: 'Escala Cromática',
      formula: 'S - S - S - S - S - S - S - S - S - S - S - S',
      exemplo: 'C - C# - D - D# - E - F - F# - G - G# - A - A# - B',
      caracteristica: 'Todas as 12 notas',
      uso: 'Passagens, ornamentação',
      sonoridade: 'Tensão máxima'
    },
    {
      nome: 'Escala Húngara Menor',
      formula: 'T - S - 3S - S - S - 3S - S',
      exemplo: 'C - D - Eb - F# - G - Ab - B',
      caracteristica: 'Exótica, intervalos aumentados',
      uso: 'Música folclórica, metal',
      sonoridade: 'Dramática, oriental'
    },
    {
      nome: 'Escala Japonesa (Hirajoshi)',
      formula: '2T - S - 2T - S - 2T',
      exemplo: 'C - D - Eb - G - Ab',
      caracteristica: 'Pentatônica exótica',
      uso: 'Música oriental, ambient',
      sonoridade: 'Contemplativa, zen'
    },
    {
      nome: 'Escala Árabe',
      formula: 'S - 3S - S - T - S - 3S - S',
      exemplo: 'C - Db - E - F - G - Ab - B',
      caracteristica: 'Intervalos aumentados',
      uso: 'Música árabe, metal exótico',
      sonoridade: 'Mística, oriental'
    }
  ];

  // Arpejos avançados
  const arpejosAvancados = [
    {
      tipo: 'Tríade Maior',
      formula: '1 - 3 - 5',
      exemplo: 'C - E - G',
      aplicacao: 'Base para improvisação',
      dificuldade: 'Básico'
    },
    {
      tipo: 'Tríade Menor',
      formula: '1 - b3 - 5',
      exemplo: 'C - Eb - G',
      aplicacao: 'Melodias menores',
      dificuldade: 'Básico'
    },
    {
      tipo: 'Sétima Maior',
      formula: '1 - 3 - 5 - 7',
      exemplo: 'C - E - G - B',
      aplicacao: 'Jazz, bossa nova',
      dificuldade: 'Intermediário'
    },
    {
      tipo: 'Sétima Menor',
      formula: '1 - b3 - 5 - b7',
      exemplo: 'C - Eb - G - Bb',
      aplicacao: 'Jazz, blues',
      dificuldade: 'Intermediário'
    },
    {
      tipo: 'Sétima Dominante',
      formula: '1 - 3 - 5 - b7',
      exemplo: 'C - E - G - Bb',
      aplicacao: 'Blues, rock, jazz',
      dificuldade: 'Intermediário'
    },
    {
      tipo: 'Meio-Diminuto',
      formula: '1 - b3 - b5 - b7',
      exemplo: 'C - Eb - Gb - Bb',
      aplicacao: 'Jazz avançado',
      dificuldade: 'Avançado'
    },
    {
      tipo: 'Diminuto',
      formula: '1 - b3 - b5 - bb7',
      exemplo: 'C - Eb - Gb - A',
      aplicacao: 'Passagens, tensão',
      dificuldade: 'Avançado'
    },
    {
      tipo: 'Aumentado',
      formula: '1 - 3 - #5',
      exemplo: 'C - E - G#',
      aplicacao: 'Jazz moderno, fusion',
      dificuldade: 'Avançado'
    }
  ];

  // Padrões de arpejos
  const padroesArpejos = [
    {
      nome: 'Padrão Ascendente',
      sequencia: '1 - 3 - 5 - 7',
      uso: 'Melodias lineares',
      exemplo: 'C - E - G - B'
    },
    {
      nome: 'Padrão em Terças',
      sequencia: '1 - 3 - 5 - 7 - 9',
      uso: 'Sonoridade jazzy',
      exemplo: 'C - E - G - B - D'
    },
    {
      nome: 'Padrão Quebrado',
      sequencia: '1 - 5 - 3 - 7',
      uso: 'Variação rítmica',
      exemplo: 'C - G - E - B'
    },
    {
      nome: 'Padrão Invertido',
      sequencia: '7 - 5 - 3 - 1',
      uso: 'Frases descendentes',
      exemplo: 'B - G - E - C'
    }
  ];

  // Modos da escala menor melódica
  const modosmenorMelodica = [
    {
      nome: 'Menor Melódica',
      grau: 'I',
      formula: '1 - 2 - b3 - 4 - 5 - 6 - 7',
      caracteristica: 'Menor com 6ª e 7ª maiores',
      uso: 'Jazz, improvisação sobre acordes menores'
    },
    {
      nome: 'Dórico b2',
      grau: 'II',
      formula: '1 - b2 - b3 - 4 - 5 - 6 - b7',
      caracteristica: 'Dórico com 2ª menor',
      uso: 'Acordes m7, sonoridade exótica'
    },
    {
      nome: 'Lídio Aumentado',
      grau: 'III',
      formula: '1 - 2 - 3 - #4 - #5 - 6 - 7',
      caracteristica: 'Lídio com 5ª aumentada',
      uso: 'Acordes maj7#5, sonoridade etérea'
    },
    {
      nome: 'Lídio Dominante',
      grau: 'IV',
      formula: '1 - 2 - 3 - #4 - 5 - 6 - b7',
      caracteristica: 'Lídio com 7ª menor',
      uso: 'Acordes dominantes, blues-jazz'
    },
    {
      nome: 'Mixolídio b6',
      grau: 'V',
      formula: '1 - 2 - 3 - 4 - 5 - b6 - b7',
      caracteristica: 'Mixolídio com 6ª menor',
      uso: 'Acordes dominantes, rock progressivo'
    },
    {
      nome: 'Lócrio #2',
      grau: 'VI',
      formula: '1 - 2 - b3 - 4 - b5 - b6 - b7',
      caracteristica: 'Lócrio com 2ª maior',
      uso: 'Acordes m7b5, jazz modal'
    },
    {
      nome: 'Alterado (Super Lócrio)',
      grau: 'VII',
      formula: '1 - b2 - b3 - b4 - b5 - b6 - b7',
      caracteristica: 'Máxima alteração',
      uso: 'Acordes dominantes alterados, bebop'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <Zap className="w-6 h-6" />
            <span>Escalas & Arpejos</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Modos gregos, sistema CAGED, escalas exóticas e arpejos avançados
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-5">
          <TabsTrigger role="tab" value="modos_gregos">Modos Gregos</TabsTrigger>
          <TabsTrigger role="tab" value="caged">Sistema CAGED</TabsTrigger>
          <TabsTrigger role="tab" value="exoticas">Escalas Exóticas</TabsTrigger>
          <TabsTrigger role="tab" value="arpejos">Arpejos</TabsTrigger>
          <TabsTrigger role="tab" value="menor_melodica">Menor Melódica</TabsTrigger>
        </TabsList>

        {/* Modos Gregos */}
        <TabsContent value="modos_gregos" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Modos Gregos - Versão Completa</CardTitle>
              <p className="text-muted-foreground">
                Acesse a seção dedicada aos Modos Gregos para o estudo completo
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-lg">
                  Os Modos Gregos possuem uma seção dedicada com funcionalidades completas:
                </p>
                <ul className="text-left space-y-2 max-w-md mx-auto">
                  <li>• Todos os 7 modos em 12 tonalidades</li>
                  <li>• Diagramas interativos do braço</li>
                  <li>• Campos harmônicos completos</li>
                  <li>• Exercícios de identificação</li>
                  <li>• Gerador de progressões</li>
                  <li>• Conteúdo audiovisual</li>
                </ul>
                <Button size="lg" className="mt-6">
                  <Music2 className="w-5 h-5 mr-2" />
                  Ir para Modos Gregos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sistema CAGED */}
        <TabsContent value="caged" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Grid className="w-5 h-5" />
                <span>Sistema CAGED</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Conecte todo o braço da guitarra através das 5 formas básicas
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select value={selectedCAGEDForm} onValueChange={setSelectedCAGEDForm}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cagedSystem).map(form => (
                      <SelectItem key={form} value={form}>Forma {form}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Detalhes da Forma Selecionada */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {cagedSystem[selectedCAGEDForm].nome}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <strong>Posição:</strong> {cagedSystem[selectedCAGEDForm].posicao}
                      </div>
                      <div>
                        <strong>Características:</strong> {cagedSystem[selectedCAGEDForm].caracteristicas}
                      </div>
                      <div>
                        <strong>Acorde Base:</strong> {cagedSystem[selectedCAGEDForm].acordeBase}
                      </div>
                      <div>
                        <strong>Escala:</strong> {cagedSystem[selectedCAGEDForm].escalaPosicao}
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShowDiagram(`CAGED-${selectedCAGEDForm}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Diagrama
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePlayScale(`Maior`, selectedKey)}
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Ouvir
                        </Button>
                      </div>
                      {showDiagram === `CAGED-${selectedCAGEDForm}` && (
                        <div className="mt-4">
                          <ChordDiagram chord={`${selectedKey} Maior`} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Sequência CAGED */}
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Sequência das Formas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center space-x-2">
                      {['C', 'A', 'G', 'E', 'D'].map((form, index) => (
                        <div key={form} className="flex items-center">
                          <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                              form === selectedCAGEDForm 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {form}
                          </div>
                          {index < 4 && (
                            <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-center mt-4 text-muted-foreground">
                      As formas se conectam em sequência ao longo do braço
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Aplicações do CAGED */}
              <Card className="bg-muted/50 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Aplicações do Sistema CAGED</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Acordes</h4>
                      <p className="text-sm text-muted-foreground">
                        Toque qualquer acorde em 5 posições diferentes
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Escalas</h4>
                      <p className="text-sm text-muted-foreground">
                        Conecte todas as posições da escala
                      </p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">Arpejos</h4>
                      <p className="text-sm text-muted-foreground">
                        Visualize arpejos em todo o braço
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Escalas Exóticas */}
        <TabsContent value="exoticas" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Escalas Exóticas e Simétricas</CardTitle>
              <p className="text-muted-foreground">
                Explore sonoridades únicas e expandir seu vocabulário musical
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {escalasExoticas.map((escala, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{escala.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{escala.sonoridade}</p>
                        </div>
                        <Badge variant="outline">{escala.caracteristica}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Fórmula:</h5>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded">
                            {escala.formula}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Exemplo:</h5>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded">
                            {escala.exemplo}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Uso:</h5>
                          <p className="text-sm">{escala.uso}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePlayScale(escala.nome, selectedKey)}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Ouvir
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDiagram(escala.nome)}
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Diagrama
                          </Button>
                        </div>
                        {showDiagram === escala.nome && (
                          <div className="mt-4">
                            <ChordDiagram chord={escala.nome} />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Arpejos */}
        <TabsContent value="arpejos" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Arpejos Avançados</CardTitle>
              <p className="text-muted-foreground">
                Domine os arpejos para improvisação e composição
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {arpejosAvancados.map((arpejo, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm">{arpejo.tipo}</CardTitle>
                        <Badge 
                          variant={
                            arpejo.dificuldade === 'Básico' ? 'default' :
                            arpejo.dificuldade === 'Intermediário' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {arpejo.dificuldade}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div>
                          <strong className="text-xs">Fórmula:</strong>
                          <p className="font-mono text-xs">{arpejo.formula}</p>
                        </div>
                        <div>
                          <strong className="text-xs">Exemplo:</strong>
                          <p className="font-mono text-xs">{arpejo.exemplo}</p>
                        </div>
                        <div>
                          <strong className="text-xs">Uso:</strong>
                          <p className="text-xs">{arpejo.aplicacao}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handlePlayArpeggio(arpejo.tipo, selectedKey)}
                        >
                          <Volume2 className="w-3 h-3 mr-1" />
                          Ouvir
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => handleShowDiagram(arpejo.tipo)}
                        >
                          <Target className="w-3 h-3 mr-1" />
                          Diagrama
                        </Button>
                        {showDiagram === arpejo.tipo && (
                          <div className="mt-2">
                            <ChordDiagram chord={arpejo.tipo} />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Padrões de Arpejos */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Padrões de Arpejos</CardTitle>
              <p className="text-muted-foreground">
                Diferentes formas de tocar os mesmos arpejos
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {padroesArpejos.map((padrao, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{padrao.nome}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <strong>Sequência:</strong>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded mt-1">
                            {padrao.sequencia}
                          </p>
                        </div>
                        <div>
                          <strong>Exemplo:</strong>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded mt-1">
                            {padrao.exemplo}
                          </p>
                        </div>
                        <div>
                          <strong>Uso:</strong> {padrao.uso}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handlePlayArpeggio(padrao.nome, selectedKey)}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Ouvir Padrão
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDiagram(padrao.nome)}
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Diagrama
                          </Button>
                        </div>
                        {showDiagram === padrao.nome && (
                          <div className="mt-4">
                            <ChordDiagram chord={padrao.nome} />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menor Melódica */}
        <TabsContent value="menor_melodica" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Escala Menor Melódica e Seus Modos</CardTitle>
              <p className="text-muted-foreground">
                A segunda escala mais importante do jazz após a escala maior
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modosmenorMelodica.map((modo, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{modo.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{modo.caracteristica}</p>
                        </div>
                        <Badge variant="outline">{modo.grau}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Fórmula:</h5>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded">
                            {modo.formula}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Aplicação:</h5>
                          <p className="text-sm">{modo.uso}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePlayScale(modo.nome, selectedKey)}
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Ouvir Escala
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShowDiagram(modo.nome)}
                        >
                          <Target className="w-4 h-4 mr-2" />
                          Ver Diagrama
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePlayArpeggio(modo.nome, selectedKey)}
                        >
                          <Music2 className="w-4 h-4 mr-2" />
                          Exemplo Musical
                        </Button>
                      </div>
                      {showDiagram === modo.nome && (
                        <div className="mt-4">
                          <ChordDiagram chord={modo.nome} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comparação com Escala Maior */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Comparação: Maior vs Menor Melódica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-500/20 border-blue-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-400">Escala Maior</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div><strong>Fórmula:</strong> T-T-S-T-T-T-S</div>
                      <div><strong>Modos:</strong> 7 modos tradicionais</div>
                      <div><strong>Uso:</strong> Música tonal, pop, rock</div>
                      <div><strong>Sonoridade:</strong> Familiar, estável</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500/20 border-purple-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-400">Menor Melódica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div><strong>Fórmula:</strong> T-S-T-T-T-T-S</div>
                      <div><strong>Modos:</strong> 7 modos avançados</div>
                      <div><strong>Uso:</strong> Jazz, fusion, moderno</div>
                      <div><strong>Sonoridade:</strong> Sofisticada, colorida</div>
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

