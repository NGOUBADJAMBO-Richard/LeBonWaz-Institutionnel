import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import LeadList from '../components/leads/LeadList';
import LeadFilters from '../components/leads/LeadFilters';
import Button from '../components/common/Button';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadLeads();
  }, [currentUser, isAdmin]);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      let data;
      if (isAdmin) {
        data = await leadService.getAllLeads();
      } else {
        data = await leadService.getLeadsByUser(currentUser.uid);
      }
      setLeads(data);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.firstName?.toLowerCase().includes(term) ||
        lead.lastName?.toLowerCase().includes(term) ||
        lead.company?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.phone?.includes(term)
      );
    }

    // Filter by status
    if (statusFilter) {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-primary-100 rounded-lg p-2">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Mes Leads
                  </h1>
                  <p className="text-sm text-gray-600">
                    {filteredLeads.length} lead(s) trouvé(s)
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate('/leads/add')}>
              <Plus className="mr-2 h-5 w-5" />
              Nouveau Lead
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeadFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <LeadList leads={filteredLeads} loading={loading} />
      </main>
    </div>
  );
};

export default LeadsPage;
