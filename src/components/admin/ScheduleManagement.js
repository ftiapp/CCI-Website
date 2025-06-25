'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/24/outline';
import ScheduleList from './schedule/ScheduleList';
import ScheduleForm from './schedule/ScheduleForm';
import ConsistentHeader from '../layout/ConsistentHeader';

export default function ScheduleManagement() {
  const [scheduleItems, setScheduleItems] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Fetch schedule data
  const fetchScheduleData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/schedule');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // เพิ่มการตรวจสอบข้อมูลที่ได้รับจาก API
      console.log('Schedule API response:', data);
      console.log('Schedule items received:', data.scheduleItems);
      console.log('Rooms received:', data.rooms);
      
      if (data.success) {
        // Ensure scheduleItems is an array
        const safeScheduleItems = Array.isArray(data.scheduleItems) ? data.scheduleItems : [];
        console.log('Safe schedule items:', safeScheduleItems);
        setScheduleItems(safeScheduleItems);
        
        // Ensure rooms is an array
        const safeRooms = Array.isArray(data.rooms) ? data.rooms : [];
        console.log('Safe rooms:', safeRooms);
        setRooms(safeRooms);
      } else {
        throw new Error(data.error || 'Failed to fetch schedule data');
      }
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      toast.error('เกิดข้อผิดพลาดในการโหลดข้อมูลตารางกิจกรรม', {
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
      
      // Set empty arrays as fallback
      setScheduleItems([]);
      setRooms([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load data on component mount
  useEffect(() => {
    fetchScheduleData();
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
        response = await fetch(`/api/admin/schedule/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new item
        response = await fetch('/api/admin/schedule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(editingItem ? 'อัปเดตกิจกรรมสำเร็จ' : 'เพิ่มกิจกรรมสำเร็จ', {
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
        fetchScheduleData();
        handleFormClose();
      } else {
        throw new Error(data.error || 'Failed to save schedule item');
      }
    } catch (error) {
      console.error('Error saving schedule item:', error);
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
    if (!confirm('คุณต้องการลบกิจกรรมนี้ใช่หรือไม่?')) return;
    
    try {
      const response = await fetch(`/api/admin/schedule/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('ลบกิจกรรมสำเร็จ', {
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
        setScheduleItems(scheduleItems.filter(item => item.id !== id));
      } else {
        throw new Error(data.error || 'Failed to delete schedule item');
      }
    } catch (error) {
      console.error('Error deleting schedule item:', error);
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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <ConsistentHeader 
          title="จัดการกำหนดการ" 
          subtitle="รายการกิจกรรมและกำหนดการทั้งหมดในงาน" 
          icon="calendar" 
          colorScheme="mocha-beige"
        />
        <button
          onClick={handleAddNew}
          className="bg-[#8B7D6B] hover:bg-[#7A6C5A] text-white px-4 py-2 rounded-md flex items-center space-x-2 font-prompt transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>เพิ่มกิจกรรม</span>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earth-700"></div>
        </div>
      ) : (
        <ScheduleList 
          scheduleItems={scheduleItems} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      )}
      
      {showForm && (
        <ScheduleForm
          rooms={rooms}
          initialData={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={handleFormClose}
        />
      )}
    </div>
  );
}
