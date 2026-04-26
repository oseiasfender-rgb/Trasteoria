import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BookOpen, Music, Zap, Play, TrendingUp, Music2, Library, Settings, Mic, Brain, Ear, Activity, Users, Heart, ArrowRight } from 'lucide-react';

export const MethodoCover = ({ onNavigate }) => {
  const pilares = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      titulo: "Fundamentos",
      descricao: "Base sólida de teoria musical, técnica e escalas básicas para construir sua jornada",
      cor: "from-amber-600 to-amber-500"
    },
    {
      icon: <Music className="w-8 h-8" />,
      titulo: "Harmonia",
      descricao: "Entenda progressões de acordes e estruturas harmônicas profundas",
      cor: "from-yellow-600 to-yellow-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      titulo: "Improvisação",
      descricao: "Desenvolva sua criatividade musical e expressão pessoal",
      cor: "from-orange-600 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Layout Principal */}
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        
        {/* Sidebar Esquerda - Método TrasTeoria */}
        <div className="w-full lg:w-2/5 bg-gradient-to-b from-slate-900/80 to-slate-950/90 backdrop-blur-sm border-r border-amber-500/20 overflow-y-auto p-8 flex flex-col justify-between">
          
          {/* Conteúdo Principal */}
          <div>
            {/* Logo e Título */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <img src="/logo-oficial.png" alt="TrasTeoria" className="w-14 h-14 rounded-lg shadow-lg" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    Método TrasTeoria
                  </h1>
                  <p className="text-amber-300/80 text-sm font-medium">Fundamentos, Harmonia e Improvisação</p>
                </div>
              </div>
            </div>

            {/* Badge de Fundação */}
            <div className="mb-8">
              <div className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ⭐ Fundação do Sistema
              </div>
            </div>

            {/* Descrição do Método */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                🎸 A Raiz do Sistema
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                O <strong>Método TrasTeoria</strong> é a base fundamental e absoluta de todo o nosso sistema de ensino. Desenvolvido com rigor pedagógico, ele integra teoria musical, técnica de guitarra e prática criativa em um único framework coeso.
              </p>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm">
                Cada componente foi cuidadosamente estruturado para garantir progressão contínua do aprendizado, desde os fundamentos até técnicas avançadas de improvisação e composição.
              </p>
              <div className="bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-500/40 rounded-lg p-4 mb-6">
                <p className="text-amber-200 text-sm">
                  <strong>✨ Versão 2.0:</strong> Braço Interativo, Gamificação Ativa e Sincronização de Áudio Profissional
                </p>
              </div>
            </div>

            {/* Pilares do Método */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Os Três Pilares</h3>
              <div className="space-y-3">
                {pilares.map((pilar, idx) => (
                  <div key={idx} className={`bg-gradient-to-r ${pilar.cor} bg-opacity-10 border border-amber-500/30 rounded-lg p-4 cursor-pointer hover:bg-opacity-20 hover:border-amber-500/60 transition-all transform hover:scale-105`}>
                    <div className="flex items-start space-x-3">
                      <div className="mt-1 text-amber-400">{pilar.icon}</div>
                      <div>
                        <p className="font-semibold text-white text-sm">{pilar.titulo}</p>
                        <p className="text-gray-300 text-xs leading-relaxed">{pilar.descricao}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => onNavigate('fundamentos')}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 group"
          >
            <span>🚀 Iniciar Jornada</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Conteúdo Principal - Arte da Guitarra Mística */}
        <div className="hidden lg:flex w-3/5 items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 relative overflow-hidden">
          {/* Efeito de luz de fundo */}
          <div className="absolute inset-0 bg-gradient-radial from-amber-500/5 via-transparent to-transparent"></div>
          
          {/* Imagem da Guitarra */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img 
              src="/metodo-guitarra-mistica.webp" 
              alt="Método TrasTeoria - Guitarra Mística" 
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            
            {/* Overlay com Informações */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent rounded-lg flex flex-col justify-end p-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">
                  Guitarra Sônica
                </h2>
                <p className="text-lg text-amber-200">
                  Arquitetura e Alma
                </p>
                <p className="text-gray-200 text-sm max-w-md">
                  Estrutura pedagógica completa baseada em teoria musical sólida, técnica refinada e prática criativa
                </p>
                <div className="flex space-x-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Teoria Fundamentada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Prática Interativa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Progressão Contínua</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versão Mobile */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(/metodo-guitarra-mistica.webp)' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Guitarra Sônica
            </h2>
            <p className="text-amber-200 font-semibold mb-2">
              Arquitetura e Alma
            </p>
            <p className="text-gray-200 text-sm mb-6">
              Estrutura pedagógica completa baseada em teoria musical sólida
            </p>
            <button 
              onClick={() => onNavigate('fundamentos')}
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>🚀 Iniciar Jornada</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodoCover;
