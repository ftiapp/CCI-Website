'use client';

import { memo } from 'react';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import SectionCard from './SectionCard';
import InfoItem from './InfoItem';

/**
 * OrganizationInfoSection Component - Displays organization information
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Array} props.organizationTypes - Organization types data
 * @param {Object} props.t - Translation object
 * @param {string} props.locale - Current locale
 */
const OrganizationInfoSection = ({ formData, organizationTypes, t, locale }) => {
  // Find selected organization type
  const selectedOrgType = organizationTypes?.find(
    type => type.id.toString() === formData.organizationTypeId?.toString()
  );
  
  // Check if "Other" organization type is selected (ID 99)
  const isOtherOrgType = formData.organizationTypeId?.toString() === '99';
  
  // Get the organization type display value
  let orgTypeDisplayValue = '';
  if (selectedOrgType) {
    orgTypeDisplayValue = locale === 'th' ? selectedOrgType.name_th : selectedOrgType.name_en;
    
    // If "Other" is selected and there's additional info, append it
    if (isOtherOrgType && formData.organization_type_other) {
      orgTypeDisplayValue += `: ${formData.organization_type_other}`;
    }
  }

  return (
    <SectionCard 
      icon={BuildingOfficeIcon} 
      title={t.registration.organizationInfo}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          label={t.registration.organizationName}
          value={formData.organizationName}
          locale={locale}
        />
        <InfoItem 
          label={t.registration.organizationType}
          value={orgTypeDisplayValue}
          locale={locale}
        />
      </div>
    </SectionCard>
  );
};

export default memo(OrganizationInfoSection);
