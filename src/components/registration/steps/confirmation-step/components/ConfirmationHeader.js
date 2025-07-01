'use client';

import { memo } from 'react';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

/**
 * ConfirmationHeader Component - Displays the confirmation step header with modern glass morphism design
 * @param {Object} props - Component props
 * @param {Object} props.t - Translation object
 */
const ConfirmationHeader = ({ t }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-3xl pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-2xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8">
        {/* Success celebration animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Animated success icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
            className="relative inline-flex items-center justify-center w-20 h-20 mb-6"
          >
            {/* Pulse ring animation */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
            />
            
            {/* Main icon background */}
            <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg flex items-center justify-center">
              <CheckCircleIcon className="w-8 h-8 text-white" />
            </div>
            
            {/* Sparkle decorations */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <SparklesIcon className="w-6 h-6 text-green-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1 -left-1"
            >
              <SparklesIcon className="w-4 h-4 text-emerald-400" />
            </motion.div>
          </motion.div>

          {/* Header text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-prompt font-bold mb-4 flex items-center justify-center">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {t.registration.confirmation}
              </span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-600 font-prompt max-w-2xl mx-auto leading-relaxed text-lg"
            >
              {t.registration.confirmationMessage}
            </motion.p>
          </motion.div>

          {/* Success celebration effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex justify-center space-x-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  y: [0, -20, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  repeatDelay: 3
                }}
                className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400/50 rounded-full blur-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-emerald-400/50 rounded-full blur-sm"></div>
        
        {/* Additional floating particles */}
        <motion.div
          animate={{ y: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-8 w-2 h-2 bg-green-300/60 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [5, -5, 5], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-12 right-12 w-2 h-2 bg-emerald-300/60 rounded-full blur-sm"
        />
      </div>
    </motion.div>
  );
};

export default memo(ConfirmationHeader);