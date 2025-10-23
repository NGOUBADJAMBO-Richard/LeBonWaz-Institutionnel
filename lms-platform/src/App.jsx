import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import LeadDetailPage from './pages/LeadDetailPage';
import AddLeadPage from './pages/AddLeadPage';
import AdminPage from './pages/AdminPage';

function App() {
  useEffect(() => {
    // Vérifier si le fichier .env existe
    if (!process.env.REACT_APP_FIREBASE_API_KEY) {
      console.error('⚠️ ATTENTION: Fichier .env manquant ou incomplet !');
      console.error('👉 Créez un fichier .env à la racine du projet lms-platform');
      console.error('👉 Copiez le contenu de .env.example et ajoutez vos clés Firebase');
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/leads"
            element={
              <PrivateRoute>
                <LeadsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/leads/add"
            element={
              <PrivateRoute>
                <AddLeadPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/leads/:id"
            element={
              <PrivateRoute>
                <LeadDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute requireAdmin>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;