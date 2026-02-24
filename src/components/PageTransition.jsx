/**
 * 🎬 Page Transition Component
 * Transições suaves entre páginas/seções
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children, id }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ 
          duration: 0.3,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

