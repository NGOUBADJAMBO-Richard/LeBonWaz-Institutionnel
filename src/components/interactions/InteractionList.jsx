import React from 'react';
import { useInteractions } from '../../hooks/useInteractions';
import InteractionCard from './InteractionCard';
import LoadingSpinner from '../common/LoadingSpinner';

const InteractionList = ({ leadId }) => {
  const { interactions, loading, error } = useInteractions(leadId);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="md" text="Chargement des interactions..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erreur lors du chargement des interactions</p>
      </div>
    );
  }

  if (interactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune interaction</h3>
        <p className="text-gray-500">Commencez par ajouter votre première interaction avec ce prospect.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {interactions.map(interaction => (
        <InteractionCard
          key={interaction.id}
          interaction={interaction}
        />
      ))}
    </div>
  );
};

export default InteractionList;