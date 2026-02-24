/**
 * 📱 Responsive Container
 * Componente para garantir responsividade em todos os tamanhos
 */

import React from 'react';

export const ResponsiveContainer = ({ 
  children, 
  className = '',
  maxWidth = 'max-w-7xl'
}) => {
  return (
    <div className={`w-full ${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

export const ResponsiveGrid = ({ 
  children, 
  cols = 3,
  className = ''
}) => {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[cols] || gridClasses[3]} gap-4 sm:gap-6 ${className}`}>
      {children}
    </div>
  );
};

export const ResponsiveFlex = ({ 
  children, 
  direction = 'row',
  className = ''
}) => {
  const directionClasses = {
    row: 'flex-col sm:flex-row',
    column: 'flex-col',
  };

  return (
    <div className={`flex ${directionClasses[direction]} gap-4 sm:gap-6 ${className}`}>
      {children}
    </div>
  );
};

export const ResponsiveText = ({ 
  children, 
  size = 'base',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};

export const ResponsivePadding = ({ 
  children, 
  className = ''
}) => {
  return (
    <div className={`p-4 sm:p-6 lg:p-8 ${className}`}>
      {children}
    </div>
  );
};

export const ResponsiveMargin = ({ 
  children, 
  className = ''
}) => {
  return (
    <div className={`m-4 sm:m-6 lg:m-8 ${className}`}>
      {children}
    </div>
  );
};

export const HideOnMobile = ({ children, className = '' }) => {
  return (
    <div className={`hidden sm:block ${className}`}>
      {children}
    </div>
  );
};

export const ShowOnMobile = ({ children, className = '' }) => {
  return (
    <div className={`sm:hidden ${className}`}>
      {children}
    </div>
  );
};

export const HideOnTablet = ({ children, className = '' }) => {
  return (
    <div className={`hidden lg:block ${className}`}>
      {children}
    </div>
  );
};

export const ShowOnTablet = ({ children, className = '' }) => {
  return (
    <div className={`lg:hidden ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
