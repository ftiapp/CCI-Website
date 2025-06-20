import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import 'server-only';

// Database connection configuration
const dbConfig = {
  host: 'asia-southeast1-001.proxy.kinsta.app',
  port: 30509,
  user: 'FTI_IT_ADMIN',
  password: 'qZ1[sJ4*qG2*jW1:',
  database: 'FTI_annaul_meeting',
};

// Log database configuration (without password)
console.log('Database connection config:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  // Not logging password for security
});

// Create a connection pool with enhanced settings for reliability
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0, // milliseconds
});

// Generate a unique CCI-XXXXXX format ID
export function generateCCIId() {
  // Generate a random 6-character alphanumeric string
  const randomPart = uuidv4().substring(0, 6).toUpperCase();
  return `CCI-${randomPart}`;
}

// Execute a database query with connection retry
export async function executeQuery(query, params = []) {
  let retries = 3;
  let lastError;
  
  while (retries > 0) {
    try {
      // Get a connection from the pool
      const connection = await pool.getConnection();
      
      try {
        // Execute the query
        const [results] = await connection.execute(query, params);
        // Release the connection back to the pool
        connection.release();
        return results;
      } catch (error) {
        // Release the connection even if there's an error
        connection.release();
        throw error;
      }
    } catch (error) {
      lastError = error;
      console.error(`Database query error (${retries} retries left):`, error);
      
      // If it's a connection issue, retry after a delay
      if (error.code === 'PROTOCOL_CONNECTION_LOST' || 
          error.code === 'ECONNREFUSED' || 
          error.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
        retries--;
        if (retries > 0) {
          console.log(`Retrying database connection in 1 second... (${retries} attempts left)`);
          // Wait for 1 second before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
      } else {
        // For other errors, don't retry
        break;
      }
    }
  }
  
  // If we've exhausted all retries or it's not a connection error
  throw lastError;
}

// Get all organization types
export async function getOrganizationTypes() {
  return executeQuery('SELECT * FROM CCI_organization_types');
}

// Get all transportation types
export async function getTransportationTypes() {
  return executeQuery('SELECT * FROM CCI_transport_types');
}

// Get all seminar rooms
export async function getSeminarRooms() {
  return executeQuery('SELECT * FROM CCI_seminar_rooms');
}

// Get seminar room by ID
export async function getSeminarRoomById(roomId) {
  const rooms = await executeQuery('SELECT * FROM CCI_seminar_rooms WHERE id = ?', [roomId]);
  return rooms.length > 0 ? rooms[0] : null;
}

// Get all Bangkok districts
export async function getBangkokDistricts() {
  try {
    const districts = await executeQuery('SELECT * FROM CCI_bangkok_districts ORDER BY name_th');
    console.log('Bangkok districts from DB:', districts);
    return districts;
  } catch (error) {
    console.error('Error fetching Bangkok districts:', error);
    // Fallback data if query fails
    return [
      { id: 1, name_th: 'เขตพระนคร', name_en: 'Phra Nakhon' },
      { id: 2, name_th: 'เขตดุสิต', name_en: 'Dusit' },
      { id: 3, name_th: 'เขตบางรัก', name_en: 'Bang Rak' },
      { id: 4, name_th: 'เขตปทุมวัน', name_en: 'Pathum Wan' },
      { id: 5, name_th: 'เขตสาทร', name_en: 'Sathon' }
    ];
  }
}

// Get all provinces
export async function getProvinces() {
  try {
    const provinces = await executeQuery('SELECT * FROM CCI_provinces ORDER BY name_th');
    console.log('Provinces from DB:', provinces);
    return provinces;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    // Fallback data if query fails
    return [
      { id: 1, name_th: 'เชียงใหม่', name_en: 'Chiang Mai' },
      { id: 2, name_th: 'ชลบุรี', name_en: 'Chonburi' },
      { id: 3, name_th: 'ภูเก็ต', name_en: 'Phuket' },
      { id: 4, name_th: 'นนทบุรี', name_en: 'Nonthaburi' },
      { id: 5, name_th: 'ปทุมธานี', name_en: 'Pathum Thani' }
    ];
  }
}

// Get schedule
export async function getSchedule() {
  return executeQuery(`
    SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en 
    FROM CCI_schedule s 
    LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id 
    ORDER BY s.event_date, s.time_start
  `);
}

// Get morning schedule
export async function getMorningSchedule() {
  return executeQuery(`
    SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en 
    FROM CCI_schedule s 
    LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id 
    WHERE s.is_morning = TRUE
    ORDER BY s.time_start
  `);
}

// Get afternoon schedule by room
export async function getAfternoonScheduleByRoom(roomId) {
  return executeQuery(`
    SELECT s.*, r.name_th as room_name_th, r.name_en as room_name_en 
    FROM CCI_schedule s 
    LEFT JOIN CCI_seminar_rooms r ON s.room_id = r.id 
    WHERE s.is_morning = FALSE AND s.room_id = ?
    ORDER BY s.time_start
  `, [roomId]);
}

// Register a participant
export async function registerParticipant(participantData) {
  const { 
    first_name, 
    last_name, 
    email, 
    phone, 
    organization_name, 
    organization_type_id, 
    transportation_type_id,
    transportation_category,
    public_transport_type,
    public_transport_other,
    car_type,
    car_type_other,
    car_passenger_type,
    location_type,
    bangkok_district_id,
    province_id,
    attendance_type,
    selected_room_id 
  } = participantData;

  // Generate a unique CCI-XXXXXX ID
  const uuid = generateCCIId();

  // Check if the name already exists
  const existingUser = await executeQuery(
    'SELECT * FROM CCI_registrants WHERE first_name = ? AND last_name = ?',
    [first_name, last_name]
  );

  if (existingUser.length > 0) {
    throw new Error('duplicate_name');
  }

  // Insert the participant
  // ตรวจสอบว่าจะได้รับของที่ระลึกอัตโนมัติหรือไม่
  // ถ้าเดินทางด้วยขนส่งมวลชนหรือเดิน จะได้รับของที่ระลึกอัตโนมัติ
  const autoGiftReceived = transportation_category === 'public' || transportation_category === 'walking' ? 1 : 0;
  
  // ลงทะเบียนผู้เข้าร่วมในตาราง CCI_registrants (ไม่รวมข้อมูลการเดินทาง)
  const registrantResult = await executeQuery(
    `INSERT INTO CCI_registrants 
    (uuid, first_name, last_name, email, phone, organization_name, 
    organization_type_id, location_type, bangkok_district_id, province_id, 
    attendance_type, selected_room_id, gift_received) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      uuid, 
      first_name, 
      last_name, 
      email, 
      phone, 
      organization_name, 
      organization_type_id,
      location_type,
      bangkok_district_id,
      province_id,
      attendance_type,
      selected_room_id,
      autoGiftReceived
    ]
  );
  
  // ถ้ามีข้อมูลการเดินทาง ให้บันทึกในตาราง CCI_transportation
  if (transportation_type_id) {
    try {
      // แปลงค่าข้อมูลให้ถูกต้องตามประเภทข้อมูล
      let privateVehicleId = null;
      let fuelTypeId = null;
      
      // ถ้าเป็นการเดินทางด้วยพาหนะส่วนตัว
      if (transportation_category === 'private') {
        // แยกประเภทรถ (car_type) และประเภทเชื้อเพลิง (fuel_type)
        
        // แปลงค่าประเภทรถ
        if (car_type) {
          try {
            privateVehicleId = parseInt(car_type);
            if (isNaN(privateVehicleId)) {
              // ถ้าไม่ใช่ตัวเลข ให้แปลงตามชื่อ
              switch(car_type) {
                case 'personal_car':
                  privateVehicleId = 1; // ID สำหรับรถยนต์ส่วนตัว
                  break;
                case 'motorcycle':
                  privateVehicleId = 2; // ID สำหรับรถจักรยานยนต์
                  break;
                case 'taxi':
                  privateVehicleId = 3; // ID สำหรับแท็กซี่/แกร็บ/อูเบอร์
                  break;
                default:
                  privateVehicleId = null;
              }
            }
          } catch (e) {
            privateVehicleId = null;
          }
        }
        
        // แปลงค่าประเภทเชื้อเพลิง
        // ตรวจสอบจากพารามิเตอร์ที่ส่งมาโดยตรง
        // ค่า 'electric' ควรอยู่ใน fuel_type_id ไม่ใช่ private_vehicle_id
        if (car_type === 'electric') {
          // ถ้า car_type เป็น 'electric' ให้ย้ายไปเป็น fuel_type_id แทน
          fuelTypeId = 3; // ID สำหรับรถไฟฟ้า
          // ตั้งค่า privateVehicleId เป็นรถยนต์ส่วนตัว
          privateVehicleId = 1; // สมมติว่ารถไฟฟ้าเป็นรถยนต์ส่วนตัว
        } else if (car_type === 'hybrid') {
          // ถ้า car_type เป็น 'hybrid' ให้ย้ายไปเป็น fuel_type_id แทน
          fuelTypeId = 4; // ID สำหรับรถไฮบริด
          // ตั้งค่า privateVehicleId เป็นรถยนต์ส่วนตัว
          privateVehicleId = 1; // สมมติว่ารถไฮบริดเป็นรถยนต์ส่วนตัว
        } else if (car_type === 'gasoline') {
          // ถ้า car_type เป็น 'gasoline' ให้ย้ายไปเป็น fuel_type_id แทน
          fuelTypeId = 1; // ID สำหรับรถเบนซิน
          // ตั้งค่า privateVehicleId เป็นรถยนต์ส่วนตัว
          privateVehicleId = 1; // สมมติว่ารถเบนซินเป็นรถยนต์ส่วนตัว
        } else if (car_type === 'diesel') {
          // ถ้า car_type เป็น 'diesel' ให้ย้ายไปเป็น fuel_type_id แทน
          fuelTypeId = 2; // ID สำหรับรถดีเซล
          // ตั้งค่า privateVehicleId เป็นรถยนต์ส่วนตัว
          privateVehicleId = 1; // สมมติว่ารถดีเซลเป็นรถยนต์ส่วนตัว
        }
      }
      
      // บันทึกข้อมูลการเดินทาง
      await executeQuery(
        `INSERT INTO CCI_transportation 
        (registrant_id, transport_type, public_transport_id, public_transport_other, 
        private_vehicle_id, private_vehicle_other, fuel_type_id, passenger_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          registrantResult.insertId, // ใช้ ID ของผู้ลงทะเบียนที่เพิ่งสร้าง
          transportation_category,
          transportation_category === 'public' ? parseInt(public_transport_type) || null : null,
          public_transport_other,
          privateVehicleId,
          car_type_other,
          fuelTypeId,
          car_passenger_type
        ]
      );
      
      console.log('Transportation data saved successfully');
    } catch (error) {
      console.error('Error saving transportation data:', error);
      // ไม่ต้อง throw error เพื่อให้การลงทะเบียนยังสำเร็จแม้ว่าการบันทึกข้อมูลการเดินทางจะล้มเหลว
    }
  }

  return { uuid };
}

