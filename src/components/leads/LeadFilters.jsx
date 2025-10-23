import React from 'react';
import Select from '../common/Select';
import { LEAD_STATUS, LEAD_SOURCES } from '../../config/constants';

const LeadFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const statusOptions = Object.values(LEAD_STATUS).map(status => ({
    value: status,
    label: {
      'nouveau': 'Nouveau',
      'contacté': 'Contacté',
      'qualifié': 'Qualifié',
      'en_négociation': 'En négociation',
      'converti': 'Converti',
      'perdu': 'Perdu'
    }[status] || status
  }));
  
  const dateRangeOptions = [
    { value: '7', label: '7 derniers jours' },
    { value: '30', label: '30 derniers jours' },
    { value: '90', label: '3 derniers mois' },
    { value: '365', label: 'Cette année' }
  ];
  
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="w-full sm:w-48">
        <Select
          placeholder="Tous les statuts"
          options={statusOptions}
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        />
      </div>
      
      <div className="w-full sm:w-48">
        <Select
          placeholder="Toutes les sources"
          options={LEAD_SOURCES}
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
        />
      </div>
      
      <div className="w-full sm:w-48">
        <Select
          placeholder="Toutes les dates"
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(e) => handleFilterChange('dateRange', e.target.value)}
        />
      </div>
    </div>
  );
};

export default LeadFilters;