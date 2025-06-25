'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ScheduleList({ scheduleItems, onEdit, onDelete }) {
  const [expandedItems, setExpandedItems] = useState({});
  
  console.log('ScheduleList received items:', scheduleItems);
  
  // Group schedule items by date
  const groupedSchedule = useMemo(() => {
    const groupedByDate = {};
    
    // Ensure scheduleItems is an array before processing
    if (!Array.isArray(scheduleItems)) {
      console.error('scheduleItems is not an array:', scheduleItems);
      return [];
    }
    
    // Check if array is empty
    if (scheduleItems.length === 0) {
      console.log('scheduleItems array is empty');
      return [];
    }
    
    scheduleItems.forEach(item => {
      try {
        // Validate item has event_date and time_start properties
        if (!item || !item.event_date) {
          console.warn('Invalid schedule item found (missing event_date):', item);
          return; // Skip this item
        }
        
        // ใช้ event_date จาก API
        const eventDate = new Date(item.event_date);
        
        // Check if date is valid
        if (isNaN(eventDate.getTime())) {
          console.warn('Invalid date in schedule item:', item);
          return; // Skip this item
        }
        
        const date = format(eventDate, 'yyyy-MM-dd');
        
        if (!groupedByDate[date]) {
          groupedByDate[date] = [];
        }
        
        groupedByDate[date].push(item);
      } catch (error) {
        console.error('Error processing schedule item:', error, item);
      }
    });
    
    // Sort dates and items within each date
    const result = [];
    
    Object.keys(groupedByDate)
      .sort((a, b) => new Date(a) - new Date(b))
      .forEach(date => {
        const items = groupedByDate[date].sort((a, b) => {
          // ใช้ time_start จาก API แทน start_time
          const timeA = a.time_start || '';
          const timeB = b.time_start || '';
          return timeA.localeCompare(timeB);
        });
        
        result.push({
          date,
          items
        });
      });
    
    return result;
  }, [scheduleItems]);
  
  // Toggle item expansion
  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Format time (HH:MM)
  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };
  
  // Format date to Thai format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE d MMMM yyyy', { locale: th });
    } catch (error) {
      return dateString;
    }
  };
  
  // ตรวจสอบว่ามีข้อมูลหรือไม่
  if (!scheduleItems || scheduleItems.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 font-prompt text-lg">ไม่พบข้อมูลตารางกิจกรรม</p>
          <p className="text-gray-400 font-prompt text-sm">กรุณาเพิ่มกิจกรรมโดยคลิกที่ปุ่ม "เพิ่มกิจกรรม"</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {groupedSchedule.map(dateGroup => (
        <div key={dateGroup.date} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-earth-100 px-6 py-4">
            <h3 className="text-xl font-prompt font-semibold text-earth-800 capitalize">
              {formatDate(dateGroup.date)}
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {dateGroup.items.map(item => (
              <div key={item.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500 font-prompt">
                        {formatTime(item.time_start)} - {formatTime(item.time_end)}
                      </span>
                      <h4 className="text-lg font-prompt font-medium text-earth-800">
                        {item.title_th}
                      </h4>
                    </div>
                    
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-1 bg-earth-100 text-earth-800 text-xs rounded-full font-prompt">
                        {item.room_name_th}
                      </span>
                      {item.speaker_th && (
                        <span className="text-sm text-gray-600 font-prompt">
                          วิทยากร: {item.speaker_th}
                        </span>
                      )}
                    </div>
                    
                    {/* Expandable description */}
                    {item.description_th && (
                      <div className="mt-2">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="flex items-center text-sm text-earth-600 hover:text-earth-800 font-prompt"
                        >
                          {expandedItems[item.id] ? (
                            <>
                              <ChevronUpIcon className="h-4 w-4 mr-1" />
                              ซ่อนรายละเอียด
                            </>
                          ) : (
                            <>
                              <ChevronDownIcon className="h-4 w-4 mr-1" />
                              ดูรายละเอียด
                            </>
                          )}
                        </button>
                        
                        {expandedItems[item.id] && (
                          <div className="mt-2 pl-2 border-l-2 border-earth-200 text-sm text-gray-700 font-prompt">
                            {item.description_th}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 rounded-full text-earth-600 hover:bg-earth-100 hover:text-earth-800 transition-colors"
                      title="แก้ไขกิจกรรม"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 rounded-full text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors"
                      title="ลบกิจกรรม"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
