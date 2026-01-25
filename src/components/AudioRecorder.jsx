/**
 * 🎙️ AudioRecorder Component
 * Gravação de áudio do usuário com MediaRecorder API
 * Suporta overdub sobre backing tracks
 */

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Download, Trash2, Circle } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import AnimatedButton from './AnimatedButton';

const AudioRecorder = ({ 
  backingTrackRef = null, 
  onRecordingComplete = null,
  maxDuration = 300, // 5 minutos padrão
  className = ''
}) => {
  const { showInfo, showError, showSuccess } = useToast();
  
  // Estado
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const streamRef = useRef(null);
  
  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);
  
  // Formatar tempo
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Iniciar gravação
  const startRecording = async () => {
    try {
      // Solicitar permissão de microfone
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      streamRef.current = stream;
      
      // Configurar MediaRecorder
      const options = { mimeType: 'audio/webm' };
      
      // Fallback para navegadores que não suportam webm
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'audio/mp4';
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      // Eventos do MediaRecorder
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: options.mimeType });
        const url = URL.createObjectURL(audioBlob);
        
        setAudioBlob(audioBlob);
        setAudioURL(url);
        
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob);
        }
        
        // Parar stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        showSuccess('Gravação concluída!');
      };
      
      // Iniciar gravação
      mediaRecorder.start(100); // Capturar dados a cada 100ms
      setIsRecording(true);
      setDuration(0);
      
      // Timer
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1;
          
          // Parar automaticamente ao atingir duração máxima
          if (newDuration >= maxDuration) {
            stopRecording();
            showInfo(`Gravação máxima de ${formatTime(maxDuration)} atingida`);
          }
          
          return newDuration;
        });
      }, 1000);
      
      showInfo('Gravação iniciada');
      
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        showError('Permissão de microfone negada');
      } else if (error.name === 'NotFoundError') {
        showError('Microfone não encontrado');
      } else {
        showError('Erro ao acessar microfone');
      }
    }
  };
  
  // Parar gravação
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  // Pausar/Retomar gravação
  const togglePause = () => {
    if (!mediaRecorderRef.current) return;
    
    if (isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      showInfo('Gravação retomada');
    } else {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      showInfo('Gravação pausada');
    }
  };
  
  // Reproduzir gravação
  const playRecording = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
        setIsPlaying(false);
      } else {
        audioPlayerRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  // Download da gravação
  const downloadRecording = () => {
    if (!audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gravacao-${new Date().getTime()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccess('Gravação baixada!');
  };
  
  // Deletar gravação
  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    
    setAudioBlob(null);
    setAudioURL(null);
    setDuration(0);
    setIsPlaying(false);
    
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
    }
    
    showInfo('Gravação deletada');
  };
  
  return (
    <div className={`audio-recorder bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Gravador de Áudio
          </h3>
        </div>
        
        {/* Timer */}
        <div className={`text-2xl font-mono font-bold ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-600 dark:text-slate-400'}`}>
          {formatTime(duration)}
        </div>
      </div>
      
      {/* Controles de Gravação */}
      {!audioBlob && (
        <div className="flex flex-col gap-4">
          {/* Visualização de status */}
          <div className="flex items-center justify-center gap-3 py-6">
            {isRecording ? (
              <>
                <Circle className={`w-4 h-4 ${isPaused ? 'text-yellow-500' : 'text-red-500 animate-pulse'} fill-current`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {isPaused ? 'Pausado' : 'Gravando...'}
                </span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                <span className="text-sm text-slate-500 dark:text-slate-500">
                  Pronto para gravar
                </span>
              </>
            )}
          </div>
          
          {/* Botões de controle */}
          <div className="flex gap-3 justify-center">
            {!isRecording ? (
              <AnimatedButton
                onClick={startRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
              >
                <Mic className="w-5 h-5" />
                Iniciar Gravação
              </AnimatedButton>
            ) : (
              <>
                <AnimatedButton
                  onClick={togglePause}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
                >
                  <Pause className="w-5 h-5" />
                  {isPaused ? 'Retomar' : 'Pausar'}
                </AnimatedButton>
                
                <AnimatedButton
                  onClick={stopRecording}
                  className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
                >
                  <Square className="w-5 h-5" />
                  Parar
                </AnimatedButton>
              </>
            )}
          </div>
          
          {/* Informações */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-500 mt-2">
            Duração máxima: {formatTime(maxDuration)}
          </div>
        </div>
      )}
      
      {/* Player de Gravação */}
      {audioBlob && (
        <div className="flex flex-col gap-4">
          {/* Audio element (hidden) */}
          <audio
            ref={audioPlayerRef}
            src={audioURL}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
          
          {/* Visualização */}
          <div className="flex items-center justify-center gap-3 py-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Circle className="w-4 h-4 text-green-500 fill-current" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Gravação concluída - {formatTime(duration)}
            </span>
          </div>
          
          {/* Controles de reprodução */}
          <div className="flex gap-3 justify-center flex-wrap">
            <AnimatedButton
              onClick={playRecording}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pausar' : 'Reproduzir'}
            </AnimatedButton>
            
            <AnimatedButton
              onClick={downloadRecording}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            >
              <Download className="w-5 h-5" />
              Baixar
            </AnimatedButton>
            
            <AnimatedButton
              onClick={deleteRecording}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              Deletar
            </AnimatedButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;

