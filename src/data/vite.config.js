import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    cors: true,
    allowedHosts: ['all'],
    middlewareMode: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de performance
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Manual chunks para melhor code splitting
        manualChunks: {
          // Vendors separados
          'react-vendor': ['react', 'react-dom'],
          'lucide-icons': ['lucide-react'],
          // Engines de áudio
          'audio-engines': [
            './src/utils/audioEngine.js',
            './src/utils/drumEngine.js',
            './src/utils/bassEngine.js',
            './src/utils/backingTrackEngine.js',
          ],
        },
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 600,
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
})
