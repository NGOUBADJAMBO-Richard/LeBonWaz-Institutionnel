import React from 'react';
import LeadCard from './LeadCard';

const LeadList = ({ leads, onSelect }) => {
  if (!leads.length) return <div className="text-gray-500">Aucun lead.</div>;
  return (
    <div className="grid gap-3">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onDetails={() => onSelect(lead)} />)
      )}
    </div>
  );
};

export default LeadList;
