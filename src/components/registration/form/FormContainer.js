'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTranslations } from '@/i18n';
import FormHeader from './FormHeader';
import FormFooter from './FormFooter';
import FormStepRenderer from './FormStepRenderer';
import ValidationHandler from './ValidationHandler';
import FormSubmissionHandler from './FormSubmissionHandler';
import ProcessingModal from '@/components/ui/ProcessingModal';
import PageHeader from '@/components/ui/PageHeader';
import { isValidEmail, isValidPhone } from '@/lib/utils';

export default function FormContainer({ 
  locale, 
  organizationTypes, 
  industryTypes,
  transportationTypes, 
  seminarRooms,
  bangkokDistricts,
  provinces 
}) {
  const router = useRouter();
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
    industryTypeId: '',
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
  
  // Handle next step
  const handleNext = () => {
    if (ValidationHandler.validateStep({
      currentStep,
      formData,
      errors,
      setErrors,
      t,
      locale
    })) {
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
      
      const result = await FormSubmissionHandler.submitForm({
        formData,
        locale,
        seminarRooms,
        setRegistrationId
      });
      
      if (result.success) {
        setIsSuccess(true);
      }
      
      setIsProcessing(false);
    } catch (error) {
      console.error('Registration error:', error);
      ValidationHandler.showErrorToast(
        locale === 'th' 
          ? 'ขออภัย เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง' 
          : 'System Error: Please try again later.',
        locale
      );
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      {!isSuccess && (
        <PageHeader 
          title={locale === 'th' ? 'ลงทะเบียนเข้าร่วมงาน' : 'Event Registration'}
          subtitle={locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all required information'}
          type="register"
        />
      )}
      
      {/* Processing Modal */}
      {isProcessing && (
        <ProcessingModal 
          locale={locale} 
          message={locale === 'th' 
            ? 'กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูลการลงทะเบียนและส่งการแจ้งเตือนทาง SMS และอีเมล' 
            : 'Please wait while we process your registration and send SMS and email notifications'} 
        />
      )}
      
      <div className="bg-white rounded-lg shadow-sm border border-earth-200 p-6 mb-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <FormHeader 
            isSuccess={isSuccess}
            steps={steps}
            currentStep={currentStep}
          />
        </div>
        <FormStepRenderer
          isSuccess={isSuccess}
          currentStep={currentStep}
          direction={direction}
          locale={locale}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleRadioChange={handleRadioChange}
          organizationTypes={organizationTypes}
          industryTypes={industryTypes}
          transportationTypes={transportationTypes}
          seminarRooms={seminarRooms}
          bangkokDistricts={bangkokDistricts}
          provinces={provinces}
          registrationId={registrationId}
          setErrors={setErrors}
        />
        
        <div className="mt-8">
          <FormFooter
            isSuccess={isSuccess}
            currentStep={currentStep}
            steps={steps}
            handleBack={handleBack}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
            t={t}
          />
        </div>
      </div>
    </div>
  );
}
