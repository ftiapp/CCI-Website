'use client';

/**
 * Utility functions to generate display labels for various form fields
 */

/**
 * Get transportation category label
 * @param {Object} formData - Form data object
 * @param {string} locale - Current locale
 * @returns {string} - Transportation category label
 */
export const getTransportationCategoryLabel = (formData, locale) => {
  if (formData.transport_type === 'public') {
    return locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation';
  } else if (formData.transport_type === 'private') {
    return locale === 'th' ? 'พาหนะส่วนตัว' : 'Private Vehicle';
  } else if (formData.transport_type === 'walking') {
    return locale === 'th' ? 'เดิน' : 'Walking';
  }
  return '';
};

/**
 * Get public transport type label
 * @param {Object} formData - Form data object
 * @param {Array} transportationTypes - Transportation types data
 * @param {string} locale - Current locale
 * @returns {string} - Public transport type label
 */
export const getPublicTransportTypeLabel = (formData, transportationTypes, locale) => {
  if (!formData.public_transport_id) return '';
  
  // Handle "other" option
  if (formData.public_transport_id === '99' || formData.public_transport_id === 99) {
    return formData.public_transport_other || (locale === 'th' ? 'อื่นๆ' : 'Other');
  }
  
  // Find the transport type from the ID
  const publicTransportType = transportationTypes
    ?.filter(type => type.category === 'public')
    ?.find(type => type.id?.toString() === formData.public_transport_id?.toString());
  
  if (publicTransportType) {
    return locale === 'th' ? publicTransportType.name_th : publicTransportType.name_en;
  }
  
  // Fallback for hardcoded options
  const staticOptions = {
    '1': locale === 'th' ? 'รถไฟฟ้า/รถไฟใต้ดิน' : 'Electric Train/Subway',
    '2': locale === 'th' ? 'รถเมล์/รถประจำทาง' : 'Bus',
    '3': locale === 'th' ? 'รถตู้สาธารณะ' : 'Public Van',
    '4': locale === 'th' ? 'เรือโดยสาร' : 'Ferry/Boat',
    '5': locale === 'th' ? 'รถไฟ' : 'Train'
  };
  
  return staticOptions[formData.public_transport_id?.toString()] || '';
};

/**
 * Get private vehicle type label
 * @param {Object} formData - Form data object
 * @param {Array} transportationTypes - Transportation types data
 * @param {string} locale - Current locale
 * @returns {string} - Private vehicle type label
 */
export const getPrivateVehicleTypeLabel = (formData, transportationTypes, locale) => {
  if (!formData.private_vehicle_id) return '';
  
  // Handle "other" option
  if (formData.private_vehicle_id === '99' || formData.private_vehicle_id === 99) {
    return formData.private_vehicle_other || (locale === 'th' ? 'อื่นๆ' : 'Other');
  }
  
  // Find the vehicle type from the ID
  const privateVehicleType = transportationTypes
    ?.filter(type => type.category === 'private')
    ?.find(type => type.id?.toString() === formData.private_vehicle_id?.toString());
  
  if (privateVehicleType) {
    return locale === 'th' ? privateVehicleType.name_th : privateVehicleType.name_en;
  }
  
  // Fallback for hardcoded options
  const staticOptions = {
    '1': locale === 'th' ? 'รถยนต์' : 'Car',
    '2': locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle',
    '3': locale === 'th' ? 'รถจักรยาน' : 'Bicycle'
  };
  
  return staticOptions[formData.private_vehicle_id?.toString()] || '';
};

/**
 * Get fuel type label
 * @param {Object} formData - Form data object
 * @param {string} locale - Current locale
 * @returns {string} - Fuel type label
 */
export const getFuelTypeLabel = (formData, locale) => {
  if (!formData.fuel_type) return '';
  
  // Handle "other" option with ID 99
  if (formData.fuel_type === '99' || formData.fuel_type === 99) {
    return formData.fuel_type_other || (locale === 'th' ? 'อื่นๆ' : 'Other');
  }
  
  // Fuel types with numeric IDs
  const fuelTypes = {
    '1': locale === 'th' ? 'เบนซิน' : 'Gasoline',
    '2': locale === 'th' ? 'ดีเซล' : 'Diesel',
    '3': locale === 'th' ? 'ไฟฟ้า' : 'Electric',
    '4': locale === 'th' ? 'ไฮบริด' : 'Hybrid'
  };
  
  // Try both string and number formats
  return fuelTypes[formData.fuel_type?.toString()] || '';
};

/**
 * Get passenger type label
 * @param {Object} formData - Form data object
 * @param {string} locale - Current locale
 * @returns {string} - Passenger type label
 */
export const getPassengerTypeLabel = (formData, locale) => {
  if (!formData.passenger_type) return '';
  
  // Passenger types with numeric IDs
  const passengerTypes = {
    '1': locale === 'th' ? 'เดินทางคนเดียว' : 'Travel alone',
    '2': locale === 'th' ? 'เดินทางแบบ Carpool' : 'Carpool'
  };
  
  // Try both string and number formats
  return passengerTypes[formData.passenger_type?.toString()] || '';
};

/**
 * Get location type label
 * @param {Object} formData - Form data object
 * @param {string} locale - Current locale
 * @returns {string} - Location type label
 */
export const getLocationTypeLabel = (formData, locale) => {
  if (!formData.location_type) return '';
  
  const locationTypes = {
    'bangkok': locale === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok',
    'province': locale === 'th' ? 'ต่างจังหวัด' : 'Province'
  };
  
  return locationTypes[formData.location_type] || '';
};

/**
 * Get Bangkok district label
 * @param {Object} formData - Form data object
 * @param {Array} bangkokDistricts - Bangkok districts data
 * @param {string} locale - Current locale
 * @returns {string} - Bangkok district label
 */
export const getBangkokDistrictLabel = (formData, bangkokDistricts, locale) => {
  if (!formData.bangkok_district_id) return '';
  
  const district = bangkokDistricts?.find(
    d => d.id.toString() === formData.bangkok_district_id?.toString()
  );
  
  return district ? (locale === 'th' ? district.name_th : district.name_en) : '';
};

/**
 * Get province label
 * @param {Object} formData - Form data object
 * @param {Array} provinces - Provinces data
 * @param {string} locale - Current locale
 * @returns {string} - Province label
 */
export const getProvinceLabel = (formData, provinces, locale) => {
  if (!formData.province_id) return '';
  
  const province = provinces?.find(
    p => p.id.toString() === formData.province_id?.toString()
  );
  
  return province ? (locale === 'th' ? province.name_th : province.name_en) : '';
};
