'use client';

import { useState } from 'react';
import { getTranslations } from '@/i18n';
import { toast } from 'react-hot-toast';
import PageHeader from '@/components/ui/PageHeader';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  UserIcon, 
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ContactForm({ locale }) {
  const t = getTranslations(locale || 'th');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(locale === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all required fields', {
        position: 'top-right',
        style: {
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: '#fff',
          padding: '16px 20px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        },
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      toast.success(locale === 'th' ? 'ส่งข้อความสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด' : 'Message sent successfully. We will contact you soon.', {
        position: 'top-right',
        style: {
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff',
          padding: '16px 20px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        },
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(locale === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' : 'An error occurred. Please try again.', {
        position: 'top-right',
        style: {
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          color: '#fff',
          padding: '16px 20px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 py-16 min-h-screen overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-teal-100/20"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
            <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            {locale === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {locale === 'th' ? 'มีคำถามหรือข้อสงสัย? ติดต่อเราได้ที่นี่' : 'Have questions? Contact us here'}
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8 h-fit">
              <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-6 flex items-center">
                <SparklesIcon className="w-6 h-6 mr-3 text-emerald-500" />
                {locale === 'th' ? 'ข้อมูลการติดต่อ' : 'Contact Information'}
              </h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-prompt font-semibold text-slate-800 mb-1">
                      {locale === 'th' ? 'อีเมล' : 'Email'}
                    </h3>
                    <a 
                      href="mailto:cci@fti.or.th" 
                      className="text-emerald-600 hover:text-emerald-700 transition-colors duration-300 font-medium"
                    >
                      cci@fti.or.th
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-prompt font-semibold text-slate-800 mb-1">
                      {locale === 'th' ? 'โทรศัพท์' : 'Phone'}
                    </h3>
                    <a 
                      href="tel:023451270" 
                      className="text-teal-600 hover:text-teal-700 transition-colors duration-300 font-medium"
                    >
                      02-345-1270
                    </a>
                  </div>
                </div>
                
                {/* Organization */}
                <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-prompt font-semibold text-slate-800 mb-1">
                      {locale === 'th' ? 'องค์กร' : 'Organization'}
                    </h3>
                    <p className="text-blue-600 text-sm leading-relaxed">
                      Climate Change Institute<br />
                      The Federation Of Thai Industries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
              <h2 className="text-2xl font-prompt font-bold text-slate-800 mb-6 flex items-center">
                <PaperAirplaneIcon className="w-6 h-6 mr-3 text-teal-500" />
                {locale === 'th' ? 'ส่งข้อความถึงเรา' : 'Send us a message'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2 font-prompt">
                      {locale === 'th' ? 'ชื่อ-นามสกุล' : 'Full Name'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-prompt transition-all duration-300 hover:bg-white/90"
                        placeholder={locale === 'th' ? 'กรอกชื่อ-นามสกุล' : 'Enter your full name'}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2 font-prompt">
                      {locale === 'th' ? 'อีเมล' : 'Email'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-prompt transition-all duration-300 hover:bg-white/90"
                        placeholder={locale === 'th' ? 'กรอกอีเมล' : 'Enter your email'}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2 font-prompt">
                      {locale === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-prompt transition-all duration-300 hover:bg-white/90"
                        placeholder={locale === 'th' ? 'กรอกเบอร์โทรศัพท์' : 'Enter your phone number'}
                      />
                    </div>
                  </div>
                  
                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2 font-prompt">
                      {locale === 'th' ? 'หัวข้อ' : 'Subject'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-prompt transition-all duration-300 hover:bg-white/90"
                        placeholder={locale === 'th' ? 'หัวข้อข้อความ' : 'Message subject'}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2 font-prompt">
                    {locale === 'th' ? 'ข้อความ' : 'Message'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-prompt transition-all duration-300 hover:bg-white/90 resize-none"
                    placeholder={locale === 'th' ? 'กรอกข้อความที่ต้องการส่ง...' : 'Enter your message...'}
                    required
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-prompt font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-emerald-600 hover:to-teal-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{locale === 'th' ? 'กำลังส่ง...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          <span>{locale === 'th' ? 'ส่งข้อความ' : 'Send Message'}</span>
                        </>
                      )}
                    </div>
                    
                    {/* Button shine effect */}
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}