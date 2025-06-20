-- สร้างตารางใหม่สำหรับเก็บข้อมูลหมายเหตุของผู้ลงทะเบียน
CREATE TABLE IF NOT EXISTS CCI_admin_notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(36) NOT NULL COMMENT 'UUID ของผู้ลงทะเบียน',
  admin_notes TEXT COMMENT 'หมายเหตุจากผู้ดูแลระบบ',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'เวลาที่สร้าง',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'เวลาที่แก้ไขล่าสุด',
  admin_user VARCHAR(100) COMMENT 'ชื่อผู้ดูแลระบบที่เพิ่มหรือแก้ไขหมายเหตุ',
  INDEX (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
