'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from '@/i18n';

export default function Footer({ locale }) {
  const t = getTranslations(locale);
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-deeplake-700 to-deeplake-900 text-earth-100 py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ส่วนที่ 1: ข้อมูลองค์กร */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg p-2">
                <Image 
                  src="/fti-cci-logo-rgb.png" 
                  alt="CCI Logo" 
                  fill 
                  sizes="80px"
                  className="object-contain" 
                  priority={false}
                />
              </div>
              <div>
                <h2 className="text-lg font-prompt font-semibold text-beige-300 leading-tight">
                  Climate Change Institute
                </h2>
                <p className="text-sm font-prompt text-beige-300">
                 The Federation Of Thai Industries
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-prompt text-beige-300">
              สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (สปอ.)
              </p>
              <p className="text-sm font-prompt text-beige-300">
              กลุ่มงานนวัตกรรมและการพัฒนาเพื่อความยั่งยืน
              </p>
            
              <p className="text-sm font-prompt text-beige-300">
                สภาอุตสาหกรรมแห่งประเทศไทย
              </p>
            </div>
          </div>
          
          {/* ส่วนที่ 2: เมนูนำทาง */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-prompt font-semibold text-beige-200 mb-3">
              {t.footer.quickLinks}
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href={`/${locale}`} 
                    className="text-sm font-prompt text-beige-200 hover:text-deeplake-300 transition-colors duration-200 inline-block"
                  >
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/schedule`} 
                    className="text-sm font-prompt text-beige-200 hover:text-deeplake-300 transition-colors duration-200 inline-block"
                  >
                    {t.nav.schedule}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/register`} 
                    className="text-sm font-prompt text-beige-200 hover:text-deeplake-300 transition-colors duration-200 inline-block"
                  >
                    {t.nav.register}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* ส่วนที่ 3: ช่องทางติดต่อทั่วไป */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-prompt font-semibold text-deeplake-200 mb-3">
              {t.footer.contactUs}
            </h3>
            <div className="space-y-2">
              <div className="text-sm font-prompt text-beige-300">
                <p className="flex items-center space-x-2">
                  <span className="inline-block w-4 text-beige-400">📞</span>
                  <a 
                    href="tel:023451270" 
                    className="hover:text-deeplake-300 transition-colors duration-200"
                  >
                    02-345-1270
                  </a>
                </p>
              </div>
              <div className="text-sm font-prompt text-beige-300">
                <p className="flex items-center space-x-2">
                  <span className="inline-block w-4 text-beige-400">✉️</span>
                  <a 
                    href="mailto:cci@fti.or.th" 
                    className="hover:text-deeplake-300 transition-colors duration-200"
                  >
                    cci@fti.or.th
                  </a>
                </p>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-4">
              <h4 className="text-sm font-prompt font-medium text-deeplake-200 mb-2">
                ติดตามเรา
              </h4>
              <a 
                href="https://www.facebook.com/climatechange.fti?mibextid=b06tZ0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-beige-200 hover:text-deeplake-300 transition-colors duration-200"
                aria-label="Facebook Page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="text-sm font-prompt">Facebook</span>
              </a>
            </div>
          </div>
          
          {/* ส่วนที่ 4: การติดต่อเมื่อพบปัญหา */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-prompt font-semibold text-deeplake-200 mb-3">
              หากพบปัญหาในการใช้งาน
            </h3>
            
            {/* Contact Person 1 */}
            <div className="mb-3 p-3 bg-deeplake-800/60 rounded-lg">
              <h4 className="text-sm font-prompt font-medium text-deeplake-100 mb-1">
                ฑิตยา น้อยถนอม
              </h4>
              
              <div className="space-y-1">
                <p className="text-xs font-prompt text-earth-300">
                  <span className="inline-block w-3 text-earth-400">✉️</span>
                  <a 
                    href="mailto:thittayan@fti.or.th" 
                    className="hover:text-deeplake-300 transition-colors duration-200 ml-1"
                  >
                    thittayan@fti.or.th
                  </a>
                </p>
                <p className="text-xs font-prompt text-earth-300">
                  <span className="inline-block w-3 text-earth-400">📞</span>
                  <a 
                    href="tel:023451270" 
                    className="hover:text-deeplake-300 transition-colors duration-200 ml-1"
                  >
                    02-345-1270
                  </a>
                </p>
              </div>
            </div>
            
            {/* Contact Person 2 */}
            <div className="mb-3 p-3 bg-deeplake-800/60 rounded-lg">
              <h4 className="text-sm font-prompt font-medium text-deeplake-100 mb-1">
                ตุลยวัต อบมาลี
              </h4>
              <div className="space-y-1">
                <p className="text-xs font-prompt text-earth-300">
                  <span className="inline-block w-3 text-earth-400">✉️</span>
                  <a 
                    href="mailto:tulyawato@fti.or.th" 
                    className="hover:text-deeplake-300 transition-colors duration-200 ml-1"
                  >
                    tulyawato@fti.or.th
                  </a>
                </p>
                <p className="text-xs font-prompt text-earth-300">
                  <span className="inline-block w-3 text-earth-400">📞</span>
                  <a 
                    href="tel:023451257" 
                    className="hover:text-deeplake-300 transition-colors duration-200 ml-1"
                  >
                    02-345-1257
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Person 3 */}
            <div className="mb-4 p-3 bg-deeplake-800/60 rounded-lg">
              <h4 className="text-sm font-prompt font-medium text-deeplake-100 mb-1">
                จิตตานันท์ ชูวิเชียร
              </h4>
              <div className="space-y-1">
                <p className="text-xs font-prompt text-earth-300">
                  <span className="inline-block w-3 text-earth-400">✉️</span>
                  <a 
                    href="mailto:jittananc@fti.or.th" 
                    className="hover:text-deeplake-300 transition-colors duration-200 ml-1"
                  >
                    jittananc@fti.or.th
                  </a>
                </p>
                <p className="text-xs font-prompt text-earth-300">
                  <span className="inline-block w-3 text-earth-400">📞</span>
                  <a 
                    href="tel:023451158" 
                    className="hover:text-deeplake-300 transition-colors duration-200 ml-1"
                  >
                    02-345-1158
                  </a>
                </p>
              </div>
            </div>
            
            {/* Working Hours */}
            <div className="p-3 bg-deeplake-700/40 rounded-lg">
              <h4 className="text-sm font-prompt font-medium text-deeplake-100 mb-1">
                เวลาทำการ
              </h4>
              <p className="text-xs font-prompt text-earth-300">
                จันทร์ - ศุกร์ เวลา 08:30 - 17:30 น.
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-deeplake-600">
          <div className="text-center text-sm font-prompt text-earth-400">
            <p>&copy; {currentYear} Climate Change Institute, The Federation Of Thai Industries. {t.footer.allRightsReserved}</p>
            <div className="mt-3 flex justify-center space-x-4">
              <Link 
                href={`/${locale}/terms`} 
                className="text-xs font-prompt text-earth-400 hover:text-lake-300 transition-colors duration-200"
              >
                {locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}
              </Link>
              <Link 
                href={`/${locale}/privacy`} 
                className="text-xs font-prompt text-earth-400 hover:text-lake-300 transition-colors duration-200"
              >
                {locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
              </Link>
              <Link 
                href={`/${locale}/contact`} 
                className="text-xs font-prompt text-earth-400 hover:text-lake-300 transition-colors duration-200"
              >
                {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}