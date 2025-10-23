import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import Layout from '../components/common/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import LeadDetail from '../components/leads/LeadDetail';
import InteractionList from '../components/interactions/InteractionList';
import InteractionForm from '../components/interactions/InteractionForm';
import Modal from '../components/common/Modal';
import { ArrowLeft, Plus, Edit } from 'lucide-react';

const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { showSuccess, showError } = useNotification();
  
  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  
  useEffect(() => {
    loadLeadData();
  }, [id]);
  
  const loadLeadData = async () => {
    try {
      setLoading(true);
      
      // Charger les données du lead
      const leadData = await leadService.getLeadById(id);
      if (!leadData) {
        showError('Prospect introuvable');
        navigate('/leads');
        return;
      }
      
      // Charger les interactions
      const interactionsData = await interactionService.getInteractionsByLead(id);
      
      setLead(leadData);
      setInteractions(interactionsData);
    } catch (error) {
      console.error('Erreur chargement détails lead:', error);
      showError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (newStatus) => {
    try {
      const result = await leadService.changeStatus(id, newStatus, currentUser.uid);
      if (result.success) {
        setLead(prev => ({ ...prev, status: newStatus }));
        showSuccess(
          result.offline ? 
            'Statut mis à jour (sera synchronisé lors de la reconnexion)' :
            'Statut mis à jour avec succès'
        );
      } else {
        showError(result.error || 'Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error('Erreur changement statut:', error);
      showError('Erreur lors de la mise à jour du statut');
    }
  };
  
  const handleAddInteraction = async (interactionData) => {
    try {
      const result = await interactionService.createInteraction(
        id, 
        currentUser.uid, 
        interactionData
      );
      
      if (result.success) {
        setInteractions(prev => [result.data, ...prev]);
        setShowInteractionModal(false);
        showSuccess(
          result.offline ? 
            'Interaction ajoutée (sera synchronisée lors de la reconnexion)' :
            'Interaction ajoutée avec succès'
        );
      } else {
        showError(result.error || 'Erreur lors de l\'ajout de l\'interaction');
      }
    } catch (error) {
      console.error('Erreur ajout interaction:', error);
      showError('Erreur lors de l\'ajout de l\'interaction');
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }
  
  if (!lead) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Prospect introuvable</h2>
          <p className="mt-2 text-gray-600">Ce prospect n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate('/leads')} className="mt-4">
            Retour à la liste
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/leads')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {lead.firstName} {lead.lastName}
              </h1>
              <p className="text-gray-600">
                {lead.company && `${lead.company} • `}
                {lead.jobTitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate(`/leads/${id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
            <Button
              onClick={() => setShowInteractionModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle interaction
            </Button>
          </div>
        </div>
        
        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Détails du lead */}
          <div className="lg:col-span-1">
            <LeadDetail 
              lead={lead} 
              onStatusChange={handleStatusChange}
            />
          </div>
          
          {/* Interactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Historique des interactions ({interactions.length})
                </h3>
              </div>
              <div className="p-6">
                <InteractionList interactions={interactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal d'ajout d'interaction */}
      <Modal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        title="Nouvelle interaction"
        size="lg"
      >
        <InteractionForm
          onSubmit={handleAddInteraction}
          onCancel={() => setShowInteractionModal(false)}
        />
      </Modal>
    </Layout>
  );
};

export default LeadDetailPage;