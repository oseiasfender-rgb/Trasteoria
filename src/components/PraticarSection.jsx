import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Play, Pause, RotateCcw, CheckCircle, XCircle, Volume2 } from 'lucide-react';
import { modosInfo, modosList } from '../data/modosDataExpanded.js';
import { gerarEscala, tonalidades } from '../data/musicTheory.js';

export function PraticarSection() {
  const [exercicioAtivo, setExercicioAtivo] = useState('identificacao');
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [exercicioIniciado, setExercicioIniciado] = useState(false);
  const [questoes, setQuestoes] = useState([]);

  // Gerar questões para identificação de modos
  const gerarQuestoesIdentificacao = () => {
    const novasQuestoes = [];
    for (let i = 0; i < 10; i++) {
      const modoAleatorio = modosList[Math.floor(Math.random() * modosList.length)];
      const tonalidadeAleatoria = tonalidades[Math.floor(Math.random() * tonalidades.length)];
      const escala = gerarEscala(tonalidadeAleatoria.key, modoAleatorio);
      
      novasQuestoes.push({
        id: i,
        modo: modoAleatorio,
        tonalidade: tonalidadeAleatoria,
        escala: escala,
        opcoes: embaralharArray([...modosList]).slice(0, 4),
        respondida: false,
        correta: false
      });
    }
    setQuestoes(novasQuestoes);
  };

  // Gerar questões para campo harmônico
  const gerarQuestoesCampoHarmonico = () => {
    const novasQuestoes = [];
    for (let i = 0; i < 8; i++) {
      const modoAleatorio = modosList[Math.floor(Math.random() * modosList.length)];
      const tonalidadeAleatoria = tonalidades[Math.floor(Math.random() * tonalidades.length)];
      const grauAleatorio = Math.floor(Math.random() * 7) + 1;
      
      novasQuestoes.push({
        id: i,
        modo: modoAleatorio,
        tonalidade: tonalidadeAleatoria,
        grau: grauAleatorio,
        tipo: 'campo_harmonico',
        respondida: false,
        correta: false
      });
    }
    setQuestoes(novasQuestoes);
  };

  const embaralharArray = (array) => {
    const novoArray = [...array];
    for (let i = novoArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }
    return novoArray;
  };

  const iniciarExercicio = (tipo) => {
    setExercicioAtivo(tipo);
    setQuestaoAtual(0);
    setPontuacao(0);
    setRespostas([]);
    setExercicioIniciado(true);
    
    if (tipo === 'identificacao') {
      gerarQuestoesIdentificacao();
    } else if (tipo === 'campo_harmonico') {
      gerarQuestoesCampoHarmonico();
    }
  };

  const responderQuestao = (resposta) => {
    const questao = questoes[questaoAtual];
    const correta = resposta === questao.modo;
    
    const novaResposta = {
      questao: questaoAtual,
      resposta,
      correta,
      modoCorreto: questao.modo
    };
    
    setRespostas([...respostas, novaResposta]);
    
    if (correta) {
      setPontuacao(pontuacao + 1);
    }
    
    // Atualizar questão
    const novasQuestoes = [...questoes];
    novasQuestoes[questaoAtual] = {
      ...questao,
      respondida: true,
      correta
    };
    setQuestoes(novasQuestoes);
    
    // Próxima questão após 1.5s
    setTimeout(() => {
      if (questaoAtual < questoes.length - 1) {
        setQuestaoAtual(questaoAtual + 1);
      } else {
        setExercicioIniciado(false);
      }
    }, 1500);
  };

  const reiniciarExercicio = () => {
    setExercicioIniciado(false);
    setQuestaoAtual(0);
    setPontuacao(0);
    setRespostas([]);
    setQuestoes([]);
  };

  const exercicios = [
    {
      id: 'identificacao',
      titulo: 'Identificação de Modos',
      descricao: 'Identifique o modo baseado na escala apresentada',
      dificuldade: 'Intermediário',
      questoes: 10
    },
    {
      id: 'campo_harmonico',
      titulo: 'Campo Harmônico',
      descricao: 'Complete o campo harmônico dos modos',
      dificuldade: 'Avançado',
      questoes: 8
    },
    {
      id: 'intervalos',
      titulo: 'Intervalos Característicos',
      descricao: 'Identifique os intervalos que definem cada modo',
      dificuldade: 'Básico',
      questoes: 12
    }
  ];

  if (exercicioIniciado && questoes.length > 0) {
    const questao = questoes[questaoAtual];
    const progresso = ((questaoAtual + 1) / questoes.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header do Exercício */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">
                {exercicios.find(e => e.id === exercicioAtivo)?.titulo}
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Badge variant="outline">
                  {questaoAtual + 1} / {questoes.length}
                </Badge>
                <Badge variant="secondary">
                  Pontuação: {pontuacao}
                </Badge>
              </div>
            </div>
            <Progress value={progresso} className="w-full" />
          </CardHeader>
        </Card>

        {/* Questão Atual */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">
              Questão {questaoAtual + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {exercicioAtivo === 'identificacao' && (
              <>
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Qual modo corresponde à seguinte escala em {questao.tonalidade.nome}?
                  </p>
                  <div className="text-2xl font-mono tracking-wider bg-muted/50 p-4 rounded-lg">
                    {questao.escala.join(' - ')}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {questao.opcoes.map((opcao) => (
                    <Button
                      key={opcao}
                      variant={questao.respondida ? 
                        (opcao === questao.modo ? 'default' : 'outline') : 
                        'outline'
                      }
                      className={`p-4 h-auto ${
                        questao.respondida && opcao === questao.modo ? 
                        'bg-green-500 hover:bg-green-600' : ''
                      }`}
                      onClick={() => !questao.respondida && responderQuestao(opcao)}
                      disabled={questao.respondida}
                    >
                      <div className="text-center">
                        <div className="font-semibold">
                          {modosInfo[opcao]?.nome}
                        </div>
                        <div className="text-sm opacity-75">
                          {modosInfo[opcao]?.descricao}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </>
            )}

            {questao.respondida && (
              <div className="text-center">
                {questao.correta ? (
                  <div className="flex items-center justify-center space-x-2 text-green-500">
                    <CheckCircle size={24} />
                    <span className="font-semibold">Correto!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-red-500">
                    <XCircle size={24} />
                    <span className="font-semibold">
                      Incorreto. A resposta correta é: {modosInfo[questao.modo]?.nome}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Botão de Reiniciar */}
        <div className="text-center">
          <Button variant="outline" onClick={reiniciarExercicio}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar Exercício
          </Button>
        </div>
      </div>
    );
  }

  // Resultado Final
  if (!exercicioIniciado && respostas.length > 0) {
    const percentual = Math.round((pontuacao / respostas.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Exercício Concluído!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-6xl font-bold text-primary">
              {percentual}%
            </div>
            <div className="text-xl">
              Você acertou {pontuacao} de {respostas.length} questões
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button onClick={() => iniciarExercicio(exercicioAtivo)}>
                Tentar Novamente
              </Button>
              <Button variant="outline" onClick={reiniciarExercicio}>
                Escolher Outro Exercício
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Menu de Exercícios
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Seção Praticar</CardTitle>
          <p className="text-muted-foreground">
            Exercícios interativos para dominar os Modos Gregos
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercicios.map((exercicio) => (
          <Card key={exercicio.id} className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">{exercicio.titulo}</CardTitle>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">{exercicio.dificuldade}</Badge>
                <Badge variant="outline">{exercicio.questoes} questões</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {exercicio.descricao}
              </p>
              <Button 
                className="w-full" 
                onClick={() => iniciarExercicio(exercicio.id)}
                disabled={exercicio.id !== 'identificacao'}
              >
                <Play className="w-4 h-4 mr-2" />
                {exercicio.id === 'identificacao' ? 'Iniciar' : 'Em Breve'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

