import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

export default function Home() {
  // Redirect to the registration page with the default locale (Thai)
  redirect(`/${defaultLocale}/register`);
  
  // This part won't be executed due to the redirect
  return null;
}
