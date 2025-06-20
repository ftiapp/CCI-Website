'use client';

import { memo } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import SectionCard from './SectionCard';
import InfoItem from './InfoItem';
import { getAttendanceTypeLabel, getMorningTimeInfo, getSelectedRoomTimeInfo } from '../utils/scheduleUtils';

/**
 * AttendanceInfoSection Component - Displays attendance information
 * @param {Object} props - Component props
 * @param {Object} props.formData - Form data object
 * @param {Array} props.scheduleData - Schedule data
 * @param {Array} props.seminarRooms - Seminar rooms data
 * @param {Object} props.t - Translation object
 * @param {string} props.locale - Current locale
 */
const AttendanceInfoSection = ({ formData, scheduleData, seminarRooms, t, locale }) => {
  // Find selected seminar room (if applicable)
  const selectedRoom = formData.selectedRoomId ? 
    seminarRooms?.find(room => room.id.toString() === formData.selectedRoomId?.toString()) : 
    null;

  return (
    <SectionCard 
      icon={CalendarIcon} 
      title={t.registration.attendanceInfo}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          label={t.registration.attendanceType}
          value={getAttendanceTypeLabel(formData, t)}
          locale={locale}
        />
        
        {formData.attendanceType === 'morning' && (
          <InfoItem 
            label={locale === 'th' ? 'เวลา' : 'Time'}
            value={getMorningTimeInfo(scheduleData, locale)}
            locale={locale}
          />
        )}
        
        {(formData.attendanceType === 'afternoon' || formData.attendanceType === 'full_day') && selectedRoom && (
          <>
            <InfoItem 
              label={t.registration.selectRoom}
              value={locale === 'th' ? selectedRoom.name_th : selectedRoom.name_en}
              locale={locale}
            />
            <InfoItem 
              label={locale === 'th' ? 'เวลา' : 'Time'}
              value={getSelectedRoomTimeInfo(scheduleData, selectedRoom, locale)}
              locale={locale}
            />
          </>
        )}
      </div>
    </SectionCard>
  );
};

export default memo(AttendanceInfoSection);
