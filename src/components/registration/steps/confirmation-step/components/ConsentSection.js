'use client';

import { memo } from 'react';

/**
 * ConsentSection Component - Displays consent checkbox and privacy policy links
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Object} props.errors - Form errors object
 * @param {Function} props.handleChange - Form change handler
 * @param {string} props.locale - Current locale
 */
const ConsentSection = ({ formData, errors, handleChange, locale }) => {
  return (
    <div className="mt-8 bg-gradient-to-r from-beige-50 to-earth-50 rounded-xl border border-beige-200 p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent || false}
            onChange={(e) => handleChange({
              target: { name: 'consent', value: e.target.checked }
            })}
            className="h-5 w-5 text-beige-600 focus:ring-beige-500 border-earth-300 rounded transition-colors"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="consent" className="text-earth-700 leading-relaxed cursor-pointer">
            {locale === 'th' ? 
              'ข้าพเจ้ายินยอมให้เก็บข้อมูลส่วนบุคคลตาม' : 
              'I consent to the collection of my personal data according to the'}{' '}
            <a href="#" className="text-beige-700 font-medium underline hover:text-beige-800 transition-colors">
              {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
            </a>{' '}
            {locale === 'th' ? 'และยอมรับ' : 'and accept the'}{' '}
            <a href="#" className="text-beige-700 font-medium underline hover:text-beige-800 transition-colors">
              {locale === 'th' ? 'เงื่อนไขการใช้งาน' : 'Terms of Service'}
            </a>
          </label>
          {errors.consent && (
            <p className="text-red-600 text-sm mt-2 flex items-center">
              <span className="mr-1">⚠️</span>
              {errors.consent}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ConsentSection);
