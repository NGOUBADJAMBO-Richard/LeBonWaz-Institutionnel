import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';
import { authService } from '../../services/authService';
import Input from '../common/Input';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères';
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    // Validation du téléphone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Validation de la confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await authService.register(
        formData.email,
        formData.password,
        {
          name: formData.name,
          phone: formData.phone,
          role: 'commercial' // Toujours commercial pour l'inscription publique
        }
      );

      if (result.success) {
        showSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        navigate('/login');
      } else {
        // Gestion des erreurs Firebase
        let errorMessage = 'Erreur lors de l\'inscription';
        
        if (result.error.includes('email-already-in-use')) {
          errorMessage = 'Cet email est déjà utilisé';
        } else if (result.error.includes('weak-password')) {
          errorMessage = 'Le mot de passe est trop faible';
        } else if (result.error.includes('invalid-email')) {
          errorMessage = 'Email invalide';
        }
        
        showError(errorMessage);
      }
    } catch (error) {
      console.error('Registration error:', error);
      showError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nom complet"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Jean Dupont"
        error={errors.name}
        required
      />

      <Input
        label="Email professionnel"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="jean.dupont@entreprise.com"
        error={errors.email}
        required
      />

      <Input
        label="Téléphone"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+241 XX XX XX XX"
        error={errors.phone}
        required
      />

      <Input
        label="Mot de passe"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.password}
        required
      />

      <Input
        label="Confirmer le mot de passe"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.confirmPassword}
        required
      />

      <div className="pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" />
              <span>Inscription...</span>
            </div>
          ) : (
            'S\'inscrire'
          )}
        </Button>
      </div>

      <div className="text-sm text-gray-600 text-center pt-2">
        <p>
          En vous inscrivant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
