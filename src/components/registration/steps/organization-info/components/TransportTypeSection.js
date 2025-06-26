'use client';

import { useState, useEffect } from 'react';
import RadioGroup from '@/components/ui/RadioGroup';
import { createTransportTypeOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS } from '../constants';

/**
 * Transport Type Section Component
 */
export default function TransportTypeSection({ 
  locale, 
  formData, 
  errors, 
  handleTransportTypeChange
}) {
  // State for options
  const [transportTypeOptions, setTransportTypeOptions] = useState([
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC, 
      label: locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation' 
    },
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE, 
      label: locale === 'th' ? 'พาหนะส่วนตัว' : 'Private Vehicle' 
    },
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.WALKING, 
      label: locale === 'th' ? 'เดิน' : 'Walking' 
    }
  ]);

  // Fetch options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await createTransportTypeOptions(locale);
        if (options && Array.isArray(options) && options.length > 0) {
          setTransportTypeOptions(options);
        }
      } catch (error) {
        console.error('Error fetching transport type options:', error);
      }
    };
    
    fetchOptions();
  }, [locale]);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-beige-800 mb-1">
        {locale === 'th' ? 'ใช้พาหนะอะไรเป็นหลัก' : 'Main transportation method'} <span className="text-red-500">*</span>
      </label>
      
      <RadioGroup
        name="transport_type"
        options={transportTypeOptions}
        value={formData.transport_type || ''}
        onChange={handleTransportTypeChange}
        required
        error={errors.transport_type}
      />
    </div>
  );
}
