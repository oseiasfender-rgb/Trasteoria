/**
 * 📚 Interactive Tutorial Component
 * Sistema de tutoriais interativos passo-a-passo
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, CheckCircle, Circle, BookOpen } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import AnimatedCard from './AnimatedCard';

const InteractiveTutorial = ({ tutorialId, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  
  // Tutoriais disponíveis
  const tutorials = {
    ai_suggester: {
      title: '🤖 AI Chord Suggester',
      description: 'Aprenda a usar o sugeridor inteligente de acordes',
      steps: [
        {
          title: 'Bem-vindo!',
          content: 'O AI Chord Suggester usa inteligência artificial para sugerir o próximo acorde baseado em teoria musical e padrões harmônicos comuns.',
          action: 'Vamos começar!'
        },
        {
          title: 'Adicione o Primeiro Acorde',
          content: 'Clique em uma das sugestões iniciais (C, Am, G, F, etc.) para adicionar o primeiro acorde da sua progressão.',
          highlight: '.suggestion-button',
          action: 'Adicionar acorde'
        },
        {
          title: 'Veja as Sugestões',
          content: 'A IA analisa seu acorde e sugere 5 próximos acordes com porcentagem de confiança. Quanto maior a %, mais comum é essa progressão.',
          highlight: '.suggestions-list',
          action: 'Entendi!'
        },
        {
          title: 'Construa sua Progressão',
          content: 'Continue adicionando acordes. A IA se adapta ao seu estilo e sugere acordes cada vez mais adequados.',
          action: 'Continuar'
        },
        {
          title: 'Toque sua Progressão',
          content: 'Clique em "Tocar" para ouvir sua progressão completa. Use "Limpar" para recomeçar.',
          highlight: '.play-button',
          action: 'Finalizar'
        }
      ]
    },
    
    ear_training: {
      title: '🎵 Ear Training',
      description: 'Aprenda a treinar seu ouvido musical',
      steps: [
        {
          title: 'Treinamento Auditivo',
          content: 'O Ear Training ajuda você a reconhecer intervalos, acordes e escalas apenas ouvindo.',
          action: 'Começar'
        },
        {
          title: 'Escolha o Tipo',
          content: 'Selecione entre Intervalos, Acordes ou Escalas. Cada tipo treina uma habilidade diferente.',
          highlight: '.exercise-type-selector',
          action: 'Próximo'
        },
        {
          title: 'Selecione a Dificuldade',
          content: 'Escolha de 1 (fácil) a 4 (expert). Comece pelo nível 1 se for iniciante.',
          highlight: '.difficulty-selector',
          action: 'Próximo'
        },
        {
          title: 'Toque o Exercício',
          content: 'Clique em "Tocar Exercício" e ouça atentamente. Você pode tocar quantas vezes quiser.',
          highlight: '.play-exercise-button',
          action: 'Próximo'
        },
        {
          title: 'Selecione a Resposta',
          content: 'Escolha entre as 4 opções qual você acha que é a correta. Clique em "Verificar" para ver o resultado.',
          action: 'Próximo'
        },
        {
          title: 'Veja suas Estatísticas',
          content: 'Acompanhe seu progresso com estatísticas de acertos, erros e precisão. Quanto mais praticar, melhor ficará!',
          highlight: '.stats-panel',
          action: 'Finalizar'
        }
      ]
    },
    
    guitar_input: {
      title: '🎸 Guitar Input',
      description: 'Aprenda a usar o detector de notas em tempo real',
      steps: [
        {
          title: 'Detector de Notas',
          content: 'O Guitar Input captura o som da sua guitarra (ou voz) e detecta a nota tocada em tempo real.',
          action: 'Começar'
        },
        {
          title: 'Permita o Microfone',
          content: 'Clique em "Iniciar Microfone" e permita o acesso ao microfone quando o navegador solicitar.',
          highlight: '.mic-button',
          action: 'Próximo'
        },
        {
          title: 'Toque uma Nota',
          content: 'Toque uma nota limpa e sustentada na guitarra. Evite tocar várias notas ao mesmo tempo.',
          action: 'Próximo'
        },
        {
          title: 'Veja a Detecção',
          content: 'A nota detectada aparece em grande destaque, junto com a frequência em Hz.',
          highlight: '.note-display',
          action: 'Próximo'
        },
        {
          title: 'Afinação (Cents)',
          content: 'Os "cents" mostram se você está afinado. Verde = perfeito, Amarelo = quase, Vermelho = desafinado.',
          highlight: '.cents-indicator',
          action: 'Próximo'
        },
        {
          title: 'Dicas Importantes',
          content: 'Use fones de ouvido para evitar feedback. Toque notas limpas e sustentadas para melhor detecção.',
          action: 'Finalizar'
        }
      ]
    },
    
    band_creator: {
      title: '🎵 Band Creator',
      description: 'Aprenda a criar sua própria banda virtual',
      steps: [
        {
          title: 'Sua Banda Virtual',
          content: 'O Band Creator permite criar acompanhamentos completos com bateria, baixo e piano em 144 estilos diferentes.',
          action: 'Começar'
        },
        {
          title: 'Escolha o Gênero',
          content: 'Selecione entre Rock, Jazz, Blues, Pop, Funk e muito mais. Cada gênero tem estilos únicos.',
          highlight: '.genre-selector',
          action: 'Próximo'
        },
        {
          title: 'Escolha o Estilo',
          content: 'Dentro de cada gênero, escolha um estilo específico (ex: Rock Classic, Jazz Swing, Blues Shuffle).',
          highlight: '.style-selector',
          action: 'Próximo'
        },
        {
          title: 'Ajuste o BPM',
          content: 'Defina a velocidade da música entre 40 e 240 BPM. Use os botões ou o slider.',
          highlight: '.bpm-control',
          action: 'Próximo'
        },
        {
          title: 'Mixer de 4 Canais',
          content: 'Ajuste o volume de cada instrumento (Drums, Bass, Piano) e o Master. Use Mute para silenciar.',
          highlight: '.mixer-panel',
          action: 'Próximo'
        },
        {
          title: 'Toque sua Banda!',
          content: 'Clique em "Play" para iniciar. A banda tocará automaticamente com mudanças de acordes.',
          highlight: '.play-button',
          action: 'Finalizar'
        }
      ]
    }
  };
  
  const tutorial = tutorials[tutorialId];
  
  if (!tutorial || !isVisible) {
    return null;
  }
  
  const step = tutorial.steps[currentStep];
  const isLastStep = currentStep === tutorial.steps.length - 1;
  const isFirstStep = currentStep === 0;
  
  // Marcar passo como completo
  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };
  
  // Próximo passo
  const nextStep = () => {
    markStepComplete();
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Passo anterior
  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Pular tutorial
  const handleSkip = () => {
    setIsVisible(false);
    if (onSkip) {
      onSkip();
    }
  };
  
  // Completar tutorial
  const handleComplete = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
    
    // Salvar conclusão
    const completed = JSON.parse(localStorage.getItem('completedTutorials') || '[]');
    if (!completed.includes(tutorialId)) {
      completed.push(tutorialId);
      localStorage.setItem('completedTutorials', JSON.stringify(completed));
    }
  };
  
  // Verificar se tutorial já foi completado
  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedTutorials') || '[]');
    if (completed.includes(tutorialId)) {
      setIsVisible(false);
    }
  }, [tutorialId]);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <AnimatedCard delay={0.1}>
        <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-t-2xl relative">
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">{tutorial.title}</h2>
            </div>
            <p className="text-purple-100">{tutorial.description}</p>
          </div>
          
          {/* Progress */}
          <div className="px-6 py-4 bg-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">
                Passo {currentStep + 1} de {tutorial.steps.length}
              </span>
              <span className="text-sm text-slate-300">
                {Math.round(((currentStep + 1) / tutorial.steps.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tutorial.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">{step.content}</p>
            
            {/* Steps Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {tutorial.steps.map((_, index) => (
                <div
                  key={index}
                  className={`
                    flex-1 h-1 rounded-full transition-all
                    ${index <= currentStep ? 'bg-blue-500' : 'bg-slate-600'}
                  `}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-6 pb-6 flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Pular tutorial
            </button>
            
            <div className="flex gap-3">
              {!isFirstStep && (
                <AnimatedButton
                  variant="outline"
                  onClick={prevStep}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  Anterior
                </AnimatedButton>
              )}
              
              <AnimatedButton
                variant="primary"
                onClick={nextStep}
                icon={isLastStep ? <CheckCircle className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              >
                {step.action || (isLastStep ? 'Finalizar' : 'Próximo')}
              </AnimatedButton>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default InteractiveTutorial;

