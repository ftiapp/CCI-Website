'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and manage schedule data
 * @returns {Array} - Schedule data array
 */
const useScheduleData = () => {
  const [scheduleData, setScheduleData] = useState([]);
  
  // Fetch schedule data when component mounts
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch('/api/schedule');
        const result = await response.json();
        if (result.success) {
          setScheduleData(result.data);
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      }
    };
    
    fetchScheduleData();
  }, []);
  
  return scheduleData;
};

export default useScheduleData;
