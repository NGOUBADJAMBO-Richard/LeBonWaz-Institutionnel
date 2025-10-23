import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { LEAD_SOURCES } from '../config/constants';
import { ArrowLeft, Save } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Navigation from '../components/common/Navigation';

const AddLeadPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    productInterest: '',
    source: '',
    prospectionDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await leadService.createLead(formData, currentUser.uid);
      
      if (result.success) {
        navigate('/leads');
      } else {
        setError(result.error || 'Erreur lors de la création du lead');
      }
    } catch (error) {
      setError('Erreur lors de la création du lead');
      console.error('Error creating lead:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="outline"
              onClick={() => navigate('/leads')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Nouveau Lead
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

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
                    required
                    placeholder="Jean"
                  />
                  <Input
                    label="Nom"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Dupont"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Informations de contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="jean.dupont@example.com"
                  />
                  <Input
                    label="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
              </div>

              {/* Entreprise */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Informations entreprise
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nom de l'entreprise"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Entreprise ABC"
                  />
                  <Input
                    label="Fonction/Titre"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Directeur Commercial"
                  />
                </div>
              </div>

              {/* Intérêt et source */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Détails du lead
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      Produit d'intérêt
                    </label>
                    <input
                      type="text"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Formation en management"
                    />
                  </div>
                  
                  <div>
                    <label className="label">
                      Source du lead
                    </label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Sélectionner une source</option>
                      {LEAD_SOURCES.map(source => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label">
                      Date de prospection
                    </label>
                    <input
                      type="date"
                      name="prospectionDate"
                      value={formData.prospectionDate}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/leads')}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Créer le lead
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddLeadPage;