import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { useNotification } from '../contexts/NotificationContext';
import { LEAD_SOURCES } from '../config/constants';

const AddLeadPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useAuth();
  const { show } = useNotification();

  const onSubmit = async (data) => {
    const result = await leadService.createLead(data, currentUser.uid);
    if (result.success) {
      show('Lead créé avec succès', 'success');
      reset();
    } else {
      show(result.error || 'Erreur lors de la création', 'error');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Ajouter un lead</h1>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Prénom" {...register('firstName', { required: true })} />
            <Input label="Nom" {...register('lastName', { required: true })} />
            <Input label="Téléphone" {...register('phone')} />
            <Input label="Email" type="email" {...register('email')} />
            <Input label="Entreprise" {...register('company')} />
            <Input label="Fonction" {...register('jobTitle')} />
            <Input label="Produit d'intérêt" {...register('productInterest')} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select className="input-field" {...register('source')}>
                {LEAD_SOURCES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadPage;
