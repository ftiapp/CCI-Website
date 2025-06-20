import { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  getShareData,
  shareToFacebook as shareToFacebookUtil,
  shareToTwitter as shareToTwitterUtil,
  shareToWhatsApp as shareToWhatsAppUtil,
  shareToTelegram as shareToTelegramUtil,
  shareToLine as shareToLineUtil,
  shareViaEmail as shareViaEmailUtil
} from '../utils/shareUtils';

export function useShareActions(locale, registrationId, formData, onClose) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      const shareData = getShareData(locale, registrationId, formData);
      await navigator.clipboard.writeText(shareData.url);
      
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
      
      toast.success(
        locale === 'th' 
          ? 'คัดลอกลิงก์แล้ว' 
          : 'Link copied to clipboard',
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
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error(
        locale === 'th' 
          ? 'ไม่สามารถคัดลอกลิงก์ได้' 
          : 'Unable to copy link',
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
    }
  };

  const shareToFacebook = () => {
    shareToFacebookUtil(locale, registrationId, formData);
    onClose();
  };

  const shareToTwitter = () => {
    shareToTwitterUtil(locale, registrationId, formData);
    onClose();
  };

  const shareToWhatsApp = () => {
    shareToWhatsAppUtil(locale, registrationId, formData);
    onClose();
  };

  const shareToTelegram = () => {
    shareToTelegramUtil(locale, registrationId, formData);
    onClose();
  };

  const shareToLine = () => {
    shareToLineUtil(locale, registrationId, formData);
    onClose();
  };

  const shareViaEmail = () => {
    shareViaEmailUtil(locale, registrationId, formData);
    onClose();
  };

  return {
    copiedToClipboard,
    copyToClipboard,
    shareToFacebook,
    shareToTwitter,
    shareToWhatsApp,
    shareToTelegram,
    shareToLine,
    shareViaEmail
  };
}