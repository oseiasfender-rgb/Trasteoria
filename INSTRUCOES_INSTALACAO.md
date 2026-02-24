# 🎸 Instruções de Instalação - Modos Gregos v4.3

## 📦 Opção 1: Baixar Projeto Completo (Recomendado)

### Passo 1: Baixar o Arquivo
O projeto está compactado em: `/home/ubuntu/modos-gregos-app-v4.3.tar.gz` (178 MB)

### Passo 2: Extrair
```bash
tar -xzf modos-gregos-app-v4.3.tar.gz
cd modos-gregos-app
```

### Passo 3: Instalar Dependências
```bash
pnpm install
```

**Não tem pnpm?** Instale com:
```bash
npm install -g pnpm
```

### Passo 4: Iniciar o Aplicativo
```bash
pnpm run dev
```

### Passo 5: Abrir no Navegador
Acesse: **http://localhost:5173**

---

## 🔄 Opção 2: Copiar Arquivos Manualmente

Se preferir, você pode copiar apenas os arquivos modificados para seu projeto existente:

### Arquivos Corrigidos (copiar estes):

1. **`src/utils/audioEngine.js`** - Sistema de áudio corrigido
2. **`src/contexts/AppContext.jsx`** - Context API atualizado
3. **`src/App.jsx`** - Integração com transposição
4. **`src/components/FundamentosSection.jsx`** - Áudio funcional
5. **`src/components/InteractiveFretboard.jsx`** - Conflito resolvido

### Como copiar:
```bash
# Na pasta do seu projeto local
cp /caminho/para/arquivo/corrigido src/caminho/destino
```

---

## 🚀 Opção 3: Clonar do Sandbox

Se você tem acesso SSH ao sandbox:

```bash
# Na sua máquina local
scp -r ubuntu@sandbox:/home/ubuntu/modos-gregos-app ./
cd modos-gregos-app
pnpm install
pnpm run dev
```

---

## ✅ Verificar Instalação

Após iniciar o aplicativo, você deve ver no terminal:

```
VITE v6.3.5  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Sem erros no console?** ✅ Tudo certo!

---

## 🧪 Testes Rápidos

### 1. Testar Áudio
- Abra **Fundamentos** → **Teoria Musical**
- Clique em **"Ouvir"** em qualquer intervalo
- **Esperado:** Duas notas tocam sequencialmente

### 2. Testar Transposição
- Abra **Modos Gregos**
- Mude a tonalidade de **C** para **G**
- **Esperado:** Campo harmônico atualiza automaticamente

### 3. Testar Bateria
- Abra **Estilos**
- Clique em qualquer ritmo
- **Esperado:** Padrão de bateria toca

---

## 🐛 Problemas Comuns

### Erro: "pnpm: command not found"
**Solução:**
```bash
npm install -g pnpm
```

### Erro: "Port 5173 is already in use"
**Solução:**
```bash
# Matar processo na porta
npx kill-port 5173
# Ou usar outra porta
pnpm run dev -- --port 5174
```

### Erro: "Cannot find module..."
**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Áudio não toca
**Solução:**
- Verifique se o navegador não está mutado
- Tente em navegador diferente (Chrome recomendado)
- Verifique permissões de áudio do navegador

---

## 📋 Requisitos do Sistema

### Obrigatório:
- **Node.js:** v18 ou superior
- **pnpm:** v8 ou superior (ou npm/yarn)
- **Navegador:** Chrome, Firefox, Safari ou Edge (versões recentes)

### Recomendado:
- **RAM:** 4GB ou mais
- **Espaço em disco:** 500MB livres
- **Conexão:** Para download de dependências

---

## 📁 Estrutura do Projeto

```
modos-gregos-app/
├── src/
│   ├── App.jsx                    ✅ Corrigido
│   ├── contexts/
│   │   └── AppContext.jsx         ✅ Corrigido
│   ├── utils/
│   │   ├── audioEngine.js         ✅ Corrigido
│   │   └── drumEngine.js
│   ├── components/
│   │   ├── FundamentosSection.jsx ✅ Corrigido
│   │   ├── InteractiveFretboard.jsx ✅ Corrigido
│   │   ├── HarmoniaSection.jsx
│   │   ├── EscalasArpejosSection.jsx
│   │   ├── ImprovisacaoSection.jsx
│   │   ├── EstilosSection.jsx
│   │   ├── DesenvolvimentoSection.jsx
│   │   └── ... (outros componentes)
│   └── data/
│       ├── modosDataExpanded.js
│       └── musicTheory.js
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 Próximos Passos

Após testar localmente:

1. **Funciona?** 
   - Me avise o que está funcionando bem
   - Me diga se encontrou algum problema

2. **Prioridade:**
   - Melhorar qualidade do áudio (samples profissionais)?
   - Completar backing tracks (bateria + baixo + acordes)?
   - Adicionar mais conteúdo nas seções?

3. **Feedback:**
   - O que você gostou?
   - O que precisa melhorar?
   - Alguma ideia nova?

---

## 💡 Dicas

### Para desenvolvimento:
```bash
# Modo desenvolvimento (hot reload)
pnpm run dev

# Build para produção
pnpm run build

# Preview do build
pnpm run preview
```

### Para debug:
- Abra o **Console do Navegador** (F12)
- Verifique mensagens de erro
- Logs informativos estão habilitados

### Para performance:
- Use **Chrome** para melhor performance de áudio
- Feche outras abas pesadas
- Verifique uso de CPU/RAM

---

## 📞 Suporte

**Encontrou algum problema?**
- Descreva o erro
- Envie screenshot do console (F12)
- Me avise qual navegador está usando

**Tudo funcionando?**
- Me conte o que achou!
- Sugira melhorias
- Vamos para a próxima fase! 🚀

---

**Versão:** 4.3  
**Data:** 24/11/2025  
**Status:** ✅ Pronto para uso

