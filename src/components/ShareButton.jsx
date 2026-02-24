/**
 * 📤 Share Button
 * Componente para compartilhar conteúdo em redes sociais
 */

import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

export const ShareButton = ({ 
  title = 'TrasTeoria',
  text = 'Aprenda guitarra com o TrasTeoria',
  url = 'https://trasteoria-project.vercel.app',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', err);
        }
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => {
          if (navigator.share) {
            handleNativeShare();
          } else {
            setShowMenu(!showMenu);
          }
        }}
        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-semibold"
        aria-label="Compartilhar"
        aria-expanded={showMenu}
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Compartilhar</span>
      </button>

      {showMenu && !navigator.share && (
        <div 
          className="absolute right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-2 min-w-48 z-50"
          role="menu"
        >
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-4 py-2 hover:bg-accent rounded transition-colors text-sm"
            role="menuitem"
            aria-label="Compartilhar no Twitter"
          >
            𝕏 Twitter
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-4 py-2 hover:bg-accent rounded transition-colors text-sm"
            role="menuitem"
            aria-label="Compartilhar no Facebook"
          >
            f Facebook
          </a>

          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-4 py-2 hover:bg-accent rounded transition-colors text-sm"
            role="menuitem"
            aria-label="Compartilhar no WhatsApp"
          >
            💬 WhatsApp
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-4 py-2 hover:bg-accent rounded transition-colors text-sm"
            role="menuitem"
            aria-label="Compartilhar no LinkedIn"
          >
            in LinkedIn
          </a>

          <a
            href={shareLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-4 py-2 hover:bg-accent rounded transition-colors text-sm"
            role="menuitem"
            aria-label="Compartilhar no Telegram"
          >
            ✈️ Telegram
          </a>

          <button
            onClick={handleCopyLink}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-accent rounded transition-colors text-sm text-left border-t border-border mt-2 pt-2"
            role="menuitem"
            aria-label="Copiar link"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Link</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
