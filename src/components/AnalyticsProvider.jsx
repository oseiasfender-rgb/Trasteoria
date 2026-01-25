/**
 * 📊 Analytics Provider
 * Componente para rastreamento global de eventos
 */

import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useAnalytics } from '../hooks/useAnalytics.js';

export const AnalyticsProvider = ({ children }) => {
  const { user } = useAuth();
  const { trackEvent, trackUserProperty } = useAnalytics();

  // Rastrear quando usuário faz login
  useEffect(() => {
    if (user) {
      trackEvent('user_login', {
        user_id: user.id,
        user_email: user.email,
      });
      
      trackUserProperty('user_id', user.id);
      trackUserProperty('user_name', user.name);
    }
  }, [user]);

  // Rastrear navegação entre seções
  useEffect(() => {
    const handleSectionChange = (e) => {
      const section = e.detail?.section || 'unknown';
      trackEvent('section_view', {
        section_name: section,
        timestamp: new Date().toISOString(),
      });
    };

    window.addEventListener('sectionChange', handleSectionChange);
    return () => window.removeEventListener('sectionChange', handleSectionChange);
  }, []);

  // Rastrear tempo na página
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const timeOnPage = (Date.now() - startTime) / 1000; // em segundos
      trackEvent('page_time', {
        time_seconds: Math.round(timeOnPage),
      });
    };
  }, []);

  // Rastrear erros
  useEffect(() => {
    const handleError = (event) => {
      trackEvent('error', {
        error_message: event.message,
        error_source: event.filename,
        error_line: event.lineno,
      });
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return <>{children}</>;
};

export default AnalyticsProvider;
