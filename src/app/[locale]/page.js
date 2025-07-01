import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from '@/i18n';
import Button from '@/components/ui/Button';
import { CalendarIcon, UserPlusIcon, SparklesIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
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
      
      {/* Banner Image - Full Width */}
      <div className="w-full">
        <Image 
          src="/cci-forum-banner.png"
          alt="CCI Climate Change Forum 2025 Banner"
          width={1920}
          height={600}
          className="w-full h-auto"
          priority
        />
      </div>
      
      {/* Welcome Message Section - Redesigned */}
      <section className="relative py-16 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-prompt font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent mb-6">
            ยินดีต้อนรับ
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-8">
            {locale === 'th' ? 
              'ขอต้อนรับทุกท่านเข้าสู่งาน CCI Climate Change Forum 2025 งานสัมมนาเพื่อการพัฒนาที่ยั่งยืนและการรับมือกับการเปลี่ยนแปลงสภาพภูมิอากาศ' : 
              'Welcome to CCI Climate Change Forum 2025, a seminar for sustainable development and climate change adaptation'}
          </p>
          
          {/* Stats or highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2025</div>
              <div className="text-slate-600">{locale === 'th' ? 'ปี แห่งการเปลี่ยนแปลง' : 'Year of Change'}</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
              <div className="text-slate-600">{locale === 'th' ? 'ผู้เข้าร่วมคาดหวัง' : 'Expected Participants'}</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
              <div className="text-slate-600">{locale === 'th' ? 'วัน เต็มไปด้วยความรู้' : 'Day Full of Knowledge'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section - Enhanced */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content Side */}
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-sm font-medium text-emerald-700 border border-emerald-200">
                  <GlobeAltIcon className="w-4 h-4 mr-2" />
                  {locale === 'th' ? 'เพื่อโลกที่ยั่งยืน' : 'For a Sustainable World'}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-prompt font-bold text-slate-900 leading-tight">
                  <span className="block">CCI Climate</span>
                  <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Change Forum
                  </span>
                  <span className="block text-3xl md:text-4xl lg:text-5xl text-slate-700">2025</span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                  {locale === 'th' ? 
                    'งานสัมมนาการเปลี่ยนแปลงสภาพภูมิอากาศ และนวัตกรรมเพื่อความยั่งยืน ที่จะเปลี่ยนมุมมองและสร้างอนาคตที่ดีกว่า' : 
                    'Climate Change Forum and Innovation for Sustainability that will change perspectives and create a better future'}
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/${locale}/register`}>
                  <Button className="group w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <UserPlusIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{t.home.registerButton}</span>
                  </Button>
                </Link>
                <Link href={`/${locale}/schedule`}>
                  <Button variant="outline" className="group w-full sm:w-auto border-2 border-slate-300 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300">
                    <CalendarIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{t.home.scheduleButton}</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Visual Side */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-lg">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-500 rounded-3xl transform -rotate-3 opacity-20"></div>
                
                {/* Main card */}
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 backdrop-blur-sm">
                  {/* Icon area */}
                  <div className="flex items-center justify-center h-48 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl mb-6 border border-emerald-100">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-prompt font-bold text-slate-800">
                      CCI Climate Change Forum 2025
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {locale === 'th' ? 
                        'งานสัมมนาการเปลี่ยนแปลงสภาพภูมิอากาศ และนวัตกรรมเพื่อความยั่งยืน' : 
                        'Climate Change Forum and Innovation for Sustainability'}
                    </p>
                    
                    {/* Event details */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-center text-sm text-slate-500 space-x-4">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          <span>2025</span>
                        </div>
                        <div className="flex items-center">
                          <GlobeAltIcon className="w-4 h-4 mr-1" />
                          <span>{locale === 'th' ? 'ออนไลน์' : 'Online'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Completely Redesigned */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-prompt font-bold text-slate-900 mb-4">
              {locale === 'th' ? 'เริ่มต้นการเดินทางของคุณ' : 'Start Your Journey'}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {locale === 'th' ? 
                'ค้นพบข้อมูลสำคัญและลงทะเบียนเข้าร่วมงานได้ง่ายๆ เพียงไม่กี่คลิก' : 
                'Discover important information and register for the event easily with just a few clicks'}
            </p>
          </div>
          
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Schedule Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CalendarIcon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-prompt font-bold text-slate-800 mb-2">
                        {locale === 'th' ? 'กำหนดการงาน' : 'Event Schedule'}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {locale === 'th' ? 
                          'ดูรายละเอียดกำหนดการงาน CCI Climate Change Forum 2025 พร้อมหัวข้อการบรรยายที่น่าสนใจจากผู้เชี่ยวชาญ' : 
                          'View the CCI Climate Change Forum 2025 schedule with interesting topics from experts'}
                      </p>
                    </div>
                    <Link 
                      href={`/${locale}/schedule`} 
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{locale === 'th' ? 'ดูกำหนดการ' : 'View Schedule'}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <UserPlusIcon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-prompt font-bold text-slate-800 mb-2">
                        {locale === 'th' ? 'ลงทะเบียนเข้าร่วม' : 'Join Registration'}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {locale === 'th' ? 
                          'ลงทะเบียนเข้าร่วมงาน CCI Climate Change Forum 2025 ได้ง่ายๆ และรับข้อมูลอัปเดตล่าสุด' : 
                          'Register for the CCI Climate Change Forum 2025 easily and receive the latest updates'}
                      </p>
                    </div>
                    <Link 
                      href={`/${locale}/register`} 
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold group-hover:translate-x-1 transition-all duration-200"
                    >
                      <span>{locale === 'th' ? 'ลงทะเบียนเลย' : 'Register Now'}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional info section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full text-slate-600 border border-slate-300">
              <SparklesIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {locale === 'th' ? 
                  'งานนี้จัดขึ้นเพื่อสร้างความตระหนักและแบ่งปันความรู้เกี่ยวกับการเปลี่ยนแปลงสภาพภูมิอากาศ' : 
                  'This event is organized to raise awareness and share knowledge about climate change'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}