// Get participant by UUID
export async function getParticipantByUuid(uuid) {
  const participants = await executeQuery(
    `SELECT r.*, ot.name_th as organization_type_th, ot.name_en as organization_type_en,
    tt.name_th as transportation_type_th, tt.name_en as transportation_type_en,
    sr.name_th as room_name_th, sr.name_en as room_name_en
    FROM CCI_registrants r
    JOIN CCI_organization_types ot ON r.organization_type_id = ot.id
    LEFT JOIN CCI_transportation_types tt ON r.transportation_type_id = tt.id
    LEFT JOIN CCI_seminar_rooms sr ON r.selected_room_id = sr.id
    WHERE r.uuid = ?`,
    [uuid]
  );
  
  return participants.length > 0 ? participants[0] : null;
}

// Get registration by ID
export async function getRegistrationById(registrationId) {
  const registrations = await executeQuery(
    `SELECT r.*, ot.name_th as organization_type_th, ot.name_en as organization_type_en,
    tt.name_th as transportation_type_th, tt.name_en as transportation_type_en,
    sr.name_th as room_name_th, sr.name_en as room_name_en
    FROM CCI_registrants r
    JOIN CCI_organization_types ot ON r.organization_type_id = ot.id
    LEFT JOIN CCI_transportation_types tt ON r.transportation_type_id = tt.id
    LEFT JOIN CCI_seminar_rooms sr ON r.selected_room_id = sr.id
    WHERE r.registration_id = ?`,
    [registrationId]
  );
  
  if (registrations.length === 0) {
    return null;
  }
  
  const registration = registrations[0];
  
  // Format data to match the form structure
  return {
    firstName: registration.first_name,
    lastName: registration.last_name,
    email: registration.email,
    phone: registration.phone,
    organizationName: registration.organization_name,
    organizationTypeId: registration.organization_type_id?.toString(),
    position: registration.position,
    attendanceType: registration.attendance_type,
    selectedRoomId: registration.selected_room_id?.toString(),
    transportation_category: registration.transportation_category,
    public_transport_type: registration.public_transport_type,
    public_transport_other: registration.public_transport_other,
    car_type: registration.car_type,
    car_type_other: registration.car_type_other,
    car_passenger_type: registration.car_passenger_type,
    district: registration.district,
    province: registration.province
  };
}
