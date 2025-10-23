import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import StatusBadge from './StatusBadge';
import Select from '../common/Select';
import { LEAD_STATUS } from '../../config/constants';
import { 
  Building2, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Target,
  FileText,
  Wifi,
  WifiOff
} from 'lucide-react';

const LeadDetail = ({ lead, onStatusChange }) => {
  const statusOptions = Object.values(LEAD_STATUS).map(status => ({
    value: status,
    label: {
      'nouveau': 'Nouveau',
      'contacté': 'Contacté',
      'qualifié': 'Qualifié',
      'en_négociation': 'En négociation',
      'converti': 'Converti',
      'perdu': 'Perdu'
    }[status] || status
  }));
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Informations du prospect
          </h3>
          {lead.isOffline && (
            <div className="flex items-center text-orange-600">
              <WifiOff className="h-4 w-4 mr-1" />
              <span className="text-xs">Hors ligne</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Statut
          </label>
          <div className="flex items-center space-x-3">
            <StatusBadge status={lead.status} />
            <Select
              options={statusOptions}
              value={lead.status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        
        {/* Informations de contact */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-900">{lead.email}</p>
                <a 
                  href={`mailto:${lead.email}`}
                  className="text-xs text-primary-600 hover:text-primary-800"
                >
                  Envoyer un email
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-900">{lead.phone}</p>
                <a 
                  href={`tel:${lead.phone}`}
                  className="text-xs text-primary-600 hover:text-primary-800"
                >
                  Appeler
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Informations professionnelles */}
        {(lead.company || lead.jobTitle) && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Professionnel</h4>
            <div className="space-y-3">
              {lead.company && (
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                  <p className="text-sm text-gray-900">{lead.company}</p>
                </div>
              )}
              
              {lead.jobTitle && (
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-gray-400 mr-3" />
                  <p className="text-sm text-gray-900">{lead.jobTitle}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Informations commerciales */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Commercial</h4>
          <div className="space-y-3">
            {lead.productInterest && (
              <div className="flex items-start">
                <Target className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Produit d'intérêt</p>
                  <p className="text-sm text-gray-900">{lead.productInterest}</p>
                </div>
              </div>
            )}
            
            {lead.source && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Source</p>
                  <p className="text-sm text-gray-900">{lead.source}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Notes */}
        {lead.notes && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Notes</h4>
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.notes}</p>
            </div>
          </div>
        )}
        
        {/* Métadonnées */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Informations</h4>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Créé {formatDistanceToNow(new Date(lead.createdAt), { 
                  addSuffix: true,
                  locale: fr 
                })}
              </span>
            </div>
            
            {lead.prospectionDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Prospecté le {new Date(lead.prospectionDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
            )}
            
            {lead.updatedAt && lead.updatedAt !== lead.createdAt && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  Modifié {formatDistanceToNow(new Date(lead.updatedAt), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;