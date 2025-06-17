-- Database schema for CCI Seminar Registration

-- Organization types table
CREATE TABLE IF NOT EXISTS CCI_organization_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL
);

-- Transportation types table
CREATE TABLE IF NOT EXISTS CCI_transportation_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL
);

-- Seminar rooms table
CREATE TABLE IF NOT EXISTS CCI_seminar_rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_th TEXT,
  description_en TEXT,
  capacity INT DEFAULT 100
);

-- Schedule table
CREATE TABLE IF NOT EXISTS CCI_schedule (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  title_th VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_th TEXT,
  description_en TEXT,
  speaker_th VARCHAR(255),
  speaker_en VARCHAR(255),
  room_id INT,
  is_morning BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (room_id) REFERENCES CCI_seminar_rooms(id)
);

-- Registrants table
CREATE TABLE IF NOT EXISTS CCI_registrants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(12) NOT NULL UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  organization_type_id INT NOT NULL,
  transportation_type_id INT,
  transportation_category ENUM('public', 'private'),
  public_transport_type VARCHAR(50),
  public_transport_other VARCHAR(100),
  car_type VARCHAR(50),
  car_type_other VARCHAR(100),
  car_passenger_type VARCHAR(50),
  attendance_type ENUM('morning', 'afternoon', 'full_day') NOT NULL,
  is_attending_morning BOOLEAN DEFAULT FALSE,
  is_attending_afternoon BOOLEAN DEFAULT FALSE,
  selected_room_id INT,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_type_id) REFERENCES CCI_organization_types(id),
  FOREIGN KEY (transportation_type_id) REFERENCES CCI_transportation_types(id),
  FOREIGN KEY (selected_room_id) REFERENCES CCI_seminar_rooms(id),
  UNIQUE KEY unique_name (first_name, last_name)
);

-- Insert industry types
INSERT INTO CCI_organization_types (name_th, name_en) VALUES
('ก๊าซ', 'Gas'),
('การพิมพ์และบรรจุภัณฑ์', 'Printing and Packaging'),
('การจัดการเพื่อสิ่งแวดล้อม', 'Environmental Management'),
('การบินและอวกาศ', 'Aviation and Aerospace'),
('แกรนิตและหินอ่อน', 'Granite and Marble'),
('แก้วและกระจก', 'Glass'),
('เคมี', 'Chemical'),
('เครื่องจักรกลการเกษตร', 'Agricultural Machinery'),
('เครื่องจักรกลและโลหะการ', 'Machinery and Metallurgy'),
('เครื่องนุ่งห่ม', 'Apparel'),
('เครื่องปรับอากาศและทำความเย็น', 'Air Conditioning and Refrigeration'),
('เครื่องสำอาง', 'Cosmetics'),
('ชิ้นส่วนและอะไหล่ยานยนต์', 'Automotive Parts'),
('เซรามิก', 'Ceramics'),
('ดิจิทัล', 'Digital'),
('ต่อเรือ ซ่อมเรือ และก่อสร้างงานเหล็ก', 'Shipbuilding and Steel Construction'),
('เทคโนโลยีชีวภาพ', 'Biotechnology'),
('น้ำตาล', 'Sugar'),
('น้ำมันปาล์ม', 'Palm Oil'),
('ปิโตรเคมี', 'Petrochemical'),
('ปูนซีเมนต์', 'Cement'),
('ผลิตภัณฑ์เสริมอาหาร', 'Dietary Supplements'),
('ผู้ผลิตเครื่องมือแพทย์', 'Medical Device Manufacturers'),
('ผู้ผลิตไฟฟ้า', 'Electricity Producers'),
('พลังงานหมุนเวียน', 'Renewable Energy'),
('พลาสติก', 'Plastics'),
('เฟอร์นิเจอร์', 'Furniture'),
('ไฟฟ้าและอิเล็กทรอนิกส์', 'Electrical and Electronics'),
('ไม้อัด ไม้บาง และวัสดุแผ่น', 'Plywood and Sheet Materials'),
('ยาง', 'Rubber'),
('ยา', 'Pharmaceuticals'),
('ยานยนต์', 'Automotive'),
('เยื่อและกระดาษ', 'Pulp and Paper'),
('รองเท้า', 'Footwear'),
('โรงกลั่นน้ำมันปิโตรเลียม', 'Petroleum Refinery'),
('โรงเลื่อยและโรงอบไม้', 'Sawmill and Wood Drying'),
('สมุนไพร', 'Herbs'),
('สิ่งทอ', 'Textiles'),
('สำรวจและผลิตปิโตรเลียม', 'Petroleum Exploration and Production'),
('หัตกรรมสร้างสรรค์', 'Creative Crafts'),
('หล่อโลหะ', 'Metal Casting'),
('หนังและผลิตภัณฑ์หนัง', 'Leather and Leather Products'),
('หลังคาและอุปกรณ์', 'Roofing and Equipment'),
('เหล็ก', 'Steel'),
('อลูมิเนียม', 'Aluminum'),
('อัญมณี', 'Gems'),
('อาหารและเครื่องดื่ม', 'Food and Beverage'),
('ภาครัฐ', 'Government'),
('สถาบันการศึกษา', 'Educational Institution'),
('องค์กรไม่แสวงหาผลกำไร', 'Non-profit Organization'),
('อื่นๆ', 'Others');

