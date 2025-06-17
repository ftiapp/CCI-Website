'use client';

import { getTranslations } from '@/i18n';
import Input from '@/components/ui/Input';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

export default function PersonalInfoStep({ locale, formData, errors, handleChange }) {
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  return (
    <div>
      <h2 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
        <UserIcon className="w-5 h-5 mr-2 text-beige-600" />
        {t.registration.personalInfo}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t.registration.firstName}
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder={locale === 'th' ? 'ชื่อ' : 'First Name'}
          required
          error={errors.firstName}
        />
        
        <Input
          label={t.registration.lastName}
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder={locale === 'th' ? 'นามสกุล' : 'Last Name'}
          required
          error={errors.lastName}
        />
      </div>
      
      <div className="space-y-4">
        <Input
          label={t.registration.email}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          error={errors.email}
        />
        
        <Input
          label={t.registration.phone}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={locale === 'th' ? '0812345678' : '0812345678'}
          required
          error={errors.phone}
        />
        
        <p className="text-xs text-gray-400 italic">
          {locale === 'th' ? '*ระบบจะจัดส่ง QR-Code สำหรับเข้าร่วมงานทางอีเมลและ SMS ให้แก่ท่าน' : '* QR-Code will be sent via email and SMS'}
        </p>
      </div>
    </div>
  );
}