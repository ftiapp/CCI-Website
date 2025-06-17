'use client';

import { useState, useEffect } from 'react';
import SearchableSelect from './SearchableSelect';

export default function LocationSelect({
  locale,
  locationType,
  onLocationTypeChange,
  bangkokDistrictId,
  provinceId,
  onBangkokDistrictChange,
  onProvinceChange,
  bangkokDistricts = [],
  provinces = [],
  errors = {}
}) {
  // Debug: Log the props to see if data is being passed correctly
  console.log('LocationSelect props:', { 
    locationType, 
    bangkokDistrictId, 
    provinceId, 
    bangkokDistrictsCount: bangkokDistricts?.length || 0,
    provincesCount: provinces?.length || 0 
  });
  
  // Ensure bangkokDistricts and provinces are arrays
  const safeDistricts = Array.isArray(bangkokDistricts) ? bangkokDistricts : [];
  const safeProvinces = Array.isArray(provinces) ? provinces : [];
  // Format options for select components
  const locationTypeOptions = [
    { value: 'bangkok', label: locale === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok' },
    { value: 'province', label: locale === 'th' ? 'ต่างจังหวัด' : 'Province' }
  ];
  
  // Format Bangkok districts for select options
  const districtOptions = safeDistricts.map(district => ({
    value: district.id.toString(),
    label: locale === 'th' ? district.name_th : district.name_en
  }));
  
  // Format provinces for select options
  const provinceOptions = safeProvinces.map(province => ({
    value: province.id.toString(),
    label: locale === 'th' ? province.name_th : province.name_en
  }));
  
  // Debug the formatted options
  console.log('Formatted options:', {
    districtOptionsCount: districtOptions.length,
    provinceOptionsCount: provinceOptions.length
  });
  
  return (
    <div className="border-t border-earth-200 pt-6 mb-6">
      <h3 className="text-lg font-prompt font-medium text-earth-800 mb-4">
        {locale === 'th' ? 'ข้อมูลการเดินทางมาเข้าร่วมงาน' : 'Travel Information'}
      </h3>
      
      <div className="mb-4">
        <SearchableSelect
          label={locale === 'th' ? 'เดินทางมาจาก' : 'Traveling from'}
          name="location_type"
          value={locationType}
          onChange={onLocationTypeChange}
          options={locationTypeOptions}
          placeholder={locale === 'th' ? 'เลือกสถานที่' : 'Select location'}
          required
          error={errors.location_type}
        />
      </div>
      
      {locationType === 'bangkok' && (
        <div className="mb-4">
          <SearchableSelect
            label={locale === 'th' ? 'เขต' : 'District'}
            name="bangkok_district_id"
            value={bangkokDistrictId}
            onChange={onBangkokDistrictChange}
            options={districtOptions}
            placeholder={locale === 'th' ? 'ค้นหาเขต' : 'Search district'}
            required
            error={errors.bangkok_district_id}
          />
        </div>
      )}
      
      {locationType === 'province' && (
        <div className="mb-4">
          <SearchableSelect
            label={locale === 'th' ? 'จังหวัด' : 'Province'}
            name="province_id"
            value={provinceId}
            onChange={onProvinceChange}
            options={provinceOptions}
            placeholder={locale === 'th' ? 'ค้นหาจังหวัด' : 'Search province'}
            required
            error={errors.province_id}
          />
        </div>
      )}
    </div>
  );
}
