'use client';

import { motion } from 'framer-motion';

// Page transition component with slide and fade effects
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        duration: 0.3 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
