'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '',
  disabled = false,
  fullWidth = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-md font-prompt font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-beige-600 hover:bg-beige-700 text-white focus:ring-beige-500',
    secondary: 'bg-earth-200 hover:bg-earth-300 text-earth-800 focus:ring-earth-400',
    outline: 'border border-beige-300 hover:bg-beige-50 text-beige-700 focus:ring-beige-500',
    ghost: 'hover:bg-earth-100 text-earth-700 focus:ring-earth-400',
    link: 'text-beige-600 hover:text-beige-700 underline-offset-4 hover:underline p-0 h-auto',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
