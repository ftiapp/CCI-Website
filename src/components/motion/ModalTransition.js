'use client';

import { motion, AnimatePresence } from 'framer-motion';

// Modal animation component for smooth modal transitions
export default function ModalTransition({ 
  children, 
  isOpen, 
  onClose, 
  className = '',
  overlayClassName = '',
  modalClassName = ''
}) {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
        >
          <motion.div 
            className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${className}`}
            onClick={onClose}
          />
          <motion.div
            className={`relative z-10 bg-white rounded-lg shadow-xl ${modalClassName}`}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
