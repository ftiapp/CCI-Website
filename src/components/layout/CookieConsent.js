'use client';

import { useState, useEffect } from 'react';
import { getTranslations } from '@/i18n';

export default function CookieConsent({ locale }) {
  const [showConsent, setShowConsent] = useState(false);
  const t = getTranslations(locale);
  
  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // If no choice has been made, show the banner
      setShowConsent(true);
    }
  }, []);
  
  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    
    // Here you would typically initialize all your cookies/tracking scripts
    console.log('All cookies accepted');
  };
  
  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowConsent(false);
    
    // Here you would typically ensure no tracking cookies are set
    console.log('All cookies rejected');
  };
  
  if (!showConsent) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-earth-800 text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-8 text-sm font-prompt">
            <p className="mb-2">
              {locale === 'th' 
                ? 'เว็บไซต์นี้ใช้คุกกี้เพื่อมอบประสบการณ์การใช้งานที่ดีที่สุดให้กับคุณ คุณสามารถเรียนรู้เพิ่มเติมเกี่ยวกับคุกกี้ที่เราใช้หรือปิดการใช้งานได้ใน' 
                : 'This website uses cookies to ensure you get the best experience. Learn more about the cookies we use or disable them in our'}
              <a 
                href={`/${locale}/privacy`} 
                className="underline ml-1 hover:text-beige-300 transition-colors"
              >
                {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
              </a>
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 bg-transparent border border-earth-400 text-white rounded-md hover:bg-earth-700 transition-colors text-sm font-prompt"
            >
              {locale === 'th' ? 'ปฏิเสธทั้งหมด' : 'Reject All'}
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-beige-500 text-earth-900 rounded-md hover:bg-beige-400 transition-colors text-sm font-prompt"
            >
              {locale === 'th' ? 'ยอมรับทั้งหมด' : 'Accept All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
