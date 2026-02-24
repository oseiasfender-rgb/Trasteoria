/**
 * MethodSearchEngine - Motor de Busca e Referência Cruzada
 * Integra o Método de Guitarra com as seções da plataforma
 * 
 * Funcionalidades:
 * - Busca full-text no método
 * - Referência cruzada com seções
 * - Sugestões inteligentes
 * - Histórico de buscas
 * - Índice invertido para performance
 */

class MethodSearchEngine {
  constructor() {
    this.methodData = this.loadMethodData();
    this.invertedIndex = this.buildInvertedIndex();
    this.searchHistory = [];
    this.maxHistorySize = 50;
    this.platformSections = this.createPlatformSectionsMappings();
  }

  /**
   * Carrega dados do método
   */
  loadMethodData() {
    return {
      parts: [
        {
          id: 'part1',
          title: 'Fundamentos da Guitarra e Teoria Musical',
          chapters: [
            {
              id: 'ch1',
              title: 'Conhecendo o Instrumento',
              sections: [
                {
                  id: 'sec1-1',
                  title: 'Tipos de Guitarra',
                  keywords: ['guitarra elétrica', 'guitarra acústica', 'guitarra clássica', 'tipos'],
                  content: 'A guitarra é um instrumento de corda que pode ser classificado em três tipos principais...',
                },
                {
                  id: 'sec1-2',
                  title: 'Partes da Guitarra',
                  keywords: ['braço', 'trastes', 'corpo', 'captadores', 'partes'],
                  content: 'A guitarra é composta por várias partes essenciais...',
                },
                {
                  id: 'sec1-3',
                  title: 'Afinação Padrão',
                  keywords: ['afinação', 'E-A-D-G-B-E', 'Mi-Lá-Ré-Sol-Si-Mi'],
                  content: 'A afinação padrão da guitarra é E-A-D-G-B-E...',
                },
              ],
            },
            {
              id: 'ch2',
              title: 'Teoria Musical Essencial',
              sections: [
                {
                  id: 'sec2-1',
                  title: 'Escala Cromática',
                  keywords: ['notas', 'escala cromática', '12 notas', 'semitons'],
                  content: 'A escala cromática é composta por 12 notas...',
                },
                {
                  id: 'sec2-2',
                  title: 'Tom e Semitom',
                  keywords: ['tom', 'semitom', 'intervalo', 'distância'],
                  content: 'Tom é a distância entre duas notas separadas por um semitom...',
                },
                {
                  id: 'sec2-3',
                  title: 'Cifras e Notação',
                  keywords: ['cifra', 'notação', 'acorde', 'símbolo'],
                  content: 'Cifras são símbolos que representam acordes...',
                },
              ],
            },
            {
              id: 'ch3',
              title: 'Técnica Fundamental',
              sections: [
                {
                  id: 'sec3-1',
                  title: 'Postura e Posição das Mãos',
                  keywords: ['postura', 'mão esquerda', 'mão direita', 'posição'],
                  content: 'A postura correta é fundamental para evitar lesões...',
                },
                {
                  id: 'sec3-2',
                  title: 'Palhetada',
                  keywords: ['palhetada', 'downpicking', 'alternada', 'técnica'],
                  content: 'A palhetada alternada é a técnica mais comum...',
                },
                {
                  id: 'sec3-4',
                  title: 'Ligados',
                  keywords: ['hammer-on', 'pull-off', 'ligado', 'técnica'],
                  content: 'Hammer-on e pull-off são técnicas que permitem conectar notas...',
                },
                {
                  id: 'sec3-5',
                  title: 'Slides e Bends',
                  keywords: ['slide', 'bend', 'técnica expressiva', 'emoção'],
                  content: 'Slides e bends são técnicas expressivas...',
                },
              ],
            },
          ],
        },
        {
          id: 'part2',
          title: 'Harmonia - A Construção da Música',
          chapters: [
            {
              id: 'ch4',
              title: 'Intervalos',
              sections: [
                {
                  id: 'sec4-1',
                  title: 'Definição e Classificação',
                  keywords: ['intervalo', 'justo', 'maior', 'menor', 'aumentado', 'diminuto'],
                  content: 'Intervalos são a distância entre duas notas...',
                },
                {
                  id: 'sec4-2',
                  title: 'Mapeamento de Intervalos',
                  keywords: ['intervalo', 'braço', 'mapeamento', 'guitarra'],
                  content: 'Conhecer os intervalos no braço da guitarra é essencial...',
                },
              ],
            },
            {
              id: 'ch5',
              title: 'Formação de Acordes',
              sections: [
                {
                  id: 'sec5-1',
                  title: 'Tríades',
                  keywords: ['tríade', 'acorde', 'fundamental', 'terça', 'quinta', 'maior', 'menor'],
                  content: 'Tríades são acordes compostos por 3 notas...',
                },
                {
                  id: 'sec5-2',
                  title: 'Inversões',
                  keywords: ['inversão', 'acorde', 'primeira inversão', 'segunda inversão'],
                  content: 'Inversões são posições diferentes do acorde...',
                },
                {
                  id: 'sec5-3',
                  title: 'Sistema CAGED',
                  keywords: ['CAGED', 'sistema', 'acorde', 'posição'],
                  content: 'O sistema CAGED é uma forma de memorizar posições...',
                },
              ],
            },
            {
              id: 'ch6',
              title: 'Acordes com Sétima',
              sections: [
                {
                  id: 'sec6-1',
                  title: 'Tétrades',
                  keywords: ['tétrade', 'sétima', 'maj7', '7', 'm7', 'dim7'],
                  content: 'Tétrades são acordes com 4 notas...',
                },
              ],
            },
          ],
        },
        {
          id: 'part3',
          title: 'Escalas e Improvisação',
          chapters: [
            {
              id: 'ch13',
              title: 'Modos Gregos',
              sections: [
                {
                  id: 'sec13-1',
                  title: 'Modos Gregos',
                  keywords: ['modo', 'jônio', 'dórico', 'frígio', 'lídio', 'mixolídio', 'eólio', 'lócrio'],
                  content: 'Os modos gregos são escalas derivadas da escala maior...',
                },
              ],
            },
            {
              id: 'ch14',
              title: 'Escala Pentatônica',
              sections: [
                {
                  id: 'sec14-1',
                  title: 'Pentatônica',
                  keywords: ['pentatônica', 'maior', 'menor', 'shapes', 'improviso'],
                  content: 'A escala pentatônica é uma das mais usadas em improviso...',
                },
              ],
            },
          ],
        },
      ],
    };
  }

