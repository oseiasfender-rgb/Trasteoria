/**
 * 🎯 Accessibility Provider
 * Componente para melhorar acessibilidade global do app
 */

import React, { useEffect } from 'react';

export const AccessibilityProvider = ({ children }) => {
  useEffect(() => {
    // Adicionar suporte a navegação por teclado
    const handleKeyDown = (e) => {
      // Skip links (Ctrl+1 para ir ao conteúdo principal)
      if (e.ctrlKey && e.key === '1') {
        const main = document.querySelector('main');
        if (main) {
          main.focus();
          main.scrollIntoView();
        }
      }
      
      // Fechar modais com Escape
      if (e.key === 'Escape') {
        const event = new CustomEvent('closeModal');
        document.dispatchEvent(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Adicionar atributos ARIA ao documento
    document.documentElement.setAttribute('lang', 'pt-BR');
    
    // Melhorar contraste em modo dark
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      document.documentElement.classList.add('dark');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div role="application" aria-label="TrasTeoria - Plataforma de Ensino de Guitarra">
      {children}
    </div>
  );
};

export default AccessibilityProvider;
