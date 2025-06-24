'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { getTranslations } from '@/i18n';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import { PhoneIcon } from '@heroicons/react/24/outline';

export default function ContactPage({ params }) {
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
      <PageHeader 
        title={locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
        subtitle={locale === 'th' ? 'มีคำถามหรือข้อสงสัย? ติดต่อเราได้ที่นี่' : 'Have questions? Contact us here'}
        type="contact"
      />
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-10">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
            <div className="relative w-24 h-24 flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <Image 
                src="/fti-cci-logo-rgb.png" 
                alt="CCI Logo" 
                fill 
                sizes="96px"
                className="object-contain" 
                priority={true}
              />
            </div>
            <div>
              <h2 className="text-2xl font-prompt font-semibold text-earth-800 mb-2">
                {locale === 'th' ? 'สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI)' : 'Climate Change Institute (CCI)'}
              </h2>
              <p className="text-lg font-prompt text-earth-600 mb-1">
                {locale === 'th' ? 'สภาอุตสาหกรรมแห่งประเทศไทย' : 'The Federation of Thai Industries'}
              </p>
              <p className="text-md font-prompt text-earth-500">
                {locale === 'th' ? 'กลุ่มงานนวัตกรรมและการพัฒนาเพื่อความยั่งยืน' : 'Innovation and Sustainable Development Group'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-prompt font-semibold text-earth-700 mb-4">
                {locale === 'th' ? 'ที่อยู่' : 'Address'}
              </h3>
              <p className="font-prompt text-earth-600 mb-6">
                {locale === 'th' ? (
                  <>
                    สภาอุตสาหกรรมแห่งประเทศไทย<br />
                    เลขที่ 2 อาคารปฏิบัติการเทคโนโลยีเชิงสร้างสรรค์<br />
                    ชั้น 7 ถนนนางลิ้นจี่ แขวงทุ่งมหาเมฆ<br />
                    เขตสาทร กรุงเทพฯ 10120
                  </>
                ) : (
                  <>
                    The Federation of Thai Industries<br />
                    2 Creative Technology Building<br />
                    7th Floor, Nang Linchee Road, Thungmahamek<br />
                    Sathorn, Bangkok 10120
                  </>
                )}
              </p>
              
              <h3 className="text-xl font-prompt font-semibold text-earth-700 mb-4">
                {locale === 'th' ? 'ช่องทางการติดต่อ' : 'Contact Information'}
              </h3>
              <div className="space-y-3">
                <p className="font-prompt text-earth-600 flex items-center">
                  <span className="inline-block w-6 text-earth-500 mr-2">📞</span>
                  <a href="tel:023451000" className="hover:text-earth-800 transition-colors">02-345-1270</a>
                </p>
                <p className="font-prompt text-earth-600 flex items-center">
                  <span className="inline-block w-6 text-earth-500 mr-2">✉️</span>
                  <a href="mailto:cci@fti.or.th" className="hover:text-earth-800 transition-colors">cci@fti.or.th</a>
                </p>
                <p className="font-prompt text-earth-600 flex items-center">
                  <span className="inline-block w-6 text-earth-500 mr-2">🌐</span>
                  <a href="https://www.fti.or.th" target="_blank" rel="noopener noreferrer" className="hover:text-earth-800 transition-colors">www.fti.or.th</a>
                </p>
              </div>
              
              <h3 className="text-xl font-prompt font-semibold text-earth-700 mt-6 mb-4">
                {locale === 'th' ? 'เวลาทำการ' : 'Office Hours'}
              </h3>
              <p className="font-prompt text-earth-600">
                {locale === 'th' ? 'จันทร์ - ศุกร์: 08:30 - 17:30 น.' : 'Monday - Friday: 08:30 AM - 5:30 PM'}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-prompt font-semibold text-earth-700 mb-4">
                {locale === 'th' ? 'ติดต่อเจ้าหน้าที่' : 'Contact Staff'}
              </h3>
              
              <div className="space-y-6">
                {/* Contact Person 1 */}
                <div className="p-4 bg-earth-50 rounded-lg border border-earth-100">
                  <h4 className="text-lg font-prompt font-medium text-earth-800 mb-2">
                    ฑิตยา น้อยถนอม
                  </h4>
                  <div className="space-y-2">
                    <p className="font-prompt text-earth-600 flex items-center">
                      <span className="inline-block w-5 text-earth-500 mr-2">✉️</span>
                      <a href="mailto:thittayan@fti.or.th" className="hover:text-earth-800 transition-colors">thittayan@fti.or.th</a>
                    </p>
                    <p className="font-prompt text-earth-600 flex items-center">
                      <span className="inline-block w-5 text-earth-500 mr-2">📞</span>
                      <a href="tel:023451270" className="hover:text-earth-800 transition-colors">02-345-1270</a>
                    </p>
                  </div>
                </div>
                
                {/* Contact Person 2 */}
                <div className="p-4 bg-earth-50 rounded-lg border border-earth-100">
                  <h4 className="text-lg font-prompt font-medium text-earth-800 mb-2">
                    ตุลยวัต อบมาลี
                  </h4>
                  <div className="space-y-2">
                    <p className="font-prompt text-earth-600 flex items-center">
                      <span className="inline-block w-5 text-earth-500 mr-2">✉️</span>
                      <a href="mailto:tulyawato@fti.or.th" className="hover:text-earth-800 transition-colors">tulyawato@fti.or.th</a>
                    </p>
                    <p className="font-prompt text-earth-600 flex items-center">
                      <span className="inline-block w-5 text-earth-500 mr-2">📞</span>
                      <a href="tel:023451257" className="hover:text-earth-800 transition-colors">02-345-1257</a>
                    </p>
                  </div>
                </div>
                
                {/* Contact Person 3 */}
                <div className="p-4 bg-earth-50 rounded-lg border border-earth-100">
                  <h4 className="text-lg font-prompt font-medium text-earth-800 mb-2">
                    จิตตานันท์ ชูวิเชียร
                  </h4>
                  <div className="space-y-2">
                    <p className="font-prompt text-earth-600 flex items-center">
                      <span className="inline-block w-5 text-earth-500 mr-2">✉️</span>
                      <a href="mailto:jittananc@fti.or.th" className="hover:text-earth-800 transition-colors">jittananc@fti.or.th</a>
                    </p>
                    <p className="font-prompt text-earth-600 flex items-center">
                      <span className="inline-block w-5 text-earth-500 mr-2">📞</span>
                      <a href="tel:023451158" className="hover:text-earth-800 transition-colors">02-345-1158</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-prompt font-semibold text-earth-700 mb-4">
            {locale === 'th' ? 'แผนที่' : 'Map'}
          </h3>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.4843282050026!2d100.5450423!3d13.7140857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f8a4c4d9e11%3A0xd1a8e5b26a355aee!2sThe%20Federation%20of%20Thai%20Industries!5e0!3m2!1sen!2sth!4v1655458256972!5m2!1sen!2sth" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps - Federation of Thai Industries"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-earth-500 font-prompt">
        <p>&copy; {new Date().getFullYear()} {locale === 'th' ? 'สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ สภาอุตสาหกรรมแห่งประเทศไทย' : 'Climate Change Institute, The Federation of Thai Industries'}. {locale === 'th' ? 'สงวนลิขสิทธิ์' : 'All Rights Reserved'}</p>
      </div>
    </div>
  );
}
