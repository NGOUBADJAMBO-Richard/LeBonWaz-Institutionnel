import React from 'react';
import Button from '../common/Button';

const LeadCard = ({ lead, onDetails }) => {
  return (
    <div className="card flex items-center justify-between">
      <div>
        <div className="font-medium">{lead.firstName} {lead.lastName}</div>
        <div className="text-sm text-gray-500">{lead.email} • {lead.phone}</div>
      </div>
      <Button variant="secondary" onClick={onDetails}>Détails</Button>
    </div>
  );
};

export default LeadCard;
