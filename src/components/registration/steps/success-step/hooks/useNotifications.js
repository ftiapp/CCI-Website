import { useState } from 'react';
import toast from 'react-hot-toast';

export function useNotifications(locale, registrationId, formData, seminarRooms) {
  const [emailSent, setEmailSent] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [sending, setSending] = useState(false);

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

  return {
    emailSent,
    smsSent,
    sending,
    sendEmail,
    sendSMS
  };
}
