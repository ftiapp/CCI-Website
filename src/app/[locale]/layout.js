import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import PopupBannerWrapper from '@/components/ui/PopupBannerWrapper';
import { locales, defaultLocale } from '@/i18n';

// แก้ไข warning เกี่ยวกับ params.locale ใน Next.js 15
export const dynamicParams = false;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ใช้วิธีการที่ถูกต้องสำหรับ Next.js 15
// สำหรับ dynamic route parameters
export async function generateMetadata({ params }) {
  // Await params before accessing its properties as required in Next.js 15
  const _params = await Promise.resolve(params);
  const locale = _params?.locale || defaultLocale;
  
  const title = locale === 'th' ? 'สถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ' : 'Climate Change Institute';
  const description = locale === 'th' 
    ? 'ลงทะเบียนเข้าร่วมสัมมนาโดยสถาบันการเปลี่ยนแปลงสภาพภูมิอากาศ สภาอุตสาหกรรมแห่งประเทศไทย' 
    : 'Seminar registration by Climate Change Institute, The Federation of Thai Industries';
  
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'th': '/th',
      },
    },
    openGraph: {
      title,
      description,
      locale: locale === 'th' ? 'th_TH' : 'en_US',
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  // ใช้ await กับ params ตามที่ Next.js 15 แนะนำ
  const _params = await Promise.resolve(params);
  const locale = _params?.locale || defaultLocale;
  
  // Validate locale
  if (!locales.includes(locale)) {
    return null;
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer locale={locale} />
      <CookieConsent locale={locale} />
      <PopupBannerWrapper locale={locale} />
    </div>
  );
}
