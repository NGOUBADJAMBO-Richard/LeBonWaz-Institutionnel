import React from 'react';
import InteractionCard from './InteractionCard';
import LoadingSpinner from '../common/LoadingSpinner';

const InteractionList = ({ interactions, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!interactions || interactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500">Aucune interaction enregistrée</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {interactions.map(interaction => (
        <InteractionCard key={interaction.id} interaction={interaction} />
      ))}
    </div>
  );
};

export default InteractionList;
