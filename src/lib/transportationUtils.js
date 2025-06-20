import { executeQuery } from './db';

/**
 * ดึงข้อมูลประเภทการเดินทางทั้งหมด
 * @returns {Promise<Array>} ข้อมูลประเภทการเดินทาง
 */
export async function getTransportTypes() {
  try {
    return await executeQuery('SELECT * FROM CCI_transport_types');
  } catch (error) {
    console.error('Error fetching transport types:', error);
    return [];
  }
}

/**
 * ดึงข้อมูลประเภทขนส่งมวลชนทั้งหมด
 * @returns {Promise<Array>} ข้อมูลประเภทขนส่งมวลชน
 */
export async function getPublicTransportTypes() {
  try {
    return await executeQuery('SELECT * FROM CCI_public_transport_types');
  } catch (error) {
    console.error('Error fetching public transport types:', error);
    return [];
  }
}

/**
 * ดึงข้อมูลประเภทยานพาหนะส่วนตัวทั้งหมด
 * @returns {Promise<Array>} ข้อมูลประเภทยานพาหนะส่วนตัว
 */
export async function getPrivateVehicleTypes() {
  try {
    return await executeQuery('SELECT * FROM CCI_private_vehicle_types');
  } catch (error) {
    console.error('Error fetching private vehicle types:', error);
    return [];
  }
}

/**
 * ดึงข้อมูลประเภทเชื้อเพลิงทั้งหมด
 * @returns {Promise<Array>} ข้อมูลประเภทเชื้อเพลิง
 */
export async function getFuelTypes() {
  try {
    return await executeQuery('SELECT * FROM CCI_fuel_types');
  } catch (error) {
    console.error('Error fetching fuel types:', error);
    return [];
  }
}

/**
 * ดึงข้อมูลประเภทผู้โดยสารทั้งหมด
 * @returns {Promise<Array>} ข้อมูลประเภทผู้โดยสาร
 */
export async function getPassengerTypes() {
  try {
    return await executeQuery('SELECT * FROM CCI_passenger_types');
  } catch (error) {
    console.error('Error fetching passenger types:', error);
    return [];
  }
}

/**
 * ค้นหาข้อมูลประเภทขนส่งมวลชนจาก ID
 * @param {number} id - ID ของประเภทขนส่งมวลชน
 * @returns {Promise<Object|null>} ข้อมูลประเภทขนส่งมวลชน หรือ null ถ้าไม่พบ
 */
export async function getPublicTransportTypeById(id) {
  try {
    const results = await executeQuery(
      'SELECT * FROM CCI_public_transport_types WHERE id = ?',
      [id]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(`Error fetching public transport type with id ${id}:`, error);
    return null;
  }
}

/**
 * ค้นหาข้อมูลประเภทยานพาหนะส่วนตัวจาก ID
 * @param {number} id - ID ของประเภทยานพาหนะส่วนตัว
 * @returns {Promise<Object|null>} ข้อมูลประเภทยานพาหนะส่วนตัว หรือ null ถ้าไม่พบ
 */
export async function getPrivateVehicleTypeById(id) {
  try {
    const results = await executeQuery(
      'SELECT * FROM CCI_private_vehicle_types WHERE id = ?',
      [id]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(`Error fetching private vehicle type with id ${id}:`, error);
    return null;
  }
}

/**
 * ค้นหาข้อมูลประเภทเชื้อเพลิงจาก ID
 * @param {number} id - ID ของประเภทเชื้อเพลิง
 * @returns {Promise<Object|null>} ข้อมูลประเภทเชื้อเพลิง หรือ null ถ้าไม่พบ
 */
export async function getFuelTypeById(id) {
  try {
    const results = await executeQuery(
      'SELECT * FROM CCI_fuel_types WHERE id = ?',
      [id]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(`Error fetching fuel type with id ${id}:`, error);
    return null;
  }
}

/**
 * ค้นหาข้อมูลประเภทเชื้อเพลิงจากชื่อ
 * @param {string} name - ชื่อของประเภทเชื้อเพลิง (เช่น 'electric', 'gasoline')
 * @returns {Promise<Object|null>} ข้อมูลประเภทเชื้อเพลิง หรือ null ถ้าไม่พบ
 */
export async function getFuelTypeByName(name) {
  try {
    // ค้นหาจากชื่อภาษาอังกฤษ (ตัดช่องว่างและแปลงเป็นตัวพิมพ์เล็ก)
    const normalizedName = name.trim().toLowerCase();
    
    const results = await executeQuery(
      'SELECT * FROM CCI_fuel_types WHERE LOWER(name_en) = ?',
      [normalizedName]
    );
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error(`Error fetching fuel type with name ${name}:`, error);
    return null;
  }
}
