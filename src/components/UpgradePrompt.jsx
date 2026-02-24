/**
 * 🚀 Upgrade Prompt Component
 * Modal para incentivar upgrade para Premium
 */

import React from 'react';
import { X, Crown, Check } from 'lucide-react';
import { usePremium } from '../contexts/PremiumContext';
import { PREMIUM_BENEFITS, PRICING } from '../config/features';
import AnimatedButton from './AnimatedButton';
import PremiumBadge from './PremiumBadge';

const UpgradePrompt = () => {
  const { showUpgradeModal, blockedFeature, closeUpgradeModal, unlockPremium, getFeatureInfo } = usePremium();
  
  if (!showUpgradeModal) return null;
  
  const featureInfo = blockedFeature ? getFeatureInfo(blockedFeature) : null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 p-8 text-white rounded-t-2xl">
          <button
            onClick={closeUpgradeModal}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-16 h-16" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-2">
            Desbloqueie o Modos Gregos PRO
          </h2>
          
          {featureInfo && (
            <p className="text-center text-yellow-100 text-lg">
              Para acessar <strong>{featureInfo.name}</strong>, faça upgrade para Premium
            </p>
          )}
        </div>
        
        {/* Benefícios */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">
            O que você ganha com o Premium:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {PREMIUM_BENEFITS.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="text-3xl">{benefit.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </div>
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              </div>
            ))}
          </div>
          
          {/* Preços */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Mensal */}
            <div className="border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-yellow-400 transition-colors">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Mensal
                </h4>
                <div className="text-4xl font-bold text-slate-800 dark:text-slate-200">
                  R$ {PRICING.monthly.price.toFixed(2)}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  por mês
                </div>
              </div>
              <AnimatedButton
                onClick={unlockPremium}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Começar Agora
              </AnimatedButton>
            </div>
            
            {/* Anual */}
            <div className="border-2 border-yellow-400 rounded-xl p-6 relative bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <PremiumBadge text="ECONOMIA DE 16%" variant="small" />
              </div>
              
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Anual
                </h4>
                <div className="text-4xl font-bold text-slate-800 dark:text-slate-200">
                  R$ {PRICING.yearly.price.toFixed(2)}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  por ano
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  ~R$ {(PRICING.yearly.price / 12).toFixed(2)}/mês
                </div>
              </div>
              <AnimatedButton
                onClick={unlockPremium}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white py-3 rounded-lg font-semibold transition-all shadow-lg"
              >
                Melhor Oferta
              </AnimatedButton>
            </div>
          </div>
          
          {/* Garantia */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
            ✅ Garantia de 7 dias • ✅ Cancele quando quiser • ✅ Suporte prioritário
          </div>
          
          {/* Botão Continuar com Free */}
          <div className="text-center">
            <button
              onClick={closeUpgradeModal}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-sm underline transition-colors"
            >
              Continuar com versão gratuita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;

