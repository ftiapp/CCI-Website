'use client';

import { motion } from 'framer-motion';

// FadeIn animation component for UI elements
export default function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = '',
  direction = null, // 'up', 'down', 'left', 'right'
  distance = 20
}) {
  const getDirectionVariant = () => {
    switch(direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return {};
    }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...getDirectionVariant()
      }}
      animate={{ 
        opacity: 1,
        x: 0,
        y: 0
      }}
      transition={{ 
        duration,
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
