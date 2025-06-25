-- เพิ่มคอลัมน์ industry_type_other ในตาราง CCI_registrants
ALTER TABLE CCI_registrants
ADD COLUMN industry_type_other VARCHAR(255) AFTER organization_type_other;
