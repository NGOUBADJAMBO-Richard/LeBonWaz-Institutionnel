import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { Plus, MoreVertical } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusBadge from '../components/common/StatusBadge';
import Navigation from '../components/common/Navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const LeadsPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const leadsData = isAdmin 
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser.uid);
      setLeads(leadsData);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const result = await leadService.changeStatus(leadId, newStatus, currentUser.uid);
      if (result.success) {
        await loadLeads(); // Recharger les données
      }
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Gestion des Leads
            </h1>
            <Button onClick={() => navigate('/leads/add')}>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Lead
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par nom, email ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-0"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">Tous les statuts</option>
                <option value="nouveau">Nouveau</option>
                <option value="contacté">Contacté</option>
                <option value="qualifié">Qualifié</option>
                <option value="en_négociation">En négociation</option>
                <option value="converti">Converti</option>
                <option value="perdu">Perdu</option>
              </select>
            </div>
          </div>

          {/* Leads List */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucun lead trouvé</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prospect
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entreprise
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-primary-600">
                                  {lead.firstName?.charAt(0)}{lead.lastName?.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {lead.firstName} {lead.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {lead.jobTitle}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lead.company}</div>
                          <div className="text-sm text-gray-500">{lead.source}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{lead.email}</div>
                          <div className="text-sm text-gray-500">{lead.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={lead.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.createdAt ? 
                            format(lead.createdAt.toDate(), 'dd/MM/yyyy', { locale: fr }) : 
                            'N/A'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="nouveau">Nouveau</option>
                              <option value="contacté">Contacté</option>
                              <option value="qualifié">Qualifié</option>
                              <option value="en_négociation">En négociation</option>
                              <option value="converti">Converti</option>
                              <option value="perdu">Perdu</option>
                            </select>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeadsPage;