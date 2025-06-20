'use client';

import { ShareIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import ShareDropdown from './ShareDropdown';
import { useShareOptions } from '../hooks/useShareOptions';

export default function ShareSection({ locale, registrationId, formData }) {
  const {
    showShareOptions,
    toggleShareOptions,
    shareNative,
    closeShareOptions
  } = useShareOptions(locale, registrationId, formData);

  return (
    <div className="border-t border-gray-100 pt-4">
      <div className="text-center mb-3">
        <p className="text-sm text-gray-600 font-medium">
          {locale === 'th' ? 'แชร์บัตรเข้างาน' : 'Share Your Ticket'}
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="relative">
          {/* Native Share Button (Mobile) */}
          {typeof navigator !== 'undefined' && navigator.share && (
            <Button 
              onClick={shareNative} 
              variant="primary" 
              className="flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg mr-2"
            >
              <ShareIcon className="w-5 h-5 mr-2" />
              {locale === 'th' ? 'แชร์' : 'Share'}
            </Button>
          )}
          
          {/* Advanced Share Button */}
          <Button 
            onClick={toggleShareOptions} 
            variant="outline" 
            className="flex items-center border-green-200 hover:border-green-300 hover:bg-green-50 relative"
          >
            <ShareIcon className="w-5 h-5 mr-2 text-green-600" />
            {locale === 'th' ? 'ตัวเลือกเพิ่มเติม' : 'More Options'}
            <svg className={`w-4 h-4 ml-2 text-green-600 transition-transform ${showShareOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          
          <ShareDropdown
            locale={locale}
            registrationId={registrationId}
            formData={formData}
            showShareOptions={showShareOptions}
            onClose={closeShareOptions}
          />
        </div>
      </div>
    </div>
  );
}