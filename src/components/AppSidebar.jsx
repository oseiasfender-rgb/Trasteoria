import { useState } from 'react';
import { BookOpen, Music, Zap, Play, Guitar, TrendingUp, Heart, Brain, Ear, Activity, Users, Music2, Library, Settings, Mic, Menu, X, Home } from 'lucide-react';
import { Button } from './ui/button';

export function AppSidebar({ activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(true);

  const sections = [
    { id: 'metodo', label: 'Método TrasTeoria', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'fundamentals', label: 'Fundamentos', icon: Zap, color: 'bg-yellow-500' },
    { id: 'harmonia', label: 'Harmonia', icon: Music, color: 'bg-purple-500' },
    { id: 'escalas', label: 'Escalas & Arpejos', icon: Guitar, color: 'bg-green-500' },
    { id: 'improvisacao', label: 'Improvisação', icon: Play, color: 'bg-pink-500' },
    { id: 'estilos', label: 'Estilos', icon: Music2, color: 'bg-indigo-500' },
    { id: 'desenvolvimento', label: 'Desenvolvimento', icon: TrendingUp, color: 'bg-cyan-500' },
    { id: 'tecnicas', label: 'Técnicas', icon: Mic, color: 'bg-red-500' },
    { id: 'atlas', label: 'Atlas', icon: Library, color: 'bg-orange-500' },
    { id: 'studio', label: 'Studio Pro', icon: Music, color: 'bg-green-600' },
    { id: 'ear-training', label: 'Ear Training', icon: Ear, color: 'bg-blue-600' },
    { id: 'jam-session', label: 'Jam Session', icon: Play, color: 'bg-purple-600' },
    { id: 'gravador', label: 'Gravador', icon: Mic, color: 'bg-red-600' },
    { id: 'progresso', label: 'Progresso', icon: Activity, color: 'bg-teal-500' },
    { id: 'composicao', label: 'Composição', icon: Music, color: 'bg-pink-600' },
    { id: 'leitura', label: 'Leitura', icon: BookOpen, color: 'bg-blue-700' },
    { id: 'repertorio', label: 'Repertório', icon: Library, color: 'bg-yellow-600' },
    { id: 'modos-gregos', label: 'Modos Gregos', icon: Guitar, color: 'bg-green-700' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div
        className={`
          ${isOpen ? 'w-64' : 'w-20'} 
          bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl
          border-r border-cyan-500/20
          transition-all duration-300 ease-in-out
          overflow-y-auto
          shadow-2xl
        `}
      >
        {/* Header da Sidebar */}
        <div className="p-4 border-b border-cyan-500/20 sticky top-0 bg-slate-800/80 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Guitar className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white text-sm">TrasTeoria</span>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Navegação */}
        <nav className="p-3 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg
                transition-all duration-200
                ${activeSection === section.id
                  ? `${section.color} text-white shadow-lg`
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }
              `}
              title={section.label}
            >
              <section.icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium truncate">{section.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-cyan-500/20 bg-slate-800/80 backdrop-blur-sm">
          <button
            className={`
              w-full flex items-center gap-3 px-3 py-2 rounded-lg
              bg-gradient-to-r from-cyan-500/20 to-purple-500/20
              hover:from-cyan-500/30 hover:to-purple-500/30
              text-cyan-300 hover:text-cyan-200
              transition-all duration-200
            `}
            title="Configurações"
          >
            <Settings size={20} className="flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Configurações</span>}
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-slate-800/80 to-purple-800/80 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              {sections.find(s => s.id === activeSection)?.label || 'TrasTeoria'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">v8.0</span>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Placeholder para conteúdo */}
            <div className="text-slate-300 text-center py-12">
              <p>Conteúdo da seção: {sections.find(s => s.id === activeSection)?.label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
