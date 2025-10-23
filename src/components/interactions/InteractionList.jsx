import React from 'react';
import InteractionCard from './InteractionCard';
import { MessageSquare } from 'lucide-react';

const InteractionList = ({ interactions = [] }) => {
  if (interactions.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune interaction
        </h3>
        <p className="text-gray-600">
          Commencez par ajouter votre première interaction avec ce prospect.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {interactions.map((interaction, index) => (
        <InteractionCard 
          key={interaction.id} 
          interaction={interaction}
          isLast={index === interactions.length - 1}
        />
      ))}
    </div>
  );
};

export default InteractionList;