import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Settings, BarChart3 } from 'lucide-react';

const AdminPage = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
          <p className="mt-2 text-gray-600">
            Gestion des utilisateurs et configuration du système
          </p>
        </div>

        {/* Admin Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Gestion des utilisateurs</h3>
                <p className="text-gray-600">Créer et gérer les comptes commerciaux</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Rapports avancés</h3>
                <p className="text-gray-600">Analyses détaillées et performances</p>
              </div>
            </div>
          </div>

          <div className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
                <p className="text-gray-600">Paramètres du système et intégrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 card">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Settings className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Fonctionnalités d'administration</h3>
            <p className="text-gray-600">
              Les fonctionnalités d'administration avancées seront disponibles dans une prochaine version.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;