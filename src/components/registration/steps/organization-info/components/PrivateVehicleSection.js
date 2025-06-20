'use client';

import { useState, useEffect } from 'react';
import SearchableSelect from '@/components/ui/SearchableSelect';
import RadioGroup from '@/components/ui/RadioGroup';
import Input from '@/components/ui/Input';
import { createPrivateVehicleOptions, createFuelTypeOptions, createPassengerTypeOptions } from '../utils/optionsGenerator';
import { FORM_CONSTANTS, FIELD_NAMES } from '../constants';

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
  // State for options
  const [privateVehicleOptions, setPrivateVehicleOptions] = useState([
    { value: 1, label: locale === 'th' ? 'รถยนต์' : 'Car' },
    { value: 2, label: locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle' },
    { value: 3, label: locale === 'th' ? 'รถจักรยาน' : 'Bicycle' },
    { value: 99, label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)' }
  ]);

  const [fuelTypeOptions, setFuelTypeOptions] = useState([
    { value: '1', label: locale === 'th' ? 'น้ำมัน' : 'Gasoline' },
    { value: '2', label: locale === 'th' ? 'ไฟฟ้า' : 'Electric' },
    { value: '3', label: locale === 'th' ? 'ไฮบริด' : 'Hybrid' },
    { value: '99', label: locale === 'th' ? 'อื่นๆ' : 'Others' }
  ]);

  const [passengerTypeOptions, setPassengerTypeOptions] = useState([
    { value: 'alone', label: locale === 'th' ? 'เดินทางคนเดียว' : 'Traveling alone' },
    { value: 'carpool', label: locale === 'th' ? 'เดินทางแบบ Carpool' : 'Carpooling' }
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
    <div className="ml-6">
      <SearchableSelect
        label={locale === 'th' ? 'ประเภทพาหนะส่วนตัว' : 'Private Vehicle Type'}
        name="private_vehicle_id"
        value={parseInt(formData.private_vehicle_id) || ''}
        onChange={handlePrivateVehicleChange}
        options={privateVehicleOptions}
        placeholder={locale === 'th' ? 'เลือกประเภทพาหนะส่วนตัว' : 'Select Private Vehicle Type'}
        required
        error={errors.private_vehicle_id}
        className="mb-4"
        allowOther={isOtherPrivateVehicleSelected}
        otherValue={formData.private_vehicle_other || ''}
        otherName={FIELD_NAMES.PRIVATE_VEHICLE_OTHER}
        onOtherChange={handleOtherPrivateVehicleChange}
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {locale === 'th' ? 'ประเภทเชื้อเพลิง' : 'Fuel Type'} <span className="text-red-500">*</span>
        </label>
        
        <RadioGroup
          name="fuel_type"
          options={fuelTypeOptions}
          value={formData.fuel_type || ''}
          onChange={handleFuelTypeChange}
          required
          error={errors.fuel_type}
        />
      </div>
      
      {isFuelTypeOther && (
        <div className="mb-4 ml-6">
          <Input
            label={locale === 'th' ? 'ระบุประเภทเชื้อเพลิง' : 'Specify Fuel Type'}
            name={FIELD_NAMES.FUEL_TYPE_OTHER}
            value={formData.fuel_type_other || ''}
            onChange={handleChange}
            placeholder={locale === 'th' ? 'ระบุประเภทเชื้อเพลิง' : 'Specify Fuel Type'}
            required
            error={errors.fuel_type_other}
          />
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {locale === 'th' ? 'เดินทางร่วมกับคนอื่นหรือไม่' : 'Traveling with others'} <span className="text-red-500">*</span>
        </label>
        
        <RadioGroup
          name="passenger_type"
          options={passengerTypeOptions}
          value={formData.passenger_type || ''}
          onChange={handleChange}
          required
          error={errors.passenger_type}
        />
      </div>
    </div>
  );
}
