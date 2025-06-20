import { executeQuery } from './db';

/**
 * เพิ่มข้อมูลเริ่มต้นในตารางการเดินทาง
 * @returns {Promise<void>}
 */
export async function insertTransportationData() {
  try {
    // เพิ่มข้อมูลเริ่มต้นในตาราง CCI_transport_types
    await executeQuery(`
      INSERT INTO CCI_transport_types (name_th, name_en, code)
      VALUES 
        ('ขนส่งมวลชน', 'Public Transportation', 'public'),
        ('พาหนะส่วนตัว', 'Private Vehicle', 'private'),
        ('เดิน', 'Walking', 'walking')
      ON DUPLICATE KEY UPDATE 
        name_th = VALUES(name_th),
        name_en = VALUES(name_en),
        code = VALUES(code)
    `);
    console.log('Inserted data into CCI_transport_types');

    // เพิ่มข้อมูลเริ่มต้นในตาราง CCI_public_transport_types
    await executeQuery(`
      INSERT INTO CCI_public_transport_types (id, name_th, name_en)
      VALUES 
        (1, 'รถไฟฟ้า/รถไฟใต้ดิน', 'Electric Train/Subway'),
        (2, 'รถเมล์/รถประจำทาง', 'Bus'),
        (3, 'รถตู้สาธารณะ', 'Public Van'),
        (4, 'เรือโดยสาร', 'Ferry/Boat'),
        (5, 'รถไฟ', 'Train'),
        (99, 'อื่นๆ', 'Others')
      ON DUPLICATE KEY UPDATE 
        name_th = VALUES(name_th),
        name_en = VALUES(name_en)
    `);
    console.log('Inserted data into CCI_public_transport_types');

    // เพิ่มข้อมูลเริ่มต้นในตาราง CCI_private_vehicle_types
    await executeQuery(`
      INSERT INTO CCI_private_vehicle_types (id, name_th, name_en)
      VALUES 
        (1, 'รถยนต์ส่วนตัว', 'Personal Car'),
        (2, 'รถจักรยานยนต์', 'Motorcycle'),
        (3, 'แท็กซี่/แกร็บ/อูเบอร์', 'Taxi/Grab/Uber'),
        (99, 'อื่นๆ', 'Others')
      ON DUPLICATE KEY UPDATE 
        name_th = VALUES(name_th),
        name_en = VALUES(name_en)
    `);
    console.log('Inserted data into CCI_private_vehicle_types');

    // เพิ่มข้อมูลเริ่มต้นในตาราง CCI_fuel_types
    await executeQuery(`
      INSERT INTO CCI_fuel_types (id, name_th, name_en)
      VALUES 
        (1, 'เบนซิน', 'Gasoline'),
        (2, 'ดีเซล', 'Diesel'),
        (3, 'ไฟฟ้า', 'Electric'),
        (4, 'ไฮบริด', 'Hybrid'),
        (99, 'อื่นๆ', 'Others')
      ON DUPLICATE KEY UPDATE 
        name_th = VALUES(name_th),
        name_en = VALUES(name_en)
    `);
    console.log('Inserted data into CCI_fuel_types');

    // เพิ่มข้อมูลเริ่มต้นในตาราง CCI_passenger_types
    await executeQuery(`
      INSERT INTO CCI_passenger_types (id, name_th, name_en)
      VALUES 
        (1, 'คนเดียว', 'Alone'),
        (2, 'มากับเพื่อน', 'With Friends'),
        (3, 'มากับครอบครัว', 'With Family')
      ON DUPLICATE KEY UPDATE 
        name_th = VALUES(name_th),
        name_en = VALUES(name_en)
    `);
    console.log('Inserted data into CCI_passenger_types');

    console.log('All transportation data inserted successfully');
    return { success: true, message: 'All transportation data inserted successfully' };
  } catch (error) {
    console.error('Error inserting transportation data:', error);
    return { success: false, error: error.message };
  }
}

// สำหรับรันโดยตรง
if (require.main === module) {
  insertTransportationData()
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(error => {
      console.error('Failed to insert transportation data:', error);
      process.exit(1);
    });
}
