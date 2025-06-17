'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { getTranslations } from '@/i18n';
import Input from '@/components/ui/Input';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import RadioGroup from '@/components/ui/RadioGroup';

// Constants
const FORM_CONSTANTS = {
  OTHER_OPTION_ID: 999,
  LOCATION_TYPES: {
    BANGKOK: 'bangkok',
    PROVINCE: 'province'
  },
  TRANSPORT_TYPES: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    WALKING: 'walking'
  },
  FUEL_TYPES: {
    OTHER: 'other'
  }
};

const FIELD_NAMES = {
  ORGANIZATION_TYPE_OTHER: 'organization_type_other',
  PUBLIC_TRANSPORT_OTHER: 'public_transport_other',
  PRIVATE_VEHICLE_OTHER: 'private_vehicle_other',
  FUEL_TYPE_OTHER: 'fuel_type_other'
};

/**
 * OrganizationInfoStep Component
 * @param {Object} props - Component props
 * @param {string} props.locale - Current locale
 * @param {Object} props.formData - Form data object
 * @param {Object} props.errors - Form errors object
 * @param {Function} props.handleChange - Form change handler
 * @param {Array} props.organizationTypes - Organization types data
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
  bangkokDistricts = [],
  provinces = []
}) {
  const t = getTranslations(locale || 'th');
  const [otherOrgType, setOtherOrgType] = useState('');
  
  // Memoized computed values
  const isOtherOrgSelected = useMemo(() => 
    formData.organizationTypeId === FORM_CONSTANTS.OTHER_OPTION_ID, 
    [formData.organizationTypeId]
  );

  const isOtherPublicTransportSelected = useMemo(() => 
    formData.public_transport_id === FORM_CONSTANTS.OTHER_OPTION_ID, 
    [formData.public_transport_id]
  );

  const isOtherPrivateVehicleSelected = useMemo(() => 
    formData.private_vehicle_id === FORM_CONSTANTS.OTHER_OPTION_ID, 
    [formData.private_vehicle_id]
  );

  const isFuelTypeOther = useMemo(() => 
    formData.fuel_type === FORM_CONSTANTS.FUEL_TYPES.OTHER, 
    [formData.fuel_type]
  );

  // Helper function to update form field
  const updateFormField = useCallback((name, value) => {
    handleChange({
      target: { name, value }
    });
  }, [handleChange]);

  // Helper function to clear multiple form fields
  const clearFormFields = useCallback((fieldNames) => {
    fieldNames.forEach(fieldName => {
      if (formData[fieldName]) {
        updateFormField(fieldName, '');
      }
    });
  }, [formData, updateFormField]);

  // Generic handler for "other" input changes
  const createOtherChangeHandler = useCallback((fieldName, setLocalState) => {
    return (e) => {
      const value = e.target ? e.target.value : e;
      if (setLocalState) setLocalState(value);
      updateFormField(fieldName, value);
    };
  }, [updateFormField]);

  // Specific handlers using the generic function
  const handleOtherOrgTypeChange = useMemo(() => 
    createOtherChangeHandler(FIELD_NAMES.ORGANIZATION_TYPE_OTHER, setOtherOrgType), 
    [createOtherChangeHandler]
  );

  const handleOtherPublicTransportChange = useMemo(() => 
    createOtherChangeHandler(FIELD_NAMES.PUBLIC_TRANSPORT_OTHER), 
    [createOtherChangeHandler]
  );

  const handleOtherPrivateVehicleChange = useMemo(() => 
    createOtherChangeHandler(FIELD_NAMES.PRIVATE_VEHICLE_OTHER), 
    [createOtherChangeHandler]
  );

  // Organization type change handler
  const handleOrgTypeChange = useCallback((e) => {
    handleChange(e);
    
    const { value } = e.target;
    if (parseInt(value) !== FORM_CONSTANTS.OTHER_OPTION_ID) {
      clearFormFields([FIELD_NAMES.ORGANIZATION_TYPE_OTHER]);
      setOtherOrgType('');
    }
  }, [handleChange, clearFormFields]);

  // Location type change handler
  const handleLocationTypeChange = useCallback((e) => {
    const { value } = e.target;
    handleChange(e);
    
    const fieldsToCheck = {
      [FORM_CONSTANTS.LOCATION_TYPES.BANGKOK]: ['province_id'],
      [FORM_CONSTANTS.LOCATION_TYPES.PROVINCE]: ['bangkok_district_id']
    };
    
    const fieldsToClear = fieldsToCheck[value] || [];
    clearFormFields(fieldsToClear);
  }, [handleChange, clearFormFields]);

  // Transport type change handler
  const handleTransportTypeChange = useCallback((e) => {
    const { value } = e.target;
    handleChange(e);
    
    const fieldsToCheck = {
      [FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC]: [
        'private_vehicle_id', 'private_vehicle_other', 'fuel_type', 
        'fuel_type_other', 'passenger_type'
      ],
      [FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE]: [
        'public_transport_id', 'public_transport_other'
      ],
      [FORM_CONSTANTS.TRANSPORT_TYPES.WALKING]: [
        'public_transport_id', 'public_transport_other',
        'private_vehicle_id', 'private_vehicle_other', 'fuel_type', 
        'fuel_type_other', 'passenger_type'
      ]
    };
    
    const allFieldsToClear = Object.values(fieldsToCheck).flat();
    const currentFieldsToClear = fieldsToCheck[value] || [];
    
    // Clear fields that are not relevant to the selected transport type
    const fieldsToClear = allFieldsToClear.filter(field => 
      !currentFieldsToClear.includes(field) || 
      (value !== FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC && field.includes('public')) ||
      (value !== FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE && field.includes('private'))
    );
    
    clearFormFields(fieldsToClear);
  }, [handleChange, clearFormFields]);

  // Fuel type change handler
  const handleFuelTypeChange = useCallback((e) => {
    const { value } = e.target;
    handleChange(e);
    
    if (value !== FORM_CONSTANTS.FUEL_TYPES.OTHER) {
      clearFormFields([FIELD_NAMES.FUEL_TYPE_OTHER]);
    }
  }, [handleChange, clearFormFields]);

  // Generic handler for transport options with "other" clearing
  const createTransportChangeHandler = useCallback((otherFieldName) => {
    return (e) => {
      const { value } = e.target;
      handleChange(e);
      
      if (parseInt(value) !== FORM_CONSTANTS.OTHER_OPTION_ID) {
        clearFormFields([otherFieldName]);
      }
    };
  }, [handleChange, clearFormFields]);

  const handlePublicTransportChange = useMemo(() => 
    createTransportChangeHandler(FIELD_NAMES.PUBLIC_TRANSPORT_OTHER), 
    [createTransportChangeHandler]
  );

  const handlePrivateVehicleChange = useMemo(() => 
    createTransportChangeHandler(FIELD_NAMES.PRIVATE_VEHICLE_OTHER), 
    [createTransportChangeHandler]
  );

  // Options generators
  const createSelectOptions = useCallback((items, localeKey = 'name') => {
    return items.map(item => ({
      value: item.id,
      label: locale === 'th' ? item[`${localeKey}_th`] : item[`${localeKey}_en`]
    }));
  }, [locale]);

  const createOptionsWithOther = useCallback((baseOptions, otherText) => {
    return [
      ...baseOptions,
      {
        value: FORM_CONSTANTS.OTHER_OPTION_ID,
        label: locale === 'th' ? `อื่นๆ (${otherText})` : `Others (${otherText})`
      }
    ];
  }, [locale]);

  // Memoized options
  const orgTypeOptions = useMemo(() => {
    const baseOptions = createSelectOptions(organizationTypes, 'name');
    return createOptionsWithOther(baseOptions, locale === 'th' ? 'โปรดระบุ' : 'Please specify');
  }, [organizationTypes, createSelectOptions, createOptionsWithOther, locale]);

  const bangkokOptions = useMemo(() => 
    createSelectOptions(bangkokDistricts, 'name'), 
    [bangkokDistricts, createSelectOptions]
  );

  const provinceOptions = useMemo(() => 
    createSelectOptions(provinces, 'name'), 
    [provinces, createSelectOptions]
  );

  // Static options with memoization
  const locationTypeOptions = useMemo(() => [
    { 
      value: FORM_CONSTANTS.LOCATION_TYPES.BANGKOK, 
      label: locale === 'th' ? 'กรุงเทพฯ' : 'Bangkok' 
    },
    { 
      value: FORM_CONSTANTS.LOCATION_TYPES.PROVINCE, 
      label: locale === 'th' ? 'ต่างจังหวัด' : 'Other Province' 
    }
  ], [locale]);

  const transportTypeOptions = useMemo(() => [
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
  ], [locale]);

  const publicTransportOptions = useMemo(() => createOptionsWithOther([
    { value: 1, label: locale === 'th' ? 'รถไฟฟ้า/รถไฟใต้ดิน' : 'Electric Train/Subway' },
    { value: 2, label: locale === 'th' ? 'รถเมล์/รถประจำทาง' : 'Bus' },
    { value: 3, label: locale === 'th' ? 'รถตู้สาธารณะ' : 'Public Van' },
    { value: 4, label: locale === 'th' ? 'เรือโดยสาร' : 'Ferry/Boat' },
    { value: 5, label: locale === 'th' ? 'รถไฟ' : 'Train' }
  ], locale === 'th' ? 'โปรดระบุ' : 'Please specify'), [createOptionsWithOther, locale]);

  const privateVehicleOptions = useMemo(() => createOptionsWithOther([
    { value: 1, label: locale === 'th' ? 'รถยนต์ส่วนตัว' : 'Personal Car' },
    { value: 2, label: locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle' },
    { value: 3, label: locale === 'th' ? 'แท็กซี่/แกร็บ/อูเบอร์' : 'Taxi/Grab/Uber' }
  ], locale === 'th' ? 'โปรดระบุ' : 'Please specify'), [createOptionsWithOther, locale]);

  const fuelTypeOptions = useMemo(() => [
    { value: 'gasoline', label: locale === 'th' ? 'เบนซิน' : 'Gasoline' },
    { value: 'diesel', label: locale === 'th' ? 'ดีเซล' : 'Diesel' },
    { value: 'electric', label: locale === 'th' ? 'ไฟฟ้า' : 'Electric' },
    { value: 'hybrid', label: locale === 'th' ? 'ไฮบริด' : 'Hybrid' },
    { value: FORM_CONSTANTS.FUEL_TYPES.OTHER, label: locale === 'th' ? 'อื่นๆ (โปรดระบุ)' : 'Others (Please specify)' }
  ], [locale]);

  const passengerTypeOptions = useMemo(() => [
    { value: 'driver', label: locale === 'th' ? 'ผู้ขับ' : 'Driver' },
    { value: 'passenger', label: locale === 'th' ? 'ผู้โดยสาร' : 'Passenger' }
  ], [locale]);

  // Initialize other value from form data
  useEffect(() => {
    if (formData.organization_type_other) {
      setOtherOrgType(formData.organization_type_other);
    }
  }, [formData.organization_type_other]);

  return (
    <div>
      <h2 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
        <BuildingOfficeIcon className="w-5 h-5 mr-2 text-beige-600" />
        {t.registration.organizationInfo}
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {t.registration.organizationName} <span className="text-red-500">*</span>
        </label>
        <Input
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder={locale === 'th' ? 'ชื่อองค์กร' : 'Organization Name'}
          required
          error={errors.organizationName}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-earth-700 mb-1">
          {locale === 'th' ? 'ประเภทองค์กร' : 'Organization Type'} <span className="text-red-500">*</span>
        </label>
        <SearchableSelect
          name="organizationTypeId"
          value={formData.organizationTypeId}
          onChange={handleOrgTypeChange}
          options={orgTypeOptions}
          placeholder={locale === 'th' ? 'เลือกประเภทองค์กร' : 'Select Organization Type'}
          required
          error={errors.organizationTypeId}
          allowOther={isOtherOrgSelected}
          otherValue={otherOrgType}
          otherName={FIELD_NAMES.ORGANIZATION_TYPE_OTHER}
          onOtherChange={handleOtherOrgTypeChange}
        />
      </div>
      
      <div className="mt-8 mb-4">
        <h2 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
          <MapPinIcon className="w-5 h-5 mr-2 text-beige-600" />
          {locale === 'th' ? 'ข้อมูลการเดินทาง' : 'Travel Information'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-earth-700 mb-1">
            {locale === 'th' ? 'เดินทางจาก' : 'Traveling from'} <span className="text-red-500">*</span>
          </label>
          
          <RadioGroup
            name="location_type"
            options={locationTypeOptions}
            value={formData.location_type}
            onChange={handleLocationTypeChange}
            required
            error={errors.location_type}
          />
        </div>
        
        {formData.location_type === FORM_CONSTANTS.LOCATION_TYPES.BANGKOK && (
          <SearchableSelect
            label={locale === 'th' ? 'เขต' : 'District'}
            name="bangkok_district_id"
            value={formData.bangkok_district_id}
            onChange={handleChange}
            options={bangkokOptions}
            placeholder={locale === 'th' ? 'เลือกเขต' : 'Select District'}
            required
            error={errors.bangkok_district_id}
            className="mb-4"
          />
        )}
        
        {formData.location_type === FORM_CONSTANTS.LOCATION_TYPES.PROVINCE && (
          <SearchableSelect
            label={locale === 'th' ? 'จังหวัด' : 'Province'}
            name="province_id"
            value={formData.province_id}
            onChange={handleChange}
            options={provinceOptions}
            placeholder={locale === 'th' ? 'เลือกจังหวัด' : 'Select Province'}
            required
            error={errors.province_id}
            className="mb-4"
          />
        )}
        
        <div className="mb-4 mt-6">
          <label className="block text-sm font-medium text-earth-700 mb-1">
            {locale === 'th' ? 'ใช้พาหนะอะไรเป็นหลัก' : 'Main transportation method'} <span className="text-red-500">*</span>
          </label>
          
          <RadioGroup
            name="transport_type"
            options={transportTypeOptions}
            value={formData.transport_type}
            onChange={handleTransportTypeChange}
            required
            error={errors.transport_type}
          />
        </div>
        
        {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PUBLIC && (
          <div className="ml-6 mb-4">
            <SearchableSelect
              label={locale === 'th' ? 'ประเภทขนส่งมวลชน' : 'Public Transportation Type'}
              name="public_transport_id"
              value={formData.public_transport_id}
              onChange={handlePublicTransportChange}
              options={publicTransportOptions}
              placeholder={locale === 'th' ? 'เลือกประเภทขนส่งมวลชน' : 'Select Public Transportation Type'}
              required
              error={errors.public_transport_id}
              className="mb-4"
              allowOther={isOtherPublicTransportSelected}
              otherValue={formData.public_transport_other || ''}
              otherName={FIELD_NAMES.PUBLIC_TRANSPORT_OTHER}
              onOtherChange={handleOtherPublicTransportChange}
            />
          </div>
        )}
        
        {formData.transport_type === FORM_CONSTANTS.TRANSPORT_TYPES.PRIVATE && (
          <div className="ml-6">
            <SearchableSelect
              label={locale === 'th' ? 'ประเภทพาหนะส่วนตัว' : 'Private Vehicle Type'}
              name="private_vehicle_id"
              value={formData.private_vehicle_id}
              onChange={handlePrivateVehicleChange}
              options={privateVehicleOptions}
              placeholder={locale === 'th' ? 'เลือกประเภทพาหนะส่วนตัว' : 'Select Private Vehicle Type'}
              required
              error={errors.private_vehicle_id}
              className="mb-4"
              allowOther={isOtherPrivateVehicleSelected}
              otherValue={formData.private_vehicle_other || ''}
              otherName={FIELD_NAMES.PRIVATE_VEHICLE_OTHER}
              onOtherChange={handleOtherPrivateVehicleChange}
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-earth-700 mb-1">
                {locale === 'th' ? 'ประเภทเชื้อเพลิง' : 'Fuel Type'} <span className="text-red-500">*</span>
              </label>
              
              <RadioGroup
                name="fuel_type"
                options={fuelTypeOptions}
                value={formData.fuel_type}
                onChange={handleFuelTypeChange}
                required
                error={errors.fuel_type}
              />
            </div>
            
            {isFuelTypeOther && (
              <div className="mb-4 ml-6">
                <Input
                  label={locale === 'th' ? 'ระบุประเภทเชื้อเพลิง' : 'Specify Fuel Type'}
                  name={FIELD_NAMES.FUEL_TYPE_OTHER}
                  value={formData.fuel_type_other || ''}
                  onChange={handleChange}
                  placeholder={locale === 'th' ? 'ระบุประเภทเชื้อเพลิง' : 'Specify Fuel Type'}
                  required
                  error={errors.fuel_type_other}
                />
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-earth-700 mb-1">
                {locale === 'th' ? 'เดินทางร่วมกับคนอื่นหรือไม่' : 'Traveling with others'} <span className="text-red-500">*</span>
              </label>
              
              <RadioGroup
                name="passenger_type"
                options={passengerTypeOptions}
                value={formData.passenger_type}
                onChange={handleChange}
                required
                error={errors.passenger_type}
              />
            </div>
          </div>
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
    </div>
  );
}