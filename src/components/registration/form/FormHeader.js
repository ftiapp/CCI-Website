'use client';

import FadeIn from '@/components/motion/FadeIn';
import StepIndicator from '@/components/ui/StepIndicator';

export default function FormHeader({ isSuccess, steps, currentStep }) {
  if (isSuccess) {
    return null;
  }
  
  return (
    <FadeIn duration={0.7}>
      <StepIndicator 
        steps={steps}
        currentStep={currentStep}
        className="mb-8"
      />
    </FadeIn>
  );
}
