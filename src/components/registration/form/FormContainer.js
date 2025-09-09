'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { getTranslations } from '@/i18n';
import FormHeader from './FormHeader';
import FormFooter from './FormFooter';
import FormStepRenderer from './FormStepRenderer';
import ValidationHandler from './ValidationHandler';
import FormSubmissionHandler from './FormSubmissionHandler';
import ProcessingModal from '@/components/ui/ProcessingModal';
import { ClockIcon, ExclamationTriangleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { isValidEmail, isValidPhone } from '@/lib/utils';

// Enhanced CountdownTimer component
function CountdownTimer({ locale, registrationDeadline }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = registrationDeadline.getTime() - now.getTime();

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false,
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second, but only if values change
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft((prev) => {
        // Only update if values have changed
        if (
          prev.days !== newTimeLeft.days ||
          prev.hours !== newTimeLeft.hours ||
          prev.minutes !== newTimeLeft.minutes ||
          prev.seconds !== newTimeLeft.seconds ||
          prev.isExpired !== newTimeLeft.isExpired
        ) {
          return newTimeLeft;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [registrationDeadline]);

  if (timeLeft.isExpired) {
    return null;
  }

  return (
    <section className="relative py-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 overflow-hidden mb-6">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20"></div>
      <div className="absolute top-5 right-5 w-20 h-20 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-5 left-5 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-emerald-200/30 rounded-full blur-2xl"></div>
      
      <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mx-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <ClockIcon className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-prompt font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {locale === 'th' ? 'เหลือเวลาลงทะเบียน' : 'Registration Closes In'}
              </h3>
              <p className="text-sm text-slate-600">
                {locale === 'th' ? 'ปิดรับลงทะเบียนวันที่ 8 กันยายน 2568' : 'Deadline: September 8, 2025'}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            {[
              { value: timeLeft.days, label: locale === 'th' ? 'วัน' : 'Days' },
              { value: timeLeft.hours, label: locale === 'th' ? 'ชั่วโมง' : 'Hours' },
              { value: timeLeft.minutes, label: locale === 'th' ? 'นาที' : 'Mins' },
              { value: timeLeft.seconds, label: locale === 'th' ? 'วินาที' : 'Secs' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 px-3 py-2 rounded-xl border border-emerald-200 text-center min-w-[60px] shadow-sm"
              >
                <div className="text-xl font-bold text-emerald-700">{item.value}</div>
                <div className="text-xs text-emerald-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {timeLeft.days < 7 && !timeLeft.isExpired && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-orange-700 border border-orange-200">
              <ExclamationTriangleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
              <span className="text-sm font-medium">
                {locale === 'th' ? 'เหลือเวลาไม่นาน! รีบลงทะเบียน' : 'Limited time! Register now'}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

CountdownTimer.propTypes = {
  locale: PropTypes.string.isRequired,
  registrationDeadline: PropTypes.instanceOf(Date).isRequired,
};

export default function FormContainer({
  locale,
  organizationTypes,
  industryTypes,
  transportationTypes,
  seminarRooms,
  bangkokDistricts,
  provinces,
  privateAccess = false,
}) {
  const router = useRouter();
  const t = getTranslations(locale || 'th');

  const registrationDeadline = useMemo(() => new Date('2025-09-08T23:59:59+07:00'), []);

  const steps = [
    t.registration.personalInfo,
    t.registration.organizationInfo,
    t.registration.attendanceInfo,
    t.registration.confirmation,
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
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
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (name === 'attendanceType' && (value === 'morning' || value === 'full_day')) {
      setFormData((prev) => ({ ...prev, selectedRoomId: '' }));
    }
  };

  const handleNext = () => {
    if (!privateAccess && Date.now() > registrationDeadline.getTime()) {
      ValidationHandler.showErrorToast(
        locale === 'th'
          ? 'ขออภัย ระยะเวลาการลงทะเบียนได้สิ้นสุดแล้ว'
          : 'Sorry, the registration period has ended.',
        locale,
      );
      return;
    }

    if (
      ValidationHandler.validateStep({
        currentStep,
        formData,
        errors,
        setErrors,
        t,
        locale,
      })
    ) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!privateAccess && Date.now() > registrationDeadline.getTime()) {
      ValidationHandler.showErrorToast(
        locale === 'th'
          ? 'ขออภัย ระยะเวลาการลงทะเบียนได้สิ้นสุดแล้ว'
          : 'Sorry, the registration period has ended.',
        locale,
      );
      return;
    }

    // Validate consent checkbox before submitting
    if (!formData.consent) {
      const consentError = locale === 'th' 
        ? 'กรุณายอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว' 
        : 'Please accept the terms of service and privacy policy';
      
      setErrors(prev => ({ ...prev, consent: consentError }));
      ValidationHandler.showErrorToast(consentError, locale);
      ValidationHandler.scrollToFirstError('consent');
      return;
    }

    try {
      setIsProcessing(true);
      const result = await FormSubmissionHandler.submitForm({
        formData,
        locale,
        seminarRooms,
        setRegistrationId,
      });
      if (result.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      ValidationHandler.showErrorToast(
        locale === 'th'
          ? 'ขออภัย เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง'
          : 'System Error: Please try again later.',
        locale,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing) {
    return (
      <ProcessingModal
        locale={locale}
        message={
          locale === 'th'
            ? 'กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูลการลงทะเบียนและส่งการแจ้งเตือนทาง SMS และอีเมล'
            : 'Please wait while we process your registration and send SMS and email notifications'
        }
      />
    );
  }

  return (
    <div className="relative">
      {/* Main container with gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header Section */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 mb-8 overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
                <div className="relative px-8 py-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        {locale === 'th' ? 'ลงทะเบียนเข้าร่วมงาน' : 'Event Registration'}
                      </h1>
                      <p className="text-lg font-prompt text-slate-600 mt-1 flex items-center">
                        <SparklesIcon className="w-4 h-4 mr-2 text-emerald-500" />
                        {locale === 'th' ? 'CCI Climate Change Forum 2025' : 'CCI Climate Change Forum 2025'}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center border border-emerald-200/50">
                      <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
            </div>

            <CountdownTimer locale={locale} registrationDeadline={registrationDeadline} />
            
            {!privateAccess && Date.now() > registrationDeadline.getTime() ? (
              <section className="relative py-20 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Background decoration for closed registration */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>
                
                <div className="relative text-center px-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-8 shadow-2xl">
                    <ExclamationTriangleIcon className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-prompt font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-6">
                    {locale === 'th' ? 'ปิดรับลงทะเบียนแล้ว' : 'Registration Closed'}
                  </h2>
                  
                  <p className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed mb-8">
                    {locale === 'th'
                      ? 'ขออภัย ระยะเวลาการลงทะเบียนเข้าร่วมงานได้สิ้นสุดลงแล้ว'
                      : 'Sorry, the registration period for this event has ended'}
                  </p>
                  
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200 shadow-lg max-w-2xl mx-auto">
                    <div className="flex items-center justify-center mb-4">
                      <SparklesIcon className="w-6 h-6 text-slate-500 mr-2" />
                    </div>
                    <p className="text-lg text-slate-600">
                      {locale === 'th'
                        ? 'หากท่านมีข้อสงสัยเพิ่มเติม กรุณาติดต่อทีมงาน'
                        : 'If you have any questions, please contact our team'}
                    </p>
                  </div>
                </div>
              </section>
            ) : (
              <section className="relative py-12 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-teal-50/30 to-blue-50/30"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-emerald-200/20 rounded-full blur-3xl"></div>
                
                <div className="relative px-6 md:px-8">
                  <FormHeader isSuccess={isSuccess} steps={steps} currentStep={currentStep} />
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
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

FormContainer.propTypes = {
  locale: PropTypes.string.isRequired,
  organizationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  industryTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  transportationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  seminarRooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  bangkokDistricts: PropTypes.arrayOf(PropTypes.object).isRequired,
  provinces: PropTypes.arrayOf(PropTypes.object).isRequired,
};