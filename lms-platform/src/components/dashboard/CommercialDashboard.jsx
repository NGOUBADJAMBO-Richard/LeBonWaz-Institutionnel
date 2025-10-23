import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, TrendingUp, Target, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dashboardService } from '../../services/dashboardService';
import StatCard from './StatCard';
import ConversionChart from './ConversionChart';
import LoadingSpinner from '../common/LoadingSpinner';

const CommercialDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const userStats = await dashboardService.getUserStats(currentUser.uid);
      const conversionData = await dashboardService.getConversionData(currentUser.uid);
      
      setStats(userStats);
      setChartData(conversionData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Impossible de charger les statistiques</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Leads Convertis"
          value={stats.converti}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Taux de Conversion"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Nouveaux Leads"
          value={stats.nouveau}
          icon={Target}
          color="yellow"
        />
        <StatCard
          title="En Négociation"
          value={stats.en_négociation}
          icon={Award}
          color="orange"
        />
        <StatCard
          title="Leads Perdus"
          value={stats.perdu}
          icon={UserX}
          color="red"
        />
      </div>

      <ConversionChart data={chartData} />
    </div>
  );
};

export default CommercialDashboard;
