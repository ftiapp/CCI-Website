'use client';

import Image from 'next/image';
import Link from 'next/link';
import { XMarkIcon, CalendarIcon, UserPlusIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

export default function PopupBanner({ locale = 'th', onClose, isVisible = true }) {

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 max-w-4xl w-full overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              duration: 0.6,
              stiffness: 300,
              damping: 20
            }}
          >
            {/* Background decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-2xl"></div>
            
            {/* Close button */}
            <motion.button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 hover:text-slate-800 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/50"
              aria-label="Close"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3 }}
            >
              <XMarkIcon className="w-5 h-5" />
            </motion.button>
            
            {/* Header */}
            <motion.div 
              className="relative p-6 pb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-4 shadow-lg">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  CCI Climate Change Forum 2025
                </h2>
                <p className="text-slate-600 font-prompt">
                  {locale === 'th' 
                    ? 'งานสัมมนาการเปลี่ยนแปลงสภาพภูมิอากาศ และนวัตกรรมเพื่อความยั่งยืน' 
                    : 'Climate Change Forum and Innovation for Sustainability'}
                </p>
              </div>
            </motion.div>
            
            {/* Banner image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link href={`/${locale}/schedule`} onClick={onClose}>
                <div className="relative mx-6 mb-6 group cursor-pointer overflow-hidden rounded-2xl shadow-xl border border-white/50">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  <Image 
                    src="/cci-forum-banner2.png" 
                    alt="CCI Climate Change Forum 2025" 
                    width={1200} 
                    height={675}
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Hover text */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/50">
                      <p className="text-slate-800 font-prompt font-semibold flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2 text-emerald-600" />
                        {locale === 'th' ? 'คลิกเพื่อดูกำหนดการ' : 'Click to view schedule'}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
            
            {/* Buttons */}
            <motion.div 
              className="relative px-6 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={`/${locale}/register`} onClick={onClose}>
                    <Button 
                      size="lg" 
                      className="flex items-center space-x-3 w-full sm:w-auto px-8 py-4 shadow-lg hover:shadow-xl"
                    >
                      <UserPlusIcon className="w-5 h-5" />
                      <span className="font-semibold">
                        {locale === 'th' ? 'ลงทะเบียนเข้าร่วมงาน' : 'Register for the event'}
                      </span>
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={`/${locale}/schedule`} onClick={onClose}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex items-center space-x-3 w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-sm border-2 hover:bg-white/80"
                    >
                      <CalendarIcon className="w-5 h-5" />
                      <span className="font-semibold">
                        {locale === 'th' ? 'ดูกำหนดการ' : 'View schedule'}
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
              
              {/* Additional info */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                
              </motion.div>
            </motion.div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400/50 rounded-full blur-sm"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-400/50 rounded-full blur-sm"></div>
            
            {/* Gradient accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}