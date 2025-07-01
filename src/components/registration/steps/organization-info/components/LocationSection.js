'use client';

import { useMemo } from 'react';
import RadioGroup from '@/components/ui/RadioGroup';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { MapPinIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { createLocationTypeOptions, createSelectOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

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
  // Enhanced location type options with icons and descriptions
  const locationTypeOptions = [
    { 
      value: FORM_CONSTANTS.LOCATION_TYPES.BANGKOK, 
      label: locale === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok',
      icon: '🏙️',
      description: locale === 'th' ? 'ภายในกรุงเทพมหานคร' : 'Within Bangkok Metropolitan'
    },
    { 
      value: FORM_CONSTANTS.LOCATION_TYPES.PROVINCE, 
      label: locale === 'th' ? 'ต่างจังหวัด' : 'Other Provinces',
      icon: '🌾',
      description: locale === 'th' ? 'จังหวัดอื่นๆ ทั่วประเทศ' : 'Other provinces nationwide'
    }
  ];

  const bangkokOptions = useMemo(() => 
    createSelectOptions(bangkokDistricts, locale, 'name'), 
    [bangkokDistricts, locale]
  );

  const provinceOptions = useMemo(() => 
    createSelectOptions(provinces, locale, 'name'), 
    [provinces, locale]
  );

  return (
    <div className="space-y-6">
      {/* Location Type Selection */}
      <div>
        <label className="block mb-4 font-prompt font-semibold text-slate-700 text-sm">
          {locale === 'th' ? 'เดินทางจาก' : 'Traveling from'} <span className="text-red-500 ml-1">*</span>
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locationTypeOptions.map((option, index) => (
            <motion.label
              key={option.value}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                formData.location_type === option.value
                  ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                  : 'border-slate-200 bg-white/60 hover:border-green-300 hover:bg-gradient-to-br hover:from-green-50/50 hover:to-emerald-50/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="radio"
                name="location_type"
                value={option.value}
                checked={formData.location_type === option.value}
                onChange={handleLocationTypeChange}
                className="sr-only"
              />
              
              {/* Selection indicator */}
              <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                formData.location_type === option.value
                  ? 'border-green-500 bg-green-500 shadow-md'
                  : 'border-slate-300'
              }`}>
                {formData.location_type === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />
                )}
              </div>
              
              {/* Content */}
              <div className="text-center">
                <div className="text-3xl mb-3">{option.icon}</div>
                <h3 className="font-prompt font-bold text-slate-800 mb-2">
                  {option.label}
                </h3>
                <p className="text-sm text-slate-600 font-prompt">
                  {option.description}
                </p>
              </div>
            </motion.label>
          ))}
        </div>
        
        {errors.location_type && (
          <p className="mt-2 text-sm text-red-600 font-prompt">{errors.location_type}</p>
        )}
      </div>
      
      {/* Bangkok District Selection */}
      <AnimatePresence>
        {formData.location_type === FORM_CONSTANTS.LOCATION_TYPES.BANGKOK && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                  <BuildingLibraryIcon className="w-4 h-4 text-white" />
                </div>
                <label className="font-prompt font-semibold text-slate-700 text-sm">
                  {locale === 'th' ? 'เขต' : 'District'} <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
              
              <SearchableSelect
                name="bangkok_district_id"
                value={formData.bangkok_district_id}
                onChange={handleChange}
                options={bangkokOptions}
                placeholder={locale === 'th' ? 'เลือกเขต' : 'Select District'}
                required
                error={errors.bangkok_district_id}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Province Selection */}
      <AnimatePresence>
        {formData.location_type === FORM_CONSTANTS.LOCATION_TYPES.PROVINCE && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                  <MapPinIcon className="w-4 h-4 text-white" />
                </div>
                <label className="font-prompt font-semibold text-slate-700 text-sm">
                  {locale === 'th' ? 'จังหวัด' : 'Province'} <span className="text-red-500 ml-1">*</span>
                </label>
              </div>
              
              <SearchableSelect
                name="province_id"
                value={formData.province_id}
                onChange={handleChange}
                options={provinceOptions}
                placeholder={locale === 'th' ? 'เลือกจังหวัด' : 'Select Province'}
                required
                error={errors.province_id}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}