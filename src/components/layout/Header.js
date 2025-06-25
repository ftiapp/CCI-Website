'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getTranslations } from '@/i18n';
import { GlobeAltIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-earth-50/95 backdrop-blur-sm shadow-md py-2' 
          : 'bg-earth-50 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-16 h-16' : 'w-24 h-24'
            }`}>
              <Image 
                src="/fti-cci-logo-rgb.png" 
                alt="CCI Logo" 
                fill 
                sizes="96px"
                className="object-contain" 
                priority 
              />
            </div>
            <div>
              <h1 className="text-lg font-prompt font-semibold text-earth-900">{t.common.title}</h1>
              <p className="text-xs font-prompt text-earth-600">{t.common.subtitle}</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`font-prompt text-sm transition-colors duration-200 ${
                    pathnameWithoutLocale === item.href
                      ? 'text-beige-700 font-medium border-b-2 border-beige-500 pb-1'
                      : 'text-earth-700 hover:text-beige-600 hover:border-b-2 hover:border-beige-300 pb-1'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <Link
              href={`/${alternateLocale}${pathnameWithoutLocale}`}
              className="flex items-center space-x-1 text-earth-700 hover:text-beige-600 transition-colors duration-200 bg-earth-100 hover:bg-earth-200 px-3 py-1.5 rounded-full"
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span className="text-sm font-prompt">
                {alternateLocale === 'en' ? 'English' : 'ไทย'}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-earth-700 hover:text-beige-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-earth-50 border-t border-earth-200 shadow-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={`font-prompt text-base py-2 ${
                      pathnameWithoutLocale === item.href
                        ? 'text-beige-700 font-medium bg-earth-100 px-3 rounded-md'
                        : 'text-earth-700 hover:text-beige-600 hover:bg-earth-100 px-3 rounded-md'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={`/${alternateLocale}${pathnameWithoutLocale}`}
                  className="flex items-center space-x-2 text-earth-700 hover:text-beige-600 border border-earth-200 px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <GlobeAltIcon className="w-5 h-5" />
                  <span className="text-sm font-prompt">
                    {alternateLocale === 'en' ? 'Switch to English' : 'เปลี่ยนเป็นภาษาไทย'}
                  </span>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}