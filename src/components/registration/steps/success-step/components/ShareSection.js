'use client';

import { ShareIcon, SparklesIcon } from '@heroicons/react/24/outline';
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
    <>
      <div className="relative mt-6">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-2xl blur-xl"></div>
        
        <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl">
          {/* Header with modern styling */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-3 shadow-lg">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              {locale === 'th' ? 'แชร์บัตรเข้างาน' : 'Share Your Ticket'}
            </h3>
           
          </div>
          
          {/* Share buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            {/* Native Share Button (Mobile) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <div className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Button 
                  onClick={shareNative} 
                  className="relative w-full sm:w-auto min-w-[160px] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <ShareIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">
                      {locale === 'th' ? 'แชร์เลย' : 'Share Now'}
                    </span>
                  </div>
                </Button>
              </div>
            )}
            
            {/* Advanced Share Button */}
            <div className="group relative w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <Button 
                onClick={toggleShareOptions} 
                className="relative w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                    <ShareIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold flex-1">
                    {locale === 'th' ? 'ตัวเลือกเพิ่มเติม' : 'More Options'}
                  </span>
                  <svg className={`w-4 h-4 ml-2 transition-transform duration-300 ${showShareOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </Button>
            </div>
          </div>
          
          
        
        </div>
      </div>
      
      {/* Share dropdown - Moved outside main container */}
      {showShareOptions && (
        <div 
          className="fixed inset-0 flex items-center justify-center"
          style={{ 
            zIndex: 99999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeShareOptions}
          ></div>
          <div className="relative max-w-sm w-full mx-4">
            <ShareDropdown
              locale={locale}
              registrationId={registrationId}
              formData={formData}
              showShareOptions={showShareOptions}
              onClose={closeShareOptions}
            />
          </div>
        </div>
      )}
    </>
  );
}