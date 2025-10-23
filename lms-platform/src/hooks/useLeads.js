import { useCallback, useEffect, useState } from 'react';
import { leadService } from '../services/leadService';
import { useAuth } from '../contexts/AuthContext';

export const useLeads = () => {
  const { currentUser, isAdmin } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = isAdmin
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser.uid);
      setLeads(data);
    } finally {
      setLoading(false);
    }
  }, [currentUser, isAdmin]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { leads, loading, refresh };
};
