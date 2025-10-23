# 🚀 Plateforme LMS - Gestion Commerciale

## 📋 Description

Plateforme de gestion des prospects et interactions commerciales avec support hors ligne. Cette application permet aux équipes commerciales de gérer efficacement leurs leads, suivre les interactions et analyser les performances.

## ✨ Fonctionnalités

### 🔐 Authentification
- Connexion sécurisée avec Firebase Auth
- Gestion des rôles (Commercial/Admin)
- Protection des routes

### 👥 Gestion des Prospects
- Ajout/modification/suppression de prospects
- Suivi du statut (Nouveau → Contacté → Qualifié → Négociation → Converti/Perdu)
- Filtres et recherche avancée
- Informations détaillées (contact, entreprise, produits d'intérêt)

### 💬 Interactions
- Historique complet des interactions
- Types d'interactions (Appel, Email, SMS, Rencontre, WhatsApp)
- Sentiment et prochaines étapes
- Timeline chronologique

### 📊 Dashboard & Analytics
- Statistiques en temps réel
- Graphiques de conversion
- Activité récente
- Performance par source

### 🌐 Mode Hors Ligne
- Fonctionnement sans connexion internet
- Synchronisation automatique à la reconnexion
- Stockage local sécurisé

## 🛠️ Technologies

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date**: date-fns

## 🚀 Installation

### 1. Prérequis
```bash
Node.js >= 16
npm ou yarn
Compte Firebase
```

### 2. Installation des dépendances
```bash
npm install
```

### 3. Configuration Firebase

1. Créez un projet Firebase sur https://console.firebase.google.com
2. Activez Authentication (Email/Password)
3. Créez une base Firestore
4. Copiez les clés de configuration

### 4. Variables d'environnement

Créez un fichier `.env` à la racine :

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 5. Déploiement des règles Firestore

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser le projet
firebase init firestore

# Déployer les règles
firebase deploy --only firestore:rules
```

### 6. Lancement

```bash
# Développement
npm start

# Build production
npm run build
```

## 👤 Comptes de Test

Pour tester l'application, vous pouvez créer ces comptes dans Firebase Auth :

```
Commercial: commercial@lms.com / password123
Admin: admin@lms.com / password123
```

Ajoutez ensuite les profils dans Firestore :

```javascript
// Collection: users
// Document ID: [UID de l'utilisateur]
{
  email: "commercial@lms.com",
  firstName: "Jean",
  lastName: "Dupont",
  role: "commercial",
  createdAt: new Date()
}

{
  email: "admin@lms.com",
  firstName: "Marie",
  lastName: "Martin", 
  role: "admin",
  createdAt: new Date()
}
```

## 📱 Utilisation

### Pour les Commerciaux
1. **Connexion** avec vos identifiants
2. **Dashboard** - Vue d'ensemble de vos prospects
3. **Ajouter un prospect** - Formulaire complet
4. **Suivi des interactions** - Historique détaillé
5. **Gestion des statuts** - Pipeline de vente

### Pour les Administrateurs
- Accès à tous les prospects
- Statistiques globales
- Gestion des utilisateurs (à implémenter)

## 🔧 Structure du Projet

```
src/
├── components/           # Composants réutilisables
│   ├── auth/            # Authentification
│   ├── common/          # Composants communs
│   ├── dashboard/       # Dashboard
│   ├── leads/           # Gestion prospects
│   └── interactions/    # Interactions
├── config/              # Configuration
├── contexts/            # Contextes React
├── hooks/               # Hooks personnalisés
├── pages/               # Pages principales
├── services/            # Services API
└── utils/               # Utilitaires
```

## 🌐 Mode Hors Ligne

L'application fonctionne entièrement hors ligne :

- **Lecture** : Données mises en cache localement
- **Écriture** : Stockage local + queue de synchronisation
- **Synchronisation** : Automatique à la reconnexion

## 🔒 Sécurité

- Authentification Firebase
- Règles Firestore restrictives
- Validation côté client et serveur
- Protection CSRF/XSS

## 📊 Base de Données

### Collections Firestore

1. **users** - Profils utilisateurs
2. **leads** - Prospects
3. **interactions** - Interactions commerciales
4. **leadStatusHistory** - Historique des changements de statut

## 🚨 Résolution des Problèmes

### Erreur "client is offline"
Cette erreur a été résolue avec :
- Gestion de la connectivité réseau
- Stockage local de secours
- Synchronisation automatique

### Performance
- Pagination des listes
- Cache intelligent
- Chargement paresseux

## 🔄 Synchronisation

La synchronisation se fait automatiquement :
- À la reconnexion réseau
- Au démarrage de l'application
- Après chaque opération en ligne

## 📈 Évolutions Futures

- [ ] Notifications push
- [ ] Export des données
- [ ] Intégration CRM
- [ ] Application mobile
- [ ] Rapports avancés
- [ ] Automatisation marketing

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - Voir le fichier LICENSE

## 📞 Support

Pour toute question ou problème :
- Email: support@lms-platform.com
- Documentation: https://docs.lms-platform.com

---

**Développé avec ❤️ pour optimiser la gestion commerciale**