'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  CheckIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  CalendarDaysIcon, 
  DocumentCheckIcon 
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function StepIndicator({ 
  steps = ['Personal Info', 'Company Details', 'Schedule', 'Confirmation'], 
  currentStep = 0,
  className = '',
}) {
  // Short labels for mobile
  const shortSteps = ['Personal', 'Company', 'Schedule', 'Complete'];
  
  // Icons for each step
  const stepIcons = [
    <UserIcon key="user" className="w-full h-full" />,
    <BuildingOfficeIcon key="building" className="w-full h-full" />,
    <CalendarDaysIcon key="calendar" className="w-full h-full" />,
    <DocumentCheckIcon key="document" className="w-full h-full" />
  ];
  
  return (
    <div className={cn("w-full py-6 md:py-8", className)}>
      {/* Desktop/Tablet Layout */}
      <div className="hidden sm:flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Step Circle and Label */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className={cn(
                    "relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 backdrop-blur-sm",
                    isCompleted 
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                      : isActive 
                        ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-xl border-2 border-white" 
                        : "bg-white/70 text-slate-500 border-2 border-slate-200 shadow-md"
                  )}
                  whileHover={{ scale: 1.05 }}
                  animate={isActive ? { 
                    boxShadow: [
                      '0 0 0 0px rgba(16, 185, 129, 0.4)',
                      '0 0 0 8px rgba(16, 185, 129, 0.1)',
                      '0 0 0 0px rgba(16, 185, 129, 0.4)'
                    ]
                  } : {}}
                  transition={{
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  {/* Background gradient for active/completed states */}
                  {(isActive || isCompleted) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full animate-pulse"></div>
                  )}
                  
                  {isCompleted ? (
                    <motion.div 
                      className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                    >
                      <CheckIcon className="w-full h-full stroke-2" />
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
                      {stepIcons[index]}
                    </div>
                  )}
                </motion.div>
                
                <motion.span 
                  className={cn(
                    "mt-3 md:mt-4 text-xs md:text-sm text-center max-w-20 md:max-w-24 leading-tight font-prompt font-medium",
                    isActive 
                      ? "text-emerald-700 font-bold" 
                      : isCompleted 
                        ? "text-emerald-600 font-semibold" 
                        : "text-slate-500"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {step}
                </motion.span>
              </motion.div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="flex-1 h-1 mx-3 md:mx-6 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                >
                  <div className="absolute inset-0 bg-slate-200 rounded-full"></div>
                  <motion.div 
                    className={cn(
                      "absolute inset-0 rounded-full transition-all duration-700",
                      index < currentStep 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500" 
                        : "bg-slate-200"
                    )}
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: index < currentStep ? "100%" : "0%" 
                    }}
                    transition={{ 
                      duration: 1, 
                      delay: index < currentStep ? 0.5 : 0,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Animated shimmer effect */}
                  {index < currentStep && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between px-2">
          {shortSteps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            
            return (
              <React.Fragment key={index}>
                {/* Step Circle and Label */}
                <motion.div 
                  className="flex flex-col items-center flex-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.div 
                    className={cn(
                      "relative w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 mb-2 backdrop-blur-sm",
                      isCompleted 
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" 
                        : isActive 
                          ? "bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-lg border-2 border-white" 
                          : "bg-white/70 text-slate-500 border-2 border-slate-200 shadow-md"
                    )}
                    whileTap={{ scale: 0.95 }}
                    animate={isActive ? { 
                      boxShadow: [
                        '0 0 0 0px rgba(16, 185, 129, 0.4)',
                        '0 0 0 6px rgba(16, 185, 129, 0.1)',
                        '0 0 0 0px rgba(16, 185, 129, 0.4)'
                      ]
                    } : {}}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    {/* Background gradient for active/completed states */}
                    {(isActive || isCompleted) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full animate-pulse"></div>
                    )}
                    
                    {isCompleted ? (
                      <motion.div 
                        className="w-5 h-5 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                      >
                        <CheckIcon className="w-full h-full stroke-2" />
                      </motion.div>
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center">
                        {stepIcons[index]}
                      </div>
                    )}
                  </motion.div>
                  
                  <motion.span 
                    className={cn(
                      "text-xs text-center leading-tight px-1 font-prompt font-medium",
                      isActive 
                        ? "text-emerald-700 font-bold" 
                        : isCompleted 
                          ? "text-emerald-600 font-semibold" 
                          : "text-slate-500"
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  >
                    {step}
                  </motion.span>
                </motion.div>
                
                {/* Connecting Line for Mobile */}
                {index < shortSteps.length - 1 && (
                  <motion.div 
                    className="h-1 flex-1 mx-2 rounded-full relative overflow-hidden -mt-6"
                    style={{ maxWidth: '50px' }}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  >
                    <div className="absolute inset-0 bg-slate-200 rounded-full"></div>
                    <motion.div 
                      className={cn(
                        "absolute inset-0 rounded-full transition-all duration-500",
                        index < currentStep 
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500" 
                          : "bg-slate-200"
                      )}
                      initial={{ width: "0%" }}
                      animate={{ 
                        width: index < currentStep ? "100%" : "0%" 
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index < currentStep ? 0.4 : 0,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}