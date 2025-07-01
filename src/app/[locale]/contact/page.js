'use client';

import { useEffect } from 'react';
import { use } from 'react';
import { getTranslations } from '@/i18n';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon, 
  BuildingOfficeIcon,
  UserIcon,
  GlobeAltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ContactPage({ params }) {
  // Use React.use() to unwrap params as required in Next.js 15
  const unwrappedParams = use(params);
  const locale = unwrappedParams?.locale || 'th';
  const t = getTranslations(locale);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactPersons = [
    {
      name: 'ฑิตยา น้อยถนอม',
      email: 'thittayan@fti.or.th',
      phone: '02-345-1270',
      color: 'emerald'
    },
    {
      name: 'ตุลยวัต อบมาลี',
      email: 'tulyawato@fti.or.th',
      phone: '02-345-1257',
      color: 'teal'
    },
    {
      name: 'จิตตานันท์ ชูวิเชียร',
      email: 'jittananc@fti.or.th',
      phone: '02-345-1158',
      color: 'blue'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: {
        bg: 'from-emerald-50 to-emerald-100/50',
        border: 'border-emerald-200',
        icon: 'from-emerald-500 to-emerald-600',
        text: 'text-emerald-600',
        hover: 'hover:text-emerald-700'
      },
      teal: {
        bg: 'from-teal-50 to-teal-100/50',
        border: 'border-teal-200',
        icon: 'from-teal-500 to-teal-600',
        text: 'text-teal-600',
        hover: 'hover:text-teal-700'
      },
      blue: {
        bg: 'from-blue-50 to-blue-100/50',
        border: 'border-blue-200',
        icon: 'from-blue-500 to-blue-600',
        text: 'text-blue-600',
        hover: 'hover:text-blue-700'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 py-16 min-h-screen overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
            <BuildingOfficeIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {locale === 'th' ? 'มีคำถามหรือข้อสงสัย? ติดต่อเราได้ที่นี่' : 'Have questions? Contact us here'}
          </p>
        </motion.div>
        
        {/* Organization Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
            <div className="relative p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="relative w-24 h-24 flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-slate-200/50"></div>
                  <Image 
                    src="/fti-cci-logo-rgb.png" 
                    alt="CCI Logo" 
                    fill 
                    sizes="96px"
                    className="object-contain p-2" 
                    priority={true}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                    {locale === 'th' ? 'สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ (CCI)' : 'Climate Change Institute (CCI)'}
                  </h2>
                  <p className="text-lg font-prompt text-emerald-600 font-semibold mb-2">
                    {locale === 'th' ? 'สภาอุตสาหกรรมแห่งประเทศไทย' : 'The Federation of Thai Industries'}
                  </p>
                  <p className="text-slate-600 font-prompt">
                    {locale === 'th' ? 'กลุ่มงานนวัตกรรมและการพัฒนาเพื่อความยั่งยืน' : 'Innovation and Sustainable Development Group'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* General Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="text-2xl font-prompt font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <MapPinIcon className="w-5 h-5 text-white" />
                </div>
                {locale === 'th' ? 'ที่อยู่' : 'Address'}
              </h3>
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <p className="font-prompt text-slate-700 leading-relaxed">
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
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="text-2xl font-prompt font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <PhoneIcon className="w-5 h-5 text-white" />
                </div>
                {locale === 'th' ? 'ช่องทางการติดต่อ' : 'Contact Information'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                    <PhoneIcon className="w-4 h-4 text-white" />
                  </div>
                  <a href="tel:023451270" className="font-prompt text-emerald-600 hover:text-emerald-700 transition-colors font-medium">
                    02-345-1270
                  </a>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-teal-50 to-teal-100/50 rounded-xl border border-teal-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                    <EnvelopeIcon className="w-4 h-4 text-white" />
                  </div>
                  <a href="mailto:cci@fti.or.th" className="font-prompt text-teal-600 hover:text-teal-700 transition-colors font-medium">
                    cci@fti.or.th
                  </a>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <GlobeAltIcon className="w-4 h-4 text-white" />
                  </div>
                  <a href="https://www.fti.or.th" target="_blank" rel="noopener noreferrer" className="font-prompt text-blue-600 hover:text-blue-700 transition-colors font-medium">
                    www.fti.or.th
                  </a>
                </div>
              </div>
            </div>
            
            {/* Office Hours */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
              <h3 className="text-2xl font-prompt font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <ClockIcon className="w-5 h-5 text-white" />
                </div>
                {locale === 'th' ? 'เวลาทำการ' : 'Office Hours'}
              </h3>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <p className="font-prompt text-slate-700 font-medium">
                  {locale === 'th' ? 'จันทร์ - ศุกร์: 08:30 - 17:30 น.' : 'Monday - Friday: 08:30 AM - 5:30 PM'}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Staff */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6"
          >
            <h3 className="text-2xl font-prompt font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              {locale === 'th' ? 'ติดต่อเจ้าหน้าที่' : 'Contact Staff'}
            </h3>
            
            <div className="space-y-6">
              {contactPersons.map((person, index) => {
                const colors = getColorClasses(person.color);
                return (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className={`p-6 bg-gradient-to-r ${colors.bg} rounded-2xl border ${colors.border} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-r ${colors.icon} rounded-xl flex items-center justify-center mr-3 shadow-lg`}>
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-prompt font-bold text-slate-800">
                        {person.name}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <EnvelopeIcon className={`w-4 h-4 ${colors.text} mr-3`} />
                        <a 
                          href={`mailto:${person.email}`} 
                          className={`font-prompt ${colors.text} ${colors.hover} transition-colors font-medium`}
                        >
                          {person.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <PhoneIcon className={`w-4 h-4 ${colors.text} mr-3`} />
                        <a 
                          href={`tel:${person.phone.replace(/\s+/g, '')}`} 
                          className={`font-prompt ${colors.text} ${colors.hover} transition-colors font-medium`}
                        >
                          {person.phone}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
        
        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200/50">
            <h3 className="text-2xl font-prompt font-bold text-slate-800 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <MapPinIcon className="w-5 h-5 text-white" />
              </div>
              {locale === 'th' ? 'แผนที่' : 'Map'}
            </h3>
          </div>
          <div className="relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.4843282050026!2d100.5450423!3d13.7140857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f8a4c4d9e11%3A0xd1a8e5b26a355aee!2sThe%20Federation%20of%20Thai%20Industries!5e0!3m2!1sen!2sth!4v1655458256972!5m2!1sen!2sth" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps - Federation of Thai Industries"
              className="w-full"
            ></iframe>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-3"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"></div>
          </div>
          <p className="text-sm text-slate-500 font-prompt">
            &copy; {new Date().getFullYear()} {locale === 'th' ? 'สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ สภาอุตสาหกรรมแห่งประเทศไทย' : 'Climate Change Institute, The Federation of Thai Industries'}. {locale === 'th' ? 'สงวนลิขสิทธิ์' : 'All Rights Reserved'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}