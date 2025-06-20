import { executeQuery } from './db';

/**
 * บันทึกหมายเหตุสำหรับผู้ลงทะเบียน
 * @param {string} uuid - UUID ของผู้ลงทะเบียน
 * @param {string} adminNotes - ข้อความหมายเหตุ
 * @param {string} adminUser - ชื่อผู้ดูแลระบบที่บันทึก
 * @returns {Promise<Object>} ผลลัพธ์การบันทึก
 */
export async function saveAdminNotes(uuid, adminNotes, adminUser = 'system') {
  try {
    // ตรวจสอบว่ามีหมายเหตุอยู่แล้วหรือไม่
    const checkQuery = 'SELECT id FROM CCI_admin_notes WHERE uuid = ?';
    const [existingNotes] = await executeQuery(checkQuery, [uuid]);
    
    let query;
    let params;
    
    if (existingNotes && existingNotes.length > 0) {
      // อัปเดตหมายเหตุที่มีอยู่แล้ว
      query = 'UPDATE CCI_admin_notes SET admin_notes = ?, admin_user = ? WHERE uuid = ?';
      params = [adminNotes, adminUser, uuid];
    } else {
      // สร้างหมายเหตุใหม่
      query = 'INSERT INTO CCI_admin_notes (uuid, admin_notes, admin_user) VALUES (?, ?, ?)';
      params = [uuid, adminNotes, adminUser];
    }
    
    await executeQuery(query, params);
    return { success: true };
  } catch (error) {
    console.error('Error saving admin notes:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ดึงข้อมูลหมายเหตุของผู้ลงทะเบียน
 * @param {string} uuid - UUID ของผู้ลงทะเบียน
 * @returns {Promise<Object>} ข้อมูลหมายเหตุ
 */
export async function getAdminNotes(uuid) {
  try {
    const query = 'SELECT * FROM CCI_admin_notes WHERE uuid = ?';
    const [notes] = await executeQuery(query, [uuid]);
    
    if (notes && notes.length > 0) {
      return { success: true, data: notes[0] };
    } else {
      return { success: true, data: { admin_notes: '' } };
    }
  } catch (error) {
    console.error('Error getting admin notes:', error);
    return { success: false, error: error.message };
  }
}

/**
 * ดึงประวัติหมายเหตุทั้งหมดของผู้ลงทะเบียน
 * @param {string} uuid - UUID ของผู้ลงทะเบียน
 * @returns {Promise<Object>} ประวัติหมายเหตุ
 */
export async function getAdminNotesHistory(uuid) {
  try {
    // ในอนาคตอาจมีการเก็บประวัติการแก้ไขหมายเหตุ
    // สำหรับตอนนี้ส่งคืนข้อมูลเดียวกับ getAdminNotes
    return await getAdminNotes(uuid);
  } catch (error) {
    console.error('Error getting admin notes history:', error);
    return { success: false, error: error.message };
  }
}
