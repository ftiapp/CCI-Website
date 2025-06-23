'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  CheckIcon, 
  UserIcon, 
  BuildingOfficeIcon, 
  CalendarIcon, 
  DocumentCheckIcon 
} from '@heroicons/react/24/solid';

export default function StepIndicator({ 
  steps = [], 
  currentStep = 0,
  className = '',
}) {
  // Icons for each step
  const stepIcons = [
    <UserIcon key="user" className="w-4 h-4" />,
    <BuildingOfficeIcon key="building" className="w-4 h-4" />,
    <CalendarIcon key="calendar" className="w-4 h-4" />,
    <DocumentCheckIcon key="document" className="w-4 h-4" />
  ];
  
  return (
    <div className={cn("w-full py-2 md:py-4", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {index > 0 && (
                  <div 
                    className={cn(
                      "h-0.5 md:h-1 flex-1", 
                      index <= currentStep 
                        ? "bg-beige-500" 
                        : "bg-earth-200"
                    )}
                  />
                )}
                <motion.div 
                  className={cn(
                    "w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium",
                    isCompleted 
                      ? "bg-beige-600 text-white" 
                      : isActive 
                        ? "bg-beige-500 text-white border-2 border-beige-600" 
                        : "bg-earth-100 text-earth-500 border border-earth-200"
                  )}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive ? '0 0 0 4px rgba(217, 185, 155, 0.3)' : 'none'
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15
                  }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.2 }}
                    >
                      <CheckIcon className="w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ rotate: isActive ? [0, -10, 10, -5, 5, 0] : 0 }}
                      transition={{ duration: 0.5, delay: 0.2, type: 'keyframes' }}
                    >
                      <div className="w-3 h-3 md:w-4 md:h-4">
                        {stepIcons[index]}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div 
                    className={cn(
                      "h-0.5 md:h-1 flex-1", 
                      index < currentStep 
                        ? "bg-beige-500" 
                        : "bg-earth-200"
                    )}
                    animate={{
                      backgroundColor: index < currentStep ? '#d9b99b' : '#e2e8f0'
                    }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
              <motion.span 
                className={cn(
                  "mt-1 md:mt-2 text-[0.65rem] md:text-xs font-prompt truncate max-w-[60px] md:max-w-full",
                  isActive 
                    ? "text-beige-700 font-medium" 
                    : isCompleted 
                      ? "text-beige-600" 
                      : "text-earth-500"
                )}
                animate={{ 
                  scale: isActive ? 1.05 : 1,
                  fontWeight: isActive ? 600 : 400
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="hidden sm:inline">{step}</span>
                <span className="sm:hidden">{index + 1}</span>
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
