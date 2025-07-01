'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { getTranslations } from '@/i18n';
import { DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function TermsOfService({ params }) {
  // Use React.use() to unwrap params as required in Next.js 15
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || 'th';
  const t = getTranslations(locale);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 to-red-100/20"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-red-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6 shadow-lg">
            <DocumentTextIcon className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-prompt font-bold bg-gradient-to-r from-orange-700 to-red-700 bg-clip-text text-transparent mb-6">
            {locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {locale === 'th' ? 
              'โปรดอ่านข้อกำหนดการใช้งานอย่างละเอียดก่อนใช้บริการของเรา' : 
              'Please read the terms of service carefully before using our services'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Introduction Card */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100 mb-12 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-3">
                  {locale === 'th' ? 'ข้อกำหนดสำคัญ' : 'Important Terms'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {locale === 'th' ? 
                    'ยินดีต้อนรับสู่เว็บไซต์ลงทะเบียนงานสัมมนาของสถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย โปรดอ่านข้อกำหนดการใช้งานต่อไปนี้อย่างละเอียดก่อนใช้บริการของเรา การใช้บริการของเราถือว่าท่านยอมรับข้อกำหนดเหล่านี้' : 
                    'Welcome to the seminar registration website of the Climate Change Institute (CCI), The Federation of Thai Industries. Please read the following terms of service carefully before using our services. By using our services, you agree to these terms.'}
                </p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {locale === 'th' ? (
              <>
                {/* Section 1 - Acceptance */}
                <div className="bg-gradient-to-r from-white to-green-50 p-8 rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                      <CheckCircleIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">1. การยอมรับข้อกำหนด</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-green-100">
                    <p className="text-slate-600 leading-relaxed">
                      โดยการเข้าถึงและใช้เว็บไซต์นี้ ท่านยอมรับที่จะผูกพันตามข้อกำหนดและเงื่อนไขการใช้งานเหล่านี้ 
                      หากท่านไม่ยอมรับข้อกำหนดและเงื่อนไขทั้งหมด โปรดหยุดใช้เว็บไซต์นี้ทันที
                    </p>
                  </div>
                </div>

                {/* Section 2 - Registration */}
                <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">2. การลงทะเบียนและข้อมูลส่วนบุคคล</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-blue-100">
                    <p className="text-slate-600 leading-relaxed">
                      เมื่อท่านลงทะเบียนเพื่อเข้าร่วมงานสัมมนาของเรา ท่านตกลงที่จะให้ข้อมูลที่เป็นปัจจุบัน ถูกต้อง และสมบูรณ์ 
                      ท่านเป็นผู้รับผิดชอบในการรักษาความลับของข้อมูลส่วนบุคคลของท่าน 
                      โปรดอ่านนโยบายความเป็นส่วนตัวของเราเพื่อทำความเข้าใจวิธีที่เราเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่าน
                    </p>
                  </div>
                </div>

                {/* Section 3 - Permitted Use */}
                <div className="bg-gradient-to-r from-white to-purple-50 p-8 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">3. การใช้งานที่ได้รับอนุญาต</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-purple-100">
                    <p className="text-slate-600 leading-relaxed">
                      ท่านได้รับอนุญาตให้เข้าถึงและใช้เว็บไซต์นี้สำหรับการลงทะเบียนเข้าร่วมงานสัมมนาและการใช้งานส่วนบุคคลที่ไม่เกี่ยวข้องกับการค้าเท่านั้น 
                      การใช้งานเว็บไซต์นี้ต้องไม่ละเมิดกฎหมายหรือข้อบังคับใดๆ
                    </p>
                  </div>
                </div>

                {/* Section 4 - Restrictions */}
                <div className="bg-gradient-to-r from-white to-yellow-50 p-8 rounded-2xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                      <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">4. ข้อจำกัดการใช้งาน</h2>
                  </div>
                  <p className="text-slate-600 mb-4">ท่านตกลงที่จะไม่:</p>
                  <div className="space-y-3">
                    {[
                      'ใช้เว็บไซต์นี้ในลักษณะที่อาจทำให้เว็บไซต์เสียหาย ถูกปิดการใช้งาน มีภาระเกินควร หรือด้อยประสิทธิภาพ',
                      'ใช้เว็บไซต์นี้สำหรับการโฆษณาหรือข้อเสนอเชิงพาณิชย์ใดๆ',
                      'พยายามเข้าถึงส่วนใดของเว็บไซต์หรือเซิร์ฟเวอร์ที่ไม่ได้รับอนุญาต',
                      'แทรกแซงการทำงานปกติของเว็บไซต์'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-yellow-100">
                        <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <p className="text-slate-600 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5 - Intellectual Property */}
                <div className="bg-gradient-to-r from-white to-cyan-50 p-8 rounded-2xl border border-cyan-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">5</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">5. ทรัพย์สินทางปัญญา</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-cyan-100">
                    <p className="text-slate-600 leading-relaxed">
                      เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงแต่ไม่จำกัดเพียงข้อความ กราฟิก โลโก้ ไอคอน รูปภาพ คลิปเสียง วิดีโอ และซอฟต์แวร์ 
                      เป็นทรัพย์สินของสถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย และได้รับการคุ้มครองโดยกฎหมายทรัพย์สินทางปัญญาของไทยและระหว่างประเทศ
                    </p>
                  </div>
                </div>

                {/* Section 6 - Disclaimer */}
                <div className="bg-gradient-to-r from-white to-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">6</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">6. การปฏิเสธความรับผิด</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <p className="text-slate-600 leading-relaxed">
                      เว็บไซต์นี้จัดเตรียมให้ "ตามสภาพที่เป็นอยู่" และ "ตามที่มีให้บริการ" โดยไม่มีการรับประกันใดๆ ทั้งสิ้น 
                      สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย ไม่รับประกันว่าเว็บไซต์นี้จะปราศจากข้อผิดพลาด 
                      ไม่หยุดชะงัก ปลอดภัย หรือปราศจากองค์ประกอบที่เป็นอันตราย
                    </p>
                  </div>
                </div>

                {/* Section 7 - Limitation of Liability */}
                <div className="bg-gradient-to-r from-white to-rose-50 p-8 rounded-2xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">7</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">7. ข้อจำกัดความรับผิด</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-rose-100">
                    <p className="text-slate-600 leading-relaxed">
                      ในขอบเขตสูงสุดที่กฎหมายอนุญาต สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย 
                      จะไม่รับผิดต่อความเสียหายทางตรง ทางอ้อม อุบัติเหตุ พิเศษ หรือที่เป็นผลสืบเนื่อง อันเกิดจากการใช้หรือไม่สามารถใช้เว็บไซต์นี้ได้
                    </p>
                  </div>
                </div>

                {/* Section 8 - Changes to Terms */}
                <div className="bg-gradient-to-r from-white to-amber-50 p-8 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">8</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">8. การเปลี่ยนแปลงข้อกำหนด</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-amber-100">
                    <p className="text-slate-600 leading-relaxed">
                      สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย ขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดเหล่านี้ได้ทุกเมื่อ 
                      การเปลี่ยนแปลงจะมีผลทันทีที่โพสต์บนเว็บไซต์นี้ การใช้งานเว็บไซต์อย่างต่อเนื่องหลังจากการเปลี่ยนแปลงดังกล่าวถือว่าท่านยอมรับข้อกำหนดที่แก้ไขแล้ว
                    </p>
                  </div>
                </div>

                {/* Section 9 - Governing Law */}
                <div className="bg-gradient-to-r from-white to-indigo-50 p-8 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <ScaleIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">9. กฎหมายที่ใช้บังคับ</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-indigo-100">
                    <p className="text-slate-600 leading-relaxed">
                      ข้อกำหนดเหล่านี้อยู่ภายใต้และตีความตามกฎหมายของประเทศไทย และท่านยอมรับเขตอำนาจศาลไทยโดยเด็ดขาดสำหรับข้อพิพาทใดๆ ที่เกิดขึ้นจากหรือเกี่ยวข้องกับการใช้เว็บไซต์นี้
                    </p>
                  </div>
                </div>

                {/* Section 10 - Contact */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">10</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">10. การติดต่อ</h2>
                  </div>
                  <p className="text-slate-600 mb-6">
                    หากท่านมีคำถามเกี่ยวกับข้อกำหนดเหล่านี้ โปรดติดต่อเราที่ cci@fti.or.th
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-emerald-200">
                    <p className="text-sm text-slate-500 text-center">
                      อัปเดตล่าสุด: 17 มิถุนายน 2568
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* English version with similar styling */}
                <div className="bg-gradient-to-r from-white to-green-50 p-8 rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                      <CheckCircleIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">1. Acceptance of Terms</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-green-100">
                    <p className="text-slate-600 leading-relaxed">
                      By accessing and using this website, you agree to be bound by these terms and conditions of use. 
                      If you do not agree to all the terms and conditions, please discontinue using this website immediately.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">2. Registration and Personal Information</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-blue-100">
                    <p className="text-slate-600 leading-relaxed">
                      When you register for our seminar, you agree to provide current, accurate, and complete information. 
                      You are responsible for maintaining the confidentiality of your personal information. 
                      Please read our Privacy Policy to understand how we collect and use your personal information.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-purple-50 p-8 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">3. Permitted Use</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-purple-100">
                    <p className="text-slate-600 leading-relaxed">
                      You are permitted to access and use this website for seminar registration and personal, non-commercial use only. 
                      Use of this website must not violate any applicable laws or regulations.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-yellow-50 p-8 rounded-2xl border border-yellow-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                      <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">4. Restrictions on Use</h2>
                  </div>
                  <p className="text-slate-600 mb-4">You agree not to:</p>
                  <div className="space-y-3">
                    {[
                      'Use this website in any way that may damage, disable, overburden, or impair the website',
                      'Use this website for any advertising or commercial solicitation',
                      'Attempt to access any part of the website or servers that you are not authorized to access',
                      'Interfere with the normal functioning of the website'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-yellow-100">
                        <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <p className="text-slate-600 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5 - Intellectual Property */}
                <div className="bg-gradient-to-r from-white to-cyan-50 p-8 rounded-2xl border border-cyan-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">5</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">5. Intellectual Property</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-cyan-100">
                    <p className="text-slate-600 leading-relaxed">
                      All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, videos, and software, 
                      is the property of the Climate Change Institute (CCI), Federation of Thai Industries, and is protected by Thai and international intellectual property laws.
                    </p>
                  </div>
                </div>

                {/* Section 6 - Disclaimer */}
                <div className="bg-gradient-to-r from-white to-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">6</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">6. Disclaimer</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-100">
                    <p className="text-slate-600 leading-relaxed">
                      This website is provided "as is" and "as available" without any warranties of any kind. 
                      The Climate Change Institute (CCI), Federation of Thai Industries, does not warrant that this website will be error-free, 
                      uninterrupted, secure, or free from harmful components.
                    </p>
                  </div>
                </div>

                {/* Section 7 - Limitation of Liability */}
                <div className="bg-gradient-to-r from-white to-rose-50 p-8 rounded-2xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">7</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">7. Limitation of Liability</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-rose-100">
                    <p className="text-slate-600 leading-relaxed">
                      To the maximum extent permitted by law, the Climate Change Institute (CCI), Federation of Thai Industries, 
                      shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use this website.
                    </p>
                  </div>
                </div>

                {/* Section 8 - Changes to Terms */}
                <div className="bg-gradient-to-r from-white to-amber-50 p-8 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">8</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">8. Changes to Terms</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-amber-100">
                    <p className="text-slate-600 leading-relaxed">
                      The Climate Change Institute (CCI), Federation of Thai Industries, reserves the right to change these terms at any time. 
                      Changes will be effective immediately upon posting on this website. Your continued use of the website after such changes constitutes your acceptance of the revised terms.
                    </p>
                  </div>
                </div>

                {/* Section 9 - Governing Law */}
                <div className="bg-gradient-to-r from-white to-indigo-50 p-8 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <ScaleIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">9. Governing Law</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-indigo-100">
                    <p className="text-slate-600 leading-relaxed">
                      These terms are governed by and construed in accordance with the laws of Thailand, and you irrevocably submit to the exclusive jurisdiction of the Thai courts for any disputes arising out of or relating to the use of this website.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">10</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">10. Contact</h2>
                  </div>
                  <p className="text-slate-600 mb-6">
                    If you have any questions about these terms, please contact us at cci@fti.or.th
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-emerald-200">
                    <p className="text-sm text-slate-500 text-center">
                      Last updated: June 17, 2025
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}