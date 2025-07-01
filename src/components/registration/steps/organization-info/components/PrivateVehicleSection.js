'use client';

import { useState, useEffect } from 'react';
import SearchableSelect from '@/components/ui/SearchableSelect';
import RadioGroup from '@/components/ui/RadioGroup';
import Input from '@/components/ui/Input';
import { TruckIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline';
import { createPrivateVehicleOptions, createFuelTypeOptions, createPassengerTypeOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS, FIELD_NAMES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Private Vehicle Section Component
 */
export default function PrivateVehicleSection({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handlePrivateVehicleChange,
  isOtherPrivateVehicleSelected,
  handleOtherPrivateVehicleChange,
  handleFuelTypeChange,
  isFuelTypeOther
}) {
  // State for options with enhanced defaults
  const [privateVehicleOptions, setPrivateVehicleOptions] = useState([
    { 
      value: 1, 
      label: locale === 'th' ? 'รถยนต์' : 'Car',
      icon: '🚗'
    },
    { 
      value: 2, 
      label: locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle',
      icon: '🏍️'
    },
    { 
      value: 3, 
      label: locale === 'th' ? 'รถจักรยาน' : 'Bicycle',
      icon: '🚲'
    },
    { 
      value: 99, 
      label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)',
      icon: '🔧'
    }
  ]);

  const [fuelTypeOptions, setFuelTypeOptions] = useState([
    { 
      value: '1', 
      label: locale === 'th' ? 'น้ำมัน' : 'Gasoline',
      icon: '⛽',
      eco: false
    },
    { 
      value: '2', 
      label: locale === 'th' ? 'ไฟฟ้า' : 'Electric',
      icon: '🔋',
      eco: true
    },
    { 
      value: '3', 
      label: locale === 'th' ? 'ไฮบริด' : 'Hybrid',
      icon: '🔋',
      eco: true
    },
    { 
      value: '99', 
      label: locale === 'th' ? 'อื่นๆ' : 'Others',
      icon: '🔧',
      eco: false
    }
  ]);

  const [passengerTypeOptions, setPassengerTypeOptions] = useState([
    { 
      value: 'alone', 
      label: locale === 'th' ? 'เดินทางคนเดียว' : 'Traveling alone',
      icon: '👤',
      description: locale === 'th' ? 'เดินทางไปคนเดียว' : 'Solo travel'
    },
    { 
      value: 'carpool', 
      label: locale === 'th' ? 'เดินทางแบบ Carpool' : 'Carpooling',
      icon: '👥',
      description: locale === 'th' ? 'แบ่งปันรถกับคนอื่น' : 'Sharing ride with others'
    }
  ]);

  // Fetch options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const vehicleOptions = await createPrivateVehicleOptions(locale);
        if (vehicleOptions && Array.isArray(vehicleOptions) && vehicleOptions.length > 0) {
          setPrivateVehicleOptions(vehicleOptions);
        }
        
        const fuelOptions = await createFuelTypeOptions(locale);
        if (fuelOptions && Array.isArray(fuelOptions) && fuelOptions.length > 0) {
          setFuelTypeOptions(fuelOptions);
        }
        
        const passengerOptions = await createPassengerTypeOptions(locale);
        if (passengerOptions && Array.isArray(passengerOptions) && passengerOptions.length > 0) {
          setPassengerTypeOptions(passengerOptions);
        }
      } catch (error) {
        console.error('Error fetching vehicle options:', error);
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
      className="mt-6 space-y-6"
    >
      {/* Vehicle Type Selection */}
      <div className="ml-6 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
            <TruckIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-prompt font-semibold text-slate-800">
            {locale === 'th' ? 'ประเภทพาหนะส่วนตัว' : 'Private Vehicle Type'}
            <span className="text-red-500 ml-1">*</span>
          </h3>
        </div>
        
        <SearchableSelect
          name="private_vehicle_id"
          value={parseInt(formData.private_vehicle_id) || ''}
          onChange={handlePrivateVehicleChange}
          options={privateVehicleOptions}
          placeholder={locale === 'th' ? 'เลือกประเภทพาหนะส่วนตัว' : 'Select Private Vehicle Type'}
          required
          error={errors.private_vehicle_id}
          allowOther={isOtherPrivateVehicleSelected}
          otherValue={formData.private_vehicle_other || ''}
          otherName={FIELD_NAMES.PRIVATE_VEHICLE_OTHER}
          onOtherChange={handleOtherPrivateVehicleChange}
        />
      </div>
      
      {/* Fuel Type Selection */}
      <div className="ml-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
            <BoltIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-prompt font-semibold text-slate-800">
            {locale === 'th' ? 'ประเภทเชื้อเพลิง' : 'Fuel Type'}
            <span className="text-red-500 ml-1">*</span>
          </h3>
        </div>
        
        <RadioGroup
          name="fuel_type"
          options={fuelTypeOptions}
          value={formData.fuel_type || ''}
          onChange={handleFuelTypeChange}
          required
          error={errors.fuel_type}
        />
      </div>
      
      {/* Other Fuel Type Input */}
      <AnimatePresence>
        {isFuelTypeOther && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-12"
          >
            <Input
              label={locale === 'th' ? 'ระบุประเภทเชื้อเพลิง' : 'Specify Fuel Type'}
              name={FIELD_NAMES.FUEL_TYPE_OTHER}
              value={formData.fuel_type_other || ''}
              onChange={handleChange}
              placeholder={locale === 'th' ? 'ระบุประเภทเชื้อเพลิง' : 'Specify Fuel Type'}
              required
              error={errors.fuel_type_other}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Passenger Type Selection */}
      <div className="ml-6 p-6 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-200">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
            <UserGroupIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-prompt font-semibold text-slate-800">
            {locale === 'th' ? 'เดินทางร่วมกับคนอื่นหรือไม่' : 'Traveling with others'}
            <span className="text-red-500 ml-1">*</span>
          </h3>
        </div>
        
        <RadioGroup
          name="passenger_type"
          options={passengerTypeOptions}
          value={formData.passenger_type || ''}
          onChange={handleChange}
          required
          error={errors.passenger_type}
        />
      </div>
    </motion.div>
  );
}