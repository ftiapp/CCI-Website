'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getTranslations } from '@/i18n';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Navbar({ locale }) {
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
  ];

  return (
    <header className="bg-earth-50 border-b border-earth-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className="relative w-16 h-16">
              <Image 
                src="/fti-cci-logo-rgb.png" 
                alt="CCI Logo" 
                fill 
                sizes="64px"
                className="object-contain" 
                priority 
              />
            </div>
            <div>
              <h1 className="text-lg font-prompt font-semibold text-earth-900">{t.common.title}</h1>
              <p className="text-xs font-prompt text-earth-600">{t.common.subtitle}</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`font-prompt text-sm ${
                    pathnameWithoutLocale === item.href
                      ? 'text-beige-700 font-medium'
                      : 'text-earth-700 hover:text-beige-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <Link
              href={`/${alternateLocale}${pathnameWithoutLocale}`}
              className="flex items-center space-x-1 text-earth-700 hover:text-beige-600"
            >
              <GlobeAltIcon className="w-5 h-5" />
              <span className="text-sm font-prompt">
                {alternateLocale === 'en' ? 'English' : 'ไทย'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}