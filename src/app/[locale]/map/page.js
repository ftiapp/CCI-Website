import Link from 'next/link';

export default async function MapPage({ params }) {
  const resolvedParams = await params;
  const { locale = 'th' } = resolvedParams || {};
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
      backToHome: 'กลับสู่หน้าหลัก',
      welcome: 'แผนที่และวิธีการเดินทาง',
      welcomeMessage: 'CCI Climate Change Forum 2025',
      journeyStart: 'เริ่มต้นการเดินทางของคุณ',
      journeyMessage: 'ค้นพบข้อมูลสำคัญและเตรียมตัวเดินทางมาร่วมงานกับเรา',
      directions: 'วิธีการเดินทาง',
      directionsDetail: 'ข้อมูลการเดินทางและแผนที่สำหรับงาน CCI Climate Change Forum 2025',
      viewDirections: 'ดูวิธีการเดินทาง',
      registerNow: 'ลงทะเบียนเลย',
      registerDetail: 'ลงทะเบียนเข้าร่วมงาน CCI Climate Change Forum 2025 ได้ง่ายๆ และรับข้อมูลอัปเดตล่าสุด',
      eventInfo: 'ข้อมูลงาน',
      eventInfoDetail: 'รายละเอียดเกี่ยวกับงาน CCI Climate Change Forum 2025 และกำหนดการต่างๆ',
      viewEventInfo: 'ดูข้อมูลงาน'
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
      backToHome: 'Back to Home',
      welcome: 'Map & Directions',
      welcomeMessage: 'CCI Climate Change Forum 2025',
      journeyStart: 'Start Your Journey',
      journeyMessage: 'Discover important information and prepare your trip to join us',
      directions: 'Directions',
      directionsDetail: 'Travel information and map for CCI Climate Change Forum 2025',
      viewDirections: 'View Directions',
      registerNow: 'Register Now',
      registerDetail: 'Register for CCI Climate Change Forum 2025 easily and receive the latest updates',
      eventInfo: 'Event Information',
      eventInfoDetail: 'Details about CCI Climate Change Forum 2025 and various schedules',
      viewEventInfo: 'View Event Info'
    }
  };
  const t = translations[locale] || translations.th;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-prompt font-bold text-slate-800">
              {t.pageTitle}
            </h1>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
            >
              ← {t.backToHome}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-12 md:px-8 md:py-16">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-prompt font-bold text-white mb-6">
                {t.welcome}
              </h2>
              
              <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl leading-relaxed mb-12">
                {t.welcomeMessage}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mb-8">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">ชั้น 8</div>
                  <div className="text-slate-600">{locale === 'th' ? 'ห้องประชุมใบไม้' : 'Floor, Bai Mai Room'}</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="text-3xl font-bold text-teal-600 mb-2">BTS</div>
                  <div className="text-slate-600">{locale === 'th' ? 'สถานีบางจาก' : 'Bang Chak Station'}</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="text-3xl font-bold text-blue-600 mb-2">944</div>
                  <div className="text-slate-600">{locale === 'th' ? 'ถนนพระราม 4' : 'Rama 4 Road'}</div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>
          
          {/* Travel Information */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Travel Options */}
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">
                      {t.location}
                    </h3>
                    <p className="text-slate-600 mb-1">{t.locationDetail}</p>
                    <p className="text-slate-500 text-sm">{t.address}</p>
                  </div>
                </div>
                
                {/* BTS */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">
                      {t.bts}
                    </h3>
                    <p className="text-slate-600">{t.btsDetail}</p>
                  </div>
                </div>
                
                {/* Bus */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">
                      {t.bus}
                    </h3>
                    <p className="text-slate-600 mb-2">{t.busDetail}</p>
                    <p className="text-slate-500 text-sm">{t.busRoutes}</p>
                  </div>
                </div>
                
                {/* Car */}
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 6h6l1 3v6h-2.5m0 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 11-3 0m3 0H9.5m0 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 11-3 0M7 6V4a1 1 0 011-1h8a1 1 0 011 1v2m-6 5h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-prompt font-semibold text-slate-800 mb-1">
                      {t.car}
                    </h3>
                    <p className="text-slate-600 mb-2">{t.carDetail}</p>
                    
                    {/* Expressway section */}
                    <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200">
                      <h4 className="text-sm font-semibold text-slate-700 mb-1">
                        {t.carExpressway}
                      </h4>
                      <p className="text-slate-600 text-sm mb-2">{t.carExpresswayDetail}</p>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                        <p className="text-amber-800 text-xs">
                          <span className="font-semibold">⚠️ {locale === 'th' ? 'หมายเหตุ' : 'Note'}:</span> {t.carNote}
                        </p>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.3747404152685!2d100.60823807573724!3d13.6858899896339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29fc2f2a9e0d5%3A0x9f133c97c83d73a!2sM%20Tower!5e0!3m2!1sen!2sth!4v1688193124803!5m2!1sen!2sth" 
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
                
                {/* Google Maps Link */}
                <div className="text-center">
                  <a 
                    href="https://maps.app.goo.gl/Uw2Yvb8Ue3Ck9Ld77" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t.viewGoogleMap}
                  </a>
                </div>
              </div>
            </div>

            {/* Journey Section */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-prompt font-bold text-slate-900 mb-4">
                  {t.journeyStart}
                </h3>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  {t.journeyMessage}
                </p>
              </div>

              {/* Additional Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Directions Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-lg font-prompt font-bold text-slate-800 mb-2">
                            {t.directions}
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {t.directionsDetail}
                          </p>
                        </div>
                        <Link 
                          href={`/${locale}/map`} 
                          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold group-hover:translate-x-1 transition-all duration-200 text-sm"
                        >
                          <span>{t.viewDirections}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-lg font-prompt font-bold text-slate-800 mb-2">
                            {t.registerNow}
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {t.registerDetail}
                          </p>
                        </div>
                        <Link 
                          href={`/${locale}/register`} 
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-200 text-sm"
                        >
                          <span>{t.registerNow}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Info Card */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-lg font-prompt font-bold text-slate-800 mb-2">
                            {t.eventInfo}
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {t.eventInfoDetail}
                          </p>
                        </div>
                        <Link 
                          href={`/${locale}/schedule`} 
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold group-hover:translate-x-1 transition-all duration-200 text-sm"
                        >
                          <span>{t.viewEventInfo}</span>
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}