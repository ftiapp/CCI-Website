'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { getTranslations } from '@/i18n';

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-prompt font-bold text-earth-800 mb-6">
        {locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}
      </h1>
      
      <div className="prose prose-lg max-w-none font-prompt">
        {locale === 'th' ? (
          <>
            <p className="mb-4">
              ยินดีต้อนรับสู่เว็บไซต์ลงทะเบียนงานสัมมนาของสถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย 
              โปรดอ่านข้อกำหนดการใช้งานต่อไปนี้อย่างละเอียดก่อนใช้บริการของเรา การใช้บริการของเราถือว่าท่านยอมรับข้อกำหนดเหล่านี้
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">1. การยอมรับข้อกำหนด</h2>
            <p>
              โดยการเข้าถึงและใช้เว็บไซต์นี้ ท่านยอมรับที่จะผูกพันตามข้อกำหนดและเงื่อนไขการใช้งานเหล่านี้ 
              หากท่านไม่ยอมรับข้อกำหนดและเงื่อนไขทั้งหมด โปรดหยุดใช้เว็บไซต์นี้ทันที
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">2. การลงทะเบียนและข้อมูลส่วนบุคคล</h2>
            <p>
              เมื่อท่านลงทะเบียนเพื่อเข้าร่วมงานสัมมนาของเรา ท่านตกลงที่จะให้ข้อมูลที่เป็นปัจจุบัน ถูกต้อง และสมบูรณ์ 
              ท่านเป็นผู้รับผิดชอบในการรักษาความลับของข้อมูลส่วนบุคคลของท่าน 
              โปรดอ่านนโยบายความเป็นส่วนตัวของเราเพื่อทำความเข้าใจวิธีที่เราเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่าน
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">3. การใช้งานที่ได้รับอนุญาต</h2>
            <p>
              ท่านได้รับอนุญาตให้เข้าถึงและใช้เว็บไซต์นี้สำหรับการลงทะเบียนเข้าร่วมงานสัมมนาและการใช้งานส่วนบุคคลที่ไม่เกี่ยวข้องกับการค้าเท่านั้น 
              การใช้งานเว็บไซต์นี้ต้องไม่ละเมิดกฎหมายหรือข้อบังคับใดๆ
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">4. ข้อจำกัดการใช้งาน</h2>
            <p>ท่านตกลงที่จะไม่:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>ใช้เว็บไซต์นี้ในลักษณะที่อาจทำให้เว็บไซต์เสียหาย ถูกปิดการใช้งาน มีภาระเกินควร หรือด้อยประสิทธิภาพ</li>
              <li>ใช้เว็บไซต์นี้สำหรับการโฆษณาหรือข้อเสนอเชิงพาณิชย์ใดๆ</li>
              <li>พยายามเข้าถึงส่วนใดของเว็บไซต์หรือเซิร์ฟเวอร์ที่ไม่ได้รับอนุญาต</li>
              <li>แทรกแซงการทำงานปกติของเว็บไซต์</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">5. ทรัพย์สินทางปัญญา</h2>
            <p>
              เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงแต่ไม่จำกัดเพียงข้อความ กราฟิก โลโก้ ไอคอน รูปภาพ คลิปเสียง วิดีโอ และซอฟต์แวร์ 
              เป็นทรัพย์สินของสถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย และได้รับการคุ้มครองโดยกฎหมายทรัพย์สินทางปัญญาของไทยและระหว่างประเทศ
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">6. การปฏิเสธความรับผิด</h2>
            <p>
              เว็บไซต์นี้จัดเตรียมให้ "ตามสภาพที่เป็นอยู่" และ "ตามที่มีให้บริการ" โดยไม่มีการรับประกันใดๆ ทั้งสิ้น 
              สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย ไม่รับประกันว่าเว็บไซต์นี้จะปราศจากข้อผิดพลาด 
              ไม่หยุดชะงัก ปลอดภัย หรือปราศจากองค์ประกอบที่เป็นอันตราย
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">7. ข้อจำกัดความรับผิด</h2>
            <p>
              ในขอบเขตสูงสุดที่กฎหมายอนุญาต สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย 
              จะไม่รับผิดต่อความเสียหายทางตรง ทางอ้อม อุบัติเหตุ พิเศษ หรือที่เป็นผลสืบเนื่อง อันเกิดจากการใช้หรือไม่สามารถใช้เว็บไซต์นี้ได้
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">8. การเปลี่ยนแปลงข้อกำหนด</h2>
            <p>
              สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI) สภาอุตสาหกรรมแห่งประเทศไทย ขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดเหล่านี้ได้ทุกเมื่อ 
              การเปลี่ยนแปลงจะมีผลทันทีที่โพสต์บนเว็บไซต์นี้ การใช้งานเว็บไซต์อย่างต่อเนื่องหลังจากการเปลี่ยนแปลงดังกล่าวถือว่าท่านยอมรับข้อกำหนดที่แก้ไขแล้ว
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">9. กฎหมายที่ใช้บังคับ</h2>
            <p>
              ข้อกำหนดเหล่านี้อยู่ภายใต้และตีความตามกฎหมายของประเทศไทย และท่านยอมรับเขตอำนาจศาลไทยโดยเด็ดขาดสำหรับข้อพิพาทใดๆ ที่เกิดขึ้นจากหรือเกี่ยวข้องกับการใช้เว็บไซต์นี้
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">10. การติดต่อ</h2>
            <p>
              หากท่านมีคำถามเกี่ยวกับข้อกำหนดเหล่านี้ โปรดติดต่อเราที่ cci@fti.or.th
            </p>
            
            <p className="mt-8 text-sm text-earth-600">
              อัปเดตล่าสุด: 17 มิถุนายน 2568
            </p>
          </>
        ) : (
          <>
            <p className="mb-4">
              Welcome to the seminar registration website of the Climate Change Institute (CCI), The Federation of Thai Industries. 
              Please read the following terms of service carefully before using our services. By using our services, you agree to these terms.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to be bound by these terms and conditions of use. 
              If you do not agree to all the terms and conditions, please discontinue using this website immediately.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">2. Registration and Personal Information</h2>
            <p>
              When you register for our seminar, you agree to provide current, accurate, and complete information. 
              You are responsible for maintaining the confidentiality of your personal information. 
              Please read our Privacy Policy to understand how we collect and use your personal information.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">3. Permitted Use</h2>
            <p>
              You are permitted to access and use this website for seminar registration and personal, non-commercial use only. 
              Use of this website must not violate any applicable laws or regulations.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">4. Restrictions on Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use this website in any way that may damage, disable, overburden, or impair the website</li>
              <li>Use this website for any advertising or commercial solicitation</li>
              <li>Attempt to access any part of the website or servers that you are not authorized to access</li>
              <li>Interfere with the normal functioning of the website</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">5. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, videos, and software, 
              is the property of the Climate Change Institute (CCI), The Federation of Thai Industries, and is protected by Thai and international intellectual property laws.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">6. Disclaimer</h2>
            <p>
              This website is provided "as is" and "as available" without any warranties of any kind. 
              The Climate Change Institute (CCI), The Federation of Thai Industries, does not warrant that this website will be error-free, 
              uninterrupted, secure, or free from harmful components.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the Climate Change Institute (CCI), The Federation of Thai Industries, 
              shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use this website.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">8. Changes to Terms</h2>
            <p>
              The Climate Change Institute (CCI), The Federation of Thai Industries, reserves the right to change these terms at any time. 
              Changes will be effective immediately upon posting on this website. Your continued use of the website after such changes constitutes your acceptance of the revised terms.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">9. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Thailand, and you irrevocably submit to the exclusive jurisdiction of the Thai courts for any disputes arising out of or relating to the use of this website.
            </p>
            
            <h2 className="text-2xl font-bold text-earth-700 mt-8 mb-4">10. Contact</h2>
            <p>
              If you have any questions about these terms, please contact us at cci@fti.or.th
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
