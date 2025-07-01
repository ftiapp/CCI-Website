'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from '@/i18n';

export default function Footer({ locale }) {
  const t = getTranslations(locale);
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-slate-100 py-16 overflow-hidden" role="contentinfo">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-teal-900/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* ส่วนที่ 1: ข้อมูลองค์กร */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-20 h-20 flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-slate-200/20">
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
                <h2 className="text-lg font-prompt font-bold text-white leading-tight">
                  Climate Change Institute
                </h2>
                <p className="text-sm font-prompt text-emerald-300 font-medium">
                 The Federation Of Thai Industries
                </p>
              </div>
            </div>
            <div className="space-y-2 p-4 bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50">
              <p className="text-sm font-prompt text-slate-300 leading-relaxed">
                สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (สปอ.)
              </p>
              <p className="text-sm font-prompt text-slate-300 leading-relaxed">
                กลุ่มงานนวัตกรรมและการพัฒนาเพื่อความยั่งยืน
              </p>
              <p className="text-sm font-prompt text-slate-300 leading-relaxed">
                สภาอุตสาหกรรมแห่งประเทศไทย
              </p>
            </div>
          </div>
          
          {/* ส่วนที่ 2: เมนูนำทาง */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-prompt font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full mr-3"></span>
              {t.footer.quickLinks}
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                <li>
                  <Link 
                    href={`/${locale}`} 
                    className="group flex items-center text-slate-300 hover:text-emerald-300 transition-all duration-300 p-3 rounded-xl hover:bg-slate-800/60 backdrop-blur-sm"
                  >
                    <span className="w-2 h-2 bg-slate-500 rounded-full mr-3 group-hover:bg-emerald-400 transition-colors duration-300"></span>
                    <span className="font-prompt font-medium">{t.nav.home}</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/schedule`} 
                    className="group flex items-center text-slate-300 hover:text-emerald-300 transition-all duration-300 p-3 rounded-xl hover:bg-slate-800/60 backdrop-blur-sm"
                  >
                    <span className="w-2 h-2 bg-slate-500 rounded-full mr-3 group-hover:bg-emerald-400 transition-colors duration-300"></span>
                    <span className="font-prompt font-medium">{t.nav.schedule}</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/register`} 
                    className="group flex items-center text-slate-300 hover:text-emerald-300 transition-all duration-300 p-3 rounded-xl hover:bg-slate-800/60 backdrop-blur-sm"
                  >
                    <span className="w-2 h-2 bg-slate-500 rounded-full mr-3 group-hover:bg-emerald-400 transition-colors duration-300"></span>
                    <span className="font-prompt font-medium">{t.nav.register}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* ส่วนที่ 3: ช่องทางติดต่อทั่วไป */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-prompt font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-teal-400 to-blue-400 rounded-full mr-3"></span>
              {t.footer.contactUs}
            </h3>
            
            <div className="space-y-4 p-4 bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a 
                  href="tel:023451270" 
                  className="text-slate-300 hover:text-emerald-300 transition-colors duration-300 font-prompt font-medium"
                >
                  02-345-1270
                </a>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a 
                  href="mailto:cci@fti.or.th" 
                  className="text-slate-300 hover:text-emerald-300 transition-colors duration-300 font-prompt font-medium"
                >
                  cci@fti.or.th
                </a>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-prompt font-semibold text-slate-200 mb-3">
                ติดตามเรา
              </h4>
              <a 
                href="https://www.facebook.com/climatechange.fti?mibextid=b06tZ0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 p-3 bg-slate-800/60 backdrop-blur-sm rounded-xl hover:bg-blue-600/20 border border-slate-700/50 hover:border-blue-500/50"
                aria-label="Facebook Page"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </div>
                <span className="font-prompt font-medium">Facebook</span>
              </a>
            </div>
          </div>
          
          {/* ส่วนที่ 4: การติดต่อเมื่อพบปัญหา */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-prompt font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mr-3"></span>
              หากพบปัญหาในการใช้งาน
            </h3>
            
            <div className="space-y-4">
              {/* Contact Person 1 */}
              <div className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300">
                <h4 className="text-sm font-prompt font-bold text-white mb-3 flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  ฑิตยา น้อยถนอม
                </h4>
                <div className="space-y-2">
                  <a 
                    href="mailto:thittayan@fti.or.th" 
                    className="flex items-center text-xs font-prompt text-slate-300 hover:text-emerald-300 transition-colors duration-300"
                  >
                    <span className="text-emerald-400 mr-2">✉</span>
                    thittayan@fti.or.th
                  </a>
                  <a 
                    href="tel:023451270" 
                    className="flex items-center text-xs font-prompt text-slate-300 hover:text-emerald-300 transition-colors duration-300"
                  >
                    <span className="text-emerald-400 mr-2">📞</span>
                    02-345-1270
                  </a>
                </div>
              </div>
              
              {/* Contact Person 2 */}
              <div className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300">
                <h4 className="text-sm font-prompt font-bold text-white mb-3 flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
                  ตุลยวัต อบมาลี
                </h4>
                <div className="space-y-2">
                  <a 
                    href="mailto:tulyawato@fti.or.th" 
                    className="flex items-center text-xs font-prompt text-slate-300 hover:text-teal-300 transition-colors duration-300"
                  >
                    <span className="text-teal-400 mr-2">✉</span>
                    tulyawato@fti.or.th
                  </a>
                  <a 
                    href="tel:023451257" 
                    className="flex items-center text-xs font-prompt text-slate-300 hover:text-teal-300 transition-colors duration-300"
                  >
                    <span className="text-teal-400 mr-2">📞</span>
                    02-345-1257
                  </a>
                </div>
              </div>

              {/* Contact Person 3 */}
              <div className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
                <h4 className="text-sm font-prompt font-bold text-white mb-3 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  จิตตานันท์ ชูวิเชียร
                </h4>
                <div className="space-y-2">
                  <a 
                    href="mailto:jittananc@fti.or.th" 
                    className="flex items-center text-xs font-prompt text-slate-300 hover:text-blue-300 transition-colors duration-300"
                  >
                    <span className="text-blue-400 mr-2">✉</span>
                    jittananc@fti.or.th
                  </a>
                  <a 
                    href="tel:023451158" 
                    className="flex items-center text-xs font-prompt text-slate-300 hover:text-blue-300 transition-colors duration-300"
                  >
                    <span className="text-blue-400 mr-2">📞</span>
                    02-345-1158
                  </a>
                </div>
              </div>
              
              {/* Working Hours */}
              <div className="p-4 bg-gradient-to-br from-purple-800/30 to-indigo-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/30">
                <h4 className="text-sm font-prompt font-bold text-white mb-2 flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  เวลาทำการ
                </h4>
                <p className="text-xs font-prompt text-slate-300">
                  จันทร์ - ศุกร์ เวลา 08:30 - 17:30 น.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-3"></div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
            </div>
            
            <p className="text-sm font-prompt text-slate-400 mb-4">
              &copy; {currentYear} Climate Change Institute, The Federation Of Thai Industries. {t.footer.allRightsReserved}
            </p>
            
            <div className="flex justify-center space-x-6">
              <Link 
                href={`/${locale}/terms`} 
                className="text-xs font-prompt text-slate-400 hover:text-emerald-300 transition-colors duration-300 relative group"
              >
                <span>{locale === 'th' ? 'ข้อกำหนดการใช้งาน' : 'Terms of Service'}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link 
                href={`/${locale}/privacy`} 
                className="text-xs font-prompt text-slate-400 hover:text-emerald-300 transition-colors duration-300 relative group"
              >
                <span>{locale === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link 
                href={`/${locale}/contact`} 
                className="text-xs font-prompt text-slate-400 hover:text-emerald-300 transition-colors duration-300 relative group"
              >
                <span>{locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}