import { CheckCircleIcon, XCircleIcon, GiftIcon } from '@heroicons/react/24/outline';

export default function ActionButtons({ 
  participant, 
  isCheckedIn, 
  isEligibleForGift, 
  onCheckInToggle, 
  onMarkNotAttending 
}) {
  return (
    <div className="flex items-center">
      {isEligibleForGift && (
        <div className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full mr-4">
          <GiftIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium font-bold">SOUVENIR</span>
        </div>
      )}
      
      <div className="flex items-center gap-2 mt-4">
        {participant.check_in_status !== 2 && (
          <button
            onClick={onCheckInToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-prompt font-medium transition-colors ${
              isCheckedIn 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
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
            onClick={onMarkNotAttending}
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
  );
}