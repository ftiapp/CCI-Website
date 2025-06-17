-- เพิ่มคอลัมน์ event_date ในตาราง CCI_schedule
ALTER TABLE CCI_schedule ADD COLUMN event_date DATE AFTER id;

-- อัปเดตข้อมูลที่มีอยู่ให้มีวันที่ 15 กันยายน 2568
UPDATE CCI_schedule SET event_date = '2568-09-15';

-- เพิ่มข้อมูลตัวอย่างสำหรับกำหนดการ (ถ้ายังไม่มีข้อมูล)
INSERT INTO CCI_schedule (event_date, time_start, time_end, title_th, title_en, description_th, description_en, speaker_th, speaker_en, room_id, is_morning)
VALUES 
('2568-09-15', '09:00:00', '09:30:00', 'ลงทะเบียนและรับประทานอาหารว่าง', 'Registration and Coffee Break', 'ลงทะเบียนเข้าร่วมงานและรับประทานอาหารว่าง', 'Register for the event and enjoy coffee break', NULL, NULL, NULL, 1),
('2568-09-15', '09:30:00', '10:30:00', 'พิธีเปิดและบรรยายพิเศษ', 'Opening Ceremony and Keynote Speech', 'พิธีเปิดงานและการบรรยายพิเศษโดยวิทยากรรับเชิญ', 'Opening ceremony and special keynote speech by guest speaker', 'ผู้บริหาร CCI', 'CCI Executive', NULL, 1),
('2568-09-15', '10:30:00', '12:00:00', 'เสวนาหัวข้อ "นวัตกรรมการลดคาร์บอนในอุตสาหกรรม"', 'Panel Discussion "Carbon Reduction Innovation in Industry"', 'การเสวนาเกี่ยวกับนวัตกรรมและเทคโนโลยีในการลดการปล่อยคาร์บอนในภาคอุตสาหกรรม', 'Panel discussion about innovations and technologies for carbon reduction in industrial sector', 'ผู้เชี่ยวชาญด้านสิ่งแวดล้อม', 'Environmental Experts', NULL, 1),
('2568-09-15', '12:00:00', '13:30:00', 'พักรับประทานอาหารกลางวัน', 'Lunch Break', 'พักรับประทานอาหารกลางวันและเยี่ยมชมบูธนิทรรศการ', 'Lunch break and exhibition visit', NULL, NULL, NULL, 1),
('2568-09-15', '13:30:00', '15:00:00', 'การประยุกต์ใช้เทคโนโลยีสีเขียวในอุตสาหกรรม', 'Green Technology Applications in Industry', 'การนำเสนอกรณีศึกษาและแนวทางการประยุกต์ใช้เทคโนโลยีสีเขียวในภาคอุตสาหกรรม', 'Case studies and approaches for applying green technologies in industrial sector', 'ดร.สมชาย ใจดี', 'Dr. Somchai Jaidee', 1, 0),
('2568-09-15', '13:30:00', '15:00:00', 'การเงินเพื่อความยั่งยืนและการลงทุนสีเขียว', 'Sustainable Finance and Green Investment', 'แนวทางการระดมทุนและการลงทุนเพื่อโครงการด้านสิ่งแวดล้อมและความยั่งยืน', 'Funding approaches and investments for environmental and sustainability projects', 'คุณวิชัย เศรษฐกิจ', 'Mr. Wichai Setthakij', 2, 0),
('2568-09-15', '15:00:00', '15:30:00', 'พักรับประทานอาหารว่าง', 'Coffee Break', 'พักรับประทานอาหารว่าง', 'Coffee break', NULL, NULL, NULL, 0),
('2568-09-15', '15:30:00', '16:30:00', 'สรุปผลการสัมมนาและพิธีปิด', 'Conclusion and Closing Ceremony', 'การสรุปประเด็นสำคัญจากการสัมมนาและพิธีปิดงาน', 'Summary of key points from the seminar and closing ceremony', 'ผู้อำนวยการ CCI', 'CCI Director', NULL, 0);
