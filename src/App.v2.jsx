import { useState, useEffect, lazy, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { BookOpen, Music, Zap, Play, Guitar, TrendingUp, Heart, Brain, Ear, Activity, Users, Music2, Library, Settings } from 'lucide-react';
import { AppProvider, useAppContext } from './contexts/AppContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { ProgressProvider } from './contexts/ProgressContext.jsx';
import { PremiumProvider } from './contexts/PremiumContext.jsx';
import ToastProvider from './components/ToastProvider.jsx';
import UpgradePrompt from './components/UpgradePrompt.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import AccessibilityProvider from './components/AccessibilityProvider.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import PWAInstaller from './components/PWAInstaller.jsx';

import { SectionLoader } from './components/SectionLoader.jsx';

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
import { modosInfo, modosList, getModoData } from './data/modosDataExpanded.js';
import { tonalidades } from './data/musicTheory.js';
import './App.css';
import './animations.css';

function AppContent() {
  const [activeSection, setActiveSection] = useState('fundamentos');
  const { currentKey, currentMode, changeKey, changeMode } = useAppContext();
  const [activeTab, setActiveTab] = useState('aprender');
  const [selectedModo, setSelectedModo] = useState(currentMode);
  const [selectedTonality, setSelectedTonality] = useState(currentKey);
  
  useEffect(() => { setSelectedModo(currentMode); }, [currentMode]);
  useEffect(() => { setSelectedTonality(currentKey); }, [currentKey]);
  
  const handleModoChange = (modo) => { setSelectedModo(modo); changeMode(modo); };
  const handleTonalityChange = (tonality) => { setSelectedTonality(tonality); changeKey(tonality); };

  const currentModo = getModoData(selectedModo, selectedTonality);
  const currentTonality = tonalidades.find(t => t.key === selectedTonality);

  const renderModosGregosContent = () => {
    switch (activeTab) {
      case 'aprender':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-6">
                <TonalitySelector selectedTonality={selectedTonality} onTonalityChange={handleTonalityChange} />
                <h2 className="text-xl font-semibold mb-4">Selecione um Modo</h2>
                <p className="text-muted-foreground mb-6">Explore os sete modos gregos</p>
                <div className="space-y-3">
                  {modosList.map((modoKey) => (
                    <ModoCard key={modoKey} modo={modosInfo[modoKey]} isSelected={selectedModo === modoKey} onClick={() => handleModoChange(modoKey)} />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <ModoDetails modo={currentModo} tonalidade={currentTonality} />
            </div>
          </div>
        );
      case 'praticar': return <PraticarSection />;
      case 'explorar': return <ExplorarSection />;
      case 'video': return <VideoSection />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="text-center relative">
            <div className="absolute top-4 right-4 flex items-center space-x-2"><ThemeToggle /></div>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src="/logo-oficial.png" alt="TrasTeoria" className="w-12 h-12 rounded-lg" />
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">TrasTeoria</CardTitle>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full inline-block">
              <span className="font-semibold">Método de Excelência Unificado - Todos os 12 Tons</span>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2 mb-8 h-auto p-2">
            <TabsTrigger value="fundamentos" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><BookOpen className="w-4 h-4" /><span>Fundamentos</span></TabsTrigger>
            <TabsTrigger value="harmonia" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><Music className="w-4 h-4" /><span>Harmonia</span></TabsTrigger>
            <TabsTrigger value="escalas" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><Zap className="w-4 h-4" /><span>Escalas</span></TabsTrigger>
            <TabsTrigger value="improvisacao" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><Play className="w-4 h-4" /><span>Improvisação</span></TabsTrigger>
            <TabsTrigger value="estilos" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><Guitar className="w-4 h-4" /><span>Estilos</span></TabsTrigger>
            <TabsTrigger value="desenvolvimento" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><TrendingUp className="w-4 h-4" /><span>Desenvolvimento</span></TabsTrigger>
            <TabsTrigger value="composicao" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><Music2 className="w-4 h-4" /><span>Composição</span></TabsTrigger>
            <TabsTrigger value="leitura" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><BookOpen className="w-4 h-4" /><span>Leitura</span></TabsTrigger>
            <TabsTrigger value="repertorio" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><Library className="w-4 h-4" /><span>Repertório</span></TabsTrigger>
            <TabsTrigger value="modos_gregos" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm"><Heart className="w-4 h-4" /><span>Modos Gregos</span></TabsTrigger>
            <TabsTrigger value="band_creator" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-orange-600 to-red-600"><Music className="w-4 h-4" /><span>Band Creator</span></TabsTrigger>
            <TabsTrigger value="ai_suggester" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-purple-600 to-blue-600"><Brain className="w-4 h-4" /><span>AI Suggester</span></TabsTrigger>
            <TabsTrigger value="ear_training" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-blue-600 to-purple-600"><Ear className="w-4 h-4" /><span>Ear Training</span></TabsTrigger>
            <TabsTrigger value="guitar_input" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-orange-600 to-red-600"><Activity className="w-4 h-4" /><span>Guitar Input</span></TabsTrigger>
            <TabsTrigger value="jam_session" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-pink-600 to-purple-600"><Users className="w-4 h-4" /><span>Jam Session</span></TabsTrigger>
            <TabsTrigger value="admin" className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-3 text-xs md:text-sm bg-gradient-to-r from-red-600 to-orange-600"><Settings className="w-4 h-4" /><span>Admin</span></TabsTrigger>
          </TabsList>

          <Suspense fallback={<SectionLoader />}>
            <TabsContent value="fundamentos"><FundamentosSection /></TabsContent>
            <TabsContent value="harmonia"><HarmoniaSection /></TabsContent>
            <TabsContent value="escalas"><EscalasArpejosSection /></TabsContent>
            <TabsContent value="improvisacao"><ImprovisacaoSection /></TabsContent>
            <TabsContent value="estilos"><EstilosSection /></TabsContent>
            <TabsContent value="desenvolvimento"><DesenvolvimentoSection /></TabsContent>
            <TabsContent value="band_creator"><BandCreator /></TabsContent>
            <TabsContent value="ai_suggester"><AIChordSuggester /></TabsContent>
            <TabsContent value="ear_training"><EarTraining /></TabsContent>
            <TabsContent value="guitar_input"><GuitarInput /></TabsContent>
            <TabsContent value="jam_session"><JamSession /></TabsContent>
            <TabsContent value="admin"><AdminDashboard /></TabsContent>
            <TabsContent value="composicao"><ComposicaoSection /></TabsContent>
            <TabsContent value="leitura"><LeituraSection /></TabsContent>
            <TabsContent value="repertorio"><RepertorioSection /></TabsContent>
          </Suspense>

          <TabsContent value="modos_gregos">
            <div className="max-w-7xl mx-auto">
              <header className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">TrasTeoria</h1>
                </div>
                <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">Seção Especializada - Todos os 12 Tons</div>
              </header>
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
              <div>{renderModosGregosContent()}</div>
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
          <PremiumProvider>
            <ProgressProvider>
              <AppProvider>
                <ToastProvider />
                <UpgradePrompt />
                <PWAInstaller />
                <AppContent />
              </AppProvider>
            </ProgressProvider>
          </PremiumProvider>
        </ThemeProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

export default App;
