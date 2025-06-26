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
    industry_type_id: '',
    industry_type_other: '',
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
        let fuelTypeId = 'gasoline'; // ค่าเริ่มต้น (gasoline)
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
          
          // แปลงค่าตาม ID - ตรวจสอบว่า fuel_type_id มีค่าก่อนเปรียบเทียบ
          const fuelId = registrant.fuel_type_id;
          if (fuelId) {
            const fuelIdStr = String(fuelId);
            if (fuelIdStr === '1') {
              fuelTypeId = 'gasoline';
            } else if (fuelIdStr === '2') {
              fuelTypeId = 'diesel';
            } else if (fuelIdStr === '3') {
              fuelTypeId = 'electric';
            } else if (fuelIdStr === '4') {
              fuelTypeId = 'hybrid';
            } else if (fuelIdStr === '99' || fuelIdStr === '999') {
              fuelTypeId = 'other';
            }
          }
          
          console.log('Fuel type ID after conversion:', fuelTypeId);
          
          // ผู้โดยสาร
          passengerType = registrant.passenger_type || 'driver';
        }

        // Create a safe object with default values for all fields
        const safeRegistrant = {
          id: '',
          uuid: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          organization_name: '',
          organization_type_id: '',
          organization_type_other: '',
          industry_type_id: '',
          industry_type_other: '',
          location_type: '',
          bangkok_district_id: '',
          province_id: '',
          attendance_type: '',
          selected_room_id: '',
          public_transport_other: '',
          private_vehicle_other: '',
          car_type_other: '',
          fuel_type_other: '',
          admin_notes: '',
          ...registrant // Spread the actual registrant data over the defaults
        };
        
        // Now set the form data using the safe object
        setFormData({
          id: safeRegistrant.id,
          uuid: safeRegistrant.uuid,
          first_name: safeRegistrant.first_name,
          last_name: safeRegistrant.last_name,
          email: safeRegistrant.email,
          phone: safeRegistrant.phone,
          organization_name: safeRegistrant.organization_name,
          organization_type_id: safeRegistrant.organization_type_id,
          organization_type_other: safeRegistrant.organization_type_other,
          industry_type_id: safeRegistrant.industry_type_id,
          industry_type_other: safeRegistrant.industry_type_other,
          location_type: safeRegistrant.location_type,
          bangkok_district_id: safeRegistrant.bangkok_district_id,
          province_id: safeRegistrant.province_id,
          attendance_type: safeRegistrant.attendance_type,
          selected_room_id: safeRegistrant.selected_room_id,
          
          // ข้อมูลการเดินทาง
          transport_type: transportType,
          public_transport_id: publicTransportId,
          public_transport_other: safeRegistrant.public_transport_other,
          private_vehicle_id: privateVehicleId,
          private_vehicle_other: safeRegistrant.private_vehicle_other || safeRegistrant.car_type_other,
          fuel_type_id: fuelTypeId,
          fuel_type_other: safeRegistrant.fuel_type_other,
          passenger_type: passengerType,
          admin_notes: safeRegistrant.admin_notes
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
