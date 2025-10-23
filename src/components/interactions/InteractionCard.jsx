import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SENTIMENT_COLORS } from '../../config/constants';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Users, 
  Calendar,
  WifiOff
} from 'lucide-react';

const InteractionCard = ({ interaction, isLast = false }) => {
  const getIcon = (type) => {
    const icons = {
      'Appel': Phone,
      'Email': Mail,
      'SMS': MessageSquare,
      'Rencontre Physique': Users,
      'WhatsApp': MessageSquare
    };
    
    return icons[type] || MessageSquare;
  };
  
  const getIconColor = (type) => {
    const colors = {
      'Appel': 'text-blue-600 bg-blue-100',
      'Email': 'text-green-600 bg-green-100',
      'SMS': 'text-yellow-600 bg-yellow-100',
      'Rencontre Physique': 'text-purple-600 bg-purple-100',
      'WhatsApp': 'text-green-600 bg-green-100'
    };
    
    return colors[type] || 'text-gray-600 bg-gray-100';
  };
  
  const Icon = getIcon(interaction.type);
  const iconColor = getIconColor(interaction.type);
  const sentimentColor = SENTIMENT_COLORS[interaction.sentiment] || 'bg-gray-100 text-gray-800';
  
  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
      )}
      
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className={`p-3 rounded-lg ${iconColor} relative z-10`}>
          <Icon className="h-5 w-5" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0 bg-gray-50 rounded-lg p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h4 className="text-sm font-medium text-gray-900">
                {interaction.type}
              </h4>
              {interaction.sentiment && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentimentColor}`}>
                  {interaction.sentiment}
                </span>
              )}
              {interaction.isOffline && (
                <WifiOff className="h-4 w-4 text-orange-500" title="Hors ligne" />
              )}
            </div>
            
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {formatDistanceToNow(new Date(interaction.createdAt), { 
                  addSuffix: true,
                  locale: fr 
                })}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {interaction.content}
              </p>
            </div>
            
            {/* Next steps */}
            {interaction.nextSteps && (
              <div className="border-t border-gray-200 pt-3">
                <h5 className="text-xs font-medium text-gray-900 mb-1">
                  Prochaines étapes :
                </h5>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {interaction.nextSteps}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionCard;