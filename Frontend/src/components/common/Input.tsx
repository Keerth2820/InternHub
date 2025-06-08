import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

// --- FIX: Create a specific type that merges HTML and Motion props ---
type MotionInputProps = InputHTMLAttributes<HTMLInputElement> & HTMLMotionProps<'input'>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  fullWidth = false,
  className = '',
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = 'block px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';
  const errorClasses = error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  const iconPadding = icon ? 'pl-10' : '';

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <motion.label 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          animate={{ color: isFocused ? '#2563eb' : undefined, scale: isFocused ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
      <div className="relative">
        {icon && (
          <motion.div 
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            animate={{ scale: isFocused ? 1.1 : 1, color: isFocused ? '#2563eb' : '#9ca3af' }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-5 w-5 text-gray-400 dark:text-gray-500">{icon}</div>
          </motion.div>
        )}
        {/* --- FIX: Cast the props to our new merged type --- */}
        <motion.input
          ref={ref}
          className={`${baseClasses} ${errorClasses} ${widthClass} ${iconPadding} ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          animate={{
            scale: isFocused ? 1.01 : 1,
            boxShadow: isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : '0 0 0 0px rgba(37, 99, 235, 0)'
          }}
          transition={{ duration: 0.2 }}
          {...props as MotionInputProps}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-sm text-error-600 dark:text-error-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;