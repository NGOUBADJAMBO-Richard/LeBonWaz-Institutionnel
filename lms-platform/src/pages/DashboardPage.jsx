import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Plus, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import CommercialDashboard from '../components/dashboard/CommercialDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import Button from '../components/common/Button';

const DashboardPage = () => {
  const { currentUser, userProfile, isAdmin, logout } = useAuth();
  const { success } = useNotification();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    success('Déconnexion réussie');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-100 rounded-lg p-2">
                <LayoutDashboard className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Tableau de Bord
                </h1>
                <p className="text-sm text-gray-600">
                  Bienvenue, {userProfile?.firstName} {userProfile?.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/leads')}
              >
                <Users className="mr-2 h-5 w-5" />
                Mes Leads
              </Button>
              <Button
                onClick={() => navigate('/leads/add')}
              >
                <Plus className="mr-2 h-5 w-5" />
                Nouveau Lead
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Badge */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <User className="mr-2 h-4 w-4" />
            {isAdmin ? 'Administrateur' : 'Commercial'}
          </span>
        </div>

        {/* Dashboard Content */}
        {isAdmin ? <AdminDashboard /> : <CommercialDashboard />}
      </main>
    </div>
  );
};

export default DashboardPage;
