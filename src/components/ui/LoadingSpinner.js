'use client';

import React from 'react';

/**
 * Loading spinner component with customizable size
 */
export default function LoadingSpinner({ size = 'medium', className = '' }) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };
  
  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  
  return (
    <div className={`${spinnerSize} ${className}`}>
      <div className="animate-spin rounded-full border-4 border-beige-200 border-t-beige-600 h-full w-full"></div>
    </div>
  );
}
