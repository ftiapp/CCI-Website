import { getTranslations } from '@/i18n';

export default function generateMetadata({ params }) {
  const { locale = 'th' } = params || {};
  const t = getTranslations(locale);
  
  const title = locale === 'th' ? 'CCI Climate Change Forum 2025 | สภาอุตสาหกรรมแห่งประเทศไทย' : 'CCI Climate Change Forum 2025 | The Federation of Thai Industries';
  const description = locale === 'th' 
    ? 'งานสัมมนาการเปลี่ยนแปลงสภาพภูมิอากาศ และนวัตกรรมเพื่อความยั่งยืน โดยสภาอุตสาหกรรมแห่งประเทศไทย' 
    : 'Climate Change Forum and Innovation for Sustainability by The Federation of Thai Industries';
  
  return {
    title,
    description,
    keywords: [
      'carbon credit', 'climate change', 'seminar', 'registration', 'FTI', 'CCI', 'Thailand', 
      'สภาอุตสาหกรรม', 'คาร์บอนเครดิต', 'การเปลี่ยนแปลงสภาพภูมิอากาศ', 'สัมมนา', 'ลงทะเบียน'
    ],
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
      siteName: 'CCI Registration',
      images: [
        {
          url: '/fti-cci-logo-rgb.png',
          width: 800,
          height: 600,
          alt: 'CCI Climate Change Forum 2025',
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
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
      languages: {
        'th': `${process.env.NEXT_PUBLIC_BASE_URL}/th`,
        'en': `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
      },
    },
  };
}
