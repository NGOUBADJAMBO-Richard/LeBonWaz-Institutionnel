import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from '../common/Button';
import Input from '../common/Input';

const LoginForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { error: showError } = useNotification();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        onSuccess?.();
      } else {
        showError(result.error || 'Erreur de connexion');
      }
    } catch (error) {
      showError('Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="Email"
          type="email"
          required
          {...register('email', { 
            required: 'L\'email est requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalide'
            }
          })}
          error={errors.email?.message}
        />
      </div>

      <div>
        <Input
          label="Mot de passe"
          type="password"
          required
          {...register('password', { 
            required: 'Le mot de passe est requis',
            minLength: {
              value: 6,
              message: 'Le mot de passe doit contenir au moins 6 caractères'
            }
          })}
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        loading={loading}
        className="w-full"
      >
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;