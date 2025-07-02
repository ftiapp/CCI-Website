'use client';

import { useState, useEffect } from 'react';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { TruckIcon, BoltIcon, StarIcon } from '@heroicons/react/24/outline';
import { createPublicTransportOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS } from '../constants';
import { motion } from 'framer-motion';

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
  // Enhanced public transport options with better defaults and icons
  const [publicTransportOptions, setPublicTransportOptions] = useState([
    { 
      value: 1, 
      label: locale === 'th' ? 'รถไฟฟ้า/รถไฟใต้ดิน' : 'Electric Train/Subway',
      icon: '🚇'
    },
    { 
      value: 2, 
      label: locale === 'th' ? 'รถเมล์/รถประจำทาง' : 'Bus',
      icon: '🚌'
    },
    { 
      value: 3, 
      label: locale === 'th' ? 'รถตู้สาธารณะ' : 'Public Van',
      icon: '🚐'
    },
    { 
      value: 4, 
      label: locale === 'th' ? 'เรือโดยสาร' : 'Ferry/Boat',
      icon: '⛵'
    },
    { 
      value: 5, 
      label: locale === 'th' ? 'รถไฟ' : 'Train',
      icon: '🚄'
    },
    { 
      value: 99, 
      label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)',
      icon: '🔧'
    }
  ]);

  // Fetch options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await createPublicTransportOptions(locale);
        if (options && Array.isArray(options) && options.length > 0) {
          // Add icons to fetched options if they don't have them
          const enhancedOptions = options.map(option => {
            const defaultOption = publicTransportOptions.find(def => def.value === option.value);
            return {
              ...option,
              icon: defaultOption?.icon || '🚌'
            };
          });
          setPublicTransportOptions(enhancedOptions);
        }
      } catch (error) {
        console.error('Error fetching public transport options:', error);
      }
    };
    
    fetchOptions();
  }, [locale]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <div className="ml-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <TruckIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-prompt font-bold text-slate-800">
              {locale === 'th' ? 'ประเภทขนส่งมวลชน' : 'Public Transportation Type'}
              <span className="text-red-500 ml-1">*</span>
            </h3>
            <p className="text-sm text-slate-600 font-prompt">
              {locale === 'th' ? 'เลือกประเภทการเดินทางด้วยขนส่งสาธารณะ' : 'Select your public transportation method'}
            </p>
          </div>
        </div>
        
        {/* Transport Selection */}
        <div className="mb-6">
          <SearchableSelect
            name="public_transport_id"
            value={parseInt(formData.public_transport_id) || ''}
            onChange={handlePublicTransportChange}
            options={publicTransportOptions}
            placeholder={locale === 'th' ? 'เลือกประเภทขนส่งมวลชน' : 'Select Public Transportation Type'}
            required
            error={errors.public_transport_id}
            allowOther={isOtherPublicTransportSelected}
            otherValue={formData.public_transport_other || ''}
            otherName={otherFieldName}
            onOtherChange={handleOtherPublicTransportChange}
            otherRequired={isOtherPublicTransportSelected}
            otherError={errors.public_transport_other}
            otherPlaceholder={locale === 'th' ? 'โปรดระบุประเภทขนส่งมวลชน *' : 'Please specify transportation type *'}
          />
        </div>
        
        {/* Popular Options Display */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {publicTransportOptions.slice(0, 6).map((option) => (
            <motion.div
              key={option.value}
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                parseInt(formData.public_transport_id) === option.value
                  ? 'border-blue-400 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-md'
                  : 'border-slate-200 bg-white/60 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">{option.icon}</span>
                <span className="text-xs font-prompt font-medium text-slate-700 leading-tight">
                  {option.label.split(' (')[0]} {/* Remove "(Please specify)" part */}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
       
      </div>
    </motion.div>
  );
}