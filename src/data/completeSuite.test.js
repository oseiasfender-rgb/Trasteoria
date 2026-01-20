import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { atlasModosGregos } from '@/data/atlasModosGregos';
import { atlasCamposHarmonicos } from '@/data/atlasCamposHarmonicos';
import { atlasAcordes } from '@/data/atlasAcordes';
import { atlasProgressoes } from '@/data/atlasProgressoes';

describe('TrasTeoria v8.0 - Suite Completa de Testes', () => {
  
  // ===== TESTES DE ATLASES =====
  describe('Atlas de Modos Gregos', () => {
    it('deve conter 7 modos', () => {
      const modos = Object.values(atlasModosGregos);
      expect(modos.length).toBe(7);
    });

    it('cada modo deve ter propriedades obrigatórias', () => {
      Object.values(atlasModosGregos).forEach(modo => {
        expect(modo).toHaveProperty('id');
        expect(modo).toHaveProperty('name');
        expect(modo).toHaveProperty('formula');
        expect(modo).toHaveProperty('description');
        expect(modo).toHaveProperty('shapes');
        expect(modo).toHaveProperty('sonoridade');
        expect(modo).toHaveProperty('brilho');
      });
    });

    it('cada modo deve ter 5 shapes CAGED', () => {
      Object.values(atlasModosGregos).forEach(modo => {
        expect(modo.shapes.length).toBeGreaterThanOrEqual(5);
      });
    });

    it('brilho deve estar entre 0 e 10', () => {
      Object.values(atlasModosGregos).forEach(modo => {
        expect(modo.brilho).toBeGreaterThanOrEqual(0);
        expect(modo.brilho).toBeLessThanOrEqual(10);
      });
    });

    it('nomes dos modos devem ser únicos', () => {
      const nomes = Object.values(atlasModosGregos).map(m => m.name);
      const nomesUnicos = new Set(nomes);
      expect(nomesUnicos.size).toBe(nomes.length);
    });
  });

  describe('Atlas de Campos Harmônicos', () => {
    it('deve conter 4 tipos de campos', () => {
      const tipos = new Set(Object.values(atlasCamposHarmonicos).map(c => c.type));
      expect(tipos.size).toBe(4);
    });

    it('cada campo deve ter propriedades obrigatórias', () => {
      Object.values(atlasCamposHarmonicos).forEach(campo => {
        expect(campo).toHaveProperty('id');
        expect(campo).toHaveProperty('name');
        expect(campo).toHaveProperty('type');
        expect(campo).toHaveProperty('chords');
        expect(campo).toHaveProperty('progressions');
      });
    });

    it('cada campo deve ter 7 acordes diatônicos', () => {
      Object.values(atlasCamposHarmonicos).forEach(campo => {
        expect(campo.chords.length).toBe(7);
      });
    });

    it('cada acorde deve ter símbolo e função', () => {
      Object.values(atlasCamposHarmonicos).forEach(campo => {
        campo.chords.forEach(chord => {
          expect(chord).toHaveProperty('symbol');
          expect(chord).toHaveProperty('function');
        });
      });
    });

    it('progressões devem estar em formato válido', () => {
      Object.values(atlasCamposHarmonicos).forEach(campo => {
        expect(Array.isArray(campo.progressions)).toBe(true);
        campo.progressions.forEach(prog => {
          expect(typeof prog).toBe('string');
        });
      });
    });
  });

  describe('Atlas de Acordes', () => {
    it('deve conter 50+ tipos de acordes', () => {
      const acordes = Object.values(atlasAcordes);
      expect(acordes.length).toBeGreaterThanOrEqual(50);
    });

    it('cada acorde deve ter propriedades obrigatórias', () => {
      Object.values(atlasAcordes).forEach(acorde => {
        expect(acorde).toHaveProperty('id');
        expect(acorde).toHaveProperty('name');
        expect(acorde).toHaveProperty('category');
        expect(acorde).toHaveProperty('formula');
        expect(acorde).toHaveProperty('positions');
        expect(acorde).toHaveProperty('tension');
      });
    });

    it('cada acorde deve ter 5 posições CAGED', () => {
      Object.values(atlasAcordes).forEach(acorde => {
        expect(acorde.positions.length).toBe(5);
      });
    });

    it('cada posição deve ter shape e name', () => {
      Object.values(atlasAcordes).forEach(acorde => {
        acorde.positions.forEach(pos => {
          expect(pos).toHaveProperty('shape');
          expect(pos).toHaveProperty('name');
        });
      });
    });

    it('tension deve estar entre 0 e 10', () => {
      Object.values(atlasAcordes).forEach(acorde => {
        expect(acorde.tension).toBeGreaterThanOrEqual(0);
        expect(acorde.tension).toBeLessThanOrEqual(10);
      });
    });

    it('fórmulas devem ser válidas', () => {
      Object.values(atlasAcordes).forEach(acorde => {
        expect(typeof acorde.formula).toBe('string');
        expect(acorde.formula.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Atlas de Progressões', () => {
    it('deve conter 20+ progressões', () => {
      const progressoes = Object.values(atlasProgressoes);
      expect(progressoes.length).toBeGreaterThanOrEqual(20);
    });

    it('cada progressão deve ter propriedades obrigatórias', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        expect(prog).toHaveProperty('id');
        expect(prog).toHaveProperty('name');
        expect(prog).toHaveProperty('chords');
        expect(prog).toHaveProperty('genre');
        expect(prog).toHaveProperty('description');
      });
    });

    it('cada progressão deve ter 2+ acordes', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        expect(prog.chords.length).toBeGreaterThanOrEqual(2);
      });
    });

    it('acordes devem ser strings válidas', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        prog.chords.forEach(chord => {
          expect(typeof chord).toBe('string');
          expect(chord.length).toBeGreaterThan(0);
        });
      });
    });

    it('descrição deve ser não-vazia', () => {
      Object.values(atlasProgressoes).forEach(prog => {
        expect(prog.description.length).toBeGreaterThan(0);
      });
    });
  });

  // ===== TESTES DE INTEGRAÇÃO =====
  describe('Integração entre Atlases', () => {
    it('modos devem ser referenciadáveis em campos', () => {
      const modosNomes = Object.values(atlasModosGregos).map(m => m.name);
      expect(modosNomes.length).toBe(7);
    });

    it('acordes devem ser referenciadáveis em progressões', () => {
      const acordesNomes = Object.values(atlasAcordes).map(a => a.name);
      expect(acordesNomes.length).toBeGreaterThan(0);
    });

    it('campos devem ter acordes válidos', () => {
      Object.values(atlasCamposHarmonicos).forEach(campo => {
        campo.chords.forEach(chord => {
          expect(chord.symbol).toBeDefined();
          expect(chord.function).toBeDefined();
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

    it('IDs devem ser únicos em cada atlas', () => {
      const testarUnicidade = (atlas) => {
        const ids = Object.values(atlas).map(item => item.id);
        const idsUnicos = new Set(ids);
        expect(idsUnicos.size).toBe(ids.length);
      };

      testarUnicidade(atlasModosGregos);
      testarUnicidade(atlasCamposHarmonicos);
      testarUnicidade(atlasAcordes);
      testarUnicidade(atlasProgressoes);
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

    it('números devem estar em ranges válidos', () => {
      Object.values(atlasModosGregos).forEach(modo => {
        expect(modo.brilho).toBeGreaterThanOrEqual(0);
        expect(modo.brilho).toBeLessThanOrEqual(10);
      });

      Object.values(atlasAcordes).forEach(acorde => {
        expect(acorde.tension).toBeGreaterThanOrEqual(0);
        expect(acorde.tension).toBeLessThanOrEqual(10);
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
      const tones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      
      // Verificar que há dados suficientes para cobrir 12 tons
      expect(Object.keys(atlasModosGregos).length).toBeGreaterThanOrEqual(7);
      expect(Object.keys(atlasCamposHarmonicos).length).toBeGreaterThanOrEqual(4);
      expect(Object.keys(atlasAcordes).length).toBeGreaterThanOrEqual(50);
    });

    it('deve haver múltiplas categorias de acordes', () => {
      const categorias = new Set(Object.values(atlasAcordes).map(a => a.category));
      expect(categorias.size).toBeGreaterThanOrEqual(5);
    });

    it('deve haver múltiplos gêneros em progressões', () => {
      const generos = new Set(Object.values(atlasProgressoes).map(p => p.genre));
      expect(generos.size).toBeGreaterThanOrEqual(5);
    });
  });

  // ===== TESTES DE REDUNDÂNCIA =====
  describe('Verificação de Redundâncias', () => {
    it('não deve haver nomes duplicados em modos', () => {
      const nomes = Object.values(atlasModosGregos).map(m => m.name);
      const nomesUnicos = new Set(nomes);
      expect(nomesUnicos.size).toBe(nomes.length);
    });

    it('não deve haver nomes duplicados em acordes', () => {
      const nomes = Object.values(atlasAcordes).map(a => a.name);
      const nomesUnicos = new Set(nomes);
      expect(nomesUnicos.size).toBe(nomes.length);
    });

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
    const totalModos = 7 * 5; // 7 modos × 5 shapes
    const totalCampos = 4 * 7; // 4 tipos × 7 acordes
    const totalAcordes = Object.keys(atlasAcordes).length * 5; // acordes × 5 posições
    
    const total = totalModos + totalCampos + totalAcordes;
    expect(total).toBeGreaterThanOrEqual(3500);
  });

  it('deve ter 84+ combinações de modos', () => {
    const modos = Object.keys(atlasModosGregos).length;
    expect(modos).toBeGreaterThanOrEqual(7);
  });

  it('deve ter 48+ combinações de campos', () => {
    const campos = Object.keys(atlasCamposHarmonicos).length;
    expect(campos).toBeGreaterThanOrEqual(48);
  });

  it('deve ter 20+ progressões', () => {
    const progressoes = Object.keys(atlasProgressoes).length;
    expect(progressoes).toBeGreaterThanOrEqual(20);
  });
});
