import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// --- FIX: Create a specific type that merges HTML and Motion props ---
type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & HTMLMotionProps<'button'>;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  fullWidth = false,
  glow = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: `bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md dark:bg-primary-500 dark:hover:bg-primary-600 ${glow ? 'shadow-primary-500/25 hover:shadow-primary-500/40' : ''}`,
    secondary: `bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-sm hover:shadow-md dark:bg-secondary-500 dark:hover:bg-secondary-600 ${glow ? 'shadow-secondary-500/25 hover:shadow-secondary-500/40' : ''}`,
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-primary-500',
    ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-primary-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const glowClass = glow ? 'shadow-lg' : '';

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, repeat: Infinity, repeatType: "reverse" as const }
    }
  };

  return (
    // --- FIX: Cast the props to our new merged type ---
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: glow ? "0 10px 25px -5px rgba(59, 130, 246, 0.4)" : undefined }}
      whileTap={{ scale: 0.98 }}
      variants={glow ? pulseVariants : undefined}
      animate={glow ? "pulse" : "initial"}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${glowClass} ${className}`}
      disabled={disabled || loading}
      {...props as MotionButtonProps}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileTap={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.3 }}
      />
      
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
