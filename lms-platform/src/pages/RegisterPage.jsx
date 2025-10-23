import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import { UserPlus } from 'lucide-react';

const RegisterPage = () => {
  const { currentUser } = useAuth();

  // Rediriger si déjà connecté
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600">
            Rejoignez l'équipe commerciale
          </p>
        </div>
        
        {/* Formulaire */}
        <RegisterForm />
        
        {/* Lien vers connexion */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link 
              to="/login" 
              className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>

        {/* Note pour les admins */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <span className="font-semibold">Note:</span> Cette inscription est réservée aux commerciaux. 
            Les comptes administrateurs sont créés par un administrateur système.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
