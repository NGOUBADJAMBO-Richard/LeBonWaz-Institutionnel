import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { leadService } from '../services/leadService';
import { interactionService } from '../services/interactionService';
import { 
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  MessageSquare,
  Plus,
  Edit
} from 'lucide-react';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { LEAD_STATUS_COLORS, INTERACTION_TYPES, SENTIMENT_OPTIONS, SENTIMENT_COLORS } from '../config/constants';

const LeadDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInteractionForm, setShowInteractionForm] = useState(false);
  const [interactionForm, setInteractionForm] = useState({
    type: '',
    description: '',
    sentiment: 'Neutre',
    nextAction: '',
    nextActionDate: ''
  });

  useEffect(() => {
    loadLeadData();
  }, [id]);

  const loadLeadData = async () => {
    setLoading(true);
    try {
      const leadData = await leadService.getLeadById(id);
      if (leadData) {
        setLead(leadData);
        const interactionsData = await interactionService.getInteractionsByLead(id);
        setInteractions(interactionsData);
      } else {
        navigate('/leads');
      }
    } catch (error) {
      console.error('Erreur lors du chargement du lead:', error);
      navigate('/leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const result = await leadService.changeStatus(id, newStatus, currentUser.uid);
      if (result.success) {
        setLead(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };

  const handleAddInteraction = async (e) => {
    e.preventDefault();
    try {
      const result = await interactionService.createInteraction(id, currentUser.uid, interactionForm);
      if (result.success) {
        await loadLeadData();
        setShowInteractionForm(false);
        setInteractionForm({
          type: '',
          description: '',
          sentiment: 'Neutre',
          nextAction: '',
          nextActionDate: ''
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'interaction:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!lead) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/leads')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux leads
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations du lead */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {lead.prenom} {lead.nom}
                  </h1>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mt-2 ${LEAD_STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-800'}`}>
                    {lead.status}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit className="w-4 h-4" />}
                >
                  Modifier
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lead.entreprise && (
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Entreprise</p>
                      <p className="font-medium">{lead.entreprise}</p>
                    </div>
                  </div>
                )}
                {lead.poste && (
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Poste</p>
                      <p className="font-medium">{lead.poste}</p>
                    </div>
                  </div>
                )}
                {lead.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{lead.email}</p>
                    </div>
                  </div>
                )}
                {lead.telephone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">{lead.telephone}</p>
                    </div>
                  </div>
                )}
                {lead.source && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Source</p>
                      <p className="font-medium">{lead.source}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Date de création</p>
                    <p className="font-medium">
                      {new Date(lead.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>

              {lead.notes && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Notes</p>
                  <p className="text-gray-700">{lead.notes}</p>
                </div>
              )}
            </div>

            {/* Interactions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Historique des interactions
                </h2>
                <Button
                  size="sm"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => setShowInteractionForm(!showInteractionForm)}
                >
                  Ajouter
                </Button>
              </div>

              {showInteractionForm && (
                <form onSubmit={handleAddInteraction} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="label">Type d'interaction</label>
                      <select
                        value={interactionForm.type}
                        onChange={(e) => setInteractionForm(prev => ({ ...prev, type: e.target.value }))}
                        className="select-field"
                        required
                      >
                        <option value="">Sélectionner</option>
                        {INTERACTION_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Sentiment</label>
                      <select
                        value={interactionForm.sentiment}
                        onChange={(e) => setInteractionForm(prev => ({ ...prev, sentiment: e.target.value }))}
                        className="select-field"
                      >
                        {SENTIMENT_OPTIONS.map(sentiment => (
                          <option key={sentiment} value={sentiment}>{sentiment}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="label">Description</label>
                    <textarea
                      value={interactionForm.description}
                      onChange={(e) => setInteractionForm(prev => ({ ...prev, description: e.target.value }))}
                      className="input-field"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowInteractionForm(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" size="sm">
                      Enregistrer
                    </Button>
                  </div>
                </form>
              )}

              {interactions.length > 0 ? (
                <div className="space-y-4">
                  {interactions.map((interaction) => (
                    <div key={interaction.id} className="border-l-4 border-primary-200 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {interaction.type}
                            </span>
                            {interaction.sentiment && (
                              <span className={`text-sm ${SENTIMENT_COLORS[interaction.sentiment]}`}>
                                • {interaction.sentiment}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-1">{interaction.description}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(interaction.createdAt).toLocaleString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Aucune interaction pour le moment</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="label">Changer le statut</label>
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="select-field"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="contacté">Contacté</option>
                    <option value="qualifié">Qualifié</option>
                    <option value="en_négociation">En négociation</option>
                    <option value="converti">Converti</option>
                    <option value="perdu">Perdu</option>
                  </select>
                </div>

                <Button fullWidth variant="outline" icon={<Mail className="w-4 h-4" />}>
                  Envoyer un email
                </Button>
                <Button fullWidth variant="outline" icon={<Phone className="w-4 h-4" />}>
                  Appeler
                </Button>
                <Button fullWidth variant="outline" icon={<Calendar className="w-4 h-4" />}>
                  Planifier un RDV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;