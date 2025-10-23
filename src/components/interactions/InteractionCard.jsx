import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Phone, Mail, MessageSquare, Users, Calendar } from 'lucide-react';

const InteractionCard = ({ interaction }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return format(date.toDate ? date.toDate() : new Date(date), 'dd MMM yyyy à HH:mm', { locale: fr });
    } catch {
      return 'N/A';
    }
  };

  const getInteractionIcon = (type) => {
    switch (type) {
      case 'Appel':
        return <Phone className="h-5 w-5" />;
      case 'Email':
        return <Mail className="h-5 w-5" />;
      case 'SMS':
      case 'WhatsApp':
        return <MessageSquare className="h-5 w-5" />;
      case 'Rencontre Physique':
        return <Users className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Très positif':
        return 'text-green-600 bg-green-100';
      case 'Positif':
        return 'text-green-700 bg-green-50';
      case 'Négatif':
        return 'text-red-700 bg-red-50';
      case 'Très négatif':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="border-l-4 border-primary-200 bg-gray-50 p-4 rounded-r-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="text-primary-600">
            {getInteractionIcon(interaction.type)}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{interaction.type}</h4>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(interaction.createdAt)}
            </p>
          </div>
        </div>
        
        {interaction.sentiment && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(interaction.sentiment)}`}>
            {interaction.sentiment}
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-gray-800 whitespace-pre-wrap">{interaction.content}</p>
        </div>
        
        {interaction.nextSteps && (
          <div className="bg-white p-3 rounded-lg border">
            <h5 className="text-sm font-medium text-gray-700 mb-1">Prochaines étapes :</h5>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{interaction.nextSteps}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionCard;