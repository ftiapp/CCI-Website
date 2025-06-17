'use client';

import { motion } from 'framer-motion';

// Page wrapper component for animating page transitions
export default function PageWrapper({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.5
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
