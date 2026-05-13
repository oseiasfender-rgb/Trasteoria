import { useState } from 'react';
import {
  BookOpen, Music, Zap, Play, Guitar, TrendingUp,
  Brain, Ear, Activity, Music2, Library, Settings,
  Mic, Menu, X, Heart, ChevronDown, ChevronRight,
  Layers, Radio, Video, Shield
} from 'lucide-react';

// Estrutura de navegação organizada em grupos didáticos
const navigationGroups = [
  {
    id: 'metodo',
    label: 'Método TrasTeoria',
    icon: Heart,
    color: 'from-amber-500 to-yellow-500',
    badge: 'Fundação',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    sections: [
      { id: 'metodo', label: 'Método TrasTeoria', icon: Heart },
    ],
  },
  {
    id: 'aprender',
    label: 'Aprender',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-400',
    badge: '8 módulos',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    sections: [
      { id: 'fundamentos', label: 'Fundamentos', icon: BookOpen },
      { id: 'harmonia', label: 'Harmonia', icon: Music },
      { id: 'escalas', label: 'Escalas & Arpejos', icon: Guitar },
      { id: 'improvisacao', label: 'Improvisação', icon: Play },
      { id: 'modos_gregos', label: 'Modos Gregos', icon: Layers },
      { id: 'tecnicas', label: 'Técnicas', icon: Mic },
      { id: 'leitura', label: 'Leitura', icon: BookOpen },
      { id: 'repertorio', label: 'Repertório', icon: Library },
    ],
  },
  {
    id: 'praticar',
    label: 'Praticar',
    icon: Guitar,
    color: 'from-purple-500 to-purple-400',
    badge: '6 módulos',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    sections: [
      { id: 'ear_training', label: 'Ear Training', icon: Ear },
      { id: 'guitar_input', label: 'Guitar Input', icon: Guitar },
      { id: 'jam_session', label: 'Jam Session', icon: Radio },
      { id: 'atlas', label: 'Atlas', icon: Library },
      { id: 'desenvolvimento', label: 'Desenvolvimento', icon: TrendingUp },
      { id: 'estilos', label: 'Estilos', icon: Music2 },
    ],
  },
  {
    id: 'criar',
    label: 'Criar',
    icon: Music,
    color: 'from-orange-500 to-red-500',
    badge: '6 módulos',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    sections: [
      { id: 'band_creator', label: 'Band Creator', icon: Music },
      { id: 'band_v2', label: 'Studio Pro', icon: Music2 },
      { id: 'composicao', label: 'Composição', icon: Brain },
      { id: 'gravador', label: 'Gravador', icon: Mic },
      { id: 'ai_suggester', label: 'IA Sugestões', icon: Brain },
      { id: 'videos', label: 'Vídeos', icon: Video },
    ],
  },
  {
    id: 'progresso_group',
    label: 'IA & Progresso',
    icon: Activity,
    color: 'from-green-500 to-teal-500',
    badge: '4 módulos',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
    sections: [
      { id: 'progresso', label: 'Progresso', icon: Activity },
      { id: 'admin', label: 'Admin', icon: Shield },
    ],
  },
];

function AppSidebar({ activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState(() => {
    const initial = {};
    navigationGroups.forEach(group => {
      const hasActive = group.sections.some(s => s.id === activeSection);
      initial[group.id] = hasActive || group.id === 'aprender';
    });
    return initial;
  });

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
    const parentGroup = navigationGroups.find(g => g.sections.some(s => s.id === sectionId));
    if (parentGroup) {
      setExpandedGroups(prev => ({ ...prev, [parentGroup.id]: true }));
    }
  };

  return (
    <div
      className={`
        ${isOpen ? 'w-64' : 'w-16'}
        flex-shrink-0
        bg-gradient-to-b from-slate-800/95 to-slate-900/95
        backdrop-blur-xl
        border-r border-purple-500/20
        transition-all duration-300 ease-in-out
        overflow-y-auto overflow-x-hidden
        shadow-2xl
        flex flex-col
        h-screen
        sticky top-0
        z-40
      `}
    >
      {/* Header da Sidebar */}
      <div className="p-3 border-b border-purple-500/20 sticky top-0 bg-slate-800/90 backdrop-blur-sm z-10 flex-shrink-0">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Guitar className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white text-sm truncate block">TrasTeoria</span>
                <span className="text-purple-300 text-xs truncate block">v8.0</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white flex-shrink-0"
            title={isOpen ? 'Recolher menu' : 'Expandir menu'}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Navegação em Grupos */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigationGroups.map((group) => {
          const GroupIcon = group.icon;
          const isGroupExpanded = expandedGroups[group.id];
          const isGroupActive = group.sections.some(s => s.id === activeSection);

          // Seção única (Método TrasTeoria) — botão direto
          if (group.sections.length === 1) {
            const section = group.sections[0];
            const SectionIcon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={group.id}
                onClick={() => handleSectionClick(section.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200 text-left
                  ${isActive
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                `}
                title={!isOpen ? group.label : undefined}
              >
                <SectionIcon size={18} className="flex-shrink-0" />
                {isOpen && (
                  <div className="flex items-center justify-between w-full min-w-0">
                    <span className="text-sm font-semibold truncate">{group.label}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full border flex-shrink-0 ml-1 ${group.badgeColor}`}>
                      {group.badge}
                    </span>
                  </div>
                )}
              </button>
            );
          }

          // Grupos com múltiplas seções — accordion
          return (
            <div key={group.id}>
              <button
                onClick={() => isOpen ? toggleGroup(group.id) : handleSectionClick(group.sections[0].id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200 text-left
                  ${isGroupActive
                    ? 'bg-slate-700/60 text-white border border-white/10'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }
                `}
                title={!isOpen ? group.label : undefined}
              >
                <GroupIcon size={18} className="flex-shrink-0" />
                {isOpen && (
                  <div className="flex items-center justify-between w-full min-w-0">
                    <span className="text-sm font-semibold truncate">{group.label}</span>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full border ${group.badgeColor}`}>
                        {group.badge}
                      </span>
                      {isGroupExpanded
                        ? <ChevronDown size={14} className="text-slate-400" />
                        : <ChevronRight size={14} className="text-slate-400" />
                      }
                    </div>
                  </div>
                )}
              </button>

              {/* Seções do Grupo */}
              {isOpen && isGroupExpanded && (
                <div className="ml-3 mt-1 space-y-0.5 border-l border-slate-700/50 pl-3">
                  {group.sections.map((section) => {
                    const SectionIcon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className={`
                          w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg
                          transition-all duration-200 text-left text-sm
                          ${isActive
                            ? `bg-gradient-to-r ${group.color} text-white shadow-md`
                            : 'text-slate-400 hover:bg-slate-700/40 hover:text-slate-200'
                          }
                        `}
                      >
                        <SectionIcon size={15} className="flex-shrink-0" />
                        <span className="truncate">{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-purple-500/20 bg-slate-800/80 backdrop-blur-sm flex-shrink-0">
        <button
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-lg
            bg-gradient-to-r from-purple-500/10 to-pink-500/10
            hover:from-purple-500/20 hover:to-pink-500/20
            text-purple-300 hover:text-purple-200
            transition-all duration-200
          `}
          title="Configurações"
        >
          <Settings size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Configurações</span>}
        </button>
      </div>
    </div>
  );
}

export default AppSidebar;