  /**
   * Constrói índice invertido para busca rápida
   */
  buildInvertedIndex() {
    const index = {};

    const processSection = (section, partId, chapterId) => {
      const allText = `${section.title} ${section.content} ${section.keywords.join(' ')}`.toLowerCase();
      const words = allText.split(/\s+/);

      words.forEach((word) => {
        if (word.length > 2) {
          if (!index[word]) {
            index[word] = [];
          }
          index[word].push({
            sectionId: section.id,
            partId: partId,
            chapterId: chapterId,
            title: section.title,
            relevance: section.keywords.includes(word) ? 2 : 1,
          });
        }
      });
    };

    this.methodData.parts.forEach((part) => {
      part.chapters.forEach((chapter) => {
        chapter.sections.forEach((section) => {
          processSection(section, part.id, chapter.id);
        });
      });
    });

    return index;
  }

  /**
   * Cria mapeamento com seções da plataforma
   */
  createPlatformSectionsMappings() {
    return {
      Fundamentos: ['sec1-1', 'sec1-2', 'sec3-1', 'sec3-2', 'sec3-3'],
      Harmonia: ['sec2-1', 'sec2-2', 'sec2-3', 'sec4-1', 'sec5-1', 'sec5-2', 'sec6-1'],
      Escalas: ['sec4-2', 'sec13-1', 'sec14-1'],
      Improvisação: ['sec14-1', 'sec17-1'],
      Técnica: ['sec3-1', 'sec3-2', 'sec3-4', 'sec3-5'],
      Leitura: ['sec2-3', 'sec24-1'],
      Composição: ['sec23-1'],
      'Ear Training': ['sec25-1'],
    };
  }

  /**
   * Busca full-text
   */
  search(query, limit = 10) {
    if (!query || query.length < 2) return [];

    const queryWords = query.toLowerCase().split(/\s+/);
    const results = new Map();

    queryWords.forEach((word) => {
      const matches = this.invertedIndex[word] || [];
      matches.forEach((match) => {
        const key = match.sectionId;
        if (!results.has(key)) {
          results.set(key, {
            ...match,
            score: 0,
          });
        }
        results.get(key).score += match.relevance;
      });
    });

    // Ordenar por relevância
    const sorted = Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Adicionar ao histórico
    this.addToHistory(query);

    return sorted;
  }

