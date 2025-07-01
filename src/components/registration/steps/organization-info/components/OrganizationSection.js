'use client';

import { BuildingOfficeIcon, BuildingLibraryIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import Input from '@/components/ui/Input';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { getTranslations } from '@/i18n';
import { useMemo, useEffect } from 'react';
import { createSelectOptions, createOptionsWithOther } from '../utils/optionsGenerator';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-3xl pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-2xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8 overflow-visible"
        style={{ zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-2 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <BuildingOfficeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t.registration.organizationInfo}
            </span>
          </h2>
          <p className="text-slate-600 font-prompt ml-14">
            {locale === 'th' 
              ? 'กรุณากรอกข้อมูลองค์กรของท่าน' 
              : 'Please fill in your organization information'}
          </p>
        </motion.div>

        {/* Organization Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <label htmlFor="organizationName" className="block mb-3 font-prompt font-semibold text-slate-700 text-sm">
            {t.registration.organizationName} <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <BuildingLibraryIcon className="h-5 w-5 text-blue-600" />
            </div>
            <input
              type="text"
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              placeholder={locale === 'th' ? 'ชื่อองค์กร' : 'Organization Name'}
              className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-prompt transition-all duration-300 hover:bg-white/90"
              required
            />
          </div>
          {errors.organizationName && (
            <p className="mt-2 flex items-center text-sm text-red-600">
              <span className="font-prompt">{errors.organizationName}</span>
            </p>
          )}
        </motion.div>
        
        {/* Organization Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 relative"
          style={{ zIndex: 10 }}
        >
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 overflow-visible">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <BuildingOfficeIcon className="w-4 h-4 text-white" />
              </div>
              <label className="font-prompt font-semibold text-slate-700 text-sm">
                {locale === 'th' ? 'ประเภทองค์กร' : 'Organization Type'} <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
            
            <div style={{ position: 'relative', zIndex: 20 }}>
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
          </div>
        </motion.div>
        
        {/* Industry Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 relative"
          style={{ zIndex: 5 }}
        >
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 overflow-visible">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <BriefcaseIcon className="w-4 h-4 text-white" />
              </div>
              <label className="font-prompt font-semibold text-slate-700 text-sm">
                {locale === 'th' ? 'ประเภทอุตสาหกรรม' : 'Industry Type'}
              </label>
            </div>
            
            <div style={{ position: 'relative', zIndex: 15 }}>
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
        </motion.div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400/50 rounded-full blur-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-400/50 rounded-full blur-sm"></div>
      </div>
    </motion.div>
  );
}