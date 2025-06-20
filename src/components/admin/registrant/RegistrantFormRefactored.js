import React from 'react';
import { toast } from 'react-toastify';

// Import custom hooks
import useReferenceData from './hooks/useReferenceData';
import useRegistrantForm from './hooks/useRegistrantForm';

// Import form components
import PersonalInfoForm from './forms/PersonalInfoForm';
import OrganizationInfoForm from './forms/OrganizationInfoForm';
import LocationInfoForm from './forms/LocationInfoForm';
import AttendanceInfoForm from './forms/AttendanceInfoForm';
import TransportationInfoForm from './forms/TransportationInfoForm';
import NotesAndNotificationForm from './forms/NotesAndNotificationForm';

export default function RegistrantForm({ registrant, onSubmit, onCancel }) {
  // โหลดข้อมูลอ้างอิงจาก API
  const {
    organizationTypes,
    publicTransportOptions,
    privateVehicleOptions,
    seminarRooms,
    provinces,
    bangkokDistricts,
    loading
  } = useReferenceData();

  // จัดการข้อมูลฟอร์ม
  const {
    formData,
    sendNotification,
    setSendNotification,
    handleChange
  } = useRegistrantForm(registrant);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, sendNotification);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ข้อมูลส่วนตัว */}
      <PersonalInfoForm formData={formData} handleChange={handleChange} />
      
      {/* ข้อมูลองค์กร */}
      <OrganizationInfoForm 
        formData={formData} 
        handleChange={handleChange} 
        organizationTypes={organizationTypes} 
      />
      
      {/* ข้อมูลที่อยู่ */}
      <LocationInfoForm 
        formData={formData} 
        handleChange={handleChange} 
        provinces={provinces} 
        bangkokDistricts={bangkokDistricts} 
      />
      
      {/* ข้อมูลการเข้าร่วม */}
      <AttendanceInfoForm 
        formData={formData} 
        handleChange={handleChange} 
        seminarRooms={seminarRooms} 
      />
      
      {/* ข้อมูลการเดินทาง */}
      <TransportationInfoForm 
        formData={formData} 
        handleChange={handleChange} 
        publicTransportOptions={publicTransportOptions} 
        privateVehicleOptions={privateVehicleOptions} 
      />
      
      {/* หมายเหตุและการแจ้งเตือน */}
      <NotesAndNotificationForm 
        formData={formData} 
        handleChange={handleChange} 
        sendNotification={sendNotification} 
        setSendNotification={setSendNotification} 
      />
      
      {/* ปุ่มการทำงาน */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-md font-prompt"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md font-prompt"
        >
          บันทึก
        </button>
      </div>
    </form>
  );
}
