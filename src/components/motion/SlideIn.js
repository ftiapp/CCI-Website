'use client';

import { motion } from 'framer-motion';

// SlideIn animation component for UI elements
export default function SlideIn({ 
  children, 
  direction = 'left', // 'left', 'right', 'up', 'down'
  distance = 50,
  delay = 0, 
  duration = 0.5, 
  className = ''
}) {
  const getInitialPosition = () => {
    switch(direction) {
      case 'left': return { x: -distance, opacity: 0 };
      case 'right': return { x: distance, opacity: 0 };
      case 'up': return { y: -distance, opacity: 0 };
      case 'down': return { y: distance, opacity: 0 };
      default: return { x: -distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{ 
        x: 0,
        y: 0,
        opacity: 1 
      }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay,
        duration
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
