'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';
import { FORM_CONSTANTS } from '../constants';
import LocationSection from './LocationSection';
import TransportTypeSection from './TransportTypeSection';
import PublicTransportSection from './PublicTransportSection';
import PrivateVehicleSection from './PrivateVehicleSection';

/**
 * Travel Information Section Component
 */
export default function TravelInfoSection({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handleLocationTypeChange,
  handleTransportTypeChange,
  handlePublicTransportChange,
  handlePrivateVehicleChange,
  handleFuelTypeChange,
  handleOtherPublicTransportChange,
  handleOtherPrivateVehicleChange,
  isOtherPublicTransportSelected,
  isOtherPrivateVehicleSelected,
  isFuelTypeOther,
  bangkokDistricts,
  provinces,
  otherFieldNames
}) {
  return (
    <div className="mt-8 mb-4">
      <h2 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
        <MapPinIcon className="w-5 h-5 mr-2 text-beige-600" />
        {locale === 'th' ? 'ข้อมูลการเดินทาง' : 'Travel Information'}
      </h2>
      
      <LocationSection 
        locale={locale}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleLocationTypeChange={handleLocationTypeChange}
        bangkokDistricts={bangkokDistricts}
        provinces={provinces}
      />
      
      <div className="mt-6">
        <TransportTypeSection 
          locale={locale}
          formData={formData}
          errors={errors}
          handleTransportTypeChange={handleTransportTypeChange}
        />
      </div>
      
      {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC && (
        <PublicTransportSection 
          locale={locale}
          formData={formData}
          errors={errors}
          handlePublicTransportChange={handlePublicTransportChange}
          isOtherPublicTransportSelected={isOtherPublicTransportSelected}
          handleOtherPublicTransportChange={handleOtherPublicTransportChange}
          otherFieldName={otherFieldNames.PUBLIC_TRANSPORT_OTHER}
        />
      )}
      
      {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE && (
        <PrivateVehicleSection 
          locale={locale}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handlePrivateVehicleChange={handlePrivateVehicleChange}
          isOtherPrivateVehicleSelected={isOtherPrivateVehicleSelected}
          handleOtherPrivateVehicleChange={handleOtherPrivateVehicleChange}
          handleFuelTypeChange={handleFuelTypeChange}
          isFuelTypeOther={isFuelTypeOther}
        />
      )}
      
      <div className="mt-6 p-4 bg-beige-50 border border-beige-200 rounded-md">
        <p className="text-sm text-earth-800">
          {locale === 'th' ? (
            <>
              สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย ขอเชิญชวนท่านร่วมลดการปล่อยคาร์บอนด้วยการเดินทางมาร่วมงานโดยระบบ<span className="font-bold">ขนส่งมวลชน</span>/<span className="font-bold">การเดินเท้า</span> ผู้เข้าร่วมที่แสดงหลักฐานการเดินทางด้วยวิธีดังกล่าวจะได้รับของที่ระลึกพิเศษจากทางสถาบันฯ (จำนวนจำกัด)
            </>
          ) : (
            <>
              The Climate Change Institute (CCI) of the Federation of Thai Industries invites you to help reduce carbon emissions by traveling to the event using <span className="font-bold">public transportation</span>/<span className="font-bold">walking</span>. Participants who show proof of travel by these methods will receive a special souvenir from the institute (limited quantities).
            </>
          )}
        </p>
      </div>
    </div>
  );
}
