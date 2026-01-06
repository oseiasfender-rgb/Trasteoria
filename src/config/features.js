/**
 * 🎯 Feature Flags - Free vs Premium
 * Configuração de funcionalidades por plano
 */

export const FEATURES = {
  FREE: {
    // Seções disponíveis
    modosGrecos: true,
    harmoniaBasica: true,
    tecnicas: true,
    ritmo: true,
    escalasArpejos: false, // Premium
    improvisacao: 'limited', // Limitado
    estilos: true,
    desenvolvimento: true,
    videos: 'limited', // 3 vídeos
    composicao: false, // Premium
    leitura: false, // Premium
    repertorio: 'limited', // 3 músicas
    
    // Funcionalidades
    backingTracks: 1, // Apenas 1 backing track
    recording: false, // Gravação é Premium
    allVideos: false, // Apenas alguns vídeos
    allSongs: false, // Apenas algumas músicas
    composition: false, // Composição é Premium
    gamifiedReading: false, // Leitura gamificada é Premium
    advancedStats: false, // Estatísticas avançadas são Premium
    exportAudio: false, // Exportar áudio é Premium
    
    // Limites
    maxBackingTracks: 1,
    maxVideos: 3,
    maxSongs: 3,
    maxRecordingDuration: 0, // Sem gravação
    maxSavedRecordings: 0,
  },
  
  PREMIUM: {
    // Seções disponíveis
    modosGrecos: true,
    harmoniaBasica: true,
    tecnicas: true,
    ritmo: true,
    escalasArpejos: true,
    improvisacao: true,
    estilos: true,
    desenvolvimento: true,
    videos: true,
    composicao: true,
    leitura: true,
    repertorio: true,
    
    // Funcionalidades
    backingTracks: 'all', // Todos os backing tracks
    recording: true, // Gravação liberada
    allVideos: true, // Todos os vídeos
    allSongs: true, // Todas as músicas
    composition: true, // Composição liberada
    gamifiedReading: true, // Leitura gamificada liberada
    advancedStats: true, // Estatísticas avançadas liberadas
    exportAudio: true, // Exportar áudio liberado
    
    // Limites
    maxBackingTracks: Infinity,
    maxVideos: Infinity,
    maxSongs: Infinity,
    maxRecordingDuration: 600, // 10 minutos
    maxSavedRecordings: 50,
  }
};

// Nomes amigáveis das features
export const FEATURE_NAMES = {
  recording: 'Gravação de Áudio',
  allBackingTracks: 'Todos os Backing Tracks',
  composition: 'Composição Completa',
  gamifiedReading: 'Leitura Gamificada',
  advancedStats: 'Estatísticas Avançadas',
  allVideos: 'Todos os Vídeos',
  allSongs: 'Todas as Músicas',
  exportAudio: 'Exportação de Áudio',
  escalasArpejos: 'Escalas e Arpejos Completos',
};

// Descrições das features
export const FEATURE_DESCRIPTIONS = {
  recording: 'Grave sua prática e ouça seu progresso',
  allBackingTracks: 'Acesso a todos os 5 backing tracks profissionais',
  composition: 'Crie e salve suas próprias progressões de acordes',
  gamifiedReading: 'Exercícios interativos de leitura com pontuação',
  advancedStats: 'Acompanhe seu progresso com métricas detalhadas',
  allVideos: 'Acesso a todos os 10 vídeos educacionais',
  allSongs: 'Biblioteca completa com 10 músicas para praticar',
  exportAudio: 'Baixe suas gravações em alta qualidade',
  escalasArpejos: 'Acesso completo a escalas e arpejos avançados',
};

// Benefícios do Premium
export const PREMIUM_BENEFITS = [
  {
    icon: '🎙️',
    title: 'Gravação de Áudio',
    description: 'Grave até 10 minutos e salve 50 gravações'
  },
  {
    icon: '🎵',
    title: 'Todos os Backing Tracks',
    description: '5 backing tracks profissionais (Blues, Jazz, Rock, Funk, Bossa)'
  },
  {
    icon: '🎬',
    title: 'Todos os Vídeos',
    description: '10 vídeos educacionais de técnicas fundamentais'
  },
  {
    icon: '🎸',
    title: 'Repertório Completo',
    description: '10 músicas populares com cifras e dicas'
  },
  {
    icon: '✍️',
    title: 'Composição',
    description: 'Crie e salve suas próprias progressões'
  },
  {
    icon: '📖',
    title: 'Leitura Gamificada',
    description: 'Exercícios interativos com sistema de pontuação'
  },
  {
    icon: '🎯',
    title: 'Escalas Avançadas',
    description: 'Acesso completo a escalas e arpejos'
  },
  {
    icon: '📊',
    title: 'Estatísticas Avançadas',
    description: 'Acompanhe seu progresso com métricas detalhadas'
  },
];

// Preços (mock - em produção viria de API)
export const PRICING = {
  monthly: {
    price: 29.90,
    currency: 'BRL',
    period: 'mês',
    savings: null,
  },
  yearly: {
    price: 299.90,
    currency: 'BRL',
    period: 'ano',
    savings: '16%', // ~R$ 59 de economia
  },
};

export default FEATURES;

