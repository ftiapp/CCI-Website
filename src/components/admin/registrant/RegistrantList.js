import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ConsistentHeader from '../../layout/ConsistentHeader';

export default function RegistrantList({
  registrants,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDelete
}) {
  // Function to format date in Thai locale
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return '-';
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '-';
    }
  };

  // Function to get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 0:
        return 'bg-yellow-100 text-yellow-800'; // Not checked in
      case 1:
        return 'bg-green-100 text-green-800'; // Checked in
      case 2:
        return 'bg-red-100 text-red-800'; // Not attending
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get status text
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'ยังไม่ได้เช็คอิน';
      case 1:
        return 'เช็คอินแล้ว';
      case 2:
        return 'ไม่เข้าร่วม';
      default:
        return 'ไม่ระบุ';
    }
  };
  
  // Function to check if transportation type is public or walking
  const isEligibleForGift = (transportType) => {
    // Return false if transportType is null, undefined, or not a string
    if (!transportType || typeof transportType !== 'string') return false;
    
    try {
      const lowerType = transportType.toLowerCase();
      return lowerType.includes('public') || 
             lowerType.includes('bus') || 
             lowerType.includes('train') || 
             lowerType.includes('walk') || 
             lowerType.includes('เดิน') || 
             lowerType.includes('ขนส่งมวลชน') || 
             lowerType.includes('รถเมล์') || 
             lowerType.includes('รถไฟ') || 
             lowerType.includes('bts') || 
             lowerType.includes('mrt');
    } catch (error) {
      console.error('Error checking gift eligibility:', error);
      return false;
    }
  };

  // Function to get attendance type text
  const getAttendanceTypeText = (type) => {
    switch (type) {
      case 'morning':
        return 'ช่วงเช้า';
      case 'afternoon':
        return 'ช่วงบ่าย';
      case 'full_day':
        return 'เต็มวัน';
      default:
        return type;
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } font-prompt`}
      >
        &laquo; ก่อนหน้า
      </button>
    );
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } font-prompt`}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        } font-prompt`}
      >
        ถัดไป &raquo;
      </button>
    );
    
    return buttons;
  };

  return (
    <div>
      <ConsistentHeader 
        title="จัดการผู้ลงทะเบียน" 
        subtitle="รายการผู้ลงทะเบียนทั้งหมดในระบบ" 
        icon="users" 
      />
      <div className="bg-white rounded-lg shadow overflow-hidden">
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : !registrants || registrants.length === 0 ? (
        <div className="p-8 text-center text-gray-500 font-prompt">
          ไม่พบข้อมูลผู้ลงทะเบียนที่ตรงกับเงื่อนไขการค้นหา
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    รหัส
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    ชื่อ-นามสกุล
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    อีเมล/เบอร์โทร
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    องค์กร
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    การเข้าร่วม
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    สถานะ
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    วันที่ลงทะเบียน
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider font-prompt">
                    จัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrants.map((registrant) => (
                  <tr key={registrant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-prompt">
                      {registrant.uuid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-prompt">
                      <div className="flex items-center">
                        <span>{registrant.first_name} {registrant.last_name}</span>
                        {isEligibleForGift(registrant.transport_type) && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded bg-red-600 text-white">
                            SOUVENIR
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-prompt">
                      <div>{registrant.email}</div>
                      <div>{registrant.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-prompt">
                      <div>{registrant.organization_name}</div>
                      <div className="text-xs text-gray-400">
                        {registrant.organization_type_th}
                        {/* แสดงข้อมูลเพิ่มเติมเมื่อเลือกประเภทองค์กรเป็น "อื่นๆ" */}
                        {registrant.organization_type_id && registrant.organization_type_id === 99 && registrant.organization_type_other && (
                          <span className="ml-1">: {registrant.organization_type_other}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {registrant.industry_type_th}
                        {/* แสดงข้อมูลเพิ่มเติมเมื่อเลือกประเภทอุตสาหกรรมเป็น "อื่นๆ" */}
                        {registrant.industry_type_id && registrant.industry_type_id === 99 && registrant.industry_type_other && (
                          <span className="ml-1">: {registrant.industry_type_other}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-prompt">
                      <div>{getAttendanceTypeText(registrant.attendance_type)}</div>
                      {registrant.room_name_th && (
                        <div className="text-xs text-gray-400">
                          {registrant.room_name_th}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-prompt">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(registrant.check_in_status)}`}>
                        {getStatusText(registrant.check_in_status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-prompt">
                      {formatDate(registrant.registration_date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => onEdit(registrant.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="แก้ไข"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onDelete(registrant)}
                          className="text-red-600 hover:text-red-900"
                          title="ลบ"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-700 font-prompt">
                หน้า {currentPage} จาก {totalPages}
              </div>
              <div className="flex space-x-1">
                {renderPaginationButtons()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
}
