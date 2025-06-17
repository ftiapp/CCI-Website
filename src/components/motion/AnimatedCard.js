'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animated card component with hover effects
export default function AnimatedCard({ 
  children, 
  className = '',
  hoverScale = 1.02,
  hoverElevation = true,
  rotateOnHover = true,
  rotateAmount = 2,
  onClick
}) {
  return (
    <motion.div
      className={cn(
        "rounded-lg overflow-hidden bg-white transition-all",
        hoverElevation ? "hover:shadow-lg" : "",
        className
      )}
      whileHover={{ 
        scale: hoverScale,
        ...(rotateOnHover && { 
          rotateX: rotateAmount, 
          rotateY: rotateAmount 
        })
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
