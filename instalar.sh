#!/bin/bash

echo "🎸 Instalador do Aplicativo Modos Gregos v4.3"
echo "=============================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado!"
    echo "Por favor, instale Node.js v18 ou superior"
    echo "https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) encontrado"

# Verificar pnpm
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm não encontrado. Instalando..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm --version) encontrado"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
pnpm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Instalação concluída com sucesso!"
    echo ""
    echo "🚀 Para iniciar o aplicativo, execute:"
    echo "   pnpm run dev"
    echo ""
    echo "📖 Depois acesse: http://localhost:5173"
else
    echo ""
    echo "❌ Erro na instalação!"
    echo "Tente manualmente: pnpm install"
    exit 1
fi
