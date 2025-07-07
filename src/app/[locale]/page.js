'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from '@/i18n';
import Button from '@/components/ui/Button';
import { EventStructuredData, OrganizationStructuredData } from '@/components/seo/StructuredData';

// Compact CountdownTimer component for HomePage
function CompactCountdownTimer({ locale, registrationDeadline }) {
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

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft((prev) => {
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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 max-w-3xl mx-auto">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-3 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-prompt font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">
          {locale === 'th' ? 'เหลือเวลาลงทะเบียน' : 'Registration Closes In'}
        </h3>
        <p className="text-sm text-slate-600">
          {locale === 'th' ? 'ปิดรับลงทะเบียนวันที่ 8 กันยายน 2568' : 'Deadline: September 8, 2025'}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { value: timeLeft.days, label: locale === 'th' ? 'วัน' : 'Days' },
          { value: timeLeft.hours, label: locale === 'th' ? 'ชั่วโมง' : 'Hours' },
          { value: timeLeft.minutes, label: locale === 'th' ? 'นาที' : 'Mins' },
          { value: timeLeft.seconds, label: locale === 'th' ? 'วินาที' : 'Secs' },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 py-3 px-2 rounded-xl border border-emerald-200 text-center shadow-sm"
          >
            <div className="text-2xl font-bold text-emerald-700">{item.value}</div>
            <div className="text-xs text-emerald-600">{item.label}</div>
          </div>
        ))}
      </div>

      {timeLeft.days < 7 && !timeLeft.isExpired && (
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full text-orange-700 border border-orange-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm font-medium">
              {locale === 'th' ? 'เหลือเวลาไม่นาน! รีบลงทะเบียน' : 'Limited time! Register now'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Create a client component for the main content that uses hooks
function HomePageContent({ locale }) {
  const t = getTranslations(locale);
  const registrationDeadline = useMemo(() => new Date('2025-09-08T23:59:59+07:00'), []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      <EventStructuredData locale={locale} />
      <OrganizationStructuredData locale={locale} />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-12 md:px-8 md:py-16">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-prompt font-bold text-white mb-6">
                {locale === 'th' ? 'ยินดีต้อนรับ' : 'Welcome'}
              </h2>
              
              <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl leading-relaxed mb-12">
                {locale === 'th' ? (
                  <>
                    ขอต้อนรับทุกท่านเข้าสู่งาน CCI Climate Change Forum 2025<br />
                    งานสัมมนาเพื่อการพัฒนาที่ยั่งยืนและขับเคลื่อนสู่การปล่อยก๊าซเรือนกระจกสุทธิเป็นศูนย์ 

                  </>
                ) : (
                  <>
                    Join us at the CCI Climate Change Forum 2025 <br />
                    A seminar on Sustainable Development and Climate Change Adaptation, driving towards Net Zero.
                  </>
                )}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mb-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{locale === 'th' ? '2568' : '2025'}</div>
                  <div className="text-slate-600">{locale === 'th' ? 'ปี แห่งการเปลี่ยนแปลง' : 'Year of Change'}</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="text-3xl font-bold text-teal-600 mb-2">300+</div>
                  <div className="text-slate-600">{locale === 'th' ? 'ผู้ร่วมขับเคลื่อนที่คาดหวัง' : 'Expected drivers of change '}</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-slate-600">{locale === 'th' ? 'ผู้นำขับเคลื่อน Climate Action' : 'Leaders Driving Climate Action'}</div>
                </div>
              </div>

              {/* Compact Countdown Timer */}
              <CompactCountdownTimer locale={locale} registrationDeadline={registrationDeadline} />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Banner Image */}
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/cci-forum-banner.png"
                alt="CCI Climate Change Forum 2025 Banner"
                width={1920}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Hero Content */}
            <section className="mb-16">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Content Side */}
                <div className="lg:w-1/2 space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-sm font-medium text-emerald-700 border border-emerald-200">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
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
                        <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span className="font-semibold">{t.home.registerButton}</span>
                      </Button>
                    </Link>
                    <Link href={`/${locale}/schedule`}>
                      <Button variant="outline" className="group w-full sm:w-auto border-2 border-slate-300 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 px-8 py-4 rounded-xl hover:bg-emerald-50 transition-all duration-300">
                        <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-semibold">{t.home.scheduleButton}</span>
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Visual Side */}
                <div className="lg:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-lg">
                    {/* Background decoration */}
                   {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
                    {/* Main card */}
                    <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 backdrop-blur-sm">
                      {/* Icon area */}
                      <a 
                        href="https://www.facebook.com/climatechange.fti/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="flex items-center justify-center h-48 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl mb-6 border border-emerald-100 hover:shadow-md transition-all duration-300">
                          <div className="flex items-center justify-center">
                            <div className="w-48 h-48 flex items-center justify-center p-4">
                              <img 
                                src="/fti-cci-logo-rgb.png" 
                                alt="FTI-CCI Logo" 
                                className="w-full h-auto object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </a>
                      
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
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>2025</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{locale === 'th' ? 'ออนไลน์' : 'Online'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl font-prompt font-bold text-slate-900 mb-4">
                  {locale === 'th' ? 'เริ่มต้นการเดินทางของคุณ' : 'Start Your Journey'}
                </h3>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  {locale === 'th' ? 
                    'ค้นพบข้อมูลสำคัญและลงทะเบียนเข้าร่วมงานได้ง่ายๆ เพียงไม่กี่คลิก' : 
                    'Discover important information and register for the event easily with just a few clicks'}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Schedule Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-lg font-prompt font-bold text-slate-800 mb-2">
                            {locale === 'th' ? 'กำหนดการงาน' : 'Event Schedule'}
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {locale === 'th' ? 
                              'ดูรายละเอียดกำหนดการงาน CCI Climate Change Forum 2025 พร้อมหัวข้อการบรรยายที่น่าสนใจจากผู้เชี่ยวชาญ' : 
                              'View the CCI Climate Change Forum 2025 schedule with interesting topics from experts'}
                          </p>
                        </div>
                        <Link 
                          href={`/${locale}/schedule`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-200 text-sm"
                        >
                          <span>{locale === 'th' ? 'ดูกำหนดการ' : 'View Schedule'}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-lg font-prompt font-bold text-slate-800 mb-2">
                            {locale === 'th' ? 'ลงทะเบียนเข้าร่วม' : 'Join Registration'}
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {locale === 'th' ? 
                              'ลงทะเบียนเข้าร่วมงาน CCI Climate Change Forum 2025 ได้ง่ายๆ และรับข้อมูลอัปเดตล่าสุด' : 
                              'Register for the CCI Climate Change Forum 2025 easily and receive the latest updates'}
                          </p>
                        </div>
                        <Link 
                          href={`/${locale}/register`}
                          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold group-hover:translate-x-1 transition-all duration-200 text-sm"
                        >
                          <span>{locale === 'th' ? 'ลงทะเบียนเลย' : 'Register Now'}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Directions Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-lg font-prompt font-bold text-slate-800 mb-2">
                            {locale === 'th' ? 'วิธีการเดินทาง' : 'Directions'}
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {locale === 'th' ? 
                              'ข้อมูลการเดินทางและแผนที่สำหรับงาน CCI Climate Change Forum 2025 ที่อาคาร M-Tower' : 
                              'Travel information and map for CCI Climate Change Forum 2025 at M-Tower Building'}
                          </p>
                        </div>
                        <Link 
                          href={`/${locale}/map`}
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold group-hover:translate-x-1 transition-all duration-200 text-sm"
                        >
                          <span>{locale === 'th' ? 'ดูวิธีการเดินทาง' : 'View Directions'}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="font-medium">
                    {locale === 'th' ? 
                      'งานนี้จัดขึ้นเพื่อสร้างความตระหนักและแบ่งปันความรู้เกี่ยวกับการเปลี่ยนแปลงสภาพภูมิอากาศ' : 
                      'This event is organized to raise awareness and share knowledge about climate change'}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main HomePage component - now synchronous
export default function HomePage({ params }) {
  const [locale, setLocale] = useState('th');
  
  useEffect(() => {
    // Handle the async params resolution
    const resolveParams = async () => {
      const resolvedParams = await params;
      const { locale: paramLocale = 'th' } = resolvedParams || {};
      setLocale(paramLocale);
    };
    
    resolveParams();
  }, [params]);
  
  return <HomePageContent locale={locale} />;
}