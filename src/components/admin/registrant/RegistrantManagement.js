import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import RegistrantList from './RegistrantList';
import RegistrantForm from './RegistrantForm';
import NotificationModal from './NotificationModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function RegistrantManagement() {
  const [registrants, setRegistrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [organizationTypeFilter, setOrganizationTypeFilter] = useState('all');
  const [industryTypeFilter, setIndustryTypeFilter] = useState('all');
  const [provinces, setProvinces] = useState([]);
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const [industryTypes, setIndustryTypes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRegistrant, setEditingRegistrant] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationData, setNotificationData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registrantToDelete, setRegistrantToDelete] = useState(null);
  const [exporting, setExporting] = useState(false);

  // Fetch registrants data with pagination and filters
  const fetchRegistrants = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage,
        search: search,
        province: provinceFilter,
        status: statusFilter,
        organization_type: organizationTypeFilter,
        industry_type: industryTypeFilter
      });

      const response = await fetch(`/api/admin/participants?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.success) {
        console.log('Received data:', data);
        // Ensure participants is an array
        const safeParticipants = Array.isArray(data.participants) ? data.participants : [];
        setRegistrants(safeParticipants);
        
        // Ensure pagination data is valid
        setTotalPages(data.pagination && typeof data.pagination.totalPages === 'number' ? data.pagination.totalPages : 1);
        
        // Ensure provinces is an array
        const safeProvinces = Array.isArray(data.provinces) ? data.provinces : [];
        setProvinces(safeProvinces);
        
        // Ensure organization types is an array
        const safeOrgTypes = Array.isArray(data.organization_types) ? data.organization_types : [];
        setOrganizationTypes(safeOrgTypes);
        
        // Ensure industry types is an array
        const safeIndustryTypes = Array.isArray(data.industry_types) ? data.industry_types : [];
        setIndustryTypes(safeIndustryTypes);
      } else {
        toast.error('ไม่สามารถดึงข้อมูลผู้ลงทะเบียนได้', {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
            borderLeft: '4px solid #174344', // lake-800 color
          },
        });
        
        // Set empty arrays as fallback
        setRegistrants([]);
        setProvinces([]);
      }
    } catch (error) {
      console.error('Error fetching registrants:', error);
      toast.error('เกิดข้อผิดพลาดในการดึงข้อมูล', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          borderLeft: '4px solid #174344', // lake-800 color
        },
      });
      
      // Set empty arrays as fallback
      setRegistrants([]);
      setProvinces([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, provinceFilter, statusFilter, organizationTypeFilter, industryTypeFilter]);

  useEffect(() => {
    fetchRegistrants();
    console.log('Fetching registrants with filters:', {
      page: currentPage,
      search,
      provinceFilter,
      statusFilter,
      organizationTypeFilter,
      industryTypeFilter
    });
  }, [fetchRegistrants]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleProvinceFilterChange = (e) => {
    setProvinceFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleOrganizationTypeFilterChange = (e) => {
    setOrganizationTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleIndustryTypeFilterChange = (e) => {
    setIndustryTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditRegistrant = async (registrantId) => {
    try {
      setLoading(true);
      // ดึงข้อมูลผู้ลงทะเบียน
      const response = await fetch(`/api/admin/registrant/${registrantId}`);
      const data = await response.json();
      
      if (data.success) {
        // ดึงข้อมูลหมายเหตุ
        const notesResponse = await fetch(`/api/admin/notes?uuid=${data.registrant.uuid}`);
        const notesData = await notesResponse.json();
        
        // รวมข้อมูลผู้ลงทะเบียนและหมายเหตุ
        const registrantWithNotes = {
          ...data.registrant,
          admin_notes: notesData.success && notesData.data ? notesData.data.admin_notes || '' : ''
        };
        
        setEditingRegistrant(registrantWithNotes);
        setShowForm(true);
      } else {
        toast.error(data.error || 'ไม่สามารถดึงข้อมูลผู้ลงทะเบียนได้');
      }
    } catch (error) {
      console.error('Error fetching registrant:', error);
      toast.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ลงทะเบียน');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRegistrant = (registrant) => {
    setRegistrantToDelete(registrant);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!registrantToDelete) return;
    
    try {
      const response = await fetch(`/api/admin/registrant/${registrantToDelete.id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('ลบข้อมูลผู้ลงทะเบียนสำเร็จ');
        
        // Show notification modal after successful deletion
        setNotificationData({
          registrantId: registrantToDelete.id,
          firstName: registrantToDelete.first_name,
          lastName: registrantToDelete.last_name,
          email: registrantToDelete.email,
          phone: registrantToDelete.phone,
          notificationType: 'delete'
        });
        setShowDeleteModal(false);
        setShowNotificationModal(true);
        
        // Refresh registrant list
        fetchRegistrants();
      } else {
        toast.error(data.error || 'ไม่สามารถลบข้อมูลได้');
      }
    } catch (error) {
      console.error('Error deleting registrant:', error);
      toast.error('เกิดข้อผิดพลาดในการลบข้อมูล');
    }
  };

  const handleFormSubmit = async (formData, sendNotification) => {
    try {
      // บันทึกข้อมูลผู้ลงทะเบียน
      const response = await fetch(`/api/admin/registrant/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sendNotification
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // บันทึกข้อมูลหมายเหตุ
        if (formData.admin_notes !== undefined) {
          const notesResponse = await fetch('/api/admin/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uuid: formData.uuid,
              admin_notes: formData.admin_notes
            }),
          });
          
          const notesData = await notesResponse.json();
          if (!notesData.success) {
            console.error('Error saving admin notes:', notesData.error);
          }
        }
        
        toast.success('อัปเดตข้อมูลผู้ลงทะเบียนสำเร็จ', {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
            borderLeft: '4px solid #2a8f92', // lake-500 color
          }
        });
        setShowForm(false);
        
        // Show notification modal if user wants to send notification
        if (sendNotification) {
          setNotificationData({
            registrantId: formData.id,
            firstName: formData.first_name,
            lastName: formData.last_name,
            email: formData.email,
            phone: formData.phone,
            notificationType: 'update'
          });
          setShowNotificationModal(true);
        }
        
        // Refresh registrant list
        fetchRegistrants();
      } else {
        toast.error(data.error || 'ไม่สามารถอัปเดตข้อมูลได้', {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
            borderLeft: '4px solid #174344', // lake-800 color
          }
        });
      }
    } catch (error) {
      console.error('Error updating registrant:', error);
      toast.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          borderLeft: '4px solid #174344', // lake-800 color
        }
      });
    }
  };

  const handleSendNotification = async (channels) => {
    if (!notificationData || channels.length === 0) {
      setShowNotificationModal(false);
      return;
    }
    
    try {
      const response = await fetch('/api/admin/send-update-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrantId: notificationData.registrantId,
          notificationType: notificationData.notificationType,
          channels
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('ส่งการแจ้งเตือนสำเร็จ', {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
            borderLeft: '4px solid #2a8f92', // lake-500 color
          }
        });
      } else {
        toast.error(data.error || 'ไม่สามารถส่งการแจ้งเตือนได้', {
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
            borderLeft: '4px solid #174344', // lake-800 color
          }
        });
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('เกิดข้อผิดพลาดในการส่งการแจ้งเตือน', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          borderLeft: '4px solid #174344', // lake-800 color
        }
      });
    } finally {
      setShowNotificationModal(false);
    }
  };

  const handleExportToExcel = async () => {
    setExporting(true);
    try {
      const queryParams = new URLSearchParams({
        search: search,
        province: provinceFilter,
        status: statusFilter
      });
      
      const response = await fetch(`/api/admin/export-registrants?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'registrants.xlsx';
      
      // Append the link to the body
      document.body.appendChild(link);
      
      // Click the link to trigger the download
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('ส่งออกข้อมูลสำเร็จ', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          borderLeft: '4px solid #2a8f92', // lake-500 color
        }
      });
    } catch (error) {
      console.error('Error exporting registrants:', error);
      toast.error('เกิดข้อผิดพลาดในการส่งออกข้อมูล', {
        position: 'top-right',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          padding: '16px',
          fontFamily: 'prompt, sans-serif',
          fontWeight: '500',
          borderLeft: '4px solid #174344', // lake-800 color
        }
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-prompt font-semibold">จัดการข้อมูลผู้ลงทะเบียน</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleExportToExcel}
            disabled={exporting}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-earth-600 to-lake-600 text-white rounded-md hover:from-earth-700 hover:to-lake-700 transition font-prompt"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            {exporting ? 'กำลังส่งออก...' : 'ส่งออก Excel'}
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div>
          <label htmlFor="search" className="block text-sm font-prompt mb-1">ค้นหา</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="ชื่อ, นามสกุล, อีเมล, เบอร์โทร"
            className="w-full p-2 border rounded-md font-prompt"
          />
        </div>
        
        <div>
          <label htmlFor="province" className="block text-sm font-prompt mb-1">จังหวัด</label>
          <select
            id="province"
            value={provinceFilter}
            onChange={handleProvinceFilterChange}
            className="w-full p-2 border rounded-md font-prompt"
          >
            <option value="all">ทั้งหมด</option>
            <option value="bangkok">กรุงเทพมหานคร</option>
            {provinces.map(province => (
              <option key={province.id} value={province.id}>
                {province.name_th}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-prompt mb-1">สถานะเช็คอิน</label>
          <select
            id="status"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="w-full p-2 border rounded-md font-prompt"
          >
            <option value="all">ทั้งหมด</option>
            <option value="0">ยังไม่ได้เช็คอิน</option>
            <option value="1">เช็คอินแล้ว</option>
            <option value="2">ไม่เข้าร่วม</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="organization_type" className="block text-sm font-prompt mb-1">ประเภทองค์กร</label>
          <select
            id="organization_type"
            value={organizationTypeFilter}
            onChange={handleOrganizationTypeFilterChange}
            className="w-full p-2 border rounded-md font-prompt"
          >
            <option value="all">ทั้งหมด</option>
            {Array.isArray(organizationTypes) && organizationTypes.length > 0 ? (
              organizationTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name_th}
                </option>
              ))
            ) : (
              <option value="" disabled>กำลังโหลดข้อมูล...</option>
            )}
            <option value="99">อื่นๆ</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="industry_type" className="block text-sm font-prompt mb-1">ประเภทอุตสาหกรรม</label>
          <select
            id="industry_type"
            value={industryTypeFilter}
            onChange={handleIndustryTypeFilterChange}
            className="w-full p-2 border rounded-md font-prompt"
          >
            <option value="all">ทั้งหมด</option>
            {Array.isArray(industryTypes) && industryTypes.length > 0 ? (
              industryTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name_th}
                </option>
              ))
            ) : (
              <option value="" disabled>กำลังโหลดข้อมูล...</option>
            )}
            <option value="99">อื่นๆ</option>
          </select>
        </div>
      </div>
      
      {/* Registrant List */}
      <RegistrantList
        registrants={registrants}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onEdit={handleEditRegistrant}
        onDelete={handleDeleteRegistrant}
      />
      
      {/* Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-prompt font-semibold mb-4">แก้ไขข้อมูลผู้ลงทะเบียน</h3>
            <RegistrantForm
              registrant={editingRegistrant}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      
      {/* Notification Modal */}
      {showNotificationModal && (
        <NotificationModal
          registrant={{
            firstName: notificationData.firstName,
            lastName: notificationData.lastName,
            email: notificationData.email,
            phone: notificationData.phone
          }}
          notificationType={notificationData.notificationType}
          onSend={handleSendNotification}
          onCancel={() => setShowNotificationModal(false)}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmModal
          registrant={registrantToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
