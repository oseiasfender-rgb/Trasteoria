import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, Volume2, BookOpen, Grid3x3, List } from 'lucide-react';
import { atlasModosGregos } from '@/utils/atlasModosGregos';
import { atlasCamposHarmonicos } from '@/utils/atlasCamposHarmonicos';
import { atlasAcordes } from '@/utils/atlasAcordes';
import { atlasProgressoes } from '@/utils/atlasProgressoes';

export default function AtlasViewer() {
  const [activeTab, setActiveTab] = useState('modos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTone, setSelectedTone] = useState('C');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedItems, setExpandedItems] = useState({});

  const tones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Filtrar dados baseado na busca
  const filteredData = useMemo(() => {
    const search = searchTerm.toLowerCase();
    
    switch(activeTab) {
      case 'modos': {
        // atlasModosGregos = {C: {jonio: {...}, dorico: {...}}, D: {...}}
        // Pegar apenas a tonalidade selecionada e listar os modos
        const modosNaTonalidade = atlasModosGregos[selectedTone] || {};
        return Object.values(modosNaTonalidade).filter(modo =>
          modo && modo.name &&
          (
            modo.name.toLowerCase().includes(search) ||
            (modo.sonoridade || '').toLowerCase().includes(search) ||
            (modo.formula || '').toLowerCase().includes(search)
          )
        );
      }
      
      case 'campos': {
        // atlasCamposHarmonicos = {C: {maior: {...}, menor_natural: {...}}, D: {...}}
        const camposNaTonalidade = atlasCamposHarmonicos[selectedTone] || {};
        return Object.values(camposNaTonalidade).filter(campo =>
          campo && campo.name &&
          (
            campo.name.toLowerCase().includes(search) ||
            (campo.tipo || campo.type || '').toLowerCase().includes(search)
          )
        );
      }
      
      case 'acordes': {
        // atlasAcordes = {C: {maj: {C: {...}, A: {...}}, min: {...}}, D: {...}}
        // Pegar todos os tipos de acorde na tonalidade selecionada, posicao C
        const acordesNaTonalidade = atlasAcordes[selectedTone] || {};
        return Object.values(acordesNaTonalidade).map(posicoes => {
          // Cada tipo tem posicoes CAGED; pegar a posicao C ou a primeira disponivel
          return posicoes?.C || Object.values(posicoes || {})[0];
        }).filter(acorde =>
          acorde && acorde.name &&
          (
            acorde.name.toLowerCase().includes(search) ||
            (acorde.categoria || acorde.category || '').toLowerCase().includes(search)
          )
        );
      }
      
      case 'progressoes': {
        // atlasProgressoes = [{id, name, descricao, generos, exemplo}, ...] (array)
        const progressoesArray = Array.isArray(atlasProgressoes)
          ? atlasProgressoes
          : Object.values(atlasProgressoes);
        return progressoesArray.filter(prog =>
          prog && prog.name &&
          (
            prog.name.toLowerCase().includes(search) ||
            (Array.isArray(prog.generos)
              ? prog.generos.join(' ').toLowerCase().includes(search)
              : (prog.genre || prog.generos || '').toString().toLowerCase().includes(search)
            )
          )
        );
      }
      
      default:
        return [];
    }
  }, [activeTab, searchTerm, selectedTone]);

  // Renderizar Modo
  const renderModo = (modo) => (
    <div key={modo.id || modo.name} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{modo.tonalidade || modo.name}</h3>
          <p className="text-sm text-gray-600">{modo.formula}</p>
        </div>
        <button
          onClick={() => playModo(modo)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          title="Ouvir modo"
        >
          <Volume2 size={18} />
        </button>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{modo.sonoridade || modo.description || ''}</p>
      
      {modo.notas && (
        <div className="flex flex-wrap gap-1 mb-3">
          {modo.notas.map((nota, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-mono font-bold">{nota}</span>
          ))}
        </div>
      )}
      
      <div className="text-xs text-gray-500">
        Sonoridade: {modo.sonoridade || '-'} | Aplicação: {modo.aplicacao || '-'}
      </div>
    </div>
  );

  // Renderizar Campo Harmônico
  const renderCampo = (campo) => (
    <div key={campo.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{campo.tonalidade || campo.name}</h3>
          <p className="text-sm text-gray-600">{campo.tipo || campo.type || ''}</p>
        </div>
        <button
          onClick={() => playCampo(campo)}
          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
          title="Ouvir campo"
        >
          <Volume2 size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-3">
        {campo.chords?.map((chord, idx) => (
          <div key={idx} className="bg-green-50 p-2 rounded text-center text-xs">
            <div className="font-bold text-gray-800">{chord.symbol}</div>
            <div className="text-gray-600">{chord.function}</div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500">
        Progressões típicas: {campo.progressoes?.map(p => p.nome).join(', ') || campo.progressions?.join(', ') || '-'}
      </div>
    </div>
  );

  // Renderizar Acorde
  const renderAcorde = (acorde) => (
    <div key={acorde.id || acorde.cifra} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{acorde.cifra || acorde.name}</h3>
          <p className="text-sm text-gray-600">{acorde.categoria || acorde.category || ''}</p>
        </div>
        <button
          onClick={() => playAcorde(acorde)}
          className="p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
          title="Ouvir acorde"
        >
          <Volume2 size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-3">
        {acorde.positions?.map((pos, idx) => (
          <div key={idx} className="bg-purple-50 p-2 rounded text-center text-xs">
            <div className="font-bold text-gray-800">{pos.shape}</div>
            <div className="text-gray-600">{pos.name}</div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500">
        Fórmula: {acorde.formula || '-'} | Sonoridade: {acorde.sonoridade || acorde.tension || '-'}
      </div>
    </div>
  );

  // Renderizar Progressão
  const renderProgressao = (prog) => (
    <div key={prog.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{prog.name}</h3>
          <p className="text-sm text-gray-600">{Array.isArray(prog.generos) ? prog.generos.join(', ') : (prog.genre || '')}</p>
        </div>
        <button
          onClick={() => playProgressao(prog)}
          className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
          title="Ouvir progressão"
        >
          <Volume2 size={18} />
        </button>
      </div>
      
      <div className="flex gap-2 mb-3">
        {prog.chords?.map((chord, idx) => (
          <div key={idx} className="bg-orange-50 px-3 py-1 rounded text-sm font-bold text-gray-800">
            {chord}
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-700 mb-2">{prog.descricao || prog.description || ''}</p>
      
      <div className="text-xs text-gray-500">
        Exemplo: {prog.exemplo || '-'}
      </div>
    </div>
  );

  // Funções de reprodução de áudio (placeholder)
  const playModo = (modo) => {
    // Implementar reprodução de áudio
  };

  const playCampo = (campo) => {
  };

  const playAcorde = (acorde) => {
  };

  const playProgressao = (prog) => {
  };

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Atlas de Modos e Harmonias</h1>
        </div>
        <p className="text-gray-600">Referência visual completa com 3500+ diagramas interativos</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { id: 'modos', label: 'Modos Gregos', icon: '🎵' },
          { id: 'campos', label: 'Campos Harmônicos', icon: '🎼' },
          { id: 'acordes', label: 'Acordes', icon: '🎹' },
          { id: 'progressoes', label: 'Progressões', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Controles */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {/* Busca */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Seletor de Tom */}
        {activeTab !== 'progressoes' && (
          <select
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tones.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        )}

        {/* View Mode */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
            title="Visualização em grade"
          >
            <Grid3x3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
            }`}
            title="Visualização em lista"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredData.length > 0 ? (
          filteredData.map(item => {
            switch(activeTab) {
              case 'modos':
                return renderModo(item);
              case 'campos':
                return renderCampo(item);
              case 'acordes':
                return renderAcorde(item);
              case 'progressoes':
                return renderProgressao(item);
              default:
                return null;
            }
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum resultado encontrado para "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="mt-8 pt-6 border-t border-gray-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">84</div>
            <div className="text-sm text-gray-600">Modos</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">48</div>
            <div className="text-sm text-gray-600">Campos</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">3000+</div>
            <div className="text-sm text-gray-600">Acordes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">20+</div>
            <div className="text-sm text-gray-600">Progressões</div>
          </div>
        </div>
      </div>
    </div>
  );
}
