'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CheckInSystem from '@/components/admin/CheckInSystem';
import Dashboard from '@/components/admin/Dashboard';
// ParticipantManagement component removed temporarily
import { Toaster } from 'react-hot-toast';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('check-in');

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Admin Header */}
      <header className="bg-earth-800 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-prompt font-bold">CCI Admin Portal</h1>
            <div className="text-sm">
              <span className="opacity-75">Climate Change Forum 2025</span>
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
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="check-in" className="font-prompt">
              เช็คอิน / Check-in
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="font-prompt">
              แดชบอร์ด / Dashboard
            </TabsTrigger>
            {/* Participants tab removed temporarily */}
          </TabsList>
          
          <TabsContent value="check-in" className="mt-6">
            <CheckInSystem />
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-6">
            <Dashboard />
          </TabsContent>
          
          {/* ParticipantManagement component removed temporarily */}
        </Tabs>
      </main>
    </div>
  );
}
