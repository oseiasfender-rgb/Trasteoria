import { useState, useEffect, lazy, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { BookOpen, Music, Zap, Play, Guitar, TrendingUp, Heart, Brain, Ear, Activity, Users, Music2, Library, Settings } from 'lucide-react';
import { AppProvider, useAppContext } from './contexts/AppContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { ProgressProvider } from './contexts/ProgressContext.jsx';
import { PremiumProvider } from './contexts/PremiumContext.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { GamificationProvider } from './contexts/GamificationContext.jsx';
import ToastProvider from './components/ToastProvider.jsx';
import UpgradePrompt from './components/UpgradePrompt.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import AccessibilityProvider from './components/AccessibilityProvider.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PWAInstaller from './components/PWAInstaller.jsx';
import { SectionLoader } from './components/SectionLoader.jsx';
import { LoginModal } from './components/LoginModal.jsx';
import { UserProfile } from './components/UserProfile.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Metronome from './components/Metronome.jsx';
import { ShareButton } from './components/ShareButton.jsx';

// Lazy loading dos componentes das seções (otimização de performance)
const FundamentosSection = lazy(() => import('./components/FundamentosSection.jsx').then(m => ({ default: m.FundamentosSection })));
const HarmoniaSection = lazy(() => import('./components/HarmoniaSection.jsx').then(m => ({ default: m.HarmoniaSection })));
const EscalasArpejosSection = lazy(() => import('./components/EscalasArpejosSection.jsx').then(m => ({ default: m.EscalasArpejosSection })));
const ImprovisacaoSection = lazy(() => import('./components/ImprovisacaoSection.jsx').then(m => ({ default: m.ImprovisacaoSection })));
const EstilosSection = lazy(() => import('./components/EstilosSection.jsx').then(m => ({ default: m.EstilosSection })));
const DesenvolvimentoSection = lazy(() => import('./components/DesenvolvimentoSection.jsx').then(m => ({ default: m.DesenvolvimentoSection })));
const BandCreator = lazy(() => import('./components/BandCreator'));
const AIChordSuggester = lazy(() => import('./components/AIChordSuggester'));
const EarTraining = lazy(() => import('./components/EarTraining'));
const GuitarInput = lazy(() => import('./components/GuitarInput'));
const JamSession = lazy(() => import('./components/JamSession'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const TechniquesVideosSection = lazy(() => import('./components/TechniquesVideosSection.jsx').then(m => ({ default: m.TechniquesVideosSection })));
const AtlasViewer = lazy(() => import('./components/AtlasViewer.jsx'));
const BandCreatorV2 = lazy(() => import('./components/BandCreatorV2.jsx'));
const AudioRecorder = lazy(() => import('./components/AudioRecorder.jsx'));
const ProgressDashboard = lazy(() => import('./components/ProgressDashboard.jsx'));
const ComposicaoSection = lazy(() => import('./components/ComposicaoSection.jsx').then(m => ({ default: m.ComposicaoSection })));
const LeituraSection = lazy(() => import('./components/LeituraSection.jsx').then(m => ({ default: m.LeituraSection })));
const RepertorioSection = lazy(() => import('./components/RepertorioSection.jsx').then(m => ({ default: m.RepertorioSection })));

// Componentes originais dos Modos Gregos
import { Navigation } from './components/Navigation.jsx';
import { ModoCard } from './components/ModoCard.jsx';
import { ModoDetails } from './components/ModoDetails.jsx';
import { TonalitySelector } from './components/TonalitySelector.jsx';
import { PraticarSection } from './components/PraticarSection.jsx';
import { ExplorarSection } from './components/ExplorarSection.jsx';
import { VideoSection } from './components/VideoSection.jsx';
import { modosInfo, modosList, getModoData } from './utils/modosDataExpanded.js';
import { tonalidades } from './utils/musicTheory.js';
import './App.css';
import './animations.css';

function AppContent() {
  const [activeSection, setActiveSection] = useState('fundamentos');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showMetronome, setShowMetronome] = useState(false);
  const { user, logout } = useAuth();
  
  // Usar o Context API para gerenciar estado global
  const { currentKey, currentMode, changeKey, changeMode } = useAppContext();
  
  // Estados para a seção de Modos Gregos
  const [activeTab, setActiveTab] = useState('aprender');
  const [selectedModo, setSelectedModo] = useState(currentMode);
  const [selectedTonality, setSelectedTonality] = useState(currentKey);
  
  // Sincronizar estados locais com o Context
  useEffect(() => {
    setSelectedModo(currentMode);
  }, [currentMode]);
  
  useEffect(() => {
    setSelectedTonality(currentKey);
  }, [currentKey]);
  
  // Atualizar Context quando mudar localmente
  const handleModoChange = (modo) => {
    setSelectedModo(modo);
    changeMode(modo);
  };
  
  const handleTonalityChange = (tonality) => {
    setSelectedTonality(tonality);
    changeKey(tonality);
  };

  const currentModo = getModoData(selectedModo, selectedTonality);
  const currentTonality = tonalidades.find(t => t.key === selectedTonality);

  const renderModosGregosContent = () => {
    switch (activeTab) {
      case 'aprender':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seletor de Modos e Tonalidade */}
            <div className="lg:col-span-1">
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6">
                {/* Seletor de Tonalidade */}
                <TonalitySelector 
                  selectedTonality={selectedTonality}
                  onTonalityChange={handleTonalityChange}
                />
                
                <h2 className="text-xl font-semibold mb-4">Selecione um Modo</h2>
                <p className="text-muted-foreground mb-6">Explore os sete modos gregos</p>
                
                <div className="space-y-3">
                  {modosList.map((modoKey) => (
                    <ModoCard
                      key={modoKey}
                      modo={modosInfo[modoKey]}
                      isSelected={selectedModo === modoKey}
                      onClick={() => handleModoChange(modoKey)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Detalhes do Modo */}
            <div className="lg:col-span-2">
              <ModoDetails modo={currentModo} tonalidade={currentTonality} />
            </div>
          </div>
        );
      
      case 'praticar':
        return <PraticarSection />;
      
      case 'explorar':
        return <ExplorarSection />;
      
      case 'video':
        return <VideoSection />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Principal */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="text-center relative">
            {/* Header Controls: Theme, Metronome, Auth */}
            <div className="absolute top-4 right-4 flex items-center space-x-2">
              <button
                onClick={() => setShowMetronome(!showMetronome)}
                className="p-2 rounded-lg bg-card/50 hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground"
                title="Metrônomo"
              >
                <Activity className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="p-2 rounded-lg bg-card/50 hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground"
                title="Ranking"
              >
                <TrendingUp className="w-4 h-4" />
              </button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-purple-500" />
                  <button
                    onClick={logout}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >Sair</button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
                >Entrar</button>
              )}
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src="/logo-oficial.png" alt="TrasTeoria" className="w-12 h-12 rounded-lg" />
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TrasTeoria
              </CardTitle>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full inline-block">
              <span className="font-semibold">Método de Excelência Unificado - Todos os 12 Tons</span>
            </div>
          </CardHeader>
        </Card>

        {/* Modais e Overlays */}
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        {showLeaderboard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowLeaderboard(false)}>
            <div onClick={e => e.stopPropagation()} className="bg-card rounded-lg shadow-xl max-w-lg w-full p-6 border border-border max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">🏆 Ranking</h2>
                <button onClick={() => setShowLeaderboard(false)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>
              <Leaderboard />
            </div>
          </div>
        )}
        {showMetronome && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-card rounded-lg shadow-xl border border-border p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-sm">🎵 Metrônomo</h3>
                <button onClick={() => setShowMetronome(false)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
              </div>
              <Metronome />
            </div>
          </div>
        )}

        {/* Navegação Principal */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 mb-8 h-auto p-2">
            <TabsTrigger value="fundamentos" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Fundamentos</span>
              <span className="sm:hidden">Fund.</span>
            </TabsTrigger>
            <TabsTrigger value="harmonia" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Harmonia</span>
              <span className="sm:hidden">Harm.</span>
            </TabsTrigger>
            <TabsTrigger value="escalas" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Escalas & Arpejos</span>
              <span className="sm:hidden">Escalas</span>
            </TabsTrigger>
            <TabsTrigger value="improvisacao" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Improvisação</span>
              <span className="sm:hidden">Improv.</span>
            </TabsTrigger>
            <TabsTrigger value="estilos" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Guitar className="w-4 h-4" />
              <span>Estilos</span>
            </TabsTrigger>
            <TabsTrigger value="desenvolvimento" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Desenvolvimento</span>
              <span className="sm:hidden">Desenv.</span>
            </TabsTrigger>
            <TabsTrigger value="composicao" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Music2 className="w-4 h-4" />
              <span className="hidden sm:inline">Composição</span>
              <span className="sm:hidden">Comp.</span>
            </TabsTrigger>
            <TabsTrigger value="leitura" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Leitura</span>
              <span className="sm:hidden">Leitura</span>
            </TabsTrigger>
            <TabsTrigger value="repertorio" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Repertório</span>
              <span className="sm:hidden">Reprt.</span>
            </TabsTrigger>

            <TabsTrigger value="modos_gregos" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Modos Gregos</span>
              <span className="sm:hidden">Modos</span>
            </TabsTrigger>
            <TabsTrigger value="band_creator" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-orange-600 to-red-600">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Band Creator</span>
              <span className="sm:hidden">Band</span>
            </TabsTrigger>
            <TabsTrigger value="ai_suggester" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-600">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">AI Suggester</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="ear_training" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-blue-600 to-purple-600">
              <Ear className="w-4 h-4" />
              <span className="hidden sm:inline">Ear Training</span>
              <span className="sm:hidden">Ear</span>
            </TabsTrigger>
            <TabsTrigger value="guitar_input" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-orange-600 to-red-600">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Guitar Input</span>
              <span className="sm:hidden">Input</span>
            </TabsTrigger>
            <TabsTrigger value="jam_session" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-pink-600 to-purple-600">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Jam Session</span>
              <span className="sm:hidden">Jam</span>
            </TabsTrigger>
            <TabsTrigger value="tecnicas" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Técnicas</span>
              <span className="sm:hidden">Téc.</span>
            </TabsTrigger>
            <TabsTrigger value="atlas" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Library className="w-4 h-4" />
              <span className="hidden sm:inline">Atlas</span>
              <span className="sm:hidden">Atlas</span>
            </TabsTrigger>
            <TabsTrigger value="band_v2" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-green-600 to-teal-600">
              <Music2 className="w-4 h-4" />
              <span className="hidden sm:inline">Band Pro</span>
              <span className="sm:hidden">Band</span>
            </TabsTrigger>
            <TabsTrigger value="gravador" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Gravador</span>
              <span className="sm:hidden">Grav.</span>
            </TabsTrigger>
            <TabsTrigger value="progresso" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progresso</span>
              <span className="sm:hidden">Prog.</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-red-600 to-orange-600">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
              <span className="sm:hidden">Admin</span>
            </TabsTrigger>
          </TabsList>

          {/* Conteúdo das Seções com Lazy Loading */}
          <Suspense fallback={<SectionLoader />}>
            <TabsContent value="fundamentos">
              <FundamentosSection />
            </TabsContent>

            <TabsContent value="harmonia">
              <HarmoniaSection />
            </TabsContent>

            <TabsContent value="escalas">
              <EscalasArpejosSection />
            </TabsContent>

            <TabsContent value="improvisacao">
              <ImprovisacaoSection />
            </TabsContent>

            <TabsContent value="estilos">
              <EstilosSection />
            </TabsContent>

            <TabsContent value="desenvolvimento">
              <DesenvolvimentoSection />
            </TabsContent>

            <TabsContent value="band_creator">
              <BandCreator />
            </TabsContent>

            <TabsContent value="ai_suggester">
              <AIChordSuggester />
            </TabsContent>

            <TabsContent value="ear_training">
              <EarTraining />
            </TabsContent>

            <TabsContent value="guitar_input">
              <GuitarInput />
            </TabsContent>

            <TabsContent value="jam_session">
              <JamSession />
            </TabsContent>

            <TabsContent value="admin">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="tecnicas">
              <TechniquesVideosSection />
            </TabsContent>

            <TabsContent value="atlas">
              <AtlasViewer />
            </TabsContent>

            <TabsContent value="band_v2">
              <BandCreatorV2 />
            </TabsContent>

            <TabsContent value="gravador">
              <AudioRecorder />
            </TabsContent>

            <TabsContent value="progresso">
              <ProgressDashboard />
            </TabsContent>

            <TabsContent value="composicao">
              <ComposicaoSection />
            </TabsContent>

            <TabsContent value="leitura">
              <LeituraSection />
            </TabsContent>

            <TabsContent value="repertorio">
              <RepertorioSection />
            </TabsContent>
          </Suspense>

          <TabsContent value="modos_gregos">
            {/* Seção Original dos Modos Gregos */}
            <div className="max-w-7xl mx-auto">
              {/* Header da seção Modos Gregos */}
              <header className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                    TrasTeoria
                  </h1>
                  <p className="text-sm text-muted-foreground">Desenvolvido com Modos Gregos</p>
                </div>
                <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  Seção Especializada - Todos os 12 Tons
                </div>
              </header>

              {/* Navigation dos Modos Gregos */}
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

              {/* Content dos Modos Gregos */}
              <div>
                {renderModosGregosContent()}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <ThemeProvider>
          <AuthProvider>
            <PremiumProvider>
              <ProgressProvider>
                <AppProvider>
                  <GamificationProvider>
                    <ToastProvider />
                    <UpgradePrompt />
                    <PWAInstaller />
                    <AppContent />
                  </GamificationProvider>
                </AppProvider>
              </ProgressProvider>
            </PremiumProvider>
          </AuthProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

export default App;

