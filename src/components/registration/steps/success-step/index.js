'use client';

import { getTranslations } from '@/i18n';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import EventTicket from '@/components/ui/EventTicket';
import TicketActions from './components/TicketActions';

export default function SuccessStep({ 
  locale, 
  registrationId,
  formData,
  organizationTypes,
  industryTypes,
  transportationTypes,
  seminarRooms,
  isTicketPage = false
}) {
  const t = getTranslations(locale || 'th');
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-prompt font-bold text-earth-900 mb-2">
          {t.registration.registrationSuccess}
        </h2>
        <p className="text-earth-600 max-w-md mx-auto">
          {t.registration.successMessage}
        </p>
      </div>
      
      {/* Event Ticket */}
      <div className="mb-10">
        <EventTicket 
          registrationId={registrationId}
          firstName={formData?.firstName}
          lastName={formData?.lastName}
          phone={formData?.phone}
          attendanceType={formData?.attendanceType}
          selectedRoom={seminarRooms.find(room => room.id.toString() === formData.selectedRoomId)}
          locale={locale}
        />
      </div>
      
      {/* Ticket Actions */}
      <TicketActions
        locale={locale}
        registrationId={registrationId}
        formData={formData}
        seminarRooms={seminarRooms}
        isTicketPage={isTicketPage}
      />
      
      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8">
        <a 
          href={`/${locale}/schedule`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="mr-4">
            {t.schedule.title}
          </Button>
        </a>
        
        <Link href={`/${locale}`}>
          <Button>
            {t.nav.home}
          </Button>
        </Link>
      </div>
    </div>
  );
}