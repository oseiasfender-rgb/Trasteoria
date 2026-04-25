import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Guitar, BookOpen, Music, Zap, Play, TrendingUp, Music2, Library, Settings, Mic, Brain, Ear, Activity, Users, Heart } from 'lucide-react';

export const MethodoCover = ({ onNavigate }) => {
  const methodoPrincipios = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      titulo: "Fundamentos",
      descricao: "Base sólida de teoria musical, técnica e escalas básicas",
      cor: "from-blue-600 to-blue-400"
    },
    {
      icon: <Music className="w-6 h-6" />,
      titulo: "Harmonia",
      descricao: "Entenda progressões de acordes e estruturas harmônicas",
      cor: "from-purple-600 to-purple-400"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      titulo: "Escalas & Arpejos",
      descricao: "Domine escalas em todos os modos e tonalidades",
      cor: "from-yellow-600 to-yellow-400"
    },
    {
      icon: <Play className="w-6 h-6" />,
      titulo: "Improvisação",
      descricao: "Desenvolva sua criatividade musical e expressão",
      cor: "from-red-600 to-red-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Layout Lateral */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar Esquerda - Método TrasTeoria */}
        <div className="w-full lg:w-2/5 bg-gradient-to-b from-purple-900/50 to-slate-900/50 backdrop-blur-sm border-r border-purple-500/20 overflow-y-auto p-8 flex flex-col">
          
          {/* Logo e Título */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo-oficial.png" alt="TrasTeoria" className="w-12 h-12 rounded-lg" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TrasTeoria
              </h1>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg inline-block">
              <p className="font-semibold text-sm">Método de Excelência Unificado</p>
              <p className="text-xs opacity-90">Todos os 12 Tons</p>
            </div>
          </div>

          {/* Descrição do Método */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              🎸 O Método TrasTeoria
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              O <strong>Método TrasTeoria</strong> é a base fundamental do nosso sistema de ensino. Desenvolvido com rigor pedagógico, ele integra teoria musical, técnica de guitarra e prática criativa em um único framework coeso.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Cada componente do método foi cuidadosamente estruturado para garantir progressão contínua do aprendizado, desde os fundamentos até técnicas avançadas de improvisação e composição.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
              <p className="text-purple-300 text-sm">
                <strong>✨ Versão 2.0:</strong> Agora com Braço Interativo, Gamificação Ativa e Sincronização de Áudio Profissional
              </p>
            </div>
          </div>

          {/* Pilares do Método */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Pilares Fundamentais</h3>
            <div className="space-y-3">
              {methodoPrincipios.map((pilar, idx) => (
                <div key={idx} className={`bg-gradient-to-r ${pilar.cor} bg-opacity-10 border border-${pilar.cor.split('-')[0]}-500/30 rounded-lg p-3 cursor-pointer hover:bg-opacity-20 transition-all`}>
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 text-white">{pilar.icon}</div>
                    <div>
                      <p className="font-semibold text-white text-sm">{pilar.titulo}</p>
                      <p className="text-gray-300 text-xs">{pilar.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button 
            onClick={() => onNavigate('fundamentos')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 mt-auto"
          >
            🚀 Começar Jornada
          </button>
        </div>

        {/* Conteúdo Principal - Arte da Guitarra */}
        <div className="hidden lg:flex w-3/5 items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
          <div className="relative w-full h-full">
            {/* Imagem da Guitarra */}
            <img 
              src="/metodo-guitarra-capa.png" 
              alt="Método TrasTeoria - Guitarra" 
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            
            {/* Overlay com Informações */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg flex flex-col justify-end p-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">
                  Aprenda Guitarra com Método
                </h2>
                <p className="text-lg text-gray-200">
                  Estrutura pedagógica completa baseada em teoria musical sólida e prática criativa
                </p>
                <div className="flex space-x-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Teoria Fundamentada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Prática Interativa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-gray-300">Progressão Contínua</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Versão Mobile - Exibir em telas pequenas */}
      <div className="lg:hidden">
        <div className="bg-cover bg-center h-96" style={{ backgroundImage: 'url(/metodo-guitarra-capa.png)' }}>
          <div className="bg-gradient-to-t from-black/80 via-transparent to-transparent h-full flex flex-col justify-end p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Aprenda Guitarra com Método
            </h2>
            <p className="text-gray-200 text-sm mb-4">
              Estrutura pedagógica completa baseada em teoria musical sólida
            </p>
            <button 
              onClick={() => onNavigate('fundamentos')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              🚀 Começar Jornada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodoCover;
