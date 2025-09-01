'use client';

import { FormContainer } from './form';
import Link from 'next/link';
import Image from 'next/image';

export default function RegistrationForm({ 
  locale, 
  organizationTypes, 
  industryTypes,
  transportationTypes, 
  seminarRooms,
  bangkokDistricts,
  provinces,
  privateAccess = false,
}) {
  // Toggle to control registration availability
  const REGISTRATION_CLOSED = true; // set to false to re-open

  if (REGISTRATION_CLOSED && !privateAccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white/70 backdrop-blur rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="relative h-80 md:h-96 w-full bg-gradient-to-r from-emerald-600 to-teal-600">
            <Image
              src="/cci-forum-banner2.png"
              alt="CCI Climate Change Forum"
              fill
              className="object-cover"
              style={{ objectPosition: 'center 25%' }}
              priority
            />
          </div>
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-prompt font-semibold text-gray-900 mb-4">
              ขอบคุณทุกท่านที่ให้ความสนใจเข้าร่วมงาน
            </h1>
            <p className="text-gray-700 leading-7 mb-6 font-prompt">
              ขณะนี้ได้ปิดระบบลงทะเบียนเรียบร้อยแล้ว<br />
              แล้วพบกันในงาน <span className="font-semibold">CCI Climate Change Forum 2025</span> ในวันที่
              <span className="font-semibold"> 15 กันยายน 2568</span>
            </p>
            <div className="grid gap-3 sm:flex sm:gap-4">
              <Link
                href={`/${locale}/schedule`}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 text-white px-5 py-3 font-medium hover:bg-emerald-700 transition-colors"
              >
                ดูกำหนดการ              </Link>
              <Link
                href={`/${locale}/ticket-lookup`}
                className="inline-flex items-center justify-center rounded-lg bg-white text-emerald-700 ring-1 ring-emerald-600/30 px-5 py-3 font-medium hover:bg-emerald-50 transition-colors"
              >
                ดูตั๋ว
              </Link>
              <Link
                href={`/${locale}/map`}
                className="inline-flex items-center justify-center rounded-lg bg-white text-emerald-700 ring-1 ring-emerald-600/30 px-5 py-3 font-medium hover:bg-emerald-50 transition-colors"
              >
                แผนที่และการเดินทาง
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormContainer
      locale={locale}
      organizationTypes={organizationTypes}
      industryTypes={industryTypes}
      transportationTypes={transportationTypes}
      seminarRooms={seminarRooms}
      bangkokDistricts={bangkokDistricts}
      provinces={provinces}
      // private access only influences visibility here; the form logic remains the same
    />
  );
}