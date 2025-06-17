-- Update seminar rooms for the new event
-- Temporarily disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;

-- First, clear existing seminar rooms
TRUNCATE TABLE CCI_seminar_rooms;

-- Insert new seminar rooms
INSERT INTO CCI_seminar_rooms (name_th, name_en, description_th, description_en) VALUES
('ห้องประชุมใหญ่', 'Main Conference Room', 'ห้องประชุมหลักสำหรับพิธีเปิดและมอบรางวัล Climate Action', 'Main conference room for opening ceremony and Climate Action awards'),
('ห้องสัมมนา Green Finance & Investment', 'Green Finance & Investment Room', 'เน้นบทบาทของภาคการเงินในการขับเคลื่อนการเปลี่ยนผ่านสู่เศรษฐกิจคาร์บอนต่ำ โดยเปิดมุมมองจากทั้งสถาบันการเงิน นักลงทุน และภาคธุรกิจถึงแนวโน้มและกลไกสนับสนุนทางการเงิน เช่น สินเชื่อสีเขียว (Green Loan), พันธบัตรสีเขียว (Green Bond) และเครื่องมือทางการเงินอื่นๆ ที่ช่วยลดความเสี่ยงและเพิ่มโอกาสในการลงทุนด้านสิ่งแวดล้อม เป็นเวทีที่เปิดโอกาสให้ทั้งผู้ให้และผู้รับทุนได้พบกัน และต่อยอดความร่วมมือเพื่อการเติบโตอย่างยั่งยืน', 'Focusing on the role of the financial sector in driving the transition to a low-carbon economy by providing perspectives from financial institutions, investors, and businesses on trends and financial support mechanisms such as Green Loans, Green Bonds, and other financial instruments that reduce risks and increase opportunities for environmental investments.'),
('ห้องสัมมนา Net-Zero Vision', 'Net-Zero Vision Room', 'เปิดพื้นที่ให้กับองค์กรที่มีแนวคิดและการดำเนินงานจริงด้านนวัตกรรมเพื่อการลดคาร์บอนมาแบ่งปันประสบการณ์ ไม่ว่าจะเป็นเทคโนโลยีใหม่ การปรับเปลี่ยนกระบวนการผลิต การออกแบบผลิตภัณฑ์ หรือโมเดลธุรกิจใหม่ที่ช่วยขับเคลื่อนองค์กรสู่เป้าหมาย Net Zero ผู้ร่วมเสวนาจะสะท้อนให้เห็นทั้งแรงบันดาลใจ และแนวทางปฏิบัติที่นำไปใช้ได้จริง เพื่อจุดประกายและเร่งการเปลี่ยนผ่านของภาคอุตสาหกรรม', 'Providing a platform for organizations with real innovation concepts and operations for carbon reduction to share experiences, whether new technologies, production process adjustments, product design, or new business models that help drive organizations towards Net Zero goals.'),
('ห้องให้คำปรึกษา Climate Solutions', 'Climate Solutions Advisory Clinic', 'คลินิกให้คำปรึกษาแบบเจาะจงรายองค์กร โดยเชิญผู้เชี่ยวชาญเฉพาะด้านมาร่วมให้คำแนะนำแบบตัวต่อตัวในประเด็นที่สำคัญ เช่น การวัดและรายงานการปล่อยก๊าซเรือนกระจก (GHG), การจัดการพลังงาน, กลยุทธ์ลดคาร์บอน และการประเมินคาร์บอนฟุตพริ้นท์ขององค์กรหรือผลิตภัณฑ์ โดยเปิดให้ผู้สนใจสามารถจองเวลาเข้ารับคำปรึกษาได้ล่วงหน้า เหมาะอย่างยิ่งสำหรับผู้ประกอบการ โดยเฉพาะ SME ที่ต้องการเริ่มต้นหรือพัฒนากระบวนการด้าน Climate Action อย่างจริงจัง', 'An organization-specific consultation clinic with subject matter experts providing one-on-one advice on important issues such as greenhouse gas (GHG) measurement and reporting, energy management, carbon reduction strategies, and carbon footprint assessment of organizations or products.');

-- Clear existing schedule
TRUNCATE TABLE CCI_schedule;

-- Insert new schedule
INSERT INTO CCI_schedule (time_start, time_end, title_th, title_en, description_th, description_en, speaker_th, speaker_en, room_id, is_morning) VALUES
-- Morning session
('08:30:00', '12:00:00', 'พิธีเปิดและมอบรางวัล Climate Action', 'Opening Ceremony and Climate Action Awards', 'พิธีเปิดงานและมอบรางวัล Climate Action', 'Opening ceremony and Climate Action awards ceremony', 'ผู้บริหาร CCI', 'CCI Executives', 1, TRUE),

