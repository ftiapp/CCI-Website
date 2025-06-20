'use client';

import { FormContainer } from './form';

export default function RegistrationForm({ 
  locale, 
  organizationTypes, 
  transportationTypes, 
  seminarRooms,
  bangkokDistricts,
  provinces 
}) {
  return (
    <FormContainer
      locale={locale}
      organizationTypes={organizationTypes}
      transportationTypes={transportationTypes}
      seminarRooms={seminarRooms}
      bangkokDistricts={bangkokDistricts}
      provinces={provinces}
    />
  );
}