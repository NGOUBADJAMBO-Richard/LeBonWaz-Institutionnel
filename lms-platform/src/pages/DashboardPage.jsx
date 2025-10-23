import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { LogOut, Users, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage = () => {
  const { currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [currentUser, isAdmin]);

  const loadStats = async () => {
    try {
      const result = isAdmin 
        ? await dashboardService.getGlobalStats()
        : await dashboardService.getCommercialStats(currentUser.uid);
      
      if (result.success) {
        setStats(result.stats);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Tableau de bord {isAdmin && '- Admin'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {currentUser?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation rapide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            variant="primary"
            onClick={() => navigate('/leads')}
            className="h-16"
          >
            <Users size={20} className="mr-2" />
            Voir mes leads
          </Button>
          <Button
            variant="success"
            onClick={() => navigate('/leads/add')}
            className="h-16"
          >
            Ajouter un lead
          </Button>
          {isAdmin && (
            <Button
              variant="secondary"
              onClick={() => navigate('/admin')}
              className="h-16"
            >
              Administration
            </Button>
          )}
        </div>

        {/* Statistiques */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Leads</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stats.totalLeads}
                  </p>
                </div>
                <Users className="w-12 h-12 text-primary-500" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nouveaux</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">
                    {stats.nouveaux}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-blue-500" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Convertis</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">
                    {stats.convertis}
                  </p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux de conversion</p>
                  <p className="text-3xl font-bold text-purple-600 mt-1">
                    {stats.tauxConversion}%
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500" />
              </div>
            </div>
          </div>
        )}

        {/* Répartition par statut */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition des leads par statut
          </h2>
          {stats && (
            <div className="space-y-3">
              <StatBar label="Nouveaux" value={stats.nouveaux} total={stats.totalLeads} color="bg-blue-500" />
              <StatBar label="Contactés" value={stats.contactes} total={stats.totalLeads} color="bg-yellow-500" />
              <StatBar label="Qualifiés" value={stats.qualifies} total={stats.totalLeads} color="bg-orange-500" />
              <StatBar label="En négociation" value={stats.enNegociation} total={stats.totalLeads} color="bg-purple-500" />
              <StatBar label="Convertis" value={stats.convertis} total={stats.totalLeads} color="bg-green-500" />
              <StatBar label="Perdus" value={stats.perdus} total={stats.totalLeads} color="bg-red-500" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatBar = ({ label, value, total, color }) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