-- Afternoon sessions
-- Green Finance & Investment Room
('13:00:00', '15:00:00', 'Green Finance & Investment', 'Green Finance & Investment', 'เน้นบทบาทของภาคการเงินในการขับเคลื่อนการเปลี่ยนผ่านสู่เศรษฐกิจคาร์บอนต่ำ โดยเปิดมุมมองจากทั้งสถาบันการเงิน นักลงทุน และภาคธุรกิจถึงแนวโน้มและกลไกสนับสนุนทางการเงิน เช่น สินเชื่อสีเขียว (Green Loan), พันธบัตรสีเขียว (Green Bond) และเครื่องมือทางการเงินอื่นๆ', 'Focusing on the role of the financial sector in driving the transition to a low-carbon economy by providing perspectives from financial institutions, investors, and businesses on trends and financial support mechanisms such as Green Loans, Green Bonds, and other financial instruments', 'ผู้เชี่ยวชาญด้านการเงินเพื่อสิ่งแวดล้อม', 'Environmental Finance Experts', 2, FALSE),

-- Net-Zero Vision Room
('13:00:00', '16:30:00', 'Net-Zero Vision: Innovate, Inspire, Implement', 'Net-Zero Vision: Innovate, Inspire, Implement', 'เปิดพื้นที่ให้กับองค์กรที่มีแนวคิดและการดำเนินงานจริงด้านนวัตกรรมเพื่อการลดคาร์บอนมาแบ่งปันประสบการณ์ ไม่ว่าจะเป็นเทคโนโลยีใหม่ การปรับเปลี่ยนกระบวนการผลิต การออกแบบผลิตภัณฑ์ หรือโมเดลธุรกิจใหม่', 'Providing a platform for organizations with real innovation concepts and operations for carbon reduction to share experiences, whether new technologies, production process adjustments, product design, or new business models', 'ผู้นำองค์กรด้านนวัตกรรมลดคาร์บอน', 'Carbon Innovation Leaders', 3, FALSE),

-- Climate Solutions Advisory Clinic
('13:00:00', '16:30:00', 'Climate Solutions Advisory Clinic', 'Climate Solutions Advisory Clinic', 'คลินิกให้คำปรึกษาแบบเจาะจงรายองค์กร โดยเชิญผู้เชี่ยวชาญเฉพาะด้านมาร่วมให้คำแนะนำแบบตัวต่อตัวในประเด็นที่สำคัญ เช่น การวัดและรายงานการปล่อยก๊าซเรือนกระจก (GHG), การจัดการพลังงาน, กลยุทธ์ลดคาร์บอน และการประเมินคาร์บอนฟุตพริ้นท์', 'An organization-specific consultation clinic with subject matter experts providing one-on-one advice on important issues such as greenhouse gas (GHG) measurement and reporting, energy management, carbon reduction strategies, and carbon footprint assessment', 'ทีมผู้เชี่ยวชาญด้าน Climate Solutions', 'Climate Solutions Expert Team', 4, FALSE);

-- Update the registrants table to add new transportation fields
ALTER TABLE CCI_registrants ADD COLUMN transportation_category ENUM('public', 'private') NULL AFTER transportation_type_id;
ALTER TABLE CCI_registrants ADD COLUMN public_transport_type VARCHAR(50) NULL AFTER transportation_category;
ALTER TABLE CCI_registrants ADD COLUMN public_transport_other VARCHAR(100) NULL AFTER public_transport_type;
ALTER TABLE CCI_registrants ADD COLUMN car_type VARCHAR(50) NULL AFTER public_transport_other;
ALTER TABLE CCI_registrants ADD COLUMN car_type_other VARCHAR(100) NULL AFTER car_type;
ALTER TABLE CCI_registrants ADD COLUMN car_passenger_type VARCHAR(50) NULL AFTER car_type_other;

-- Add organization_type_other column to store "Other" industry type
ALTER TABLE CCI_registrants ADD COLUMN organization_type_other VARCHAR(255) NULL AFTER organization_type_id;

-- Add location fields to registrants table
ALTER TABLE CCI_registrants ADD COLUMN location_type ENUM('bangkok', 'province') NULL AFTER car_passenger_type;
ALTER TABLE CCI_registrants ADD COLUMN bangkok_district_id INT NULL AFTER location_type;
ALTER TABLE CCI_registrants ADD COLUMN province_id INT NULL AFTER bangkok_district_id;

-- Create tables for Bangkok districts and provinces if they don't exist
CREATE TABLE IF NOT EXISTS CCI_bangkok_districts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS CCI_provinces (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL
);

-- Add foreign keys
ALTER TABLE CCI_registrants ADD FOREIGN KEY (bangkok_district_id) REFERENCES CCI_bangkok_districts(id);
ALTER TABLE CCI_registrants ADD FOREIGN KEY (province_id) REFERENCES CCI_provinces(id);

-- Update the registrants table to match the new seminar rooms if needed
ALTER TABLE CCI_registrants MODIFY attendance_type ENUM('morning', 'afternoon', 'full_day') NOT NULL;

-- Re-enable foreign key checks after all operations
SET FOREIGN_KEY_CHECKS = 1;
