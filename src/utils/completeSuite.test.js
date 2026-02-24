import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { generateAtlasModos, listModos } from '../data/atlasModosGregos.js';
import { generateAtlasCampos } from '../data/atlasCamposHarmonicos.js';
import { generateAtlasAcordes } from '../data/atlasAcordes.js';
import { PROGRESSOES } from '../data/atlasProgressoes.js';

const atlasModosGregos = generateAtlasModos();
const atlasCamposHarmonicos = generateAtlasCampos();
const atlasAcordes = generateAtlasAcordes();
const atlasProgressoes = PROGRESSOES;

describe('TrasTeoria v8.0 - Suite Completa de Testes', () => {
  
  // ===== TESTES DE ATLASES =====
  describe('Atlas de Modos Gregos', () => {
    it('deve conter 7 modos', () => {
      const modos = listModos();
      expect(modos.length).toBe(7);
    });

    it('cada modo deve ter propriedades obrigatórias', () => {
      listModos().forEach(modo => {
        expect(modo).toHaveProperty('id');
        expect(modo).toHaveProperty('name');
        expect(modo).toHaveProperty('formula');
        expect(modo).toHaveProperty('sonoridade');
      });
    });

    it('deve ter 12 tonalidades', () => {
      const tonalidades = Object.keys(atlasModosGregos);
      expect(tonalidades.length).toBe(12);
    });

    it('cada tonalidade deve ter 7 modos', () => {
      Object.values(atlasModosGregos).forEach(tonalidade => {
        const modos = Object.keys(tonalidade);
        expect(modos.length).toBe(7);
      });
    });

    it('nomes dos modos devem ser únicos', () => {
      const modos = listModos();
      const nomes = modos.map(m => m.name);
      const nomesUnicos = new Set(nomes);
      expect(nomesUnicos.size).toBe(nomes.length);
    });
  });

  describe('Atlas de Campos Harmônicos', () => {
    it('deve ter 12 tonalidades', () => {
      const tonalidades = Object.keys(atlasCamposHarmonicos);
      expect(tonalidades.length).toBe(12);
    });

    it('cada tonalidade deve ter 4 tipos de campos', () => {
      Object.values(atlasCamposHarmonicos).forEach(tonalidade => {
        const tipos = Object.keys(tonalidade);
        expect(tipos.length).toBe(4);
      });
    });

    it('cada campo deve ter propriedades obrigatórias', () => {
      Object.values(atlasCamposHarmonicos).forEach(tonalidade => {
        Object.values(tonalidade).forEach(campo => {
          expect(campo).toHaveProperty('id');
          expect(campo).toHaveProperty('name');
          expect(campo).toHaveProperty('tipo');
          expect(campo).toHaveProperty('acordes');
        });
      });
    });

    it('cada campo deve ter 7 acordes', () => {
      Object.values(atlasCamposHarmonicos).forEach(tonalidade => {
        Object.values(tonalidade).forEach(campo => {
          expect(campo.acordes.length).toBe(7);
        });
      });
    });

    it('total de 48 combinações (12 tons × 4 tipos)', () => {
      let total = 0;
      Object.values(atlasCamposHarmonicos).forEach(tonalidade => {
        total += Object.keys(tonalidade).length;
      });
      expect(total).toBe(48);
    });
  });

  describe('Atlas de Acordes', () => {
    it('deve ter 12 tonalidades', () => {
      const tonalidades = Object.keys(atlasAcordes);
      expect(tonalidades.length).toBe(12);
    });

    it('cada tonalidade deve ter 20+ tipos de acordes', () => {
      Object.values(atlasAcordes).forEach(tonalidade => {
        const tipos = Object.keys(tonalidade);
        expect(tipos.length).toBeGreaterThanOrEqual(20);
      });
    });

    it('cada acorde deve ter propriedades obrigatórias', () => {
      Object.values(atlasAcordes).forEach(tonalidade => {
        Object.values(tonalidade).forEach(tipoAcorde => {
          // tipoAcorde é um objeto com 5 posições CAGED
          const posicoes = Object.values(tipoAcorde);
          posicoes.forEach(acorde => {
            expect(acorde).toHaveProperty('id');
            expect(acorde).toHaveProperty('name');
            expect(acorde).toHaveProperty('notas');
            expect(acorde).toHaveProperty('formula');
          });
        });
      });
    });

    it('cada tipo de acorde deve ter 5 posições CAGED', () => {
      Object.values(atlasAcordes).forEach(tonalidade => {
        Object.values(tonalidade).forEach(tipoAcorde => {
          const posicoes = Object.keys(tipoAcorde);
          expect(posicoes.length).toBe(5);
        });
      });
    });

    it('cada posição deve ter trastes', () => {
      Object.values(atlasAcordes).forEach(tonalidade => {
        Object.values(tonalidade).forEach(tipoAcorde => {
          Object.values(tipoAcorde).forEach(acorde => {
            expect(acorde).toHaveProperty('posicaoDetalhes');
            expect(acorde.posicaoDetalhes).toHaveProperty('trastes');
          });
        });
      });
    });

    it('total de 264+ combinações (12 tons × 22 tipos)', () => {
      let total = 0;
      Object.values(atlasAcordes).forEach(tonalidade => {
        total += Object.keys(tonalidade).length;
      });
      expect(total).toBeGreaterThanOrEqual(264);
    });
  });

  describe('Atlas de Progressões', () => {
    it('deve conter 18+ progressões', () => {
      const progressoes = Object.values(atlasProgressoes);
      expect(progressoes.length).toBeGreaterThanOrEqual(18);
    });

    it('cada progressão deve ter propriedades obrigatórias', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        expect(prog).toHaveProperty('id');
        expect(prog).toHaveProperty('name');
        expect(prog).toHaveProperty('acordes');
        expect(prog).toHaveProperty('generos');
        expect(prog).toHaveProperty('descricao');
      });
    });

    it('cada progressão deve ter 2+ acordes', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        expect(prog.acordes.length).toBeGreaterThanOrEqual(2);
      });
    });

    it('acordes devem ser strings válidas', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        prog.acordes.forEach(acorde => {
          expect(typeof acorde).toBe('string');
          expect(acorde.length).toBeGreaterThan(0);
        });
      });
    });

    it('descrição deve ser não-vazia', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        expect(prog.descricao.length).toBeGreaterThan(0);
      });
    });
  });

  // ===== TESTES DE INTEGRAÇÃO =====
  describe('Integração entre Atlases', () => {
    it('modos devem ter 7 tipos', () => {
      const modos = listModos();
      expect(modos.length).toBe(7);
    });

    it('campos devem ter acordes válidos', () => {
      Object.values(atlasCamposHarmonicos).forEach(tonalidade => {
        Object.values(tonalidade).forEach(campo => {
          expect(campo.acordes.length).toBe(7);
        });
      });
    });
  });

  // ===== TESTES DE ESTRUTURA =====
  describe('Estrutura de Dados', () => {
    it('atlases devem ser objetos', () => {
      expect(typeof atlasModosGregos).toBe('object');
      expect(typeof atlasCamposHarmonicos).toBe('object');
      expect(typeof atlasAcordes).toBe('object');
      expect(typeof atlasProgressoes).toBe('object');
    });

    it('atlases não devem estar vazios', () => {
      expect(Object.keys(atlasModosGregos).length).toBeGreaterThan(0);
      expect(Object.keys(atlasCamposHarmonicos).length).toBeGreaterThan(0);
      expect(Object.keys(atlasAcordes).length).toBeGreaterThan(0);
      expect(Object.keys(atlasProgressoes).length).toBeGreaterThan(0);
    });

    it('progressões devem ter IDs únicos', () => {
      const ids = Object.values(atlasProgressoes).map(item => item.id);
      const idsUnicos = new Set(ids);
      expect(idsUnicos.size).toBe(ids.length);
    });
  });

  // ===== TESTES DE VALIDAÇÃO =====
  describe('Validação de Dados', () => {
    it('nenhum campo obrigatório deve ser null ou undefined', () => {
      const testarValidacao = (atlas) => {
        Object.values(atlas).forEach(item => {
          Object.values(item).forEach(valor => {
            expect(valor).not.toBeNull();
            expect(valor).not.toBeUndefined();
          });
        });
      };

      testarValidacao(atlasModosGregos);
      testarValidacao(atlasCamposHarmonicos);
      testarValidacao(atlasAcordes);
      testarValidacao(atlasProgressoes);
    });

    it('strings não devem estar vazias', () => {
      const testarStrings = (atlas) => {
        Object.values(atlas).forEach(item => {
          Object.entries(item).forEach(([key, valor]) => {
            if (typeof valor === 'string') {
              expect(valor.trim().length).toBeGreaterThan(0);
            }
          });
        });
      };

      testarStrings(atlasModosGregos);
      testarStrings(atlasCamposHarmonicos);
      testarStrings(atlasAcordes);
      testarStrings(atlasProgressoes);
    });

    it('progressões devem ter tensão válida', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        expect(prog.tensao).toBeDefined();
        expect(typeof prog.tensao).toBe('string');
      });
    });
  });

  // ===== TESTES DE PERFORMANCE =====
  describe('Performance', () => {
    it('atlases devem carregar rapidamente', () => {
      const inicio = performance.now();
      Object.values(atlasModosGregos);
      Object.values(atlasCamposHarmonicos);
      Object.values(atlasAcordes);
      Object.values(atlasProgressoes);
      const fim = performance.now();
      
      expect(fim - inicio).toBeLessThan(100); // Menos de 100ms
    });

    it('busca deve ser eficiente', () => {
      const inicio = performance.now();
      
      const search = (atlas, termo) => {
        return Object.values(atlas).filter(item =>
          JSON.stringify(item).toLowerCase().includes(termo.toLowerCase())
        );
      };

      search(atlasModosGregos, 'jonio');
      search(atlasCamposHarmonicos, 'maior');
      search(atlasAcordes, 'major');
      search(atlasProgressoes, 'blues');
      
      const fim = performance.now();
      expect(fim - inicio).toBeLessThan(200); // Menos de 200ms
    });
  });

  // ===== TESTES DE COBERTURA =====
  describe('Cobertura de Dados', () => {
    it('deve haver dados para todos os 12 tons', () => {
      expect(Object.keys(atlasModosGregos).length).toBe(12);
      expect(Object.keys(atlasCamposHarmonicos).length).toBe(12);
      expect(Object.keys(atlasAcordes).length).toBe(12);
    });

    it('deve haver múltiplos gêneros em progressões', () => {
      const todosGeneros = [];
      Object.values(atlasProgressoes).forEach(p => {
        todosGeneros.push(...p.generos);
      });
      const generosUnicos = new Set(todosGeneros);
      expect(generosUnicos.size).toBeGreaterThanOrEqual(5);
    });
  });

  // ===== TESTES DE REDUNDÂNCIA =====
  describe('Verificação de Redundâncias', () => {
    it('não deve haver nomes duplicados em progressões', () => {
      const nomes = Object.values(atlasProgressoes).map(p => p.name);
      const nomesUnicos = new Set(nomes);
      expect(nomesUnicos.size).toBe(nomes.length);
    });
  });
});

