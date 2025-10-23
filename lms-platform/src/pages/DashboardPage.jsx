import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { currentUser, userRole } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Connecté en tant que: {userRole}
              </span>
              <button
                onClick={() => window.location.reload()}
                className="btn-secondary"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Bienvenue, {currentUser?.email} !
            </h2>
            <p className="text-gray-600">
              Vous êtes connecté à la plateforme LMS. Votre rôle est : <strong>{userRole}</strong>
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">Leads</h3>
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-sm text-blue-700">Nouveaux leads</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900">Conversions</h3>
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-green-700">Ce mois</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-900">Interactions</h3>
                <p className="text-2xl font-bold text-yellow-600">0</p>
                <p className="text-sm text-yellow-700">Aujourd'hui</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;