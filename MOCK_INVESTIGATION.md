## Investigação do Problema de Mock do AudioContext

**Objetivo:** Diagnosticar e resolver o erro `TypeError: ... is not a constructor` que ocorre ao tentar mockar o `AudioContext` nos testes com Vitest.

### Análise do Erro

O erro ocorre na linha `mockAudioContext = new AudioContext();` dentro do `beforeEach` nos arquivos de teste. Isso indica que o `AudioContext` que está sendo usado não é uma classe ou função construtora válida no ambiente de teste.

O mock global definido em `src/setupTests.js` com `vi.stubGlobal('AudioContext', mockAudioContext);` parece não estar sendo aplicado corretamente ou está sendo sobrescrito.

### Hipóteses

1.  **Escopo do Mock:** O mock não está no escopo correto quando os testes são executados.
2.  **Configuração do Vitest:** O Vitest pode precisar de uma configuração específica para lidar com mocks de APIs globais do navegador.
3.  **Implementação do Mock:** A forma como o mock está sendo criado (`vi.fn().mockImplementation(...)`) pode não ser a ideal para uma classe como `AudioContext`.

### Próximos Passos

1.  **Revisar a Documentação do Vitest:** Vou pesquisar na documentação do Vitest a forma correta de mockar APIs globais do navegador como o `AudioContext`.
2.  **Tentar uma Abordagem Diferente para o Mock:** Vou tentar criar o mock usando `vi.mock` em vez de `vi.stubGlobal` para ver se o comportamento muda.
3.  **Isolar o Problema:** Vou criar um arquivo de teste mínimo para isolar o problema e testar diferentes abordagens de mock em um ambiente controlado.


### Novas Descobertas

A pesquisa na documentação do Vitest e em outros recursos online revelou algumas informações importantes:

*   **`vi.stubGlobal` é a abordagem correta:** A documentação do Vitest confirma que `vi.stubGlobal` é a maneira correta de mockar APIs globais do navegador.
*   **Problema com `jsdom`:** O ambiente de teste padrão do Vitest, `jsdom`, não possui uma implementação do `AudioContext`. Isso significa que precisamos fornecer um mock completo.
*   **Biblioteca `standardized-audio-context-mock`:** Existe uma biblioteca chamada `standardized-audio-context-mock` que parece ser a solução ideal para este problema. Ela fornece um mock completo e padronizado do `AudioContext`.

### Próximo Passo: Implementar `standardized-audio-context-mock`

Vou instalar a biblioteca `standardized-audio-context-mock` e usá-la para criar um mock robusto do `AudioContext` no arquivo `src/setupTests.js`.
