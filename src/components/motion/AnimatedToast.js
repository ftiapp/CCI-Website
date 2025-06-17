'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Toast animation component for smooth notification transitions
export default function AnimatedToast({ 
  children, 
  isVisible, 
  position = 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
  duration = 0.3,
  className = ''
}) {
  const getPositionStyles = () => {
    switch(position) {
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-center': return 'top-4 left-1/2 -translate-x-1/2';
      case 'bottom-center': return 'bottom-4 left-1/2 -translate-x-1/2';
      default: return 'top-4 right-4';
    }
  };

  const getAnimationVariants = () => {
    if (position.includes('top')) {
      return {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      };
    } else {
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 }
      };
    }
  };

  const variants = getAnimationVariants();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 ${getPositionStyles()} ${className}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            duration
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
