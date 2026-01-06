/**
 * 🎬 Animated Card Component
 * Card com animações suaves de entrada
 */

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  delay = 0, 
  className = '',
  hover = true 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: 'easeOut'
      }}
      whileHover={hover ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;

