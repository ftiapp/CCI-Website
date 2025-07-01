'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  ...props 
}) {
  const baseStyles = 'relative inline-flex items-center justify-center font-prompt font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden';
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-xl',
    xl: 'px-10 py-5 text-lg rounded-2xl'
  };
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500 transform hover:-translate-y-0.5',
    secondary: 'bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 hover:text-slate-800 shadow-md hover:shadow-lg focus:ring-slate-400 border border-slate-200 hover:border-slate-300',
    outline: 'border-2 border-emerald-300 hover:border-emerald-400 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 focus:ring-emerald-500 backdrop-blur-sm',
    ghost: 'hover:bg-slate-100 text-slate-700 hover:text-slate-800 focus:ring-slate-400',
    link: 'text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline p-0 h-auto focus:ring-emerald-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500 transform hover:-translate-y-0.5',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500 transform hover:-translate-y-0.5',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl focus:ring-yellow-500 transform hover:-translate-y-0.5'
  };

  const shouldShowShine = ['primary', 'danger', 'success', 'warning'].includes(variant);

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
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
      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Shine effect for gradient buttons */}
      {shouldShowShine && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
      )}
      
      {/* Ripple effect background */}
      {variant === 'outline' && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-xl"></div>
      )}
      
      {/* Glass morphism effect for outline variant */}
      {variant === 'outline' && (
        <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-xl"></div>
      )}
    </motion.button>
  );
}