import React from 'react';
import { LEAD_STATUS_LABELS, LEAD_STATUS_COLORS } from '../../config/constants';
import { classNames } from '../../utils/helpers';

const StatusBadge = ({ status }) => {
  return (
    <span className={classNames(
      'px-3 py-1 rounded-full text-xs font-medium',
      LEAD_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'
    )}>
      {LEAD_STATUS_LABELS[status] || status}
    </span>
  );
};

export default StatusBadge;
