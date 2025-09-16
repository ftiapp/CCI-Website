'use client';

import { useState, useEffect, useCallback } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { ChartBarIcon, MapPinIcon, TruckIcon, UsersIcon, CheckCircleIcon, XCircleIcon, CalendarIcon, UserIcon, ClipboardDocumentListIcon, BuildingOfficeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import ScheduleManagement from './ScheduleManagement';
import RegistrantManagement from './registrant/RegistrantManagement';
import OrganizationTypeManagement from './organization-type/OrganizationTypeManagement';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'schedule', 'registrants', or 'organization-types'
  
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    totalCheckedIn: 0,
    morningAttendees: 0,
    afternoonAttendees: 0,
    fullDayAttendees: 0,
    roomDistribution: [],
    provinceDistribution: [],
    transportationDistribution: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [transportFilter, setTransportFilter] = useState('all');
  const [checkInFilter, setCheckInFilter] = useState('all');
  const [provinces, setProvinces] = useState([]);
  const [roomFilter, setRoomFilter] = useState('all');
  const [rooms, setRooms] = useState([]);

  // Participants state
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  
  const handleProvinceFilterChange = (e) => {
    setProvinceFilter(e.target.value);
  };
  
  const handleTransportFilterChange = (e) => {
    setTransportFilter(e.target.value);
  };
  
  const handleCheckInFilterChange = (e) => {
    setCheckInFilter(e.target.value);
  };
  const handleRoomFilterChange = (e) => {
    setRoomFilter(e.target.value);
  };
  
  // Fetch dashboard data - wrapped in useCallback to prevent unnecessary re-renders
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/admin/dashboard?province=${provinceFilter}&transport=${transportFilter}&checkin=${checkInFilter}&room=${roomFilter}`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
        
        // Extract unique provinces for filter
        if (data.provinces && Array.isArray(data.provinces)) {
          setProvinces(data.provinces);
        }
      } else {
        throw new Error(data.error || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูลแดชบอร์ด', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [provinceFilter, transportFilter, checkInFilter, roomFilter]);

  // Fetch seminar rooms for room filter
  const fetchRooms = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/seminar-rooms');
      const data = await res.json();
      if (data.success) {
        setRooms(data.rooms || []);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  }, []);

  // Fetch participants list for bottom table
  const fetchParticipants = useCallback(async () => {
    setParticipantsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(limit));
      // Map checkInFilter to status values: all | 0 | 1 | 2
      if (provinceFilter !== 'all') params.set('province', provinceFilter);
      if (roomFilter !== 'all') params.set('room', roomFilter);
      if (checkInFilter !== 'all') {
        const status = checkInFilter === 'checked_in' ? '1' : checkInFilter === 'not_checked_in' ? '0' : checkInFilter === 'not_attending' ? '2' : 'all';
        if (status !== 'all') params.set('status', status);
      }
      const res = await fetch(`/api/admin/participants?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setParticipants(data.participants || []);
        setTotalPages(data.pagination?.totalPages || 1);
      }
    } catch (err) {
      console.error('Error fetching participants:', err);
      toast.error('เกิดข้อผิดพลาดในการโหลดรายชื่อผู้ลงทะเบียน', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
        },
      });
    } finally {
      setParticipantsLoading(false);
    }
  }, [page, limit, provinceFilter, roomFilter, checkInFilter]);
  
  // Fetch data on component mount and when filters change
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);
  
  // Calculate check-in percentage
  const checkInPercentage = stats.totalRegistrations > 0
    ? Math.round((stats.totalCheckedIn / stats.totalRegistrations) * 100)
    : 0;
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Get transportation display name
  const getTransportDisplayName = (type) => {
    const transportNames = {
      'public': 'ขนส่งสาธารณะ',
      'walking': 'เดินเท้า',
      'private': 'รถยนต์ส่วนตัว',
      'other': 'อื่นๆ'
    };
    return transportNames[type] || type;
  };
  
  // Get transportation colors
  const getTransportColors = (type) => {
    const colors = {
      'public': { bg: 'bg-blue-100', text: 'text-blue-800' },
      'walking': { bg: 'bg-green-100', text: 'text-green-800' },
      'private': { bg: 'bg-red-100', text: 'text-red-800' },
      'other': { bg: 'bg-gray-100', text: 'text-gray-800' }
    };
    return colors[type] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };
  
  // Stat Card Component
  const StatCard = ({ icon, title, value, subValue, color }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col sm:flex-row">
        <div className={`rounded-full p-3 sm:p-4 ${color} mb-3 sm:mb-0 sm:mr-4 self-center sm:self-start`}>
          {icon}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-gray-500 text-xs sm:text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl sm:text-3xl font-prompt font-bold text-gray-800 mb-1">{value}</p>
          {subValue && <p className="text-xs sm:text-sm text-gray-500">{subValue}</p>}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-2 sm:space-x-8 min-w-max px-4 sm:px-0" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`${activeTab === 'dashboard'
              ? 'border-earth-500 text-earth-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-prompt font-medium text-xs sm:text-sm flex items-center`}
          >
            <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">แดชบอร์ด</span>
            <span className="sm:hidden">ข้อมูล</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`${activeTab === 'schedule'
              ? 'border-earth-500 text-earth-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-prompt font-medium text-xs sm:text-sm flex items-center`}
          >
            <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">จัดการตารางกิจกรรม</span>
            <span className="sm:hidden">ตาราง</span>
          </button>
          <button
            onClick={() => setActiveTab('registrants')}
            className={`${activeTab === 'registrants'
              ? 'border-earth-500 text-earth-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-prompt font-medium text-xs sm:text-sm flex items-center`}
          >
            <ClipboardDocumentListIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">จัดการข้อมูลผู้ลงทะเบียน</span>
            <span className="sm:hidden">ผู้ลงทะเบียน</span>
          </button>
          <button
            onClick={() => setActiveTab('organization-types')}
            className={`${activeTab === 'organization-types'
              ? 'border-earth-500 text-earth-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-prompt font-medium text-xs sm:text-sm flex items-center`}
          >
            <BuildingOfficeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">จัดการประเภทธุรกิจ</span>
            <span className="sm:hidden">ธุรกิจ</span>
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'dashboard' ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-prompt font-bold text-earth-800">แดชบอร์ด</h2>
          </div>
      
          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <h3 className="text-base sm:text-lg font-prompt font-semibold text-earth-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-earth-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              ตัวกรองข้อมูล
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Province Filter */}
              <div className="flex flex-col gap-2">
                <label htmlFor="provinceFilter" className="text-sm font-medium text-gray-700 font-prompt">
                  กรองตามจังหวัด
                </label>
                <div className="relative">
                  <select
                    id="provinceFilter"
                    value={provinceFilter}
                    onChange={handleProvinceFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-prompt text-sm focus:ring-2 focus:ring-earth-500 focus:border-earth-500 appearance-none bg-white"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="bangkok">กรุงเทพมหานคร</option>
                    {provinces.map(province => (
                      province.id !== 'bangkok' && (
                        <option key={province.id} value={province.id}>
                          {province.name_th}
                        </option>
                      )
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Transportation Filter */}
              <div className="flex flex-col gap-2">
                <label htmlFor="transportFilter" className="text-sm font-medium text-gray-700 font-prompt">
                  กรองตามวิธีการเดินทาง
                </label>
                <div className="relative">
                  <select
                    id="transportFilter"
                    value={transportFilter}
                    onChange={handleTransportFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-prompt text-sm focus:ring-2 focus:ring-earth-500 focus:border-earth-500 appearance-none bg-white"
                  >
                    <option value="all">ทุกวิธีการเดินทาง</option>
                    <option value="public">ขนส่งสาธารณะ</option>
                    <option value="walking">เดินเท้า</option>
                    <option value="private">รถยนต์ส่วนตัว</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Check-in Status Filter */}
              <div className="flex flex-col gap-2">
                <label htmlFor="checkInFilter" className="text-sm font-medium text-gray-700 font-prompt">
                  กรองตามสถานะเช็คอิน
                </label>
                <div className="relative">
                  <select
                    id="checkInFilter"
                    value={checkInFilter}
                    onChange={handleCheckInFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-prompt text-sm focus:ring-2 focus:ring-earth-500 focus:border-earth-500 appearance-none bg-white"
                  >
                    <option value="all">ทุกสถานะ</option>
                    <option value="checked_in">เช็คอินแล้ว</option>
                    <option value="not_checked_in">ยังไม่ได้เช็คอิน</option>
                    <option value="not_attending">ไม่เข้าร่วม</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Room Filter */}
              <div className="flex flex-col gap-2">
                <label htmlFor="roomFilter" className="text-sm font-medium text-gray-700 font-prompt">
                  กรองตามห้องสัมมนา
                </label>
                <div className="relative">
                  <select
                    id="roomFilter"
                    value={roomFilter}
                    onChange={handleRoomFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 font-prompt text-sm focus:ring-2 focus:ring-earth-500 focus:border-earth-500 appearance-none bg-white"
                  >
                    <option value="all">ทุกห้อง</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>{room.name_th}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={fetchDashboardData}
                className="bg-earth-600 hover:bg-earth-700 text-white font-prompt text-sm px-6 py-2.5 rounded-lg transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                รีเฟรชข้อมูล
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth-600"></div>
            </div>
          ) : (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                  icon={<UsersIcon className="h-6 w-6 text-blue-500" />}
                  title="ลงทะเบียนทั้งหมด"
                  value={formatNumber(stats.totalRegistrations)}
                  subValue="จำนวนผู้ลงทะเบียน"
                  color="bg-blue-100"
                />
                
                <StatCard
                  icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />}
                  title="เช็คอินแล้ว"
                  value={formatNumber(stats.totalCheckedIn)}
                  subValue={`${checkInPercentage}% ของผู้ลงทะเบียนทั้งหมด`}
                  color="bg-green-100"
                />
                
                <StatCard
                  icon={<MapPinIcon className="h-6 w-6 text-purple-500" />}
                  title="จังหวัด"
                  value={stats.provinceDistribution.length}
                  subValue="จำนวนจังหวัดที่มีผู้เข้าร่วม"
                  color="bg-purple-100"
                />
                
                <StatCard
                  icon={<TruckIcon className="h-6 w-6 text-amber-500" />}
                  title="ขนส่งสาธารณะ/เดินเท้า"
                  value={stats.transportationDistribution
                    .filter(t => t.type === 'public' || t.type === 'walking')
                    .reduce((sum, item) => sum + item.count, 0)}
                  subValue="จำนวนผู้ใช้ขนส่งสาธารณะ/เดินเท้า"
                  color="bg-amber-100"
                />
              </div>
              
              {/* Attendance by Session */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-prompt font-semibold text-earth-800 mb-4 flex items-center">
                  <ChartBarIcon className="h-5 w-5 mr-2 text-earth-600" />
                  การเข้าร่วมตามช่วงเวลา
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">ช่วงเช้า</p>
                    <p className="text-2xl font-prompt font-bold text-earth-800">
                      {formatNumber(stats.morningAttendees)}
                    </p>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ 
                          width: `${stats.totalRegistrations > 0 
                            ? (stats.morningAttendees / stats.totalRegistrations) * 100 
                            : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">ช่วงบ่าย</p>
                    <p className="text-2xl font-prompt font-bold text-earth-800">
                      {formatNumber(stats.afternoonAttendees)}
                    </p>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ 
                          width: `${stats.totalRegistrations > 0 
                            ? (stats.afternoonAttendees / stats.totalRegistrations) * 100 
                            : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">เต็มวัน</p>
                    <p className="text-2xl font-prompt font-bold text-earth-800">
                      {formatNumber(stats.fullDayAttendees)}
                    </p>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full" 
                        style={{ 
                          width: `${stats.totalRegistrations > 0 
                            ? (stats.fullDayAttendees / stats.totalRegistrations) * 100 
                            : 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Room Distribution */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-prompt font-semibold text-earth-800 mb-4">
                  การเข้าร่วมตามห้องสัมมนา
                </h3>
                
                {stats.roomDistribution.length > 0 ? (
                  <div className="space-y-4">
                    {stats.roomDistribution.map((room) => (
                      <div key={room.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-prompt font-medium">{room.name_th}</p>
                          <p className="text-sm font-medium bg-earth-100 text-earth-800 px-2 py-1 rounded-full">
                            {formatNumber(room.count)} คน
                          </p>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-earth-500 rounded-full" 
                            style={{ 
                              width: `${stats.totalRegistrations > 0 
                                ? (room.count / stats.totalRegistrations) * 100 
                                : 0}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">ไม่มีข้อมูลการเข้าร่วมห้องสัมมนา</p>
                )}
              </div>
              
              {/* Province and Transportation Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Province Distribution */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-prompt font-semibold text-earth-800 mb-4">
                    การเข้าร่วมตามจังหวัด (Top 5)
                  </h3>
                  {stats.provinceDistribution.length > 0 ? (
                    <div className="space-y-4">
                      {stats.provinceDistribution
                        .sort((a, b) => b.count - a.count)
                        .slice(0, 5)
                        .map((province) => (
                          <div key={province.id} className="flex justify-between items-center">
                            <p className="font-prompt">{province.name_th}</p>
                            <p className="text-sm font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              {formatNumber(province.count)} คน
                            </p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">ไม่มีข้อมูลการเข้าร่วมตามจังหวัด</p>
                  )}
                </div>
                {/* Transportation Distribution */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-prompt font-semibold text-earth-800 mb-4">
                    การเข้าร่วมตามวิธีการเดินทาง
                  </h3>
                  {stats.transportationDistribution.length > 0 ? (
                    <div className="space-y-4">
                      {stats.transportationDistribution.map((transport) => {
                        const colors = getTransportColors(transport.type);
                        const displayName = getTransportDisplayName(transport.type);
                        return (
                          <div key={transport.type} className="flex justify-between items-center">
                            <p className="font-prompt">{displayName}</p>
                            <p className={`text-sm font-medium ${colors.bg} ${colors.text} px-2 py-1 rounded-full`}>
                              {formatNumber(transport.count)} คน
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">ไม่มีข้อมูลการเข้าร่วมตามวิธีการเดินทาง</p>
                  )}
                </div>
              </div>

              {/* Participants List with Export */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <h3 className="text-lg font-prompt font-semibold text-earth-800">รายชื่อผู้ลงทะเบียน</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const params = new URLSearchParams();
                        if (provinceFilter !== 'all') params.set('province', provinceFilter);
                        if (roomFilter !== 'all') params.set('room', roomFilter);
                        if (checkInFilter !== 'all') {
                          const status = checkInFilter === 'checked_in' ? '1' : checkInFilter === 'not_checked_in' ? '0' : checkInFilter === 'not_attending' ? '2' : 'all';
                          if (status !== 'all') params.set('status', status);
                        }
                        const url = `/api/admin/export-registrants?${params.toString()}`;
                        window.open(url, '_blank');
                      }}
                      className="bg-earth-600 hover:bg-earth-700 text-white font-prompt text-sm px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                      ส่งออกเป็น Excel
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">รหัส</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อ-นามสกุล</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">องค์กร</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ห้องสัมมนา</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะเช็คอิน</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่ลงทะเบียน</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {participantsLoading ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-6 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-earth-600"></div>
                          </td>
                        </tr>
                      ) : participants.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-6 text-center text-gray-500">ไม่พบข้อมูล</td>
                        </tr>
                      ) : (
                        participants.map((p) => (
                          <tr key={p.id}>
                            <td className="px-4 py-2 whitespace-nowrap font-mono text-sm">{p.uuid}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{p.first_name} {p.last_name}</td>
                            <td className="px-4 py-2">{p.organization_name || '-'}</td>
                            <td className="px-4 py-2">{p.room_name_th || '-'}</td>
                            <td className="px-4 py-2">
                            {p.check_in_status === 1 ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-600" title="เช็คอินแล้ว" />
                            ) : p.check_in_status === 2 ? (
                              <XCircleIcon className="h-5 w-5 text-red-500" title="ไม่เข้าร่วม" />
                            ) : (
                              <span className="text-gray-500 text-lg" title="ยังไม่ได้เช็คอิน">-</span>
                            )}
                          </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{p.registration_date ? new Date(p.registration_date).toLocaleString('th-TH') : '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-gray-600">หน้า {page} จาก {totalPages}</p>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                    >ก่อนหน้า</button>
                    <button
                      className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                    >ถัดไป</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : activeTab === 'schedule' ? (
        /* Schedule Management Tab */
        <ErrorBoundary>
          <ScheduleManagement />
        </ErrorBoundary>
      ) : activeTab === 'registrants' ? (
        /* Registrant Management Tab */
        <ErrorBoundary>
          <RegistrantManagement />
        </ErrorBoundary>
      ) : (
        /* Organization Type Management Tab */
        <ErrorBoundary>
          <OrganizationTypeManagement />
        </ErrorBoundary>
      )}
    </div>
  );
}