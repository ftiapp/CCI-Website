'use client';

import { useMemo } from 'react';
import RadioGroup from '@/components/ui/RadioGroup';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { createLocationTypeOptions, createSelectOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS } from '../constants';

/**
 * Location Section Component
 */
export default function LocationSection({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handleLocationTypeChange,
  bangkokDistricts,
  provinces
}) {
  // Memoized options
  const locationTypeOptions = useMemo(() => 
    createLocationTypeOptions(locale), 
    [locale]
  );

  const bangkokOptions = useMemo(() => 
    createSelectOptions(bangkokDistricts, locale, 'name'), 
    [bangkokDistricts, locale]
  );

  const provinceOptions = useMemo(() => 
    createSelectOptions(provinces, locale, 'name'), 
    [provinces, locale]
  );

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-earth-700 mb-1">
        {locale === 'th' ? 'เดินทางจาก' : 'Traveling from'} <span className="text-red-500">*</span>
      </label>
      
      <RadioGroup
        name="location_type"
        options={locationTypeOptions}
        value={formData.location_type}
        onChange={handleLocationTypeChange}
        required
        error={errors.location_type}
      />
      
      {formData.location_type === FORM_CONSTANTS.LOCATION_TYPES.BANGKOK && (
        <SearchableSelect
          label={locale === 'th' ? 'เขต' : 'District'}
          name="bangkok_district_id"
          value={formData.bangkok_district_id}
          onChange={handleChange}
          options={bangkokOptions}
          placeholder={locale === 'th' ? 'เลือกเขต' : 'Select District'}
          required
          error={errors.bangkok_district_id}
          className="mb-4 mt-2"
        />
      )}
      
      {formData.location_type === FORM_CONSTANTS.LOCATION_TYPES.PROVINCE && (
        <SearchableSelect
          label={locale === 'th' ? 'จังหวัด' : 'Province'}
          name="province_id"
          value={formData.province_id}
          onChange={handleChange}
          options={provinceOptions}
          placeholder={locale === 'th' ? 'เลือกจังหวัด' : 'Select Province'}
          required
          error={errors.province_id}
          className="mb-4 mt-2"
        />
      )}
    </div>
  );
}
