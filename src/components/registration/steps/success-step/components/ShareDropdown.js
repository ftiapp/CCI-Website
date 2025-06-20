'use client';

import { useRef, useEffect } from 'react';
import { XMarkIcon, ClipboardDocumentIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useShareActions } from '../hooks/useShareActions';

export default function ShareDropdown({ 
  locale, 
  registrationId, 
  formData, 
  showShareOptions, 
  onClose 
}) {
  const shareDropdownRef = useRef(null);
  const shareActions = useShareActions(locale, registrationId, formData, onClose);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!showShareOptions) return null;

  return (
    <div 
      ref={shareDropdownRef}
      className="absolute z-20 mt-2 w-72 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden left-1/2 transform -translate-x-1/2"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-gray-900">
            {locale === 'th' ? 'เลือกช่องทางการแชร์' : 'Choose sharing method'}
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Share Options */}
      <div className="p-2 max-h-80 overflow-y-auto">
        {/* Quick Actions */}
        <div className="mb-3">
          <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            {locale === 'th' ? 'การดำเนินการด่วน' : 'Quick Actions'}
          </p>
          
          <button
            onClick={shareActions.copyToClipboard}
            className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 mr-3 group-hover:bg-blue-200 transition-colors">
              <ClipboardDocumentIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">
                {shareActions.copiedToClipboard 
                  ? (locale === 'th' ? 'คัดลอกแล้ว!' : 'Copied!') 
                  : (locale === 'th' ? 'คัดลอกลิงก์' : 'Copy Link')}
              </div>
              <div className="text-xs text-gray-500">
                {locale === 'th' ? 'คัดลอกลิงก์บัตรเข้างาน' : 'Copy ticket link to clipboard'}
              </div>
            </div>
            {shareActions.copiedToClipboard && (
              <div className="text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        </div>
        
        {/* Social Media */}
        <div className="mb-3">
          <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            {locale === 'th' ? 'โซเชียลมีเดีย' : 'Social Media'}
          </p>
          
          {/* Facebook */}
          <button
            onClick={shareActions.shareToFacebook}
            className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">Facebook</div>
              <div className="text-xs text-gray-500">
                {locale === 'th' ? 'แชร์ไปยัง Facebook' : 'Share to Facebook'}
              </div>
            </div>
          </button>
          
          {/* Twitter/X */}
          <button
            onClick={shareActions.shareToTwitter}
            className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">X (Twitter)</div>
              <div className="text-xs text-gray-500">
                {locale === 'th' ? 'แชร์ไปยัง X' : 'Share to X'}
              </div>
            </div>
          </button>
        </div>
        
        {/* Messaging Apps */}
        <div>
          <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            {locale === 'th' ? 'แอปแชท' : 'Messaging Apps'}
          </p>
          
          {/* LINE */}
          <button
            onClick={shareActions.shareToLine}
            className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500 mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.630.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.630-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.630 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">LINE</div>
              <div className="text-xs text-gray-500">
                {locale === 'th' ? 'แชร์ไปยัง LINE' : 'Share to LINE'}
              </div>
            </div>
          </button>
          
          {/* WhatsApp */}
          <button
            onClick={shareActions.shareToWhatsApp}
            className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-600 mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.485"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">WhatsApp</div>
              <div className="text-xs text-gray-500">
                {locale === 'th' ? 'แชร์ไปยัง WhatsApp' : 'Share to WhatsApp'}
              </div>
            </div>
          </button>
          
          {/* Telegram */}
          <button
            onClick={shareActions.shareToTelegram}
            className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500 mr-3">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">Telegram</div>
              <div className="text-xs text-gray-500">
                {locale === 'th' ? 'แชร์ไปยัง Telegram' : 'Share to Telegram'}
              </div>
            </div>
          </button>
          
          {/* Email */}
          <button
            onClick={shareActions.shareViaEmail}
            className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 mr-3">
              <EnvelopeIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">
                {locale === 'th' ? 'อีเมล' : 'Email'}
              </div>
              <div className="text-xs text-gray-500">
                {locale === 'th' ? 'แชร์ผ่านอีเมล' : 'Share via email'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}