
'use client';

// Import from new modular structure
import SuccessStepComponent from './success-step';

/**
 * SuccessStep wrapper component for backward compatibility
 * 
 * This component maintains the original import path while using
 * the new modular structure underneath.
 * 
 * @param {Object} props - All props passed to SuccessStep
 * @returns {JSX.Element} SuccessStep component
 */
export default function SuccessStep(props) {
  return <SuccessStepComponent {...props} />;
}