/**
 * ⏳ Loading Spinner Component
 * Indicador de carregamento elegante
 */

import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'green', text = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  const colorClasses = {
    green: 'border-green-500 border-t-transparent',
    blue: 'border-blue-500 border-t-transparent',
    red: 'border-red-500 border-t-transparent',
    white: 'border-white border-t-transparent'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

