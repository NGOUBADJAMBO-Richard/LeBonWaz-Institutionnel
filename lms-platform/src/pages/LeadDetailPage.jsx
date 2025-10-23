import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import LeadDetail from '../components/leads/LeadDetail';
import InteractionForm from '../components/interactions/InteractionForm';
import InteractionList from '../components/interactions/InteractionList';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';

const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { success, error } = useNotification();

  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interactionsLoading, setInteractionsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInteractionForm, setShowInteractionForm] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    await Promise.all([loadLead(), loadInteractions()]);
  };

  const loadLead = async () => {
    setLoading(true);
    try {
      const data = await leadService.getLeadById(id);
      setLead(data);
    } catch (err) {
      error('Erreur lors du chargement du lead');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadInteractions = async () => {
    setInteractionsLoading(true);
    try {
      const data = await interactionService.getInteractionsByLead(id);
      setInteractions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setInteractionsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await leadService.deleteLead(id);
      if (result.success) {
        success('Lead supprimé avec succès');
        navigate('/leads');
      } else {
        error('Erreur lors de la suppression');
      }
    } catch (err) {
      error('Une erreur est survenue');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Lead introuvable</p>
          <Button onClick={() => navigate('/leads')}>
            Retour aux leads
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/leads')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Détails du Lead
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowInteractionForm(!showInteractionForm)}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Ajouter une interaction
              </Button>
              {isAdmin && (
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Supprimer
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Lead Details */}
          <LeadDetail lead={lead} onUpdate={loadLead} />

          {/* Interaction Form */}
          {showInteractionForm && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Nouvelle Interaction
              </h3>
              <InteractionForm
                leadId={id}
                onSuccess={() => {
                  loadInteractions();
                  setShowInteractionForm(false);
                }}
              />
            </div>
          )}

          {/* Interactions List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Historique des Interactions ({interactions.length})
            </h3>
            <InteractionList
              interactions={interactions}
              loading={interactionsLoading}
            />
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirmer la suppression"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Êtes-vous sûr de vouloir supprimer ce lead ? Cette action est irréversible.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadDetailPage;
