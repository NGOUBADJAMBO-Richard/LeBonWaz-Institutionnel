import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';

const StatCard = ({ title, value }) => (
  <div className="card">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
  </div>
);

const DashboardPage = () => {
  const { currentUser, isAdmin } = useAuth();
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    async function load() {
      const leads = isAdmin
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser?.uid);
      setStats({ total: leads.length });
    }
    if (currentUser) load();
  }, [currentUser, isAdmin]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Leads" value={stats.total} />
      </div>
    </div>
  );
};

export default DashboardPage;
