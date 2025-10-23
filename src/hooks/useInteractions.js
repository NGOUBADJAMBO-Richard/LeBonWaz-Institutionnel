import { useState, useEffect } from 'react';
import { interactionService } from '../services/interactionService';
import { useAuth } from './useAuth';

export const useInteractions = (leadId = null) => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const fetchInteractions = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let interactionsData;
      
      if (leadId) {
        interactionsData = await interactionService.getInteractionsByLead(leadId);
      } else {
        interactionsData = await interactionService.getInteractionsByUser(currentUser.uid);
      }
      
      setInteractions(interactionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createInteraction = async (interactionData) => {
    try {
      const result = await interactionService.createInteraction(
        leadId || interactionData.leadId, 
        currentUser.uid, 
        interactionData
      );
      
      if (result.success) {
        await fetchInteractions(); // Refresh the list
        return result;
      }
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchInteractions();
  }, [currentUser, leadId]);

  return {
    interactions,
    loading,
    error,
    fetchInteractions,
    createInteraction
  };
};