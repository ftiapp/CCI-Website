'use client';

import React from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Full-screen modal that prevents user interaction while processing
 */
export default function ProcessingModal({ locale, message, isVisible = true }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal Content */}
          <motion.div 
            className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 max-w-md w-full mx-4 overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              duration: 0.5,
              stiffness: 300,
              damping: 20
            }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-2xl"></div>
            
            {/* Content */}
            <div className="relative text-center">
              {/* Loading Spinner with enhanced styling */}
              <motion.div
                className="mb-8"
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                  <LoadingSpinner size="large" className="text-white" />
                </div>
              </motion.div>
              
              {/* Title */}
              <motion.h2 
                className="text-2xl font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <ClockIcon className="w-6 h-6 text-emerald-600" />
                  <span>{locale === 'th' ? 'กำลังดำเนินการ' : 'Processing'}</span>
                </div>
              </motion.h2>
              
              {/* Message */}
              <motion.p 
                className="text-slate-600 mb-8 font-prompt leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message || (locale === 'th' 
                  ? 'กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูลและส่งการแจ้งเตือน' 
                  : 'Please wait while we process your registration and send notifications')}
              </motion.p>
              
              {/* Warning Box */}
              <motion.div 
                className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-prompt font-semibold text-amber-800 mb-2">
                      {locale === 'th' ? 'ข้อควรระวัง' : 'Important Notice'}
                    </h4>
                    <p className="text-sm font-prompt text-amber-700 leading-relaxed">
                      {locale === 'th' 
                        ? 'กรุณาอย่ารีเฟรชหรือปิดหน้านี้ เนื่องจากระบบอาจจะยังทำงานไม่เสร็จสมบูรณ์' 
                        : 'Please do not refresh or close this page as the system may still be processing'}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Progress Dots */}
              <motion.div 
                className="flex justify-center space-x-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-emerald-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400/50 rounded-full blur-sm"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-400/50 rounded-full blur-sm"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}