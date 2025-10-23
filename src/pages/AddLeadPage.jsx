import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { leadService } from '../services/leadService';
import Layout from '../components/common/Layout';
import LeadForm from '../components/leads/LeadForm';

const AddLeadPage = () => {
  const { currentUser } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  
  const handleSubmit = async (leadData) => {
    try {
      const result = await leadService.createLead(leadData, currentUser.uid);
      
      if (result.success) {
        showSuccess(
          result.offline ? 
            'Prospect ajouté (sera synchronisé lors de la reconnexion)' :
            'Prospect ajouté avec succès !'
        );
        navigate('/leads');
      } else {
        showError(result.error || 'Erreur lors de l\'ajout du prospect');
      }
    } catch (error) {
      console.error('Erreur ajout prospect:', error);
      showError('Erreur lors de l\'ajout du prospect');
    }
  };
  
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Ajouter un nouveau prospect
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Remplissez les informations du prospect pour commencer le suivi commercial.
            </p>
          </div>
          
          <div className="p-6">
            <LeadForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddLeadPage;