'use client';

import { AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/motion/FadeIn';
import StepTransition from '@/components/motion/StepTransition';
import PersonalInfoStep from '@/components/registration/steps/PersonalInfoStep';
import OrganizationInfoStep from '@/components/registration/steps/OrganizationInfoStep';
import AttendanceInfoStep from '@/components/registration/steps/AttendanceInfoStep';
import ConfirmationStep from '@/components/registration/steps/ConfirmationStep';
import SuccessStep from '@/components/registration/steps/SuccessStep';

export default function FormStepRenderer({
  isSuccess,
  currentStep,
  direction,
  locale,
  formData,
  errors,
  handleChange,
  handleRadioChange,
  organizationTypes,
  industryTypes,
  transportationTypes,
  seminarRooms,
  bangkokDistricts,
  provinces,
  registrationId,
  setErrors
}) {
  if (isSuccess) {
    return (
      <FadeIn direction="up">
        <SuccessStep 
          locale={locale}
          registrationId={registrationId}
          formData={formData}
          organizationTypes={organizationTypes}
          industryTypes={industryTypes}
          transportationTypes={transportationTypes}
          seminarRooms={seminarRooms}
        />
      </FadeIn>
    );
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep 
            locale={locale}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            setErrors={setErrors}
          />
        );
      case 1:
        return (
          <OrganizationInfoStep 
            locale={locale}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleRadioChange={handleRadioChange}
            organizationTypes={organizationTypes}
            industryTypes={industryTypes}
            transportationTypes={transportationTypes}
            bangkokDistricts={bangkokDistricts}
            provinces={provinces}
          />
        );
      case 2:
        return (
          <AttendanceInfoStep 
            locale={locale}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleRadioChange={handleRadioChange}
            seminarRooms={seminarRooms}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            locale={locale}
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            organizationTypes={organizationTypes}
            industryTypes={industryTypes}
            transportationTypes={transportationTypes}
            seminarRooms={seminarRooms}
            bangkokDistricts={bangkokDistricts}
            provinces={provinces}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      <StepTransition direction={direction}>
        {renderStep()}
      </StepTransition>
    </AnimatePresence>
  );
}
