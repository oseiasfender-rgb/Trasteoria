/**
 * 🌟 Premium Badge Component
 * Badge visual para indicar features premium
 */

import React from 'react';
import { Crown, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';

const PremiumBadge = ({ 
  variant = 'default', // 'default', 'lock', 'small'
  className = '',
  showIcon = true,
  text = 'PRO'
}) => {
  const variants = {
    default: {
      badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-500',
      icon: Crown,
      size: 'w-4 h-4',
    },
    lock: {
      badge: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600',
      icon: Lock,
      size: 'w-3 h-3',
    },
    small: {
      badge: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-yellow-500 text-xs',
      icon: Crown,
      size: 'w-3 h-3',
    },
  };
  
  const config = variants[variant] || variants.default;
  const Icon = config.icon;
  
  return (
    <Badge 
      className={`${config.badge} ${className} flex items-center gap-1 font-semibold shadow-sm`}
      variant="outline"
    >
      {showIcon && <Icon className={config.icon} />}
      {text}
    </Badge>
  );
};

export default PremiumBadge;

