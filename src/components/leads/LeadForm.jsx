import React from 'react';
import { useForm } from 'react-hook-form';
import { LEAD_SOURCES } from '../../config/constants';
import Button from '../common/Button';
import Input from '../common/Input';

const LeadForm = ({ onSubmit, loading = false, initialData = null }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Prénom"
          required
          {...register('firstName', { required: 'Le prénom est requis' })}
          error={errors.firstName?.message}
        />
        
        <Input
          label="Nom"
          required
          {...register('lastName', { required: 'Le nom est requis' })}
          error={errors.lastName?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Téléphone"
          type="tel"
          {...register('phone')}
          error={errors.phone?.message}
        />
        
        <Input
          label="Email"
          type="email"
          {...register('email', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalide'
            }
          })}
          error={errors.email?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Entreprise"
          {...register('company')}
          error={errors.company?.message}
        />
        
        <Input
          label="Fonction/Titre"
          {...register('jobTitle')}
          error={errors.jobTitle?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Source du lead
        </label>
        <select
          {...register('source', { required: 'La source est requise' })}
          className="input-field"
        >
          <option value="">Sélectionner une source</option>
          {LEAD_SOURCES.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
        {errors.source && (
          <p className="text-sm text-red-600 mt-1">{errors.source.message}</p>
        )}
      </div>

      <div>
        <Input
          label="Produit d'intérêt"
          {...register('productInterest')}
          error={errors.productInterest?.message}
          helperText="Quel produit ou service intéresse ce prospect ?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date de prospection
        </label>
        <input
          type="date"
          {...register('prospectionDate')}
          className="input-field"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {initialData ? 'Mettre à jour' : 'Créer le lead'}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;