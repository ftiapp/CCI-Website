import { getTranslations } from '@/i18n';

export default function generateMetadata({ params }) {
  const { locale = 'th' } = params || {};
  const t = getTranslations(locale);
  
  const title = locale === 'th' ? 'ลงทะเบียน | CCI Climate Change Forum 2025' : 'Registration | CCI Climate Change Forum 2025';
  const description = locale === 'th' 
    ? 'ลงทะเบียนเข้าร่วมงาน CCI Climate Change Forum 2025 โดยสภาอุตสาหกรรมแห่งประเทศไทย' 
    : 'Register for the CCI Climate Change Forum 2025 by The Federation of Thai Industries';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/register`,
      siteName: 'CCI Registration',
      images: [
        {
          url: '/fti-cci-logo-rgb.png',
          width: 800,
          height: 600,
          alt: 'CCI Registration',
        },
      ],
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/fti-cci-logo-rgb.png'],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/register`,
      languages: {
        'th': `${process.env.NEXT_PUBLIC_BASE_URL}/th/register`,
        'en': `${process.env.NEXT_PUBLIC_BASE_URL}/en/register`,
      },
    },
  };
}
