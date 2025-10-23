import React, { useEffect, useState } from 'react';
import { leadService } from '../services/leadService';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';

const LeadsPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      let data = [];
      if (isAdmin) data = await leadService.getAllLeads();
      else if (currentUser) data = await leadService.getLeadsByUser(currentUser.uid);
      setLeads(data);
    };
    fetchLeads();
  }, [currentUser, isAdmin]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Prospects</h1>
        <Button onClick={() => (window.location.href = '/leads/add')}>Ajouter un lead</Button>
      </div>
      <div className="grid gap-3">
        {leads.map((lead) => (
          <div key={lead.id} className="card flex items-center justify-between">
            <div>
              <div className="font-medium">{lead.firstName} {lead.lastName}</div>
              <div className="text-sm text-gray-500">{lead.email} • {lead.phone}</div>
            </div>
            <Button variant="secondary" onClick={() => (window.location.href = `/leads/${lead.id}`)}>Détails</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsPage;
