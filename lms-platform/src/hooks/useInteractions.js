import { useCallback, useEffect, useState } from 'react';
import { interactionService } from '../services/interactionService';

export const useInteractions = (leadId) => {
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!leadId) return;
    setLoading(true);
    try {
      const data = await interactionService.getInteractionsByLead(leadId);
      setInteractions(data);
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { interactions, loading, refresh };
};
