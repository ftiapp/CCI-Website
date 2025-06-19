'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProcessingModal from '@/components/ui/ProcessingModal';
import StepTransition from '@/components/motion/StepTransition';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';
import FadeIn from '@/components/motion/FadeIn';
import { getTranslations } from '@/i18n';
import StepIndicator from '@/components/ui/StepIndicator';
import PersonalInfoStep from '@/components/registration/steps/PersonalInfoStep';
import OrganizationInfoStep from '@/components/registration/steps/OrganizationInfoStep';
import AttendanceInfoStep from '@/components/registration/steps/AttendanceInfoStep';
import ConfirmationStep from '@/components/registration/steps/ConfirmationStep';
import SuccessStep from '@/components/registration/steps/SuccessStep';
import Button from '@/components/ui/Button';
import { isValidEmail, isValidPhone } from '@/lib/utils';

export default function RegistrationForm({ 
  locale, 
  organizationTypes, 
  transportationTypes, 
  seminarRooms,
  bangkokDistricts,
  provinces 
}) {
  const router = useRouter();
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  // Form steps
  const steps = [
    t.registration.personalInfo,
    t.registration.organizationInfo,
    t.registration.attendanceInfo,
    t.registration.confirmation
  ];
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0); // For animation direction
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organizationName: '',
    organizationTypeId: '',
    transport_type: '',
    public_transport_id: '',
    public_transport_other: '',
    private_vehicle_id: '',
    private_vehicle_other: '',
    fuel_type: '',
    fuel_type_other: '',
    passenger_type: '',
    location_type: '',
    bangkok_district_id: '',
    province_id: '',
    attendanceType: '',
    selectedRoomId: '',
    consent: false
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // Registration success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  
  // Processing state for modal
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle radio button changes
  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // If attendance type is changed to morning or full day, clear selected room
    if (name === 'attendanceType' && (value === 'morning' || value === 'full_day')) {
      setFormData(prev => ({ ...prev, selectedRoomId: '' }));
    }
  };
  
  // Validate current step
  const validateStep = () => {
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
        toast.error(
          locale === 'th' 
            ? `ขออภัย พบข้อมูลซ้ำซ้อนในระบบ คุณ ${formData.firstName} ${formData.lastName} ได้ทำการลงทะเบียนแล้ว` 
            : `Registration Error: Duplicate entry detected. ${formData.firstName} ${formData.lastName} has already been registered in the system.`,
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
      
      // Create a more formal error message prefix
      const errorPrefix = locale === 'th' ? 'ข้อผิดพลาด: ' : 'Validation Error: ';
      
      toast.error(
        `${errorPrefix}${errorMessage}`,
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
      
      return false;
    }
    
    return true;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Show processing modal
      setIsProcessing(true);
      
      // Register the participant
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'duplicate_name') {
          toast.error(
            locale === 'th' 
              ? `ขออภัย พบข้อมูลซ้ำซ้อนในระบบ คุณ ${formData.firstName} ${formData.lastName} ได้ทำการลงทะเบียนแล้ว` 
              : `Registration Error: Duplicate entry detected. ${formData.firstName} ${formData.lastName} has already been registered in the system.`,
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
        } else {
          toast.error(
            locale === 'th' 
              ? 'ขออภัย เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง' 
              : 'System Error: Please try again later.',
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
        }
        setIsProcessing(false);
        return;
      }
      
      // Store registration ID
      const registrationId = data.uuid;
      setRegistrationId(registrationId);
      
      // Send SMS notification
      try {
        const smsResponse = await fetch('/api/send-sms', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone: formData.phone,
            firstName: formData.firstName,
            lastName: formData.lastName,
            registrationId,
            attendanceType: formData.attendanceType,
            selectedRoomId: formData.selectedRoomId,
            locale
          }),
        });
        
        if (!smsResponse.ok) {
          console.error('SMS API error:', await smsResponse.text());
          // We'll continue with the registration process even if SMS fails
          // but we'll log it for debugging purposes
        }
      } catch (smsError) {
        console.error('SMS sending error:', smsError);
        // Continue with the registration process even if SMS fails
      }
      
      // Send email notification
      try {
        // Find selected seminar room (if applicable)
        const selectedRoom = formData.selectedRoomId ? 
          seminarRooms.find(room => room.id.toString() === formData.selectedRoomId) : 
          null;
        
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            registrationId,
            attendanceType: formData.attendanceType,
            selectedRoom,
            locale
          }),
        });
        
        if (!emailResponse.ok) {
          console.error('Email API error:', await emailResponse.json());
          // We'll continue with the registration process even if email fails
          // but we'll log it for debugging purposes
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue with the registration process even if email fails
      }
      
      // Set success state
      setIsSuccess(true);
      setIsProcessing(false);
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        locale === 'th' 
          ? 'ขออภัย เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง' 
          : 'System Error: Please try again later.',
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
      setIsProcessing(false);
    }
  };
  
  // Render current step content
  const renderStepContent = () => {
    if (isSuccess) {
      return (
        <FadeIn direction="up">
          <SuccessStep 
            locale={locale}
            registrationId={registrationId}
            formData={formData}
            organizationTypes={organizationTypes}
            transportationTypes={transportationTypes}
            seminarRooms={seminarRooms}
          />
        </FadeIn>
      );
    }
    
    switch (currentStep) {
      case 0:
        return (
          <StepTransition direction={direction}>
            <PersonalInfoStep 
              locale={locale}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              setErrors={setErrors}
            />
          </StepTransition>
        );
      case 1:
        return (
          <StepTransition direction={direction}>
            <OrganizationInfoStep 
              locale={locale}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleRadioChange={handleRadioChange}
              organizationTypes={organizationTypes}
              transportationTypes={transportationTypes}
              bangkokDistricts={bangkokDistricts}
              provinces={provinces}
            />
          </StepTransition>
        );
      case 2:
        return (
          <StepTransition direction={direction}>
            <AttendanceInfoStep 
              locale={locale}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleRadioChange={handleRadioChange}
              seminarRooms={seminarRooms}
            />
          </StepTransition>
        );
      case 3:
        return (
          <StepTransition direction={direction}>
            <ConfirmationStep
              locale={locale}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              organizationTypes={organizationTypes}
              transportationTypes={transportationTypes}
              seminarRooms={seminarRooms}
              bangkokDistricts={bangkokDistricts}
              provinces={provinces}
            />
          </StepTransition>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Processing Modal */}
      {isProcessing && (
        <ProcessingModal 
          locale={locale} 
          message={locale === 'th' 
            ? 'กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูลการลงทะเบียนและส่งการแจ้งเตือนทาง SMS และอีเมล' 
            : 'Please wait while we process your registration and send SMS and email notifications'} 
        />
      )}
      
      {!isSuccess && (
        <FadeIn duration={0.7}>
          <StepIndicator 
            steps={steps}
            currentStep={currentStep}
            className="mb-8"
          />
        </FadeIn>
      )}
      
      <div className="mb-8">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>
      
      {!isSuccess && (
        <FadeIn direction="up" delay={0.2}>
          <div className="flex justify-between">
            {currentStep > 0 ? (
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                {t.common.back}
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                {t.common.next}
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                {t.common.submit}
              </Button>
            )}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
