```javascript
import { useState } from 'react';
import { Card, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { BookOpen, Music, Settings } from 'lucide-react';function AppContent() {
  const [activeSection, setActiveSection] = useState('fundamentos');return (
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
            <div className="bg-gradient-to-r from-
