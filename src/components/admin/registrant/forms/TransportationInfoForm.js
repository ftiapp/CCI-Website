import React from 'react';
import { 
  createTransportTypeOptions, 
  createPublicTransportOptions, 
  createPrivateVehicleOptions,
  createFuelTypeOptions,
  createPassengerTypeOptions
} from '../utils/formUtils'; // หรือ path ที่ถูกต้องตาม structure ของโปรเจ็กต์
import { FORM_CONSTANTS } from '../constants';

export default function TransportationInfoForm({ 
  formData, 
  handleChange, 
  publicTransportOptions, 
  privateVehicleOptions,
  locale = 'th' // เพิ่ม locale prop สำหรับ multi-language support
}) {
  // สร้าง options โดยใช้ utility functions
  const transportTypeOptions = createTransportTypeOptions(locale);
  const publicTransportSelectOptions = createPublicTransportOptions(locale);
  const privateVehicleSelectOptions = createPrivateVehicleOptions(locale);
  const fuelTypeOptions = createFuelTypeOptions(locale);
  const passengerTypeOptions = createPassengerTypeOptions(locale);

  // ไม่ต้องแสดงข้อมูลการเดินทางที่ผู้ลงทะเบียนเลือกไว้เดิม
  
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h4 className="text-lg font-prompt font-medium mb-4">
        {locale === 'th' ? 'ข้อมูลการเดินทาง' : 'Transportation Information'}
      </h4>
      
      {/* ไม่ต้องแสดงข้อมูลการเดินทางที่ผู้ลงทะเบียนเลือกไว้เดิม */}
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="transport_type" className="block text-sm font-prompt mb-1">
            {locale === 'th' ? 'วิธีการเดินทาง *' : 'Transportation Method *'}
          </label>
          <select
            id="transport_type"
            name="transport_type"
            value={formData.transport_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md font-prompt"
            required
          >
            <option value="">
              {locale === 'th' ? 'เลือกวิธีการเดินทาง' : 'Select transportation method'}
            </option>
            {transportTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* ถ้าเลือกขนส่งมวลชน */}
        {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC && (
          <div className="ml-6">
            <label htmlFor="public_transport_id" className="block text-sm font-prompt mb-1">
              {locale === 'th' ? 'ประเภทขนส่งมวลชน *' : 'Public Transportation Type *'}
            </label>
            <select
              id="public_transport_id"
              name="public_transport_id"
              value={formData.public_transport_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md font-prompt"
              required
            >
              <option value="">
                {locale === 'th' ? 'เลือกประเภทขนส่งมวลชน' : 'Select public transportation type'}
              </option>
              {publicTransportSelectOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {(formData.public_transport_id === FORM_CONSTANTS.OTHER_OPTION_ID || formData.public_transport_id === FORM_CONSTANTS.OTHER_OPTION_ID_ALT || formData.public_transport_id === '99' || formData.public_transport_id === '999') && (
              <div className="mt-2">
                <label htmlFor="public_transport_other" className="block text-sm font-prompt mb-1">
                  {locale === 'th' ? 'ระบุประเภทขนส่งมวลชน *' : 'Specify public transportation type *'}
                </label>
                <input
                  type="text"
                  id="public_transport_other"
                  name="public_transport_other"
                  value={formData.public_transport_other}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md font-prompt"
                  required
                />
              </div>
            )}
          </div>
        )}
        
        {/* ถ้าเลือกพาหนะส่วนตัว */}
        {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE && (
          <div className="ml-6">
            <div className="mb-4">
              <label htmlFor="private_vehicle_id" className="block text-sm font-prompt mb-1">
                {locale === 'th' ? 'ประเภทพาหนะส่วนตัว *' : 'Private Vehicle Type *'}
              </label>
              <select
                id="private_vehicle_id"
                name="private_vehicle_id"
                value={formData.private_vehicle_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-md font-prompt"
                required
              >
                <option value="">
                  {locale === 'th' ? 'เลือกประเภทพาหนะส่วนตัว' : 'Select private vehicle type'}
                </option>
                {privateVehicleSelectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {(formData.private_vehicle_id === FORM_CONSTANTS.OTHER_OPTION_ID || formData.private_vehicle_id === FORM_CONSTANTS.OTHER_OPTION_ID_ALT || formData.private_vehicle_id === '99' || formData.private_vehicle_id === '999') && (
                <div className="mt-2">
                  <label htmlFor="private_vehicle_other" className="block text-sm font-prompt mb-1">
                    {locale === 'th' ? 'ระบุประเภทพาหนะส่วนตัว *' : 'Specify private vehicle type *'}
                  </label>
                  <input
                    type="text"
                    id="private_vehicle_other"
                    name="private_vehicle_other"
                    value={formData.private_vehicle_other}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md font-prompt"
                    required
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="fuel_type_id" className="block text-sm font-prompt mb-1">
                {locale === 'th' ? 'ประเภทเชื้อเพลิง *' : 'Fuel Type *'}
              </label>
              <select
                id="fuel_type_id"
                name="fuel_type_id"
                value={formData.fuel_type_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-md font-prompt"
                required
              >
                <option value="">
                  {locale === 'th' ? 'เลือกประเภทเชื้อเพลิง' : 'Select fuel type'}
                </option>
                {fuelTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {(formData.fuel_type_id === FORM_CONSTANTS.FUEL_TYPES.OTHER || formData.fuel_type_id === FORM_CONSTANTS.FUEL_TYPES.OTHER_ID || formData.fuel_type_id === '999' || formData.fuel_type_id === 999 || formData.fuel_type_id === '99' || formData.fuel_type_id === 99) && (
                <div className="mt-2">
                  <label htmlFor="fuel_type_other" className="block text-sm font-prompt mb-1">
                    {locale === 'th' ? 'ระบุประเภทเชื้อเพลิง *' : 'Specify fuel type *'}
                  </label>
                  <input
                    type="text"
                    id="fuel_type_other"
                    name="fuel_type_other"
                    value={formData.fuel_type_other}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md font-prompt"
                    required
                  />
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="passenger_type" className="block text-sm font-prompt mb-1">
                {locale === 'th' ? 'เดินทางร่วมกับคนอื่นหรือไม่ *' : 'Traveling with others? *'}
              </label>
              <select
                id="passenger_type"
                name="passenger_type"
                value={formData.passenger_type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md font-prompt"
                required
              >
                <option value="">
                  {locale === 'th' ? 'เลือกรูปแบบการเดินทาง' : 'Select travel type'}
                </option>
                {passengerTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}