'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { FORM_CONSTANTS, FIELD_NAMES } from '../constants';

/**
 * Custom hook for organization form logic
 * @param {Object} props - Hook props
 * @param {Object} props.formData - Form data object
 * @param {Function} props.handleChange - Form change handler
 * @param {string} props.locale - Current locale
 * @returns {Object} Form handlers and computed values
 */
export default function useOrganizationForm({ formData, handleChange, locale }) {
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
  const handleOtherOrgTypeChange = useMemo(() => {
    return (e) => {
      const value = e.target ? e.target.value : e;
      setOtherOrgType(value);
      
      // บันทึกค่าในรูปแบบ snake_case
      updateFormField(FIELD_NAMES.ORGANIZATION_TYPE_OTHER, value);
      
      // บันทึกในรูปแบบ camelCase ด้วย
      handleChange({
        target: { name: 'organizationTypeOther', value }
      });
      
      // เพิ่มการบันทึกใน formData โดยตรงเพื่อให้แน่ใจว่าข้อมูลถูกส่งไปยัง API
      if (value && value.trim() !== '') {
        // ใช้ setTimeout เพื่อให้แน่ใจว่าการอัปเดตค่าทั้งสองอันข้างต้นเสร็จสิ้นก่อน
        setTimeout(() => {
          // ตรวจสอบอีกครั้งว่าค่าถูกบันทึกแล้วจริง
          updateFormField(FIELD_NAMES.ORGANIZATION_TYPE_OTHER, value);
          handleChange({
            target: { name: 'organizationTypeOther', value }
          });
        }, 0);
      }
    };
  }, [updateFormField, handleChange]);
  

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
      // ถ้าไม่ได้เลือก "อื่นๆ" ให้ล้างค่า organization_type_other
      clearFormFields([FIELD_NAMES.ORGANIZATION_TYPE_OTHER]);
      setOtherOrgType('');
    } else {
      // เมื่อเลือก "อื่นๆ" ให้กำหนดค่าเริ่มต้นเป็นสตริงว่างเสมอ
      // เพื่อให้แน่ใจว่าฟิลด์นี้มีอยู่ในข้อมูลฟอร์ม
      updateFormField(FIELD_NAMES.ORGANIZATION_TYPE_OTHER, '');
    }
  }, [handleChange, clearFormFields, updateFormField]);

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

  // Initialize other value from form data
  useEffect(() => {
    if (formData.organization_type_other) {
      setOtherOrgType(formData.organization_type_other);
    }
  }, [formData.organization_type_other]);

  return {
    otherOrgType,
    isOtherOrgSelected,
    isOtherPublicTransportSelected,
    isOtherPrivateVehicleSelected,
    isFuelTypeOther,
    handleOtherOrgTypeChange,
    handleOtherPublicTransportChange,
    handleOtherPrivateVehicleChange,
    handleOrgTypeChange,
    handleLocationTypeChange,
    handleTransportTypeChange,
    handleFuelTypeChange,
    handlePublicTransportChange,
    handlePrivateVehicleChange
  };
}
