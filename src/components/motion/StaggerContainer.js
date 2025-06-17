'use client';

import { motion } from 'framer-motion';

// Stagger container for animating lists of elements with a delay between each
export default function StaggerContainer({ 
  children, 
  className = '', 
  delay = 0.1, 
  staggerDelay = 0.05,
  duration = 0.5
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child component to be used inside StaggerContainer
export function StaggerItem({ 
  children, 
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

  const itemVariants = {
    hidden: { 
      opacity: 0,
      ...getDirectionVariant()
    },
    show: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
