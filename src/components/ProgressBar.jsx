/**
 * 📊 Progress Bar Component
 * Barra de progresso animada
 */

import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress = 0, 
  color = 'green', 
  height = 'md',
  showPercentage = true,
  animated = true 
}) => {
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progresso</span>
          <span className="text-sm font-semibold text-green-500">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${heightClasses[height]}`}>
        {animated ? (
          <motion.div
            className={`${heightClasses[height]} ${colorClasses[color]} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={`${heightClasses[height]} ${colorClasses[color]} rounded-full transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default ProgressBar;

