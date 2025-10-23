import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import { LEAD_STATUS, INTERACTION_TYPES } from '../config/constants';
import { ArrowLeft, Phone, Mail, Building, User } from 'lucide-react';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';

const LeadDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  
  const [interactionForm, setInteractionForm] = useState({
    type: 'Appel',
    notes: '',
    sentiment: 'Neutre'
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const leadData = await leadService.getLeadById(id);
      const interactionsData = await interactionService.getInteractionsByLead(id);
      
      setLead(leadData);
      setInteractions(interactionsData);
    } catch (error) {
      console.error('Error loading data:', error);
      showError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const result = await leadService.changeStatus(id, newStatus, currentUser.uid);
      
      if (result.success) {
        showSuccess('Statut mis à jour avec succès');
        loadData();
      } else {
        showError('Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      showError('Erreur lors de la mise à jour du statut');
    }
  };

  const handleAddInteraction = async (e) => {
    e.preventDefault();
    
    try {
      const result = await interactionService.createInteraction(
        id,
        currentUser.uid,
        interactionForm
      );
      
      if (result.success) {
        showSuccess('Interaction ajoutée avec succès');
        setShowInteractionModal(false);
        setInteractionForm({ type: 'Appel', notes: '', sentiment: 'Neutre' });
        loadData();
      } else {
        showError('Erreur lors de l\'ajout de l\'interaction');
      }
    } catch (error) {
      showError('Erreur lors de l\'ajout de l\'interaction');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Lead non trouvé</p>
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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/leads')}
            >
              <ArrowLeft size={18} className="mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {lead.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations du lead */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informations du Lead
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{lead.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${lead.email}`} className="text-primary-600 hover:underline">
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href={`tel:${lead.phone}`} className="text-primary-600 hover:underline">
                    {lead.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{lead.company}</span>
                </div>
                {lead.position && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{lead.position}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Historique des interactions */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Historique des Interactions
                </h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowInteractionModal(true)}
                >
                  Nouvelle Interaction
                </Button>
              </div>

              {interactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Aucune interaction enregistrée
                </p>
              ) : (
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <div key={interaction.id} className="border-l-4 border-primary-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">
                          {interaction.type}
                        </span>
                        <span className="text-sm text-gray-500">
                          {interaction.createdAt?.toDate?.()?.toLocaleDateString?.() || 'Date inconnue'}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{interaction.notes}</p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        {interaction.sentiment}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Panneau latéral */}
          <div className="space-y-6">
            {/* Changement de statut */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Statut du Lead
              </h2>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="input-field mb-4"
              >
                {Object.values(LEAD_STATUS).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Informations complémentaires */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Informations complémentaires
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Source:</span>
                  <span className="ml-2 font-medium">{lead.source}</span>
                </div>
                {lead.notes && (
                  <div>
                    <span className="text-gray-600">Notes:</span>
                    <p className="mt-1 text-gray-700">{lead.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal d'ajout d'interaction */}
      <Modal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        title="Nouvelle Interaction"
      >
        <form onSubmit={handleAddInteraction}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'interaction
              </label>
              <select
                value={interactionForm.type}
                onChange={(e) => setInteractionForm(prev => ({ ...prev, type: e.target.value }))}
                className="input-field"
                required
              >
                {INTERACTION_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={interactionForm.notes}
                onChange={(e) => setInteractionForm(prev => ({ ...prev, notes: e.target.value }))}
                rows="4"
                className="input-field resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sentiment
              </label>
              <select
                value={interactionForm.sentiment}
                onChange={(e) => setInteractionForm(prev => ({ ...prev, sentiment: e.target.value }))}
                className="input-field"
                required
              >
                <option>Très positif</option>
                <option>Positif</option>
                <option>Neutre</option>
                <option>Négatif</option>
                <option>Très négatif</option>
              </select>
            </div>

            <div className="flex gap-4 mt-6">
              <Button type="submit" variant="primary" className="flex-1">
                Enregistrer
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowInteractionModal(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LeadDetailPage;
