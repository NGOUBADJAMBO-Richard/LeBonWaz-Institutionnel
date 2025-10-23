import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import PrivateRoute from './components/auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import AddLeadPage from './pages/AddLeadPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
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
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;