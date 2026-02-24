## Especificação Técnica de Software (ETS) - TrasTeoria v1.0 (Maestro)

**Versão:** 1.0 (Maestro)  
**Data:** 17 de Fevereiro de 2026  
**Status:** ✅ **RELEASE ESTÁVEL**

---

### 1. Visão Geral do Projeto

O **TrasTeoria** é uma plataforma educacional de música interativa, focada no ensino de guitarra elétrica. A versão `v1.0 (Maestro)` oferece uma base sólida com 14 seções educacionais, um sistema de gamificação e uma arquitetura robusta, pronta para futuras expansões.

### 2. Arquitetura e Tecnologias

A plataforma é construída sobre uma stack moderna de tecnologias web:

| Tecnologia | Versão | Descrição |
|---|---|---|
| **React** | 19 | Biblioteca principal para a construção da interface de usuário. |
| **Vite** | 6.3 | Ferramenta de build e desenvolvimento rápido. |
| **TailwindCSS** | 4.1 | Framework CSS para estilização da interface. |
| **Firebase** | - | Plataforma para autenticação de usuários e (futuramente) banco de dados. |

### 3. Funcionalidades Principais

#### 3.1. Seções Educacionais

A `v1.0` inclui 14 seções educacionais, cobrindo desde os fundamentos até tópicos avançados:

1.  **Fundamentos:** Teoria musical, técnica e escalas básicas.
2.  **Harmonia:** Campos harmônicos, acordes, progressões e voicings.
3.  **Escalas & Arpejos:** Escalas maiores, menores, pentatônicas e arpejos.
4.  **Improvisação:** Técnicas de improvisação, solos e phrasing.
5.  **Estilos:** Blues, Jazz, Rock, Funk e Bossa Nova.
6.  **Desenvolvimento:** Técnicas avançadas, velocity e dinâmica.
7.  **Composição:** Criação de progressões, arranjos e composição original.
8.  **Leitura:** Exercícios de leitura musical com gamificação.
9.  **Repertório:** Biblioteca de músicas com cifras e dicas.
10. **Modos Gregos:** Todos os 7 modos com diagramas interativos.
11. **Band Creator:** Criador de banda virtual multi-instrumental.
12. **AI Suggester:** Sugestões de acordes com IA.
13. **Ear Training:** Treinamento auditivo interativo.
14. **Guitar Input:** Entrada de guitarra com reconhecimento.

#### 3.2. Sistema de Gamificação

- **XP e Níveis:** Os usuários ganham pontos de experiência (XP) e sobem de nível ao completar atividades.
- **Achievements:** Conquistas são desbloqueadas ao atingir marcos específicos.
- **Leaderboard:** Um ranking global em tempo real incentiva a competição saudável.

#### 3.3. Segurança

- **Autenticação:** O login de administrador é protegido por uma senha armazenada em variáveis de ambiente no Vercel, acessada via `import.meta.env.VITE_ADMIN_PASSWORD`.

### 4. Roadmap de Desenvolvimento

| Versão | Nome | Foco Principal |
|---|---|---|
| **v1.0** | Maestro | Base funcional com 14 seções e gamificação. |
| **v2.0** | Virtuoso | **Upgrade de Áudio Profissional** com a implementação do `SampleEngine` e samples reais. |
| **v3.0+**| Futuro | Integração com Stripe para assinaturas, API backend, apps nativos para iOS/Android. |

### 5. Documentação de Suporte

- **`GUIA_COMPLETO_SAMPLE_ENGINE.md`:** Documentação técnica detalhada sobre a arquitetura e implementação do sistema de áudio profissional (a ser implementado na `v2.0`).

---

*Este documento substitui todos os relatórios e logs anteriores, servindo como a fonte oficial de informações sobre o estado do projeto TrasTeoria v1.0.*
