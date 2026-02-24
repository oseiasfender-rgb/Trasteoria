/**
 * 🌟 Premium Context
 * Gerenciamento de plano Free vs Premium
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FEATURES, FEATURE_NAMES, FEATURE_DESCRIPTIONS } from '../config/features';

const PremiumContext = createContext();

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within PremiumProvider');
  }
  return context;
};

export const PremiumProvider = ({ children }) => {
  // Estado do plano (em produção, viria de API/auth)
  const [isPremium, setIsPremium] = useState(() => {
    // Carregar do localStorage
    const saved = localStorage.getItem('isPremium');
    return saved === 'true';
  });
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [blockedFeature, setBlockedFeature] = useState(null);
  
  // Salvar no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('isPremium', isPremium.toString());
  }, [isPremium]);
  
  // Obter features do plano atual
  const features = isPremium ? FEATURES.PREMIUM : FEATURES.FREE;
  
  /**
   * Verifica se tem acesso a uma feature
   * @param {string} featureName - Nome da feature
   * @returns {boolean}
   */
  const hasAccess = (featureName) => {
    const featureValue = features[featureName];
    
    // Se for boolean, retornar direto
    if (typeof featureValue === 'boolean') {
      return featureValue;
    }
    
    // Se for 'all', tem acesso
    if (featureValue === 'all') {
      return true;
    }
    
    // Se for 'limited', tem acesso parcial
    if (featureValue === 'limited') {
      return true; // Mas com limites
    }
    
    // Se for número, tem acesso se > 0
    if (typeof featureValue === 'number') {
      return featureValue > 0;
    }
    
    return false;
  };
  
  /**
   * Verifica se uma feature está limitada
   * @param {string} featureName - Nome da feature
   * @returns {boolean}
   */
  const isLimited = (featureName) => {
    const featureValue = features[featureName];
    return featureValue === 'limited';
  };
  
  /**
   * Obtém o limite de uma feature
   * @param {string} featureName - Nome da feature
   * @returns {number|null}
   */
  const getLimit = (featureName) => {
    const featureValue = features[featureName];
    
    if (typeof featureValue === 'number') {
      return featureValue;
    }
    
    // Verificar limites específicos
    const limitKey = `max${featureName.charAt(0).toUpperCase() + featureName.slice(1)}`;
    if (features[limitKey] !== undefined) {
      return features[limitKey];
    }
    
    return null;
  };
  
  /**
   * Tenta acessar uma feature
   * Se não tiver acesso, mostra modal de upgrade
   * @param {string} featureName - Nome da feature
   * @returns {boolean} - true se tem acesso, false se não
   */
  const checkAccess = (featureName) => {
    if (hasAccess(featureName)) {
      return true;
    }
    
    // Bloquear e mostrar modal
    setBlockedFeature(featureName);
    setShowUpgradeModal(true);
    return false;
  };
  
  /**
   * Desbloqueia Premium (mock - em produção seria via pagamento)
   */
  const unlockPremium = () => {
    setIsPremium(true);
    setShowUpgradeModal(false);
    setBlockedFeature(null);
  };
  
  /**
   * Volta para Free (para testes)
   */
  const downgradeToFree = () => {
    setIsPremium(false);
  };
  
  /**
   * Fecha modal de upgrade
   */
  const closeUpgradeModal = () => {
    setShowUpgradeModal(false);
    setBlockedFeature(null);
  };
  
  /**
   * Obtém informações de uma feature
   * @param {string} featureName - Nome da feature
   * @returns {object}
   */
  const getFeatureInfo = (featureName) => {
    return {
      name: FEATURE_NAMES[featureName] || featureName,
      description: FEATURE_DESCRIPTIONS[featureName] || '',
      hasAccess: hasAccess(featureName),
      isLimited: isLimited(featureName),
      limit: getLimit(featureName),
    };
  };
  
  const value = {
    // Estado
    isPremium,
    features,
    showUpgradeModal,
    blockedFeature,
    
    // Métodos
    hasAccess,
    isLimited,
    getLimit,
    checkAccess,
    unlockPremium,
    downgradeToFree,
    closeUpgradeModal,
    getFeatureInfo,
  };
  
  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  );
};

export default PremiumContext;

