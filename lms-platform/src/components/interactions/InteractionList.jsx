import React from 'react';
import InteractionCard from './InteractionCard';

const InteractionList = ({ interactions }) => {
  if (!interactions.length) return <div className="text-gray-500">Aucune interaction.</div>;
  return (
    <div className="space-y-2">
      {interactions.map((it) => (
        <InteractionCard key={it.id} interaction={it} />
      ))}
    </div>
  );
};

export default InteractionList;
