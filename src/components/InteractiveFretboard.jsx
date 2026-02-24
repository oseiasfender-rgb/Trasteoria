import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext.jsx';

export function InteractiveFretboard({ modo, tonalidade }) {
  const { playNote: playNoteContext, playScale: playScaleContext, audioInitialized } = useAppContext();
  const [selectedFret, setSelectedFret] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightMode, setHighlightMode] = useState('graus'); // 'graus', 'notas', 'intervalos'
  
  // Configuração do braço da guitarra (afinação padrão)
  const strings = [
    { note: 'E', octave: 4, openFret: 64 }, // 1ª corda (Mi agudo)
    { note: 'B', octave: 3, openFret: 59 }, // 2ª corda (Si)
    { note: 'G', octave: 3, openFret: 55 }, // 3ª corda (Sol)
    { note: 'D', octave: 3, openFret: 50 }, // 4ª corda (Ré)
    { note: 'A', octave: 2, openFret: 45 }, // 5ª corda (Lá)
    { note: 'E', octave: 2, openFret: 40 }  // 6ª corda (Mi grave)
  ];

  const frets = Array.from({ length: 13 }, (_, i) => i); // 0 a 12 casas
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Função para converter nota MIDI para frequência
  const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

  // Função para obter a nota em uma casa específica
  const getNoteAtFret = (stringIndex, fretNumber) => {
    const string = strings[stringIndex];
    const midiNote = string.openFret + fretNumber;
    const noteIndex = (midiNote - 12) % 12; // C = 0
    return {
      name: noteNames[noteIndex],
      midi: midiNote,
      frequency: midiToFreq(midiNote)
    };
  };

  // Função para obter o grau da nota no modo atual
  const getNoteGrade = (noteName) => {
    if (!modo || !modo.escala) return null;
    const noteIndex = modo.escala.findIndex(note => note === noteName);
    return noteIndex !== -1 ? noteIndex + 1 : null;
  };

  // Função para verificar se a nota está no modo atual
  const isNoteInMode = (noteName) => {
    return modo && modo.escala && modo.escala.includes(noteName);
  };

  // Função para obter a cor do grau
  const getGradeColor = (grade) => {
    const colors = {
      1: 'bg-red-500',      // Tônica
      2: 'bg-orange-500',   // Segunda
      3: 'bg-yellow-500',   // Terça
      4: 'bg-green-500',    // Quarta
      5: 'bg-blue-500',     // Quinta
      6: 'bg-indigo-500',   // Sexta
      7: 'bg-purple-500'    // Sétima
    };
    return colors[grade] || 'bg-gray-500';
  };

  // Função para tocar uma nota pelo braço
  const playNoteFromFretboard = async (frequency, duration = 1000) => {
    if (isMuted) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const audioContext = audioContextRef.current;
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Para o oscillador anterior se estiver tocando
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'sine';

      // Envelope ADSR simples
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);

      oscillatorRef.current = oscillator;

      oscillator.onended = () => {
        oscillatorRef.current = null;
      };

    } catch (error) {
    }
  };

  // Função para tocar a escala completa
  const playScale = async () => {
    if (!modo || !modo.escala || isMuted) return;

    setIsPlaying(true);
    
    for (let i = 0; i < modo.escala.length; i++) {
      const noteName = modo.escala[i];
      const noteIndex = noteNames.indexOf(noteName);
      const frequency = midiToFreq(60 + noteIndex); // C4 como base
      
      await new Promise(resolve => {
        playNoteFromFretboard(frequency, 500);
        setTimeout(resolve, 600);
      });
    }
    
    setIsPlaying(false);
  };

  // Função para lidar com clique na casa
  const handleFretClick = (stringIndex, fretNumber) => {
    const note = getNoteAtFret(stringIndex, fretNumber);
    setSelectedFret({ string: stringIndex, fret: fretNumber, note });
    playNoteFromFretboard(note.frequency);
  };

  // Renderizar uma casa do braço
  const renderFret = (stringIndex, fretNumber) => {
    const note = getNoteAtFret(stringIndex, fretNumber);
    const grade = getNoteGrade(note.name);
    const isInMode = isNoteInMode(note.name);
    const isSelected = selectedFret && 
      selectedFret.string === stringIndex && 
      selectedFret.fret === fretNumber;

    let content = '';
    let bgColor = 'bg-gray-700';
    let textColor = 'text-gray-400';

    if (isInMode) {
      switch (highlightMode) {
        case 'graus':
          content = grade?.toString() || '';
          bgColor = getGradeColor(grade);
          textColor = 'text-white';
          break;
        case 'notas':
          content = note.name;
          bgColor = 'bg-primary';
          textColor = 'text-white';
          break;
        case 'intervalos':
          const intervalNames = ['T', '2', '3', '4', '5', '6', '7'];
          content = intervalNames[grade - 1] || '';
          bgColor = getGradeColor(grade);
          textColor = 'text-white';
          break;
      }
    }

    return (
      <button
        key={`${stringIndex}-${fretNumber}`}
        className={`
          w-8 h-8 rounded-full border-2 text-xs font-bold
          transition-all duration-200 hover:scale-110
          ${isSelected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-gray-600'}
          ${bgColor} ${textColor}
          ${isInMode ? 'hover:brightness-110' : 'hover:bg-gray-600'}
        `}
        onClick={() => handleFretClick(stringIndex, fretNumber)}
        title={`${note.name} - ${grade ? `Grau ${grade}` : 'Fora do modo'}`}
      >
        {content}
      </button>
    );
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Diagrama Interativo do Braço</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={playScale}
              disabled={isPlaying}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Tocando...' : 'Tocar Escala'}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Clique nas casas para ouvir as notas. {modo ? `Modo: ${modo.nome}` : ''}
        </p>
      </CardHeader>
      <CardContent>
        {/* Controles de visualização */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Modo de Visualização:</p>
          <div className="flex space-x-2">
            <Button
              variant={highlightMode === 'graus' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setHighlightMode('graus')}
            >
              Graus
            </Button>
            <Button
              variant={highlightMode === 'notas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setHighlightMode('notas')}
            >
              Notas
            </Button>
            <Button
              variant={highlightMode === 'intervalos' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setHighlightMode('intervalos')}
            >
              Intervalos
            </Button>
          </div>
        </div>

        {/* Legenda dos graus */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Legenda dos Graus:</p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(grade => (
              <Badge key={grade} className={`${getGradeColor(grade)} text-white`}>
                {grade}° Grau
              </Badge>
            ))}
          </div>
        </div>

        {/* Braço da guitarra */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-700 p-4 rounded-lg">
          {/* Números das casas */}
          <div className="flex justify-center mb-2">
            <div className="w-8"></div> {/* Espaço para as cordas */}
            {frets.map(fret => (
              <div key={fret} className="w-8 text-center text-xs text-amber-200">
                {fret}
              </div>
            ))}
          </div>

          {/* Cordas e casas */}
          {strings.map((string, stringIndex) => (
            <div key={stringIndex} className="flex items-center mb-2">
              {/* Indicador da corda */}
              <div className="w-8 text-xs text-amber-200 text-center">
                {string.note}
              </div>
              
              {/* Casas */}
              <div className="flex space-x-1">
                {frets.map(fret => renderFret(stringIndex, fret))}
              </div>
            </div>
          ))}
        </div>

        {/* Informações da nota selecionada */}
        {selectedFret && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Nota Selecionada:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Nota:</span> {selectedFret.note.name}
              </div>
              <div>
                <span className="text-muted-foreground">Frequência:</span> {selectedFret.note.frequency.toFixed(1)} Hz
              </div>
              <div>
                <span className="text-muted-foreground">Corda:</span> {strings[selectedFret.string].note}
              </div>
              <div>
                <span className="text-muted-foreground">Casa:</span> {selectedFret.fret}
              </div>
              {getNoteGrade(selectedFret.note.name) && (
                <div>
                  <span className="text-muted-foreground">Grau no modo:</span> {getNoteGrade(selectedFret.note.name)}°
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

