'use client';

import { memo } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

/**
 * ConfirmationHeader Component - Displays the confirmation step header
 * @param {Object} props - Component props
 * @param {Object} props.t - Translation object
 */
const ConfirmationHeader = ({ t }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
        <CheckCircleIcon className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-prompt font-bold text-earth-800 mb-2">
        {t.registration.confirmation}
      </h2>
      <p className="text-earth-600 max-w-2xl mx-auto leading-relaxed">
        {t.registration.confirmationMessage}
      </p>
    </div>
  );
};

export default memo(ConfirmationHeader);
