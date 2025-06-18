'use client';

import { getTranslations } from '@/i18n';
import { CheckCircleIcon, UserIcon, BuildingOfficeIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

export default function ConfirmationStep({ 
  locale, 
  formData,
  organizationTypes = [],
  transportationTypes = [],
  seminarRooms = [],
  bangkokDistricts = [],
  provinces = [],
  errors,
  handleChange
}) {
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  // Debug: Log form data to console (remove in production)
  console.log('Confirmation Step - Form Data:', formData);
  console.log('Organization Types:', organizationTypes);
  console.log('Transportation Types:', transportationTypes);
  
  // Find selected organization type
  const selectedOrgType = organizationTypes?.find(
    type => type.id.toString() === formData.organizationTypeId?.toString()
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
    
    // Handle "other" option
    if (formData.public_transport_id === '999' || formData.public_transport_id === 999) {
      return formData.public_transport_other || (locale === 'th' ? 'อื่นๆ' : 'Other');
    }
    
    // Find the transport type from the ID
    const publicTransportType = transportationTypes
      ?.filter(type => type.category === 'public')
      ?.find(type => type.id.toString() === formData.public_transport_id.toString());
    
    if (publicTransportType) {
      return locale === 'th' ? publicTransportType.name_th : publicTransportType.name_en;
    }
    
    // Fallback for hardcoded options from OrganizationInfoStep
    const staticOptions = {
      '1': locale === 'th' ? 'รถไฟฟ้า/รถไฟใต้ดิน' : 'Electric Train/Subway',
      '2': locale === 'th' ? 'รถเมล์/รถประจำทาง' : 'Bus',
      '3': locale === 'th' ? 'รถตู้สาธารณะ' : 'Public Van',
      '4': locale === 'th' ? 'เรือโดยสาร' : 'Ferry/Boat',
      '5': locale === 'th' ? 'รถไฟ' : 'Train'
    };
    
    return staticOptions[formData.public_transport_id?.toString()] || '';
  };
  
  // Get private vehicle type label
  const getPrivateVehicleTypeLabel = () => {
    if (!formData.private_vehicle_id) return '';
    
    // Handle "other" option
    if (formData.private_vehicle_id === '999' || formData.private_vehicle_id === 999) {
      return formData.private_vehicle_other || (locale === 'th' ? 'อื่นๆ' : 'Other');
    }
    
    // Find the vehicle type from the ID
    const privateVehicleType = transportationTypes
      ?.filter(type => type.category === 'private')
      ?.find(type => type.id.toString() === formData.private_vehicle_id.toString());
    
    if (privateVehicleType) {
      return locale === 'th' ? privateVehicleType.name_th : privateVehicleType.name_en;
    }
    
    // Fallback for hardcoded options from OrganizationInfoStep
    const staticOptions = {
      '1': locale === 'th' ? 'รถยนต์ส่วนตัว' : 'Personal Car',
      '2': locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle',
      '3': locale === 'th' ? 'แท็กซี่/แกร็บ/อูเบอร์' : 'Taxi/Grab/Uber'
    };
    
    return staticOptions[formData.private_vehicle_id?.toString()] || '';
  };
  
  // Get fuel type label
  const getFuelTypeLabel = () => {
    if (!formData.fuel_type) return '';
    
    if (formData.fuel_type === 'other') {
      return formData.fuel_type_other || (locale === 'th' ? 'อื่นๆ' : 'Other');
    }
    
    const fuelTypes = {
      'gasoline': locale === 'th' ? 'เบนซิน' : 'Gasoline',
      'diesel': locale === 'th' ? 'ดีเซล' : 'Diesel',
      'electric': locale === 'th' ? 'ไฟฟ้า' : 'Electric',
      'hybrid': locale === 'th' ? 'ไฮบริด' : 'Hybrid'
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
    
    const district = bangkokDistricts?.find(
      d => d.id.toString() === formData.bangkok_district_id?.toString()
    );
    
    return district ? (locale === 'th' ? district.name_th : district.name_en) : '';
  };
  
  // Get province label
  const getProvinceLabel = () => {
    if (!formData.province_id) return '';
    
    const province = provinces?.find(
      p => p.id.toString() === formData.province_id?.toString()
    );
    
    return province ? (locale === 'th' ? province.name_th : province.name_en) : '';
  };
  
  // Find selected seminar room (if applicable)
  const selectedRoom = formData.selectedRoomId ? 
    seminarRooms?.find(room => room.id.toString() === formData.selectedRoomId?.toString()) : 
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

  // Component for info item
  const InfoItem = ({ label, value, className = "" }) => {
    const displayValue = value && value.toString().trim() ? value : (locale === 'th' ? 'ไม่ระบุ' : 'Not specified');
    
    return (
      <div className={`group ${className}`}>
        <p className="text-xs font-medium text-earth-600 uppercase tracking-wide mb-1">
          {label}
        </p>
        <p className={`font-medium text-sm leading-relaxed ${
          value && value.toString().trim() ? 'text-earth-900' : 'text-earth-500 italic'
        }`}>
          {displayValue}
        </p>
      </div>
    );
  };

  // Component for section card
  const SectionCard = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-white rounded-xl border border-earth-200 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="px-6 py-4 border-b border-earth-100">
        <h3 className="font-prompt font-semibold text-earth-800 flex items-center text-lg">
          <Icon className="w-5 h-5 mr-3 text-beige-600" />
          {title}
        </h3>
      </div>
      <div className="px-6 py-5">
        {children}
      </div>
    </div>
  );
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircleIcon className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-prompt font-bold text-earth-800 mb-2">
          {t.registration.confirmation}
        </h2>
        <p className="text-earth-600 max-w-2xl mx-auto leading-relaxed">
          {t.registration.confirmationMessage}
        </p>
      </div>
      
      <div className="space-y-6">
        {/* 1. Personal Information */}
        <SectionCard 
          icon={UserIcon} 
          title={t.registration.personalInfo}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem 
              label={t.registration.firstName}
              value={formData.firstName}
            />
            <InfoItem 
              label={t.registration.lastName}
              value={formData.lastName}
            />
            <InfoItem 
              label={t.registration.email}
              value={formData.email}
            />
            <InfoItem 
              label={t.registration.phone}
              value={formData.phone}
            />
          </div>
        </SectionCard>
        
        {/* 2. Organization Information */}
        <SectionCard 
          icon={BuildingOfficeIcon} 
          title={t.registration.organizationInfo}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem 
              label={t.registration.organizationName}
              value={formData.organizationName}
            />
            <InfoItem 
              label={t.registration.organizationType}
              value={selectedOrgType ? 
                (locale === 'th' ? selectedOrgType.name_th : selectedOrgType.name_en) : 
                ''}
            />
          </div>
        </SectionCard>

        {/* 3. Location & Transportation Information */}
        <SectionCard 
          icon={MapPinIcon} 
          title={locale === 'th' ? 'ข้อมูลสถานที่และการเดินทาง' : 'Location & Transportation Information'}
        >
          <div className="space-y-6">
            {/* Location Information */}
            <div>
              <h4 className="font-medium text-earth-800 mb-4 text-base flex items-center">
                <span className="text-lg mr-2">📍</span>
                {locale === 'th' ? 'ข้อมูลสถานที่' : 'Location Information'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem 
                  label={locale === 'th' ? 'เดินทางมาจาก' : 'Traveling from'}
                  value={getLocationTypeLabel()}
                />
                
                {formData.location_type === 'bangkok' && (
                  <InfoItem 
                    label={locale === 'th' ? 'เขต' : 'District'}
                    value={getBangkokDistrictLabel()}
                  />
                )}
                
                {formData.location_type === 'province' && (
                  <InfoItem 
                    label={locale === 'th' ? 'จังหวัด' : 'Province'}
                    value={getProvinceLabel()}
                  />
                )}
              </div>
            </div>
            
            {/* Transportation Information */}
            <div>
              <h4 className="font-medium text-earth-800 mb-4 text-base flex items-center">
                <span className="text-lg mr-2">🚗</span>
                {locale === 'th' ? 'ข้อมูลการเดินทาง' : 'Transportation Information'}
              </h4>
              <div className="space-y-4">
                <InfoItem 
                  label={locale === 'th' ? 'วิธีการเดินทาง' : 'Transportation Method'}
                  value={getTransportationCategoryLabel()}
                />
                
                {formData.transport_type === 'public' && (
                  <div className="grid grid-cols-1 gap-4">
                    <InfoItem 
                      label={locale === 'th' ? 'ประเภทขนส่งมวลชน' : 'Public Transportation Type'}
                      value={getPublicTransportTypeLabel()}
                    />
                  </div>
                )}
                
                {formData.transport_type === 'private' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem 
                      label={locale === 'th' ? 'ประเภทพาหนะ' : 'Vehicle Type'}
                      value={getPrivateVehicleTypeLabel()}
                    />
                    <InfoItem 
                      label={locale === 'th' ? 'ประเภทเชื้อเพลิง' : 'Fuel Type'}
                      value={getFuelTypeLabel()}
                    />
                    <InfoItem 
                      label={locale === 'th' ? 'ประเภทผู้เดินทาง' : 'Passenger Type'}
                      value={getPassengerTypeLabel()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </SectionCard>
        
        {/* 4. Attendance Information */}
        <SectionCard 
          icon={CalendarIcon} 
          title={t.registration.attendanceInfo}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem 
              label={t.registration.attendanceType}
              value={getAttendanceTypeLabel()}
            />
            
            {(formData.attendanceType === 'afternoon' || formData.attendanceType === 'full_day') && selectedRoom && (
              <InfoItem 
                label={t.registration.selectRoom}
                value={locale === 'th' ? selectedRoom.name_th : selectedRoom.name_en}
              />
            )}
          </div>
        </SectionCard>
      </div>
      
      {/* Consent Section */}
      <div className="mt-8 bg-gradient-to-r from-beige-50 to-earth-50 rounded-xl border border-beige-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent || false}
              onChange={(e) => handleChange({
                target: { name: 'consent', value: e.target.checked }
              })}
              className="h-5 w-5 text-beige-600 focus:ring-beige-500 border-earth-300 rounded transition-colors"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="consent" className="text-earth-700 leading-relaxed cursor-pointer">
              {locale === 'th' ? 
                'ข้าพเจ้ายินยอมให้เก็บข้อมูลส่วนบุคคลตาม' : 
                'I consent to the collection of my personal data according to the'}{' '}
              <a href="#" className="text-beige-700 font-medium underline hover:text-beige-800 transition-colors">
                {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
              </a>{' '}
              {locale === 'th' ? 'และยอมรับ' : 'and accept the'}{' '}
              <a href="#" className="text-beige-700 font-medium underline hover:text-beige-800 transition-colors">
                {locale === 'th' ? 'เงื่อนไขการใช้งาน' : 'Terms of Service'}
              </a>
            </label>
            {errors.consent && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.consent}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}