import React from 'react';
import { STATUS_COLORS } from '../../config/constants';

const StatusBadge = ({ status, className = '' }) => {
  const statusClass = STATUS_COLORS[status] || 'status-nouveau';
  
  return (
    <span className={`status-badge ${statusClass} ${className}`}>
      {status?.replace('_', ' ').toUpperCase()}
    </span>
  );
};

export default StatusBadge;