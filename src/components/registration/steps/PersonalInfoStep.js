'use client';

import { useState, useEffect } from 'react';
import { getTranslations } from '@/i18n';
import Input from '@/components/ui/Input';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function PersonalInfoStep({ locale, formData, errors, handleChange, setErrors }) {
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);
  const [duplicateStatus, setDuplicateStatus] = useState(null); // null, 'checking', 'duplicate', 'unique'
  
  // Function to check for duplicate names
  const checkDuplicateName = async () => {
    // Only check if both first and last name are filled
    if (!formData.firstName || !formData.lastName) {
      setDuplicateStatus(null);
      return;
    }
    
    setCheckingDuplicate(true);
    setDuplicateStatus('checking');
    
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
        setDuplicateStatus('duplicate');
        // Store the duplicate status in a flag for the next button click
        setErrors(prev => ({
          ...prev,
          _hasDuplicateName: true
        }));
        
        toast.error(locale === 'th' ? 'ชื่อนี้มีการลงทะเบียนแล้ว' : 'This name is already registered', {
          position: 'top-right',
          style: {
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: '#fff',
            padding: '16px 20px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
          },
        });
      } else {
        setDuplicateStatus('unique');
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
      setDuplicateStatus(null);
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
      setDuplicateStatus(null);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors._hasDuplicateName;
        return newErrors;
      });
    }
  };
  
  const getDuplicateStatusIcon = () => {
    switch (duplicateStatus) {
      case 'checking':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6"
          >
            <SparklesIcon className="w-6 h-6 text-blue-600" />
          </motion.div>
        );
      case 'duplicate':
        return <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />;
      case 'unique':
        return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      default:
        return null;
    }
  };
  
  const getDuplicateStatusMessage = () => {
    switch (duplicateStatus) {
      case 'checking':
        return locale === 'th' ? 'กำลังตรวจสอบ...' : 'Checking...';
      case 'duplicate':
        return locale === 'th' ? 'ชื่อ-นามสกุลดังกล่าวได้รับการลงทะเบียนแล้ว กรุณาใช้ชื่อ-นามสกุลอื่น' : 'This name is already registered';
      case 'unique':
        return locale === 'th' ? 'ท่านสามารถลงทะเบียนได้' : 'This name is available';
      default:
        return null;
    }
  };
  
  const getDuplicateStatusColor = () => {
    switch (duplicateStatus) {
      case 'checking':
        return 'text-blue-700';
      case 'duplicate':
        return 'text-red-700';
      case 'unique':
        return 'text-green-700';
      default:
        return '';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 rounded-3xl pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-2xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/50 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-2 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t.registration.personalInfo}
            </span>
          </h2>
          <p className="text-slate-600 font-prompt ml-14">
            {locale === 'th' 
              ? 'กรุณากรอกข้อมูลส่วนตัวของท่านให้ครบถ้วน' 
              : 'Please fill in your personal information completely'}
          </p>
        </motion.div>
        
        {/* Name Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Input
                label={t.registration.firstName}
                name="firstName"
                value={formData.firstName}
                onChange={handleNameChange}
                placeholder={locale === 'th' ? 'ชื่อ' : 'First Name'}
                required
                error={errors.firstName}
                variant="glass"
                className="pl-12"
                data-field="firstName"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none top-6">
                <UserIcon className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            
            <div className="relative">
              <Input
                label={t.registration.lastName}
                name="lastName"
                value={formData.lastName}
                onChange={handleNameChange}
                placeholder={locale === 'th' ? 'นามสกุล' : 'Last Name'}
                required
                error={errors.lastName}
                variant="glass"
                className="pl-12"
                data-field="lastName"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none top-6">
                <UserIcon className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
          
          {/* Duplicate Status Indicator */}
          <AnimatePresence>
            {duplicateStatus && (formData.firstName && formData.lastName) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mt-4 flex items-center space-x-2 p-4 rounded-xl border ${
                  duplicateStatus === 'duplicate' 
                    ? 'bg-red-50 border-red-200' 
                    : duplicateStatus === 'unique'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                {getDuplicateStatusIcon()}
                <span className={`text-sm font-prompt font-medium ${getDuplicateStatusColor()}`}>
                  {getDuplicateStatusMessage()}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Contact Fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="relative">
            <Input
              label={t.registration.email}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              error={errors.email}
              variant="glass"
              className="pl-12"
              data-field="email"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none top-6">
              <EnvelopeIcon className="h-5 w-5 text-teal-600" />
            </div>
          </div>
          
          <div className="relative">
            <Input
              label={t.registration.phone}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={locale === 'th' ? '0812345678' : '0812345678'}
              required
              error={errors.phone}
              variant="glass"
              className="pl-12"
              data-field="phone"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none top-6">
              <PhoneIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </motion.div>
        
        {/* QR Code Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-prompt font-semibold text-blue-800 mb-1">
                {locale === 'th' ? 'การยืนยันการลงทะเบียน' : 'Registration Confirmation'}
              </h4>
              <p className="text-sm text-blue-700 font-prompt leading-relaxed">
                {locale === 'th' 
                  ? 'ระบบจะจัดส่ง QR-Code สำหรับเข้าร่วมงานทางอีเมลและ SMS ให้แก่ท่าน' 
                  : 'QR-Code will be sent via email and SMS for event access'}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400/50 rounded-full blur-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-400/50 rounded-full blur-sm"></div>
      </div>
    </motion.div>
  );
}