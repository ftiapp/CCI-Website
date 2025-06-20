'use client';

import { memo } from 'react';

/**
 * InfoItem Component - Displays a label and value pair
 * @param {Object} props - Component props
 * @param {string} props.label - Label text
 * @param {string} props.value - Value text
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.locale - Current locale
 */
const InfoItem = ({ label, value, className = "", locale = 'th' }) => {
  const displayValue = value && value.toString().trim() 
    ? value 
    : (locale === 'th' ? 'ไม่ระบุ' : 'Not specified');
  
  return (
    <div className={`group ${className}`}>
      <p className="text-xs font-medium text-earth-600 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`font-medium text-sm leading-relaxed ${
        value && value.toString().trim() ? 'text-earth-900' : 'text-earth-500 italic'
      }`}>
        {displayValue}
      </p>
    </div>
  );
};

export default memo(InfoItem);
