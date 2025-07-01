import { getTranslations } from '@/i18n';

export async function generateMetadata({ params }) {
  // Await params before accessing its properties as required in Next.js 15
  const _params = await Promise.resolve(params);
  const { locale = 'th' } = _params || {};
  const t = getTranslations(locale);
  
  const title = locale === 'th' ? 'กำหนดการ | CCI Climate Change Forum 2025' : 'Schedule | CCI Climate Change Forum 2025';
  const description = locale === 'th' 
    ? 'กำหนดการงาน CCI Climate Change Forum 2025 และหัวข้อสัมมนาเกี่ยวกับการเปลี่ยนแปลงสภาพภูมิอากาศและนวัตกรรมเพื่อความยั่งยืน' 
    : 'Schedule for CCI Climate Change Forum 2025 and seminar topics on climate change and innovations for sustainability';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/schedule`,
      siteName: 'CCI Registration',
      images: [
        {
          url: '/fti-cci-logo-rgb.png',
          width: 800,
          height: 600,
          alt: 'CCI Schedule',
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
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/schedule`,
      languages: {
        'th': `${process.env.NEXT_PUBLIC_BASE_URL}/th/schedule`,
        'en': `${process.env.NEXT_PUBLIC_BASE_URL}/en/schedule`,
      },
    },
  };
}
