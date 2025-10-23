import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import StatusBadge from './StatusBadge';
import Button from '../common/Button';
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Eye
} from 'lucide-react';

const LeadCard = ({ lead, onStatusChange, onClick }) => {
  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    onStatusChange(lead.id, newStatus);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {lead.firstName} {lead.lastName}
            </h3>
            {lead.jobTitle && (
              <p className="text-sm text-gray-600">{lead.jobTitle}</p>
            )}
          </div>
          <StatusBadge status={lead.status} />
        </div>
        
        {/* Informations principales */}
        <div className="space-y-2 mb-4">
          {lead.company && (
            <div className="flex items-center text-sm text-gray-600">
              <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{lead.company}</span>
            </div>
          )}
          
          {lead.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          
          {lead.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{lead.phone}</span>
            </div>
          )}
          
          {lead.source && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{lead.source}</span>
            </div>
          )}
        </div>
        
        {/* Produit d'intérêt */}
        {lead.productInterest && (
          <div className="mb-4">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {lead.productInterest}
            </span>
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>
              {formatDistanceToNow(new Date(lead.createdAt), { 
                addSuffix: true,
                locale: fr 
              })}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Indicateur hors ligne */}
            {lead.isOffline && (
              <span className="inline-block w-2 h-2 bg-orange-500 rounded-full" title="Données hors ligne"></span>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              <Eye className="h-3 w-3 mr-1" />
              Voir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;