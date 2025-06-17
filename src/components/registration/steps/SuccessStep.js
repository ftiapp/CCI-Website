'use client';

import { getTranslations } from '@/i18n';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function SuccessStep({ 
  locale, 
  registrationId,
  formData,
  organizationTypes,
  transportationTypes,
  seminarRooms
}) {
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  // Find selected organization type
  const selectedOrgType = organizationTypes.find(
    type => type.id.toString() === formData.organizationTypeId
  );
  
  // Get transportation category label
  const getTransportationCategoryLabel = () => {
    if (formData.transportation_category === 'public') {
      return locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation';
    } else if (formData.transportation_category === 'private') {
      return locale === 'th' ? 'รถยนต์ส่วนตัว' : 'Private Car';
    }
    return '';
  };
  
  // Get public transport type label
  const getPublicTransportTypeLabel = () => {
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
  };
  
  // Get car type label
  const getCarTypeLabel = () => {
    if (!formData.car_type) return '';
    
    const carTypes = {
      'gasoline': locale === 'th' ? 'เบนซิน' : 'Gasoline',
      'diesel': locale === 'th' ? 'ดีเซล' : 'Diesel',
      'electric': locale === 'th' ? 'ไฟฟ้า' : 'Electric',
      'hybrid': locale === 'th' ? 'ไฮบริด' : 'Hybrid',
      'other': formData.car_type_other || (locale === 'th' ? 'อื่นๆ' : 'Other')
    };
    
    return carTypes[formData.car_type] || '';
  };
  
  // Get passenger type label
  const getPassengerTypeLabel = () => {
    if (!formData.car_passenger_type) return '';
    
    const passengerTypes = {
      'driver': locale === 'th' ? 'ผู้ขับ' : 'Driver',
      'passenger': locale === 'th' ? 'ผู้โดยสาร' : 'Passenger'
    };
    
    return passengerTypes[formData.car_passenger_type] || '';
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
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-prompt font-bold text-earth-900 mb-2">
        {t.registration.registrationSuccess}
      </h2>
      
      <p className="text-earth-700 mb-8">
        {t.registration.thankYou}
      </p>
      
      <div className="bg-earth-50 rounded-lg p-6 border border-earth-200 mb-8 text-left">
        <div className="mb-6">
          <p className="text-sm text-earth-600">{t.registration.registrationId}</p>
          <p className="text-xl font-prompt font-bold text-beige-700">{registrationId}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-earth-600">{t.registration.firstName}</p>
            <p className="font-medium text-earth-800">{formData.firstName}</p>
          </div>
          
          <div>
            <p className="text-sm text-earth-600">{t.registration.lastName}</p>
            <p className="font-medium text-earth-800">{formData.lastName}</p>
          </div>
          
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
          
          <div className="col-span-2 mt-2">
            <p className="text-sm text-earth-600">{locale === 'th' ? 'วิธีการเดินทาง' : 'Transportation Method'}</p>
            <p className="font-medium text-earth-800">{getTransportationCategoryLabel()}</p>
            
            {formData.transportation_category === 'public' && (
              <div className="mt-1 pl-4 border-l-2 border-beige-200">
                <p className="text-sm text-earth-600">{locale === 'th' ? 'ประเภทขนส่งมวลชน' : 'Public Transportation Type'}</p>
                <p className="font-medium text-earth-800">{getPublicTransportTypeLabel()}</p>
              </div>
            )}
            
            {formData.transportation_category === 'private' && (
              <div className="mt-1 pl-4 border-l-2 border-beige-200">
                <div className="mb-1">
                  <p className="text-sm text-earth-600">{locale === 'th' ? 'ประเภทรถ' : 'Car Type'}</p>
                  <p className="font-medium text-earth-800">{getCarTypeLabel()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-earth-600">{locale === 'th' ? 'ประเภทผู้เดินทาง' : 'Passenger Type'}</p>
                  <p className="font-medium text-earth-800">{getPassengerTypeLabel()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link href={`/${locale}/schedule`}>
          <Button variant="outline" className="mr-4">
            {t.schedule.title}
          </Button>
        </Link>
        
        <Link href={`/${locale}`}>
          <Button>
            {t.nav.home}
          </Button>
        </Link>
      </div>
    </div>
  );
}
