import toast from 'react-hot-toast';

// Get share URL and message
export function getShareData(locale, registrationId, formData) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cci.fti.or.th';
  const ticketUrl = `${baseUrl}/${locale}/ticket/${registrationId}`;
  
  const title = locale === 'th'
    ? `บัตรเข้างาน CCI Climate Change Forum 2025`
    : `CCI Climate Change Forum 2025 Ticket`;
  
  const text = locale === 'th'
    ? `บัตรเข้างาน CCI Climate Change Forum 2025 สำหรับ ${formData?.firstName} ${formData?.lastName} วันที่ 15 กันยายน 2568`
    : `CCI Climate Change Forum 2025 ticket for ${formData?.firstName} ${formData?.lastName} on September 15, 2025`;
  
  return { url: ticketUrl, title, text };
}

// Share to Facebook
export function shareToFacebook(locale, registrationId, formData) {
  try {
    const shareData = getShareData(locale, registrationId, formData);
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
  } catch (error) {
    console.error('Error sharing to Facebook:', error);
  }
}

// Share to Twitter/X
export function shareToTwitter(locale, registrationId, formData) {
  try {
    const shareData = getShareData(locale, registrationId, formData);
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
  } catch (error) {
    console.error('Error sharing to Twitter:', error);
  }
}

// Share to WhatsApp
export function shareToWhatsApp(locale, registrationId, formData) {
  try {
    const shareData = getShareData(locale, registrationId, formData);
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
  } catch (error) {
    console.error('Error sharing to WhatsApp:', error);
  }
}

// Share to Telegram
export function shareToTelegram(locale, registrationId, formData) {
  try {
    const shareData = getShareData(locale, registrationId, formData);
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
  } catch (error) {
    console.error('Error sharing to Telegram:', error);
  }
}

// Share to Line
export function shareToLine(locale, registrationId, formData) {
  try {
    const shareData = getShareData(locale, registrationId, formData);
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
  } catch (error) {
    console.error('Error sharing to LINE:', error);
  }
}

// Share via Email
export function shareViaEmail(locale, registrationId, formData) {
  try {
    const shareData = getShareData(locale, registrationId, formData);
    
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
  } catch (error) {
    console.error('Error sharing via email:', error);
  }
}