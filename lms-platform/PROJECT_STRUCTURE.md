# 📁 Structure Complète du Projet LMS

## 🗂️ Organisation des Fichiers

```
lms-platform/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── assets/
│   │   ├── images/          # Images statiques
│   │   └── icons/           # Icônes personnalisées
│   │
│   ├── components/
│   │   ├── common/          # Composants réutilisables
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   │
│   │   ├── auth/            # Composants d'authentification
│   │   │   ├── LoginForm.jsx
│   │   │   └── PrivateRoute.jsx
│   │   │
│   │   ├── dashboard/       # Composants du dashboard
│   │   │   ├── StatCard.jsx
│   │   │   └── ConversionChart.jsx
│   │   │
│   │   ├── leads/           # Composants de gestion des leads
│   │   │   ├── LeadForm.jsx
│   │   │   ├── LeadList.jsx
│   │   │   ├── LeadCard.jsx
│   │   │   ├── LeadDetail.jsx
│   │   │   └── LeadFilters.jsx
│   │   │
│   │   └── interactions/    # Composants d'interactions
│   │       ├── InteractionForm.jsx
│   │       ├── InteractionList.jsx
│   │       └── InteractionCard.jsx
│   │
│   ├── config/              # Configuration
│   │   ├── firebase.js      # Configuration Firebase
│   │   └── constants.js     # Constantes de l'application
│   │
│   ├── contexts/            # Contextes React
│   │   ├── AuthContext.jsx  # Contexte d'authentification
│   │   └── NotificationContext.jsx
│   │
│   ├── hooks/               # Hooks personnalisés
│   │   ├── useAuth.js
│   │   ├── useLeads.js
│   │   ├── useInteractions.js
│   │   └── useDashboard.js
│   │
│   ├── services/            # Services de données
│   │   ├── authService.js
│   │   ├── leadService.js
│   │   ├── interactionService.js
│   │   └── dashboardService.js
│   │
│   ├── utils/               # Utilitaires
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── helpers.js
│   │
│   ├── pages/               # Pages de l'application
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LeadsPage.jsx
│   │   ├── LeadDetailPage.jsx
│   │   ├── AddLeadPage.jsx
│   │   └── AdminPage.jsx
│   │
│   ├── App.jsx              # Composant principal
│   ├── index.js             # Point d'entrée
│   └── index.css            # Styles globaux
│
├── firestore.rules          # Règles de sécurité Firestore
├── firestore.indexes.json   # Index Firestore
├── firebase.json            # Configuration Firebase
├── .env                     # Variables d'environnement
├── .env.example             # Exemple de configuration
├── tailwind.config.js       # Configuration Tailwind
├── postcss.config.js        # Configuration PostCSS
├── package.json             # Dépendances et scripts
├── setup-firebase.js        # Script de configuration
├── test-firebase.js         # Script de test
├── README.md                # Documentation principale
├── QUICK_START.md           # Guide de démarrage rapide
├── TROUBLESHOOTING.md       # Guide de résolution des problèmes
└── PROJECT_STRUCTURE.md     # Ce fichier
```

## 🗄️ Structure de la Base de Données

### Collections Firestore

#### `users`
```javascript
{
  uid: string,           // Firebase Auth UID
  email: string,         // Email unique
  firstName: string,     // Prénom
  lastName: string,      // Nom
  role: string,          // 'admin' | 'commercial'
  createdAt: timestamp,  // Date de création
  lastLogin: timestamp,  // Dernière connexion
  phoneNumber?: string   // Téléphone (optionnel)
}
```

#### `leads`
```javascript
{
  leadId: string,              // ID du prospect
  firstName: string,           // Prénom du prospect
  lastName: string,            // Nom du prospect
  phone: string,               // Téléphone
  email: string,               // Email
  company: string,             // Nom entreprise
  jobTitle: string,            // Fonction/Titre
  productInterest: string,     // Produit d'intérêt
  source: string,              // Source du lead
  status: string,              // Statut actuel
  assignedToUserId: string,    // ID du commercial
  prospectionDate: timestamp,  // Date de prospection
  createdAt: timestamp,        // Date de création
  updatedAt: timestamp,        // Dernière modification
  createdBy: string            // ID créateur
}
```

#### `interactions`
```javascript
{
  interactionId: string,    // ID interaction
  leadId: string,           // ID du prospect
  userId: string,           // ID du commercial
  type: string,             // Type d'interaction
  content: string,          // Contenu/Notes
  sentiment: string,        // Sentiment général
  nextSteps: string,        // Prochaines étapes
  createdAt: timestamp,     // Date et heure
  isReadOnly: boolean       // Immuable
}
```

#### `leadStatusHistory`
```javascript
{
  historyId: string,        // ID historique
  leadId: string,           // ID du prospect
  previousStatus: string,   // Ancien statut
  newStatus: string,        // Nouveau statut
  changedBy: string,        // ID utilisateur
  changedAt: timestamp,     // Date du changement
  reason?: string           // Raison (optionnel)
}
```

## 🔧 Scripts Disponibles

```bash
# Développement
npm start                 # Démarrer le serveur de développement
npm run build            # Build pour production
npm test                 # Lancer les tests

# Configuration
node test-firebase.js    # Tester la configuration Firebase
node setup-firebase.js   # Créer l'utilisateur admin (nécessite Admin SDK)

# Firebase
firebase login           # Se connecter à Firebase
firebase init            # Initialiser le projet
firebase deploy          # Déployer l'application
```

## 🎨 Technologies Utilisées

- **Frontend** : React 18, React Router, Tailwind CSS
- **Backend** : Firebase (Auth + Firestore)
- **Icônes** : Lucide React
- **Formulaires** : React Hook Form
- **Dates** : date-fns
- **Graphiques** : Recharts
- **Build** : Create React App

## 🔒 Sécurité

- Authentification Firebase
- Règles Firestore sécurisées
- Validation côté client et serveur
- Gestion des rôles utilisateurs
- Protection des routes privées