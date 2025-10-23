import React from 'react';

const InteractionCard = ({ interaction }) => {
  return (
    <div className="border rounded-lg p-3">
      <div className="font-medium">{interaction.type} • {interaction.sentiment}</div>
      <div className="text-gray-600 text-sm">{interaction.content}</div>
      {interaction.nextSteps && (
        <div className="text-gray-500 text-xs mt-1">Prochaines étapes: {interaction.nextSteps}</div>
      )}
    </div>
  );
};

export default InteractionCard;
