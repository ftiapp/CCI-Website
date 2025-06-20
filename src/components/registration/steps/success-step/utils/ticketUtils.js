/ src/components/registration/steps/success-step/utils/ticketUtils.js

// Find selected organization type
export function getSelectedOrganizationType(organizationTypes, formData) {
  return organizationTypes.find(
    type => type.id.toString() === formData.organizationTypeId
  );
}

// Get transportation category label
export function getTransportationCategoryLabel(formData, locale) {
  if (formData.transportation_category === 'public') {
    return locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation';
  } else if (formData.transportation_category === 'private') {
    return locale === 'th' ? 'รถยนต์ส่วนตัว' : 'Private Car';
  }
  return '';
}

// Get public transport type label
export function getPublicTransportTypeLabel(formData, locale) {
  if (!formData.public_transport_type) return '';
  
  const transportTypes = {
    'bts_mrt': locale === 'th' ? 'รถไฟฟ้า' : 'BTS/MRT',
    'car': locale === 'th' ? 'รถยนต์' : 'Car',
    'van': locale === 'th' ? 'รถตู้' : 'Van',
    'bus': locale === 'th' ? 'รถเมล์' : 'Bus',
    'motorcycle': locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle',
    'other': formData.public_transport_other || (locale === 'th' ? 'อื่นๆ' : 'Other')
  };
  
  return transportTypes[formData.public_transport_type] || '';
}

// Get car type label
export function getCarTypeLabel(formData, locale) {
  if (!formData.car_type) return '';
  
  const carTypes = {
    'gasoline': locale === 'th' ? 'เบนซิน' : 'Gasoline',
    'diesel': locale === 'th' ? 'ดีเซล' : 'Diesel',
    'electric': locale === 'th' ? 'ไฟฟ้า' : 'Electric',
    'hybrid': locale === 'th' ? 'ไฮบริด' : 'Hybrid',
    'other': formData.car_type_other || (locale === 'th' ? 'อื่นๆ' : 'Other')
  };
  
  return carTypes[formData.car_type] || '';
}

// Get passenger type label
export function getPassengerTypeLabel(formData, locale) {
  if (!formData.car_passenger_type) return '';
  
  const passengerTypes = {
    'driver': locale === 'th' ? 'ผู้ขับ' : 'Driver',
    'passenger': locale === 'th' ? 'ผู้โดยสาร' : 'Passenger'
  };
  
  return passengerTypes[formData.car_passenger_type] || '';
}

// Find selected seminar room
export function getSelectedSeminarRoom(seminarRooms, formData) {
  return formData.selectedRoomId ? 
    seminarRooms.find(room => room.id.toString() === formData.selectedRoomId) : 
    null;
}

// Get attendance type label
export function getAttendanceTypeLabel(formData, t) {
  switch (formData.attendanceType) {
    case 'morning':
      return t.registration.attendanceMorning;
    case 'afternoon':
      return t.registration.attendanceAfternoon;
    case 'full_day':
      return t.registration.attendanceFullDay;
    default:
      return '';
  }
}