import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInteractions } from '../../hooks/useInteractions';
import { useNotification } from '../../contexts/NotificationContext';
import { INTERACTION_TYPES, SENTIMENT_OPTIONS } from '../../config/constants';
import Button from '../common/Button';
import Input from '../common/Input';

const InteractionForm = ({ leadId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { createInteraction } = useInteractions(leadId);
  const { success, error: showError } = useNotification();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createInteraction({
        leadId,
        type: data.type,
        content: data.content,
        sentiment: data.sentiment,
        nextSteps: data.nextSteps
      });
      
      if (result.success) {
        success('Interaction ajoutée avec succès');
        reset();
        onSuccess?.();
      } else {
        showError(result.error || 'Erreur lors de l\'ajout de l\'interaction');
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type d'interaction
        </label>
        <select
          {...register('type', { required: 'Le type est requis' })}
          className="input-field"
        >
          <option value="">Sélectionner un type</option>
          {INTERACTION_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.type && (
          <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contenu / Notes
        </label>
        <textarea
          {...register('content', { required: 'Le contenu est requis' })}
          rows={4}
          className="input-field"
          placeholder="Décrivez l'interaction..."
        />
        {errors.content && (
          <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sentiment général
        </label>
        <select
          {...register('sentiment')}
          className="input-field"
        >
          <option value="">Sélectionner un sentiment</option>
          {SENTIMENT_OPTIONS.map(sentiment => (
            <option key={sentiment} value={sentiment}>{sentiment}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prochaines étapes
        </label>
        <textarea
          {...register('nextSteps')}
          rows={3}
          className="input-field"
          placeholder="Quelles sont les prochaines étapes ?"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
        >
          Effacer
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          Ajouter l'interaction
        </Button>
      </div>
    </form>
  );
};

export default InteractionForm;