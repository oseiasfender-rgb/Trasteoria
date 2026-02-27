import { useState } from 'react';
import { Card, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { BookOpen, Music, Settings } from 'lucide-react';

function AppContent() {
  const [activeSection, setActiveSection] = useState('fundamentos');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Principal */}
        <Card className="mb-8 bg-card/50 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="text-center relative">
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

        {/* Navegação Principal */}
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 mb-8 h-auto p-2">
            <TabsTrigger value="fundamentos" className="flex items-center space-x-2 p-3">
              <BookOpen className="w-4 h-4" />
              <span>Fundamentos</span>
            </TabsTrigger>
            <TabsTrigger value="harmonia" className="flex items-center space-x-2 p-3">
              <Music className="w-4 h-4" />
              <span>Harmonia</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2 p-3 bg-gradient-to-r from-red-600 to-orange-600">
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          {/* Conteúdo das Seções */}
          <TabsContent value="fundamentos">
            <Card>
              <CardHeader>
                <CardTitle>🎸 Fundamentos</CardTitle>
              </CardHeader>
              <div className="p-6">
                <p className="text-lg">Seção de Fundamentos - Em desenvolvimento</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="harmonia">
            <Card>
              <CardHeader>
                <CardTitle>🎵 Harmonia</CardTitle>
              </CardHeader>
              <div className="p-6">
                <p className="text-lg">Seção de Harmonia - Em desenvolvimento</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Admin</CardTitle>
              </CardHeader>
              <div className="p-6">
                <p className="text-lg">Painel Admin - Em desenvolvimento</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
