import { useState, useEffect } from 'react';
import { leadService } from '../services/leadService';
import { useAuth } from './useAuth';

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, isAdmin } = useAuth();

  const fetchLeads = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const leadsData = isAdmin 
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser.uid);
      
      setLeads(leadsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createLead = async (leadData) => {
    try {
      const result = await leadService.createLead(leadData, currentUser.uid);
      if (result.success) {
        await fetchLeads(); // Refresh the list
        return result;
      }
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateLead = async (leadId, updateData) => {
    try {
      const result = await leadService.updateLead(leadId, updateData);
      if (result.success) {
        await fetchLeads(); // Refresh the list
        return result;
      }
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const changeStatus = async (leadId, newStatus) => {
    try {
      const result = await leadService.changeStatus(leadId, newStatus, currentUser.uid);
      if (result.success) {
        await fetchLeads(); // Refresh the list
        return result;
      }
      return result;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getLeadById = async (leadId) => {
    try {
      return await leadService.getLeadById(leadId);
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [currentUser, isAdmin]);

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
    changeStatus,
    getLeadById
  };
};