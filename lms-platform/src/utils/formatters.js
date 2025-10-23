import { format, formatDistance, formatRelative } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (date) => {
  if (!date) return '';
  
  try {
    // Handle Firestore Timestamp
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'dd/MM/yyyy', { locale: fr });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: fr });
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return '';
  }
};

export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return formatDistance(dateObj, new Date(), { addSuffix: true, locale: fr });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

export const formatPhone = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as groups of 2
  const match = cleaned.match(/(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/);
  if (match) {
    return [match[1], match[2], match[3], match[4], match[5]]
      .filter(Boolean)
      .join(' ');
  }
  
  return phone;
};

export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '';
  
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0
  }).format(amount);
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${first}${last}`;
};
