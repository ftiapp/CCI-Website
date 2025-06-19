'use client';

import { useState, useEffect } from 'react';
import { getTranslations } from '@/i18n';
import Input from '@/components/ui/Input';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function PersonalInfoStep({ locale, formData, errors, handleChange, setErrors }) {
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);
  
  // Function to check for duplicate names
  const checkDuplicateName = async () => {
    // Only check if both first and last name are filled
    if (!formData.firstName || !formData.lastName) return;
    
    setCheckingDuplicate(true);
    try {
      const response = await fetch('/api/check-duplicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
      });
      
      const data = await response.json();
      
      if (data.isDuplicate) {
        // Store the duplicate status in a flag for the next button click
        setErrors(prev => ({
          ...prev,
          _hasDuplicateName: true
        }));
      } else {
        // Clear the duplicate flag if it exists
        if (errors._hasDuplicateName) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors._hasDuplicateName;
            return newErrors;
          });
        }
      }
    } catch (error) {
      console.error('Error checking duplicate name:', error);
    } finally {
      setCheckingDuplicate(false);
    }
  };
  
  // Check for duplicates when both first and last name are filled and changed
  useEffect(() => {
    const timer = setTimeout(() => {
      checkDuplicateName();
    }, 500); // Debounce to avoid too many requests
    
    return () => clearTimeout(timer);
  }, [formData.firstName, formData.lastName]);
  
  // Custom change handler for name fields
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    
    // Normal change handling
    handleChange(e);
    
    // If there was a duplicate error and we're changing a name field, clear the flag
    if ((name === 'firstName' || name === 'lastName') && errors._hasDuplicateName) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors._hasDuplicateName;
        return newErrors;
      });
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-prompt font-semibold text-earth-800 mb-6 flex items-center">
        <UserIcon className="w-5 h-5 mr-2 text-beige-600" />
        {t.registration.personalInfo}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t.registration.firstName}
          name="firstName"
          value={formData.firstName}
          onChange={handleNameChange}
          placeholder={locale === 'th' ? 'ชื่อ' : 'First Name'}
          required
          error={errors.firstName}
        />
        
        <Input
          label={t.registration.lastName}
          name="lastName"
          value={formData.lastName}
          onChange={handleNameChange}
          placeholder={locale === 'th' ? 'นามสกุล' : 'Last Name'}
          required
          error={errors.lastName}
        />
      </div>
      
      <div className="space-y-4">
        <Input
          label={t.registration.email}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@email.com"
          required
          error={errors.email}
        />
        
        <Input
          label={t.registration.phone}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder={locale === 'th' ? '0812345678' : '0812345678'}
          required
          error={errors.phone}
        />
        
        <p className="text-xs text-gray-400 italic">
          {locale === 'th' ? '*ระบบจะจัดส่ง QR-Code สำหรับเข้าร่วมงานทางอีเมลและ SMS ให้แก่ท่าน' : '* QR-Code will be sent via email and SMS'}
        </p>
      </div>
    </div>
  );
}