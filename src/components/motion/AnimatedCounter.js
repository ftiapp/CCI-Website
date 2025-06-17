'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

// Animated counter component for displaying statistics with animation
export default function AnimatedCounter({ 
  value = 0, 
  duration = 2,
  delay = 0.2,
  prefix = '',
  suffix = '',
  className = '',
  decimalPlaces = 0,
  threshold = 0.1,
  once = true
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;
      
      const updateValue = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setDisplayValue(Math.floor(progress * value));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateValue);
        }
      };
      
      // Start the animation after the specified delay
      const timeoutId = setTimeout(() => {
        animationFrame = requestAnimationFrame(updateValue);
      }, delay * 1000);
      
      return () => {
        clearTimeout(timeoutId);
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, value, duration, delay]);
  
  const formattedValue = decimalPlaces > 0 
    ? displayValue.toFixed(decimalPlaces)
    : displayValue;
  
  return (
    <motion.span
      ref={ref}
      className={className}
      animate={controls}
    >
      {prefix}{formattedValue}{suffix}
    </motion.span>
  );
}