  /**
   * Busca por categoria
   */
  searchByCategory(category) {
    const sectionIds = this.platformSectionsMappings[category] || [];
    const results = [];

    this.methodData.parts.forEach((part) => {
      part.chapters.forEach((chapter) => {
        chapter.sections.forEach((section) => {
          if (sectionIds.includes(section.id)) {
            results.push({
              sectionId: section.id,
              title: section.title,
              content: section.content,
              category: category,
            });
          }
        });
      });
    });

    return results;
  }

  /**
   * Obtém sugestões inteligentes
   */
  getSuggestions(query) {
    if (!query || query.length < 2) return [];

    const queryLower = query.toLowerCase();
    const suggestions = new Set();

    // Buscar palavras que começam com a query
    Object.keys(this.invertedIndex).forEach((word) => {
      if (word.startsWith(queryLower)) {
        suggestions.add(word);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }

  /**
   * Obtém referências cruzadas
   */
  getCrossReferences(sectionId) {
    const references = [];

    // Encontrar a seção
    let targetSection = null;
    this.methodData.parts.forEach((part) => {
      part.chapters.forEach((chapter) => {
        chapter.sections.forEach((section) => {
          if (section.id === sectionId) {
            targetSection = section;
          }
        });
      });
    });

    if (!targetSection) return references;

    // Buscar seções relacionadas por keywords
    const keywords = targetSection.keywords;
    const relatedSections = new Map();

    keywords.forEach((keyword) => {
      const matches = this.invertedIndex[keyword.toLowerCase()] || [];
      matches.forEach((match) => {
        if (match.sectionId !== sectionId) {
          if (!relatedSections.has(match.sectionId)) {
            relatedSections.set(match.sectionId, {
              ...match,
              score: 0,
            });
          }
          relatedSections.get(match.sectionId).score += 1;
        }
      });
    });

    return Array.from(relatedSections.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  /**
   * Obtém seção por ID
   */
  getSection(sectionId) {
    let result = null;

    this.methodData.parts.forEach((part) => {
      part.chapters.forEach((chapter) => {
        chapter.sections.forEach((section) => {
          if (section.id === sectionId) {
            result = {
              ...section,
              partId: part.id,
              partTitle: part.title,
              chapterId: chapter.id,
              chapterTitle: chapter.title,
            };
          }
        });
      });
    });

    return result;
  }

  /**
   * Adiciona ao histórico de buscas
   */
  addToHistory(query) {
    this.searchHistory.unshift({
      query: query,
      timestamp: new Date(),
    });

    if (this.searchHistory.length > this.maxHistorySize) {
      this.searchHistory.pop();
    }
  }

  /**
   * Obtém histórico de buscas
   */
  getHistory() {
    return this.searchHistory;
  }

  /**
   * Limpa histórico
   */
  clearHistory() {
    this.searchHistory = [];
  }

  /**
   * Obtém estatísticas
   */
  getStatistics() {
    let totalSections = 0;
    let totalKeywords = 0;

    this.methodData.parts.forEach((part) => {
      part.chapters.forEach((chapter) => {
        totalSections += chapter.sections.length;
        chapter.sections.forEach((section) => {
          totalKeywords += section.keywords.length;
        });
      });
    });

    return {
      totalSections: totalSections,
      totalKeywords: totalKeywords,
      indexSize: Object.keys(this.invertedIndex).length,
      searchHistorySize: this.searchHistory.length,
    };
  }

  /**
   * Obtém índice de conteúdo
   */
  getTableOfContents() {
    return this.methodData.parts.map((part) => ({
      id: part.id,
      title: part.title,
      chapters: part.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        sectionCount: chapter.sections.length,
      })),
    }));
  }

  /**
   * Exporta dados para JSON
   */
  exportAsJSON() {
    return JSON.stringify(this.methodData, null, 2);
  }

  /**
   * Importa dados de JSON
   */
  importFromJSON(jsonString) {
    try {
      this.methodData = JSON.parse(jsonString);
      this.invertedIndex = this.buildInvertedIndex();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default MethodSearchEngine;
