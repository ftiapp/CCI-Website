import { getTranslations } from '@/i18n';
import { getSchedule } from '@/lib/db';
import ScheduleClient from '@/components/schedule/ScheduleClient';
import { EventStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData';
import { generateMetadata } from './metadata';

export { generateMetadata };

export default async function SchedulePage({ params }) {
  // ใช้วิธีการดึงค่า locale ที่ถูกต้องตาม Next.js 15
  // Await params before accessing its properties as required in Next.js 15
  const _params = await Promise.resolve(params);
  const { locale = 'th' } = _params || {};
  const t = getTranslations(locale);
  
  // Fetch schedule data with error handling
  let scheduleData = [];
  
  try {
    scheduleData = await getSchedule();
  } catch (error) {
    console.error('Error fetching schedule data:', error);
    // Return empty array instead of using mock data
    scheduleData = [];
  }
  
  // Extract event date (use the first item's date)
  const eventDate = scheduleData.length > 0 ? scheduleData[0].event_date : null;
  
  // Group schedule by morning/afternoon
  const morningSchedule = scheduleData.filter(item => item.is_morning);
  const afternoonSchedule = scheduleData.filter(item => !item.is_morning);
  
  // Group afternoon schedule by room
  const afternoonByRoom = {};
  afternoonSchedule.forEach(item => {
    if (!afternoonByRoom[item.room_id]) {
      afternoonByRoom[item.room_id] = [];
    }
    afternoonByRoom[item.room_id].push(item);
  });
  
  // Prepare translations for client component
  const translations = {
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
      name: locale === 'th' ? 'กำหนดการ' : 'Schedule',
      path: `/${locale}/schedule`
    }
  ];

  return (
    <>
      <EventStructuredData locale={locale} />
      <BreadcrumbStructuredData items={breadcrumbItems} locale={locale} />
      <ScheduleClient
        morningSchedule={morningSchedule}
        afternoonByRoom={afternoonByRoom}
        locale={locale}
        translations={translations}
        eventDate={eventDate}
      />
    </>
  );
}
