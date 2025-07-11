import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';
import ActionButtons from './ActionButtons';
import { formatTransportation, formatLocation, formatAttendanceType } from './utils';

export default function ParticipantInfo({ 
  participant, 
  isCheckedIn, 
  isEligibleForGift, 
  onCheckInToggle, 
  onMarkNotAttending 
}) {
  if (!participant) return null;

  return (
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
        
        <ActionButtons
          participant={participant}
          isCheckedIn={isCheckedIn}
          isEligibleForGift={isEligibleForGift}
          onCheckInToggle={onCheckInToggle}
          onMarkNotAttending={onMarkNotAttending}
        />
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
  );
}