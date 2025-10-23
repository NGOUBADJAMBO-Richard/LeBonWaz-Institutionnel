import { useState, useEffect } from 'react';
import { interactionService } from '../services/interactionService';

export const useInteractions = (leadId) => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInteractions = async () => {
    if (!leadId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await interactionService.getInteractionsByLead(leadId);
      setInteractions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading interactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInteractions();
  }, [leadId]);

  const refreshInteractions = () => {
    loadInteractions();
  };

  return {
    interactions,
    loading,
    error,
    refreshInteractions
  };
};
