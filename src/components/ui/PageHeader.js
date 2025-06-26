'use client';

import React from 'react';
import { 
  UserPlusIcon, 
  PhoneIcon, 
  CalendarDaysIcon, 
  HomeIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import FadeIn from '@/components/motion/FadeIn';

export default function PageHeader({ title, subtitle, type = 'default' }) {
  // เลือกไอคอนตามประเภท
  const getIcon = () => {
    switch (type) {
      case 'register':
        return <UserPlusIcon className="w-6 h-6" />;
      case 'contact':
        return <PhoneIcon className="w-6 h-6" />;
      case 'schedule':
        return <CalendarDaysIcon className="w-6 h-6" />;
      case 'home':
        return <HomeIcon className="w-6 h-6" />;
      default:
        return <InformationCircleIcon className="w-6 h-6" />;
    }
  };

  return (
    <FadeIn duration={0.7}>
      <div className="bg-beige-100 rounded-lg shadow-sm mb-8 overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-deeplake-600 p-2 rounded-lg text-white">
              {getIcon()}
            </div>
            <div>
              <h1 className="text-xl font-prompt font-semibold text-deeplake-800">{title}</h1>
              {subtitle && (
                <p className="text-sm font-prompt text-beige-700">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-deeplake-600 to-beige-400"></div>
      </div>
    </FadeIn>
  );
}
