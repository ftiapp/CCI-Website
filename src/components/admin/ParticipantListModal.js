'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ParticipantListModal({ participants, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-white">
          <h3 className="text-xl font-prompt font-semibold text-earth-800">
            พบผู้เข้าร่วมหลายคน
          </h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            พบผู้เข้าร่วมหลายคนที่มีชื่อตรงกับคำค้นหา กรุณาเลือกผู้เข้าร่วมที่ต้องการ
          </p>
          
          <div className="space-y-2">
            {participants.map((participant) => (
              <div 
                key={participant.id}
                onClick={() => onSelect(participant)}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-prompt font-medium text-earth-800">
                      {participant.first_name} {participant.last_name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {participant.organization_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">รหัสลงทะเบียน</p>
                    <p className="text-sm font-medium">{participant.uuid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
