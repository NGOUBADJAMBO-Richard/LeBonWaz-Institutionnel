export const USER_ROLES = {
  COMMERCIAL: 'commercial',
  ADMIN: 'admin'
};

export const LEAD_STATUS = {
  NEW: 'nouveau',
  CONTACTED: 'contacté',
  QUALIFIED: 'qualifié',
  NEGOTIATION: 'en_négociation',
  CONVERTED: 'converti',
  LOST: 'perdu'
};

export const LEAD_STATUS_COLORS = {
  nouveau: 'bg-blue-100 text-blue-800',
  contacté: 'bg-yellow-100 text-yellow-800',
  qualifié: 'bg-purple-100 text-purple-800',
  en_négociation: 'bg-orange-100 text-orange-800',
  converti: 'bg-green-100 text-green-800',
  perdu: 'bg-red-100 text-red-800'
};

export const LEAD_SOURCES = [
  'Terrain',
  'Réseaux Sociaux',
  'Événement',
  'Recommandation',
  'Site Web',
  'Publicité',
  'Autre'
];

export const INTERACTION_TYPES = [
  'Appel',
  'Email',
  'SMS',
  'Rencontre Physique',
  'WhatsApp',
  'Autre'
];

export const SENTIMENT_OPTIONS = [
  'Très positif',
  'Positif',
  'Neutre',
  'Négatif',
  'Très négatif'
];

export const SENTIMENT_COLORS = {
  'Très positif': 'text-green-600',
  'Positif': 'text-green-500',
  'Neutre': 'text-gray-500',
  'Négatif': 'text-orange-500',
  'Très négatif': 'text-red-600'
};