'use client';

import { FORM_CONSTANTS } from '../constants';
import { useState, useEffect } from 'react';

/**
 * Creates select options from items array
 * @param {Array} items - Array of items
 * @param {string} locale - Current locale
 * @param {string} localeKey - Key for localized name
 * @returns {Array} Array of select options
 */
export const createSelectOptions = (items, locale, localeKey = 'name') => {
  if (!items || items.length === 0) return [];
  
  return items.map(item => ({
    value: item.id,
    label: locale === 'th' ? item[`${localeKey}_th`] : item[`${localeKey}_en`]
  }));
};

/**
 * Creates options with "Other" option appended
 * @param {Array} baseOptions - Base options array
 * @param {string} locale - Current locale
 * @param {string} otherText - Text for "other" option
 * @returns {Array} Array of options with "Other" option
 */
export const createOptionsWithOther = (baseOptions, locale, otherText) => {
  return [
    ...baseOptions,
    {
      value: FORM_CONSTANTS.OTHER_OPTION_ID,
      label: locale === 'th' ? `อื่นๆ (${otherText})` : `Others (${otherText})`
    }
  ];
};

/**
 * Creates location type options
 * @param {string} locale - Current locale
 * @returns {Array} Location type options
 */
export const createLocationTypeOptions = (locale) => [
  { 
    value: FORM_CONSTANTS.LOCATION_TYPES.BANGKOK, 
    label: locale === 'th' ? 'กรุงเทพฯ' : 'Bangkok' 
  },
  { 
    value: FORM_CONSTANTS.LOCATION_TYPES.PROVINCE, 
    label: locale === 'th' ? 'ต่างจังหวัด' : 'Other Province' 
  }
];

// ฟังก์ชันสำหรับดึงข้อมูลจาก API
async function fetchTransportationData(type = null) {
  try {
    const url = type ? `/api/transportation?type=${type}` : '/api/transportation';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching transportation data: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Failed to fetch transportation data:', error);
    return null;
  }
}

/**
 * Creates transport type options
 * @param {string} locale - Current locale
 * @returns {Promise<Array>} Transport type options
 */
export const createTransportTypeOptions = async (locale) => {
  try {
    const data = await fetchTransportationData('transport-types');
    if (data && data.transportTypes && data.transportTypes.length > 0) {
      return data.transportTypes.map(type => ({
        value: type.code,
        label: locale === 'th' ? type.name_th : type.name_en
      }));
    }
  } catch (error) {
    console.error('Error creating transport type options:', error);
  }
  
  // Fallback ถ้าไม่สามารถดึงข้อมูลจาก API ได้
  return [
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC, 
      label: locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation' 
    },
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE, 
      label: locale === 'th' ? 'พาหนะส่วนตัว' : 'Private Vehicle' 
    },
    { 
      value: FORM_CONSTANTS.TRANSPORT_TYPES.WALKING, 
      label: locale === 'th' ? 'เดิน' : 'Walking' 
    }
  ];
}

/**
 * Creates public transport options
 * @param {string} locale - Current locale
 * @returns {Promise<Array>} Public transport options
 */
export const createPublicTransportOptions = async (locale) => {
  try {
    const data = await fetchTransportationData('public-transport');
    if (data && data.publicTransportTypes && data.publicTransportTypes.length > 0) {
      const baseOptions = data.publicTransportTypes
        .filter(type => type.id !== 99) // กรองข้อมูลที่ไม่ใช่ "อื่นๆ"
        .map(type => ({
          value: type.id,
          label: locale === 'th' ? type.name_th : type.name_en
        }));
      
      return createOptionsWithOther(baseOptions, locale, locale === 'th' ? 'โปรดระบุ' : 'Please specify');
    }
  } catch (error) {
    console.error('Error creating public transport options:', error);
  }
  
  // Fallback ถ้าไม่สามารถดึงข้อมูลจาก API ได้
  const baseOptions = [
    { value: 1, label: locale === 'th' ? 'รถไฟฟ้า/รถไฟใต้ดิน' : 'Electric Train/Subway' },
    { value: 2, label: locale === 'th' ? 'รถเมล์/รถประจำทาง' : 'Bus' },
    { value: 3, label: locale === 'th' ? 'รถตู้สาธารณะ' : 'Public Van' },
    { value: 4, label: locale === 'th' ? 'เรือโดยสาร' : 'Ferry/Boat' },
    { value: 5, label: locale === 'th' ? 'รถไฟ' : 'Train' },
  ];

  return createOptionsWithOther(baseOptions, locale, locale === 'th' ? 'โปรดระบุ' : 'Please specify');
}

