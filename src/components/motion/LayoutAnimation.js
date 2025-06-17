'use client';

import { motion, LayoutGroup } from 'framer-motion';
import { cn } from '@/lib/utils';

// Layout animation component for smooth layout transitions
export default function LayoutAnimation({ 
  children, 
  className = '',
  layoutId,
  transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30
  }
}) {
  return (
    <motion.div
      className={className}
      layout
      layoutId={layoutId}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

// Container component that groups layout animations
export function LayoutGroup({ 
  children, 
  className = '' 
}) {
  return (
    <LayoutGroup>
      <div className={className}>
        {children}
      </div>
    </LayoutGroup>
  );
}
