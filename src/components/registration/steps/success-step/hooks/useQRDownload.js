import toast from 'react-hot-toast';

export function useQRDownload(locale, registrationId) {
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

  return { downloadQRCode };
}