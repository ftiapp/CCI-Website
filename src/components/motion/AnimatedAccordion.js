'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// Animated accordion component for collapsible content
export default function AnimatedAccordion({ 
  title, 
  children, 
  className = '',
  headerClassName = '',
  contentClassName = '',
  initiallyOpen = false
}) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  
  return (
    <div className={cn("border border-earth-200 rounded-md overflow-hidden", className)}>
      <motion.button
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 text-left bg-beige-50 hover:bg-beige-100 transition-colors",
          headerClassName
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-prompt font-medium">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDownIcon className="w-5 h-5 text-earth-600" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { 
                type: 'spring', 
                stiffness: 300, 
                damping: 30 
              },
              opacity: { duration: 0.2 }
            }}
          >
            <div className={cn("px-4 py-3", contentClassName)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
