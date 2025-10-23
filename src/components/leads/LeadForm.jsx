import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import Select from '../common/Select';
import { LEAD_SOURCES } from '../../config/constants';

const LeadForm = ({ lead = null, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: lead?.firstName || '',
    lastName: lead?.lastName || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    company: lead?.company || '',
    jobTitle: lead?.jobTitle || '',
    productInterest: lead?.productInterest || '',
    source: lead?.source || '',
    notes: lead?.notes || ''
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }
    
    if (!formData.source) {
      newErrors.source = 'La source est requise';
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
      // Ajouter la date de prospection
      const leadData = {
        ...formData,
        prospectionDate: new Date().toISOString()
      };
      
      await onSubmit(leadData);
    } catch (error) {
      console.error('Erreur soumission formulaire:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations personnelles */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Informations personnelles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          
          <Input
            label="Nom"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          
          <Input
            label="Téléphone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
        </div>
      </div>
      
      {/* Informations professionnelles */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Informations professionnelles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Entreprise"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={errors.company}
          />
          
          <Input
            label="Fonction/Titre"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            error={errors.jobTitle}
          />
        </div>
      </div>
      
      {/* Informations commerciales */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Informations commerciales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Produit d'intérêt"
            name="productInterest"
            value={formData.productInterest}
            onChange={handleChange}
            error={errors.productInterest}
            placeholder="Ex: Formation, Consulting, Logiciel..."
          />
          
          <Select
            label="Source du lead"
            name="source"
            value={formData.source}
            onChange={handleChange}
            options={LEAD_SOURCES}
            error={errors.source}
            required
          />
        </div>
      </div>
      
      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes additionnelles
        </label>
        <textarea
          name="notes"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="Informations complémentaires, contexte de la prise de contact..."
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/leads')}
        >
          Annuler
        </Button>
        
        <Button
          type="submit"
          loading={loading}
        >
          {lead ? 'Mettre à jour' : 'Ajouter le prospect'}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;