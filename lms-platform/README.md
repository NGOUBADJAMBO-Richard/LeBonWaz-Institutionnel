# 🚀 Plateforme LMS - Lead Management System

Une plateforme moderne de gestion des leads développée avec React, TypeScript, Firebase et Tailwind CSS.

## 📋 Fonctionnalités

- ✅ Authentification sécurisée avec Firebase Auth
- ✅ Gestion des leads avec statuts
- ✅ Suivi des interactions client
- ✅ Tableau de bord avec statistiques
- ✅ Rôles utilisateur (Commercial/Admin)
- ✅ Interface responsive avec Tailwind CSS

## 🛠️ Technologies Utilisées

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Charts**: Recharts

## 🚀 Installation et Configuration

### 1. Prérequis

- Node.js 16+ 
- npm ou yarn
- Compte Firebase

### 2. Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd lms-platform

# Installer les dépendances
npm install
```

### 3. Configuration Firebase

1. Créez un projet Firebase sur https://console.firebase.google.com
2. Activez Authentication (Email/Password)
3. Créez une base de données Firestore
4. Copiez vos clés de configuration Firebase

### 4. Variables d'environnement

```bash
# Copiez le fichier exemple
cp .env.example .env

# Éditez .env avec vos vraies clés Firebase
REACT_APP_FIREBASE_API_KEY=votre_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=votre_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=votre_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
```

### 5. Règles de sécurité Firestore

Déployez les règles de sécurité depuis le fichier `firestore.rules` :

```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter à Firebase
firebase login

# Initialiser le projet
firebase init firestore

# Déployer les règles
firebase deploy --only firestore:rules
```

### 6. Créer le premier utilisateur Admin

Dans la console Firebase Authentication, créez manuellement un utilisateur, puis ajoutez un document dans la collection `users` :

```javascript
// Collection: users
// Document ID: [UID de l'utilisateur créé]
{
  email: "admin@example.com",
  role: "admin",
  firstName: "Admin",
  lastName: "System",
  createdAt: [timestamp]
}
```

## 🎯 Utilisation

### Démarrage en développement

```bash
npm start
```

L'application sera disponible sur http://localhost:3000

### Build pour production

```bash
npm run build
```

### Tests

```bash
npm test
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── auth/           # Composants d'authentification
│   ├── common/         # Composants communs
│   ├── dashboard/      # Composants du tableau de bord
│   ├── leads/          # Composants de gestion des leads
│   └── interactions/   # Composants d'interactions
├── config/             # Configuration Firebase et constantes
├── contexts/           # Contextes React (Auth, etc.)
├── hooks/              # Hooks personnalisés
├── pages/              # Pages principales
├── services/           # Services Firebase
└── utils/              # Utilitaires et helpers
```

## 🔐 Sécurité

- Authentification obligatoire pour toutes les routes
- Règles Firestore restrictives par rôle utilisateur
- Validation côté client et serveur
- Données sensibles protégées

## 🚨 Résolution de l'Erreur "Client Offline"

L'erreur `Failed to get document because the client is offline` peut être résolue par :

1. **Vérification de la configuration Firebase** : Assurez-vous que toutes les clés dans `.env` sont correctes
2. **Connexion Internet** : Vérifiez votre connexion
3. **Règles Firestore** : Déployez les bonnes règles de sécurité
4. **Initialisation Firebase** : Le service Firebase doit être correctement initialisé

## 📊 Prochaines Étapes

- [ ] Ajouter la page de gestion des leads
- [ ] Implémenter les graphiques du dashboard
- [ ] Ajouter les notifications en temps réel
- [ ] Créer les rapports d'export
- [ ] Ajouter les tests unitaires
- [ ] Optimiser les performances

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement LBW.

---

**Développé avec ❤️ par l'équipe LBW**