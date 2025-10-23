import { useState, useEffect } from 'react';
import { leadService } from '../services/leadService';
import { useAuth } from '../contexts/AuthContext';

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, isAdmin } = useAuth();

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (isAdmin) {
        data = await leadService.getAllLeads();
      } else {
        data = await leadService.getLeadsByUser(currentUser.uid);
      }
      setLeads(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadLeads();
    }
  }, [currentUser, isAdmin]);

  const refreshLeads = () => {
    loadLeads();
  };

  return {
    leads,
    loading,
    error,
    refreshLeads
  };
};
