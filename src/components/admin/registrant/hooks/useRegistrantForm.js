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
    // ฟิลด์ข้อมูลการเดินทางจากฐานข้อมูล
    transportation_type_id: '',
    transportation_category: '', // 'public', 'private', 'walk'
    public_transport_type: '',
    public_transport_other: '',
    car_type: '',
    car_type_other: '',
    car_passenger_type: '',
    // ฟิลด์สำหรับแสดงในฟอร์ม
    transport_type: '', // 'public', 'private', 'walk'
    public_transport_id: '',
    public_transport_other: '',
    private_vehicle_id: '',
    private_vehicle_other: '',
    fuel_type: '',
    fuel_type_other: '',
    passenger_type: '',
    admin_notes: ''
  });

  const [sendNotification, setSendNotification] = useState(false);

  // Set form data when registrant prop changes
  useEffect(() => {
    if (registrant) {
      try {
        // แปลงข้อมูลการเดินทางจากฐานข้อมูลเป็นรูปแบบที่ใช้ในฟอร์ม
        // ใช้ค่าที่ผู้ลงทะเบียนเลือกไว้แต่แรก
        let transportType = '';
        let publicTransportId = '';
        let privateVehicleId = '';
        let fuelType = '';
        let passengerType = '';
        
        // แปลงข้อมูลประเภทการเดินทาง
        if (registrant.transportation_category) {
          transportType = registrant.transportation_category; // 'public', 'private', 'walk'
        }
        
        // แปลงข้อมูลขนส่งมวลชน
        if (transportType === 'public') {
          publicTransportId = registrant.public_transport_type || '';
        }
        
        // แปลงข้อมูลพาหนะส่วนตัว
        if (transportType === 'private') {
          // ประเภทรถ
          privateVehicleId = registrant.car_type || '';
          
          // ประเภทเชื้อเพลิง
          fuelType = registrant.car_type || 'gasoline';
          
          // ผู้โดยสาร
          if (registrant.car_passenger_type === 'with_others') {
            passengerType = 'carpool';
          } else {
            passengerType = 'alone';
          }
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
          
          // ข้อมูลการเดินทางจากฐานข้อมูล
          transportation_type_id: registrant.transportation_type_id || '',
          transportation_category: registrant.transportation_category || '',
          public_transport_type: registrant.public_transport_type || '',
          public_transport_other: registrant.public_transport_other || '',
          car_type: registrant.car_type || '',
          car_type_other: registrant.car_type_other || '',
          car_passenger_type: registrant.car_passenger_type || '',
          
          // แปลงข้อมูลสำหรับแสดงในฟอร์ม
          transport_type: transportType,
          public_transport_id: publicTransportId,
          public_transport_other: registrant.public_transport_other || '',
          private_vehicle_id: privateVehicleId,
          private_vehicle_other: registrant.car_type_other || '',
          fuel_type: fuelType,
          fuel_type_other: '',
          passenger_type: passengerType,
          admin_notes: registrant.admin_notes || ''
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
