// Email validation
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (Thai format)
export function isValidPhone(phone) {
  const phoneRegex = /^0\d{8,9}$/;
  return phoneRegex.test(phone);
}

// Format date to Thai format
export function formatDateThai(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear() + 543; // Convert to Buddhist Era
  
  return `${day}/${month}/${year}`;
}

// Format date to English format
export function formatDateEn(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// Format time (HH:MM)
export function formatTime(timeString) {
  if (!timeString) return '-';
  
  try {
    // MySQL TIME format can be HH:MM:SS or HH:MM:SS.microseconds
    // We only need HH:MM
    const timeParts = timeString.split(':');
    if (timeParts.length >= 2) {
      return `${timeParts[0]}:${timeParts[1]}`;
    }
    return timeString; // Return as is if format is unexpected
  } catch (error) {
    console.error('Error formatting time:', error);
    return '-';
  }
}

// Combine classes conditionally
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
