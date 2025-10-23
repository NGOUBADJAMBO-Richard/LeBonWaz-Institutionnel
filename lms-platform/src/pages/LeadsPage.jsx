import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { 
  Plus, 
  Search, 
  Filter,
  ChevronRight,
  Building2,
  Mail,
  Phone,
  Calendar,
  MapPin
} from 'lucide-react';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { LEAD_STATUS_COLORS } from '../config/constants';

const LeadsPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('tous');

  useEffect(() => {
    loadLeads();
  }, [currentUser]);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads]);

  const loadLeads = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const leadsData = isAdmin 
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser.uid);
      
      setLeads(leadsData);
      setFilteredLeads(leadsData);
    } catch (error) {
      console.error('Erreur lors du chargement des leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];
    
    // Filtre par recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.nom?.toLowerCase().includes(search) ||
        lead.prenom?.toLowerCase().includes(search) ||
        lead.entreprise?.toLowerCase().includes(search) ||
        lead.email?.toLowerCase().includes(search)
      );
    }
    
    // Filtre par statut
    if (statusFilter !== 'tous') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    
    setFilteredLeads(filtered);
  };

  const LeadCard = ({ lead }) => (
    <Link
      to={`/leads/${lead.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {lead.prenom} {lead.nom}
          </h3>
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold mt-2 ${LEAD_STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-800'}`}>
            {lead.status}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        {lead.entreprise && (
          <div className="flex items-center text-sm text-gray-600">
            <Building2 className="w-4 h-4 mr-2 text-gray-400" />
            {lead.entreprise}
          </div>
        )}
        {lead.email && (
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            {lead.email}
          </div>
        )}
        {lead.telephone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            {lead.telephone}
          </div>
        )}
        {lead.source && (
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            Source: {lead.source}
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Créé le {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
        </p>
      </div>
    </Link>
  );

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes Leads</h1>
              <p className="text-gray-600">
                {filteredLeads.length} lead{filteredLeads.length > 1 ? 's' : ''} trouvé{filteredLeads.length > 1 ? 's' : ''}
              </p>
            </div>
            <Link to="/leads/add">
              <Button icon={<Plus className="w-5 h-5" />}>
                Nouveau Lead
              </Button>
            </Link>
          </div>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un lead..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filtre par statut */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="tous">Tous les statuts</option>
                  <option value="nouveau">Nouveau</option>
                  <option value="contacté">Contacté</option>
                  <option value="qualifié">Qualifié</option>
                  <option value="en_négociation">En négociation</option>
                  <option value="converti">Converti</option>
                  <option value="perdu">Perdu</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des leads */}
        {filteredLeads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun lead trouvé
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'tous' 
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par ajouter votre premier lead"}
            </p>
            {!searchTerm && statusFilter === 'tous' && (
              <Link to="/leads/add">
                <Button icon={<Plus className="w-5 h-5" />}>
                  Ajouter un lead
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsPage;