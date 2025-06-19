'use client';

import React from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

/**
 * Full-screen modal that prevents user interaction while processing
 */
export default function ProcessingModal({ locale, message }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <LoadingSpinner size="large" className="mx-auto mb-6" />
        
        <h2 className="text-xl font-prompt font-semibold text-earth-900 mb-4">
          {locale === 'th' ? 'กำลังดำเนินการ' : 'Processing'}
        </h2>
        
        <p className="text-earth-700 mb-6 font-prompt">
          {message || (locale === 'th' 
            ? 'กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูลและส่งการแจ้งเตือน' 
            : 'Please wait while we process your registration and send notifications')}
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
          <p className="font-prompt text-yellow-800">
            {locale === 'th' 
              ? 'กรุณาอย่ารีเฟรชหรือปิดหน้านี้ เนื่องจากระบบอาจจะยังทำงานไม่เสร็จสมบูรณ์' 
              : 'Please do not refresh or close this page as the system may still be processing'}
          </p>
        </div>
      </div>
    </div>
  );
}
