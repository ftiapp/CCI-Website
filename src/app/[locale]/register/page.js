import { getTranslations } from '@/i18n';
import { getSchedule } from '@/lib/db';
import ScheduleClient from '@/components/schedule/ScheduleClient';
import { EventStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';
import { generateMetadata } from './metadata';

export { generateMetadata };

// Map Component (from map/page.js)
function MapComponent({ locale }) {
  const translations = {
    th: {
      pageTitle: 'แผนที่และวิธีการเดินทาง',
      location: 'สถานที่',
      locationDetail: 'ชั้น 8 ห้องใบไม้, อาคารเอ็มทาวเวอร์ (M-Tower)',
      bts: 'รถไฟฟ้า BTS',
      btsDetail: 'ลงสถานีบางจาก (ทางออก 4) ฝั่งซอยสุขุมวิท 62 จากนั้นเดิน 120 เมตร มายังอาคาร M Tower',
      bus: 'รถโดยสารประจำทาง',
      busDetail: 'ลงที่ป้ายอู่บางจาก ห่างจากอาคาร M Tower ประมาณ 100 เมตร',
      busRoutes: 'สายรถที่ให้บริการ: 2, 23, 25, 38, 45, 46, 48, 98, 116',
      car: 'รถยนต์ส่วนตัว',
      carDetail: 'จอดรถได้ที่อาคาร M Tower',
      carExpressway: 'สำหรับผู้ที่เดินทางจากทางด่วน',
      carExpresswayDetail: 'ใช้ทางออก "สุขุมวิท 62" จากทางด่วน จากนั้นขับตรงเข้าสู่ซอยสุขุมวิท 62/1 ตามป้ายแสดงทางไปยังอาคาร M Tower',
      carNote: 'ไม่แนะนำให้เลี้ยวซ้ายเข้าสู่ถนนสุขุมวิท 62 โดยตรง เนื่องจากอาจต้องเผชิญกับสัญญาณไฟจราจรและการกลับรถ',
      mapTitle: 'แผนที่อาคารเอ็มทาวเวอร์ (M-Tower)',
      address: 'เลขที่ 944 ถนนพระราม 4 แขวงพระโขนง เขตคลองเตย กรุงเทพฯ 10110',
      viewGoogleMap: 'ดูใน Google Maps',
    },
    en: {
      pageTitle: 'Map & Directions',
      location: 'Location',
      locationDetail: '8th Floor, Bai Mai Room, M-Tower Building',
      bts: 'BTS Skytrain',
      btsDetail: 'Alight at Bang Chak Station (Exit 4), Sukhumvit Soi 62 side, then walk 120 meters to M Tower',
      bus: 'Public Bus',
      busDetail: 'Disembark at Bang Chak Bus Depot, approximately 100 meters from M Tower',
      busRoutes: 'Bus routes available: 2, 23, 25, 38, 45, 46, 48, 98, 116',
      car: 'Private Vehicle',
      carDetail: 'Parking available at M Tower Building',
      carExpressway: 'For those traveling via expressway',
      carExpresswayDetail: 'Take "Sukhumvit 62" exit from expressway, then proceed straight into Sukhumvit Soi 62/1 following signs to M Tower',
      carNote: 'Note: Not recommended to turn left directly into Sukhumvit 62 as you may encounter traffic signals and U-turn requirements',
      mapTitle: 'Map of M-Tower Building',
      address: '944 Rama 4 Road, Phra Khanong, Khlong Toei, Bangkok 10110',
      viewGoogleMap: 'View on Google Maps',
    }
  };
  const t = translations[locale] || translations.th;

  return (
    <div className="p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Travel Options */}
        <div className="space-y-6">
          <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">{t.location}</h3>
              <p className="text-slate-600 mb-1">{t.locationDetail}</p>
              <p className="text-slate-500 text-sm">{t.address}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">{t.bts}</h3>
              <p className="text-slate-600">{t.btsDetail}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">{t.bus}</h3>
              <p className="text-slate-600 mb-2">{t.busDetail}</p>
              <p className="text-slate-500 text-sm">{t.busRoutes}</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h6l1 3v6h-2.5m0 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 11-3 0m3 0H9.5m0 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 11-3 0M7 6V4a1 1 0 011-1h8a1 1 0 011 1v2m-6 5h4" /></svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">{t.car}</h3>
              <p className="text-slate-600 mb-2">{t.carDetail}</p>
              <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
                <h4 className="text-sm font-semibold text-slate-700 mb-1">{t.carExpressway}</h4>
                <p className="text-slate-600 text-sm mb-2">{t.carExpresswayDetail}</p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                  <p className="text-amber-800 text-xs"><span className="font-semibold">⚠️ {locale === 'th' ? 'หมายเหตุ' : 'Note'}:</span> {t.carNote}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column - Google Maps Embed */}
        <div className="space-y-4">
          <div className="bg-slate-100 rounded-xl overflow-hidden shadow-inner">
            <div className="aspect-video">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7724587367687!2d100.60317877573784!3d13.694413189634088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f8d20ea7e3f%3A0x350a82ea9b46f282!2sM%20Tower!5e0!3m2!1sen!2sth!4v1688193124803!5m2!1sen!2sth" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title={t.mapTitle}
              />
            </div>
          </div>
          <div className="text-center">
            <a 
              href="https://www.google.com/maps/place/M+Tower/@13.6945501,100.6056892,18.54z/data=!4m14!1m7!3m6!1s0x30e29f8d20ea7e3f:0x350a82ea9b46f282!2sM+Tower!8m2!3d13.6944132!4d100.605766!16s%2Fg%2F11bwmsyz7v!3m5!1s0x30e29f8d20ea7e3f:0x350a82ea9b46f282!8m2!3d13.6944132!4d100.605766!16s%2Fg%2F11bwmsyz7v?hl=en&entry=ttu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {t.viewGoogleMap}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function RegistrationClosedPage({ params }) {
  const _params = await Promise.resolve(params);
  const locale = _params?.locale || 'th';
  const t = getTranslations(locale);

  // Fetch schedule data
  let scheduleData = [];
  try {
    scheduleData = await getSchedule();
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    scheduleData = [];
  }

  const eventDate = scheduleData.length > 0 ? scheduleData[0].event_date : null;
  const morningSchedule = scheduleData.filter(item => item.is_morning);
  const afternoonSchedule = scheduleData.filter(item => !item.is_morning);
  const afternoonByRoom = {};
  afternoonSchedule.forEach(item => {
    if (!afternoonByRoom[item.room_id]) {
      afternoonByRoom[item.room_id] = [];
    }
    afternoonByRoom[item.room_id].push(item);
  });

  const scheduleTranslations = {
    title: t.schedule.title,
    morning: t.schedule.morning,
    afternoon: t.schedule.afternoon,
    time: t.schedule.time,
    topic: t.schedule.topic,
    speaker: t.schedule.speaker,
    room: t.schedule.room,
    description: t.schedule.description
  };

  const breadcrumbItems = [
    {
      name: locale === 'th' ? 'หน้าหลัก' : 'Home',
      path: `/${locale}`
    },
    {
      name: locale === 'th' ? 'ปิดลงทะเบียน' : 'Registration Closed',
      path: `/${locale}/register`
    }
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} locale={locale} />
      <EventStructuredData locale={locale} />
      <div className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200">
            
            {/* Registration Closed Message */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-prompt font-bold text-slate-800 mb-4">
                ขอบคุณทุกท่านที่ให้ความสนใจเข้าร่วมงาน
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-6">
                ขณะนี้ได้ปิดระบบลงทะเบียนเรียบร้อยแล้ว
              </p>
              <p className="text-md sm:text-lg text-slate-700 bg-slate-100 p-4 rounded-lg inline-block">
                แล้วพบกันในงาน <span className="font-semibold">CCI Climate Change Forum 2025</span> <br/>ในวันที่ 15 กันยายน 2568
              </p>
            </div>

            {/* Divider */}
            <hr className="my-12 border-slate-200" />

            {/* Schedule Section */}
            <div id="schedule">
              <h2 className="text-3xl font-prompt font-bold text-center mb-8 text-slate-800">{t.schedule.title}</h2>
              <ScheduleClient
                morningSchedule={morningSchedule}
                afternoonByRoom={afternoonByRoom}
                locale={locale}
                translations={scheduleTranslations}
                eventDate={eventDate}
              />
            </div>

            {/* Divider */}
            <hr className="my-12 border-slate-200" />

            {/* Map Section */}
            <div id="map">
               <h2 className="text-3xl font-prompt font-bold text-center mb-8 text-slate-800">แผนที่และวิธีการเดินทาง</h2>
              <MapComponent locale={locale} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
