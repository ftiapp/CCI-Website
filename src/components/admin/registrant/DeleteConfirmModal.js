import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function DeleteConfirmModal({ registrant, onConfirm, onCancel }) {
  if (!registrant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-center mb-4 text-red-600">
          <ExclamationTriangleIcon className="h-12 w-12" />
        </div>
        
        <h3 className="text-xl font-prompt font-semibold mb-2 text-center">ยืนยันการลบข้อมูล</h3>
        
        <div className="mb-6 text-center">
          <p className="text-gray-700 font-prompt mb-2">
            คุณต้องการลบข้อมูลผู้ลงทะเบียนนี้ใช่หรือไม่?
          </p>
          <p className="font-prompt font-semibold">
            {registrant.first_name} {registrant.last_name}
          </p>
          <p className="text-sm text-gray-500 font-prompt">
            รหัสลงทะเบียน: {registrant.uuid}
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-prompt"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 font-prompt"
          >
            ยืนยันการลบ
          </button>
        </div>
      </div>
    </div>
  );
}
