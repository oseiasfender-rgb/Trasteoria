/**
 * 🌓 Theme Toggle Component
 * Botão para alternar entre tema escuro e claro
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-14 h-7 rounded-full
        flex items-center
        transition-colors duration-300
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900
        ${isDark ? 'bg-gray-700' : 'bg-blue-500'}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Slider */}
      <motion.div
        className={`
          absolute w-5 h-5 rounded-full
          flex items-center justify-center
          ${isDark ? 'bg-gray-900' : 'bg-white'}
        `}
        animate={{
          x: isDark ? 2 : 30
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-blue-400" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun className={`w-3 h-3 transition-opacity ${isDark ? 'opacity-30' : 'opacity-0'}`} />
        <Moon className={`w-3 h-3 transition-opacity ${isDark ? 'opacity-0' : 'opacity-30'}`} />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;

