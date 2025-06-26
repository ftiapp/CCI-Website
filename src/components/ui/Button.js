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
    primary: 'bg-gradient-to-r from-deeplake-600 to-deeplake-700 hover:from-deeplake-700 hover:to-deeplake-800 text-white focus:ring-deeplake-500',
    secondary: 'bg-beige-200 hover:bg-beige-300 text-earth-800 focus:ring-beige-400',
    outline: 'border border-deeplake-300 hover:bg-deeplake-50 text-deeplake-700 focus:ring-deeplake-500',
    ghost: 'hover:bg-beige-100 text-deeplake-700 focus:ring-deeplake-400',
    link: 'text-deeplake-600 hover:text-deeplake-700 underline-offset-4 hover:underline p-0 h-auto',
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
