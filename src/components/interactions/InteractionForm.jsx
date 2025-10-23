import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { INTERACTION_TYPES, SENTIMENT_OPTIONS } from '../../config/constants';

const InteractionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    content: '',
    sentiment: '',
    nextSteps: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type) {
      newErrors.type = 'Le type d\'interaction est requis';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Le contenu de l\'interaction est requis';
    }
    
    if (!formData.sentiment) {
      newErrors.sentiment = 'Le sentiment est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erreur soumission interaction:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Type d'interaction */}
      <Select
        label="Type d'interaction"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={INTERACTION_TYPES}
        error={errors.type}
        required
      />
      
      {/* Contenu */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contenu de l'interaction *
        </label>
        <textarea
          name="content"
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Décrivez l'interaction, les points discutés, les informations obtenues..."
          value={formData.content}
          onChange={handleChange}
        />
        {errors.content && (
          <p className="text-sm text-red-600 mt-1">{errors.content}</p>
        )}
      </div>
      
      {/* Sentiment */}
      <Select
        label="Sentiment général"
        name="sentiment"
        value={formData.sentiment}
        onChange={handleChange}
        options={SENTIMENT_OPTIONS}
        error={errors.sentiment}
        required
      />
      
      {/* Prochaines étapes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prochaines étapes
        </label>
        <textarea
          name="nextSteps"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="Actions à prévoir, relances, rendez-vous..."
          value={formData.nextSteps}
          onChange={handleChange}
        />
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Annuler
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