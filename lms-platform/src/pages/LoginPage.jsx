import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNotification } from '../contexts/NotificationContext';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const { show } = useNotification();

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      show('Connexion réussie', 'success');
    } catch (e) {
      show(e.message || 'Erreur de connexion', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Connexion</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" {...register('email', { required: true })} />
          <Input label="Mot de passe" type="password" {...register('password', { required: true })} />
          <Button type="submit" className="w-full">Se connecter</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
