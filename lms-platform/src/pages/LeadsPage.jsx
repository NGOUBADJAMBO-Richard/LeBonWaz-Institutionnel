import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';

const LeadsPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function load() {
      const data = isAdmin
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser?.uid);
      setLeads(data);
    }
    if (currentUser) load();
  }, [currentUser, isAdmin]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Leads</h1>
        <Link to="/leads/add" className="btn-primary">Ajouter un lead</Link>
      </div>
      <div className="grid gap-3">
        {leads.map((l) => (
          <Link key={l.id} to={`/leads/${l.id}`} className="card hover:bg-gray-50">
            <div className="font-medium">{l.firstName} {l.lastName}</div>
            <div className="text-sm text-gray-500">{l.status || '—'}</div>
          </Link>
        ))}
        {leads.length === 0 && (
          <div className="text-gray-500">Aucun lead pour le moment.</div>
        )}
      </div>
    </div>
  );
};

export default LeadsPage;
