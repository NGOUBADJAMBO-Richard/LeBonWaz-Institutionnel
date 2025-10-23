import React from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { INTERACTION_TYPES, SENTIMENT_OPTIONS } from '../../config/constants';

const InteractionForm = ({ register, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select className="input-field" {...register('type')}>
          {INTERACTION_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <Input label="Contenu/Notes" {...register('content', { required: true })} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sentiment</label>
        <select className="input-field" {...register('sentiment')}>
          {SENTIMENT_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <Input label="Prochaines étapes" {...register('nextSteps')} />
      <Button type="submit">Ajouter</Button>
    </form>
  );
};

export default InteractionForm;
