import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import LeadCard from '../components/leads/LeadCard';
import LeadFilters from '../components/leads/LeadFilters';
import { Plus, Search } from 'lucide-react';

const LeadsPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    dateRange: ''
  });
  
  useEffect(() => {
    loadLeads();
  }, [currentUser, isAdmin]);
  
  useEffect(() => {
    applyFilters();
  }, [leads, searchTerm, filters]);
  
  const loadLeads = async () => {
    try {
      setLoading(true);
      const leadsData = isAdmin ? 
        await leadService.getAllLeads() :
        await leadService.getLeadsByUser(currentUser.uid);
      
      setLeads(leadsData);
    } catch (error) {
      console.error('Erreur chargement leads:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...leads];
    
    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(lead => 
        `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm)
      );
    }
    
    // Filtre par statut
    if (filters.status) {
      filtered = filtered.filter(lead => lead.status === filters.status);
    }
    
    // Filtre par source
    if (filters.source) {
      filtered = filtered.filter(lead => lead.source === filters.source);
    }
    
    // Filtre par date
    if (filters.dateRange) {
      const now = new Date();
      const days = parseInt(filters.dateRange);
      const cutoffDate = new Date(now.setDate(now.getDate() - days));
      
      filtered = filtered.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return leadDate >= cutoffDate;
      });
    }
    
    setFilteredLeads(filtered);
  };
  
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await leadService.changeStatus(leadId, newStatus, currentUser.uid);
      await loadLeads(); // Recharger les données
    } catch (error) {
      console.error('Erreur changement statut:', error);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header avec actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Prospects</h1>
            <p className="mt-1 text-sm text-gray-600">
              {filteredLeads.length} prospect{filteredLeads.length > 1 ? 's' : ''} 
              {filteredLeads.length !== leads.length && ` sur ${leads.length} au total`}
            </p>
          </div>
          <Button
            onClick={() => navigate('/leads/add')}
            className="mt-4 sm:mt-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau prospect
          </Button>
        </div>
        
        {/* Barre de recherche et filtres */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, entreprise, email ou téléphone..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Filtres */}
            <LeadFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        </div>
        
        {/* Liste des prospects */}
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {searchTerm || filters.status || filters.source || filters.dateRange ? 
                'Aucun prospect trouvé' : 
                'Aucun prospect enregistré'
              }
            </h3>
            <p className="mt-2 text-gray-600">
              {searchTerm || filters.status || filters.source || filters.dateRange ? 
                'Essayez de modifier vos critères de recherche.' :
                'Commencez par ajouter votre premier prospect.'
              }
            </p>
            {(!searchTerm && !filters.status && !filters.source && !filters.dateRange) && (
              <Button
                onClick={() => navigate('/leads/add')}
                className="mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un prospect
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onStatusChange={handleStatusChange}
                onClick={() => navigate(`/leads/${lead.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LeadsPage;