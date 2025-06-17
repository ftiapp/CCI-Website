'use client';

import { motion } from 'framer-motion';

// Button animation component that adds hover and tap effects
export default function ButtonAnimation({ 
  children, 
  className = '',
  scale = 1.03,
  hoverColor = null
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ 
        scale: scale,
        ...(hoverColor && { backgroundColor: hoverColor })
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 17 
      }}
    >
      {children}
    </motion.div>
  );
}
