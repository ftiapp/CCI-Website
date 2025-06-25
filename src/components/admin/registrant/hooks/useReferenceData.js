import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function useReferenceData() {
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const [industryTypes, setIndustryTypes] = useState([]);
  const [transportationTypes, setTransportationTypes] = useState([]);
  const [publicTransportOptions, setPublicTransportOptions] = useState([]);
  const [privateVehicleOptions, setPrivateVehicleOptions] = useState([]);
  const [seminarRooms, setSeminarRooms] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [bangkokDistricts, setBangkokDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        // Fetch organization types
        const orgTypesResponse = await fetch('/api/admin/organization-types');
        const orgTypesData = await orgTypesResponse.json();
        if (orgTypesData.success) {
          setOrganizationTypes(orgTypesData.organizationTypes);
        }
        
        // Fetch industry types
        const industryTypesResponse = await fetch('/api/admin/industry-types');
        const industryTypesData = await industryTypesResponse.json();
        if (industryTypesData.success) {
          setIndustryTypes(industryTypesData.industryTypes);
        }

        // Fetch transportation types
        const transportTypesResponse = await fetch('/api/admin/transportation-types');
        const transportTypesData = await transportTypesResponse.json();
        if (transportTypesData.success) {
          setTransportationTypes(transportTypesData.transportationTypes);
          
          // แยกประเภทการเดินทางเป็นขนส่งมวลชนและพาหนะส่วนตัว
          const publicOptions = transportTypesData.transportationTypes.filter(t => t.category === 'public');
          const privateOptions = transportTypesData.transportationTypes.filter(t => t.category === 'private');
          
          setPublicTransportOptions(publicOptions);
          setPrivateVehicleOptions(privateOptions);
        }

        // Fetch seminar rooms
        const roomsResponse = await fetch('/api/admin/seminar-rooms');
        const roomsData = await roomsResponse.json();
        if (roomsData.success) {
          setSeminarRooms(roomsData.rooms);
        }

        // Fetch provinces
        const provincesResponse = await fetch('/api/admin/provinces');
        const provincesData = await provincesResponse.json();
        if (provincesData.success) {
          setProvinces(provincesData.provinces);
        }

        // Fetch Bangkok districts
        const districtsResponse = await fetch('/api/admin/bangkok-districts');
        const districtsData = await districtsResponse.json();
        if (districtsData.success) {
          setBangkokDistricts(districtsData.districts);
        }
      } catch (error) {
        console.error('Error fetching reference data:', error);
        toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    fetchReferenceData();
  }, []);

  return {
    organizationTypes,
    industryTypes,
    transportationTypes,
    publicTransportOptions,
    privateVehicleOptions,
    seminarRooms,
    provinces,
    bangkokDistricts,
    loading
  };
}
