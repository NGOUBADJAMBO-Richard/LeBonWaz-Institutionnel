import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const PrivateRoute = ({ children, requiredRole = null }) => {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default PrivateRoute;