-- Insert default transportation types
INSERT INTO CCI_transportation_types (name_th, name_en) VALUES
('รถยนต์ส่วนตัว', 'Private Car'),
('รถโดยสารสาธารณะ', 'Public Transportation'),
('รถไฟฟ้า', 'Electric Train'),
('แท็กซี่', 'Taxi'),
('เดิน', 'Walking'),
('อื่นๆ', 'Others');

-- Insert seminar rooms
INSERT INTO CCI_seminar_rooms (name_th, name_en, description_th, description_en) VALUES
('ห้องประชุมใหญ่', 'Main Conference Room', 'ห้องประชุมหลักสำหรับพิธีเปิด', 'Main conference room for opening ceremony'),
('ห้องสัมมนา 1', 'Seminar Room 1', 'ห้องสัมมนาเกี่ยวกับคาร์บอนเครดิตในภาคอุตสาหกรรม', 'Seminar room for carbon credit in industrial sector'),
('ห้องสัมมนา 2', 'Seminar Room 2', 'ห้องสัมมนาเกี่ยวกับคาร์บอนเครดิตในภาคพลังงาน', 'Seminar room for carbon credit in energy sector'),
('ห้องสัมมนา 3', 'Seminar Room 3', 'ห้องสัมมนาเกี่ยวกับคาร์บอนเครดิตในภาคเกษตร', 'Seminar room for carbon credit in agricultural sector');

-- Insert schedule
INSERT INTO CCI_schedule (time_start, time_end, title_th, title_en, description_th, description_en, speaker_th, speaker_en, room_id, is_morning) VALUES
('09:00:00', '09:30:00', 'พิธีเปิด', 'Opening Ceremony', 'พิธีเปิดงานสัมมนาคาร์บอนเครดิต', 'Opening ceremony for carbon credit seminar', 'ประธาน CCI', 'CCI Chairman', 1, TRUE),
('09:30:00', '10:30:00', 'บรรยายพิเศษ: อนาคตของคาร์บอนเครดิตในประเทศไทย', 'Special Lecture: Future of Carbon Credit in Thailand', 'การบรรยายพิเศษเกี่ยวกับอนาคตของคาร์บอนเครดิตในประเทศไทย', 'Special lecture about the future of carbon credit in Thailand', 'ดร. สมชาย ใจดี', 'Dr. Somchai Jaidee', 1, TRUE),
('10:45:00', '12:00:00', 'เสวนา: นโยบายภาครัฐกับการส่งเสริมคาร์บอนเครดิต', 'Panel Discussion: Government Policies and Carbon Credit Promotion', 'การเสวนาเกี่ยวกับนโยบายภาครัฐในการส่งเสริมคาร์บอนเครดิต', 'Panel discussion about government policies in promoting carbon credit', 'ผู้แทนจากหน่วยงานภาครัฐ', 'Representatives from government agencies', 1, TRUE),
('13:00:00', '14:30:00', 'คาร์บอนเครดิตในภาคอุตสาหกรรม', 'Carbon Credit in Industrial Sector', 'การประยุกต์ใช้คาร์บอนเครดิตในภาคอุตสาหกรรม', 'Application of carbon credit in industrial sector', 'คุณวิชัย อุตสาหกรรม', 'Mr. Wichai Utsahakam', 2, FALSE),
('13:00:00', '14:30:00', 'คาร์บอนเครดิตในภาคพลังงาน', 'Carbon Credit in Energy Sector', 'การประยุกต์ใช้คาร์บอนเครดิตในภาคพลังงาน', 'Application of carbon credit in energy sector', 'คุณพลังงาน สะอาด', 'Mr. Palangnan Saard', 3, FALSE),
('13:00:00', '14:30:00', 'คาร์บอนเครดิตในภาคเกษตร', 'Carbon Credit in Agricultural Sector', 'การประยุกต์ใช้คาร์บอนเครดิตในภาคเกษตร', 'Application of carbon credit in agricultural sector', 'ดร. เกษตร ยั่งยืน', 'Dr. Kaset Yangyuen', 4, FALSE),
('14:45:00', '16:30:00', 'เวิร์คช็อป: การคำนวณคาร์บอนเครดิตในองค์กร', 'Workshop: Carbon Credit Calculation in Organizations', 'เวิร์คช็อปเกี่ยวกับการคำนวณคาร์บอนเครดิตในองค์กร', 'Workshop about carbon credit calculation in organizations', 'ทีมวิทยากร CCI', 'CCI Speaker Team', 2, FALSE),
('14:45:00', '16:30:00', 'เวิร์คช็อป: การซื้อขายคาร์บอนเครดิต', 'Workshop: Carbon Credit Trading', 'เวิร์คช็อปเกี่ยวกับการซื้อขายคาร์บอนเครดิต', 'Workshop about carbon credit trading', 'ทีมวิทยากร CCI', 'CCI Speaker Team', 3, FALSE),
('14:45:00', '16:30:00', 'เวิร์คช็อป: การพัฒนาโครงการคาร์บอนเครดิต', 'Workshop: Carbon Credit Project Development', 'เวิร์คช็อปเกี่ยวกับการพัฒนาโครงการคาร์บอนเครดิต', 'Workshop about carbon credit project development', 'ทีมวิทยากร CCI', 'CCI Speaker Team', 4, FALSE);
