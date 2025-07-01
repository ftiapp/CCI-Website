
// SectionCard.js
'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * SectionCard Component - Modern glass morphism card for sections
 * @param {Object} props - Component props
 * @param {React.Component} props.icon - Icon component
 * @param {string} props.title - Section title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.colorScheme - Color scheme (default: 'earth')
 */
const SectionCard = ({ icon: Icon, title, children, colorScheme = 'earth' }) => {
  const colorSchemes = {
    earth: {
      bg: 'from-green-50/40 to-lime-50/40',
      iconBg: 'from-green-600 to-lime-600',
      textGradient: 'from-green-700 to-emerald-700',
      decorative: 'from-green-200/30 to-lime-200/30',
      particles: 'bg-green-500/60',
      particlesAlt: 'bg-lime-500/60'
    },
    nature: {
      bg: 'from-emerald-50/40 to-teal-50/40',
      iconBg: 'from-emerald-600 to-teal-600',
      textGradient: 'from-emerald-700 to-teal-700',
      decorative: 'from-emerald-200/30 to-teal-200/30',
      particles: 'bg-emerald-500/60',
      particlesAlt: 'bg-teal-500/60'
    },
    forest: {
      bg: 'from-green-50/40 to-emerald-50/40',
      iconBg: 'from-green-700 to-emerald-700',
      textGradient: 'from-green-800 to-emerald-800',
      decorative: 'from-green-300/30 to-emerald-300/30',
      particles: 'bg-green-600/60',
      particlesAlt: 'bg-emerald-600/60'
    },
    ocean: {
      bg: 'from-cyan-50/40 to-blue-50/40',
      iconBg: 'from-cyan-600 to-blue-600',
      textGradient: 'from-cyan-700 to-blue-700',
      decorative: 'from-cyan-200/30 to-blue-200/30',
      particles: 'bg-cyan-500/60',
      particlesAlt: 'bg-blue-500/60'
    }
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.earth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8"
    >
      {/* Background decorations */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-3xl pointer-events-none`}></div>
      <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${colors.decorative} rounded-full blur-2xl`}></div>
      
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-prompt font-bold text-slate-800 mb-2 flex items-center">
            <div className={`w-10 h-10 bg-gradient-to-r ${colors.iconBg} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className={`bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h3>
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {children}
        </motion.div>
        
        {/* Floating decorative elements */}
        <div className={`absolute -top-2 -right-2 w-4 h-4 ${colors.particles} rounded-full blur-sm`}></div>
        <div className={`absolute -bottom-1 -left-1 w-3 h-3 ${colors.particlesAlt} rounded-full blur-sm`}></div>
      </div>
    </motion.div>
  );
};

export default memo(SectionCard);