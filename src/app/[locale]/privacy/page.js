'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { getTranslations } from '@/i18n';
import { ShieldCheckIcon, LockClosedIcon, EyeIcon, UserIcon } from '@heroicons/react/24/outline';

export default function PrivacyPolicy({ params }) {
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <ShieldCheckIcon className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-prompt font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-6">
            {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {locale === 'th' ? 
              'เราให้ความสำคัญกับความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของคุณ' : 
              'We value your privacy and the protection of your personal data'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Introduction Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100 mb-12 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <LockClosedIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-3">
                  {locale === 'th' ? 'ข้อมูลสำคัญ' : 'Important Information'}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {locale === 'th' ? 
                    'สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย ให้ความสำคัญกับความเป็นส่วนตัวของท่าน นโยบายความเป็นส่วนตัวนี้อธิบายถึงวิธีการที่เราเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่านผ่านเว็บไซต์ลงทะเบียนงานสัมมนาของเรา' : 
                    'The Climate Change Institute (CCI), The Federation of Thai Industries, values your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information through our seminar registration website.'}
                </p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {locale === 'th' ? (
              <>
                {/* Section 1 */}
                <div className="bg-gradient-to-r from-white to-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                      <EyeIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">1. ข้อมูลที่เราเก็บรวบรวม</h2>
                  </div>
                  <p className="text-slate-600 mb-4">เราอาจเก็บรวบรวมข้อมูลต่อไปนี้จากท่าน:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">ข้อมูลส่วนบุคคล</h4>
                      <p className="text-sm text-slate-600">ชื่อ นามสกุล อีเมล หมายเลขโทรศัพท์</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">ข้อมูลองค์กร</h4>
                      <p className="text-sm text-slate-600">ชื่อองค์กร ประเภทองค์กร</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">ข้อมูลการเข้าร่วม</h4>
                      <p className="text-sm text-slate-600">รูปแบบการเข้าร่วม ห้องสัมมนาที่เลือก</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">ข้อมูลการเดินทาง</h4>
                      <p className="text-sm text-slate-600">วิธีการเดินทาง สถานที่เดินทางจาก</p>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">2. วัตถุประสงค์ในการใช้ข้อมูล</h2>
                  </div>
                  <p className="text-slate-600 mb-4">เราใช้ข้อมูลที่เก็บรวบรวมเพื่อ:</p>
                  <div className="space-y-3">
                    {[
                      'ดำเนินการลงทะเบียนและยืนยันการเข้าร่วมงานสัมมนา',
                      'ติดต่อสื่อสารกับท่านเกี่ยวกับงานสัมมนา',
                      'จัดเตรียมเอกสารและสิ่งอำนวยความสะดวกสำหรับงานสัมมนา',
                      'วิเคราะห์และปรับปรุงบริการของเรา',
                      'ปฏิบัติตามข้อกำหนดทางกฎหมาย'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue with other sections... */}
                {/* I'll add the remaining sections following the same pattern */}
                
                {/* Section 3 - Information Disclosure */}
                <div className="bg-gradient-to-r from-white to-orange-50 p-8 rounded-2xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">3. การเปิดเผยข้อมูล</h2>
                  </div>
                  <p className="text-slate-600 mb-4">เราอาจเปิดเผยข้อมูลส่วนบุคคลของท่านในกรณีต่อไปนี้:</p>
                  <div className="space-y-3">
                    {[
                      'กับพันธมิตรและผู้ให้บริการที่เกี่ยวข้องกับการจัดงานสัมมนา',
                      'เมื่อมีการร้องขอโดยหน่วยงานรัฐที่มีอำนาจตามกฎหมาย',
                      'เพื่อปกป้องสิทธิ ทรัพย์สิน หรือความปลอดภัยของเรา ของท่าน หรือของบุคคลอื่น'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-orange-100">
                        <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <p className="text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-slate-600 text-sm">
                      เราจะไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอก
                    </p>
                  </div>
                </div>

                {/* Section 4 - Data Security */}
                <div className="bg-gradient-to-r from-white to-purple-50 p-8 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-4">
                      <LockClosedIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">4. การรักษาความปลอดภัยของข้อมูล</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-purple-100">
                    <p className="text-slate-600 leading-relaxed">
                      เราใช้มาตรการรักษาความปลอดภัยทางเทคนิคและทางองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของท่านจากการสูญหาย การเข้าถึงโดยไม่ได้รับอนุญาต 
                      การเปิดเผย การดัดแปลง หรือการทำลาย อย่างไรก็ตาม โปรดทราบว่าไม่มีวิธีการส่งข้อมูลผ่านอินเทอร์เน็ตหรือวิธีการจัดเก็บข้อมูลอิเล็กทรอนิกส์ใดที่ปลอดภัย 100%
                    </p>
                  </div>
                </div>

                {/* Section 5 - Your Rights */}
                <div className="bg-gradient-to-r from-white to-indigo-50 p-8 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">5. สิทธิของท่าน</h2>
                  </div>
                  <p className="text-slate-600 mb-4">ท่านมีสิทธิต่อไปนี้เกี่ยวกับข้อมูลส่วนบุคคลของท่าน:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'สิทธิในการเข้าถึงและรับสำเนาข้อมูลส่วนบุคคลของท่าน',
                      'สิทธิในการแก้ไขข้อมูลส่วนบุคคลที่ไม่ถูกต้อง',
                      'สิทธิในการลบข้อมูลส่วนบุคคลในบางกรณี',
                      'สิทธิในการคัดค้านการประมวลผลข้อมูลส่วนบุคคลในบางกรณี',
                      'สิทธิในการจำกัดการประมวลผลข้อมูลส่วนบุคคลในบางกรณี'
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-indigo-100">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                          <p className="text-slate-600 text-sm">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-slate-600 text-sm">
                      หากท่านต้องการใช้สิทธิเหล่านี้หรือมีคำถามเกี่ยวกับการประมวลผลข้อมูลส่วนบุคคลของท่าน โปรดติดต่อเราตามรายละเอียดที่ให้ไว้ด้านล่าง
                    </p>
                  </div>
                </div>

                {/* Section 6 - Data Retention */}
                <div className="bg-gradient-to-r from-white to-cyan-50 p-8 rounded-2xl border border-cyan-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">6</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">6. การเก็บรักษาข้อมูล</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-cyan-100">
                    <p className="text-slate-600 leading-relaxed">
                      เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านตราบเท่าที่จำเป็นเพื่อให้บรรลุวัตถุประสงค์ที่ระบุไว้ในนโยบายความเป็นส่วนตัวนี้ 
                      เว้นแต่จะมีความจำเป็นต้องเก็บรักษาไว้นานกว่านั้นเพื่อปฏิบัติตามข้อผูกพันทางกฎหมาย แก้ไขข้อพิพาท หรือบังคับใช้ข้อตกลงของเรา
                    </p>
                  </div>
                </div>

                {/* Section 7 - Policy Changes */}
                <div className="bg-gradient-to-r from-white to-amber-50 p-8 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">7</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">7. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-amber-100">
                    <p className="text-slate-600 leading-relaxed">
                      เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงจะมีผลเมื่อเราโพสต์นโยบายที่แก้ไขบนเว็บไซต์นี้ 
                      เราขอแนะนำให้ท่านตรวจสอบนโยบายนี้เป็นระยะเพื่อรับทราบการเปลี่ยนแปลงใดๆ
                    </p>
                  </div>
                </div>

                {/* Section 8 - Contact */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">8. การติดต่อเรา</h2>
                  </div>
                  <p className="text-slate-600 mb-6">
                    หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้หรือการปฏิบัติด้านความเป็นส่วนตัวของเรา โปรดติดต่อเราที่:
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-emerald-100">
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-800">สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI)</p>
                      <p className="text-slate-600">สภาอุตสาหกรรมแห่งประเทศไทย</p>
                      <p className="text-slate-600">อีเมล: cci@fti.or.th</p>
                      <p className="text-slate-600">โทรศัพท์: 02-345-1000</p>
                    </div>
                  </div>
                  
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
                <div className="bg-gradient-to-r from-white to-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                      <EyeIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">1. Information We Collect</h2>
                  </div>
                  <p className="text-slate-600 mb-4">We may collect the following information from you:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Personal Information</h4>
                      <p className="text-sm text-slate-600">name, surname, email, phone number</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Organization Information</h4>
                      <p className="text-sm text-slate-600">organization name, organization type</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Attendance Information</h4>
                      <p className="text-sm text-slate-600">attendance type, selected seminar room</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <h4 className="font-semibold text-slate-800 mb-2">Transportation Information</h4>
                      <p className="text-sm text-slate-600">transportation method, travel origin</p>
                    </div>
                  </div>
                </div>

                {/* Section 2 - Purpose of Information Use */}
                <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">2. Purpose of Information Use</h2>
                  </div>
                  <p className="text-slate-600 mb-4">We use the collected information to:</p>
                  <div className="space-y-3">
                    {[
                      'Process registration and confirm seminar attendance',
                      'Communicate with you about the seminar',
                      'Prepare documents and facilities for the seminar',
                      'Analyze and improve our services',
                      'Comply with legal requirements'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <p className="text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3 - Information Disclosure */}
                <div className="bg-gradient-to-r from-white to-orange-50 p-8 rounded-2xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">3. Information Disclosure</h2>
                  </div>
                  <p className="text-slate-600 mb-4">We may disclose your personal information in the following cases:</p>
                  <div className="space-y-3">
                    {[
                      'With partners and service providers related to the seminar organization',
                      'When requested by authorized government agencies',
                      'To protect our rights, property, or safety, or that of you or others'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-orange-100">
                        <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <p className="text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-slate-600 text-sm">
                      We will not sell or rent your personal information to third parties.
                    </p>
                  </div>
                </div>

                {/* Section 4 - Data Security */}
                <div className="bg-gradient-to-r from-white to-purple-50 p-8 rounded-2xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-4">
                      <LockClosedIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">4. Data Security</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-purple-100">
                    <p className="text-slate-600 leading-relaxed">
                      We implement appropriate technical and organizational security measures to protect your personal information from loss, unauthorized access, 
                      disclosure, alteration, or destruction. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                    </p>
                  </div>
                </div>

                {/* Section 5 - Your Rights */}
                <div className="bg-gradient-to-r from-white to-indigo-50 p-8 rounded-2xl border border-indigo-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">5. Your Rights</h2>
                  </div>
                  <p className="text-slate-600 mb-4">You have the following rights regarding your personal information:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Right to access and receive a copy of your personal information',
                      'Right to rectify inaccurate personal information',
                      'Right to erasure of personal information in certain cases',
                      'Right to object to processing of personal information in certain cases',
                      'Right to restriction of processing of personal information in certain cases'
                    ].map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-indigo-100">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                          <p className="text-slate-600 text-sm">{item}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <p className="text-slate-600 text-sm">
                      If you wish to exercise these rights or have questions about the processing of your personal information, please contact us using the details provided below.
                    </p>
                  </div>
                </div>

                {/* Section 6 - Data Retention */}
                <div className="bg-gradient-to-r from-white to-cyan-50 p-8 rounded-2xl border border-cyan-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">6</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">6. Data Retention</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-cyan-100">
                    <p className="text-slate-600 leading-relaxed">
                      We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                      unless a longer retention period is required or permitted by law for legal obligations, dispute resolution, or enforcement of our agreements.
                    </p>
                  </div>
                </div>

                {/* Section 7 - Changes to Privacy Policy */}
                <div className="bg-gradient-to-r from-white to-amber-50 p-8 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">7</span>
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">7. Changes to Privacy Policy</h2>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-amber-100">
                    <p className="text-slate-600 leading-relaxed">
                      We may update this Privacy Policy from time to time. Changes will be effective when we post the revised policy on this website. 
                      We encourage you to periodically review this policy for any changes.
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-200 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-prompt font-bold text-slate-800">8. Contact Us</h2>
                  </div>
                  <p className="text-slate-600 mb-6">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                  </p>
                  <div className="bg-white p-6 rounded-xl border border-emerald-100">
                    <div className="space-y-2">
                      <p className="font-semibold text-slate-800">Climate Change Institute (CCI)</p>
                      <p className="text-slate-600">Federation of Thai Industries</p>
                      <p className="text-slate-600">Email: cci@fti.or.th</p>
                      <p className="text-slate-600">Phone: 02-345-1000</p>
                    </div>
                  </div>
                  
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