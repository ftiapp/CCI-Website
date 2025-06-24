'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Mock icons since we don't have access to heroicons
const CheckIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41L9 19l11.59-11.59a.996.996 0 1 0-1.41-1.41L9 16.17z"/>
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const BuildingOfficeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
  </svg>
);

const DocumentCheckIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z M10.5,12.5L9,14L11,16L15,12L13.5,10.5L11,13L10.5,12.5Z"/>
  </svg>
);

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
    <CalendarIcon key="calendar" className="w-full h-full" />,
    <DocumentCheckIcon key="document" className="w-full h-full" />
  ];
  
  return (
    <div className={cn("w-full py-4 md:py-6", className)}>
      {/* Desktop/Tablet Layout */}
      <div className="hidden sm:flex items-center">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Step Circle and Label */}
              <div className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 relative",
                    isCompleted 
                      ? "bg-[#8B7D6B] text-white shadow-lg" 
                      : isActive 
                        ? "bg-[#A99985] text-white border-2 border-[#8B7D6B] shadow-lg md:scale-110" 
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                  )}
                  style={{
                    boxShadow: isActive ? '0 0 0 4px rgba(139, 125, 107, 0.3)' : undefined
                  }}
                >
                  {isCompleted ? (
                    <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                      <CheckIcon className="w-full h-full" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                      {stepIcons[index]}
                    </div>
                  )}
                </div>
                <span 
                  className={cn(
                    "mt-2 md:mt-3 text-xs md:text-sm text-center max-w-16 md:max-w-20 leading-tight",
                    isActive 
                      ? "text-[#8B7D6B] font-semibold" 
                      : isCompleted 
                        ? "text-[#A99985] font-medium" 
                        : "text-gray-500"
                  )}
                >
                  {step}
                </span>
              </div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "flex-1 h-0.5 mx-2 md:mx-4 transition-all duration-500",
                    index < currentStep 
                      ? "bg-[#8B7D6B]" 
                      : "bg-gray-200"
                  )}
                  style={{
                    minWidth: '30px'
                  }}
                />
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
                <div className="flex flex-col items-center flex-1">
                  <div 
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 relative mb-2",
                      isCompleted 
                        ? "bg-[#8B7D6B] text-white shadow-md" 
                        : isActive 
                          ? "bg-[#A99985] text-white border-2 border-[#8B7D6B] shadow-md" 
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                    )}
                    style={{
                      boxShadow: isActive ? '0 0 0 3px rgba(139, 125, 107, 0.3)' : undefined
                    }}
                  >
                    {isCompleted ? (
                      <div className="w-4 h-4 flex items-center justify-center">
                        <CheckIcon className="w-full h-full" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 flex items-center justify-center">
                        {stepIcons[index]}
                      </div>
                    )}
                  </div>
                  <span 
                    className={cn(
                      "text-xs text-center leading-tight px-1",
                      isActive 
                        ? "text-[#8B7D6B] font-semibold" 
                        : isCompleted 
                          ? "text-[#A99985] font-medium" 
                          : "text-gray-500"
                    )}
                  >
                    {step}
                  </span>
                </div>
                
                {/* Connecting Line for Mobile */}
                {index < shortSteps.length - 1 && (
                  <div 
                    className={cn(
                      "h-0.5 flex-1 mx-1 transition-all duration-500 -mt-4",
                      index < currentStep 
                        ? "bg-[#8B7D6B]" 
                        : "bg-gray-200"
                    )}
                    style={{
                      maxWidth: '40px'
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}