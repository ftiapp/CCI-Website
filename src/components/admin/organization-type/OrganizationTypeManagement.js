'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/24/outline';
import OrganizationTypeList from './OrganizationTypeList';
import OrganizationTypeForm from './OrganizationTypeForm';

export default function OrganizationTypeManagement() {
  const [organizationTypes, setOrganizationTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Fetch organization types data
  const fetchOrganizationTypes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/organization-types');
      const data = await response.json();
      
      if (data.success) {
        setOrganizationTypes(data.organizationTypes);
      } else {
        throw new Error(data.error || 'Failed to fetch organization types data');
      }
    } catch (error) {
      console.error('Error fetching organization types data:', error);
      toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูลประเภทธุรกิจ', {
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
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchOrganizationTypes();
  }, []);
  
  // Handle adding new item
  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };
  
  // Handle editing item
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };
  
  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };
  
  // Handle form submit (create/update)
  const handleFormSubmit = async (formData) => {
    try {
      let response;
      
      if (editingItem) {
        // Update existing item
        response = await fetch(`/api/admin/organization-types/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new item
        response = await fetch('/api/admin/organization-types', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(editingItem ? 'อัปเดตประเภทธุรกิจสำเร็จ' : 'เพิ่มประเภทธุรกิจสำเร็จ', {
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
        
        // Refresh data
        fetchOrganizationTypes();
        handleFormClose();
      } else {
        throw new Error(data.error || 'Failed to save organization type');
      }
    } catch (error) {
      console.error('Error saving organization type:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล', {
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
    }
  };
  
  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm('คุณต้องการลบประเภทธุรกิจนี้ใช่หรือไม่?')) return;
    
    try {
      const response = await fetch(`/api/admin/organization-types/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('ลบประเภทธุรกิจสำเร็จ', {
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
        
        // Update local state
        setOrganizationTypes(organizationTypes.filter(item => item.id !== id));
      } else {
        throw new Error(data.error || 'Failed to delete organization type');
      }
    } catch (error) {
      console.error('Error deleting organization type:', error);
      toast.error('เกิดข้อผิดพลาดในการลบข้อมูล', {
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
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-prompt font-bold text-earth-800">จัดการประเภทธุรกิจ</h2>
        
        <button
          onClick={handleAddNew}
          className="bg-earth-600 hover:bg-earth-700 text-white font-prompt px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          เพิ่มประเภทธุรกิจใหม่
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-700"></div>
        </div>
      ) : (
        <OrganizationTypeList 
          organizationTypes={organizationTypes} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
      
      {showForm && (
        <OrganizationTypeForm
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </div>
  );
}
