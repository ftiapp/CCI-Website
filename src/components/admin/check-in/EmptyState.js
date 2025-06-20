import { QrCodeIcon } from '@heroicons/react/24/outline';

export default function EmptyState() {
  return (
    <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
      <QrCodeIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-prompt font-medium text-gray-600 mb-2">
        ค้นหาผู้เข้าร่วมเพื่อเช็คอิน
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        ค้นหาด้วยรหัสลงทะเบียน (CCI-XXXXXX) หรือชื่อ-นามสกุล หรือใช้เครื่องสแกนเนอร์ยิง QR Code
      </p>
    </div>
  );
}