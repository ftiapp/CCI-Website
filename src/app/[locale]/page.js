import Link from 'next/link';
import { getTranslations } from '@/i18n';
import Button from '@/components/ui/Button';
import { CalendarIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { EventStructuredData, OrganizationStructuredData } from '@/components/seo/StructuredData';
import { generateMetadata } from './metadata';

export { generateMetadata };

export default async function HomePage({ params }) {
  // ใช้วิธีการดึงค่า locale ที่ถูกต้องตาม Next.js 15
  // Await params before accessing its properties as required in Next.js 15
  const _params = await Promise.resolve(params);
  const { locale = 'th' } = _params || {};
  const t = getTranslations(locale);
  
  return (
    <>
      <EventStructuredData locale={locale} />
      <OrganizationStructuredData locale={locale} />
    <div className="bg-gradient-to-b from-earth-50 to-beige-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-prompt font-bold text-earth-900 mb-4">
                {t.home.welcome}
              </h1>
              <p className="text-lg text-earth-700 mb-8 max-w-lg">
                {t.home.description}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href={`/${locale}/register`}>
                  <Button className="flex items-center space-x-2">
                    <UserPlusIcon className="w-5 h-5" />
                    <span>{t.home.registerButton}</span>
                  </Button>
                </Link>
                <Link href={`/${locale}/schedule`}>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{t.home.scheduleButton}</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-beige-500 rounded-lg transform rotate-3"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg border border-earth-200">
                  <div className="flex items-center justify-center h-64 bg-earth-50 rounded mb-4">
                    <svg className="w-24 h-24 text-beige-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-prompt font-semibold text-earth-800 mb-2">
                    CCI Climate Change Forum 2025
                  </h3>
                  <p className="text-earth-600">
                    {locale === 'th' ? 
                      'งานสัมมนาการเปลี่ยนแปลงสภาพภูมิอากาศ และนวัตกรรมเพื่อความยั่งยืน' : 
                      'Climate Change Forum and Innovation for Sustainability'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-earth-50 p-6 rounded-lg border border-earth-200">
              <div className="w-12 h-12 bg-beige-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-beige-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-prompt font-semibold text-earth-800 mb-2">
                {locale === 'th' ? 'กำหนดการ' : 'Schedule'}
              </h3>
              <p className="text-earth-600 mb-4">
                {locale === 'th' ? 
                  'ดูรายละเอียดกำหนดการงาน CCI Climate Change Forum 2025 และหัวข้อที่น่าสนใจ' : 
                  'View the CCI Climate Change Forum 2025 schedule and interesting topics'}
              </p>
              <Link href={`/${locale}/schedule`} className="text-beige-600 hover:text-beige-700 font-medium">
                {locale === 'th' ? 'ดูกำหนดการ →' : 'View Schedule →'}
              </Link>
            </div>
            
            <div className="bg-earth-50 p-6 rounded-lg border border-earth-200">
              <div className="w-12 h-12 bg-beige-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-beige-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-prompt font-semibold text-earth-800 mb-2">
                {locale === 'th' ? 'ลงทะเบียน' : 'Registration'}
              </h3>
              <p className="text-earth-600 mb-4">
                {locale === 'th' ? 
                  'ลงทะเบียนเข้าร่วมงาน CCI Climate Change Forum 2025' : 
                  'Register for the CCI Climate Change Forum 2025'}
              </p>
              <Link href={`/${locale}/register`} className="text-beige-600 hover:text-beige-700 font-medium">
                {locale === 'th' ? 'ลงทะเบียนเลย →' : 'Register Now →'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}