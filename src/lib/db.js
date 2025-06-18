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

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Generate a unique CCI-XXXXXX format ID
export function generateCCIId() {
  // Generate a random 6-character alphanumeric string
  const randomPart = uuidv4().substring(0, 6).toUpperCase();
  return `CCI-${randomPart}`;
}

// Execute a database query
export async function executeQuery(query, params = []) {
  try {
    const [results] = await pool.execute(query, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Get all organization types
export async function getOrganizationTypes() {
  return executeQuery('SELECT * FROM CCI_organization_types');
}

// Get all transportation types
export async function getTransportationTypes() {
  return executeQuery('SELECT * FROM CCI_transportation_types');
}

// Get all seminar rooms
export async function getSeminarRooms() {
  return executeQuery('SELECT * FROM CCI_seminar_rooms');
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
  await executeQuery(
    `INSERT INTO CCI_registrants 
    (uuid, first_name, last_name, email, phone, organization_name, 
    organization_type_id, transportation_type_id, transportation_category, 
    public_transport_type, public_transport_other, car_type, car_type_other, 
    car_passenger_type, location_type, bangkok_district_id, province_id, 
    attendance_type, selected_room_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      uuid, 
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
    ]
  );

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
