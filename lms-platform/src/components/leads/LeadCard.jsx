import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Building2, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/formatters';

const LeadCard = ({ lead }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/leads/${lead.id}`)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 rounded-full p-2">
            <User className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {lead.firstName} {lead.lastName}
            </h3>
            {lead.jobTitle && (
              <p className="text-sm text-gray-500">{lead.jobTitle}</p>
            )}
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="space-y-2">
        {lead.company && (
          <div className="flex items-center text-sm text-gray-600">
            <Building2 className="h-4 w-4 mr-2" />
            {lead.company}
          </div>
        )}
        {lead.email && (
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {lead.email}
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {lead.phone}
          </div>
        )}
        {lead.prospectionDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            Prospecté le {formatDate(lead.prospectionDate)}
          </div>
        )}
      </div>

      {lead.productInterest && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Intérêt: </span>
            {lead.productInterest}
          </p>
        </div>
      )}
    </div>
  );
};

export default LeadCard;
