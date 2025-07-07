'use client';

import FadeIn from '@/components/motion/FadeIn';
import Button from '@/components/ui/Button';

export default function FormFooter({ 
  isSuccess, 
  currentStep, 
  steps, 
  handleBack, 
  handleNext, 
  handleSubmit,
  t
}) {
  if (isSuccess) {
    return null;
  }
  
  return (
    <FadeIn direction="up" delay={0.2}>
      <div className="flex justify-between px-4 py-6 md:px-6">
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
  );
}
