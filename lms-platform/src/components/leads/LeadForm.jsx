import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { leadService } from '../../services/leadService';
import { LEAD_SOURCES, LEAD_STATUS } from '../../config/constants';
import Button from '../common/Button';
import Input from '../common/Input';

const LeadForm = ({ initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    company: initialData?.company || '',
    jobTitle: initialData?.jobTitle || '',
    productInterest: initialData?.productInterest || '',
    source: initialData?.source || '',
    prospectionDate: initialData?.prospectionDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'nouveau'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { currentUser } = useAuth();
  const { success, error: showError } = useNotification();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName) newErrors.lastName = 'Le nom est requis';
    if (!formData.phone) newErrors.phone = 'Le téléphone est requis';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await leadService.createLead(formData, currentUser.uid);
      
      if (result.success) {
        success('Lead créé avec succès !');
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/leads');
        }
      } else {
        showError(result.error || 'Erreur lors de la création du lead');
      }
    } catch (err) {
      showError('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Téléphone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Entreprise"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        <Input
          label="Fonction"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />
      </div>

      <Input
        label="Produit d'intérêt"
        name="productInterest"
        value={formData.productInterest}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            <option value="">Sélectionner une source</option>
            {LEAD_SOURCES.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>

        <Input
          label="Date de prospection"
          type="date"
          name="prospectionDate"
          value={formData.prospectionDate}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end space-x-4">
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
          disabled={loading}
        >
          Créer le Lead
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;
