import React, { useState } from 'react';
import { Phone, Mail, Building, Calendar, User, ArrowLeft, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { LEAD_STATUS } from '../../config/constants';
import StatusBadge from './StatusBadge';
import Button from '../common/Button';
import Modal from '../common/Modal';
import InteractionForm from '../interactions/InteractionForm';
import InteractionList from '../interactions/InteractionList';

const LeadDetail = ({ lead, onBack, onUpdate, onStatusChange }) => {
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(date.toDate ? date.toDate() : new Date(date), 'dd MMMM yyyy', { locale: fr });
    } catch {
      return 'N/A';
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange?.(lead.id, newStatus);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour
          </button>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {lead.firstName} {lead.lastName}
              </h1>
              <p className="text-gray-600">{lead.company || 'Aucune entreprise'}</p>
            </div>
          </div>
          <StatusBadge status={lead.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h2>
            <div className="space-y-3">
              {lead.phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>{lead.phone}</span>
                </div>
              )}
              
              {lead.email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-3" />
                  <span>{lead.email}</span>
                </div>
              )}
              
              {lead.jobTitle && (
                <div className="flex items-center text-gray-600">
                  <Building className="h-5 w-5 mr-3" />
                  <span>{lead.jobTitle}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3" />
                <span>Créé le {formatDate(lead.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Historique des interactions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Historique des interactions</h2>
              <Button
                onClick={() => setShowInteractionModal(true)}
              >
                Ajouter une interaction
              </Button>
            </div>
            <InteractionList leadId={lead.id} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Changement de statut */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Changer le statut</h3>
            <div className="space-y-2">
              {Object.entries(LEAD_STATUS).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    lead.status === value
                      ? 'bg-primary-100 text-primary-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Source :</span>
                <p className="text-gray-600">{lead.source || 'Non spécifiée'}</p>
              </div>
              
              {lead.productInterest && (
                <div>
                  <span className="font-medium text-gray-700">Produit d'intérêt :</span>
                  <p className="text-gray-600">{lead.productInterest}</p>
                </div>
              )}
              
              {lead.prospectionDate && (
                <div>
                  <span className="font-medium text-gray-700">Date de prospection :</span>
                  <p className="text-gray-600">{formatDate(lead.prospectionDate)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showInteractionModal}
        onClose={() => setShowInteractionModal(false)}
        title="Ajouter une interaction"
      >
        <InteractionForm
          leadId={lead.id}
          onSuccess={() => {
            setShowInteractionModal(false);
            // Refresh interactions
          }}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Modifier le lead"
        size="lg"
      >
        {/* LeadForm component for editing */}
        <p className="text-gray-600">Formulaire de modification à implémenter</p>
      </Modal>
    </div>
  );
};

export default LeadDetail;