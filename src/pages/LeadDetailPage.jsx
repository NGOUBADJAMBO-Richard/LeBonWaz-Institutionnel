import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeads } from '../hooks/useLeads';
import { useNotification } from '../contexts/NotificationContext';
import LeadDetail from '../components/leads/LeadDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getLeadById, changeStatus } = useLeads();
  const { success, error: showError } = useNotification();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const leadData = await getLeadById(id);
        if (leadData) {
          setLead(leadData);
        } else {
          showError('Lead non trouvé');
          navigate('/leads');
        }
      } catch (error) {
        showError('Erreur lors du chargement du lead');
        navigate('/leads');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id, getLeadById, showError, navigate]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const result = await changeStatus(leadId, newStatus);
      if (result.success) {
        success('Statut mis à jour avec succès');
        setLead(prev => ({ ...prev, status: newStatus }));
      } else {
        showError(result.error || 'Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      showError('Une erreur inattendue s\'est produite');
    }
  };

  const handleBack = () => {
    navigate('/leads');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du lead..." />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lead non trouvé</h2>
          <p className="text-gray-600 mb-4">Le lead que vous recherchez n'existe pas.</p>
          <button
            onClick={() => navigate('/leads')}
            className="btn-primary"
          >
            Retour aux leads
          </button>
        </div>
      </div>
    );
  }

  return (
    <LeadDetail
      lead={lead}
      onBack={handleBack}
      onStatusChange={handleStatusChange}
    />
  );
};

export default LeadDetailPage;