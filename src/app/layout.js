import { Prompt } from 'next/font/google'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { locales, defaultLocale } from '@/i18n'

const prompt = Prompt({ 
  subsets: ['latin', 'thai'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-prompt',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://cci.fti.or.th'),
  title: {
    default: 'CCI Registration',
    template: '%s | CCI Registration'
  },
  description: 'Carbon Credit Initiative Seminar Registration by The Federation of Thai Industries',
  keywords: ['carbon credit', 'climate change', 'seminar', 'registration', 'FTI', 'CCI', 'Thailand'],
  authors: [{ name: 'CCI', url: 'https://cci.fti.or.th' }],
  creator: 'Carbon Credit Initiative',
  publisher: 'The Federation of Thai Industries',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: '/Logo_FTI.webp?v=3', type: 'image/webp' },
    ],
    shortcut: '/Logo_FTI.webp?v=3',
    apple: [
      { url: '/Logo_FTI.webp?v=3', type: 'image/webp' },
    ],
  },
  openGraph: {
    title: 'CCI Registration',
    description: 'Carbon Credit Initiative Seminar Registration by The Federation of Thai Industries',
    url: 'https://cci.fti.or.th',
    siteName: 'CCI Registration',
    images: [
      {
        url: '/fti-cci-logo-rgb.png',
        width: 800,
        height: 600,
        alt: 'CCI Logo',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CCI Registration',
    description: 'Carbon Credit Initiative Seminar Registration by The Federation of Thai Industries',
    images: ['/fti-cci-logo-rgb.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params }) {
  // Await params before accessing its properties as required in Next.js 15
  const _params = await Promise.resolve(params);
  const locale = _params?.locale || defaultLocale
  
  return (
    <html lang={locale} className={`${prompt.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#f5f5f0] text-[#3c3c3c] font-prompt">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#f5f5f0',
              color: '#3c3c3c',
              border: '1px solid #d6cfc7',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
