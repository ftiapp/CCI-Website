import React, { useState } from 'react';

export default function NotificationModal({ registrant, notificationType, onSend, onCancel }) {
  const [selectedChannels, setSelectedChannels] = useState(['email', 'sms']);

  const handleChannelToggle = (channel) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const getNotificationTitle = () => {
    if (notificationType === 'update') {
      return 'แจ้งเตือนการอัปเดตข้อมูล';
    } else if (notificationType === 'delete') {
      return 'แจ้งเตือนการยกเลิกการลงทะเบียน';
    }
    return 'แจ้งเตือน';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-prompt font-semibold mb-4">{getNotificationTitle()}</h3>
        
        <div className="mb-4">
          <p className="font-prompt mb-2">ส่งการแจ้งเตือนไปยัง:</p>
          <p className="text-gray-700 font-prompt">
            {registrant.firstName} {registrant.lastName}
          </p>
        </div>
        
        <div className="mb-6">
          <p className="font-prompt mb-2">เลือกช่องทางการแจ้งเตือน:</p>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 font-prompt">
              <input
                type="checkbox"
                checked={selectedChannels.includes('email')}
                onChange={() => handleChannelToggle('email')}
                className="h-4 w-4"
              />
              <span>อีเมล ({registrant.email})</span>
            </label>
            <label className="flex items-center space-x-2 font-prompt">
              <input
                type="checkbox"
                checked={selectedChannels.includes('sms')}
                onChange={() => handleChannelToggle('sms')}
                className="h-4 w-4"
              />
              <span>SMS ({registrant.phone})</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-prompt"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => onSend(selectedChannels)}
            disabled={selectedChannels.length === 0}
            className={`px-4 py-2 rounded-md text-white font-prompt ${
              selectedChannels.length === 0
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            ส่งการแจ้งเตือน
          </button>
        </div>
      </div>
    </div>
  );
}
