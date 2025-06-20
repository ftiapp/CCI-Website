'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, QrCodeIcon, CheckCircleIcon, XCircleIcon, GiftIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import ParticipantListModal from './ParticipantListModal';

export default function CheckInSystem() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isEligibleForGift, setIsEligibleForGift] = useState(false);
  const [multipleParticipants, setMultipleParticipants] = useState(null);
  const searchInputRef = useRef(null);
  
  // Focus on search input when component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  
  // Reset form and focus on search input
  const resetForm = () => {
    setSearchQuery('');
    setParticipant(null);
    setIsCheckedIn(false);
    setIsEligibleForGift(false);
    setMultipleParticipants(null);
    
    // Focus back on search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('กรุณาระบุรหัสลงทะเบียนหรือชื่อ-นามสกุลผู้เข้าร่วม', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
      return;
    }
    
    setIsSearching(true);
    setParticipant(null);
    setMultipleParticipants(null);
    
    try {
      // Determine if search query is a UUID or name
      const isUuid = searchQuery.toUpperCase().startsWith('CCI-');
      
      // API endpoint based on search type
      const endpoint = isUuid 
        ? `/api/admin/participant-by-uuid?uuid=${encodeURIComponent(searchQuery)}`
        : `/api/admin/participant-by-name?name=${encodeURIComponent(searchQuery)}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.success) {
        if (data.participant) {
          // Single participant found
          setParticipant(data.participant);
          setIsCheckedIn(data.participant.check_in_status === 1);
          
          // Check if eligible for gift (public transport or walking)
          const isPublicTransport = data.participant.transportation_category === 'public';
          const isWalking = data.participant.public_transport_type === 'walking';
          setIsEligibleForGift(isPublicTransport || isWalking);
        } else if (data.participants && data.participants.length > 0) {
          // Multiple participants found
          setMultipleParticipants(data.participants);
        }
      } else {
        toast.error('ไม่พบข้อมูลผู้เข้าร่วม', {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        });
      }
    } catch (error) {
      console.error('Error searching for participant:', error);
      toast.error('เกิดข้อผิดพลาดในการค้นหาข้อมูล', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    } finally {
      setIsSearching(false);
    }
  };
  
  // Handle participant selection from modal
  const handleParticipantSelect = (selectedParticipant) => {
    setParticipant(selectedParticipant);
    setIsCheckedIn(selectedParticipant.check_in_status === 1);
    
    // Check if eligible for gift (public transport or walking)
    const isPublicTransport = selectedParticipant.transportation_category === 'public';
    const isWalking = selectedParticipant.public_transport_type === 'walking';
    setIsEligibleForGift(isPublicTransport || isWalking);
    
    // Close modal
    setMultipleParticipants(null);
  };
  
  // Handle check-in/out
  const handleCheckInToggle = async () => {
    if (!participant) return;
    
    try {
      // Toggle check-in status
      const newStatus = isCheckedIn ? 0 : 1;
      
      // API call to update check-in status
      const response = await fetch('/api/admin/update-check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: participant.id,
          checkInStatus: newStatus,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const message = !isCheckedIn 
          ? 'เช็คอินสำเร็จ' 
          : 'ยกเลิกการเช็คอินสำเร็จ';
        
        toast.success(message, {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        });
        
        // Reset form for next check-in
        resetForm();
      } else {
        throw new Error(data.error || 'Failed to update check-in status');
      }
    } catch (error) {
      console.error('Error toggling check-in status:', error);
      toast.error('เกิดข้อผิดพลาดในการอัพเดทสถานะเช็คอิน', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    }
  };

  // Handle marking as not attending
  const handleMarkNotAttending = async () => {
    if (!participant) return;
    
    try {
      // API call to mark as not attending
      const response = await fetch('/api/admin/update-check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: participant.id,
          checkInStatus: 2, // 2 = not attending
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('บันทึกสถานะไม่เข้าร่วมสำเร็จ', {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        });
        
        // Reset form for next check-in
        resetForm();
      } else {
        throw new Error(data.error || 'Failed to update attendance status');
      }
    } catch (error) {
      console.error('Error marking as not attending:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกสถานะไม่เข้าร่วม', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    }
  };

  // Handle QR code scanner
  const handleQRScan = () => {
    // Check if browser supports Barcode Detection API
    if ('BarcodeDetector' in window) {
      toast.success('กรุณาใช้เครื่องสแกนเนอร์ยิง QR Code', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
      
      // Focus on search input for scanner input
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    } else {
      toast.error('เบราว์เซอร์ไม่รองรับการสแกน QR Code', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    }
  };
  
  // Format transportation method for display
  const formatTransportation = (participant) => {
    if (!participant) return '';
    
    if (participant.transportation_category === 'public') {
      if (participant.public_transport_type === 'walking') {
        return 'เดินเท้า';
      } else if (participant.public_transport_type === '999' && participant.public_transport_other) {
        return `ขนส่งสาธารณะ (${participant.public_transport_other})`;
      } else {
        return 'ขนส่งสาธารณะ';
      }
    } else if (participant.transportation_category === 'private') {
      let carType = '';
      if (participant.car_type === 'gasoline') {
        carType = 'น้ำมัน';
      } else if (participant.car_type === 'diesel') {
        carType = 'ดีเซล';
      } else if (participant.car_type === 'hybrid') {
        carType = 'ไฮบริด';
      } else if (participant.car_type === 'electric') {
        carType = 'ไฟฟ้า';
      } else if (participant.car_type === 'other' && participant.car_type_other) {
        carType = participant.car_type_other;
      }
      
      let passengerType = '';
      if (participant.car_passenger_type === 'alone') {
        passengerType = 'คนเดียว';
      } else if (participant.car_passenger_type === 'carpool') {
        passengerType = 'แบบ Carpool';
      }
      
      return `รถยนต์ส่วนตัว (${carType}, ${passengerType})`;
    }
    
    return 'ไม่ระบุ';
  };
  
  // Format location for display
  const formatLocation = (participant) => {
    if (!participant) return '';
    
    if (participant.location_type === 'bangkok') {
      return `กรุงเทพฯ (${participant.bangkok_district_name_th || 'ไม่ระบุเขต'})`;
    } else if (participant.location_type === 'province') {
      return participant.province_name_th || 'ต่างจังหวัด (ไม่ระบุ)';
    }
    
    return 'ไม่ระบุ';
  };
  
  // Format attendance type for display
  const formatAttendanceType = (type) => {
    switch (type) {
      case 'morning': return 'ช่วงเช้า';
      case 'afternoon': return 'ช่วงบ่าย';
      case 'full_day': return 'เต็มวัน';
      default: return 'ไม่ระบุ';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-prompt font-bold text-earth-800 mb-6">ระบบเช็คอิน</h2>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาด้วยรหัสลงทะเบียน (CCI-XXXXXX) หรือ ชื่อ-นามสกุล"
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 font-prompt"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button
            type="submit"
            disabled={isSearching}
            className="bg-earth-600 hover:bg-earth-700 text-white font-prompt font-medium px-6 py-3 rounded-lg transition-colors"
          >
            {isSearching ? 'กำลังค้นหา...' : 'ค้นหา'}
          </button>
          
          <button
            type="button"
            onClick={handleQRScan}
            className="bg-beige-600 hover:bg-beige-700 text-white font-prompt font-medium px-4 py-3 rounded-lg transition-colors flex items-center"
          >
            <QrCodeIcon className="h-5 w-5 mr-2" />
            สแกน QR
          </button>
        </div>
      </form>
      
      {/* Multiple Participants Modal */}
      {multipleParticipants && (
        <ParticipantListModal
          participants={multipleParticipants}
          onSelect={handleParticipantSelect}
          onClose={() => setMultipleParticipants(null)}
        />
      )}
      
      {/* Participant Information */}
      {participant && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-prompt font-bold text-earth-800">
                {participant.first_name} {participant.last_name}
              </h3>
              <p className="text-sm text-gray-500">
                รหัสลงทะเบียน: <span className="font-medium">{participant.uuid}</span>
              </p>
            </div>
            
            <div className="flex items-center">
              {isEligibleForGift && (
                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full mr-4">
                  <GiftIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">มีสิทธิ์รับของที่ระลึก</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mt-4">
                {participant.check_in_status !== 2 && (
                  <button
                    onClick={handleCheckInToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-prompt font-medium transition-colors ${isCheckedIn ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {isCheckedIn ? (
                      <>
                        <XCircleIcon className="h-5 w-5" />
                        ยกเลิกเช็คอิน
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="h-5 w-5" />
                        เช็คอิน
                      </>
                    )}
                  </button>
                )}
                
                {participant.check_in_status !== 2 && (
                  <button
                    onClick={handleMarkNotAttending}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-prompt font-medium transition-colors"
                  >
                    <XCircleIcon className="h-5 w-5" />
                    ไม่เข้าร่วม
                  </button>
                )}
                
                {participant.check_in_status === 2 && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-prompt font-medium">
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                    ไม่เข้าร่วม
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">ข้อมูลการติดต่อ</h4>
                  <p className="font-prompt">อีเมล: {participant.email || '-'}</p>
                  <p className="font-prompt">โทรศัพท์: {participant.phone || '-'}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">องค์กร</h4>
                  <p className="font-prompt">{participant.organization_name || '-'}</p>
                  <p className="text-sm text-gray-600">
                    {participant.organization_type_th || '-'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">การเดินทาง</h4>
                  <p className="font-prompt">{formatTransportation(participant)}</p>
                  <p className="text-sm text-gray-600">
                    จาก: {formatLocation(participant)}
                  </p>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">ช่วงเวลาเข้าร่วม</h4>
                  <p className="font-prompt">{formatAttendanceType(participant.attendance_type)}</p>
                </div>
                
                {(participant.attendance_type === 'afternoon' || participant.attendance_type === 'full_day') && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">ห้องสัมมนาช่วงบ่าย</h4>
                    <p className="font-prompt">{participant.room_name_th || '-'}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">สถานะการเช็คอิน</h4>
                  <div className="flex items-center">
                    {isCheckedIn ? (
                      <>
                        <CheckCircleSolidIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-prompt font-medium text-green-700">เช็คอินแล้ว</span>
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="font-prompt text-gray-600">ยังไม่ได้เช็คอิน</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {!participant && !isSearching && (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
          <QrCodeIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-prompt font-medium text-gray-600 mb-2">
            ค้นหาผู้เข้าร่วมเพื่อเช็คอิน
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            ค้นหาด้วยรหัสลงทะเบียน (CCI-XXXXXX) หรือชื่อ-นามสกุล หรือใช้เครื่องสแกนเนอร์ยิง QR Code
          </p>
        </div>
      )}
    </div>
  );
}
