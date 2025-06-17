'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Step transition component for multi-step forms
export default function StepTransition({ children, direction = 0, className = '' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`step-${direction}`}
        initial={{ opacity: 0, x: direction < 0 ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction < 0 ? 20 : -20 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30,
          duration: 0.25 
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
