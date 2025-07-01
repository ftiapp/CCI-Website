import Script from 'next/script';

export function EventStructuredData({ locale = 'th' }) {
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': locale === 'th' ? 'CCI Climate Change Forum 2025' : 'CCI Climate Change Forum 2025',
    'description': locale === 'th' 
      ? 'งานสัมมนาการเปลี่ยนแปลงสภาพภูมิอากาศ และนวัตกรรมเพื่อความยั่งยืน โดยสภาอุตสาหกรรมแห่งประเทศไทย' 
      : 'Climate Change Forum and Innovation for Sustainability by The Federation of Thai Industries',
    'startDate': '2025-07-15T09:00:00+07:00',
    'endDate': '2025-07-15T17:00:00+07:00',
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'location': {
      '@type': 'Place',
      'name': locale === 'th' ? 'ศูนย์การประชุมแห่งชาติสิริกิติ์' : 'Queen Sirikit National Convention Center',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': locale === 'th' ? '60 ถนนรัชดาภิเษก แขวงคลองเตย' : '60 Ratchadaphisek Rd, Khlong Toei',
        'addressLocality': locale === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok',
        'postalCode': '10110',
        'addressCountry': 'TH'
      }
    },
    'organizer': {
      '@type': 'Organization',
      'name': locale === 'th' ? 'สภาอุตสาหกรรมแห่งประเทศไทย' : 'Federation of Thai Industries',
      'url': 'https://fti.or.th/'
    },
    'image': [
      `${process.env.NEXT_PUBLIC_BASE_URL}/fti-cci-logo-rgb.png`
    ],
    'offers': {
      '@type': 'Offer',
      'url': `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/register`,
      'price': '0',
      'priceCurrency': 'THB',
      'availability': 'https://schema.org/InStock',
      'validFrom': '2025-05-01T00:00:00+07:00'
    }
  };

  return (
    <Script id="event-structured-data" type="application/ld+json">
      {JSON.stringify(eventData)}
    </Script>
  );
}

export function OrganizationStructuredData({ locale = 'th' }) {
  const orgData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': locale === 'th' ? 'สภาอุตสาหกรรมแห่งประเทศไทย' : 'The Federation of Thai Industries',
    'alternateName': 'FTI',
    'url': 'https://fti.or.th/',
    'logo': `${process.env.NEXT_PUBLIC_BASE_URL}/fti-cci-logo-rgb.png`,
    'sameAs': [
      'https://www.facebook.com/FTI.THAILAND',
      'https://www.linkedin.com/company/the-federation-of-thai-industries/'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+66-2345-1000',
      'contactType': 'customer service',
      'availableLanguage': ['Thai', 'English']
    }
  };

  return (
    <Script id="organization-structured-data" type="application/ld+json">
      {JSON.stringify(orgData)}
    </Script>
  );
}

export function BreadcrumbStructuredData({ items, locale = 'th' }) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${process.env.NEXT_PUBLIC_BASE_URL}${item.path}`
    }))
  };

  return (
    <Script id="breadcrumb-structured-data" type="application/ld+json">
      {JSON.stringify(breadcrumbData)}
    </Script>
  );
}

export function FAQStructuredData({ faqs, locale = 'th' }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <Script id="faq-structured-data" type="application/ld+json">
      {JSON.stringify(faqData)}
    </Script>
  );
}
