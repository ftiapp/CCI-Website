'use client';

import { FormContainer } from './form';

export default function RegistrationForm({ 
  locale, 
  organizationTypes, 
  industryTypes,
  transportationTypes, 
  seminarRooms,
  bangkokDistricts,
  provinces 
}) {
  return (
    <FormContainer
      locale={locale}
      organizationTypes={organizationTypes}
      industryTypes={industryTypes}
      transportationTypes={transportationTypes}
      seminarRooms={seminarRooms}
      bangkokDistricts={bangkokDistricts}
      provinces={provinces}
    />
  );
}