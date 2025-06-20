'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import ParticipantListModal from './ParticipantListModal';
import SearchForm from './check-in/SearchForm';
import ParticipantInfo from './check-in/ParticipantInfo';
import EmptyState from './check-in/EmptyState';
import { checkEligibilityForGift, toastStyle } from './check-in/utils';

export default function CheckInSystem() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isEligibleForGift, setIsEligibleForGift] = useState(false);
  const [multipleParticipants, setMultipleParticipants] = useState(null);
  const searchInputRef = useRef(null);
  
  // Focus on search input when component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  
  // Reset form and focus on search input
  const resetForm = () => {
    setSearchQuery('');
    setParticipant(null);
    setIsCheckedIn(false);
    setIsEligibleForGift(false);
    setMultipleParticipants(null);
    
    // Focus back on search input
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('กรุณาระบุรหัสลงทะเบียนหรือชื่อ-นามสกุลผู้เข้าร่วม', toastStyle);
      return;
    }
    
    setIsSearching(true);
    setParticipant(null);
    setMultipleParticipants(null);
    
    try {
      // Determine if search query is a UUID or name
      const isUuid = searchQuery.toUpperCase().startsWith('CCI-');
      
      // API endpoint based on search type
      const endpoint = isUuid 
        ? `/api/admin/participant-by-uuid?uuid=${encodeURIComponent(searchQuery)}`
        : `/api/admin/participant-by-name?name=${encodeURIComponent(searchQuery)}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.success) {
        if (data.participant) {
          // Single participant found
          setParticipant(data.participant);
          setIsCheckedIn(data.participant.check_in_status === 1);
          
          // Check if eligible for gift (public transport or walking)
          const isEligible = checkEligibilityForGift(data.participant.transport_type);
          console.log('Transport type from search:', data.participant.transport_type);
          console.log('Is eligible for souvenir:', isEligible);
          setIsEligibleForGift(isEligible);
        } else if (data.participants && data.participants.length > 0) {
          // Multiple participants found
          setMultipleParticipants(data.participants);
        }
      } else {
        toast.error('ไม่พบข้อมูลผู้เข้าร่วม', toastStyle);
      }
    } catch (error) {
      console.error('Error searching for participant:', error);
      toast.error('เกิดข้อผิดพลาดในการค้นหาข้อมูล', toastStyle);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Handle participant selection from modal
  const handleParticipantSelect = (selectedParticipant) => {
    setParticipant(selectedParticipant);
    setIsCheckedIn(selectedParticipant.check_in_status === 1);
    
    // Check if eligible for gift (public transport or walking)
    const isEligible = checkEligibilityForGift(selectedParticipant.transport_type);
    setIsEligibleForGift(isEligible);
    
    // Close modal
    setMultipleParticipants(null);
  };
  
  // Handle check-in/out
  const handleCheckInToggle = async () => {
    if (!participant) return;
    
    try {
      // Toggle check-in status
      const newStatus = isCheckedIn ? 0 : 1;
      
      // API call to update check-in status
      const response = await fetch('/api/admin/update-check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: participant.id,
          checkInStatus: newStatus,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        const message = !isCheckedIn 
          ? 'เช็คอินสำเร็จ' 
          : 'ยกเลิกการเช็คอินสำเร็จ';
        
        toast.success(message, toastStyle);
        
        // Reset form for next check-in
        resetForm();
      } else {
        throw new Error(data.error || 'Failed to update check-in status');
      }
    } catch (error) {
      console.error('Error toggling check-in status:', error);
      toast.error('เกิดข้อผิดพลาดในการอัพเดทสถานะเช็คอิน', toastStyle);
    }
  };

  // Handle marking as not attending
  const handleMarkNotAttending = async () => {
    if (!participant) return;
    
    try {
      // API call to mark as not attending
      const response = await fetch('/api/admin/update-check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationId: participant.id,
          checkInStatus: 2, // 2 = not attending
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('บันทึกสถานะไม่เข้าร่วมสำเร็จ', toastStyle);
        
        // Reset form for next check-in
        resetForm();
      } else {
        throw new Error(data.error || 'Failed to update attendance status');
      }
    } catch (error) {
      console.error('Error marking as not attending:', error);
      toast.error('เกิดข้อผิดพลาดในการบันทึกสถานะไม่เข้าร่วม', toastStyle);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-prompt font-bold text-earth-800 mb-6">ระบบเช็คอิน</h2>
      
      {/* Search Form */}
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearching={isSearching}
        onSearch={handleSearch}
        searchInputRef={searchInputRef}
      />
      
      {/* Multiple Participants Modal */}
      {multipleParticipants && (
        <ParticipantListModal
          participants={multipleParticipants}
          onSelect={handleParticipantSelect}
          onClose={() => setMultipleParticipants(null)}
        />
      )}
      
      {/* Participant Information */}
      <ParticipantInfo
        participant={participant}
        isCheckedIn={isCheckedIn}
        isEligibleForGift={isEligibleForGift}
        onCheckInToggle={handleCheckInToggle}
        onMarkNotAttending={handleMarkNotAttending}
      />
      
      {/* Empty State */}
      {!participant && !isSearching && <EmptyState />}
    </div>
  );
}