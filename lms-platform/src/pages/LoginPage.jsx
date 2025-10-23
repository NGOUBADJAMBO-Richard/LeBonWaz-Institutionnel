import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LMS Platform
          </h1>
          <p className="text-gray-600">
            Connectez-vous pour gérer vos leads
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Besoin d'aide ? Contactez l'administrateur</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
