export const USER_ROLES = {
  COMMERCIAL: 'commercial',
  ADMIN: 'admin'
} as const;

export const LEAD_STATUS = {
  NEW: 'nouveau',
  CONTACTED: 'contacté',
  QUALIFIED: 'qualifié',
  NEGOTIATION: 'en_négociation',
  CONVERTED: 'converti',
  LOST: 'perdu'
} as const;

export const LEAD_SOURCES = [
  'Terrain',
  'Réseaux Sociaux',
  'Événement',
  'Recommandation',
  'Site Web',
  'Publicité',
  'Autre'
] as const;

export const INTERACTION_TYPES = [
  'Appel',
  'Email',
  'SMS',
  'Rencontre Physique',
  'WhatsApp',
  'Autre'
] as const;

export const SENTIMENT_OPTIONS = [
  'Très positif',
  'Positif',
  'Neutre',
  'Négatif',
  'Très négatif'
] as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type LeadStatus = typeof LEAD_STATUS[keyof typeof LEAD_STATUS];
export type LeadSource = typeof LEAD_SOURCES[number];
export type InteractionType = typeof INTERACTION_TYPES[number];
export type SentimentOption = typeof SENTIMENT_OPTIONS[number];