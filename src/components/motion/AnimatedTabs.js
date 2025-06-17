'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animated tabs component with smooth transitions between tabs
export default function AnimatedTabs({ 
  tabs = [], 
  defaultTab = 0,
  onChange,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
  indicatorClassName = ''
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };
  
  return (
    <div className={cn("relative flex", className)}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={cn(
            "relative px-4 py-2 z-10",
            tabClassName,
            activeTab === index ? activeTabClassName : ''
          )}
          onClick={() => handleTabChange(index)}
        >
          {tab}
          {activeTab === index && (
            <motion.div
              className={cn(
                "absolute bottom-0 left-0 right-0 h-0.5 bg-beige-600",
                indicatorClassName
              )}
              layoutId="tab-indicator"
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
