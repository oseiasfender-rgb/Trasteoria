import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function ScaleAnimationPlayer({ modo, tonalidade }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [perspective3D, setPerspective3D] = useState(true);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const animationRef = useRef(null);

  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  // Configuração do braço da guitarra
  const strings = [
    { note: 'E', octave: 4, openFret: 64 },
    { note: 'B', octave: 3, openFret: 59 },
    { note: 'G', octave: 3, openFret: 55 },
    { note: 'D', octave: 3, openFret: 50 },
    { note: 'A', octave: 2, openFret: 45 },
    { note: 'E', octave: 2, openFret: 40 }
  ];

  const getNoteAtFret = (stringIndex, fretNumber) => {
    const string = strings[stringIndex];
    const midiNote = string.openFret + fretNumber;
    const noteIndex = (midiNote - 12) % 12;
    const octave = Math.floor((midiNote - 12) / 12);
    
    return {
      name: notes[noteIndex],
      octave,
      midi: midiNote,
      frequency: midiToFreq(midiNote),
      fullName: `${notes[noteIndex]}${octave}`
    };
  };

  const playNote = async (frequency, duration = 500) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);

      oscillatorRef.current = oscillator;
    } catch (error) {
      console.error('Erro ao tocar nota:', error);
    }
  };

  useEffect(() => {
    if (!isPlaying || !modo || !modo.escala) return;

    const playNextNote = () => {
      if (currentNoteIndex < modo.escala.length) {
        const noteName = modo.escala[currentNoteIndex];
        const noteIndex = notes.indexOf(noteName);
        const frequency = midiToFreq(60 + noteIndex);
        
        playNote(frequency, animationSpeed * 0.8);
        
        setCurrentNoteIndex(prev => prev + 1);
        animationRef.current = setTimeout(playNextNote, animationSpeed);
      } else {
        setIsPlaying(false);
        setCurrentNoteIndex(0);
      }
    };

    animationRef.current = setTimeout(playNextNote, 100);

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isPlaying, currentNoteIndex, modo, animationSpeed]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    } else {
      setCurrentNoteIndex(0);
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentNoteIndex(0);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Encontrar as posições das notas no braço
  const getNotesPositions = () => {
    if (!modo || !modo.escala) return [];
    
    const positions = [];
    
    strings.forEach((string, stringIndex) => {
      for (let fret = 0; fret <= 24; fret++) {
        const note = getNoteAtFret(stringIndex, fret);
        if (modo.escala.includes(note.name)) {
          positions.push({
            string: stringIndex,
            fret,
            note: note.name,
            fullName: note.fullName,
            isCurrentNote: currentNoteIndex < modo.escala.length && 
                          modo.escala[currentNoteIndex] === note.name
          });
        }
      }
    });

    return positions;
  };

  const notePositions = getNotesPositions();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-sm border-cyan-500/50">
        <CardHeader>
          <CardTitle className="text-2xl">🎵 Animação Sequencial de Escalas</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Toque escalas com animação visual no braço. {perspective3D ? '3D' : '2D'} - {modo ? `Modo: ${modo.nome}` : 'Selecione um modo'}
          </p>
        </CardHeader>
      </Card>

      {/* Controles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Controles de Reprodução</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              size="lg"
              onClick={handlePlayPause}
              className="flex-1"
              variant={isPlaying ? 'destructive' : 'default'}
              disabled={!modo}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2" size={20} />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="mr-2" size={20} />
                  Reproduzir
                </>
              )}
            </Button>
            <Button size="lg" onClick={handleReset} variant="outline">
              <RotateCcw size={20} />
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Velocidade: {animationSpeed}ms
            </label>
            <input
              type="range"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              min={200}
              max={1000}
              step={50}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="perspective3d"
              checked={perspective3D}
              onChange={(e) => setPerspective3D(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="perspective3d" className="text-sm font-medium cursor-pointer">
              Ativar Perspectiva 3D
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Braço com Animação 3D */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Braço Interativo - Animação</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 p-6 rounded-lg shadow-lg border-2 border-amber-950"
            style={{
              perspective: perspective3D ? '1000px' : 'none',
              transform: perspective3D ? 'rotateX(5deg) rotateY(-5deg)' : 'none',
              transformStyle: perspective3D ? 'preserve-3d' : 'flat'
            }}
          >
            {/* Números das casas */}
            <div className="flex overflow-x-auto pb-2">
              <div className="w-12 flex-shrink-0"></div>
              {Array.from({ length: 25 }, (_, i) => i).map(fret => (
                <div key={fret} className="w-6 text-center text-xs text-amber-200 flex-shrink-0">
                  {fret % 5 === 0 ? fret : ''}
                </div>
              ))}
            </div>

            {/* Cordas com animação */}
            <div className="overflow-x-auto">
              {strings.map((string, stringIndex) => (
                <div key={stringIndex} className="flex items-center mb-3">
                  <div className="w-12 text-xs text-amber-200 text-center font-bold flex-shrink-0">
                    {string.note}
                  </div>
                  
                  <div className="flex space-x-0.5">
                    {Array.from({ length: 25 }, (_, fret) => {
                      const note = getNoteAtFret(stringIndex, fret);
                      const isInMode = modo && modo.escala && modo.escala.includes(note.name);
                      const isCurrentNote = isInMode && 
                        currentNoteIndex < modo.escala.length &&
                        modo.escala[currentNoteIndex] === note.name;

                      return (
                        <div
                          key={`${stringIndex}-${fret}`}
                          className={`
                            w-6 h-6 rounded-full border-2 text-xs font-bold flex items-center justify-center
                            transition-all duration-100
                            ${isCurrentNote
                              ? 'bg-yellow-400 border-yellow-200 scale-125 shadow-lg ring-2 ring-yellow-300 animate-pulse'
                              : isInMode
                              ? 'bg-blue-500 border-blue-300 hover:scale-110'
                              : 'bg-gray-700 border-gray-600'
                            }
                            ${perspective3D && isCurrentNote ? 'transform -translate-z-10' : ''}
                          `}
                          style={{
                            transform: perspective3D && isCurrentNote 
                              ? 'translateZ(20px) scale(1.3)' 
                              : 'none',
                            boxShadow: isCurrentNote 
                              ? '0 0 20px rgba(250, 204, 21, 0.8)' 
                              : 'none'
                          }}
                          title={note.fullName}
                        >
                          {isInMode ? (currentNoteIndex < modo.escala.length && modo.escala[currentNoteIndex] === note.name ? '●' : '○') : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações de Progresso */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nota Atual:</span>
              <p className="font-medium text-lg">
                {currentNoteIndex < modo?.escala?.length 
                  ? modo.escala[currentNoteIndex] 
                  : '—'}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Progresso:</span>
              <p className="font-medium text-lg">
                {currentNoteIndex} / {modo?.escala?.length || 0}
              </p>
            </div>
          </div>

          {/* Notas da Escala */}
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Sequência da Escala:</p>
            <div className="flex flex-wrap gap-2">
              {modo?.escala?.map((note, index) => (
                <div
                  key={`${note}-${index}`}
                  className={`
                    px-3 py-1 rounded-full text-sm font-bold transition-all
                    ${index === currentNoteIndex
                      ? 'bg-yellow-500 text-black scale-110'
                      : index < currentNoteIndex
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                    }
                  `}
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
