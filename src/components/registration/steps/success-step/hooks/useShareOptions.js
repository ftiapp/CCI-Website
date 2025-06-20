import { useState } from 'react';
import toast from 'react-hot-toast';
import { getShareData } from '../utils/shareUtils';

export function useShareOptions(locale, registrationId, formData) {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  const closeShareOptions = () => {
    setShowShareOptions(false);
  };

  // Native Web Share API
  const shareNative = async () => {
    if (!navigator.share) {
      toast.error(
        locale === 'th' 
          ? 'เบราว์เซอร์ไม่รองรับการแชร์' 
          : 'Browser does not support sharing',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
      return;
    }
    
    try {
      const shareData = getShareData(locale, registrationId, formData);
      await navigator.share(shareData);
      
      toast.success(
        locale === 'th' 
          ? 'แชร์สำเร็จ' 
          : 'Shared successfully',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

  return {
    showShareOptions,
    toggleShareOptions,
    closeShareOptions,
    shareNative
  };
}