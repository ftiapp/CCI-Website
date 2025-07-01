'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getTranslations } from '@/i18n';
import { GlobeAltIcon, Bars3Icon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ locale }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = getTranslations(locale);
  
  // Get the path without the locale prefix
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
  
  // Generate the alternate locale path
  const alternateLocale = locale === 'th' ? 'en' : 'th';
  
  const navItems = [
    { href: '/', label: t.nav.home },
    { href: '/schedule', label: t.nav.schedule },
    { href: '/register', label: t.nav.register },
    { href: '/contact', label: locale === 'th' ? 'ติดต่อเรา' : 'Contact Us' },
  ];

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-slate-200/50 py-2' 
          : 'bg-gradient-to-r from-emerald-50/95 via-teal-50/95 to-blue-50/95 backdrop-blur-sm py-4'
      }`}
    >
      {/* Background decoration for non-scrolled state */}
      {!isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 pointer-events-none"></div>
      )}
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href={`/${locale}`} className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <div className={`relative transition-all duration-500 ${
              isScrolled ? 'w-10 h-10' : 'w-14 h-14'
            }`}>
              {/* Background for logo visibility */}
              <div className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200/50 group-hover:border-emerald-200 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <Image 
                src="/fti-cci-logo-rgb.png" 
                alt="CCI Logo" 
                fill 
                sizes="56px"
                className="object-contain relative z-10 p-1" 
                priority 
              />
            </div>
            <div className="transition-all duration-300">
              <h1 className={`font-prompt font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}>
                {t.common.title}
              </h1>
              <p className={`font-prompt text-slate-600 ${
                isScrolled ? 'text-xs' : 'text-sm'
              }`}>
                {t.common.subtitle}
              </p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    className={`group relative font-prompt text-sm transition-all duration-300 px-4 py-2 rounded-xl font-medium ${
                      pathnameWithoutLocale === item.href
                        ? 'text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-200'
                        : 'text-slate-700 hover:text-emerald-600 hover:bg-white/60 hover:shadow-md hover:shadow-slate-200/50'
                    }`}
                  >
                    {item.label}
                    {pathnameWithoutLocale === item.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl -z-10"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    {pathnameWithoutLocale !== item.href && (
                      <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10"></div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href={`/${alternateLocale}${pathnameWithoutLocale}`}
                className="group flex items-center space-x-2 text-slate-700 hover:text-emerald-600 transition-all duration-300 bg-white/60 hover:bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-slate-200/50 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/50"
              >
                <GlobeAltIcon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-prompt font-semibold">
                  {alternateLocale === 'en' ? 'EN' : 'TH'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="md:hidden relative p-2 text-slate-700 hover:text-emerald-600 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:border-emerald-200 transition-all duration-300 hover:shadow-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/${locale}${item.href}`}
                      className={`group relative flex items-center space-x-3 font-prompt text-sm py-3 px-4 rounded-xl transition-all duration-300 ${
                        pathnameWithoutLocale === item.href
                          ? 'text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg'
                          : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {pathnameWithoutLocale === item.href && (
                        <SparklesIcon className="w-4 h-4 text-white" />
                      )}
                      <span className="font-medium">{item.label}</span>
                      {pathnameWithoutLocale !== item.href && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
                      )}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Language Switcher */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4 border-t border-slate-200/50"
                >
                  <Link
                    href={`/${alternateLocale}${pathnameWithoutLocale}`}
                    className="group flex items-center space-x-3 text-slate-700 hover:text-emerald-600 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-emerald-50 hover:to-teal-50 border border-slate-200 hover:border-emerald-200 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <GlobeAltIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-prompt font-semibold">
                      {alternateLocale === 'en' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
                    </span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}