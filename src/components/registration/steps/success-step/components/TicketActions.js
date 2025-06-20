'use client';

import ActionButtons from './ActionButtons';
import ShareSection from './ShareSection';

export default function TicketActions({ 
  locale, 
  registrationId, 
  formData, 
  seminarRooms, 
  isTicketPage 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      <h3 className="text-lg font-prompt font-semibold text-earth-900 mb-4 text-center">
        {locale === 'th' ? 'จัดการบัตรเข้างาน' : 'Manage Your Ticket'}
      </h3>
      
      <ActionButtons
        locale={locale}
        registrationId={registrationId}
        formData={formData}
        seminarRooms={seminarRooms}
        isTicketPage={isTicketPage}
      />
      
      <ShareSection
        locale={locale}
        registrationId={registrationId}
        formData={formData}
      />
    </div>
  );
}
