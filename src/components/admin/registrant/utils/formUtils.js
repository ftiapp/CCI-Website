'use client';

import { FORM_CONSTANTS } from '../constants';

/**
 * Creates select options from items array
 * @param {Array} items - Array of items
 * @param {string} locale - Current locale
 * @param {string} localeKey - Key for localized name
 * @returns {Array} Array of select options
 */
export const createSelectOptions = (items, locale, localeKey = 'name') => {
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
 * Creates transport type options
 * @param {string} locale - Current locale
 * @returns {Array} Transport type options
 */
export const createTransportTypeOptions = (locale) => [
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

/**
 * Creates public transport options
 * @param {string} locale - Current locale
 * @returns {Array} Public transport options
 */
export const createPublicTransportOptions = (locale) => {
  const baseOptions = [
    { value: 1, label: locale === 'th' ? 'รถไฟฟ้า/รถไฟใต้ดิน' : 'Electric Train/Subway' },
    { value: 2, label: locale === 'th' ? 'รถเมล์/รถประจำทาง' : 'Bus' },
    { value: 3, label: locale === 'th' ? 'รถตู้สาธารณะ' : 'Public Van' },
    { value: 4, label: locale === 'th' ? 'เรือโดยสาร' : 'Ferry/Boat' },
    { value: 5, label: locale === 'th' ? 'รถไฟ' : 'Train' }
  ];
  
  return createOptionsWithOther(
    baseOptions, 
    locale, 
    locale === 'th' ? 'โปรดระบุ' : 'Please specify'
  );
};

/**
 * Creates private vehicle options
 * @param {string} locale - Current locale
 * @returns {Array} Private vehicle options
 */
export const createPrivateVehicleOptions = (locale) => {
  const baseOptions = [
    { value: 1, label: locale === 'th' ? 'รถยนต์ส่วนตัว' : 'Personal Car' },
    { value: 2, label: locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle' },
    { value: 3, label: locale === 'th' ? 'แท็กซี่/แกร็บ/อูเบอร์' : 'Taxi/Grab/Uber' }
  ];
  
  return createOptionsWithOther(
    baseOptions, 
    locale, 
    locale === 'th' ? 'โปรดระบุ' : 'Please specify'
  );
};

/**
 * Creates fuel type options
 * @param {string} locale - Current locale
 * @returns {Array} Fuel type options
 */
export const createFuelTypeOptions = (locale) => [
  { value: 'gasoline', label: locale === 'th' ? 'เบนซิน' : 'Gasoline' },
  { value: 'diesel', label: locale === 'th' ? 'ดีเซล' : 'Diesel' },
  { value: 'electric', label: locale === 'th' ? 'ไฟฟ้า' : 'Electric' },
  { value: 'hybrid', label: locale === 'th' ? 'ไฮบริด' : 'Hybrid' },
  { value: FORM_CONSTANTS.FUEL_TYPES.OTHER, label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)' }
];

/**
 * Creates passenger type options
 * @param {string} locale - Current locale
 * @returns {Array} Passenger type options
 */
export const createPassengerTypeOptions = (locale) => [
  { value: 'driver', label: locale === 'th' ? 'ผู้ขับ' : 'Driver' },
  { value: 'passenger', label: locale === 'th' ? 'ผู้โดยสาร' : 'Passenger' }
];
