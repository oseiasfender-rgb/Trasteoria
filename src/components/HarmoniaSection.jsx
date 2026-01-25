import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Music, Layers, ArrowRight, Volume2, Copy, Shuffle } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useToast } from '../hooks/useToast';
import ChordDiagram from './ChordDiagram';

export function HarmoniaSection() {
  const { playChord } = useAppContext();
  const { showAudioSuccess, showAudioError, showInfo } = useToast();
  const [activeTab, setActiveTab] = useState('campos');
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedProgression, setSelectedProgression] = useState('I-V-vi-IV');
  const [showDiagram, setShowDiagram] = useState(null);

  // Dados dos campos harmônicos
  const camposHarmonicos = {
    maior: {
      nome: 'Campo Harmônico Maior',
      acordes: [
        { grau: 'I', tipo: 'Maior', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-500' },
        { grau: 'ii', tipo: 'Menor', funcao: 'Subdominante', tensao: 'Preparação', cor: 'bg-blue-500' },
        { grau: 'iii', tipo: 'Menor', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-400' },
        { grau: 'IV', tipo: 'Maior', funcao: 'Subdominante', tensao: 'Preparação', cor: 'bg-blue-500' },
        { grau: 'V', tipo: 'Maior', funcao: 'Dominante', tensao: 'Tensão', cor: 'bg-red-500' },
        { grau: 'vi', tipo: 'Menor', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-400' },
        { grau: 'vii°', tipo: 'Diminuto', funcao: 'Dominante', tensao: 'Tensão', cor: 'bg-red-400' }
      ]
    },
    menorNatural: {
      nome: 'Campo Harmônico Menor Natural',
      acordes: [
        { grau: 'i', tipo: 'Menor', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-500' },
        { grau: 'ii°', tipo: 'Diminuto', funcao: 'Subdominante', tensao: 'Preparação', cor: 'bg-blue-400' },
        { grau: 'bIII', tipo: 'Maior', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-400' },
        { grau: 'iv', tipo: 'Menor', funcao: 'Subdominante', tensao: 'Preparação', cor: 'bg-blue-500' },
        { grau: 'v', tipo: 'Menor', funcao: 'Dominante', tensao: 'Tensão Fraca', cor: 'bg-orange-500' },
        { grau: 'bVI', tipo: 'Maior', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-400' },
        { grau: 'bVII', tipo: 'Maior', funcao: 'Subdominante', tensao: 'Preparação', cor: 'bg-blue-400' }
      ]
    },
    menorHarmonico: {
      nome: 'Campo Harmônico Menor Harmônico',
      acordes: [
        { grau: 'i', tipo: 'Menor', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-500' },
        { grau: 'ii°', tipo: 'Diminuto', funcao: 'Subdominante', tensao: 'Preparação', cor: 'bg-blue-400' },
        { grau: 'bIII+', tipo: 'Aumentado', funcao: 'Tônica', tensao: 'Instável', cor: 'bg-purple-500' },
        { grau: 'iv', tipo: 'Menor', funcao: 'Subdominante', tensao: 'Preparação', cor: 'bg-blue-500' },
        { grau: 'V', tipo: 'Maior', funcao: 'Dominante', tensao: 'Tensão', cor: 'bg-red-500' },
        { grau: 'bVI', tipo: 'Maior', funcao: 'Tônica', tensao: 'Repouso', cor: 'bg-green-400' },
        { grau: 'vii°', tipo: 'Diminuto', funcao: 'Dominante', tensao: 'Tensão', cor: 'bg-red-400' }
      ]
    }
  };

  // Progressões harmônicas populares
  const progressoes = {
    'I-V-vi-IV': {
      nome: 'Progressão Pop Clássica',
      graus: ['I', 'V', 'vi', 'IV'],
      exemplos: ['C - G - Am - F', 'G - D - Em - C', 'D - A - Bm - G'],
      estilos: 'Pop, Rock, Country',
      caracteristica: 'Extremamente popular, movimento forte'
    },
    'vi-IV-I-V': {
      nome: 'Progressão Alternativa',
      graus: ['vi', 'IV', 'I', 'V'],
      exemplos: ['Am - F - C - G', 'Em - C - G - D', 'Bm - G - D - A'],
      estilos: 'Pop, Baladas',
      caracteristica: 'Começa no relativo menor'
    },
    'I-vi-IV-V': {
      nome: 'Progressão dos Anos 50',
      graus: ['I', 'vi', 'IV', 'V'],
      exemplos: ['C - Am - F - G', 'G - Em - C - D', 'D - Bm - G - A'],
      estilos: 'Doo-wop, Oldies',
      caracteristica: 'Clássica, nostálgica'
    },
    'ii-V-I': {
      nome: 'Progressão de Jazz',
      graus: ['ii', 'V', 'I'],
      exemplos: ['Dm - G - C', 'Am - D - G', 'Em - A - D'],
      estilos: 'Jazz, Bossa Nova',
      caracteristica: 'Movimento harmônico forte'
    }
  };

  // Acordes com sétima
  const acordesSetima = [
    {
      tipo: 'Maior com 7ª Maior',
      simbolo: 'Cmaj7',
      formula: '1 - 3 - 5 - 7',
      notas: 'C - E - G - B',
      sonoridade: 'Sofisticada, jazzy',
      uso: 'Jazz, Bossa Nova, Pop sofisticado'
    },
    {
      tipo: 'Menor com 7ª Menor',
      simbolo: 'Cm7',
      formula: '1 - b3 - 5 - b7',
      notas: 'C - Eb - G - Bb',
      sonoridade: 'Suave, melancólica',
      uso: 'Jazz, Soul, R&B'
    },
    {
      tipo: 'Dominante',
      simbolo: 'C7',
      formula: '1 - 3 - 5 - b7',
      notas: 'C - E - G - Bb',
      sonoridade: 'Tensão, quer resolver',
      uso: 'Blues, Jazz, Rock'
    },
    {
      tipo: 'Meio-Diminuto',
      simbolo: 'Cm7b5',
      formula: '1 - b3 - b5 - b7',
      notas: 'C - Eb - Gb - Bb',
      sonoridade: 'Instável, misteriosa',
      uso: 'Jazz, Música Erudita'
    }
  ];

  // Voicings (inversões)
  const voicings = [
    {
      nome: 'Posição Fundamental',
      exemplo: 'C - E - G - B',
      caracteristica: 'Baixo na fundamental',
      uso: 'Estabilidade, clareza'
    },
    {
      nome: 'Primeira Inversão',
      exemplo: 'E - G - B - C',
      caracteristica: 'Baixo na terça',
      uso: 'Movimento suave do baixo'
    },
    {
      nome: 'Segunda Inversão',
      exemplo: 'G - B - C - E',
      caracteristica: 'Baixo na quinta',
      uso: 'Sonoridade aberta'
    },
    {
      nome: 'Terceira Inversão',
      exemplo: 'B - C - E - G',
      caracteristica: 'Baixo na sétima',
      uso: 'Tensão, movimento descendente'
    }
  ];

  // Função para calcular acordes na tonalidade
  const calcularAcordes = (key, campo) => {
    // Notas com sustenidos e bemóis
    const notasSustenidos = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const notasBemois = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    
    // Usar bemóis para tonalidades menores e sustenidos para maiores
    const notas = campo === 'maior' ? notasSustenidos : notasBemois;
    const keyIndex = notas.indexOf(key);
    
    // Intervalos específicos para cada campo harmônico
    let intervalos;
    if (campo === 'maior') {
      intervalos = [0, 2, 4, 5, 7, 9, 11]; // Escala maior
    } else if (campo === 'menorNatural') {
      intervalos = [0, 2, 3, 5, 7, 8, 10]; // Escala menor natural
    } else if (campo === 'menorHarmonico') {
      intervalos = [0, 2, 3, 5, 7, 8, 11]; // Escala menor harmônica
    }
    
    const escala = intervalos.map(interval => 
      notas[(keyIndex + interval) % 12]
    );

    return camposHarmonicos[campo].acordes.map((acorde, index) => ({
      ...acorde,
      nota: escala[index],
      acorde: `${escala[index]}${acorde.tipo === 'Maior' ? '' : 
                acorde.tipo === 'Menor' ? 'm' : 
                acorde.tipo === 'Diminuto' ? 'dim' : 
                acorde.tipo === 'Aumentado' ? '+' : ''}`
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <Music className="w-6 h-6" />
            <span>Harmonia Funcional</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Campos harmônicos, acordes avançados e progressões
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-4">
          <TabsTrigger role="tab" value="campos">Campos Harmônicos</TabsTrigger>
          <TabsTrigger role="tab" value="acordes">Acordes com 7ª</TabsTrigger>
          <TabsTrigger role="tab" value="progressoes">Progressões</TabsTrigger>
          <TabsTrigger role="tab" value="voicings">Voicings</TabsTrigger>
        </TabsList>

        {/* Campos Harmônicos */}
        <TabsContent value="campos" className="space-y-6">
          {/* Seletor de Tonalidade */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Seletor de Tonalidade</CardTitle>
                <Select value={selectedKey} onValueChange={setSelectedKey}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(key => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
          </Card>

          {/* Campos Harmônicos */}
          {Object.entries(camposHarmonicos).map(([key, campo]) => (
            <Card key={key} className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>{campo.nome}</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Tonalidade: {selectedKey} {key === 'maior' ? 'Maior' : 'Menor'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {calcularAcordes(selectedKey, key).map((acorde, index) => (
                    <Card key={index} className="bg-muted/50 text-center">
                      <CardContent className="p-4">
                        <div className={`w-4 h-4 rounded-full ${acorde.cor} mx-auto mb-2`}></div>
                        <div className="text-lg font-bold">{acorde.grau}</div>
                        <div className="font-mono text-sm">{acorde.acorde}</div>
                        <div className="text-xs text-muted-foreground">{acorde.tipo}</div>
                        <div className="text-xs mt-1">{acorde.funcao}</div>
                        <div className="text-xs text-muted-foreground">{acorde.tensao}</div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => {
                            // Tocar acorde usando o nome completo (ex: "Dm", "Cmaj7")
                            playChord(acorde.acorde, 3, 1.5);
                          }}
                        >
                          <Volume2 className="w-3 h-3 mr-1" />
                          Ouvir
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Funções Harmônicas */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Funções Harmônicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-500/20 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-400">Tônica (T)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Função de repouso e estabilidade</p>
                    <div className="space-y-2">
                      <div><strong>Acordes:</strong> I, iii, vi</div>
                      <div><strong>Sensação:</strong> Casa, chegada</div>
                      <div><strong>Uso:</strong> Início e fim de músicas</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-500/20 border-blue-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-400">Subdominante (SD)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Função de preparação e afastamento</p>
                    <div className="space-y-2">
                      <div><strong>Acordes:</strong> IV, ii</div>
                      <div><strong>Sensação:</strong> Movimento, jornada</div>
                      <div><strong>Uso:</strong> Preparação para a dominante</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-500/20 border-red-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-400">Dominante (D)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Função de tensão e resolução</p>
                    <div className="space-y-2">
                      <div><strong>Acordes:</strong> V, vii°</div>
                      <div><strong>Sensação:</strong> Tensão, quer resolver</div>
                      <div><strong>Uso:</strong> Criar expectativa de resolução</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Acordes com Sétima */}
        <TabsContent value="acordes" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Acordes com Sétima</CardTitle>
              <p className="text-muted-foreground">
                Tétrades que adicionam sofisticação e cor harmônica
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acordesSetima.map((acorde, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{acorde.tipo}</CardTitle>
                          <p className="text-sm text-muted-foreground">{acorde.sonoridade}</p>
                        </div>
                        <Badge variant="outline" className="font-mono">{acorde.simbolo}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Fórmula:</h5>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded">
                            {acorde.formula}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Exemplo em Dó:</h5>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded">
                            {acorde.notas}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Uso comum:</h5>
                          <p className="text-sm">{acorde.uso}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              playChord(acorde.simbolo, 3, 2);
                              showAudioSuccess(acorde.tipo);
                            }}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Ouvir
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowDiagram(showDiagram === 'voicing' ? null : 'voicing')}
                          >
                            {showDiagram === 'voicing' ? 'Ocultar' : 'Ver'} Diagrama
                          </Button>
                        </div>
                        {showDiagram === 'voicing' && (
                          <div className="mt-4">
                            <ChordDiagram chord="Cmaj7" />
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

        {/* Progressões */}
        <TabsContent value="progressoes" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Progressões Harmônicas Populares</CardTitle>
              <div className="flex items-center space-x-4">
                <Select value={selectedProgression} onValueChange={setSelectedProgression}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(progressoes).map(prog => (
                      <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Gerar Aleatória
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedProgression && (
                <div className="space-y-6">
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{progressoes[selectedProgression].nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {progressoes[selectedProgression].caracteristica}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3">Graus:</h5>
                          <div className="flex items-center space-x-2">
                            {progressoes[selectedProgression].graus.map((grau, index) => (
                              <div key={index} className="flex items-center">
                                <div className="bg-primary text-primary-foreground px-3 py-2 rounded font-mono">
                                  {grau}
                                </div>
                                {index < progressoes[selectedProgression].graus.length - 1 && (
                                  <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3">Exemplos:</h5>
                          <div className="space-y-2">
                            {progressoes[selectedProgression].exemplos.map((exemplo, index) => (
                              <div key={index} className="font-mono text-sm bg-background/50 p-2 rounded">
                                {exemplo}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <Badge variant="secondary">{progressoes[selectedProgression].estilos}</Badge>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              // Tocar cada acorde da progressão sequencialmente
                              const acordes = progressoes[selectedProgression].acordes;
                              acordes.forEach((acorde, index) => {
                                setTimeout(() => {
                                  playChord(acorde, 3, 1.2);
                                }, index * 1500);
                              });
                            }}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Tocar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voicings */}
        <TabsContent value="voicings" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Voicings e Inversões</CardTitle>
              <p className="text-muted-foreground">
                Diferentes disposições das notas do acorde
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {voicings.map((voicing, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{voicing.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">{voicing.caracteristica}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Exemplo (Cmaj7):</h5>
                          <p className="font-mono text-sm bg-background/50 p-2 rounded">
                            {voicing.exemplo}
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Quando usar:</h5>
                          <p className="text-sm">{voicing.uso}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              playChord('Cmaj7', 3, 2);
                              showAudioSuccess(voicing.nome);
                            }}
                          >
                            <Volume2 className="w-4 h-4 mr-2" />
                            Ouvir
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowDiagram(showDiagram === 'voicing' ? null : 'voicing')}
                          >
                            {showDiagram === 'voicing' ? 'Ocultar' : 'Ver'} Diagrama
                          </Button>
                        </div>
                        {showDiagram === 'voicing' && (
                          <div className="mt-4">
                            <ChordDiagram chord="Cmaj7" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Drop Voicings */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Drop Voicings</CardTitle>
              <p className="text-muted-foreground">
                Técnicas avançadas de disposição harmônica
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Drop 2</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">A segunda nota mais aguda desce uma oitava</p>
                    <div className="space-y-2">
                      <div><strong>Original:</strong> C - E - G - B</div>
                      <div><strong>Drop 2:</strong> C - G - B - E</div>
                      <div><strong>Uso:</strong> Jazz, arranjos vocais</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => {
                        playChord('Cmaj7', 3, 2);
                        showAudioSuccess('Drop Voicing');
                      }}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Demonstrar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Drop 3</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">A terceira nota mais aguda desce uma oitava</p>
                    <div className="space-y-2">
                      <div><strong>Original:</strong> C - E - G - B</div>
                      <div><strong>Drop 3:</strong> C - E - B - G</div>
                      <div><strong>Uso:</strong> Guitarra, arranjos</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => {
                        playChord('Cmaj7', 3, 2);
                        showAudioSuccess('Drop Voicing');
                      }}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Demonstrar
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Shell Voicings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Apenas as notas essenciais do acorde</p>
                    <div className="space-y-2">
                      <div><strong>Cmaj7:</strong> C - E - B</div>
                      <div><strong>Cm7:</strong> C - Eb - Bb</div>
                      <div><strong>Uso:</strong> Comping, acompanhamento</div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => {
                        playChord('Cmaj7', 3, 2);
                        showAudioSuccess('Drop Voicing');
                      }}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Demonstrar
                    </Button>
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

