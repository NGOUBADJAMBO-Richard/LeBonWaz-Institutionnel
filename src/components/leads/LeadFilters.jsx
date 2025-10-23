import React from 'react';
import { LEAD_STATUS, LEAD_SOURCES } from '../../config/constants';

const LeadFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: '',
      source: '',
      search: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="card mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Rechercher par nom, entreprise, téléphone..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="input-field"
          />
        </div>
        
        <select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="input-field w-auto"
        >
          <option value="">Tous les statuts</option>
          {Object.entries(LEAD_STATUS).map(([key, value]) => (
            <option key={key} value={value}>{value}</option>
          ))}
        </select>
        
        <select
          value={filters.source || ''}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          className="input-field w-auto"
        >
          <option value="">Toutes les sources</option>
          {LEAD_SOURCES.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Effacer les filtres
          </button>
        )}
      </div>
    </div>
  );
};

export default LeadFilters;