'use client';

import { memo } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import SectionCard from './SectionCard';
import InfoItem from './InfoItem';

/**
 * PersonalInfoSection Component - Displays personal information with modern glass morphism design
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Object} props.t - Translation object
 * @param {string} props.locale - Current locale
 */
const PersonalInfoSection = ({ formData, t, locale }) => {
  const infoItems = [
    { label: t.registration.firstName, value: formData.firstName },
    { label: t.registration.lastName, value: formData.lastName },
    { label: t.registration.email, value: formData.email },
    { label: t.registration.phone, value: formData.phone }
  ];

  return (
    <SectionCard 
      icon={UserIcon} 
      title={t.registration.personalInfo}
      colorScheme="earth"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infoItems.map((item, index) => (
          <InfoItem 
            key={item.label}
            label={item.label}
            value={item.value}
            locale={locale}
            index={index}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default memo(PersonalInfoSection);