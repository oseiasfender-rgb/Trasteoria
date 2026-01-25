import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Play, Pause, Volume2, VolumeX, Maximize, FileText, Download } from 'lucide-react';

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        // Pausar todos os outros vídeos e áudios da página
        document.querySelectorAll('video, audio').forEach(media => {
          if (media !== videoRef.current) {
            media.pause();
          }
        });
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const videoContent = [
    {
      id: 'principal',
      titulo: 'Modos Gregos: Uma Jornada Musical',
      descricao: 'Vídeo cinematográfico explorando a essência dos Modos Gregos',
      duracao: '3:45',
      tipo: 'Documentário',
      arquivo: '/modos_gregos_final_corrigido_v4.mp4'
    }
  ];

  const tutoriaisComplementares = [
    {
      id: 'jonio',
      titulo: 'Modo Jônio na Prática',
      descricao: 'Aplicações práticas do modo mais familiar',
      duracao: 'Em Breve',
      tipo: 'Tutorial'
    },
    {
      id: 'dorico',
      titulo: 'Explorando o Dórico',
      descricao: 'A melancolia sofisticada do modo dórico',
      duracao: 'Em Breve',
      tipo: 'Tutorial'
    },
    {
      id: 'frigio',
      titulo: 'Frígio: Som Exótico',
      descricao: 'Criando atmosferas misteriosas com o frígio',
      duracao: 'Em Breve',
      tipo: 'Tutorial'
    },
    {
      id: 'lidio',
      titulo: 'Lídio Cinematográfico',
      descricao: 'O som etéreo das trilhas sonoras',
      duracao: 'Em Breve',
      tipo: 'Tutorial'
    },
    {
      id: 'mixolidio',
      titulo: 'Mixolídio no Blues',
      descricao: 'O groove essencial do blues e rock',
      duracao: 'Em Breve',
      tipo: 'Tutorial'
    },
    {
      id: 'eolio',
      titulo: 'Eólio: Menor Natural',
      descricao: 'A base da música menor ocidental',
      duracao: 'Em Breve',
      tipo: 'Tutorial'
    },
    {
      id: 'locrio',
      titulo: 'Lócrio: Tensão Máxima',
      descricao: 'O modo mais instável e suas aplicações',
      duracao: 'Em Breve',
      tipo: 'Tutorial'
    }
  ];

  const transcricaoTexto = `Antes da melodia, havia o silêncio. E do silêncio nasceu a vibração. Uma única nota que se multiplicou em um universo de possibilidades. Esta é a história de como a música encontrou sua alma.

No coração deste universo, encontramos uma estrutura fundamental: a escala maior. Sete notas, uma família de sons que se relacionam em perfeita harmonia. Mas o que acontece quando mudamos nosso ponto de vista? Quando começamos nossa jornada não do primeiro grau, mas do segundo, do terceiro, ou de qualquer outro ponto desta escala?

Assim nasceram os Modos Gregos. Não como escalas diferentes, mas como perspectivas distintas da mesma verdade musical. Cada modo carrega sua própria personalidade, sua própria cor emocional.

Jônio, o familiar, o lar. A alegria pura da escala maior, onde tudo faz sentido e o mundo parece em ordem.

Dórico, o melancólico sofisticado. Menor, mas com uma luz de esperança que brilha através da sexta maior.

Frígio, o exótico, o misterioso. Com sua segunda menor, nos transporta para terras distantes e culturas ancestrais.

Lídio, o sonhador. Sua quarta aumentada cria um som suspenso, etéreo, como se flutuássemos entre as nuvens.

Mixolídio, o groove, o blues. A sétima menor que dá aquele tempero especial, aquela pegada que faz o corpo balançar.

Eólio, a sombra da alma. O menor natural, puro e melancólico, onde as lágrimas encontram sua melodia.

Lócrio, a tensão que precede a resolução. Instável, inquieto, sempre buscando um lugar para descansar.

Cada modo é uma janela para uma dimensão diferente da experiência humana. Juntos, eles formam o espectro completo das emoções musicais, um arco-íris sonoro que pinta as mais diversas paisagens da alma.

Esta é a magia dos Modos Gregos: transformar uma simples escala em sete universos distintos, cada um com suas próprias regras, suas próprias histórias para contar.`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Seção Vídeo</CardTitle>
          <p className="text-muted-foreground">
            Conteúdo audiovisual para aprofundar seu conhecimento
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="principal" className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-3">
          <TabsTrigger role="tab" value="principal">Vídeo Principal</TabsTrigger>
          <TabsTrigger role="tab" value="tutoriais">Tutoriais</TabsTrigger>
          <TabsTrigger role="tab" value="transcricao">Transcrição</TabsTrigger>
        </TabsList>

        {/* Vídeo Principal */}
        <TabsContent value="principal" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{videoContent[0].titulo}</CardTitle>
                  <p className="text-muted-foreground mt-1">{videoContent[0].descricao}</p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary">{videoContent[0].tipo}</Badge>
                  <Badge variant="outline">{videoContent[0].duracao}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src={videoContent[0].arquivo} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                
                {/* Controles customizados */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  {/* Barra de progresso */}
                  <div 
                    className="w-full h-2 bg-white/20 rounded-full mb-3 cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  
                  {/* Controles */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={togglePlay}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </Button>
                      
                      <span className="text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      onClick={() => videoRef.current?.requestFullscreen()}
                    >
                      <Maximize size={20} />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-muted-foreground">
                  Uma jornada cinematográfica através dos sete modos gregos, 
                  explorando suas características únicas e aplicações musicais.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tutoriais */}
        <TabsContent value="tutoriais" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutoriaisComplementares.map((tutorial) => (
              <Card key={tutorial.id} className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{tutorial.tipo}</Badge>
                    <Badge variant="outline">{tutorial.duracao}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tutorial.titulo}</CardTitle>
                  <p className="text-muted-foreground text-sm">{tutorial.descricao}</p>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center mb-4">
                    <Play className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <Button disabled className="w-full">
                    Em Breve
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transcrição */}
        <TabsContent value="transcricao" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Transcrição do Vídeo</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Copiar Texto
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {transcricaoTexto}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

