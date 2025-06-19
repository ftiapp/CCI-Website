'use client';

import { useEffect, useState } from 'react';
import { getTranslations } from '@/i18n';
import SuccessStep from '@/components/registration/steps/SuccessStep';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function TicketPage({ params }) {
  const { locale, id } = params;
  const [loading, setLoading] = useState(true);
  const [registrationData, setRegistrationData] = useState(null);
  const [error, setError] = useState(null);
  
  const t = getTranslations(locale || 'th');
  
  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await fetch(`/api/registration/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch registration data');
        }
        
        const data = await response.json();
        setRegistrationData(data);
      } catch (error) {
        console.error('Error fetching registration data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRegistrationData();
  }, [id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  if (error || !registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-prompt font-bold text-earth-900 mb-4">
            {locale === 'th' ? 'ไม่พบข้อมูลการลงทะเบียน' : 'Registration Not Found'}
          </h1>
          <p className="text-earth-700 mb-6">
            {locale === 'th' ? 'ไม่พบข้อมูลการลงทะเบียนที่คุณต้องการ กรุณาตรวจสอบลิงก์อีกครั้ง' : 'The registration information you requested could not be found. Please check the link again.'}
          </p>
          <a 
            href={`/${locale}`}
            className="inline-block bg-beige-600 hover:bg-beige-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            {locale === 'th' ? 'กลับสู่หน้าหลัก' : 'Back to Home'}
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <SuccessStep
        locale={locale}
        registrationId={id}
        formData={registrationData.formData}
        organizationTypes={registrationData.organizationTypes || []}
        transportationTypes={registrationData.transportationTypes || []}
        seminarRooms={registrationData.seminarRooms || []}
      />
    </div>
  );
}
