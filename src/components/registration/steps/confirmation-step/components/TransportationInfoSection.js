'use client';

import { memo } from 'react';
import SectionCard from './SectionCard';
import InfoItem from './InfoItem';
import { 
  getTransportationCategoryLabel, 
  getPublicTransportTypeLabel, 
  getPrivateVehicleTypeLabel,
  getFuelTypeLabel,
  getPassengerTypeLabel
} from '../utils/labelGenerators';

/**
 * TransportationInfoSection Component - Displays transportation information
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Array} props.transportationTypes - Transportation types data
 * @param {string} props.locale - Current locale
 */
const TransportationInfoSection = ({ formData, transportationTypes, locale }) => {
  // Custom icon for transportation
  const TransportIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 5h8m-4 5h4M6 3v18M18 3v18" />
    </svg>
  );

  return (
    <SectionCard 
      icon={TransportIcon} 
      title={locale === 'th' ? 'ข้อมูลการเดินทาง' : 'Transportation Information'}
    >
      <div className="space-y-4">
        <InfoItem 
          label={locale === 'th' ? 'วิธีการเดินทาง' : 'Transportation Method'}
          value={getTransportationCategoryLabel(formData, locale)}
          locale={locale}
        />
        
        {formData.transport_type === 'public' && (
          <div className="grid grid-cols-1 gap-4">
            <InfoItem 
              label={locale === 'th' ? 'ประเภทขนส่งมวลชน' : 'Public Transportation Type'}
              value={getPublicTransportTypeLabel(formData, transportationTypes, locale)}
              locale={locale}
            />
          </div>
        )}
        
        {formData.transport_type === 'private' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem 
              label={locale === 'th' ? 'ประเภทพาหนะ' : 'Vehicle Type'}
              value={getPrivateVehicleTypeLabel(formData, transportationTypes, locale)}
              locale={locale}
            />
            <InfoItem 
              label={locale === 'th' ? 'ประเภทเชื้อเพลิง' : 'Fuel Type'}
              value={getFuelTypeLabel(formData, locale)}
              locale={locale}
            />
            <InfoItem 
              label={locale === 'th' ? 'ประเภทผู้เดินทาง' : 'Passenger Type'}
              value={getPassengerTypeLabel(formData, locale)}
              locale={locale}
            />
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default memo(TransportationInfoSection);
