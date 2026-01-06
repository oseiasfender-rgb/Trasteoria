/**
 * 🎭 Loading Overlay Component
 * Overlay de carregamento para tela inteira ou seções
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const LoadingOverlay = ({ 
  isLoading = false, 
  text = 'Carregando...', 
  fullScreen = false 
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            ${fullScreen ? 'fixed inset-0 z-50' : 'absolute inset-0 z-10'}
            flex items-center justify-center
            bg-black bg-opacity-70 backdrop-blur-sm
          `}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-8 shadow-2xl border border-green-500"
          >
            <LoadingSpinner size="lg" color="green" text={text} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;

