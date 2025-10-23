# 🚀 LBW Learning Platform - Système de Gestion des Leads

## 📋 Description

Plateforme complète de gestion des leads commerciaux développée avec React et Firebase. Cette application permet aux équipes commerciales de gérer efficacement leurs prospects, suivre les interactions et analyser les performances.

## ✨ Fonctionnalités

- **Authentification sécurisée** avec Firebase Auth
- **Gestion complète des leads** (création, modification, suivi)
- **Historique des interactions** avec les prospects
- **Tableau de bord** avec statistiques en temps réel
- **Gestion des statuts** (nouveau, contacté, qualifié, etc.)
- **Mode Admin** pour supervision globale
- **Interface responsive** adaptée mobile et desktop
- **Mode hors ligne** avec synchronisation automatique

## 🛠 Technologies utilisées

- **Frontend**: React 18
- **Backend**: Firebase (Firestore, Auth)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icônes**: Lucide React
- **Charts**: Recharts

## 📦 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- NPM ou Yarn
- Compte Firebase (gratuit)

### Étapes d'installation

1. **Cloner le projet** (si nécessaire)
```bash
cd lms-platform
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Firebase**

   a. Créez un projet Firebase:
   - Allez sur [Firebase Console](https://console.firebase.google.com/)
   - Cliquez sur "Créer un projet"
   - Suivez les étapes de création

   b. Activez l'authentification:
   - Dans Firebase Console > Authentication
   - Cliquez sur "Commencer"
   - Activez "Email/Mot de passe"

   c. Créez une base Firestore:
   - Dans Firebase Console > Firestore Database
   - Cliquez sur "Créer une base de données"
   - Choisissez le mode production
   - Sélectionnez une région proche

   d. Récupérez vos clés:
   - Paramètres du projet > Général
   - Créez une application web
   - Copiez la configuration

4. **Configurer les variables d'environnement**

   Modifiez le fichier `.env` avec vos clés Firebase:
```env
REACT_APP_FIREBASE_API_KEY=votre_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=votre_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=votre_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
```

5. **Déployer les règles de sécurité**

   Copiez le contenu du fichier `firestore.rules` dans:
   Firebase Console > Firestore > Règles

6. **Créer le premier utilisateur admin**

   Option 1: Via Firebase Console
   - Authentication > Ajouter un utilisateur
   - Créez avec email/mot de passe
   - Dans Firestore, créez un document dans `users/{uid}` avec `role: "admin"`

   Option 2: Via l'application
   - Lancez l'application
   - Créez un compte normalement
   - Modifiez le rôle dans Firestore

## 🚀 Démarrage

```bash
# Mode développement
npm start

# Build production
npm run build

# Tests
npm test
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📱 Utilisation

### Premier démarrage

1. **Connexion**: Utilisez vos identifiants Firebase
2. **Dashboard**: Vue d'ensemble de vos leads et statistiques
3. **Ajouter un lead**: Cliquez sur "Nouveau Lead"
4. **Gérer les interactions**: Accédez au détail d'un lead

### Rôles utilisateurs

- **Commercial**: 
  - Voir et gérer ses propres leads
  - Ajouter des interactions
  - Modifier les statuts

- **Admin**:
  - Accès à tous les leads
  - Statistiques globales
  - Gestion des utilisateurs

## 🐛 Résolution des problèmes

### Erreur "Client is offline"

Cette erreur indique que Firebase ne peut pas se connecter. Solutions:

1. **Vérifiez vos clés Firebase** dans le fichier `.env`
2. **Vérifiez votre connexion internet**
3. **Vérifiez que Firestore est activé** dans Firebase Console
4. **Redémarrez l'application** après avoir modifié le `.env`

### Erreur d'authentification

1. Vérifiez que l'authentification Email/Password est activée
2. Créez un utilisateur dans Firebase Authentication
3. Vérifiez les règles de sécurité Firestore

### Page blanche au démarrage

1. Ouvrez la console du navigateur (F12)
2. Vérifiez les erreurs
3. Assurez-vous que toutes les dépendances sont installées

## 📂 Structure du projet

```
lms-platform/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants réutilisables
│   ├── config/          # Configuration Firebase
│   ├── contexts/        # Contextes React
│   ├── pages/           # Pages de l'application
│   ├── services/        # Services API
│   └── App.jsx          # Composant principal
├── .env                 # Variables d'environnement
└── package.json         # Dépendances
```

## 🔐 Sécurité

- Les mots de passe sont gérés par Firebase Auth
- Les règles Firestore limitent l'accès aux données
- Chaque utilisateur ne voit que ses propres leads
- Les interactions sont immuables (audit trail)

## 📈 Déploiement

### Sur Firebase Hosting

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Connexion
firebase login

# Initialiser
firebase init

# Déployer
npm run build
firebase deploy
```

### Sur Vercel/Netlify

1. Connectez votre repository GitHub
2. Configurez les variables d'environnement
3. Déployez automatiquement

## 🤝 Support

Pour toute question ou problème:
- Créez une issue sur GitHub
- Contactez l'équipe de développement
- Consultez la documentation Firebase

## 📄 Licence

© 2024 LBW Learning. Tous droits réservés.

---

**Note**: N'oubliez pas de configurer vos clés Firebase dans le fichier `.env` avant de lancer l'application !