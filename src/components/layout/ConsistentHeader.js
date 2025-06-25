import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Import icons from Heroicons
import { 
  HomeIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  CalendarIcon,
  DocumentTextIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function ConsistentHeader({ title, subtitle, icon }) {
  const pathname = usePathname();
  
  // Define the icon component based on the icon prop
  const IconComponent = () => {
    switch (icon) {
      case 'home':
        return <HomeIcon className="w-6 h-6" />;
      case 'users':
        return <UserGroupIcon className="w-6 h-6" />;
      case 'building':
        return <BuildingOfficeIcon className="w-6 h-6" />;
      case 'calendar':
        return <CalendarIcon className="w-6 h-6" />;
      case 'document':
        return <DocumentTextIcon className="w-6 h-6" />;
      case 'settings':
        return <Cog6ToothIcon className="w-6 h-6" />;
      default:
        return <DocumentTextIcon className="w-6 h-6" />;
    }
  };

  // Mocha/Beige color scheme
  // bg-[#E6DBCC] is a light beige color
  // text-[#8B7D6B] is a mocha/coffee color for text
  
  return (
    <div className="bg-[#E6DBCC] rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-[#8B7D6B] p-2 rounded-lg text-white">
            <IconComponent />
          </div>
          <div>
            <h1 className="text-xl font-prompt font-semibold text-[#8B7D6B]">{title}</h1>
            {subtitle && <p className="text-sm font-prompt text-[#A99985]">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* You can add action buttons here if needed */}
        </div>
      </div>
      
      {/* Optional: Add a bottom border line */}
      <div className="h-1 bg-gradient-to-r from-[#8B7D6B] to-[#D4C5B1]"></div>
    </div>
  );
}
