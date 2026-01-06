/**
 * 🎬 Animated Button Component
 * Botão com animações e feedback visual profissional
 */

import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const AnimatedButton = ({ 
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white border-green-500',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white border-gray-600',
    danger: 'bg-red-600 hover:bg-red-700 text-white border-red-500',
    outline: 'bg-transparent hover:bg-green-600 text-green-500 hover:text-white border-green-500',
    ghost: 'bg-transparent hover:bg-gray-700 text-gray-300 border-transparent'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const baseClasses = `
    relative
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg
    border-2 transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" color="white" />
          <span>Carregando...</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default AnimatedButton;

