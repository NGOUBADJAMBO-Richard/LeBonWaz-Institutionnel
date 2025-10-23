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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Plateforme LMS - Gestion des Leads
          </p>
        </div>
        <div className="card">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;