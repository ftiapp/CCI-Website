'use client';

import { useState, useEffect, useRef } from 'react';
import { getTranslations } from '@/i18n';
import { CheckCircleIcon, EnvelopeIcon, DevicePhoneMobileIcon, ArrowDownTrayIcon, ShareIcon, ClipboardDocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import EventTicket from '@/components/ui/EventTicket';
import toast from 'react-hot-toast';

export default function SuccessStep({ 
  locale, 
  registrationId,
  formData,
  organizationTypes,
  transportationTypes,
  seminarRooms
}) {
  // Make sure locale is properly awaited before using it with getTranslations
  const t = getTranslations(locale || 'th');
  
  // State for notification status
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  // Ref for share dropdown
  const shareDropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Function to download QR code
  const downloadQRCode = () => {
    const svg = document.querySelector('.qr-code-container svg');
    if (!svg) {
      toast.error(
        locale === 'th' 
          ? 'ไม่พบ QR Code สำหรับดาวน์โหลด' 
          : 'QR Code not found for download',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
      return;
    }
    
    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `CCI_QRCode_${registrationId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success(
        locale === 'th' 
          ? 'ดาวน์โหลด QR Code สำเร็จ' 
          : 'QR Code downloaded successfully',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };
  
  // Function to send SMS notification
  const sendSMS = async () => {
    if (!formData?.phone || !registrationId) {
      toast.error(
        locale === 'th' 
          ? 'ไม่พบข้อมูลเบอร์โทรศัพท์' 
          : 'Phone number not found',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
      return;
    }
    
    try {
      setSending(true);
      
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          registrationId,
          locale
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSmsSent(true);
        toast.success(
          locale === 'th' 
            ? 'ส่ง SMS สำเร็จ' 
            : 'SMS sent successfully',
          {
            duration: 3000,
            position: 'top-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              padding: '16px',
              fontFamily: 'prompt, sans-serif',
              fontWeight: '500',
            },
          }
        );
      } else {
        throw new Error(data.error || 'Failed to send SMS');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      toast.error(
        locale === 'th' 
          ? 'ไม่สามารถส่ง SMS ได้ กรุณาลองใหม่อีกครั้ง' 
          : 'Failed to send SMS. Please try again.',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
    } finally {
      setSending(false);
    }
  };
  
  // Function to send email notification
  const sendEmail = async () => {
    if (!formData?.email || !registrationId) {
      toast.error(
        locale === 'th' 
          ? 'ไม่พบข้อมูลอีเมล' 
          : 'Email address not found',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
      return;
    }
    
    try {
      setSending(true);
      
      // Find selected seminar room (if applicable)
      const selectedRoom = formData.selectedRoomId ? 
        seminarRooms.find(room => room.id.toString() === formData.selectedRoomId) : 
        null;
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          registrationId,
          attendanceType: formData.attendanceType,
          selectedRoom,
          locale
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setEmailSent(true);
        toast.success(
          locale === 'th' 
            ? 'ส่งอีเมลสำเร็จ' 
            : 'Email sent successfully',
          {
            duration: 3000,
            position: 'top-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
              padding: '16px',
              fontFamily: 'prompt, sans-serif',
              fontWeight: '500',
            },
          }
        );
      } else {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(
        locale === 'th' 
          ? 'ไม่สามารถส่งอีเมลได้ กรุณาลองใหม่อีกครั้ง' 
          : 'Failed to send email. Please try again.',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
    } finally {
      setSending(false);
    }
  };
  
  // Get share URL and message
  const getShareData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cci.fti.or.th';
    const ticketUrl = `${baseUrl}/${locale}/ticket/${registrationId}`;
    
    const title = locale === 'th'
      ? `บัตรเข้างาน CCI Climate Change Forum 2025`
      : `CCI Climate Change Forum 2025 Ticket`;
    
    const text = locale === 'th'
      ? `บัตรเข้างาน CCI Climate Change Forum 2025 สำหรับ ${formData?.firstName} ${formData?.lastName} วันที่ 15 กันยายน 2568`
      : `CCI Climate Change Forum 2025 ticket for ${formData?.firstName} ${formData?.lastName} on September 15, 2025`;
    
    return { url: ticketUrl, title, text };
  };
  
  // Native Web Share API
  const shareNative = async () => {
    if (!navigator.share) {
      toast.error(
        locale === 'th' 
          ? 'เบราว์เซอร์ไม่รองรับการแชร์' 
          : 'Browser does not support sharing',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
      return;
    }
    
    try {
      const shareData = getShareData();
      await navigator.share(shareData);
      
      toast.success(
        locale === 'th' 
          ? 'แชร์สำเร็จ' 
          : 'Shared successfully',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };
  
  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      const shareData = getShareData();
      await navigator.clipboard.writeText(shareData.url);
      
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
      
      toast.success(
        locale === 'th' 
          ? 'คัดลอกลิงก์แล้ว' 
          : 'Link copied to clipboard',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error(
        locale === 'th' 
          ? 'ไม่สามารถคัดลอกลิงก์ได้' 
          : 'Unable to copy link',
        {
          duration: 4000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
          icon: '⚠️',
        }
      );
    }
  };
  
  // Share to Facebook
  const shareToFacebook = () => {
    try {
      const shareData = getShareData();
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.text)}`;
      
      window.open(facebookUrl, '_blank', 'width=600,height=400');
      
      toast.success(
        locale === 'th' 
          ? 'เปิด Facebook เพื่อแชร์บัตรเข้างาน' 
          : 'Opening Facebook to share your ticket',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      console.error('Error sharing to Facebook:', error);
    }
  };
  
  // Share to Twitter/X
  const shareToTwitter = () => {
    try {
      const shareData = getShareData();
      const twitterText = `${shareData.text} ${shareData.url}`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
      
      window.open(twitterUrl, '_blank', 'width=600,height=400');
      
      toast.success(
        locale === 'th' 
          ? 'เปิด X (Twitter) เพื่อแชร์บัตรเข้างาน' 
          : 'Opening X (Twitter) to share your ticket',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      console.error('Error sharing to Twitter:', error);
    }
  };
  
  // Share to WhatsApp
  const shareToWhatsApp = () => {
    try {
      const shareData = getShareData();
      const whatsappText = `${shareData.text}\n${shareData.url}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;
      
      window.open(whatsappUrl, '_blank');
      
      toast.success(
        locale === 'th' 
          ? 'เปิด WhatsApp เพื่อแชร์บัตรเข้างาน' 
          : 'Opening WhatsApp to share your ticket',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
    }
  };
  
  // Share to Telegram
  const shareToTelegram = () => {
    try {
      const shareData = getShareData();
      const telegramText = `${shareData.text}\n${shareData.url}`;
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
      
      window.open(telegramUrl, '_blank');
      
      toast.success(
        locale === 'th' 
          ? 'เปิด Telegram เพื่อแชร์บัตรเข้างาน' 
          : 'Opening Telegram to share your ticket',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      console.error('Error sharing to Telegram:', error);
    }
  };
  
  // Share to Line
  const shareToLine = () => {
    try {
      const shareData = getShareData();
      const lineText = `${shareData.text}\n${shareData.url}`;
      const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`;
      
      window.open(lineUrl, '_blank');
      
      toast.success(
        locale === 'th' 
          ? 'เปิด LINE เพื่อแชร์บัตรเข้างาน' 
          : 'Opening LINE to share your ticket',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      console.error('Error sharing to LINE:', error);
    }
  };
  
  // Share via Email
  const shareViaEmail = () => {
    try {
      const shareData = getShareData();
      
      const subject = locale === 'th'
        ? `บัตรเข้างาน CCI Climate Change Forum 2025 สำหรับ ${formData?.firstName} ${formData?.lastName}`
        : `CCI Climate Change Forum 2025 Ticket for ${formData?.firstName} ${formData?.lastName}`;
      
      const body = locale === 'th'
        ? `เรียน ผู้รับ,\n\nนี่คือบัตรเข้างาน CCI Climate Change Forum 2025\n\nรายละเอียด:\nชื่อผู้เข้าร่วม: ${formData?.firstName} ${formData?.lastName}\nวันที่: 15 กันยายน 2568\n\nคุณสามารถดูบัตรเข้างานและ QR Code ได้ที่ลิงก์นี้:\n${shareData.url}\n\nขอบคุณ`
        : `Dear Recipient,\n\nHere is the ticket for CCI Climate Change Forum 2025\n\nDetails:\nAttendee: ${formData?.firstName} ${formData?.lastName}\nDate: September 15, 2025\n\nYou can view the ticket and QR Code at this link:\n${shareData.url}\n\nThank you`;
      
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(body);
      const mailtoUrl = `mailto:?subject=${encodedSubject}&body=${encodedBody}`;
      
      window.location.href = mailtoUrl;
      
      toast.success(
        locale === 'th' 
          ? 'เปิดโปรแกรมอีเมลเพื่อแชร์บัตรเข้างาน' 
          : 'Opening email client to share your ticket',
        {
          duration: 3000,
          position: 'top-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontFamily: 'prompt, sans-serif',
            fontWeight: '500',
          },
        }
      );
      setShowShareOptions(false);
    } catch (error) {
      console.error('Error sharing via email:', error);
    }
  };
  
  // Toggle share options dropdown
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  // Find selected organization type
  const selectedOrgType = organizationTypes.find(
    type => type.id.toString() === formData.organizationTypeId
  );
  
  // Get transportation category label
  const getTransportationCategoryLabel = () => {
    if (formData.transportation_category === 'public') {
      return locale === 'th' ? 'ขนส่งมวลชน' : 'Public Transportation';
    } else if (formData.transportation_category === 'private') {
      return locale === 'th' ? 'รถยนต์ส่วนตัว' : 'Private Car';
    }
    return '';
  };
  
  // Get public transport type label
  const getPublicTransportTypeLabel = () => {
    if (!formData.public_transport_type) return '';
    
    const transportTypes = {
      'bts_mrt': locale === 'th' ? 'รถไฟฟ้า' : 'BTS/MRT',
      'car': locale === 'th' ? 'รถยนต์' : 'Car',
      'van': locale === 'th' ? 'รถตู้' : 'Van',
      'bus': locale === 'th' ? 'รถเมล์' : 'Bus',
      'motorcycle': locale === 'th' ? 'รถจักรยานยนต์' : 'Motorcycle',
      'other': formData.public_transport_other || (locale === 'th' ? 'อื่นๆ' : 'Other')
    };
    
    return transportTypes[formData.public_transport_type] || '';
  };
  
  // Get car type label
  const getCarTypeLabel = () => {
    if (!formData.car_type) return '';
    
    const carTypes = {
      'gasoline': locale === 'th' ? 'เบนซิน' : 'Gasoline',
      'diesel': locale === 'th' ? 'ดีเซล' : 'Diesel',
      'electric': locale === 'th' ? 'ไฟฟ้า' : 'Electric',
      'hybrid': locale === 'th' ? 'ไฮบริด' : 'Hybrid',
      'other': formData.car_type_other || (locale === 'th' ? 'อื่นๆ' : 'Other')
    };
    
    return carTypes[formData.car_type] || '';
  };
  
  // Get passenger type label
  const getPassengerTypeLabel = () => {
    if (!formData.car_passenger_type) return '';
    
    const passengerTypes = {
      'driver': locale === 'th' ? 'ผู้ขับ' : 'Driver',
      'passenger': locale === 'th' ? 'ผู้โดยสาร' : 'Passenger'
    };
    
    return passengerTypes[formData.car_passenger_type] || '';
  };
  
  // Find selected seminar room (if applicable)
  const selectedRoom = formData.selectedRoomId ? 
    seminarRooms.find(room => room.id.toString() === formData.selectedRoomId) : 
    null;
  
  // Get attendance type label
  const getAttendanceTypeLabel = () => {
    switch (formData.attendanceType) {
      case 'morning':
        return t.registration.attendanceMorning;
      case 'afternoon':
        return t.registration.attendanceAfternoon;
      case 'full_day':
        return t.registration.attendanceFullDay;
      default:
        return '';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircleIcon className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-prompt font-bold text-earth-900 mb-2">
          {t.registration.registrationSuccess}
        </h2>
        <p className="text-earth-600 max-w-md mx-auto">
          {t.registration.successMessage}
        </p>
        
      
          
        
      </div>
      
      {/* Event Ticket (Movie Ticket Style) */}
      <div className="mb-10">
        <EventTicket 
          registrationId={registrationId}
          firstName={formData?.firstName}
          lastName={formData?.lastName}
          phone={formData?.phone}
          attendanceType={formData?.attendanceType}
          selectedRoom={selectedRoom}
          locale={locale}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-prompt font-semibold text-earth-900 mb-4 text-center">
          {locale === 'th' ? 'จัดการบัตรเข้างาน' : 'Manage Your Ticket'}
        </h3>
        
        {/* Primary Actions Row */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
          <Button 
            onClick={downloadQRCode} 
            variant="outline" 
            className="flex items-center w-full sm:w-auto min-w-[160px] border-green-200 hover:border-green-300 hover:bg-green-50"
            disabled={sending}
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2 text-green-600" />
            {locale === 'th' ? 'ดาวน์โหลด QR' : 'Download QR'}
          </Button>
          
          <Button 
            onClick={sendEmail} 
            variant="outline" 
            className="flex items-center w-full sm:w-auto min-w-[160px] border-blue-200 hover:border-blue-300 hover:bg-blue-50"
            disabled={sending || emailSent}
          >
            <EnvelopeIcon className="w-5 h-5 mr-2 text-blue-600" />
            {emailSent 
              ? (locale === 'th' ? 'ส่งอีเมลแล้ว' : 'Email Sent') 
              : (locale === 'th' ? 'ส่งอีเมล' : 'Send Email')}
          </Button>
          
          <Button 
            onClick={sendSMS} 
            variant="outline" 
            className="flex items-center w-full sm:w-auto min-w-[160px] border-purple-200 hover:border-purple-300 hover:bg-purple-50"
            disabled={sending || smsSent}
          >
            <DevicePhoneMobileIcon className="w-5 h-5 mr-2 text-purple-600" />
            {smsSent 
              ? (locale === 'th' ? 'ส่ง SMS แล้ว' : 'SMS Sent') 
              : (locale === 'th' ? 'ส่ง SMS' : 'Send SMS')}
          </Button>
        </div>
        
        {/* Share Section */}
        <div className="border-t border-gray-100 pt-4">
          <div className="text-center mb-3">
            <p className="text-sm text-gray-600 font-medium">
              {locale === 'th' ? 'แชร์บัตรเข้างาน' : 'Share Your Ticket'}
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="relative" ref={shareDropdownRef}>
              {/* Native Share Button (Mobile) */}
              {typeof navigator !== 'undefined' && navigator.share && (
                <Button 
                  onClick={shareNative} 
                  variant="primary" 
                  className="flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg mr-2"
                  disabled={sending}
                >
                  <ShareIcon className="w-5 h-5 mr-2" />
                  {locale === 'th' ? 'แชร์' : 'Share'}
                </Button>
              )}
              
              {/* Advanced Share Button */}
              <Button 
                onClick={toggleShareOptions} 
                variant="outline" 
                className="flex items-center border-green-200 hover:border-green-300 hover:bg-green-50 relative"
                disabled={sending}
              >
                <ShareIcon className="w-5 h-5 mr-2 text-green-600" />
                {locale === 'th' ? 'ตัวเลือกเพิ่มเติม' : 'More Options'}
                <svg className={`w-4 h-4 ml-2 text-green-600 transition-transform ${showShareOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              
              {/* Enhanced Share Dropdown */}
              {showShareOptions && (
                <div className="absolute z-20 mt-2 w-72 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden left-1/2 transform -translate-x-1/2">
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {locale === 'th' ? 'เลือกช่องทางการแชร์' : 'Choose sharing method'}
                      </h4>
                      <button
                        onClick={() => setShowShareOptions(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Share Options */}
                  <div className="p-2 max-h-80 overflow-y-auto">
                    {/* Quick Actions */}
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {locale === 'th' ? 'การดำเนินการด่วน' : 'Quick Actions'}
                      </p>
                      
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 mr-3 group-hover:bg-blue-200 transition-colors">
                          <ClipboardDocumentIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">
                            {copiedToClipboard 
                              ? (locale === 'th' ? 'คัดลอกแล้ว!' : 'Copied!') 
                              : (locale === 'th' ? 'คัดลอกลิงก์' : 'Copy Link')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {locale === 'th' ? 'คัดลอกลิงก์บัตรเข้างาน' : 'Copy ticket link to clipboard'}
                          </div>
                        </div>
                        {copiedToClipboard && (
                          <div className="text-green-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                    
                    {/* Social Media */}
                    <div className="mb-3">
                      <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {locale === 'th' ? 'โซเชียลมีเดีย' : 'Social Media'}
                      </p>
                      
                      {/* Facebook */}
                      <button
                        onClick={shareToFacebook}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">Facebook</div>
                          <div className="text-xs text-gray-500">
                            {locale === 'th' ? 'แชร์ไปยัง Facebook' : 'Share to Facebook'}
                          </div>
                        </div>
                      </button>
                      
                      {/* Twitter/X */}
                      <button
                        onClick={shareToTwitter}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">X (Twitter)</div>
                          <div className="text-xs text-gray-500">
                            {locale === 'th' ? 'แชร์ไปยัง X' : 'Share to X'}
                          </div>
                        </div>
                      </button>
                    </div>
                    
                    {/* Messaging Apps */}
                    <div>
                      <p className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {locale === 'th' ? 'แอปแชท' : 'Messaging Apps'}
                      </p>
                      
                      {/* LINE */}
                      <button
                        onClick={shareToLine}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500 mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.630.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.630-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.630 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">LINE</div>
                          <div className="text-xs text-gray-500">
                            {locale === 'th' ? 'แชร์ไปยัง LINE' : 'Share to LINE'}
                          </div>
                        </div>
                      </button>
                      
                      {/* WhatsApp */}
                      <button
                        onClick={shareToWhatsApp}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-600 mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.485"/>
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">WhatsApp</div>
                          <div className="text-xs text-gray-500">
                            {locale === 'th' ? 'แชร์ไปยัง WhatsApp' : 'Share to WhatsApp'}
                          </div>
                        </div>
                      </button>
                      
                      {/* Telegram */}
                      <button
                        onClick={shareToTelegram}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500 mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">Telegram</div>
                          <div className="text-xs text-gray-500">
                            {locale === 'th' ? 'แชร์ไปยัง Telegram' : 'Share to Telegram'}
                          </div>
                        </div>
                      </button>
                      
                      {/* Email */}
                      <button
                        onClick={shareViaEmail}
                        className="flex items-center w-full px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 mr-3">
                          <EnvelopeIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">
                            {locale === 'th' ? 'อีเมล' : 'Email'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {locale === 'th' ? 'แชร์ผ่านอีเมล' : 'Share via email'}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8">
        <a 
          href={`/${locale}/schedule`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="mr-4">
            {t.schedule.title}
          </Button>
        </a>
        
        <Link href={`/${locale}`}>
          <Button>
            {t.nav.home}
          </Button>
        </Link>
      </div>
    </div>
  );
}