'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CheckInSystem from '@/components/admin/CheckInSystem';
import Dashboard from '@/components/admin/Dashboard';
import ConsumableScan from '@/components/admin/ConsumableScan';
import ErrorBoundary from '@/components/common/ErrorBoundary';
// ParticipantManagement component removed temporarily
import toast, { Toaster } from 'react-hot-toast';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('check-in');

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Admin Header */}
      <header className="bg-earth-800 text-white py-4 px-4 sm:px-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-prompt font-bold">CCI Admin Portal</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="opacity-75 text-xs sm:text-sm hidden sm:block">Climate Change Forum 2025</span>
              <button 
                onClick={async () => {
                  try {
                    const response = await fetch('/api/admin/auth/logout', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                    
                    const data = await response.json();
                    
                    if (data.success) {
                      toast.success('ออกจากระบบสำเร็จ', {
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
                      
                      // Redirect after logout
                      setTimeout(() => {
                        window.location.href = '/cciAdmin/login';
                      }, 1000);
                    }
                  } catch (error) {
                    console.error('Logout error:', error);
                    toast.error('เกิดข้อผิดพลาดในการออกจากระบบ', {
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
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-prompt text-xs sm:text-sm px-2 sm:px-4 py-1.5 rounded transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">ออกจากระบบ</span>
                <span className="sm:hidden">ออก</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-6 px-4">
        <Tabs 
          defaultValue="check-in" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8">
            <TabsTrigger value="check-in" className="font-prompt text-xs sm:text-sm">
              <span className="hidden sm:inline">เช็คอิน / Check-in</span>
              <span className="sm:hidden">เช็คอิน</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="font-prompt text-xs sm:text-sm">
              <span className="hidden sm:inline">แดชบอร์ด / Dashboard</span>
              <span className="sm:hidden">แดชบอร์ด</span>
            </TabsTrigger>
            <TabsTrigger value="beverage" className="font-prompt text-xs sm:text-sm">
              <span className="hidden sm:inline">เครื่องดื่ม / Beverage</span>
              <span className="sm:hidden">เครื่องดื่ม</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="font-prompt text-xs sm:text-sm">
              <span className="hidden sm:inline">อาหาร / Food</span>
              <span className="sm:hidden">อาหาร</span>
            </TabsTrigger>
            {/* Participants tab removed temporarily */}
          </TabsList>
          
          <TabsContent value="check-in" className="mt-6">
            <ErrorBoundary>
              <CheckInSystem />
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-6">
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="beverage" className="mt-6">
            <ErrorBoundary>
              <ConsumableScan type="beverage" title="สแกนเครื่องดื่ม / Beverage Scan" />
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="food" className="mt-6">
            <ErrorBoundary>
              <ConsumableScan type="food" title="สแกนอาหาร / Food Scan" />
            </ErrorBoundary>
          </TabsContent>
          
          {/* ParticipantManagement component removed temporarily */}
        </Tabs>
      </main>
    </div>
  );
}
