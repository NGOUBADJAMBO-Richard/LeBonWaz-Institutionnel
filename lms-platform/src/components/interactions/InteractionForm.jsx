import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { interactionService } from '../../services/interactionService';
import { INTERACTION_TYPES, SENTIMENT_OPTIONS } from '../../config/constants';
import Button from '../common/Button';
import Input from '../common/Input';

const InteractionForm = ({ leadId, onSuccess }) => {
  const [formData, setFormData] = useState({
    type: '',
    content: '',
    sentiment: 'Neutre',
    nextSteps: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { currentUser } = useAuth();
  const { success, error } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.type) newErrors.type = 'Le type d\'interaction est requis';
    if (!formData.content) newErrors.content = 'Le contenu est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await interactionService.createInteraction(
        leadId,
        currentUser.uid,
        formData
      );
      
      if (result.success) {
        success('Interaction ajoutée avec succès');
        setFormData({
          type: '',
          content: '',
          sentiment: 'Neutre',
          nextSteps: ''
        });
        if (onSuccess) onSuccess();
      } else {
        error('Erreur lors de l\'ajout de l\'interaction');
      }
    } catch (err) {
      error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'interaction <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="">Sélectionner un type</option>
            {INTERACTION_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sentiment
          </label>
          <select
            name="sentiment"
            value={formData.sentiment}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            {SENTIMENT_OPTIONS.map(sentiment => (
              <option key={sentiment} value={sentiment}>{sentiment}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes / Contenu <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="4"
          placeholder="Décrivez l'interaction..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prochaines étapes
        </label>
        <textarea
          name="nextSteps"
          value={formData.nextSteps}
          onChange={handleChange}
          rows="2"
          placeholder="Quelles sont les prochaines étapes?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Ajouter l'interaction
        </Button>
      </div>
    </form>
  );
};

export default InteractionForm;
