import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Phone,
  BarChart3,
  Activity,
  Calendar,
  AlertCircle,
  LogOut,
  Plus,
  Menu,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage = () => {
  const { currentUser, logout, isAdmin, userRole } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      // Charger les statistiques
      const leadStats = await leadService.getLeadStats(currentUser.uid, isAdmin);
      const interactionStats = await interactionService.getInteractionStats(currentUser.uid, isAdmin);
      
      setStats({
        leads: leadStats,
        interactions: interactionStats
      });

      // Charger les leads récents
      const leads = isAdmin 
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser.uid);
      
      setRecentLeads(leads.slice(0, 5));
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% ce mois
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-primary-600">LBW Platform</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="p-4">
        <div className="space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary-50 text-primary-700"
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            Tableau de bord
          </Link>
          <Link
            to="/leads"
            className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <Users className="w-5 h-5 mr-3" />
            Leads
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Activity className="w-5 h-5 mr-3" />
              Administration
            </Link>
          )}
        </div>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
            {currentUser?.email?.[0]?.toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {currentUser?.email}
            </p>
            <p className="text-xs text-gray-500">
              {userRole === 'admin' ? 'Administrateur' : 'Commercial'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          fullWidth
          onClick={handleLogout}
          icon={<LogOut className="w-4 h-4" />}
        >
          Déconnexion
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header mobile */}
        <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Tableau de bord</h1>
          <Link to="/leads/add">
            <Button size="sm" icon={<Plus className="w-4 h-4" />}>
              Lead
            </Button>
          </Link>
        </div>

        <div className="flex-1 p-6">
          {/* Header desktop */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tableau de bord
              </h1>
              <p className="text-gray-600">
                Bienvenue, {currentUser?.email}
              </p>
            </div>
            <Link to="/leads/add">
              <Button icon={<Plus className="w-5 h-5" />}>
                Nouveau Lead
              </Button>
            </Link>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Leads"
              value={stats?.leads?.total || 0}
              icon={Users}
              color="bg-blue-500"
            />
            <StatCard
              title="Taux de conversion"
              value={`${stats?.leads?.tauxConversion || 0}%`}
              icon={TrendingUp}
              color="bg-green-500"
              trend={5}
            />
            <StatCard
              title="Interactions"
              value={stats?.interactions?.total || 0}
              icon={Phone}
              color="bg-purple-500"
            />
            <StatCard
              title="Actions en attente"
              value={stats?.interactions?.actionsEnAttente || 0}
              icon={Calendar}
              color="bg-orange-500"
            />
          </div>

          {/* Leads récents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Leads récents
                </h2>
                <Link 
                  to="/leads"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Voir tout →
                </Link>
              </div>
            </div>
            
            {recentLeads.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    to={`/leads/${lead.id}`}
                    className="block p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {lead.prenom} {lead.nom}
                        </p>
                        <p className="text-sm text-gray-500">
                          {lead.entreprise} • {lead.email}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        lead.status === 'converti' ? 'bg-green-100 text-green-800' :
                        lead.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Aucun lead pour le moment</p>
                <Link to="/leads/add">
                  <Button variant="outline" size="sm" className="mt-3">
                    Ajouter un lead
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;