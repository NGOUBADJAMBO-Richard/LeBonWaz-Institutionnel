import React from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';
import { SENTIMENT_COLORS } from '../../config/constants';
import { classNames } from '../../utils/helpers';

const InteractionCard = ({ interaction }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-100 rounded-full p-2">
            <MessageSquare className="h-5 w-5 text-primary-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{interaction.type}</h4>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDateTime(interaction.createdAt)}
            </p>
          </div>
        </div>
        {interaction.sentiment && (
          <span className={classNames(
            'text-sm font-medium',
            SENTIMENT_COLORS[interaction.sentiment] || 'text-gray-600'
          )}>
            {interaction.sentiment}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {interaction.content}
          </p>
        </div>

        {interaction.nextSteps && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Prochaines étapes:
            </p>
            <p className="text-sm text-gray-600">
              {interaction.nextSteps}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionCard;
