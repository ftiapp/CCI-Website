import { getTranslations } from '@/i18n';

export async function generateMetadata({ params }) {
  // Await params before accessing its properties as required in Next.js 15
  const _params = await Promise.resolve(params);
  const { locale = 'th' } = _params || {};
  const t = getTranslations(locale);
  
  const title = locale === 'th' ? 'ติดต่อเรา | CCI Climate Change Forum 2025' : 'Contact Us | CCI Climate Change Forum 2025';
  const description = locale === 'th' 
    ? 'ติดต่อสอบถามข้อมูลเกี่ยวกับงาน CCI Climate Change Forum 2025 โดยสภาอุตสาหกรรมแห่งประเทศไทย' 
    : 'Contact information for the CCI Climate Change Forum 2025 by The Federation of Thai Industries';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/contact`,
      siteName: 'CCI Registration',
      images: [
        {
          url: '/fti-cci-logo-rgb.png',
          width: 800,
          height: 600,
          alt: 'CCI Contact',
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
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/contact`,
      languages: {
        'th': `${process.env.NEXT_PUBLIC_BASE_URL}/th/contact`,
        'en': `${process.env.NEXT_PUBLIC_BASE_URL}/en/contact`,
      },
    },
  };
}
