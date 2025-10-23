import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    nouveau: {
      label: 'Nouveau',
      className: 'bg-blue-100 text-blue-800'
    },
    contacté: {
      label: 'Contacté',
      className: 'bg-yellow-100 text-yellow-800'
    },
    qualifié: {
      label: 'Qualifié',
      className: 'bg-green-100 text-green-800'
    },
    en_négociation: {
      label: 'En négociation',
      className: 'bg-purple-100 text-purple-800'
    },
    converti: {
      label: 'Converti',
      className: 'bg-emerald-100 text-emerald-800'
    },
    perdu: {
      label: 'Perdu',
      className: 'bg-red-100 text-red-800'
    }
  };

  const config = statusConfig[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;