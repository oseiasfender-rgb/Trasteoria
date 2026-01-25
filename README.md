# 🎸 TrasTeoria - Plataforma de Ensino de Guitarra

[![Deploy Status](https://img.shields.io/badge/Deploy-Active-brightgreen)](https://trasteoria-project.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Version](https://img.shields.io/badge/Version-8.0-purple)](package.json)

**TrasTeoria** é uma plataforma educacional completa para aprender guitarra, com foco em teoria musical, harmonia, escalas, improvisação e muito mais. Desenvolvida com React, oferece uma experiência interativa com áudio profissional e conteúdo estruturado.

## 🌟 Características Principais

### 📚 Conteúdo Educacional
- **14 Seções Especializadas**: Fundamentos, Harmonia, Escalas & Arpejos, Improvisação, Estilos, Desenvolvimento, Composição, Leitura, Repertório, Modos Gregos, Band Creator, AI Suggester, Ear Training, Guitar Input, Jam Session
- **4 Atlases com 3500+ Diagramas**: Referência visual completa
- **Conteúdo Interativo**: Exercícios, exemplos práticos e vídeos
- **Suporte Multilíngue**: Interface em português

### 🎵 Engines de Áudio Profissionais
- **5 Engines Principais**: Sample, Drum, Bass, Keyboard, String
- **144 Padrões de Bateria**: 6 estilos diferentes
- **12 Timbres de Teclado**: Com 88 notas
- **7 Instrumentos de Corda**: 6 técnicas de arco

### 🎯 Recursos Avançados
- **Sistema de Progresso**: Rastreie seu aprendizado
- **Modo Dark/Light**: Tema adaptável
- **PWA Completo**: Funciona offline
- **Autenticação**: Login e perfil de usuário
- **Responsivo**: Mobile-first design
- **Acessibilidade**: WCAG 2.1 AA compliant

## 🚀 Quick Start

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/oseiasfender-rgb/trasteoria.git
cd trasteoria

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Deploy no Vercel
vercel deploy
```

## 📖 Documentação

### Estrutura do Projeto

```
trasteoria/
├── src/
│   ├── components/        # Componentes React
│   ├── contexts/          # Context API
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Funções utilitárias
│   ├── data/              # Dados estáticos
│   └── App.jsx            # Componente raiz
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js              # Service Worker
│   └── sitemap.xml        # SEO sitemap
└── index.html             # HTML principal
```

### Componentes Principais

#### Seções Educacionais
- `FundamentosSection` - Fundamentos da guitarra
- `HarmoniaSection` - Harmonia e acordes
- `EscalasArpejosSection` - Escalas e arpejos
- `ImprovisacaoSection` - Técnicas de improvisação
- `EstilosSection` - Estilos musicais
- `ModosGregosSection` - Modos gregos

#### Recursos Interativos
- `BandCreator` - Criador de bandas
- `AIChordSuggester` - Sugestor de acordes com IA
- `EarTraining` - Treinamento auditivo
- `GuitarInput` - Entrada de guitarra
- `JamSession` - Sessão de jam

### Contextos (State Management)

- `AppContext` - Estado global da aplicação
- `ThemeContext` - Gerenciamento de temas
- `ProgressContext` - Rastreamento de progresso
- `PremiumContext` - Funcionalidades premium
- `AuthContext` - Autenticação de usuários

### Hooks Customizados

- `useAnalytics()` - Rastreamento de eventos
- `useProgress()` - Acesso ao progresso do usuário
- `useAuth()` - Autenticação e perfil

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# .env.local
VITE_GA_ID=G-XXXXXXXXXX        # Google Analytics ID
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=8.0.0
```

### Otimizações de Performance

- Code splitting automático com Vite
- Lazy loading de componentes
- Compressão de imagens
- Caching inteligente com Service Worker
- Minificação com Terser

## 📱 PWA (Progressive Web App)

TrasTeoria é uma PWA completa:
- ✅ Funciona offline
- ✅ Instalável como app
- ✅ Sincronização em background
- ✅ Push notifications
- ✅ Cache inteligente

## 🔐 Segurança

- Headers de segurança configurados
- HTTPS automático
- CSRF protection
- XSS prevention
- Content Security Policy

## 📊 Analytics

Integrado com Google Analytics para rastreamento de:
- Visualizações de página
- Eventos de usuário
- Tempo na página
- Erros e exceções
- Comportamento do usuário

## 🧪 Testes

```bash
# Executar testes
npm run test

# Cobertura de testes
npm run test:coverage

# Testes E2E
npm run test:e2e
```

## 🌐 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel deploy
```

### Outras Plataformas

- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: `npm run build && git push`
- **Docker**: Veja `Dockerfile`

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

- 📧 Email: support@trasteoria.com
- 💬 Discord: [Comunidade TrasTeoria](https://discord.gg/trasteoria)
- 🐛 Issues: [GitHub Issues](https://github.com/oseiasfender-rgb/trasteoria/issues)

## 🗺️ Roadmap

- [ ] Integração com Spotify
- [ ] Lições em vídeo ao vivo
- [ ] Comunidade de usuários
- [ ] Certificados de conclusão
- [ ] API pública
- [ ] Aplicativo mobile nativo

## 👨‍💻 Desenvolvido por

**Oseiás Fender** - [GitHub](https://github.com/oseiasfender-rgb)

## 🙏 Agradecimentos

- Comunidade React
- Vercel por hosting
- Todos os contribuidores

---

**Versão**: 8.0.0  
**Última atualização**: 22 de Janeiro de 2026  
**Status**: ✅ Produção
