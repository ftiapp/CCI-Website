'use client';

import { memo } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import SectionCard from './SectionCard';
import InfoItem from './InfoItem';

/**
 * PersonalInfoSection Component - Displays personal information
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Object} props.t - Translation object
 * @param {string} props.locale - Current locale
 */
const PersonalInfoSection = ({ formData, t, locale }) => {
  return (
    <SectionCard 
      icon={UserIcon} 
      title={t.registration.personalInfo}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          label={t.registration.firstName}
          value={formData.firstName}
          locale={locale}
        />
        <InfoItem 
          label={t.registration.lastName}
          value={formData.lastName}
          locale={locale}
        />
        <InfoItem 
          label={t.registration.email}
          value={formData.email}
          locale={locale}
        />
        <InfoItem 
          label={t.registration.phone}
          value={formData.phone}
          locale={locale}
        />
      </div>
    </SectionCard>
  );
};

export default memo(PersonalInfoSection);
