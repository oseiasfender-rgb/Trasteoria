import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Bookmark, Search, Home } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';

/**
 * GuitarMethodViewer - Visualizador do Método de Guitarra Completo
 * 
 * Funcionalidades:
 * - Navegação por capítulos e seções
 * - Busca de conteúdo
 * - Bookmarks e favoritos
 * - Notas e anotações
 * - Referência cruzada com seções da plataforma
 */

const GuitarMethodViewer = () => {
  const [expandedChapters, setExpandedChapters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [notes, setNotes] = useState({});

  // Estrutura do Método de Guitarra
  const methodStructure = {
    parts: [
      {
        id: 'part1',
        title: 'Parte 1: Fundamentos da Guitarra e Teoria Musical',
        chapters: [
          {
            id: 'ch1',
            title: 'Capítulo 1: Conhecendo o Instrumento',
            sections: [
              {
                id: 'sec1-1',
                title: '1.1. Tipos de Guitarra (Elétrica, Acústica, Clássica)',
                content: 'A guitarra é um instrumento de corda que pode ser classificado em três tipos principais...',
                linkedSections: ['Fundamentos'],
              },
              {
                id: 'sec1-2',
                title: '1.2. Partes da Guitarra',
                content: 'A guitarra é composta por várias partes essenciais que trabalham juntas...',
                linkedSections: ['Fundamentos'],
              },
              {
                id: 'sec1-3',
                title: '1.3. Afinação Padrão e Alternativas',
                content: 'A afinação padrão da guitarra é E-A-D-G-B-E (Mi-Lá-Ré-Sol-Si-Mi)...',
                linkedSections: ['Fundamentos'],
              },
              {
                id: 'sec1-4',
                title: '1.4. Cuidados e Manutenção',
                content: 'Manter a guitarra em bom estado é essencial para longevidade e qualidade de som...',
                linkedSections: [],
              },
            ],
          },
          {
            id: 'ch2',
            title: 'Capítulo 2: Teoria Musical Essencial',
            sections: [
              {
                id: 'sec2-1',
                title: '2.1. As 12 Notas Musicais (Escala Cromática)',
                content: 'A escala cromática é composta por 12 notas que se repetem em diferentes oitavas...',
                linkedSections: ['Harmonia', 'Escalas'],
              },
              {
                id: 'sec2-2',
                title: '2.2. Tom e Semitom',
                content: 'Tom é a distância entre duas notas separadas por um semitom...',
                linkedSections: ['Harmonia'],
              },
              {
                id: 'sec2-3',
                title: '2.3. Cifras e Notação',
                content: 'Cifras são símbolos que representam acordes de forma simplificada...',
                linkedSections: ['Harmonia', 'Leitura'],
              },
              {
                id: 'sec2-4',
                title: '2.4. Ritmo, Métrica e Compasso',
                content: 'O ritmo é a organização dos sons no tempo, enquanto o compasso organiza o ritmo...',
                linkedSections: [],
              },
            ],
          },
          {
            id: 'ch3',
            title: 'Capítulo 3: Técnica Fundamental',
            sections: [
              {
                id: 'sec3-1',
                title: '3.1. Postura e Posição das Mãos',
                content: 'A postura correta é fundamental para evitar lesões e desenvolver técnica...',
                linkedSections: ['Fundamentos'],
              },
              {
                id: 'sec3-2',
                title: '3.2. Palhetada (Alternada, Downpicking)',
                content: 'A palhetada alternada é a técnica mais comum e versátil para guitarristas...',
                linkedSections: ['Fundamentos'],
              },
              {
                id: 'sec3-3',
                title: '3.3. Digitação e Exercícios de Aquecimento',
                content: 'Exercícios de aquecimento são essenciais para preparar as mãos para praticar...',
                linkedSections: ['Fundamentos'],
              },
              {
                id: 'sec3-4',
                title: '3.4. Ligados (Hammer-on, Pull-off)',
                content: 'Hammer-on e pull-off são técnicas que permitem conectar notas sem usar o palheta...',
                linkedSections: ['Fundamentos'],
              },
              {
                id: 'sec3-5',
                title: '3.5. Slides e Bends',
                content: 'Slides e bends são técnicas expressivas que adicionam emoção ao som...',
                linkedSections: ['Fundamentos'],
              },
            ],
          },
        ],
      },
      {
        id: 'part2',
        title: 'Parte 2: Harmonia - A Construção da Música',
        chapters: [
          {
            id: 'ch4',
            title: 'Capítulo 4: Intervalos',
            sections: [
              {
                id: 'sec4-1',
                title: '4.1. Definição e Classificação',
                content: 'Intervalos são a distância entre duas notas. Existem intervalos justos, maiores, menores...',
                linkedSections: ['Harmonia'],
              },
              {
                id: 'sec4-2',
                title: '4.2. Mapeamento de Intervalos no Braço',
                content: 'Conhecer os intervalos no braço da guitarra é essencial para improviso e composição...',
                linkedSections: ['Harmonia', 'Escalas'],
              },
            ],
          },
          {
            id: 'ch5',
            title: 'Capítulo 5: Formação de Acordes (Tríades)',
            sections: [
              {
                id: 'sec5-1',
                title: '5.1. Tríades Maiores, Menores, Aumentadas e Diminutas',
                content: 'Tríades são acordes compostos por 3 notas: fundamental, terça e quinta...',
                linkedSections: ['Harmonia'],
              },
              {
                id: 'sec5-2',
                title: '5.2. Inversões de Tríades',
                content: 'Inversões são posições diferentes do acorde onde a fundamental não está no baixo...',
                linkedSections: ['Harmonia'],
              },
              {
                id: 'sec5-3',
                title: '5.3. Sistema CAGED',
                content: 'O sistema CAGED é uma forma de memorizar posições de acordes no braço...',
                linkedSections: ['Harmonia'],
              },
            ],
          },
          {
            id: 'ch6',
            title: 'Capítulo 6: Acordes com Sétima (Tétrades)',
            sections: [
              {
                id: 'sec6-1',
                title: '6.1. Tétrades Maj7, 7, m7, m7(b5), dim7',
                content: 'Tétrades são acordes com 4 notas, adicionando uma sétima às tríades...',
                linkedSections: ['Harmonia'],
              },
            ],
          },
        ],
      },
    ],
  };

  // Alternar expansão de capítulos
  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Adicionar/remover bookmark
  const toggleBookmark = (sectionId) => {
    setBookmarks((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Filtrar seções por busca
  const filterSections = (sections) => {
    if (!searchTerm) return sections;
    return sections.filter(
      (section) =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Renderizar seção
  const renderSection = (section) => {
    const isBookmarked = bookmarks.includes(section.id);

    return (
      <div
        key={section.id}
        className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition"
        onClick={() => setSelectedSection(section)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-2">{section.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{section.content}</p>
            {section.linkedSections.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {section.linkedSections.map((linkedSection) => (
                  <span
                    key={linkedSection}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >
                    {linkedSection}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(section.id);
            }}
            className={`ml-2 p-2 rounded ${
              isBookmarked
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    );
  };

  // Renderizar capítulo
  const renderChapter = (chapter) => {
    const isExpanded = expandedChapters[chapter.id];
    const filteredSections = filterSections(chapter.sections);

    if (searchTerm && filteredSections.length === 0) return null;

    return (
      <div key={chapter.id} className="mb-4">
        <button
          onClick={() => toggleChapter(chapter.id)}
          className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
        >
          <h3 className="font-semibold text-blue-900">{chapter.title}</h3>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isExpanded && (
          <div className="mt-2 ml-4 border-l-2 border-blue-200 pl-4">
            {filteredSections.map((section) => renderSection(section))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎸 Método de Guitarra Completo
        </h1>
        <p className="text-gray-600">
          Base de consulta e referência para toda a plataforma educacional TrasTeoria
        </p>
      </div>

      {/* Barra de Busca */}
      <div className="mb-6 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar no método..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setSearchTerm('')}
          className="px-4"
        >
          Limpar
        </Button>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar com Partes */}
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg h-fit sticky top-4">
          <h3 className="font-bold text-gray-900 mb-3">Partes do Método</h3>
          <div className="space-y-2">
            {methodStructure.parts.map((part) => (
              <div key={part.id} className="text-sm">
                <p className="font-semibold text-gray-700 mb-1">{part.title}</p>
                <div className="text-xs text-gray-600 space-y-1">
                  {part.chapters.map((chapter) => (
                    <div key={chapter.id} className="pl-2 border-l border-gray-300">
                      {chapter.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3">
          {methodStructure.parts.map((part) => (
            <div key={part.id} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
                {part.title}
              </h2>
              <div className="space-y-4">
                {part.chapters.map((chapter) => renderChapter(chapter))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Seção Selecionada */}
      {selectedSection && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSection(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedSection.title}
              </h2>
              <button
                onClick={() => setSelectedSection(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-700 mb-4">{selectedSection.content}</p>

            {selectedSection.linkedSections.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Relacionado com:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSection.linkedSections.map((section) => (
                    <button
                      key={section}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <textarea
                placeholder="Adicione suas notas aqui..."
                value={notes[selectedSection.id] || ''}
                onChange={(e) =>
                  setNotes((prev) => ({
                    ...prev,
                    [selectedSection.id]: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded text-sm"
                rows="3"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bookmarks */}
      {bookmarks.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 max-w-xs">
          <h3 className="font-semibold text-yellow-900 mb-2">
            📌 Bookmarks ({bookmarks.length})
          </h3>
          <div className="text-sm text-yellow-800 space-y-1 max-h-32 overflow-y-auto">
            {bookmarks.map((id) => {
              const section = methodStructure.parts
                .flatMap((p) => p.chapters)
                .flatMap((c) => c.sections)
                .find((s) => s.id === id);
              return section ? (
                <div key={id} className="truncate hover:text-yellow-900 cursor-pointer">
                  {section.title}
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuitarMethodViewer;
