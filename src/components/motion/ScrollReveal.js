'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Component that reveals content when scrolled into view
export default function ScrollReveal({ 
  children, 
  className = '',
  direction = 'up', // 'up', 'down', 'left', 'right'
  distance = 50,
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();
  
  const getInitialPosition = () => {
    switch(direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
      default: return { y: distance };
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay,
          duration
        }
      });
    }
  }, [isInView, controls, delay, duration]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ ...getInitialPosition(), opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
