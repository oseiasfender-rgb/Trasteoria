/**
 * AppSidebar — Layout Canônico TrasTeoria v8.0
 *
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  REGRA PERMANENTE — NÃO ALTERAR SEM AUTORIZAÇÃO EXPLÍCITA       ║
 * ║  Layout aprovado em 14/05/2026                                   ║
 * ║                                                                  ║
 * ║  Estrutura obrigatória:                                          ║
 * ║    1. Sidemar LATERAL ESQUERDO (nunca substituir por abas)       ║
 * ║    2. Agrupamento por NÍVEL PEDAGÓGICO:                          ║
 * ║       FUNDAÇÃO → INICIANTE → INTERMEDIÁRIO → AVANÇADO →         ║
 * ║       FERRAMENTAS & IA                                           ║
 * ║    3. Botão de colapsar/expandir sidebar                         ║
 * ║    4. Itens de Progresso e Admin no footer                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */
import { useState } from 'react';
import {
  BookOpen, Music, Play, Guitar, TrendingUp,
  Brain, Ear, Activity, Music2, Library,
  Mic, Menu, X, Layers, Radio, Shield,
  Star, BarChart2, BookMarked, Headphones, Cpu, Heart
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// ESTRUTURA DE NAVEGAÇÃO — LAYOUT CANÔNICO DEFINITIVO
// Agrupamento por nível pedagógico
// ─────────────────────────────────────────────────────────────────────────────
const navigationGroups = [
  {
    id: 'fundacao',
    label: 'FUNDAÇÃO',
    labelColor: 'text-amber-400',
    activeColor: 'from-amber-600 to-yellow-500',
    badge: 'BASE',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    sections: [
      { id: 'metodo', label: 'Método TrasTeoria', icon: Heart },
    ],
  },
  {
    id: 'iniciante',
    label: 'INICIANTE',
    labelColor: 'text-blue-400',
    activeColor: 'from-blue-600 to-cyan-500',
    badge: null,
    badgeColor: '',
    sections: [
      { id: 'fundamentos',  label: 'Fundamentos',    icon: BookOpen },
      { id: 'leitura',      label: 'Leitura Musical', icon: BookMarked },
      { id: 'tecnicas',     label: 'Técnicas',        icon: Guitar },
      { id: 'repertorio',   label: 'Repertório',      icon: Library },
    ],
  },
  {
    id: 'intermediario',
    label: 'INTERMEDIÁRIO',
    labelColor: 'text-purple-400',
    activeColor: 'from-purple-600 to-violet-500',
    badge: null,
    badgeColor: '',
    sections: [
      { id: 'harmonia',     label: 'Harmonia',         icon: Music },
      { id: 'escalas',      label: 'Escalas & Arpejos', icon: Layers },
      { id: 'modos_gregos', label: 'Modos Gregos',     icon: Star },
      { id: 'improvisacao', label: 'Improvisação',     icon: Play },
      { id: 'estilos',      label: 'Estilos',          icon: Music2 },
    ],
  },
  {
    id: 'avancado',
    label: 'AVANÇADO',
    labelColor: 'text-orange-400',
    activeColor: 'from-orange-600 to-red-500',
    badge: null,
    badgeColor: '',
    sections: [
      { id: 'composicao',      label: 'Composição',      icon: Brain },
      { id: 'desenvolvimento', label: 'Desenvolvimento', icon: TrendingUp },
      { id: 'atlas',           label: 'Atlas Harmônico', icon: BarChart2 },
    ],
  },
  {
    id: 'ferramentas',
    label: 'FERRAMENTAS & IA',
    labelColor: 'text-green-400',
    activeColor: 'from-green-600 to-teal-500',
    badge: null,
    badgeColor: '',
    sections: [
      { id: 'band_v2',      label: 'Band Studio',  icon: Headphones },
      { id: 'ear_training', label: 'Ear Training', icon: Ear },
      { id: 'ai_suggester', label: 'Professor IA', icon: Cpu },
      { id: 'guitar_input', label: 'Guitar Input', icon: Mic },
      { id: 'jam_session',  label: 'Jam Session',  icon: Radio },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
function AppSidebar({ activeSection, onSectionChange }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  // Encontra o grupo da seção ativa para aplicar a cor correta
  const getActiveColor = (sectionId) => {
    const group = navigationGroups.find(g => g.sections.some(s => s.id === sectionId));
    return group?.activeColor || 'from-slate-600 to-slate-500';
  };

  return (
    <div
      className={`
        ${isOpen ? 'w-56' : 'w-14'}
        flex-shrink-0
        bg-gradient-to-b from-slate-800/98 to-slate-900/98
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
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#4c1d95 transparent' }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between p-3 border-b border-purple-500/20 bg-slate-800/90 backdrop-blur-sm flex-shrink-0 sticky top-0 z-10">
        {isOpen && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Guitar className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white truncate">TrasTeoria</div>
              <div className="text-[10px] text-purple-300 truncate">Método de Excelência v8</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all flex-shrink-0"
          title={isOpen ? 'Recolher menu' : 'Expandir menu'}
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* ── Navegação por Nível Pedagógico ── */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto space-y-0">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.id} className={groupIndex > 0 ? 'mt-1' : ''}>
            {/* Label de nível (apenas quando sidebar aberto) */}
            {isOpen && (
              <div className="flex items-center gap-2 px-2 pt-3 pb-1.5">
                <span className={`text-[9px] font-black tracking-[0.15em] uppercase ${group.labelColor}`}>
                  {group.label}
                </span>
                {group.badge && (
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-full border font-bold ${group.badgeColor}`}>
                    {group.badge}
                  </span>
                )}
              </div>
            )}
            {/* Separador quando sidebar fechado */}
            {!isOpen && groupIndex > 0 && (
              <div className="my-1 border-t border-slate-700/40" />
            )}
            {/* Itens do nível */}
            <div className="space-y-0.5">
              {group.sections.map((section) => {
                const SectionIcon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      transition-all duration-200 text-left
                      ${isActive
                        ? `bg-gradient-to-r ${group.activeColor} text-white shadow-lg`
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                      }
                    `}
                    title={!isOpen ? section.label : undefined}
                  >
                    <SectionIcon size={16} className="flex-shrink-0" />
                    {isOpen && (
                      <span className="text-sm font-medium truncate">{section.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Linha separadora entre grupos (exceto o último) */}
            {isOpen && groupIndex < navigationGroups.length - 1 && (
              <div className="mt-2 border-t border-slate-700/30" />
            )}
          </div>
        ))}
      </nav>

      {/* ── Footer: Progresso + Admin ── */}
      <div className="p-2 border-t border-purple-500/20 bg-slate-800/80 backdrop-blur-sm flex-shrink-0">
        {isOpen && (
          <div className="text-[9px] font-black tracking-[0.15em] uppercase text-slate-500 px-2 pt-1 pb-1.5">
            SISTEMA
          </div>
        )}
        <button
          onClick={() => handleSectionClick('progresso')}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-lg
            transition-all duration-200
            ${activeSection === 'progresso'
              ? 'bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }
          `}
          title={!isOpen ? 'Progresso' : undefined}
        >
          <Activity size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Progresso</span>}
        </button>
        <button
          onClick={() => handleSectionClick('admin')}
          className={`
            w-full flex items-center gap-3 px-3 py-2 rounded-lg mt-0.5
            transition-all duration-200
            ${activeSection === 'admin'
              ? 'bg-gradient-to-r from-slate-600 to-slate-500 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }
          `}
          title={!isOpen ? 'Admin' : undefined}
        >
          <Shield size={16} className="flex-shrink-0" />
          {isOpen && <span className="text-sm font-medium">Admin</span>}
        </button>
      </div>
    </div>
  );
}

export default AppSidebar;
