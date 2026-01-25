/**
 * 📱 PWA Installer
 * Componente para registrar Service Worker e habilitar PWA
 */

import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export const PWAInstaller = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registrado:', registration);
          
          // Verificar atualizações periodicamente
          setInterval(() => {
            registration.update();
          }, 60000);
        })
        .catch((error) => {
          console.error('[PWA] Erro ao registrar Service Worker:', error);
        });
    }

    // Escutar evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    });

    // Escutar quando o app é instalado
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App instalado com sucesso');
      setShowPrompt(false);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('[PWA] Usuário aceitou instalação');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-start gap-3">
        <Download className="w-5 h-5 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Instalar TrasTeoria</h3>
          <p className="text-sm opacity-90 mb-3">
            Instale o app para acessar offline e ter uma melhor experiência.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="bg-white text-purple-600 px-4 py-2 rounded font-semibold hover:bg-opacity-90 transition-colors text-sm"
              aria-label="Instalar aplicativo"
            >
              Instalar
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="bg-white/20 px-4 py-2 rounded font-semibold hover:bg-white/30 transition-colors text-sm"
              aria-label="Fechar notificação"
            >
              Depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWAInstaller;
