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
  [LEAD_STATUS.NEW]: 'bg-blue-100 text-blue-800',
  [LEAD_STATUS.CONTACTED]: 'bg-yellow-100 text-yellow-800',
  [LEAD_STATUS.QUALIFIED]: 'bg-purple-100 text-purple-800',
  [LEAD_STATUS.NEGOTIATION]: 'bg-orange-100 text-orange-800',
  [LEAD_STATUS.CONVERTED]: 'bg-green-100 text-green-800',
  [LEAD_STATUS.LOST]: 'bg-red-100 text-red-800'
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
  'Très positif': 'bg-green-100 text-green-800',
  'Positif': 'bg-green-50 text-green-700',
  'Neutre': 'bg-gray-100 text-gray-800',
  'Négatif': 'bg-red-50 text-red-700',
  'Très négatif': 'bg-red-100 text-red-800'
};