/**
 * Creates private vehicle options
 * @param {string} locale - Current locale
 * @returns {Promise<Array>} Private vehicle options
 */
export const createPrivateVehicleOptions = async (locale) => {
  try {
    const data = await fetchTransportationData('private-vehicles');
    if (data && data.privateVehicleTypes && data.privateVehicleTypes.length > 0) {
      const baseOptions = data.privateVehicleTypes
        .filter(type => type.id !== 99) // กรองข้อมูลที่ไม่ใช่ "อื่นๆ"
        .map(type => ({
          value: type.id,
          label: locale === 'th' ? type.name_th : type.name_en
        }));
      
      return createOptionsWithOther(baseOptions, locale, locale === 'th' ? 'โปรดระบุ' : 'Please specify');
    }
  } catch (error) {
    console.error('Error creating private vehicle options:', error);
  }
  
  // Fallback ถ้าไม่สามารถดึงข้อมูลจาก API ได้
  const baseOptions = [
    { value: 1, label: locale === 'th' ? 'รถยนต์ส่วนตัว' : 'Personal Car' },
    { value: 2, label: locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle' },
    { value: 3, label: locale === 'th' ? 'แท็กซี่/แกร็บ/อูเบอร์' : 'Taxi/Grab/Uber' },
  ];

  return createOptionsWithOther(baseOptions, locale, locale === 'th' ? 'โปรดระบุ' : 'Please specify');
}

/**
 * Creates fuel type options
 * @param {string} locale - Current locale
 * @returns {Promise<Array>} Fuel type options
 */
export const createFuelTypeOptions = async (locale) => {
  try {
    const data = await fetchTransportationData('fuel-types');
    if (data && data.fuelTypes && data.fuelTypes.length > 0) {
      const baseOptions = data.fuelTypes
        .filter(type => type.id !== 99) // กรองข้อมูลที่ไม่ใช่ "อื่นๆ"
        .map(type => ({
          value: type.id,
          label: locale === 'th' ? type.name_th : type.name_en
        }));
      
      return [
        ...baseOptions,
        { value: FORM_CONSTANTS.FUEL_TYPES.OTHER, label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)' }
      ];
    }
  } catch (error) {
    console.error('Error creating fuel type options:', error);
  }
  
  // Fallback ถ้าไม่สามารถดึงข้อมูลจาก API ได้
  return [
    { value: 1, label: locale === 'th' ? 'เบนซิน' : 'Gasoline' },
    { value: 2, label: locale === 'th' ? 'ดีเซล' : 'Diesel' },
    { value: 3, label: locale === 'th' ? 'ไฟฟ้า' : 'Electric' },
    { value: 4, label: locale === 'th' ? 'ไฮบริด' : 'Hybrid' },
    { value: FORM_CONSTANTS.FUEL_TYPES.OTHER, label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)' }
  ];
}

/**
 * Creates passenger type options
 * @param {string} locale - Current locale
 * @returns {Promise<Array>} Passenger type options
 */
export const createPassengerTypeOptions = async (locale) => {
  try {
    const data = await fetchTransportationData('passenger-types');
    if (data && data.passengerTypes && data.passengerTypes.length > 0) {
      return data.passengerTypes.map(type => ({
        value: type.id,
        label: locale === 'th' ? type.name_th : type.name_en
      }));
    }
  } catch (error) {
    console.error('Error creating passenger type options:', error);
  }
  
  // Fallback ถ้าไม่สามารถดึงข้อมูลจาก API ได้
  return [
    { value: 1, label: locale === 'th' ? 'คนเดียว' : 'Alone' },
    { value: 2, label: locale === 'th' ? 'มากับเพื่อน' : 'With Friends' },
    { value: 3, label: locale === 'th' ? 'มากับครอบครัว' : 'With Family' }
  ];
}
