// Function to check if transportation type is public or walking
export const checkEligibilityForGift = (transportType) => {
    if (!transportType) return false;
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
  };
  
  // Format transportation method for display
  export const formatTransportation = (participant) => {
    if (!participant) return '';
    
    // ใช้ข้อมูลจากฟิลด์ transport_type ที่มาจากตาราง CCI_transportation
    if (participant.transport_type) {
      console.log('Using transport_type:', participant.transport_type);
      return participant.transport_type;
    }
    
    // ถ้าไม่มีข้อมูลจาก transport_type ให้ใช้ข้อมูลเดิม (fallback)
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
  export const formatLocation = (participant) => {
    if (!participant) return '';
    
    if (participant.location_type === 'bangkok') {
      return `กรุงเทพฯ (${participant.bangkok_district_name_th || 'ไม่ระบุเขต'})`;
    } else if (participant.location_type === 'province') {
      return participant.province_name_th || 'ต่างจังหวัด (ไม่ระบุ)';
    }
    
    return 'ไม่ระบุ';
  };
  
  // Format attendance type for display
  export const formatAttendanceType = (type) => {
    switch (type) {
      case 'morning': return 'ช่วงเช้า';
      case 'afternoon': return 'ช่วงบ่าย';
      case 'full_day': return 'เต็มวัน';
      default: return 'ไม่ระบุ';
    }
  };
  
  // Toast style configuration
  export const toastStyle = {
    position: 'top-right',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
      padding: '16px',
      fontFamily: 'prompt, sans-serif',
      fontWeight: '500',
    },
  };