import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../common/Button';
import Input from '../common/Input';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login, error } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        showSuccess('Connexion réussie !');
        navigate('/dashboard');
      } else {
        showError(result.error || 'Erreur de connexion');
      }
    } catch (error) {
      showError('Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <LogIn className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Plateforme de gestion commerciale LMS
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Adresse email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre.email@exemple.com"
              required
            />
            
            <div className="relative">
              <Input
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={!formData.email || !formData.password}
          >
            Se connecter
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Comptes de test disponibles :
            </p>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p>Commercial: commercial@lms.com / password123</p>
              <p>Admin: admin@lms.com / password123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;