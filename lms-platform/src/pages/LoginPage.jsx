import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login, error } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    await login(values.email, values.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Connexion</h1>
        {error && <p className="text-danger mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="input-field" type="email" {...register('email', { required: true })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input className="input-field" type="password" {...register('password', { required: true })} />
          </div>
          <button className="btn-primary w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
