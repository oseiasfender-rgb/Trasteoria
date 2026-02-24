# 🤝 Guia de Contribuição - TrasTeoria

Obrigado por considerar contribuir para o TrasTeoria! Este documento fornece diretrizes e instruções para contribuir ao projeto.

## 📋 Código de Conduta

Todos os contribuidores devem seguir nosso código de conduta:
- Ser respeitoso e inclusivo
- Não tolerar assédio ou discriminação
- Focar em construtividade
- Respeitar privacidade e confidencialidade

## 🐛 Reportando Bugs

Ao reportar um bug, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir** o bug
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots/vídeos** se aplicável
5. **Informações do ambiente**:
   - SO e versão
   - Navegador e versão
   - Versão do Node.js

### Exemplo de Issue

```markdown
## Descrição
O botão de play não funciona na seção Harmonia.

## Passos para Reproduzir
1. Ir para a seção Harmonia
2. Clicar no botão "Ouvir"
3. Nenhum som é reproduzido

## Comportamento Esperado
O áudio do acorde deve ser reproduzido.

## Ambiente
- OS: Windows 11
- Navegador: Chrome 120
- Node: 18.17.0
```

## 💡 Sugerindo Melhorias

Para sugerir melhorias:

1. Use um título descritivo
2. Descreva o comportamento atual
3. Descreva o comportamento esperado
4. Explique por que essa melhoria seria útil
5. Liste exemplos de implementações similares

## 🔧 Desenvolvendo

### Setup Local

```bash
# Clonar repositório
git clone https://github.com/oseiasfender-rgb/trasteoria.git
cd trasteoria

# Instalar dependências
npm install

# Criar branch para sua feature
git checkout -b feature/sua-feature

# Iniciar servidor de desenvolvimento
npm run dev
```

### Padrões de Código

#### JavaScript/React
- Use ES6+ syntax
- Nomes descritivos para variáveis e funções
- Componentes funcionais com hooks
- Props com PropTypes ou TypeScript

```jsx
// ✅ Bom
const UserProfile = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="user-profile">
      {/* conteúdo */}
    </div>
  );
};

// ❌ Evitar
const UP = ({ u, ol }) => {
  // código confuso
};
```

#### CSS/Tailwind
- Use classes Tailwind
- Organize por responsabilidade
- Mobile-first approach

```jsx
// ✅ Bom
<button className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-colors">
  Clique aqui
</button>

// ❌ Evitar
<button style={{ padding: '8px 16px', backgroundColor: '#9333ea' }}>
  Clique aqui
</button>
```

#### Comentários
- Explique o "por quê", não o "o quê"
- Use JSDoc para funções públicas
- Mantenha comentários atualizados

```jsx
/**
 * Calcula a frequência de uma nota musical
 * @param {string} note - Nota (ex: 'C4', 'D#5')
 * @param {number} octave - Oitava (padrão: 4)
 * @returns {number} Frequência em Hz
 */
function getNoteFrequency(note, octave = 4) {
  // implementação
}
```

### Commits

Use mensagens de commit claras e descritivas:

```bash
# ✅ Bom
git commit -m "feat: adicionar suporte a dark mode"
git commit -m "fix: corrigir bug no seletor de acordes"
git commit -m "docs: atualizar README com instruções de setup"

# ❌ Evitar
git commit -m "fix stuff"
git commit -m "update"
```

### Tipos de Commit

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Mudanças em documentação
- `style:` Formatação, sem mudança lógica
- `refactor:` Refatoração sem mudança funcional
- `perf:` Melhorias de performance
- `test:` Adicionar ou atualizar testes
- `chore:` Atualizações de dependências

## 📝 Pull Request

### Antes de Submeter

1. Atualize sua branch com `main`
2. Execute testes: `npm run test`
3. Verifique linting: `npm run lint`
4. Build localmente: `npm run build`
5. Teste manualmente no navegador

### Processo de PR

1. **Título descritivo**: `feat: adicionar novo componente X`
2. **Descrição clara**:
   - O que foi mudado e por quê
   - Como testar as mudanças
   - Screenshots/vídeos se relevante
3. **Linked Issues**: `Fixes #123`
4. **Checklist**:
   ```markdown
   - [ ] Testes adicionados/atualizados
   - [ ] Documentação atualizada
   - [ ] Sem breaking changes
   - [ ] Código segue style guide
   ```

### Exemplo de PR

```markdown
## Descrição
Adiciona suporte a dark mode em todos os componentes.

## Tipo de Mudança
- [x] Bug fix
- [x] Nova funcionalidade
- [ ] Breaking change

## Como Testar
1. Abrir a aplicação
2. Clicar no toggle de tema
3. Verificar se todos os componentes mudam de cor

## Checklist
- [x] Testes adicionados
- [x] Documentação atualizada
- [x] Sem breaking changes

Fixes #456
```

## 🧪 Testes

Adicione testes para novas funcionalidades:

```jsx
// src/components/__tests__/Button.test.jsx
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renderiza com texto correto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('chama callback ao clicar', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clique</Button>);
    screen.getByText('Clique').click();
    expect(onClick).toHaveBeenCalled();
  });
});
```

## 📚 Documentação

Atualize a documentação quando necessário:

- `README.md` - Instruções gerais
- `CONTRIBUTING.md` - Este arquivo
- Comentários no código - Explicações técnicas
- `docs/` - Documentação detalhada

## 🎯 Processo de Review

1. **Automático**: Testes e linting rodam automaticamente
2. **Manual**: Pelo menos 1 maintainer revisa
3. **Feedback**: Responda aos comentários
4. **Merge**: Após aprovação, seu PR é mesclado

## 📦 Versioning

Seguimos [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH` (ex: 8.0.0)
- MAJOR: breaking changes
- MINOR: novas funcionalidades
- PATCH: correções de bugs

## 🚀 Release Process

1. Atualizar `package.json` com nova versão
2. Atualizar `CHANGELOG.md`
3. Criar tag git: `git tag v8.0.0`
4. Push para main
5. Deploy automático no Vercel

## 💬 Comunicação

- **GitHub Issues**: Bugs e features
- **Discussions**: Perguntas e ideias
- **Discord**: Chat em tempo real
- **Email**: support@trasteoria.com

## 📖 Recursos Úteis

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [Testing Library](https://testing-library.com)

## ⚖️ Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

---

**Obrigado por contribuir para TrasTeoria!** 🎸
