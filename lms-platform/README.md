# 🚀 LMS Platform - Lead Management System

Plateforme de gestion des leads et prospection commerciale.

## 📋 Fonctionnalités

### Pour les Commerciaux
- 📊 Tableau de bord personnalisé avec statistiques
- 👤 Gestion complète des leads
- 💬 Suivi des interactions avec les prospects
- 📈 Visualisation du taux de conversion
- 🔄 Gestion des statuts des leads

### Pour les Administrateurs
- 📊 Vue d'ensemble de tous les leads
- 👥 Gestion des commerciaux
- 📈 Statistiques globales
- 🎯 Suivi de la performance

## 🛠️ Technologies Utilisées

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Firebase (Authentication + Firestore)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Date**: date-fns

## 📦 Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Compte Firebase

### Étapes d'installation

1. **Cloner le projet**
```bash
cd lms-platform
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Firebase**

Créez un fichier `.env` à la racine du projet :

```env
REACT_APP_FIREBASE_API_KEY=votre_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=votre_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=votre_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
```

4. **Configuration Firestore**

Dans votre console Firebase :
- Créez une base de données Firestore
- Activez l'authentification Email/Password
- Déployez les règles de sécurité depuis `firestore.rules`

5. **Créer un utilisateur administrateur**

Dans la console Firebase Authentication, créez un utilisateur, puis dans Firestore, créez un document dans la collection `users` :

```javascript
{
  uid: "l'UID de l'utilisateur créé",
  email: "admin@example.com",
  firstName: "Admin",
  lastName: "System",
  role: "admin",
  createdAt: timestamp,
  lastLogin: timestamp
}
```

6. **Lancer l'application**
```bash
npm start
```

L'application sera disponible sur `http://localhost:3000`

## 🏗️ Structure du Projet

```
lms-platform/
├── public/              # Fichiers statiques
├── src/
│   ├── assets/          # Images et icônes
│   ├── components/      # Composants React
│   │   ├── common/      # Composants réutilisables
│   │   ├── auth/        # Composants d'authentification
│   │   ├── dashboard/   # Composants du tableau de bord
│   │   ├── leads/       # Composants de gestion des leads
│   │   └── interactions/# Composants des interactions
│   ├── config/          # Configuration (Firebase, constantes)
│   ├── contexts/        # Context API
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Pages de l'application
│   ├── services/        # Services (API calls)
│   ├── utils/           # Utilitaires
│   ├── App.jsx          # Composant principal
│   ├── index.js         # Point d'entrée
│   └── index.css        # Styles globaux
├── firestore.rules      # Règles de sécurité Firestore
├── .env.example         # Exemple de configuration
└── package.json         # Dépendances
```

## 🔐 Authentification

L'application utilise Firebase Authentication avec :
- Connexion par email/mot de passe
- Protection des routes privées
- Gestion des rôles (admin/commercial)

## 📊 Base de Données

### Collections Firestore

1. **users**
   - uid, email, firstName, lastName, role, phoneNumber
   - createdAt, lastLogin

2. **leads**
   - firstName, lastName, email, phone, company
   - jobTitle, productInterest, source, status
   - assignedToUserId, createdBy
   - prospectionDate, createdAt, updatedAt

3. **interactions**
   - leadId, userId, type, content
   - sentiment, nextSteps, createdAt
   - isReadOnly (toujours true)

4. **leadStatusHistory**
   - leadId, previousStatus, newStatus
   - changedBy, changedAt, reason

## 🎨 Thèmes et Personnalisation

Les couleurs sont configurées dans `tailwind.config.js` :
- Primary: Bleu (#3b82f6)
- Success: Vert (#10b981)
- Warning: Orange (#f59e0b)
- Danger: Rouge (#ef4444)

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement sur Firebase Hosting
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Se connecter
firebase login

# Initialiser le projet
firebase init hosting

# Déployer
firebase deploy
```

## 🐛 Résolution des Problèmes

### Erreur "Failed to get document because the client is offline"

Cette erreur peut survenir si :
1. Les clés Firebase ne sont pas configurées correctement
2. Les règles Firestore bloquent l'accès
3. Le réseau est inaccessible

**Solutions** :
1. Vérifier le fichier `.env`
2. Vérifier les règles Firestore dans la console Firebase
3. Activer la persistance hors ligne dans `src/config/firebase.js`

### Problèmes d'authentification

1. Vérifier que l'authentification Email/Password est activée dans Firebase
2. Vérifier que l'utilisateur existe dans Firestore avec le bon rôle
3. Vider le cache du navigateur

## 📝 Scripts Disponibles

- `npm start` : Lance l'application en mode développement
- `npm run build` : Créé un build de production
- `npm test` : Lance les tests
- `npm run eject` : Ejecte la configuration (irréversible)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Auteurs

- Votre Équipe de Développement

## 📞 Support

Pour toute question ou support :
- Email: support@lms-platform.com
- Documentation: [Lien vers la documentation]

## 🔄 Changelog

### Version 1.0.0
- ✅ Authentification complète
- ✅ Gestion des leads
- ✅ Suivi des interactions
- ✅ Tableaux de bord personnalisés
- ✅ Rôles et permissions
- ✅ Design responsive

## 🎯 Roadmap

- [ ] Notifications en temps réel
- [ ] Export de données (PDF, Excel)
- [ ] Recherche avancée
- [ ] Tableaux de bord personnalisables
- [ ] Application mobile
- [ ] Intégration avec CRM externes
- [ ] Rapports avancés
- [ ] Mode hors ligne complet
