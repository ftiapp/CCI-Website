'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

/**
 * ConsentSection Component - Displays consent checkbox and privacy policy links with Earth-friendly design
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Object} props.errors - Form errors object
 * @param {Function} props.handleChange - Form change handler
 * @param {string} props.locale - Current locale
 */
const ConsentSection = ({ formData, errors, handleChange, locale }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative mt-8"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-emerald-50/40 rounded-3xl pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8">
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center mb-6"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <ShieldCheckIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-prompt font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
            {locale === 'th' ? 'ความยินยอมในการใช้ข้อมูล' : 'Data Consent & Privacy'}
          </h3>
        </motion.div>

        {/* Consent content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-start space-x-4"
        >
          {/* Custom checkbox */}
          <div className="flex-shrink-0 mt-1">
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center w-6 h-6 cursor-pointer"
            >
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent || false}
                onChange={(e) => handleChange({
                  target: { name: 'consent', value: e.target.checked }
                })}
                className="sr-only"
              />
              
              {/* Custom checkbox design */}
              <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 ${
                formData.consent 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 shadow-lg' 
                  : 'bg-white/80 border-green-300 hover:border-green-400'
              }`}>
                {formData.consent && (
                  <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full text-white p-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </div>
              
              {/* Ripple effect */}
              {formData.consent && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-green-400 rounded-lg"
                />
              )}
            </motion.label>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.label
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              htmlFor="consent"
              className="text-slate-700 leading-relaxed cursor-pointer font-prompt block"
            >
              {locale === 'th' ? 
                'ข้าพเจ้ายินยอมให้เก็บข้อมูลส่วนบุคคลตาม' : 
                'I consent to the collection of my personal data according to the'}{' '}
              
              <motion.a
                href={`/${locale}/privacy`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center text-green-700 font-semibold underline decoration-green-400 underline-offset-2 hover:text-green-800 hover:decoration-green-600 transition-all duration-300"
              >
                {/* Custom Leaf SVG */}
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.06.82C6.16 17.4 9 11.1 17 8zm0 0V3l-2-2v5.9C8.93 7.9 4.27 14.49 2.38 19.82l.5.83C4.89 15.03 9.4 9.11 17 8z"/>
                </svg>
                {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
              </motion.a>{' '}
              
              {locale === 'th' ? 'และยอมรับ' : 'and accept the'}{' '}
              
              <motion.a
                href={`/${locale}/terms`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center text-green-700 font-semibold underline decoration-green-400 underline-offset-2 hover:text-green-800 hover:decoration-green-600 transition-all duration-300"
              >
                <ShieldCheckIcon className="w-4 h-4 mr-1" />
                {locale === 'th' ? 'เงื่อนไขการใช้งาน' : 'Terms of Service'}
              </motion.a>
            </motion.label>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 flex items-center space-x-4 text-sm text-slate-600"
            >
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-prompt">
                  {locale === 'th' ? 'ข้อมูลปลอดภัย' : 'Secure Data'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="font-prompt">
                  {locale === 'th' ? 'รักษาสิ่งแวดล้อม' : 'Eco-Friendly'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="font-prompt">
                  {locale === 'th' ? 'โปร่งใส' : 'Transparent'}
                </span>
              </div>
            </motion.div>

            {/* Error message */}
            {errors.consent && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl"
              >
                <p className="text-red-600 text-sm font-prompt flex items-center">
                  <span className="mr-2">⚠️</span>
                  {errors.consent}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Floating decorative elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400/50 rounded-full blur-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400/50 rounded-full blur-sm"></div>
        
        {/* Additional floating particles */}
        <motion.div
          animate={{ y: [-3, 3, -3], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 left-6 w-1.5 h-1.5 bg-green-300/60 rounded-full blur-sm"
        />
        <motion.div
          animate={{ y: [3, -3, 3], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-emerald-300/60 rounded-full blur-sm"
        />
      </div>
    </motion.div>
  );
};

export default memo(ConsentSection);