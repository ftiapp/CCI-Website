'use client';

import { useState, useEffect } from 'react';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { createPublicTransportOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS } from '../constants';

/**
 * Public Transport Section Component
 */
export default function PublicTransportSection({ 
  locale, 
  formData, 
  errors, 
  handlePublicTransportChange,
  isOtherPublicTransportSelected,
  handleOtherPublicTransportChange,
  otherFieldName
}) {
  // State for options
  const [publicTransportOptions, setPublicTransportOptions] = useState([
    { value: 1, label: locale === 'th' ? 'รถไฟฟ้า/รถไฟใต้ดิน' : 'Electric Train/Subway' },
    { value: 2, label: locale === 'th' ? 'รถเมล์/รถประจำทาง' : 'Bus' },
    { value: 3, label: locale === 'th' ? 'รถตู้สาธารณะ' : 'Public Van' },
    { value: 4, label: locale === 'th' ? 'เรือโดยสาร' : 'Ferry/Boat' },
    { value: 5, label: locale === 'th' ? 'รถไฟ' : 'Train' },
    { value: 99, label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)' }
  ]);

  // Fetch options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await createPublicTransportOptions(locale);
        if (options && Array.isArray(options) && options.length > 0) {
          setPublicTransportOptions(options);
        }
      } catch (error) {
        console.error('Error fetching public transport options:', error);
      }
    };
    
    fetchOptions();
  }, [locale]);

  return (
    <div className="ml-6 mb-4">
      <SearchableSelect
        label={locale === 'th' ? 'ประเภทขนส่งมวลชน' : 'Public Transportation Type'}
        name="public_transport_id"
        value={parseInt(formData.public_transport_id) || ''}
        onChange={handlePublicTransportChange}
        options={publicTransportOptions}
        placeholder={locale === 'th' ? 'เลือกประเภทขนส่งมวลชน' : 'Select Public Transportation Type'}
        required
        error={errors.public_transport_id}
        className="mb-4"
        allowOther={isOtherPublicTransportSelected}
        otherValue={formData.public_transport_other || ''}
        otherName={otherFieldName}
        onOtherChange={handleOtherPublicTransportChange}
      />
    </div>
  );
}
