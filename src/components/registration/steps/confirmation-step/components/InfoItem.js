'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * InfoItem Component - Displays a single piece of information with modern styling
 * @param {Object} props - Component props
 * @param {string} props.label - Item label
 * @param {string} props.value - Item value
 * @param {string} props.locale - Current locale
 * @param {number} props.index - Animation delay index
 */
const InfoItem = ({ label, value, locale, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.4 }}
      className="group"
    >
      <div className="relative p-6 bg-gradient-to-br from-green-50/80 to-lime-50/60 backdrop-blur-sm rounded-2xl border border-green-200/60 hover:border-green-300/60 transition-all duration-300 hover:shadow-md">
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-green-50/0 group-hover:from-emerald-50/70 group-hover:to-green-50/70 rounded-2xl transition-all duration-300"></div>
        
        <div className="relative">
          {/* Label */}
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + (0.1 * index) }}
            className="block text-sm font-prompt font-semibold text-slate-600 mb-3 tracking-wide uppercase"
          >
            {label}
          </motion.label>
          
          {/* Value */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + (0.1 * index), duration: 0.4 }}
            className="text-lg font-prompt font-medium text-slate-800 break-words leading-relaxed"
          >
            {value || (locale === 'th' ? 'ไม่ระบุ' : 'Not specified')}
          </motion.div>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4 + (0.1 * index), duration: 0.5 }}
            className="mt-4 h-1 bg-gradient-to-r from-green-400/40 to-emerald-400/40 rounded-full origin-left"
          />
        </div>
        
        {/* Corner decoration */}
        <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-green-400/40 to-emerald-400/40 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
      </div>
    </motion.div>
  );
};

export default memo(InfoItem);