import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';

const AddLeadPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (values) => {
    const res = await leadService.createLead(values, currentUser.uid);
    if (res.success) navigate(`/leads/${res.id}`);
  };

  return (
    <div className="p-6">
      <div className="card max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Ajouter un lead</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input-field" placeholder="Prénom" {...register('firstName')} />
            <input className="input-field" placeholder="Nom" {...register('lastName')} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input-field" placeholder="Email" type="email" {...register('email')} />
            <input className="input-field" placeholder="Téléphone" {...register('phone')} />
          </div>
          <input className="input-field" placeholder="Entreprise" {...register('company')} />
          <input className="input-field" placeholder="Fonction/Titre" {...register('jobTitle')} />
          <input className="input-field" placeholder="Produit d'intérêt" {...register('productInterest')} />
          <select className="input-field" {...register('source')}>
            <option>Terrain</option>
            <option>Réseaux Sociaux</option>
            <option>Événement</option>
            <option>Recommandation</option>
            <option>Site Web</option>
            <option>Publicité</option>
            <option>Autre</option>
          </select>
          <button className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Création...' : 'Créer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeadPage;
