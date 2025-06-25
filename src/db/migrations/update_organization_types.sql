-- 0. ลบ foreign key constraint ที่อ้างอิงไปยัง CCI_organization_types ก่อนเปลี่ยนชื่อตาราง
ALTER TABLE CCI_registrants DROP FOREIGN KEY CCI_registrants_ibfk_1;

-- 1. เปลี่ยนชื่อตาราง CCI_organization_types เดิมเป็น CCI_industry_types
RENAME TABLE CCI_organization_types TO CCI_industry_types;

-- 2. สร้างตาราง CCI_organization_types ใหม่
CREATE TABLE CCI_organization_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL
);

-- 3. เพิ่มข้อมูลประเภทองค์กรตามที่กำหนด
INSERT INTO CCI_organization_types (name_th, name_en) VALUES
('บริษัทเอกชน / ธุรกิจเอกชน', 'Private Company / Business'),
('หน่วยงานราชการ', 'Government Agency'),
('รัฐวิสาหกิจ', 'State Enterprise'),
('องค์กรปกครองส่วนท้องถิ่น (เช่น เทศบาล อบจ.)', 'Local Government Organization'),
('สถาบันการศึกษา / มหาวิทยาลัย', 'Educational Institution / University'),
('องค์กรไม่แสวงหากำไร (NGO / มูลนิธิ)', 'Non-profit Organization (NGO / Foundation)'),
('สมาคม / สภาอุตสาหกรรม / หอการค้า', 'Association / Federation of Industries / Chamber of Commerce'),
('สื่อมวลชน / ผู้ผลิตสื่อ', 'Media / Media Producer'),
('นักวิจัย / ที่ปรึกษาอิสระ', 'Researcher / Independent Consultant'),
('นักเรียน / นักศึกษา', 'Student'),
('บุคคลทั่วไป', 'General Public');

-- เพิ่มรายการ "อื่นๆ" ด้วย ID 99
INSERT INTO CCI_organization_types (id, name_th, name_en) VALUES
(99, 'อื่น ๆ (โปรดระบุ)', 'Other (Please specify)');

-- 4. แก้ไขตาราง CCI_registrants เพิ่มคอลัมน์ industry_type_id (ไม่บังคับให้กรอก - Optional field)
ALTER TABLE CCI_registrants ADD COLUMN industry_type_id INT DEFAULT NULL AFTER organization_type_id;

-- 5. อัพเดทข้อมูลเดิม - ย้ายข้อมูลจาก organization_type_id ไปยัง industry_type_id
UPDATE CCI_registrants SET industry_type_id = organization_type_id;

-- 6. ตั้งค่า organization_type_id เป็น 1 (บริษัทเอกชน) สำหรับข้อมูลเดิมทั้งหมด (สามารถปรับเปลี่ยนได้ตามความเหมาะสม)
UPDATE CCI_registrants SET organization_type_id = 1;

-- 7. เพิ่มคอลัมน์ industry_type_other สำหรับกรณีเลือกประเภทอุตสาหกรรมเป็น "อื่นๆ"
ALTER TABLE CCI_registrants ADD COLUMN industry_type_other VARCHAR(255) DEFAULT NULL AFTER organization_type_other;

-- 8. สร้าง foreign key constraints ใหม่สำหรับตาราง CCI_registrants
ALTER TABLE CCI_registrants ADD CONSTRAINT fk_organization_type FOREIGN KEY (organization_type_id) REFERENCES CCI_organization_types(id);
ALTER TABLE CCI_registrants ADD CONSTRAINT fk_industry_type FOREIGN KEY (industry_type_id) REFERENCES CCI_industry_types(id);
