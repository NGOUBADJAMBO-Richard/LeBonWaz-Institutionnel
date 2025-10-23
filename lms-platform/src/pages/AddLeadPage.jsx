import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { leadService } from '../services/leadService';
import { LEAD_SOURCES } from '../config/constants';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const AddLeadPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    source: 'Terrain',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await leadService.createLead(formData, currentUser.uid);
      
      if (result.success) {
        showSuccess('Lead créé avec succès !');
        navigate('/leads');
      } else {
        showError('Erreur lors de la création du lead');
      }
    } catch (error) {
      showError('Erreur lors de la création du lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/leads')}
            >
              <ArrowLeft size={18} className="mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Ajouter un Lead
            </h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nom complet"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jean Dupont"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jean.dupont@email.com"
              required
            />

            <Input
              label="Téléphone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+241 XX XX XX XX"
              required
            />

            <Input
              label="Entreprise"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nom de l'entreprise"
              required
            />

            <Input
              label="Poste"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Directeur Commercial"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source <span className="text-red-500">*</span>
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
                className="input-field"
              >
                {LEAD_SOURCES.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Informations complémentaires..."
                className="input-field resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Création...' : 'Créer le Lead'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/leads')}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddLeadPage;
