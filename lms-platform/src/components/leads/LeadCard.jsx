import React from 'react';

const LeadCard = ({ lead }) => (
  <div className="card">
    <div className="font-medium">{lead.firstName} {lead.lastName}</div>
    <div className="text-sm text-gray-500">{lead.email} • {lead.phone}</div>
  </div>
);

export default LeadCard;
