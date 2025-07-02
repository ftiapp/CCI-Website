'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PopupBanner from './PopupBanner';

export default function PopupBannerWrapper({ locale }) {
  const [isMounted, setIsMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setIsMounted(true);
    
    // Check if current page is ticket or map page
    const isTicketPage = pathname.includes('/ticket/');
    const isMapPage = pathname.includes('/map');
    
    // Don't show popup on ticket or map pages
    if (isTicketPage || isMapPage) {
      return;
    }
    
    // Check if popup has been shown in this session
    const hasPopupBeenShown = sessionStorage.getItem('popupShown');
    
    if (!hasPopupBeenShown) {
      // Show popup immediately
      setShowPopup(true);
    }
  }, [pathname]);
  
  const handleClose = () => {
    setShowPopup(false);
    // Mark popup as shown for this session
    sessionStorage.setItem('popupShown', 'true');
  };
  
  // Don't render anything during SSR
  if (!isMounted) return null;
  
  // If popup shouldn't be shown, don't render it
  if (!showPopup) return null;
  
  return <PopupBanner locale={locale} onClose={handleClose} />;
}
