import React from 'react';
import { LEAD_STATUS_COLORS } from '../../config/constants';

const StatusBadge = ({ status }) => {
  const colorClass = LEAD_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  
  const statusLabels = {
    'nouveau': 'Nouveau',
    'contacté': 'Contacté',
    'qualifié': 'Qualifié',
    'en_négociation': 'En négociation',
    'converti': 'Converti',
    'perdu': 'Perdu'
  };
  
  const label = statusLabels[status] || status;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
    </span>
  );
};

export default StatusBadge;