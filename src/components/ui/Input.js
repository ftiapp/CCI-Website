'use client';

import { cn } from '@/lib/utils';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Input({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  success,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'default',
  className = '',
  disabled = false,
  ...props
}) {
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-4 text-base'
  };

  const variantStyles = {
    default: 'bg-white/80 backdrop-blur-sm border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20',
    glass: 'bg-white/60 backdrop-blur-md border-white/50 hover:border-white/70 focus:border-emerald-400 focus:ring-emerald-400/20',
    minimal: 'bg-transparent border-0 border-b-2 border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-0 rounded-none px-0'
  };

  const getStatusIcon = () => {
    if (error) return ExclamationCircleIcon;
    if (success) return CheckCircleIcon;
    return null;
  };

  const StatusIcon = getStatusIcon();
  const hasLeftIcon = Icon && iconPosition === 'left';
  const hasRightIcon = (Icon && iconPosition === 'right') || StatusIcon;

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label 
          htmlFor={name} 
          className="block mb-3 font-prompt font-semibold text-slate-700 text-sm"
        >
          {label} 
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {hasLeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-slate-400" />
          </div>
        )}
        
        {/* Input Field */}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          data-field={props['data-field'] || name}
          className={cn(
            // Base styles
            "w-full border rounded-xl font-prompt transition-all duration-300 focus:outline-none focus:ring-2",
            
            // Size styles
            sizeStyles[size],
            
            // Variant styles
            variantStyles[variant],
            
            // Padding adjustments for icons
            hasLeftIcon ? "pl-10" : "",
            hasRightIcon ? "pr-10" : "",
            
            // State-based styles
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" 
              : success
              ? "border-green-300 focus:border-green-500 focus:ring-green-500/20 bg-green-50/50"
              : "",
            
            // Disabled styles
            disabled 
              ? "opacity-50 cursor-not-allowed bg-slate-100 border-slate-200" 
              : "hover:shadow-md",
            
            className
          )}
          {...props}
        />
        
        {/* Right Icon (Custom Icon or Status Icon) */}
        {hasRightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {StatusIcon ? (
              <StatusIcon 
                className={cn(
                  "h-5 w-5",
                  error ? "text-red-500" : success ? "text-green-500" : "text-slate-400"
                )} 
              />
            ) : Icon && iconPosition === 'right' ? (
              <Icon className="h-5 w-5 text-slate-400" />
            ) : null}
          </div>
        )}
        
        {/* Focus ring enhancement */}
        {!disabled && (
          <div className={cn(
            "absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300",
            error 
              ? "bg-gradient-to-r from-red-500/5 to-red-600/5" 
              : success
              ? "bg-gradient-to-r from-green-500/5 to-green-600/5"
              : "bg-gradient-to-r from-emerald-500/5 to-teal-500/5",
            "opacity-0 focus-within:opacity-100"
          )} />
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center text-sm text-red-600"
        >
          <ExclamationCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="font-prompt">{error}</span>
        </motion.div>
      )}
      
      {/* Success Message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center text-sm text-green-600"
        >
          <CheckCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="font-prompt">{success}</span>
        </motion.div>
      )}
      
      {/* Helper Text */}
      {!error && !success && props.helperText && (
        <p className="mt-2 text-sm text-slate-500 font-prompt">
          {props.helperText}
        </p>
      )}
    </motion.div>
  );
}