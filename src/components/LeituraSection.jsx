import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import { useToast } from '../hooks/useToast.js';
import { BookOpen, Play, Check, X, RotateCcw, Trophy, Target } from 'lucide-react';

export function LeituraSection() {
  const { playNote, currentOctave } = useAppContext();
  const { showSuccess, showError, showInfo } = useToast();
  
  const [activeTab, setActiveTab] = useState('notas');
  const [currentExercise, setCurrentExercise] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState('iniciante');

  // Notas do braço da guitarra
  const fretboardNotes = {
    'Corda 6 (E)': ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
    'Corda 5 (A)': ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'],
    'Corda 4 (D)': ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
    'Corda 3 (G)': ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'],
    'Corda 2 (B)': ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    'Corda 1 (E)': ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
  };

  // Cifras comuns
  const commonChords = [
    { symbol: 'C', name: 'Dó Maior' },
    { symbol: 'Cm', name: 'Dó Menor' },
    { symbol: 'C7', name: 'Dó com Sétima' },
    { symbol: 'Cmaj7', name: 'Dó com Sétima Maior' },
    { symbol: 'Dm', name: 'Ré Menor' },
    { symbol: 'D7', name: 'Ré com Sétima' },
    { symbol: 'Em', name: 'Mi Menor' },
    { symbol: 'E7', name: 'Mi com Sétima' },
    { symbol: 'F', name: 'Fá Maior' },
    { symbol: 'Fmaj7', name: 'Fá com Sétima Maior' },
    { symbol: 'G', name: 'Sol Maior' },
    { symbol: 'G7', name: 'Sol com Sétima' },
    { symbol: 'Am', name: 'Lá Menor' },
    { symbol: 'Am7', name: 'Lá Menor com Sétima' },
  ];

  // Gerar exercício de notas no braço
  const generateFretboardExercise = () => {
    const strings = Object.keys(fretboardNotes);
    const randomString = strings[Math.floor(Math.random() * strings.length)];
    const maxFret = level === 'iniciante' ? 5 : level === 'intermediario' ? 9 : 12;
    const randomFret = Math.floor(Math.random() * maxFret);
    const correctNote = fretboardNotes[randomString][randomFret];
    
    setCurrentExercise({
      type: 'fretboard',
      string: randomString,
      fret: randomFret,
      correctAnswer: correctNote,
      question: `Qual nota está na ${randomString}, traste ${randomFret}?`
    });
    setUserAnswer('');
  };

  // Gerar exercício de cifras
  const generateChordExercise = () => {
    const randomChord = commonChords[Math.floor(Math.random() * commonChords.length)];
    
    setCurrentExercise({
      type: 'chord',
      correctAnswer: randomChord.name,
      symbol: randomChord.symbol,
      question: `O que significa a cifra "${randomChord.symbol}"?`,
      options: [
        randomChord.name,
        ...commonChords
          .filter(c => c.name !== randomChord.name)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(c => c.name)
      ].sort(() => 0.5 - Math.random())
    });
    setUserAnswer('');
  };

  // Verificar resposta
  const checkAnswer = async () => {
    if (!currentExercise || !userAnswer) {
      showInfo('Selecione uma resposta');
      return;
    }

    const isCorrect = userAnswer === currentExercise.correctAnswer;
    
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (isCorrect) {
      setStreak(prev => prev + 1);
      showSuccess('Correto! 🎉');
      
      // Tocar a nota correta
      if (currentExercise.type === 'fretboard') {
        await playNote(currentExercise.correctAnswer, currentOctave, 1.0);
      }
      
      // Gerar próximo exercício após 1 segundo
      setTimeout(() => {
        if (currentExercise.type === 'fretboard') {
          generateFretboardExercise();
        } else {
          generateChordExercise();
        }
      }, 1000);
    } else {
      setStreak(0);
      showError(`Incorreto. A resposta era: ${currentExercise.correctAnswer}`);
    }
  };

  // Iniciar exercício
  useEffect(() => {
    if (activeTab === 'notas' && !currentExercise) {
      generateFretboardExercise();
    } else if (activeTab === 'cifras' && !currentExercise) {
      generateChordExercise();
    }
  }, [activeTab]);

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-green-400" />
              <div>
                <CardTitle className="text-3xl">Leitura Musical</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Pratique leitura de notas e cifras
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Precisão</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">{streak}</div>
                  <div className="text-xs text-muted-foreground">Sequência</div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold">{score.correct}/{score.total}</div>
                <div className="text-sm text-muted-foreground">Acertos</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold capitalize">{level}</div>
                <div className="text-sm text-muted-foreground">Nível</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Mudar Nível</label>
              <div className="flex space-x-2">
                {['iniciante', 'intermediario', 'avancado'].map(lvl => (
                  <Button
                    key={lvl}
                    variant={level === lvl ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setLevel(lvl);
                      setScore({ correct: 0, total: 0 });
                      setStreak(0);
                      showInfo(`Nível alterado para ${lvl}`);
                    }}
                  >
                    {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-2">
          <TabsTrigger role="tab" value="notas">Notas no Braço</TabsTrigger>
          <TabsTrigger role="tab" value="cifras">Cifras</TabsTrigger>
        </TabsList>

        {/* Notas no Braço */}
        <TabsContent value="notas" className="space-y-4">
          {currentExercise && currentExercise.type === 'fretboard' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {currentExercise.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Visual do braço */}
                <div className="bg-gradient-to-r from-amber-900 to-amber-700 p-6 rounded-lg">
                  <div className="text-center text-white mb-4">
                    <div className="text-xl font-bold">{currentExercise.string}</div>
                    <div className="text-3xl font-bold mt-2">Traste {currentExercise.fret}</div>
                  </div>
                </div>

                {/* Opções de resposta */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(note => (
                    <Button
                      key={note}
                      variant={userAnswer === note ? 'default' : 'outline'}
                      className="h-16 text-lg font-bold"
                      onClick={() => setUserAnswer(note)}
                    >
                      {note}
                    </Button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button className="flex-1" size="lg" onClick={checkAnswer}>
                    <Check className="w-5 h-5 mr-2" />
                    Verificar
                  </Button>
                  <Button variant="outline" size="lg" onClick={generateFretboardExercise}>
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Pular
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Cifras */}
        <TabsContent value="cifras" className="space-y-4">
          {currentExercise && currentExercise.type === 'chord' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {currentExercise.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cifra em destaque */}
                <div className="bg-primary/10 p-8 rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary">
                      {currentExercise.symbol}
                    </div>
                  </div>
                </div>

                {/* Opções de resposta */}
                <div className="grid grid-cols-1 gap-3">
                  {currentExercise.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={userAnswer === option ? 'default' : 'outline'}
                      className="h-16 text-lg justify-start"
                      onClick={() => setUserAnswer(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button className="flex-1" size="lg" onClick={checkAnswer}>
                    <Check className="w-5 h-5 mr-2" />
                    Verificar
                  </Button>
                  <Button variant="outline" size="lg" onClick={generateChordExercise}>
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Pular
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

