import { getTranslations } from '@/i18n';
import RegistrationForm from '@/components/registration/RegistrationForm';
import { getOrganizationTypes, getTransportationTypes, getSeminarRooms, getBangkokDistricts, getProvinces } from '@/lib/db';

export default async function RegisterPage({ params }) {
  // ใช้ await กับ params ตามที่ Next.js 15 แนะนำ
  const _params = await Promise.resolve(params);
  const locale = _params?.locale || 'th';
  const t = getTranslations(locale);
  
  // Fetch data for form dropdowns with error handling
  let organizationTypes = [];
  let transportationTypes = [];
  let seminarRooms = [];
  let bangkokDistricts = [];
  let provinces = [];
  
  try {
    organizationTypes = await getOrganizationTypes();
    transportationTypes = await getTransportationTypes();
    seminarRooms = await getSeminarRooms();
    bangkokDistricts = await getBangkokDistricts();
    provinces = await getProvinces();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Use mock data if database connection fails
    organizationTypes = [
      { id: 1, name_th: 'บริษัทเอกชน', name_en: 'Private Company' },
      { id: 2, name_th: 'หน่วยงานรัฐ', name_en: 'Government Agency' },
      { id: 3, name_th: 'องค์กรไม่แสวงหาผลกำไร', name_en: 'Non-profit Organization' },
      { id: 4, name_th: 'สถาบันการศึกษา', name_en: 'Educational Institution' },
      { id: 5, name_th: 'อื่นๆ', name_en: 'Other' }
    ];
    transportationTypes = [
      { id: 1, name_th: 'รถยนต์ส่วนตัว', name_en: 'Private Car' },
      { id: 2, name_th: 'รถโดยสารสาธารณะ', name_en: 'Public Transportation' },
      { id: 3, name_th: 'รถรับส่งของงาน', name_en: 'Event Shuttle' },
      { id: 4, name_th: 'อื่นๆ', name_en: 'Other' }
    ];
    seminarRooms = [
      { id: 1, name_th: 'ห้องประชุมใหญ่', name_en: 'Main Conference Room', capacity: 100 },
      { id: 2, name_th: 'ห้องประชุมเล็ก', name_en: 'Small Conference Room', capacity: 50 }
    ];
    bangkokDistricts = [
      { id: 1, name_th: 'เขตพระนคร', name_en: 'Phra Nakhon' },
      { id: 2, name_th: 'เขตดุสิต', name_en: 'Dusit' },
      { id: 3, name_th: 'เขตบางรัก', name_en: 'Bang Rak' },
      { id: 4, name_th: 'เขตปทุมวัน', name_en: 'Pathum Wan' },
      { id: 5, name_th: 'เขตสาทร', name_en: 'Sathon' }
    ];
    provinces = [
      { id: 1, name_th: 'เชียงใหม่', name_en: 'Chiang Mai' },
      { id: 2, name_th: 'ชลบุรี', name_en: 'Chonburi' },
      { id: 3, name_th: 'ภูเก็ต', name_en: 'Phuket' },
      { id: 4, name_th: 'นนทบุรี', name_en: 'Nonthaburi' },
      { id: 5, name_th: 'ปทุมธานี', name_en: 'Pathum Thani' }
    ];
  }
  
  return (
    <div className="bg-earth-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-prompt font-bold text-earth-900 mb-4 text-center">
            {t.registration.title}
          </h1>
          
          <p className="text-center text-earth-700 mb-8 font-prompt">
            {locale === 'th' ? 
              'กรอกข้อมูลเพื่อลงทะเบียนเข้าร่วมงานสัมมนา' : 
              'Fill in the form to register for the seminar'}
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-earth-200 p-6">
            <RegistrationForm 
              locale={locale}
              organizationTypes={organizationTypes}
              transportationTypes={transportationTypes}
              seminarRooms={seminarRooms}
              bangkokDistricts={bangkokDistricts}
              provinces={provinces}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
