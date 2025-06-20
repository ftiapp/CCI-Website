'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function ScheduleList({ scheduleItems, onEdit, onDelete }) {
  const [expandedItems, setExpandedItems] = useState({});
  
  // Group schedule items by date
  const groupedByDate = scheduleItems.reduce((acc, item) => {
    const date = item.event_date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
  
  // Sort dates
  const sortedDates = Object.keys(groupedByDate).sort();
  
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
  
  if (scheduleItems.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 font-prompt">ไม่พบข้อมูลตารางกิจกรรม</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {sortedDates.map(date => (
        <div key={date} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-earth-100 px-6 py-4">
            <h3 className="text-xl font-prompt font-semibold text-earth-800 capitalize">
              {formatDate(date)}
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {groupedByDate[date].map(item => (
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
                          <div className="mt-2 text-sm text-gray-600 font-prompt">
                            {item.description_th}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="แก้ไข"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="ลบ"
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
