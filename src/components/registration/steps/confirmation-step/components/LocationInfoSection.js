'use client';

import { memo } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import SectionCard from './SectionCard';
import InfoItem from './InfoItem';
import { getLocationTypeLabel, getBangkokDistrictLabel, getProvinceLabel } from '../utils/labelGenerators';

/**
 * LocationInfoSection Component - Displays location information
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Array} props.bangkokDistricts - Bangkok districts data
 * @param {Array} props.provinces - Provinces data
 * @param {string} props.locale - Current locale
 */
const LocationInfoSection = ({ formData, bangkokDistricts, provinces, locale }) => {
  return (
    <SectionCard 
      icon={MapPinIcon} 
      title={locale === 'th' ? 'ข้อมูลสถานที่' : 'Location Information'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          label={locale === 'th' ? 'เดินทางมาจาก' : 'Traveling from'}
          value={getLocationTypeLabel(formData, locale)}
          locale={locale}
        />
        
        {formData.location_type === 'bangkok' && (
          <InfoItem 
            label={locale === 'th' ? 'เขต' : 'District'}
            value={getBangkokDistrictLabel(formData, bangkokDistricts, locale)}
            locale={locale}
          />
        )}
        
        {formData.location_type === 'province' && (
          <InfoItem 
            label={locale === 'th' ? 'จังหวัด' : 'Province'}
            value={getProvinceLabel(formData, provinces, locale)}
            locale={locale}
          />
        )}
      </div>
    </SectionCard>
  );
};

export default memo(LocationInfoSection);
