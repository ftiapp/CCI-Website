'use client';

import { useMemo } from 'react';
import useOrganizationForm from './hooks/useOrganizationForm';
import OrganizationSection from './components/OrganizationSection';
import TravelInfoSection from './components/TravelInfoSection';
import { FIELD_NAMES } from './constants';

/**
 * OrganizationInfoStep Component
 * @param {Object} props - Component props
 * @param {string} props.locale - Current locale
 * @param {Object} props.formData - Form data object
 * @param {Object} props.errors - Form errors object
 * @param {Function} props.handleChange - Form change handler
 * @param {Array} props.organizationTypes - Organization types data
 * @param {Array} props.industryTypes - Industry types data
 * @param {Array} props.bangkokDistricts - Bangkok districts data
 * @param {Array} props.provinces - Provinces data
 */
export default function OrganizationInfoStep({ 
  locale, 
  formData, 
  errors, 
  handleChange,
  handleRadioChange,
  organizationTypes = [],
  industryTypes = [],
  bangkokDistricts = [],
  provinces = []
}) {
  // Use the custom hook for form logic
  const {
    otherOrgType,
    isOtherOrgSelected,
    otherIndustryType,
    isOtherIndustrySelected,
    isOtherPublicTransportSelected,
    isOtherPrivateVehicleSelected,
    isFuelTypeOther,
    handleOtherOrgTypeChange,
    handleOtherIndustryTypeChange,
    handleOtherPublicTransportChange,
    handleOtherPrivateVehicleChange,
    handleOrgTypeChange,
    handleIndustryTypeChange,
    handleLocationTypeChange,
    handleTransportTypeChange,
    handleFuelTypeChange,
    handlePublicTransportChange,
    handlePrivateVehicleChange
  } = useOrganizationForm({ formData, handleChange, locale });

  return (
    <div>
      <OrganizationSection 
        locale={locale}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleOrgTypeChange={handleOrgTypeChange}
        handleIndustryTypeChange={handleIndustryTypeChange}
        organizationTypes={organizationTypes}
        industryTypes={industryTypes}
        otherOrgType={otherOrgType}
        isOtherOrgSelected={isOtherOrgSelected}
        otherIndustryType={otherIndustryType}
        isOtherIndustrySelected={isOtherIndustrySelected}
        handleOtherOrgTypeChange={handleOtherOrgTypeChange}
        handleOtherIndustryTypeChange={handleOtherIndustryTypeChange}
        otherOrgFieldName={FIELD_NAMES.ORGANIZATION_TYPE_OTHER}
        otherIndustryFieldName={FIELD_NAMES.INDUSTRY_TYPE_OTHER}
      />
      
      <TravelInfoSection 
        locale={locale}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleLocationTypeChange={handleLocationTypeChange}
        handleTransportTypeChange={handleTransportTypeChange}
        handlePublicTransportChange={handlePublicTransportChange}
        handlePrivateVehicleChange={handlePrivateVehicleChange}
        handleFuelTypeChange={handleFuelTypeChange}
        handleOtherPublicTransportChange={handleOtherPublicTransportChange}
        handleOtherPrivateVehicleChange={handleOtherPrivateVehicleChange}
        isOtherPublicTransportSelected={isOtherPublicTransportSelected}
        isOtherPrivateVehicleSelected={isOtherPrivateVehicleSelected}
        isFuelTypeOther={isFuelTypeOther}
        bangkokDistricts={bangkokDistricts}
        provinces={provinces}
        otherFieldNames={FIELD_NAMES}
      />
    </div>
  );
}
