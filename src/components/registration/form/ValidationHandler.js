'use client';

import toast from 'react-hot-toast';
import { isValidEmail, isValidPhone } from '@/lib/utils';

const ValidationHandler = {
  // Show toast notification for errors
  showErrorToast: (message, locale) => {
    // Create a more formal error message prefix
    const errorPrefix = locale === 'th' ? 'ข้อผิดพลาด: ' : 'Validation Error: ';
    
    toast.error(
      `${errorPrefix}${message}`,
      {
        duration: 4000,
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
        icon: '⚠️',
      }
    );
  },
  
  // Show duplicate name error toast
  showDuplicateNameError: (firstName, lastName, locale) => {
    toast.error(
      locale === 'th' 
        ? `ขออภัย พบข้อมูลซ้ำซ้อนในระบบ คุณ ${firstName} ${lastName} ได้ทำการลงทะเบียนแล้ว` 
        : `Registration Error: Duplicate entry detected. ${firstName} ${lastName} has already been registered in the system.`,
      {
        duration: 5000,
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
        icon: '⚠️',
      }
    );
  },
  
  // Validate current step
  validateStep: ({ currentStep, formData, errors, setErrors, t, locale }) => {
    const newErrors = {};
    
    if (currentStep === 0) {
      // Personal info validation
      if (!formData.firstName) newErrors.firstName = t.common.required;
      if (!formData.lastName) newErrors.lastName = t.common.required;
      if (!formData.email) {
        newErrors.email = t.common.required;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = t.registration.invalidEmail;
      }
      if (!formData.phone) {
        newErrors.phone = t.common.required;
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = t.registration.invalidPhone;
      }
      
      // Check for duplicate name flag
      if (errors._hasDuplicateName) {
        // Show toast notification for duplicate name
        ValidationHandler.showDuplicateNameError(formData.firstName, formData.lastName, locale);
        
        // Clear the form fields
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            firstName: '',
            lastName: ''
          }));
        }, 100);
        
        return false;
      }
    } else if (currentStep === 1) {
      // Organization info validation
      if (!formData.organizationName) newErrors.organizationName = t.common.required;
      if (!formData.organizationTypeId) newErrors.organizationTypeId = t.common.required;
      
      // Location validation
      if (!formData.location_type) {
        newErrors.location_type = t.common.required;
      } else {
        // Validate Bangkok district
        if (formData.location_type === 'bangkok' && !formData.bangkok_district_id) {
          newErrors.bangkok_district_id = t.common.required;
        }
        
        // Validate Province
        if (formData.location_type === 'province' && !formData.province_id) {
          newErrors.province_id = t.common.required;
        }
      }
      
      // Transportation validation
      if (!formData.transport_type) {
        newErrors.transport_type = t.common.required;
      } else {
        // Validate public transportation fields
        if (formData.transport_type === 'public') {
          if (!formData.public_transport_id) {
            newErrors.public_transport_id = t.common.required;
          } else if (parseInt(formData.public_transport_id) === 999 && !formData.public_transport_other) {
            newErrors.public_transport_other = t.common.required;
          }
        }
        
        // Validate private vehicle fields
        if (formData.transport_type === 'private') {
          if (!formData.private_vehicle_id) {
            newErrors.private_vehicle_id = t.common.required;
          } else if (parseInt(formData.private_vehicle_id) === 999 && !formData.private_vehicle_other) {
            newErrors.private_vehicle_other = t.common.required;
          }
          
          if (!formData.fuel_type) {
            newErrors.fuel_type = t.common.required;
          } else if (formData.fuel_type === 'other' && !formData.fuel_type_other) {
            newErrors.fuel_type_other = t.common.required;
          }
          
          if (!formData.passenger_type) {
            newErrors.passenger_type = t.common.required;
          }
        }
      }
    } else if (currentStep === 2) {
      // Attendance info validation
      if (!formData.attendanceType) {
        newErrors.attendanceType = t.common.required;
      } else if (formData.attendanceType === 'afternoon' && !formData.selectedRoomId) {
        newErrors.selectedRoomId = t.common.required;
      }
    } else if (currentStep === 3) {
      // Confirmation and consent validation
      if (!formData.consent) {
        newErrors.consent = locale === 'th' ? 'กรุณายอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว' : 'Please accept the terms of service and privacy policy';
      }
    }
    
    // Store errors in state
    setErrors(newErrors);
    
    // If there are errors, show a toast notification
    if (Object.keys(newErrors).length > 0) {
      // Get the first error message to display
      const firstErrorKey = Object.keys(newErrors)[0];
      const errorMessage = newErrors[firstErrorKey];
      
      ValidationHandler.showErrorToast(errorMessage, locale);
      
      return false;
    }
    
    return true;
  }
};

export default ValidationHandler;
