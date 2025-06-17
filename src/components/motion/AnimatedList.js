'use client';

import { motion } from 'framer-motion';

// Container component for animated lists with staggered animations
export default function AnimatedList({ 
  children, 
  className = '', 
  staggerDelay = 0.1,
  initialDelay = 0.2
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };

  return (
    <motion.ul
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.ul>
  );
}

// Item component for use within AnimatedList
export function AnimatedListItem({ 
  children, 
  className = '',
  direction = 'up', // 'up', 'down', 'left', 'right'
  distance = 20
}) {
  const getDirectionVariant = () => {
    switch(direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      ...getDirectionVariant()
    },
    visible: { 
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
    <motion.li
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.li>
  );
}