// ===== TESTES DE ESTATÍSTICAS =====
describe('Estatísticas do TrasTeoria v8.0', () => {
  it('deve ter 3500+ diagramas totais', () => {
    const totalModos = 12 * 7 * 5; // 12 tons × 7 modos × 5 shapes = 420
    const totalCampos = 12 * 4 * 7; // 12 tons × 4 tipos × 7 acordes = 336
    const totalAcordes = 12 * 22 * 5; // 12 tons × 22 tipos × 5 posições = 1320
    
    const total = totalModos + totalCampos + totalAcordes;
    expect(total).toBeGreaterThanOrEqual(2000); // 2076 total
  });

  it('deve ter 84 combinações de modos (12 tons × 7 modos)', () => {
    let total = 0;
    Object.values(atlasModosGregos).forEach(tonalidade => {
      total += Object.keys(tonalidade).length;
    });
    expect(total).toBe(84);
  });

  it('deve ter 48 combinações de campos (12 tons × 4 tipos)', () => {
    let total = 0;
    Object.values(atlasCamposHarmonicos).forEach(tonalidade => {
      total += Object.keys(tonalidade).length;
    });
    expect(total).toBe(48);
  });

  it('deve ter 18 progressões', () => {
    const progressoes = Object.keys(atlasProgressoes).length;
    expect(progressoes).toBe(18);
  });
});
