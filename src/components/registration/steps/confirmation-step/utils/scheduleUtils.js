'use client';

/**
 * Utility functions for schedule-related operations
 */

/**
 * Get formatted time for selected room
 * @param {Array} scheduleData - Schedule data
 * @param {Object} selectedRoom - Selected seminar room
 * @param {string} locale - Current locale
 * @returns {string} - Formatted time string
 */
export const getSelectedRoomTimeInfo = (scheduleData, selectedRoom, locale) => {
  if (!selectedRoom) return '';
  
  const selectedRoomSchedule = scheduleData.filter(item => 
    item.room_id === selectedRoom.id && !item.is_morning
  );
  
  if (selectedRoomSchedule.length > 0) {
    const firstSession = selectedRoomSchedule[0];
    const startTime = firstSession.time_start?.substring(0, 5);
    const endTime = firstSession.time_end?.substring(0, 5);
    return startTime && endTime ? `${startTime} - ${endTime}` : '';
  }
  
  // Default time if no schedule data is available
  return locale === 'th' ? '13.30-16.30' : '13:30-16:30';
};

/**
 * Get morning session time
 * @param {Array} scheduleData - Schedule data
 * @param {string} locale - Current locale
 * @returns {string} - Formatted time string
 */
export const getMorningTimeInfo = (scheduleData, locale) => {
  const morningSchedule = scheduleData.filter(item => item.is_morning);
  
  if (morningSchedule.length > 0) {
    // Find first and last sessions
    const sortedSessions = [...morningSchedule].sort((a, b) => 
      a.time_start.localeCompare(b.time_start)
    );
    const firstSession = sortedSessions[0];
    const lastSession = sortedSessions[sortedSessions.length - 1];
    
    const startTime = firstSession.time_start?.substring(0, 5);
    const endTime = lastSession.time_end?.substring(0, 5);
    return startTime && endTime ? `${startTime} - ${endTime}` : '';
  }
  
  // Default time if no schedule data is available
  return locale === 'th' ? '09.00-12.00' : '09:00-12:00';
};

/**
 * Get attendance type label
 * @param {Object} formData - Form data object
 * @param {Object} t - Translation object
 * @returns {string} - Attendance type label
 */
export const getAttendanceTypeLabel = (formData, t) => {
  switch (formData.attendanceType) {
    case 'morning':
      return t.registration.attendanceMorning;
    case 'afternoon':
      return t.registration.attendanceAfternoon;
    case 'full_day':
      return t.registration.attendanceFullDay;
    default:
      return '';
  }
};
