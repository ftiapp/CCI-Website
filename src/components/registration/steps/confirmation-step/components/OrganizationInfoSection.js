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
 * @param {Array} props.industryTypes - Industry types data
 * @param {Object} props.t - Translation object
 * @param {string} props.locale - Current locale
 */
const OrganizationInfoSection = ({ formData, organizationTypes, industryTypes = [], t, locale }) => {
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
  
  // Find selected industry type
  const selectedIndustryType = industryTypes?.find(
    type => type.id.toString() === formData.industryTypeId?.toString()
  );
  
  // Check if "Other" industry type is selected (ID 99)
  const isOtherIndustryType = formData.industryTypeId?.toString() === '99';
  
  // Get the industry type display value
  let industryTypeDisplayValue = '';
  if (selectedIndustryType) {
    industryTypeDisplayValue = locale === 'th' ? selectedIndustryType.name_th : selectedIndustryType.name_en;
    
    // If "Other" is selected and there's additional info, append it
    if (isOtherIndustryType && formData.industry_type_other) {
      industryTypeDisplayValue += `: ${formData.industry_type_other}`;
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
        <InfoItem 
          label={locale === 'th' ? 'ประเภทอุตสาหกรรม' : 'Industry Type'}
          value={industryTypeDisplayValue}
          locale={locale}
        />
      </div>
    </SectionCard>
  );
};

export default memo(OrganizationInfoSection);
