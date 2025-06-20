'use client';

import { getTranslations } from '@/i18n';
import useScheduleData from './hooks/useScheduleData';
import ConfirmationHeader from './components/ConfirmationHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import OrganizationInfoSection from './components/OrganizationInfoSection';
import LocationInfoSection from './components/LocationInfoSection';
import TransportationInfoSection from './components/TransportationInfoSection';
import AttendanceInfoSection from './components/AttendanceInfoSection';
import ConsentSection from './components/ConsentSection';

/**
 * ConfirmationStep Component - Main component for the confirmation step
 * @param {Object} props - Component props
 * @param {string} props.locale - Current locale
 * @param {Object} props.formData - Form data object
 * @param {Array} props.organizationTypes - Organization types data
 * @param {Array} props.transportationTypes - Transportation types data
 * @param {Array} props.seminarRooms - Seminar rooms data
 * @param {Array} props.bangkokDistricts - Bangkok districts data
 * @param {Array} props.provinces - Provinces data
 * @param {Object} props.errors - Form errors object
 * @param {Function} props.handleChange - Form change handler
 */
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
  // Get schedule data using custom hook
  const scheduleData = useScheduleData();
  
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <ConfirmationHeader t={t} />
      
      <div className="space-y-6">
        {/* 1. Personal Information */}
        <PersonalInfoSection 
          formData={formData}
          t={t}
          locale={locale}
        />
        
        {/* 2. Organization Information */}
        <OrganizationInfoSection 
          formData={formData}
          organizationTypes={organizationTypes}
          t={t}
          locale={locale}
        />

        {/* 3. Location Information */}
        <LocationInfoSection 
          formData={formData}
          bangkokDistricts={bangkokDistricts}
          provinces={provinces}
          locale={locale}
        />
        
        {/* 4. Transportation Information */}
        <TransportationInfoSection 
          formData={formData}
          transportationTypes={transportationTypes}
          locale={locale}
        />
        
        {/* 5. Attendance Information */}
        <AttendanceInfoSection 
          formData={formData}
          scheduleData={scheduleData}
          seminarRooms={seminarRooms}
          t={t}
          locale={locale}
        />
      </div>
      
      {/* Consent Section */}
      <ConsentSection 
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        locale={locale}
      />
    </div>
  );
}
