'use client';

import { memo } from 'react';

/**
 * SectionCard Component - Displays a card with title and content
 * @param {Object} props - Component props
 * @param {Function} props.icon - Icon component
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
const SectionCard = ({ icon: Icon, title, children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-earth-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
    <div className="px-6 py-4 border-b border-earth-100">
      <h3 className="font-prompt font-semibold text-earth-800 flex items-center text-lg">
        <Icon className="w-5 h-5 mr-3 text-beige-600" />
        {title}
      </h3>
    </div>
    <div className="px-6 py-5">
      {children}
    </div>
  </div>
);

export default memo(SectionCard);
