import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../hooks/useLeads';
import { useNotification } from '../contexts/NotificationContext';
import LeadForm from '../components/leads/LeadForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AddLeadPage = () => {
  const navigate = useNavigate();
  const { createLead } = useLeads();
  const { success, error: showError } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (leadData) => {
    setLoading(true);
    try {
      const result = await createLead(leadData);
      if (result.success) {
        success('Lead créé avec succès');
        navigate('/leads');
      } else {
        showError(result.error || 'Erreur lors de la création du lead');
      }
    } catch (error) {
      showError('Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nouveau lead</h1>
          <p className="mt-2 text-gray-600">
            Ajoutez un nouveau prospect à votre pipeline
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <LeadForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AddLeadPage;