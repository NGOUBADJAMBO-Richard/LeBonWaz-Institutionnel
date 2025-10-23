import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from '../contexts/AuthContext';

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, isAdmin } = useAuth();

  const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      let statsData, conversionData;
      
      if (isAdmin) {
        statsData = await dashboardService.getGlobalStats();
        conversionData = await dashboardService.getConversionData(null, true);
      } else {
        statsData = await dashboardService.getUserStats(currentUser.uid);
        conversionData = await dashboardService.getConversionData(currentUser.uid);
      }
      
      setStats(statsData);
      setChartData(conversionData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadDashboardData();
    }
  }, [currentUser, isAdmin]);

  const refreshDashboard = () => {
    loadDashboardData();
  };

  return {
    stats,
    chartData,
    loading,
    error,
    refreshDashboard
  };
};
