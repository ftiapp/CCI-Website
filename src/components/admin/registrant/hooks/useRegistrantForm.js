import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function useRegistrantForm(registrant) {
  const [formData, setFormData] = useState({
    id: '',
    uuid: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    organization_name: '',
    organization_type_id: '',
    organization_type_other: '',
    location_type: '',
    bangkok_district_id: '',
    province_id: '',
    attendance_type: '',
    selected_room_id: '',
    // ฟิลด์สำหรับแสดงในฟอร์ม
    transport_type: '', // 'public', 'private', 'walk'
    public_transport_id: '',
    public_transport_other: '',
    private_vehicle_id: '',
    private_vehicle_other: '',
    fuel_type_id: '',
    fuel_type_other: '',
    passenger_type: '',
    admin_notes: ''
  });

  const [sendNotification, setSendNotification] = useState(false);

  // Set form data when registrant prop changes
  useEffect(() => {
    if (registrant) {
      try {
        console.log('Registrant data:', registrant);
        
        // แปลงข้อมูลการเดินทางจากฐานข้อมูลเป็นรูปแบบที่ใช้ในฟอร์ม
        let transportType = registrant.transport_type || '';
        let publicTransportId = '';
        let privateVehicleId = '';
        let fuelTypeId = 1; // ค่าเริ่มต้น (gasoline)
        let passengerType = 'driver'; // ค่าเริ่มต้น
        
        console.log('Transportation data from API:', {
          transport_type: registrant.transport_type,
          public_transport_id: registrant.public_transport_id,
          private_vehicle_id: registrant.private_vehicle_id,
          fuel_type_id: registrant.fuel_type_id,
          passenger_type: registrant.passenger_type
        });
        
        // แปลงข้อมูลขนส่งมวลชน
        if (transportType === 'public') {
          publicTransportId = registrant.public_transport_id || '';
        }
        
        // แปลงข้อมูลพาหนะส่วนตัว
        if (transportType === 'private') {
          // ประเภทรถ
          privateVehicleId = registrant.private_vehicle_id || '';
          
          // ประเภทเชื้อเพลิง
          // แปลงค่า fuel_type_id จากตัวเลขเป็น string ที่ใช้ในฟอร์ม
          console.log('Fuel type ID from API (raw):', registrant.fuel_type_id);
          console.log('Fuel type other from API:', registrant.fuel_type_other);
          
          // แปลงค่าตาม ID
          if (registrant.fuel_type_id === 1 || registrant.fuel_type_id === '1') {
            fuelTypeId = 'gasoline';
          } else if (registrant.fuel_type_id === 2 || registrant.fuel_type_id === '2') {
            fuelTypeId = 'diesel';
          } else if (registrant.fuel_type_id === 3 || registrant.fuel_type_id === '3') {
            fuelTypeId = 'electric';
          } else if (registrant.fuel_type_id === 4 || registrant.fuel_type_id === '4') {
            fuelTypeId = 'hybrid';
          } else if (registrant.fuel_type_id === 99 || registrant.fuel_type_id === '99' || registrant.fuel_type_id === 999 || registrant.fuel_type_id === '999') {
            fuelTypeId = 'other';
          } else {
            fuelTypeId = 'gasoline'; // ค่าเริ่มต้น
          }
          
          console.log('Fuel type ID after conversion:', fuelTypeId);
          
          // ผู้โดยสาร
          passengerType = registrant.passenger_type || 'driver';
        }

        setFormData({
          id: registrant.id || '',
          uuid: registrant.uuid || '',
          first_name: registrant.first_name || '',
          last_name: registrant.last_name || '',
          email: registrant.email || '',
          phone: registrant.phone || '',
          organization_name: registrant.organization_name || '',
          organization_type_id: registrant.organization_type_id || '',
          organization_type_other: registrant.organization_type_other || '',
          location_type: registrant.location_type || '',
          bangkok_district_id: registrant.bangkok_district_id || '',
          province_id: registrant.province_id || '',
          attendance_type: registrant.attendance_type || '',
          selected_room_id: registrant.selected_room_id || '',
          
          // ข้อมูลการเดินทาง
          transport_type: transportType,
          public_transport_id: publicTransportId,
          public_transport_other: registrant.public_transport_other || '',
          private_vehicle_id: privateVehicleId,
          private_vehicle_other: registrant.private_vehicle_other || registrant.car_type_other || '',
          fuel_type_id: fuelTypeId,
          fuel_type_other: registrant.fuel_type_other || '',
          passenger_type: passengerType,
          admin_notes: registrant.admin_notes || ''
        });
        
        console.log('Form data set:', {
          transport_type: transportType,
          public_transport_id: publicTransportId,
          private_vehicle_id: privateVehicleId,
          fuel_type_id: fuelTypeId,
          passenger_type: passengerType
        });
      } catch (error) {
        toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ลงทะเบียน', {
          duration: 3000,
          position: 'top-right',
          className: 'font-prompt',
        });
        console.error('Error loading registrant data:', error);
      }
    }
  }, [registrant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    sendNotification,
    setSendNotification,
    handleChange
  };
}
