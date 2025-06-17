'use client';

import { getTranslations } from '@/i18n';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function ConfirmationStep({ 
  locale, 
  formData,
  organizationTypes,
  transportationTypes,
  seminarRooms,
  bangkokDistricts,
  provinces,
  errors,
  handleChange
}) {
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  // Find selected organization type
  const selectedOrgType = organizationTypes.find(
    type => type.id.toString() === formData.organizationTypeId
  );
  
  // Get transportation category label
  const getTransportationCategoryLabel = () => {
    if (formData.transport_type === 'public') {
      return locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation';
    } else if (formData.transport_type === 'private') {
      return locale === 'th' ? 'พาหนะส่วนตัว' : 'Private Vehicle';
    } else if (formData.transport_type === 'walking') {
      return locale === 'th' ? 'เดิน' : 'Walking';
    }
    return '';
  };
  
  // Get public transport type label
  const getPublicTransportTypeLabel = () => {
    if (!formData.public_transport_id) return '';
    
    // Find the transport type from the ID
    const publicTransportType = transportationTypes
      .filter(type => type.category === 'public')
      .find(type => type.id.toString() === formData.public_transport_id);
    
    if (publicTransportType) {
      return locale === 'th' ? publicTransportType.name_th : publicTransportType.name_en;
    } else if (formData.public_transport_id === '999' && formData.public_transport_other) {
      return formData.public_transport_other;
    }
    
    return locale === 'th' ? 'อื่นๆ' : 'Other';
  };
  
  // Get private vehicle type label
  const getPrivateVehicleTypeLabel = () => {
    if (!formData.private_vehicle_id) return '';
    
    // Find the vehicle type from the ID
    const privateVehicleType = transportationTypes
      .filter(type => type.category === 'private')
      .find(type => type.id.toString() === formData.private_vehicle_id);
    
    if (privateVehicleType) {
      return locale === 'th' ? privateVehicleType.name_th : privateVehicleType.name_en;
    } else if (formData.private_vehicle_id === '999' && formData.private_vehicle_other) {
      return formData.private_vehicle_other;
    }
    
    return locale === 'th' ? 'อื่นๆ' : 'Other';
  };
  
  // Get fuel type label
  const getFuelTypeLabel = () => {
    if (!formData.fuel_type) return '';
    
    const fuelTypes = {
      'gasoline': locale === 'th' ? 'เบนซิน' : 'Gasoline',
      'diesel': locale === 'th' ? 'ดีเซล' : 'Diesel',
      'electric': locale === 'th' ? 'ไฟฟ้า' : 'Electric',
      'hybrid': locale === 'th' ? 'ไฮบริด' : 'Hybrid',
      'other': formData.fuel_type_other || (locale === 'th' ? 'อื่นๆ' : 'Other')
    };
    
    return fuelTypes[formData.fuel_type] || '';
  };
  
  // Get passenger type label
  const getPassengerTypeLabel = () => {
    if (!formData.passenger_type) return '';
    
    const passengerTypes = {
      'driver': locale === 'th' ? 'ผู้ขับ' : 'Driver',
      'passenger': locale === 'th' ? 'ผู้โดยสาร' : 'Passenger'
    };
    
    return passengerTypes[formData.passenger_type] || '';
  };
  
  // Get location type label
  const getLocationTypeLabel = () => {
    if (!formData.location_type) return '';
    
    const locationTypes = {
      'bangkok': locale === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok',
      'province': locale === 'th' ? 'ต่างจังหวัด' : 'Province'
    };
    
    return locationTypes[formData.location_type] || '';
  };
  
  // Get Bangkok district label
  const getBangkokDistrictLabel = () => {
    if (!formData.bangkok_district_id) return '';
    
    const district = bangkokDistricts.find(
      d => d.id.toString() === formData.bangkok_district_id
    );
    
    return district ? (locale === 'th' ? district.name_th : district.name_en) : '';
  };
  
  // Get province label
  const getProvinceLabel = () => {
    if (!formData.province_id) return '';
    
    const province = provinces.find(
      p => p.id.toString() === formData.province_id
    );
    
    return province ? (locale === 'th' ? province.name_th : province.name_en) : '';
  };
  
  // Find selected seminar room (if applicable)
  const selectedRoom = formData.selectedRoomId ? 
    seminarRooms.find(room => room.id.toString() === formData.selectedRoomId) : 
    null;
  
  // Get attendance type label
  const getAttendanceTypeLabel = () => {
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
  };
  
  return (
    <div>
      <h2 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
        <CheckCircleIcon className="w-5 h-5 mr-2 text-beige-600" />
        {t.registration.confirmation}
      </h2>
      
      <p className="text-earth-700 mb-6">
        {t.registration.confirmationMessage}
      </p>
      
      <div className="bg-earth-50 rounded-lg p-6 border border-earth-200">
        <h3 className="font-prompt font-medium text-earth-800 mb-4">
          {t.registration.personalInfo}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-earth-600">{t.registration.firstName}</p>
            <p className="font-medium text-earth-800">{formData.firstName}</p>
          </div>
          
          <div>
            <p className="text-sm text-earth-600">{t.registration.lastName}</p>
            <p className="font-medium text-earth-800">{formData.lastName}</p>
          </div>
          
          <div>
            <p className="text-sm text-earth-600">{t.registration.email}</p>
            <p className="font-medium text-earth-800">{formData.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-earth-600">{t.registration.phone}</p>
            <p className="font-medium text-earth-800">{formData.phone}</p>
          </div>
        </div>
        
        <h3 className="font-prompt font-medium text-earth-800 mb-4">
          {t.registration.organizationInfo}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-earth-600">{t.registration.organizationName}</p>
            <p className="font-medium text-earth-800">{formData.organizationName}</p>
          </div>
          
          <div>
            <p className="text-sm text-earth-600">{t.registration.organizationType}</p>
            <p className="font-medium text-earth-800">
              {selectedOrgType ? 
                (locale === 'th' ? selectedOrgType.name_th : selectedOrgType.name_en) : 
                ''}
            </p>
          </div>
          
          <div className="col-span-2">
            <p className="text-sm text-earth-600">{locale === 'th' ? 'เดินทางมาจาก' : 'Traveling from'}</p>
            <p className="font-medium text-earth-800">{getLocationTypeLabel()}</p>
            
            {formData.location_type === 'bangkok' && (
              <div className="mt-2 pl-4 border-l-2 border-beige-200 mb-4">
                <p className="text-sm text-earth-600">{locale === 'th' ? 'เขต' : 'District'}</p>
                <p className="font-medium text-earth-800">{getBangkokDistrictLabel()}</p>
              </div>
            )}
            
            {formData.location_type === 'province' && (
              <div className="mt-2 pl-4 border-l-2 border-beige-200 mb-4">
                <p className="text-sm text-earth-600">{locale === 'th' ? 'จังหวัด' : 'Province'}</p>
                <p className="font-medium text-earth-800">{getProvinceLabel()}</p>
              </div>
            )}
          </div>
          
          <div className="col-span-2">
            <p className="text-sm text-earth-600">{locale === 'th' ? 'วิธีการเดินทาง' : 'Transportation Method'}</p>
            <p className="font-medium text-earth-800">{getTransportationCategoryLabel()}</p>
            
            {formData.transport_type === 'public' && (
              <div className="mt-2 pl-4 border-l-2 border-beige-200">
                <p className="text-sm text-earth-600">{locale === 'th' ? 'ประเภทขนส่งมวลชน' : 'Public Transportation Type'}</p>
                <p className="font-medium text-earth-800">{getPublicTransportTypeLabel()}</p>
              </div>
            )}
            
            {formData.transport_type === 'private' && (
              <div className="mt-2 pl-4 border-l-2 border-beige-200">
                <div className="mb-2">
                  <p className="text-sm text-earth-600">{locale === 'th' ? 'ประเภทพาหนะ' : 'Vehicle Type'}</p>
                  <p className="font-medium text-earth-800">{getPrivateVehicleTypeLabel()}</p>
                </div>
                
                <div className="mb-2">
                  <p className="text-sm text-earth-600">{locale === 'th' ? 'ประเภทเชื้อเพลิง' : 'Fuel Type'}</p>
                  <p className="font-medium text-earth-800">{getFuelTypeLabel()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-earth-600">{locale === 'th' ? 'ประเภทผู้เดินทาง' : 'Passenger Type'}</p>
                  <p className="font-medium text-earth-800">{getPassengerTypeLabel()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <h3 className="font-prompt font-medium text-earth-800 mb-4">
          {t.registration.attendanceInfo}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-earth-600">{t.registration.attendanceType}</p>
            <p className="font-medium text-earth-800">{getAttendanceTypeLabel()}</p>
          </div>
          
          {(formData.attendanceType === 'afternoon' || formData.attendanceType === 'full_day') && selectedRoom && (
            <div>
              <p className="text-sm text-earth-600">{t.registration.selectRoom}</p>
              <p className="font-medium text-earth-800">
                {locale === 'th' ? selectedRoom.name_th : selectedRoom.name_en}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 border-t border-earth-200 pt-6">
        <div className="flex items-start mb-4">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent || false}
            onChange={(e) => handleChange({
              target: { name: 'consent', value: e.target.checked }
            })}
            className="mt-1 h-4 w-4 text-beige-600 focus:ring-beige-500 border-earth-300 rounded"
          />
          <label htmlFor="consent" className="ml-3 text-sm text-earth-700">
            {locale === 'th' ? 
              'ข้าพเจ้ายินยอมให้เก็บข้อมูลส่วนบุคคลตาม' : 
              'I consent to the collection of my personal data according to the'} <a href="#" className="text-beige-700 underline hover:text-beige-800">{locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</a> {locale === 'th' ? 'และยอมรับ' : 'and accept the'} <a href="#" className="text-beige-700 underline hover:text-beige-800">{locale === 'th' ? 'เงื่อนไขการใช้งาน' : 'Terms of Service'}</a>
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-600 text-sm mt-1">{errors.consent}</p>
        )}
      </div>
    </div>
  );
}
