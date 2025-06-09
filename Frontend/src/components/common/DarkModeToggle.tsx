import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDarkMode ? 180 : 0,
          scale: isDarkMode ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-5 w-5 text-yellow-500" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          rotate: isDarkMode ? 0 : -180,
          scale: isDarkMode ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        <Moon className="h-5 w-5 text-blue-400" />
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;