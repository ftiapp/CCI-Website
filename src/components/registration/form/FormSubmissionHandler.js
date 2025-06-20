'use client';

import toast from 'react-hot-toast';
import ValidationHandler from './ValidationHandler';

const FormSubmissionHandler = {
  // Submit form data to the API
  submitForm: async ({ formData, locale, seminarRooms, setRegistrationId }) => {
    try {
      // Register the participant
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.error === 'duplicate_name') {
          ValidationHandler.showDuplicateNameError(formData.firstName, formData.lastName, locale);
        } else {
          ValidationHandler.showErrorToast(
            locale === 'th' 
              ? 'ขออภัย เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง' 
              : 'System Error: Please try again later.',
            locale
          );
        }
        return { success: false };
      }
      
      // Store registration ID
      const registrationId = data.uuid;
      setRegistrationId(registrationId);
      
      // Send notifications
      await FormSubmissionHandler.sendNotifications({
        formData,
        registrationId,
        locale,
        seminarRooms
      });
      
      return { success: true };
    } catch (error) {
      console.error('Form submission error:', error);
      return { success: false, error };
    }
  },
  
  // Send SMS and email notifications
  sendNotifications: async ({ formData, registrationId, locale, seminarRooms }) => {
    try {
      // Send SMS notification
      await FormSubmissionHandler.sendSMS({
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        registrationId,
        attendanceType: formData.attendanceType,
        selectedRoomId: formData.selectedRoomId,
        locale
      });
      
      // Send email notification
      await FormSubmissionHandler.sendEmail({
        formData,
        registrationId,
        locale,
        seminarRooms
      });
      
      return { success: true };
    } catch (error) {
      console.error('Notification error:', error);
      // We'll continue with the registration process even if notifications fail
      return { success: false, error };
    }
  },
  
  // Send SMS notification
  sendSMS: async ({ phone, firstName, lastName, registrationId, attendanceType, selectedRoomId, locale }) => {
    try {
      const smsResponse = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          firstName,
          lastName,
          registrationId,
          attendanceType,
          selectedRoomId,
          locale
        }),
      });
      
      if (!smsResponse.ok) {
        console.error('SMS API error:', await smsResponse.text());
      }
      
      return { success: smsResponse.ok };
    } catch (smsError) {
      console.error('SMS sending error:', smsError);
      return { success: false, error: smsError };
    }
  },
  
  // Send email notification
  sendEmail: async ({ formData, registrationId, locale, seminarRooms }) => {
    try {
      // Find selected seminar room (if applicable)
      const selectedRoom = formData.selectedRoomId ? 
        seminarRooms.find(room => room.id.toString() === formData.selectedRoomId) : 
        null;
      
      const emailResponse = await fetch('/api/send-email', {
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
      
      if (!emailResponse.ok) {
        console.error('Email API error:', await emailResponse.json());
      }
      
      return { success: emailResponse.ok };
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return { success: false, error: emailError };
    }
  }
};

export default FormSubmissionHandler;
