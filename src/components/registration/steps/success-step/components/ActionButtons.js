'use client';

import { ArrowDownTrayIcon, EnvelopeIcon, DevicePhoneMobileIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
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
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20 rounded-2xl blur-xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          
          {/* Download QR Button */}
          <div className="group relative w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <Button 
              onClick={downloadQRCode} 
              className="relative w-full sm:w-auto min-w-[180px] bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 hover:border-emerald-300 text-emerald-700 hover:text-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={sending}
            >
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <ArrowDownTrayIcon className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">
                  {locale === 'th' ? 'ดาวน์โหลด QR' : 'Download QR'}
                </span>
              </div>
            </Button>
          </div>
          
          {!isTicketPage && (
            <>
              {/* Send Email Button */}
              <div className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Button 
                  onClick={sendEmail} 
                  className={`relative w-full sm:w-auto min-w-[180px] ${
                    emailSent 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700' 
                      : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 hover:border-blue-300 text-blue-700 hover:text-blue-800'
                  } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  disabled={sending || emailSent}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 ${
                      emailSent 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}>
                      {emailSent ? (
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      ) : (
                        <EnvelopeIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-semibold">
                      {emailSent 
                        ? (locale === 'th' ? 'ส่งอีเมลแล้ว' : 'Email Sent') 
                        : (locale === 'th' ? 'ส่งอีเมล' : 'Send Email')}
                    </span>
                  </div>
                </Button>
              </div>
              
              {/* Send SMS Button */}
              <div className="group relative w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <Button 
                  onClick={sendSMS} 
                  className={`relative w-full sm:w-auto min-w-[180px] ${
                    smsSent 
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700' 
                      : 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800'
                  } shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  disabled={sending || smsSent}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200 ${
                      smsSent 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {smsSent ? (
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      ) : (
                        <DevicePhoneMobileIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-semibold">
                      {smsSent 
                        ? (locale === 'th' ? 'ส่ง SMS แล้ว' : 'SMS Sent') 
                        : (locale === 'th' ? 'ส่ง SMS' : 'Send SMS')}
                    </span>
                  </div>
                </Button>
              </div>
            </>
          )}
        </div>
        
        {/* Loading indicator */}
        {sending && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-slate-600">
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">
                {locale === 'th' ? 'กำลังส่ง...' : 'Sending...'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}