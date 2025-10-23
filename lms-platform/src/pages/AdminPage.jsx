import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Settings, BarChart3, Shield } from 'lucide-react';
import Button from '../components/common/Button';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-600">Gérez les utilisateurs et les paramètres de la plateforme</p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-primary-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Gestion des utilisateurs</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Ajoutez, modifiez ou supprimez des utilisateurs commerciaux.
            </p>
            <Button variant="outline">
              Gérer les utilisateurs
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Statistiques globales</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Consultez les performances de tous les commerciaux.
            </p>
            <Button variant="outline">
              Voir les statistiques
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Paramètres</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Configurez les paramètres de la plateforme.
            </p>
            <Button variant="outline">
              Accéder aux paramètres
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-red-600 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Sécurité</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Gérez les permissions et la sécurité.
            </p>
            <Button variant="outline">
              Paramètres de sécurité
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;