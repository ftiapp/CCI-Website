'use client';

import { BuildingOfficeIcon } from '@heroicons/react/24/outline';
import Input from '@/components/ui/Input';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { getTranslations } from '@/i18n';
import { useMemo, useEffect } from 'react';
import { createSelectOptions, createOptionsWithOther } from '../utils/optionsGenerator';

/**
 * Organization Section Component
 */
export default function OrganizationSection({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handleOrgTypeChange,
  handleIndustryTypeChange,
  organizationTypes,
  industryTypes,
  otherOrgType,
  isOtherOrgSelected,
  otherIndustryType,
  isOtherIndustrySelected,
  handleOtherOrgTypeChange,
  handleOtherIndustryTypeChange,
  otherOrgFieldName,
  otherIndustryFieldName
}) {
  const t = getTranslations(locale || 'th');
  
  // Memoized options for organization types
  const orgTypeOptions = useMemo(() => {
    // ตรวจสอบว่า organizationTypes มีข้อมูลหรือไม่
    if (!organizationTypes || organizationTypes.length === 0) {
      return [];
    }
    
    // กรองข้อมูลซ้ำออกก่อนสร้างตัวเลือก
    const uniqueOrgTypes = Array.from(
      new Map(organizationTypes.map(item => [item.id, item])).values()
    );
    
    const baseOptions = createSelectOptions(uniqueOrgTypes, locale, 'name');
    
    // กรองตัวเลือกซ้ำอีกครั้งก่อนเพิ่มตัวเลือก "อื่นๆ"
    const uniqueBaseOptions = Array.from(
      new Map(baseOptions.map(option => [option.value, option])).values()
    );
    
    return createOptionsWithOther(uniqueBaseOptions, locale, locale === 'th' ? 'โปรดระบุ' : 'Please specify');
  }, [organizationTypes, locale]);
  
  // ตรวจสอบและแสดงค่าตัวเลือกในคอนโซลเพื่อการดีบัก
  useEffect(() => {
    console.log('Organization Types Options:', orgTypeOptions);
  }, [orgTypeOptions]);
  
  // Memoized options for industry types
  const industryTypeOptions = useMemo(() => {
    const baseOptions = createSelectOptions(industryTypes, locale, 'name');
    return createOptionsWithOther(baseOptions, locale, locale === 'th' ? 'โปรดระบุ' : 'Please specify');
  }, [industryTypes, locale]);

  return (
    <div>
      <h2 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
        <BuildingOfficeIcon className="w-5 h-5 mr-2 text-lake-600" />
        {t.registration.organizationInfo}
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {t.registration.organizationName} <span className="text-red-500">*</span>
        </label>
        <Input
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder={locale === 'th' ? 'ชื่อองค์กร' : 'Organization Name'}
          required
          error={errors.organizationName}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {locale === 'th' ? 'ประเภทองค์กร' : 'Organization Type'} <span className="text-red-500">*</span>
        </label>
        <SearchableSelect
          name="organizationTypeId"
          value={formData.organizationTypeId}
          onChange={handleOrgTypeChange}
          options={orgTypeOptions}
          placeholder={locale === 'th' ? 'เลือกประเภทองค์กร' : 'Select Organization Type'}
          required
          error={errors.organizationTypeId}
          allowOther={isOtherOrgSelected}
          otherValue={otherOrgType}
          otherName={otherOrgFieldName}
          onOtherChange={handleOtherOrgTypeChange}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {locale === 'th' ? 'ประเภทอุตสาหกรรม' : 'Industry Type'}
        </label>
        <SearchableSelect
          name="industryTypeId"
          value={formData.industryTypeId}
          onChange={handleIndustryTypeChange}
          options={industryTypeOptions}
          placeholder={locale === 'th' ? 'เลือกประเภทอุตสาหกรรม' : 'Select Industry Type'}
          error={errors.industryTypeId}
          allowOther={isOtherIndustrySelected}
          otherValue={otherIndustryType}
          otherName={otherIndustryFieldName}
          onOtherChange={handleOtherIndustryTypeChange}
        />
      </div>
    </div>
  );
}
