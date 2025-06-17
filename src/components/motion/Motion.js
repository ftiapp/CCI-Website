'use client';

import { motion } from 'framer-motion';

// A versatile animation component that can be used for various animation types
export default function Motion({
  children,
  type = 'fade', // 'fade', 'slide', 'scale', 'rotate', 'custom'
  direction = 'up', // For slide: 'up', 'down', 'left', 'right'
  duration = 0.5,
  delay = 0,
  distance = 50, // For slide animations
  scale = 0.9, // For scale animations
  rotate = 10, // For rotate animations
  custom = {}, // For custom animations
  className = '',
  whileHover,
  whileTap,
  viewport,
  ...props
}) {
  const getAnimationProps = () => {
    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration, delay }
        };
      case 'slide':
        const slideProps = {
          up: { initial: { y: distance, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -distance, opacity: 0 } },
          down: { initial: { y: -distance, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: distance, opacity: 0 } },
          left: { initial: { x: distance, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -distance, opacity: 0 } },
          right: { initial: { x: -distance, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: distance, opacity: 0 } }
        };
        return {
          ...slideProps[direction],
          transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 30, 
            delay 
          }
        };
      case 'scale':
        return {
          initial: { scale, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          exit: { scale, opacity: 0 },
          transition: { 
            type: 'spring', 
            stiffness: 400, 
            damping: 20, 
            delay 
          }
        };
      case 'rotate':
        return {
          initial: { rotate, opacity: 0 },
          animate: { rotate: 0, opacity: 1 },
          exit: { rotate: -rotate, opacity: 0 },
          transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 20, 
            delay 
          }
        };
      case 'custom':
        return custom;
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration, delay }
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <motion.div
      className={className}
      {...animationProps}
      whileHover={whileHover}
      whileTap={whileTap}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
