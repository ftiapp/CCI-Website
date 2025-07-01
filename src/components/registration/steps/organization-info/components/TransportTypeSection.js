'use client';

import { useState, useEffect } from 'react';
import RadioGroup from '@/components/ui/RadioGroup';
import { createTransportTypeOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS } from '../constants';
import { motion } from 'framer-motion';

/**
 * Transport Type Section Component
 */
export default function TransportTypeSection({ 
  locale, 
  formData, 
  errors, 
  handleTransportTypeChange
}) {
  // Enhanced transport type options with icons and descriptions
  const transportTypeOptions = [
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC, 
      label: locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation',
      icon: '🚇',
      description: locale === 'th' ? 'รถไฟฟ้า รถเมล์ เรือ' : 'Train, Bus, Boat',
      eco: true
    },
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE, 
      label: locale === 'th' ? 'พาหนะส่วนตัว' : 'Private Vehicle',
      icon: '🚗',
      description: locale === 'th' ? 'รถยนต์ มอเตอร์ไซค์' : 'Car, Motorcycle',
      eco: false
    },
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.WALKING, 
      label: locale === 'th' ? 'เดิน' : 'Walking',
      icon: '🚶‍♂️',
      description: locale === 'th' ? 'เดินเท้า จักรยาน' : 'Walking, Bicycle',
      eco: true
    }
  ];

  return (
    <div className="transport_type-container" data-field="transport_type">
      <label className="block mb-4 font-prompt font-semibold text-slate-700 text-sm">
        {locale === 'th' ? 'ใช้พาหนะอะไรเป็นหลัก' : 'Main transportation method'} 
        <span className="text-red-500 ml-1">*</span>
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transportTypeOptions.map((option, index) => (
          <motion.label
            key={option.value}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              formData.transport_type === option.value
                ? 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg'
                : 'border-slate-200 bg-white/60 hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-50/50 hover:to-teal-50/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="radio"
              name="transport_type"
              value={option.value}
              checked={formData.transport_type === option.value}
              onChange={handleTransportTypeChange}
              className="sr-only"
            />
            
            {/* Eco badge */}
            {option.eco && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-300">
                <span className="text-xs font-prompt font-semibold text-green-700 flex items-center">
                  🌱 {locale === 'th' ? 'Eco-friendly' : 'Eco-friendly'}
                </span>
              </div>
            )}
            
            {/* Selection indicator */}
            <div className={`absolute top-4 left-4 w-6 h-6 rounded-full border-2 transition-all duration-300 ${
              formData.transport_type === option.value
                ? 'border-emerald-500 bg-emerald-500 shadow-md'
                : 'border-slate-300'
            }`}>
              {formData.transport_type === option.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
            
            {/* Content */}
            <div className="text-center mt-4">
              <div className="text-4xl mb-3">{option.icon}</div>
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
      
      {errors.transport_type && (
        <p className="mt-3 text-sm text-red-600 font-prompt" data-error-for="transport_type">{errors.transport_type}</p>
      )}
    </div>
  );
}