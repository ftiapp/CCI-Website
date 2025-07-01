import { getTranslations } from '@/i18n';

export async function generateMetadata({ params }) {
  const { locale = 'th' } = params || {};
  const t = getTranslations(locale);
  
  const title = locale === 'th' ? 'แผนที่และวิธีการเดินทาง - CCI Climate Change Forum 2025' : 'Map & Directions - CCI Climate Change Forum 2025';
  const description = locale === 'th' 
    ? 'แผนที่และวิธีการเดินทางมางาน CCI Climate Change Forum 2025 ณ อาคารเอ็มทาวเวอร์ (M-Tower)'
    : 'Map and directions to CCI Climate Change Forum 2025 at M-Tower Building';
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/og-image.jpg'],
      locale,
      type: 'website',
    },
  };
}
