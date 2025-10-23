export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getInitials = (firstName, lastName) => {
  if (!firstName || !lastName) return '??';
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const sortByDate = (array, dateField = 'createdAt', order = 'desc') => {
  return [...array].sort((a, b) => {
    const dateA = a[dateField]?.toDate ? a[dateField].toDate() : new Date(a[dateField]);
    const dateB = b[dateField]?.toDate ? b[dateField].toDate() : new Date(b[dateField]);
    
    if (order === 'desc') {
      return dateB - dateA;
    }
    return dateA - dateB;
  });
};

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

export const calculateConversionRate = (converted, total) => {
  if (!total || total === 0) return 0;
  return Math.round((converted / total) * 100 * 100) / 100; // Round to 2 decimal places
};

export const getStatusColor = (status) => {
  const colors = {
    nouveau: 'blue',
    contacté: 'yellow',
    qualifié: 'green',
    en_négociation: 'purple',
    converti: 'emerald',
    perdu: 'red'
  };
  return colors[status] || 'gray';
};

export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};