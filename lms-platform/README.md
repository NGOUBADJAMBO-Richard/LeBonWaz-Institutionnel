# 🎓 LMS Platform - Gestion des Leads

Une plateforme complète de gestion de leads pour les équipes commerciales, construite avec React et Firebase.

## 🚀 Fonctionnalités

### Pour les Commerciaux
- ✅ Tableau de bord avec statistiques personnalisées
- ✅ Gestion complète des leads (création, modification, suivi)
- ✅ Historique des interactions avec chaque lead
- ✅ Changement de statut des leads
- ✅ Filtrage et recherche avancée

### Pour les Administrateurs
- ✅ Vue globale de tous les leads
- ✅ Statistiques d'ensemble
- ✅ Gestion des commerciaux
- ✅ Rapports de performance

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Un compte Firebase

## 🔧 Installation

### 1. Cloner le projet
\`\`\`bash
cd lms-platform
\`\`\`

### 2. Installer les dépendances
\`\`\`bash
npm install
\`\`\`

### 3. Configuration Firebase

1. Créez un projet sur [Firebase Console](https://console.firebase.google.com/)
2. Activez Authentication (Email/Password)
3. Créez une base de données Firestore
4. Copiez vos identifiants Firebase

### 4. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

\`\`\`env
REACT_APP_FIREBASE_API_KEY=votre_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=votre_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=votre_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
\`\`\`

### 5. Déployer les règles Firestore

Copiez le contenu de `firestore.rules` dans votre console Firebase :
- Allez dans Firestore Database > Règles
- Collez les règles et publiez

### 6. Créer un utilisateur administrateur

Dans la console Firebase :
1. Authentication > Ajoutez un utilisateur
2. Firestore > Collection "users" > Créez un document avec l'UID de l'utilisateur :
\`\`\`json
{
  "email": "admin@example.com",
  "name": "Administrateur",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## 🏃‍♂️ Lancement

### Mode développement
\`\`\`bash
npm start
\`\`\`
L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build pour production
\`\`\`bash
npm run build
\`\`\`

## 📱 Structure du Projet

\`\`\`
lms-platform/
├── public/              # Fichiers publics
├── src/
│   ├── assets/          # Images et ressources
│   ├── components/      # Composants React
│   │   ├── common/      # Composants réutilisables
│   │   ├── auth/        # Composants d'authentification
│   │   └── ...
│   ├── config/          # Configuration Firebase et constantes
│   ├── contexts/        # Contextes React (Auth, Notifications)
│   ├── hooks/           # Hooks personnalisés
│   ├── services/        # Services Firebase
│   ├── pages/           # Pages de l'application
│   ├── utils/           # Fonctions utilitaires
│   ├── App.jsx          # Composant principal
│   ├── index.js         # Point d'entrée
│   └── index.css        # Styles globaux
└── firestore.rules      # Règles de sécurité Firestore
\`\`\`

## 🔒 Sécurité

- Authentification Firebase avec email/password
- Règles Firestore strictes par rôle
- Protection des routes sensibles
- Validation des données côté client et serveur

## 🛠 Technologies Utilisées

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Charts**: Recharts (pour les statistiques)

## 📊 Statuts des Leads

- 🆕 **Nouveau** : Lead fraîchement créé
- 📞 **Contacté** : Premier contact établi
- ✅ **Qualifié** : Lead qualifié et intéressé
- 💼 **En négociation** : Discussions commerciales en cours
- 🎉 **Converti** : Lead transformé en client
- ❌ **Perdu** : Lead non converti

## 🐛 Résolution des problèmes courants

### Erreur "Failed to get document because the client is offline"

Cette erreur peut survenir si :
1. Les identifiants Firebase ne sont pas correctement configurés dans `.env`
2. Firestore n'est pas activé dans votre projet Firebase
3. Les règles de sécurité bloquent l'accès

**Solution** :
- Vérifiez votre fichier `.env`
- Assurez-vous que Firestore est activé
- Vérifiez que les règles de sécurité sont déployées

### L'application ne démarre pas

\`\`\`bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
npm start
\`\`\`

## 📝 License

Ce projet est sous licence MIT.

## 🤝 Support

Pour toute question ou problème, contactez l'équipe de développement.
