/**
 * 📊 Progress Dashboard
 * Dashboard de estatísticas e progresso do usuário
 */

import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { Award, Clock, Music, TrendingUp, Target, Flame } from 'lucide-react';
import ProgressBar from './ProgressBar';
import AnimatedCard from './AnimatedCard';

const ProgressDashboard = () => {
  const { progress, stats, getSectionProgress, getTotalProgress } = useProgress();
  
  const totalProgress = getTotalProgress();
  
  // Seções — todas as seções de conteúdo do sistema v8.0 por nível pedagógico
  const sectionGroups = [
    {
      group: 'Fundação',
      color: 'text-amber-400',
      sections: [
        { id: 'metodo', name: 'Método TrasTeoria', icon: '📖' },
      ]
    },
    {
      group: 'Iniciante',
      color: 'text-blue-400',
      sections: [
        { id: 'fundamentos',  name: 'Fundamentos',     icon: '📚' },
        { id: 'leitura',      name: 'Leitura Musical', icon: '🎼' },
        { id: 'tecnicas',     name: 'Técnicas',         icon: '🎸' },
        { id: 'repertorio',   name: 'Repertório',       icon: '📋' },
      ]
    },
    {
      group: 'Intermediário',
      color: 'text-purple-400',
      sections: [
        { id: 'harmonia',     name: 'Harmonia',          icon: '🎵' },
        { id: 'escalas',      name: 'Escalas & Arpejos', icon: '🎸' },
        { id: 'modos_gregos', name: 'Modos Gregos',      icon: '🏛️' },
        { id: 'improvisacao', name: 'Improvisação',      icon: '🎭' },
        { id: 'estilos',      name: 'Estilos',           icon: '🎹' },
      ]
    },
    {
      group: 'Avançado',
      color: 'text-orange-400',
      sections: [
        { id: 'composicao',      name: 'Composição',      icon: '🧠' },
        { id: 'desenvolvimento', name: 'Desenvolvimento', icon: '📈' },
        { id: 'atlas',           name: 'Atlas Harmônico', icon: '📊' },
      ]
    },
  ];
  const sections = sectionGroups.flatMap(g => g.sections);
  
  // Formatar tempo
  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <AnimatedCard delay={0.1}>
        <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">📊 Seu Progresso</h2>
          <p className="text-green-100">Acompanhe sua jornada musical</p>
        </div>
      </AnimatedCard>
      
      {/* Progresso Total */}
      <AnimatedCard delay={0.2}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6 text-green-500" />
              Progresso Total
            </h3>
            <span className="text-3xl font-bold text-green-500">
              {totalProgress.percentage}%
            </span>
          </div>
          
          <ProgressBar 
            progress={totalProgress.percentage} 
            color="green" 
            height="lg"
            showPercentage={false}
          />
          
          <div className="mt-3 text-sm text-slate-400 text-center">
            {totalProgress.completed} de {totalProgress.total} exercícios completados
          </div>
        </div>
      </AnimatedCard>
      
      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatedCard delay={0.3}>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-slate-400">Tempo Total</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatTime(stats.totalPracticeTime)}
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={0.35}>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-slate-400">Sequência</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.streak} dias
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={0.4}>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Music className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-slate-400">Notas Tocadas</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.notesPlayed}
            </div>
          </div>
        </AnimatedCard>
        
        <AnimatedCard delay={0.45}>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-slate-400">Conquistas</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.achievements.length}
            </div>
          </div>
        </AnimatedCard>
      </div>
      
      {/* Progresso por Seção */}
      <AnimatedCard delay={0.5}>
        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Progresso por Seção
          </h3>
          
          <div className="space-y-6">
            {sectionGroups.map((group) => (
              <div key={group.group}>
                <div className={`text-xs font-black tracking-widest uppercase mb-3 ${group.color}`}>
                  {group.group}
                </div>
                <div className="space-y-3">
                  {group.sections.map((section) => {
                    const sectionProgress = getSectionProgress(section.id);
                    return (
                      <div key={section.id} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium flex items-center gap-2 text-sm">
                            <span className="text-lg">{section.icon}</span>
                            {section.name}
                          </span>
                          <span className="text-slate-400 text-xs">
                            {sectionProgress.completed}/{sectionProgress.total}
                          </span>
                        </div>
                        <ProgressBar
                          progress={sectionProgress.percentage}
                          color={
                            sectionProgress.percentage === 100 ? 'green' :
                            sectionProgress.percentage >= 50 ? 'blue' :
                            sectionProgress.percentage >= 25 ? 'yellow' : 'red'
                          }
                          height="md"
                          showPercentage={true}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedCard>
      
      {/* Conquistas */}
      {stats.achievements.length > 0 && (
        <AnimatedCard delay={0.6}>
          <div className="bg-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Conquistas Desbloqueadas
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg p-3 text-center"
                >
                  <div className="text-3xl mb-1">🏆</div>
                  <div className="text-xs text-white font-medium">
                    {achievement}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>
      )}
      
      {/* Última Prática */}
      {stats.lastPracticeDate && (
        <AnimatedCard delay={0.7}>
          <div className="bg-slate-800 rounded-xl p-4 text-center">
            <span className="text-sm text-slate-400">Última prática: </span>
            <span className="text-white font-medium">
              {new Date(stats.lastPracticeDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
};

export default ProgressDashboard;

