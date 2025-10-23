import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/dashboardService';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatCard from '../components/dashboard/StatCard';
import ConversionChart from '../components/dashboard/ConversionChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  TrendingUp, 
  MessageSquare,
  Target
} from 'lucide-react';

const DashboardPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadDashboardData();
  }, [currentUser, isAdmin]);
  
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Charger les statistiques
      const statsData = isAdmin ? 
        await dashboardService.getAdminStats() :
        await dashboardService.getCommercialStats(currentUser.uid);
      
      // Charger les données du graphique
      const chartData = await dashboardService.getConversionChartData(
        isAdmin ? null : currentUser.uid
      );
      
      // Charger l'activité récente
      const activity = await dashboardService.getRecentActivity(
        isAdmin ? null : currentUser.uid,
        5
      );
      
      setStats(statsData);
      setChartData(chartData);
      setRecentActivity(activity);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
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
        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Prospects"
            value={stats?.totalLeads || 0}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Nouveaux Prospects"
            value={stats?.newLeads || 0}
            icon={UserPlus}
            color="green"
          />
          <StatCard
            title="Prospects Convertis"
            value={stats?.convertedLeads || 0}
            icon={UserCheck}
            color="purple"
          />
          <StatCard
            title="Taux de Conversion"
            value={`${stats?.conversionRate || 0}%`}
            icon={TrendingUp}
            color="orange"
          />
        </div>
        
        {/* Statistiques supplémentaires pour admin */}
        {isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Prospects Qualifiés"
              value={stats?.qualifiedLeads || 0}
              icon={Target}
              color="indigo"
            />
            <StatCard
              title="En Négociation"
              value={stats?.negotiationLeads || 0}
              icon={MessageSquare}
              color="yellow"
            />
            <StatCard
              title="Total Interactions"
              value={stats?.totalInteractions || 0}
              icon={MessageSquare}
              color="pink"
            />
          </div>
        )}
        
        {/* Graphiques et activité */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Graphique de conversion */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Répartition des Prospects
            </h3>
            <ConversionChart data={chartData} />
          </div>
          
          {/* Activité récente */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Activité Récente
            </h3>
            <RecentActivity activities={recentActivity} />
          </div>
        </div>
        
        {/* Informations de connexion */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            État de la Connexion
          </h3>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${navigator.onLine ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-3 h-3 rounded-full ${navigator.onLine ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {navigator.onLine ? 'En ligne' : 'Hors ligne'}
              </span>
            </div>
            {!navigator.onLine && (
              <p className="text-sm text-gray-600">
                Les données sont synchronisées localement et seront mises à jour lors de la reconnexion.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;