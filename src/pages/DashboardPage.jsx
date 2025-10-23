import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ConversionChart from '../components/dashboard/ConversionChart';
import LeadCard from '../components/leads/LeadCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Users, Target, TrendingUp, CheckCircle } from 'lucide-react';

const DashboardPage = () => {
  const { stats, recentLeads, leadsEvolution, loading } = useDashboard();
  const { isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Chargement du tableau de bord..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            {isAdmin ? 'Vue d\'ensemble de tous les leads' : 'Vos leads et performances'}
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total des leads"
              value={stats.totalLeads}
              icon={Users}
            />
            <StatCard
              title="Nouveaux leads"
              value={stats.newLeads}
              icon={Target}
              change={`+${stats.newLeads} ce mois`}
              changeType="positive"
            />
            <StatCard
              title="Leads convertis"
              value={stats.convertedLeads}
              icon={CheckCircle}
              change={`${stats.conversionRate}% de conversion`}
              changeType={stats.conversionRate > 20 ? 'positive' : 'neutral'}
            />
            <StatCard
              title="Taux de conversion"
              value={`${stats.conversionRate}%`}
              icon={TrendingUp}
              changeType={stats.conversionRate > 20 ? 'positive' : 'neutral'}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <ConversionChart data={leadsEvolution} />
          </div>

          {/* Recent Leads */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads récents</h3>
            {recentLeads && recentLeads.length > 0 ? (
              <div className="space-y-4">
                {recentLeads.map(lead => (
                  <div key={lead.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {lead.firstName} {lead.lastName}
                        </p>
                        <p className="text-sm text-gray-600">{lead.company}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'nouveau' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacté' ? 'bg-yellow-100 text-yellow-800' :
                        lead.status === 'qualifié' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Aucun lead récent</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;