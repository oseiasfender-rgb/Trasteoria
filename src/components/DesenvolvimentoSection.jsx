import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { TrendingUp, Brain, Clock, Target, CheckCircle, Star, Award, BookOpen } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import ProgressBar from './ProgressBar';

export function DesenvolvimentoSection() {
  const { showSuccess, showInfo } = useToast();
  const [activeTab, setActiveTab] = useState('metodologia');
  const [practiceTime, setPracticeTime] = useState([30]);
  const [currentLevel, setCurrentLevel] = useState('intermediario');
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [practiceStats, setPracticeStats] = useState({
    totalTime: 0,
    exercisesCompleted: 0,
    currentStreak: 0,
    level: 'iniciante'
  });

  // Handler para iniciar exercício
  const handleStartExercise = (exerciseName) => {
    setActiveExercise(exerciseName);
    showSuccess(`Exercício iniciado: ${exerciseName}`);
  };

  // Handler para completar exercício
  const handleCompleteExercise = (exerciseName) => {
    if (!completedExercises.includes(exerciseName)) {
      setCompletedExercises([...completedExercises, exerciseName]);
      setPracticeStats(prev => ({
        ...prev,
        exercisesCompleted: prev.exercisesCompleted + 1,
        totalTime: prev.totalTime + practiceTime[0]
      }));
      showSuccess(`Exercício completado: ${exerciseName}!`);
    }
    setActiveExercise(null);
  };

  // Handler para mudar nível
  const handleLevelChange = (level) => {
    setCurrentLevel(level);
    showInfo(`Nível alterado para: ${niveisDesenvolvimento[level].nome}`);
  };

  // Metodologia de Estudo
  const metodologiaEstudo = [
    {
      fase: 'Aquecimento',
      duracao: '10-15 min',
      atividades: ['Exercícios de digitação', 'Escalas lentas', 'Alongamento'],
      objetivo: 'Preparar músculos e mente',
      cor: 'bg-green-500'
    },
    {
      fase: 'Técnica',
      duracao: '15-20 min',
      atividades: ['Exercícios específicos', 'Estudos técnicos', 'Metrônomo'],
      objetivo: 'Desenvolver habilidades motoras',
      cor: 'bg-blue-500'
    },
    {
      fase: 'Repertório',
      duracao: '20-30 min',
      atividades: ['Músicas novas', 'Revisão de peças', 'Interpretação'],
      objetivo: 'Aplicar técnicas em contexto musical',
      cor: 'bg-purple-500'
    },
    {
      fase: 'Improvisação',
      duracao: '10-15 min',
      atividades: ['Backing tracks', 'Jam sessions', 'Criação livre'],
      objetivo: 'Desenvolver criatividade e expressão',
      cor: 'bg-orange-500'
    },
    {
      fase: 'Teoria',
      duracao: '10-15 min',
      atividades: ['Análise harmônica', 'Estudo de escalas', 'Composição'],
      objetivo: 'Compreender a música intelectualmente',
      cor: 'bg-red-500'
    }
  ];

  // Níveis de Desenvolvimento
  const niveisDesenvolvimento = {
    iniciante: {
      nome: 'Iniciante',
      duracao: '0-6 meses',
      objetivos: [
        'Postura e pegada corretas',
        'Acordes básicos (C, G, D, Em, Am)',
        'Ritmos simples',
        'Leitura de cifras',
        'Primeiras músicas'
      ],
      exercicios: [
        'Exercícios de digitação',
        'Mudanças de acordes',
        'Batidas básicas',
        'Escalas pentatônicas'
      ],
      tempo_pratica: '20-30 min/dia'
    },
    basico: {
      nome: 'Básico',
      duracao: '6-12 meses',
      objetivos: [
        'Todos os acordes abertos',
        'Pestana (F, Bm)',
        'Escalas maiores e menores',
        'Ritmos variados',
        'Primeiros solos'
      ],
      exercicios: [
        'Pestana progressiva',
        'Escalas em posições',
        'Arpejos básicos',
        'Backing tracks simples'
      ],
      tempo_pratica: '30-45 min/dia'
    },
    intermediario: {
      nome: 'Intermediário',
      duracao: '1-2 anos',
      objetivos: [
        'Modos gregos',
        'Acordes com extensões',
        'Improvisação estruturada',
        'Técnicas avançadas',
        'Repertório diversificado'
      ],
      exercicios: [
        'Modos em todas as posições',
        'Arpejos de 7ª',
        'Licks e frases',
        'Análise de solos'
      ],
      tempo_pratica: '45-60 min/dia'
    },
    avancado: {
      nome: 'Avançado',
      duracao: '2+ anos',
      objetivos: [
        'Domínio completo do braço',
        'Improvisação livre',
        'Composição',
        'Ensino',
        'Performance profissional'
      ],
      exercicios: [
        'Escalas exóticas',
        'Técnicas virtuosísticas',
        'Transcrições complexas',
        'Criação original'
      ],
      tempo_pratica: '60+ min/dia'
    }
  };

  // Exercícios de Percepção
  const exerciciosPercepcao = [
    {
      nome: 'Intervalos',
      descricao: 'Reconhecer intervalos auditivamente',
      niveis: ['2ª e 3ª', '4ª e 5ª', '6ª e 7ª', 'Todos os intervalos'],
      exercicio: 'Ouça dois sons e identifique o intervalo',
      tempo: '10 min/dia'
    },
    {
      nome: 'Acordes',
      descricao: 'Identificar qualidade dos acordes',
      niveis: ['Maior/Menor', 'Aumentado/Diminuto', 'Com 7ª', 'Extensões'],
      exercicio: 'Ouça acordes e identifique o tipo',
      tempo: '10 min/dia'
    },
    {
      nome: 'Escalas',
      descricao: 'Reconhecer modos e escalas',
      niveis: ['Maior/Menor', 'Modos gregos', 'Escalas exóticas', 'Jazz'],
      exercicio: 'Ouça melodias e identifique a escala',
      tempo: '15 min/dia'
    },
    {
      nome: 'Progressões',
      descricao: 'Identificar progressões harmônicas',
      niveis: ['I-V-vi-IV', 'ii-V-I', 'Círculo de 5ªs', 'Modulações'],
      exercicio: 'Ouça progressões e identifique os graus',
      tempo: '15 min/dia'
    },
    {
      nome: 'Ritmo',
      descricao: 'Desenvolver senso rítmico',
      niveis: ['Pulsação', 'Subdivisões', 'Síncopes', 'Métricas complexas'],
      exercicio: 'Bata palmas seguindo padrões rítmicos',
      tempo: '10 min/dia'
    }
  ];

  // Metas de Desenvolvimento
  const metasDesenvolvimento = [
    {
      categoria: 'Técnica',
      metas: [
        { nome: 'Tocar escala maior a 120 BPM', progresso: 75, nivel: 'intermediario' },
        { nome: 'Dominar pestana em todas as posições', progresso: 60, nivel: 'basico' },
        { nome: 'Alternate picking limpo', progresso: 40, nivel: 'intermediario' },
        { nome: 'Sweep picking básico', progresso: 20, nivel: 'avancado' }
      ]
    },
    {
      categoria: 'Teoria',
      metas: [
        { nome: 'Conhecer todos os modos gregos', progresso: 85, nivel: 'intermediario' },
        { nome: 'Análise harmônica funcional', progresso: 70, nivel: 'intermediario' },
        { nome: 'Escalas exóticas', progresso: 30, nivel: 'avancado' },
        { nome: 'Composição modal', progresso: 15, nivel: 'avancado' }
      ]
    },
    {
      categoria: 'Repertório',
      metas: [
        { nome: '10 músicas completas', progresso: 90, nivel: 'basico' },
        { nome: '5 solos transcritos', progresso: 60, nivel: 'intermediario' },
        { nome: 'Repertório de jazz', progresso: 40, nivel: 'avancado' },
        { nome: 'Composições próprias', progresso: 25, nivel: 'avancado' }
      ]
    }
  ];

  // Plano de Estudos Personalizado
  const gerarPlanoEstudos = (nivel, tempo) => {
    const planos = {
      iniciante: {
        20: {
          aquecimento: 3,
          tecnica: 8,
          repertorio: 7,
          teoria: 2
        },
        30: {
          aquecimento: 5,
          tecnica: 12,
          repertorio: 10,
          teoria: 3
        },
        45: {
          aquecimento: 7,
          tecnica: 18,
          repertorio: 15,
          teoria: 5
        }
      },
      intermediario: {
        30: {
          aquecimento: 5,
          tecnica: 10,
          repertorio: 8,
          improvisacao: 5,
          teoria: 2
        },
        45: {
          aquecimento: 7,
          tecnica: 15,
          repertorio: 12,
          improvisacao: 8,
          teoria: 3
        },
        60: {
          aquecimento: 10,
          tecnica: 20,
          repertorio: 15,
          improvisacao: 10,
          teoria: 5
        }
      },
      avancado: {
        45: {
          aquecimento: 5,
          tecnica: 12,
          repertorio: 10,
          improvisacao: 10,
          teoria: 8
        },
        60: {
          aquecimento: 8,
          tecnica: 15,
          repertorio: 15,
          improvisacao: 12,
          teoria: 10
        },
        90: {
          aquecimento: 10,
          tecnica: 25,
          repertorio: 20,
          improvisacao: 20,
          teoria: 15
        }
      }
    };

    return planos[nivel]?.[tempo] || planos[nivel]?.[Object.keys(planos[nivel])[0]];
  };

  const planoAtual = gerarPlanoEstudos(currentLevel, practiceTime[0]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center space-x-2">
            <TrendingUp className="w-6 h-6" />
            <span>Desenvolvimento Musical</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Metodologia, percepção musical e planejamento de estudos
          </p>
        </CardHeader>
      </Card>

      {/* Estatísticas de Progresso */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Seu Progresso</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{practiceStats.exercisesCompleted}</div>
                <div className="text-sm text-muted-foreground mt-1">Exercícios Completados</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{practiceStats.totalTime}</div>
                <div className="text-sm text-muted-foreground mt-1">Minutos de Prática</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">{practiceStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground mt-1">Dias Consecutivos</div>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardContent className="p-4 text-center">
                <div className="text-3xl font-bold text-primary">
                  {niveisDesenvolvimento[currentLevel].nome}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Nível Atual</div>
              </CardContent>
            </Card>
          </div>
          {completedExercises.length > 0 && (
            <div className="mt-4">
              <h5 className="font-semibold text-sm mb-2">Exercícios Completados Hoje:</h5>
              <div className="flex flex-wrap gap-2">
                {completedExercises.map((ex, idx) => (
                  <Badge key={idx} variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {ex}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-4">
          <TabsTrigger role="tab" value="metodologia">Metodologia</TabsTrigger>
          <TabsTrigger role="tab" value="percepcao">Percepção</TabsTrigger>
          <TabsTrigger role="tab" value="metas">Metas</TabsTrigger>
          <TabsTrigger role="tab" value="plano">Plano de Estudos</TabsTrigger>
        </TabsList>

        {/* Metodologia */}
        <TabsContent value="metodologia" className="space-y-6">
          {/* Estrutura de Prática */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Estrutura de Prática Eficiente</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Como organizar sua sessão de estudos para máximo aproveitamento
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metodologiaEstudo.map((fase, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full ${fase.cor} flex items-center justify-center text-white font-bold`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{fase.fase}</h4>
                            <Badge variant="outline">{fase.duracao}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{fase.objetivo}</p>
                          <div className="flex flex-wrap gap-2">
                            {fase.atividades.map((atividade, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {atividade}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Níveis de Desenvolvimento */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Níveis de Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(niveisDesenvolvimento).map(([key, nivel]) => (
                  <Card key={key} className={`bg-muted/50 ${currentLevel === key ? 'ring-2 ring-primary' : ''}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{nivel.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{nivel.duracao}</p>
                        </div>
                        <Badge variant="outline">{nivel.tempo_pratica}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Objetivos:</h5>
                          <ul className="text-sm space-y-1">
                            {nivel.objetivos.map((obj, i) => (
                              <li key={i} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Exercícios Principais:</h5>
                          <div className="flex flex-wrap gap-1">
                            {nivel.exercicios.map((ex, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {ex}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          variant={currentLevel === key ? "default" : "outline"} 
                          size="sm"
                          onClick={() => handleLevelChange(key)} 
                          className="w-full"
                        >
                          {currentLevel === key ? 'Nível Atual' : 'Selecionar Nível'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Percepção */}
        <TabsContent value="percepcao" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Treinamento de Percepção Musical</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Desenvolva seu ouvido musical com exercícios progressivos
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exerciciosPercepcao.map((exercicio, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{exercicio.nome}</CardTitle>
                          <p className="text-sm text-muted-foreground">{exercicio.descricao}</p>
                        </div>
                        <Badge variant="outline">{exercicio.tempo}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Progressão de Níveis:</h5>
                          <div className="space-y-2">
                            {exercicio.niveis.map((nivel, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                  {i + 1}
                                </div>
                                <span className="text-sm">{nivel}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm mb-2">Como Praticar:</h5>
                          <p className="text-sm bg-background/50 p-3 rounded">{exercicio.exercicio}</p>
                          <div className="flex space-x-2 mt-3">
                            <Button 
                              variant={activeExercise === exercicio.nome ? 'default' : 'outline'} 
                              size="sm"
                              onClick={() => {
                                if (activeExercise === exercicio.nome) {
                                  handleCompleteExercise(exercicio.nome);
                                } else {
                                  handleStartExercise(exercicio.nome);
                                }
                              }}
                            >
                              {activeExercise === exercicio.nome ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Completar
                                </>
                              ) : completedExercises.includes(exercicio.nome) ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Repetir
                                </>
                              ) : (
                                <>
                                  <Target className="w-4 h-4 mr-2" />
                                  Iniciar
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => showInfo('Tutorial em desenvolvimento')}
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Tutorial
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dicas de Percepção */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Dicas para Desenvolver o Ouvido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-blue-500/20 border-blue-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-400">Prática Diária</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• 10-15 minutos por dia são suficientes</li>
                      <li>• Consistência é mais importante que duração</li>
                      <li>• Use apps de treinamento auditivo</li>
                      <li>• Pratique com instrumento em mãos</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-green-500/20 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-400">Escuta Ativa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>• Analise músicas que você gosta</li>
                      <li>• Identifique progressões harmônicas</li>
                      <li>• Transcreva melodias e solos</li>
                      <li>• Compare diferentes versões da mesma música</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metas */}
        <TabsContent value="metas" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Metas de Desenvolvimento</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Acompanhe seu progresso em diferentes áreas
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metasDesenvolvimento.map((categoria, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{categoria.categoria}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categoria.metas.map((meta, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{meta.nome}</span>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant={
                                    meta.nivel === 'basico' ? 'default' :
                                    meta.nivel === 'intermediario' ? 'secondary' : 'destructive'
                                  }
                                  className="text-xs"
                                >
                                  {meta.nivel}
                                </Badge>
                                <span className="text-sm font-mono">{meta.progresso}%</span>
                              </div>
                            </div>
                            <Progress value={meta.progresso} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sistema de Conquistas */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Sistema de Conquistas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-yellow-500/20 border-yellow-500/50">
                  <CardContent className="p-4 text-center">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Primeira Música</h4>
                    <p className="text-xs text-muted-foreground">Toque sua primeira música completa</p>
                    <Badge variant="outline" className="mt-2">Conquistado</Badge>
                  </CardContent>
                </Card>

                <Card className="bg-blue-500/20 border-blue-500/50">
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Mestre dos Modos</h4>
                    <p className="text-xs text-muted-foreground">Domine todos os 7 modos gregos</p>
                    <Badge variant="secondary" className="mt-2">Em Progresso</Badge>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500/20 border-purple-500/50">
                  <CardContent className="p-4 text-center">
                    <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Ouvido Absoluto</h4>
                    <p className="text-xs text-muted-foreground">100% em exercícios de percepção</p>
                    <Badge variant="outline" className="mt-2">Bloqueado</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plano de Estudos */}
        <TabsContent value="plano" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Plano de Estudos Personalizado</CardTitle>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Tempo disponível:</span>
                  <div className="w-32">
                    <Slider
                      value={practiceTime}
                      onValueChange={setPracticeTime}
                      max={120}
                      min={15}
                      step={15}
                    />
                  </div>
                  <span className="text-sm font-mono">{practiceTime[0]} min</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Nível:</span>
                  <Badge variant="outline">{niveisDesenvolvimento[currentLevel].nome}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {planoAtual && (
                <div className="space-y-6">
                  {/* Distribuição do Tempo */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Distribuição do Tempo ({practiceTime[0]} minutos)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {Object.entries(planoAtual).map(([atividade, tempo]) => (
                          <Card key={atividade} className="bg-background/50">
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-primary">{tempo}</div>
                              <div className="text-xs text-muted-foreground">minutos</div>
                              <div className="text-sm font-medium mt-1 capitalize">
                                {atividade.replace('_', ' ')}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cronograma Detalhado */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Cronograma da Sessão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(planoAtual).map(([atividade, tempo], index) => {
                          const tempoAcumulado = Object.values(planoAtual)
                            .slice(0, index)
                            .reduce((acc, t) => acc + t, 0);
                          
                          return (
                            <div key={atividade} className="flex items-center space-x-4 p-3 bg-background/50 rounded">
                              <div className="w-16 text-sm font-mono">
                                {String(Math.floor(tempoAcumulado / 60)).padStart(2, '0')}:
                                {String(tempoAcumulado % 60).padStart(2, '0')}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium capitalize">{atividade.replace('_', ' ')}</div>
                                <div className="text-sm text-muted-foreground">{tempo} minutos</div>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => alert(`Iniciando: ${atividade.replace('_', ' ')}\nDuração: ${tempo} minutos\n\nEm breve: timer integrado!`)}
                              >
                                <Clock className="w-4 h-4 mr-2" />
                                Iniciar
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sugestões Específicas */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Sugestões para Hoje</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2">Foco Técnico:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Escala pentatônica menor - posição 1</li>
                            <li>• Exercício de digitação 1-2-3-4</li>
                            <li>• Mudanças de acordes Am-F-C-G</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">Repertório Sugerido:</h5>
                          <ul className="text-sm space-y-1">
                            <li>• "Wonderwall" - Oasis</li>
                            <li>• "Wish You Were Here" - Pink Floyd</li>
                            <li>• "Hotel California" - Eagles</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

