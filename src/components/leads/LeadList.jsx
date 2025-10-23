import React, { useMemo } from 'react';
import LeadCard from './LeadCard';
import LoadingSpinner from '../common/LoadingSpinner';

const LeadList = ({ leads, loading, onLeadClick, filters = {} }) => {
  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    
    return leads.filter(lead => {
      const matchesSearch = !filters.search || 
        `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.company?.toLowerCase().includes(filters.search.toLowerCase()) ||
        lead.phone?.includes(filters.search) ||
        lead.email?.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = !filters.status || lead.status === filters.status;
      const matchesSource = !filters.source || lead.source === filters.source;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, filters]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Chargement des leads..." />
      </div>
    );
  }

  if (filteredLeads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun lead trouvé</h3>
        <p className="text-gray-500">
          {Object.values(filters).some(v => v) 
            ? 'Aucun lead ne correspond à vos critères de recherche.'
            : 'Commencez par ajouter votre premier lead.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredLeads.map(lead => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onClick={onLeadClick}
        />
      ))}
    </div>
  );
};

export default LeadList;