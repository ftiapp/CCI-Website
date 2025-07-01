'use client';

import { useState, useEffect } from 'react';
import { getTranslations } from '@/i18n';
import { ShieldCheckIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent({ locale }) {
  const [showConsent, setShowConsent] = useState(false);
  const t = getTranslations(locale);
  
  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // If no choice has been made, show the banner after a small delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    
    // Here you would typically initialize all your cookies/tracking scripts
    console.log('All cookies accepted');
  };
  
  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowConsent(false);
    
    // Here you would typically ensure no tracking cookies are set
    console.log('All cookies rejected');
  };
  
  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 pointer-events-none"></div>
              
              <div className="relative p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                  {/* Content */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:mr-8 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                        <ShieldCheckIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-prompt font-bold text-slate-800 mb-2 flex items-center">
                        <InformationCircleIcon className="w-5 h-5 mr-2 text-emerald-600" />
                        {locale === 'th' ? 'การใช้คุกกี้' : 'Cookie Usage'}
                      </h3>
                      <p className="text-sm font-prompt text-slate-600 leading-relaxed">
                        {locale === 'th' 
                          ? 'เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ดีที่สุดให้กับคุณ คุณสามารถเรียนรู้เพิ่มเติมเกี่ยวกับคุกกี้ที่เราใช้หรือปิดการใช้งานได้ใน' 
                          : 'This website uses cookies to ensure you get the best experience. Learn more about the cookies we use or disable them in our'}
                        <a 
                          href={`/${locale}/privacy`} 
                          className="ml-1 text-emerald-600 hover:text-emerald-700 font-semibold underline decoration-emerald-200 hover:decoration-emerald-300 transition-all duration-300"
                        >
                          {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRejectAll}
                      className="group px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-800 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 text-sm font-prompt font-semibold shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <XMarkIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>{locale === 'th' ? 'ปฏิเสธทั้งหมด' : 'Reject All'}</span>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAcceptAll}
                      className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-prompt font-semibold transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <ShieldCheckIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>{locale === 'th' ? 'ยอมรับทั้งหมด' : 'Accept All'}</span>
                      </div>
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400/50 rounded-full blur-sm"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-400/50 rounded-full blur-sm"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}