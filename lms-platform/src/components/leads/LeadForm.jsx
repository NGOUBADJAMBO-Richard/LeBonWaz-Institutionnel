import React from 'react';
import Input from '../common/Input';
import { LEAD_SOURCES } from '../../config/constants';

const LeadForm = ({ register }) => {
  return (
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
  );
};

export default LeadForm;
