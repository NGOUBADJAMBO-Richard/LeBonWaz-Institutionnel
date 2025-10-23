import React, { useState } from 'react';
import { Mail, Phone, Building2, Calendar, User, Target, MapPin } from 'lucide-react';
import { leadService } from '../../services/leadService';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { LEAD_STATUS, LEAD_STATUS_LABELS } from '../../config/constants';
import { formatDate } from '../../utils/formatters';
import StatusBadge from './StatusBadge';
import Button from '../common/Button';

const LeadDetail = ({ lead, onUpdate }) => {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(lead.status);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();
  const { success, error } = useNotification();

  const handleStatusChange = async () => {
    if (newStatus === lead.status) {
      setIsEditingStatus(false);
      return;
    }

    setLoading(true);
    try {
      const result = await leadService.changeStatus(lead.id, newStatus, currentUser.uid);
      
      if (result.success) {
        success('Statut mis à jour avec succès');
        setIsEditingStatus(false);
        if (onUpdate) onUpdate();
      } else {
        error('Erreur lors de la mise à jour du statut');
      }
    } catch (err) {
      error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary-100 rounded-full p-3">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {lead.firstName} {lead.lastName}
              </h2>
              {lead.jobTitle && (
                <p className="text-gray-600">{lead.jobTitle}</p>
              )}
            </div>
          </div>
          
          <div>
            {!isEditingStatus ? (
              <div className="flex items-center space-x-2">
                <StatusBadge status={lead.status} />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingStatus(true)}
                >
                  Modifier
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                >
                  {Object.values(LEAD_STATUS).map(status => (
                    <option key={status} value={status}>
                      {LEAD_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                <Button
                  size="sm"
                  onClick={handleStatusChange}
                  loading={loading}
                  disabled={loading}
                >
                  Sauvegarder
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setIsEditingStatus(false);
                    setNewStatus(lead.status);
                  }}
                >
                  Annuler
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informations de Contact
          </h3>
          
          {lead.email && (
            <div className="flex items-center space-x-3 text-gray-700">
              <Mail className="h-5 w-5 text-gray-400" />
              <a href={`mailto:${lead.email}`} className="hover:text-primary-600">
                {lead.email}
              </a>
            </div>
          )}
          
          {lead.phone && (
            <div className="flex items-center space-x-3 text-gray-700">
              <Phone className="h-5 w-5 text-gray-400" />
              <a href={`tel:${lead.phone}`} className="hover:text-primary-600">
                {lead.phone}
              </a>
            </div>
          )}
          
          {lead.company && (
            <div className="flex items-center space-x-3 text-gray-700">
              <Building2 className="h-5 w-5 text-gray-400" />
              <span>{lead.company}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Détails de Prospection
          </h3>
          
          {lead.productInterest && (
            <div className="flex items-center space-x-3 text-gray-700">
              <Target className="h-5 w-5 text-gray-400" />
              <span>{lead.productInterest}</span>
            </div>
          )}
          
          {lead.source && (
            <div className="flex items-center space-x-3 text-gray-700">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span>Source: {lead.source}</span>
            </div>
          )}
          
          {lead.prospectionDate && (
            <div className="flex items-center space-x-3 text-gray-700">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span>Prospecté le {formatDate(lead.prospectionDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
