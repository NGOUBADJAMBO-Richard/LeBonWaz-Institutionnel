import React from 'react';
import { Phone, Mail, Building, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import StatusBadge from './StatusBadge';

const LeadCard = ({ lead, onClick }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(date.toDate ? date.toDate() : new Date(date), 'dd MMM yyyy', { locale: fr });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div 
      className="card hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick?.(lead)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {lead.firstName} {lead.lastName}
            </h3>
            <p className="text-sm text-gray-600">{lead.company || 'Aucune entreprise'}</p>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="space-y-2">
        {lead.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            <span>{lead.phone}</span>
          </div>
        )}
        
        {lead.email && (
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            <span>{lead.email}</span>
          </div>
        )}
        
        {lead.jobTitle && (
          <div className="flex items-center text-sm text-gray-600">
            <Building className="h-4 w-4 mr-2" />
            <span>{lead.jobTitle}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Créé le {formatDate(lead.createdAt)}</span>
        </div>
      </div>

      {lead.productInterest && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Intérêt :</span> {lead.productInterest}
          </p>
        </div>
      )}
    </div>
  );
};

export default LeadCard;