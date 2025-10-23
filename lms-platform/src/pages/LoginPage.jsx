import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import { Building2, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo et titre */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-600 rounded-2xl p-4">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            LBW Learning Platform
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Système de gestion des leads commerciaux
          </p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Connexion
            </h3>
            <p className="text-sm text-gray-500">
              Connectez-vous pour accéder à votre espace
            </p>
          </div>

          <LoginForm />

          {/* Message d'aide */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-900 font-medium">Mode démo</p>
                <p className="text-blue-700 mt-1">
                  Pour tester l'application, créez d'abord un compte ou utilisez vos identifiants existants.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 LBW Learning. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;