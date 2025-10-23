import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import { Users, TrendingUp, Phone, Mail } from 'lucide-react';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Navigation from '../components/common/Navigation';

const DashboardPage = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    totalInteractions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Charger les leads
      const leads = isAdmin 
        ? await leadService.getAllLeads()
        : await leadService.getLeadsByUser(currentUser.uid);
      
      // Charger les interactions
      const interactions = await interactionService.getInteractionsByUser(currentUser.uid);
      
      // Calculer les statistiques
      const newLeads = leads.filter(lead => lead.status === 'nouveau').length;
      const convertedLeads = leads.filter(lead => lead.status === 'converti').length;
      
      setStats({
        totalLeads: leads.length,
        newLeads,
        convertedLeads,
        totalInteractions: interactions.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bonjour, {currentUser?.email?.split('@')[0]} !
            </h2>
            <p className="text-gray-600">
              Voici un aperçu de votre activité commerciale
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Leads</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.totalLeads}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Nouveaux Leads</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.newLeads}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Phone className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Leads Convertis</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.convertedLeads}
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Interactions</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.totalInteractions}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Actions Rapides
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Voir tous les leads
                </Button>
                <Button variant="secondary" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Ajouter un nouveau lead
                </Button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Activité Récente
              </h3>
              <p className="text-gray-500 text-sm">
                Aucune activité récente à afficher
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;