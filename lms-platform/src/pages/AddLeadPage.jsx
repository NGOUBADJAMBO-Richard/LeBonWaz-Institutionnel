import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { LEAD_SOURCES } from '../config/constants';
import { 
  ArrowLeft, 
  Save, 
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const AddLeadPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    entreprise: '',
    poste: '',
    email: '',
    telephone: '',
    source: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await leadService.createLead(formData, currentUser.uid);
      if (result.success) {
        navigate(`/leads/${result.id}`);
      } else {
        setError(result.error || 'Erreur lors de la création du lead');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Nouveau Lead</h1>
          <p className="text-gray-600">Ajoutez un nouveau prospect à votre base</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className="label">
                    Prénom *
                  </label>
                  <Input
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    placeholder="Jean"
                    icon={<User className="w-5 h-5 text-gray-400" />}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nom" className="label">
                    Nom *
                  </label>
                  <Input
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Dupont"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Informations professionnelles */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informations professionnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="entreprise" className="label">
                    Entreprise *
                  </label>
                  <Input
                    id="entreprise"
                    name="entreprise"
                    value={formData.entreprise}
                    onChange={handleChange}
                    placeholder="Société ABC"
                    icon={<Building2 className="w-5 h-5 text-gray-400" />}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="poste" className="label">
                    Poste
                  </label>
                  <Input
                    id="poste"
                    name="poste"
                    value={formData.poste}
                    onChange={handleChange}
                    placeholder="Directeur Commercial"
                  />
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Coordonnées
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="label">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean.dupont@exemple.com"
                    icon={<Mail className="w-5 h-5 text-gray-400" />}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="label">
                    Téléphone
                  </label>
                  <Input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+241 01 23 45 67"
                    icon={<Phone className="w-5 h-5 text-gray-400" />}
                  />
                </div>
              </div>
            </div>

            {/* Source */}
            <div>
              <label htmlFor="source" className="label">
                Source du lead *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
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
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="label">
                Notes
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Informations complémentaires sur ce lead..."
                  rows={4}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Boutons */}
            <div className="flex items-center justify-end space-x-4 pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                icon={<Save className="w-5 h-5" />}
              >
                Enregistrer le lead
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeadPage;