'use client';

import { motion } from 'framer-motion';

// Component that scales on hover - useful for cards, buttons, and interactive elements
export default function ScaleOnHover({ 
  children, 
  className = '', 
  scale = 1.03,
  duration = 0.2
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17,
        duration
      }}
    >
      {children}
    </motion.div>
  );
}
