import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../hooks/useLeads';
import { Plus } from 'lucide-react';
import LeadList from '../components/leads/LeadList';
import LeadFilters from '../components/leads/LeadFilters';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LeadsPage = () => {
  const navigate = useNavigate();
  const { leads, loading } = useLeads();
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    source: ''
  });

  const handleLeadClick = (lead) => {
    navigate(`/leads/${lead.id}`);
  };

  const handleAddLead = () => {
    navigate('/leads/add');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement des leads..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des leads</h1>
            <p className="mt-2 text-gray-600">
              Gérez vos prospects et suivez leur progression
            </p>
          </div>
          <Button onClick={handleAddLead}>
            <Plus className="h-5 w-5 mr-2" />
            Nouveau lead
          </Button>
        </div>

        {/* Filters */}
        <LeadFilters
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Leads List */}
        <LeadList
          leads={leads}
          loading={loading}
          onLeadClick={handleLeadClick}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default LeadsPage;