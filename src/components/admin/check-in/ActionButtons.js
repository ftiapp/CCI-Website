import { CheckCircleIcon, XCircleIcon, GiftIcon } from '@heroicons/react/24/outline';

export default function ActionButtons({ 
  participant, 
  isCheckedIn, 
  isEligibleForGift, 
  onCheckInToggle, 
  onMarkNotAttending 
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 w-full">
      {isEligibleForGift && (
        <div className="flex items-center bg-red-600 text-white px-2 sm:px-3 py-1 rounded-full mb-2 sm:mb-0 sm:mr-4">
          <GiftIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span className="text-xs sm:text-sm font-medium font-bold">SOUVENIR</span>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        {participant.check_in_status !== 2 && (
          <button
            onClick={onCheckInToggle}
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-prompt font-medium transition-colors text-sm ${
              isCheckedIn 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isCheckedIn ? (
              <>
                <XCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">ยกเลิกเช็คอิน</span>
                <span className="sm:hidden">ยกเลิก</span>
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                เช็คอิน
              </>
            )}
          </button>
        )}
        
        {participant.check_in_status !== 2 && (
          <button
            onClick={onMarkNotAttending}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-prompt font-medium transition-colors text-sm"
          >
            <XCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            ไม่เข้าร่วม
          </button>
        )}
        
        {participant.check_in_status === 2 && (
          <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-prompt font-medium text-sm">
            <XCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            ไม่เข้าร่วม
          </div>
        )}
      </div>
    </div>
  );
}