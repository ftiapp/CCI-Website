'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { getTranslations } from '@/i18n';

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-prompt font-bold text-earth-800 mb-6">
        {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
      </h1>
      
      <div className="prose prose-lg max-w-none font-prompt">
        {locale === 'th' ? (
          <>
            <p className="mb-4">
              สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย ให้ความสำคัญกับความเป็นส่วนตัวของท่าน 
              นโยบายความเป็นส่วนตัวนี้อธิบายถึงวิธีการที่เราเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของท่านผ่านเว็บไซต์ลงทะเบียนงานสัมมนาของเรา
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">1. ข้อมูลที่เราเก็บรวบรวม</h2>
            <p>เราอาจเก็บรวบรวมข้อมูลต่อไปนี้จากท่าน:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>ข้อมูลส่วนบุคคล: ชื่อ นามสกุล อีเมล หมายเลขโทรศัพท์</li>
              <li>ข้อมูลองค์กร: ชื่อองค์กร ประเภทองค์กร</li>
              <li>ข้อมูลการเข้าร่วม: รูปแบบการเข้าร่วม ห้องสัมมนาที่เลือก</li>
              <li>ข้อมูลการเดินทาง: วิธีการเดินทาง สถานที่เดินทางจาก</li>
              <li>ข้อมูลการใช้งานเว็บไซต์: ข้อมูลการเข้าชม คุกกี้ และข้อมูลการใช้งานอื่นๆ</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">2. วัตถุประสงค์ในการใช้ข้อมูล</h2>
            <p>เราใช้ข้อมูลที่เก็บรวบรวมเพื่อ:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>ดำเนินการลงทะเบียนและยืนยันการเข้าร่วมงานสัมมนา</li>
              <li>ติดต่อสื่อสารกับท่านเกี่ยวกับงานสัมมนา</li>
              <li>จัดเตรียมเอกสารและสิ่งอำนวยความสะดวกสำหรับงานสัมมนา</li>
              <li>วิเคราะห์และปรับปรุงบริการของเรา</li>
              <li>ปฏิบัติตามข้อกำหนดทางกฎหมาย</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">3. การเปิดเผยข้อมูล</h2>
            <p>
              เราอาจเปิดเผยข้อมูลส่วนบุคคลของท่านในกรณีต่อไปนี้:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>กับพันธมิตรและผู้ให้บริการที่เกี่ยวข้องกับการจัดงานสัมมนา</li>
              <li>เมื่อมีการร้องขอโดยหน่วยงานรัฐที่มีอำนาจตามกฎหมาย</li>
              <li>เพื่อปกป้องสิทธิ ทรัพย์สิน หรือความปลอดภัยของเรา ของท่าน หรือของบุคคลอื่น</li>
            </ul>
            <p>
              เราจะไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอก
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">4. การรักษาความปลอดภัยของข้อมูล</h2>
            <p>
              เราใช้มาตรการรักษาความปลอดภัยทางเทคนิคและทางองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของท่านจากการสูญหาย การเข้าถึงโดยไม่ได้รับอนุญาต 
              การเปิดเผย การดัดแปลง หรือการทำลาย อย่างไรก็ตาม โปรดทราบว่าไม่มีวิธีการส่งข้อมูลผ่านอินเทอร์เน็ตหรือวิธีการจัดเก็บข้อมูลอิเล็กทรอนิกส์ใดที่ปลอดภัย 100%
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">5. สิทธิของท่าน</h2>
            <p>ท่านมีสิทธิต่อไปนี้เกี่ยวกับข้อมูลส่วนบุคคลของท่าน:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>สิทธิในการเข้าถึงและรับสำเนาข้อมูลส่วนบุคคลของท่าน</li>
              <li>สิทธิในการแก้ไขข้อมูลส่วนบุคคลที่ไม่ถูกต้อง</li>
              <li>สิทธิในการลบข้อมูลส่วนบุคคลในบางกรณี</li>
              <li>สิทธิในการคัดค้านการประมวลผลข้อมูลส่วนบุคคลในบางกรณี</li>
              <li>สิทธิในการจำกัดการประมวลผลข้อมูลส่วนบุคคลในบางกรณี</li>
            </ul>
            <p>
              หากท่านต้องการใช้สิทธิเหล่านี้หรือมีคำถามเกี่ยวกับการประมวลผลข้อมูลส่วนบุคคลของท่าน โปรดติดต่อเราตามรายละเอียดที่ให้ไว้ด้านล่าง
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">6. การเก็บรักษาข้อมูล</h2>
            <p>
              เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านตราบเท่าที่จำเป็นเพื่อให้บรรลุวัตถุประสงค์ที่ระบุไว้ในนโยบายความเป็นส่วนตัวนี้ 
              เว้นแต่จะมีความจำเป็นต้องเก็บรักษาไว้นานกว่านั้นเพื่อปฏิบัติตามข้อผูกพันทางกฎหมาย แก้ไขข้อพิพาท หรือบังคับใช้ข้อตกลงของเรา
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">7. การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว</h2>
            <p>
              เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงจะมีผลเมื่อเราโพสต์นโยบายที่แก้ไขบนเว็บไซต์นี้ 
              เราขอแนะนำให้ท่านตรวจสอบนโยบายนี้เป็นระยะเพื่อรับทราบการเปลี่ยนแปลงใดๆ
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">8. การติดต่อเรา</h2>
            <p>
              หากท่านมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้หรือการปฏิบัติด้านความเป็นส่วนตัวของเรา โปรดติดต่อเราที่:
            </p>
            <p className="mb-4">
              สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI)<br />
              สภาอุตสาหกรรมแห่งประเทศไทย<br />
              อีเมล: cci@fti.or.th<br />
              โทรศัพท์: 02-345-1000
            </p>
            
            <p className="mt-8 text-sm text-earth-600">
              อัปเดตล่าสุด: 17 มิถุนายน 2568
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">
              The Climate Change Institute (CCI), The Federation of Thai Industries, values your privacy. 
              This Privacy Policy explains how we collect, use, and disclose your personal information through our seminar registration website.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">1. Information We Collect</h2>
            <p>We may collect the following information from you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Personal information: name, surname, email, phone number</li>
              <li>Organization information: organization name, organization type</li>
              <li>Attendance information: attendance type, selected seminar room</li>
              <li>Transportation information: transportation method, travel origin</li>
              <li>Website usage information: visit data, cookies, and other usage data</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">2. Purpose of Information Use</h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Process registration and confirm seminar attendance</li>
              <li>Communicate with you about the seminar</li>
              <li>Prepare documents and facilities for the seminar</li>
              <li>Analyze and improve our services</li>
              <li>Comply with legal requirements</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">3. Information Disclosure</h2>
            <p>
              We may disclose your personal information in the following cases:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With partners and service providers related to the seminar organization</li>
              <li>When requested by authorized government agencies</li>
              <li>To protect our rights, property, or safety, or that of you or others</li>
            </ul>
            <p>
              We will not sell or rent your personal information to third parties.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information from loss, unauthorized access, 
              disclosure, alteration, or destruction. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">5. Your Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Right to access and receive a copy of your personal information</li>
              <li>Right to rectify inaccurate personal information</li>
              <li>Right to erasure of personal information in certain cases</li>
              <li>Right to object to processing of personal information in certain cases</li>
              <li>Right to restriction of processing of personal information in certain cases</li>
            </ul>
            <p>
              If you wish to exercise these rights or have questions about the processing of your personal information, please contact us using the details provided below.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">6. Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required or permitted by law for legal obligations, dispute resolution, or enforcement of our agreements.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">7. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be effective when we post the revised policy on this website. 
              We encourage you to periodically review this policy for any changes.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-4">
              Climate Change Institute (CCI)<br />
              The Federation of Thai Industries<br />
              Email: cci@fti.or.th<br />
              Phone: 02-345-1000
            </p>
            
            <p className="mt-8 text-sm text-earth-600">
              Last updated: June 17, 2025
            </p>
          </>
        )}
      </div>
    </div>
  );
}
