import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from './useAuth';

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [leadsEvolution, setLeadsEvolution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, isAdmin } = useAuth();

  const fetchDashboardData = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all dashboard data in parallel
      const [statsResult, recentLeadsResult, evolutionResult] = await Promise.all([
        dashboardService.getDashboardStats(currentUser.uid, isAdmin),
        dashboardService.getRecentLeads(currentUser.uid, isAdmin),
        dashboardService.getLeadsEvolution(currentUser.uid, isAdmin)
      ]);

      if (statsResult.success) {
        setStats(statsResult.data);
      }
      
      if (recentLeadsResult.success) {
        setRecentLeads(recentLeadsResult.data);
      }
      
      if (evolutionResult.success) {
        setLeadsEvolution(evolutionResult.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [currentUser, isAdmin]);

  return {
    stats,
    recentLeads,
    leadsEvolution,
    loading,
    error,
    refresh: fetchDashboardData
  };
};