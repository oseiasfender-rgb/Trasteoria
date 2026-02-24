/**
 * 📊 useAnalytics Hook
 * Hook para rastreamento de eventos e métricas
 */

import { useEffect } from 'react';

export const useAnalytics = () => {
  useEffect(() => {
    // Inicializar Google Analytics
    if (typeof window !== 'undefined' && !window.gtag) {
      // Script do Google Analytics será carregado via index.html
      window.dataLayer = window.dataLayer || [];
      
      function gtag() {
        window.dataLayer.push(arguments);
      }
      
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX'); // Substituir com seu ID do GA
    }
  }, []);

  const trackEvent = (eventName, eventParams = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  const trackPageView = (path, title) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: path,
        page_title: title,
      });
    }
  };

  const trackUserProperty = (property, value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', {
        [property]: value,
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackUserProperty,
  };
};

export default useAnalytics;
