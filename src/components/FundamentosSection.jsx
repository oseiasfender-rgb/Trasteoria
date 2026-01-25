import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Book, Music, Hand, Scale, Target, Play, Volume2 } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useToast } from '../hooks/useToast';
import AnimatedButton from './AnimatedButton';
import AnimatedCard from './AnimatedCard';

export function FundamentosSection() {
  const [activeTab, setActiveTab] = useState('teoria');
  const [playingInterval, setPlayingInterval] = useState(null);
  const [playingScale, setPlayingScale] = useState(null);
  
  // Usar o contexto para áudio
  const { playInterval, playScale, initializeAudio } = useAppContext();
  const { showAudioSuccess, showAudioError } = useToast();

  // Função para tocar intervalos
  const handlePlayInterval = async (intervalo, index) => {
    try {
      setPlayingInterval(index);
      
      // Inicializar áudio e tocar intervalo
      await initializeAudio();
      await playInterval(intervalo.semitons, 'C', 4);
      
      // Toast de sucesso
      showAudioSuccess(intervalo.nome);
      
      // Reset após 2 segundos
      setTimeout(() => setPlayingInterval(null), 2000);
      
    } catch (error) {
      showAudioError();
      setPlayingInterval(null);
    }
  };

  // Função para tocar escalas
  const handlePlayScale = async (escala, index) => {
    try {
      setPlayingScale(index);
      
      // Inicializar áudio e tocar escala
      await initializeAudio();
      await playScale(escala.notas, 4, 0.4);
      
      // Toast de sucesso
      showAudioSuccess(escala.nome);
      
      // Reset após duração da escala
      setTimeout(() => setPlayingScale(null), escala.notas.length * 400 + 500);
      
    } catch (error) {
      showAudioError();
      setPlayingScale(null);
    }
  };

  // Dados dos intervalos
  const intervalos = [
    { nome: 'Segunda Menor', semitons: 1, exemplo: 'Dó - Réb', caracteristica: 'Tensão forte' },
    { nome: 'Segunda Maior', semitons: 2, exemplo: 'Dó - Ré', caracteristica: 'Movimento suave' },
    { nome: 'Terça Menor', semitons: 3, exemplo: 'Dó - Mib', caracteristica: 'Sonoridade triste' },
    { nome: 'Terça Maior', semitons: 4, exemplo: 'Dó - Mi', caracteristica: 'Sonoridade alegre' },
    { nome: 'Quarta Justa', semitons: 5, exemplo: 'Dó - Fá', caracteristica: 'Estabilidade' },
    { nome: 'Trítono', semitons: 6, exemplo: 'Dó - Fá#', caracteristica: 'Máxima tensão' },
    { nome: 'Quinta Justa', semitons: 7, exemplo: 'Dó - Sol', caracteristica: 'Consonância perfeita' },
    { nome: 'Sexta Menor', semitons: 8, exemplo: 'Dó - Láb', caracteristica: 'Melancolia' },
    { nome: 'Sexta Maior', semitons: 9, exemplo: 'Dó - Lá', caracteristica: 'Brilho suave' },
    { nome: 'Sétima Menor', semitons: 10, exemplo: 'Dó - Sib', caracteristica: 'Tensão dominante' },
    { nome: 'Sétima Maior', semitons: 11, exemplo: 'Dó - Si', caracteristica: 'Tensão aguda' },
    { nome: 'Oitava Justa', semitons: 12, exemplo: 'Dó - Dó', caracteristica: 'Consonância total' }
  ];

  // Dados das escalas básicas
  const escalasBasicas = [
    {
      nome: 'Escala Maior',
      formula: 'T - T - S - T - T - T - S',
      exemplo: 'Dó - Ré - Mi - Fá - Sol - Lá - Si',
      notas: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      caracteristica: 'Alegre e brilhante',
      aplicacao: 'Pop, rock, country, música clássica'
    },
    {
      nome: 'Escala Menor Natural',
      formula: 'T - S - T - T - S - T - T',
      exemplo: 'Lá - Si - Dó - Ré - Mi - Fá - Sol',
      notas: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      caracteristica: 'Triste e melancólica',
      aplicacao: 'Baladas, música dramática'
    },
    {
      nome: 'Pentatônica Maior',
      formula: '1 - 2 - 3 - 5 - 6',
      exemplo: 'Dó - Ré - Mi - Sol - Lá',
      notas: ['C', 'D', 'E', 'G', 'A'],
      caracteristica: 'Simples e versátil',
      aplicacao: 'Rock, pop, country, folk'
    },
    {
      nome: 'Pentatônica Menor',
      formula: '1 - b3 - 4 - 5 - b7',
      exemplo: 'Lá - Dó - Ré - Mi - Sol',
      notas: ['A', 'C', 'D', 'E', 'G'],
      caracteristica: 'Expressiva e bluesy',
      aplicacao: 'Blues, rock, metal'
    },
    {
      nome: 'Escala Blues',
      formula: '1 - b3 - 4 - b5 - 5 - b7',
      exemplo: 'Lá - Dó - Ré - Mib - Mi - Sol',
      notas: ['A', 'C', 'D', 'Eb', 'E', 'G'],
      caracteristica: 'Característica do blues',
      aplicacao: 'Blues, jazz, rock'
    }
  ];

  // Exercícios de técnica
  const exerciciosTecnica = [
    {
      nome: 'Aranha (Spider)',
      descricao: 'Exercício básico de coordenação entre as mãos',
      instrucoes: 'Toque as casas 1-2-3-4 em cada corda, mantendo os dedos próximos ao braço',
      beneficios: 'Desenvolve independência dos dedos e coordenação'
    },
    {
      nome: 'Palhetada Alternada',
      descricao: 'Alternância entre palhetadas para baixo e para cima',
      instrucoes: 'Toque uma escala alternando ↓↑↓↑ consistentemente',
      beneficios: 'Aumenta velocidade e precisão'
    },
    {
      nome: 'Legato',
      descricao: 'Técnica de hammer-on e pull-off',
      instrucoes: 'Toque uma nota e "martele" a próxima sem usar a palheta',
      beneficios: 'Desenvolve força dos dedos e fluidez'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <Book className="w-6 h-6" />
            <span>Fundamentos Essenciais</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Base sólida de teoria musical, técnica e escalas básicas
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-6 h-auto p-2">
          <TabsTrigger role="tab" value="teoria" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
            <Music className="w-4 h-4" />
            <span>Teoria Musical</span>
          </TabsTrigger>
          <TabsTrigger role="tab" value="tecnica" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
            <Hand className="w-4 h-4" />
            <span>Técnica</span>
          </TabsTrigger>
          <TabsTrigger role="tab" value="escalas" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
            <Scale className="w-4 h-4" />
            <span>Escalas Básicas</span>
          </TabsTrigger>
          <TabsTrigger role="tab" value="harmonia" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
            <Target className="w-4 h-4" />
            <span>Harmonia Introdutória</span>
          </TabsTrigger>
        </TabsList>

        {/* Teoria Musical */}
        <TabsContent value="teoria" className="space-y-6">
          {/* Sistema Musical */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Music className="w-5 h-5" />
                <span>Sistema Musical Ocidental</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">As 12 Notas Cromáticas</h4>
                  <div className="grid grid-cols-6 gap-2">
                    {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((nota, index) => (
                      <div key={index} className="bg-primary/20 text-center py-2 rounded font-mono">
                        {nota}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Conceitos Importantes</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Semitom:</strong> Menor distância entre duas notas</li>
                    <li><strong>Tom:</strong> Equivale a dois semitons</li>
                    <li><strong>Enarmonia:</strong> Mesma nota, nomes diferentes (C# = Db)</li>
                    <li><strong>Oitava:</strong> Repetição da mesma nota em frequência dobrada</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intervalos */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Intervalos: A Base de Tudo</CardTitle>
              <p className="text-muted-foreground">
                Os intervalos determinam a sonoridade e emoção da música
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {intervalos.map((intervalo, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{intervalo.nome}</h4>
                        <Badge variant="secondary">{intervalo.semitons}st</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{intervalo.exemplo}</p>
                      <p className="text-xs">{intervalo.caracteristica}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => handlePlayInterval(intervalo, index)}
                        disabled={playingInterval === index}
                      >
                        <Volume2 className="w-3 h-3 mr-1" />
                        {playingInterval === index ? 'Tocando...' : 'Ouvir'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Técnica */}
        <TabsContent value="tecnica" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Hand className="w-5 h-5" />
                <span>Técnica Fundamental</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {exerciciosTecnica.map((exercicio, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{exercicio.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">{exercicio.descricao}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Como fazer:</h5>
                          <p className="text-xs">{exercicio.instrucoes}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Benefícios:</h5>
                          <p className="text-xs">{exercicio.beneficios}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => alert(`Demonstração do exercício: ${exercicio.nome}\n\nEm breve: vídeo demonstrativo!`)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Demonstração
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Postura e Ergonomia */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Postura e Ergonomia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Posição Sentado</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Use uma cadeira sem braços</li>
                    <li>• Mantenha a coluna ereta</li>
                    <li>• Apoie a guitarra na perna direita (destros)</li>
                    <li>• Pés apoiados no chão</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Posicionamento das Mãos</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Mão Esquerda:</strong> Polegar atrás do braço</li>
                    <li>• <strong>Dedos:</strong> Curvados sobre as cordas</li>
                    <li>• <strong>Mão Direita:</strong> Relaxada sobre o corpo</li>
                    <li>• <strong>Pulso:</strong> Reto, sem dobrar</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Escalas Básicas */}
        <TabsContent value="escalas" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Scale className="w-5 h-5" />
                <span>Escalas Básicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {escalasBasicas.map((escala, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{escala.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">{escala.caracteristica}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Fórmula:</h5>
                          <p className="font-mono text-xs">{escala.formula}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Exemplo (Dó/Lá):</h5>
                          <p className="text-xs">{escala.exemplo}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-1">Aplicação:</h5>
                          <p className="text-xs">{escala.aplicacao}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handlePlayScale(escala, index)}
                          disabled={playingScale === index}
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          {playingScale === index ? 'Tocando...' : 'Ouvir Escala'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Harmonia Introdutória */}
        <TabsContent value="harmonia" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Formação de Acordes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Tríades Básicas</h4>
                  <p className="text-sm mb-3">
                    Acordes formados por três notas: fundamental, terça e quinta
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <h5 className="font-semibold">Acorde Maior</h5>
                        <p className="font-mono text-sm my-2">1 - 3 - 5</p>
                        <p className="text-xs">Exemplo: C - E - G (Dó Maior)</p>
                        <p className="text-xs mt-2">Sonoridade alegre e estável</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <h5 className="font-semibold">Acorde Menor</h5>
                        <p className="font-mono text-sm my-2">1 - b3 - 5</p>
                        <p className="text-xs">Exemplo: A - C - E (Lá Menor)</p>
                        <p className="text-xs mt-2">Sonoridade triste e melancólica</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Progressões Básicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { nome: 'I-V-vi-IV', acordes: 'C - G - Am - F', descricao: 'Progressão pop clássica' },
                  { nome: 'I-vi-IV-V', acordes: 'C - Am - F - G', descricao: 'Progressão dos anos 50' },
                  { nome: 'vi-IV-I-V', acordes: 'Am - F - C - G', descricao: 'Progressão alternativa' }
                ].map((prog, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{prog.nome}</h4>
                      <p className="font-mono text-sm my-2">{prog.acordes}</p>
                      <p className="text-xs text-muted-foreground">{prog.descricao}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3"
                        onClick={async () => {
                          await initializeAudio();
                          // Tocar progressão usando nomes de acordes
                          const chords = prog.acordes.split(' - ');
                          chords.forEach((chord, i) => {
                            setTimeout(() => {
                              playChord(chord.trim(), 3, 1.0);
                            }, i * 1200);
                          });
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Tocar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

