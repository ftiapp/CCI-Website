'use client';

import { ArrowDownTrayIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import { useQRDownload } from '../hooks/useQRDownload';
import { useNotifications } from '../hooks/useNotifications';

export default function ActionButtons({ 
  locale, 
  registrationId, 
  formData, 
  seminarRooms, 
  isTicketPage 
}) {
  const { downloadQRCode } = useQRDownload(locale, registrationId);
  const { 
    emailSent, 
    smsSent, 
    sending, 
    sendEmail, 
    sendSMS 
  } = useNotifications(locale, registrationId, formData, seminarRooms);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
      <Button 
        onClick={downloadQRCode} 
        variant="outline" 
        className="flex items-center w-full sm:w-auto min-w-[160px] border-green-200 hover:border-green-300 hover:bg-green-50"
        disabled={sending}
      >
        <ArrowDownTrayIcon className="w-5 h-5 mr-2 text-green-600" />
        {locale === 'th' ? 'ดาวน์โหลด QR' : 'Download QR'}
      </Button>
      
      {!isTicketPage && (
        <>
          <Button 
            onClick={sendEmail} 
            variant="outline" 
            className="flex items-center w-full sm:w-auto min-w-[160px] border-blue-200 hover:border-blue-300 hover:bg-blue-50"
            disabled={sending || emailSent}
          >
            <EnvelopeIcon className="w-5 h-5 mr-2 text-blue-600" />
            {emailSent 
              ? (locale === 'th' ? 'ส่งอีเมลแล้ว' : 'Email Sent') 
              : (locale === 'th' ? 'ส่งอีเมล' : 'Send Email')}
          </Button>
          
          <Button 
            onClick={sendSMS} 
            variant="outline" 
            className="flex items-center w-full sm:w-auto min-w-[160px] border-purple-200 hover:border-purple-300 hover:bg-purple-50"
            disabled={sending || smsSent}
          >
            <DevicePhoneMobileIcon className="w-5 h-5 mr-2 text-purple-600" />
            {smsSent 
              ? (locale === 'th' ? 'ส่ง SMS แล้ว' : 'SMS Sent') 
              : (locale === 'th' ? 'ส่ง SMS' : 'Send SMS')}
          </Button>
        </>
      )}
    </div>
  );
}