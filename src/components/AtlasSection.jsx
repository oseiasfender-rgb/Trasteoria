import React from 'react';
import AtlasViewer from './AtlasViewer';
import { BookOpen } from 'lucide-react';

export default function AtlasSection() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={40} />
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Atlas de Modos e Harmonias</h1>
            <p className="text-gray-600 mt-2">Referência visual completa com 3500+ diagramas interativos para guitarra</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <AtlasViewer />
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre o Atlas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-blue-600 mb-2">🎵 Modos Gregos</h3>
            <p className="text-sm text-gray-700">7 modos em 12 tonalidades com 5 shapes CAGED cada um. Total de 420+ diagramas interativos com áudio profissional.</p>
          </div>
          <div>
            <h3 className="font-bold text-green-600 mb-2">🎼 Campos Harmônicos</h3>
            <p className="text-sm text-gray-700">4 tipos de campos (Maior, Menor Natural, Harmônico, Melódico) em 12 tons. Análise de funções harmônicas e progressões típicas.</p>
          </div>
          <div>
            <h3 className="font-bold text-purple-600 mb-2">🎹 Acordes</h3>
            <p className="text-sm text-gray-700">50+ tipos de acordes com 5 posições CAGED cada um. Total de 3000+ diagramas com fórmulas intervalares e análise de tensão.</p>
          </div>
          <div>
            <h3 className="font-bold text-orange-600 mb-2">📊 Progressões</h3>
            <p className="text-sm text-gray-700">20+ progressões harmônicas clássicas e modernas. Análise de função harmônica e aplicações por gênero musical.</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recursos Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="text-3xl">🔍</div>
            <div>
              <h3 className="font-bold text-gray-800">Busca Avançada</h3>
              <p className="text-sm text-gray-600">Busque por nome, tipo, gênero ou qualquer outro atributo. Resultados em tempo real.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">🎵</div>
            <div>
              <h3 className="font-bold text-gray-800">Áudio Profissional</h3>
              <p className="text-sm text-gray-600">Reproduza cada modo, acorde e progressão com timbres profissionais de qualidade estúdio.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">🎸</div>
            <div>
              <h3 className="font-bold text-gray-800">Diagramas Interativos</h3>
              <p className="text-sm text-gray-600">3500+ diagramas de braço de guitarra com notação clara e precisa dos intervalos.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">🌍</div>
            <div>
              <h3 className="font-bold text-gray-800">12 Tonalidades</h3>
              <p className="text-sm text-gray-600">Todos os atlases cobrem as 12 tonalidades para máxima utilidade e generalização.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">📱</div>
            <div>
              <h3 className="font-bold text-gray-800">Responsivo</h3>
              <p className="text-sm text-gray-600">Funciona perfeitamente em desktop, tablet e mobile. Leve e rápido.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-3xl">⚡</div>
            <div>
              <h3 className="font-bold text-gray-800">Performance</h3>
              <p className="text-sm text-gray-600">Otimizado para velocidade. Carregamento rápido e navegação fluida.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Tips */}
      <div className="max-w-7xl mx-auto mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">💡 Dicas de Uso</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ Use a busca para encontrar rapidamente o que você procura</li>
          <li>✓ Clique no ícone de volume para ouvir cada elemento</li>
          <li>✓ Mude entre visualização em grade e lista conforme sua preferência</li>
          <li>✓ Selecione diferentes tonalidades para praticar em todos os tons</li>
          <li>✓ Combine com o Método de Guitarra para aprofundamento teórico</li>
          <li>✓ Use o Band Creator para praticar com backing tracks</li>
        </ul>
      </div>
    </div>
  );
}
