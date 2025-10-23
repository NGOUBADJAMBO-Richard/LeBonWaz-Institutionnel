# 🚀 Plateforme LMS - Guide de Configuration

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Un projet Firebase configuré

## 🔧 Configuration Firebase

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Suivez les étapes de configuration

### 2. Activer les services nécessaires

#### Authentication
1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Allez dans l'onglet "Sign-in method"
4. Activez "Email/Password"

#### Firestore Database
1. Dans la console Firebase, allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Mode test" pour commencer
4. Sélectionnez une région proche de vous

### 3. Obtenir les clés de configuration

1. Dans la console Firebase, allez dans "Paramètres du projet" (icône d'engrenage)
2. Allez dans l'onglet "Général"
3. Faites défiler jusqu'à "Vos applications"
4. Cliquez sur "Ajouter une application" et choisissez "Web"
5. Enregistrez l'application et copiez les clés de configuration

### 4. Configurer les variables d'environnement

1. Copiez le fichier `.env.example` vers `.env`
2. Remplacez les valeurs par vos vraies clés Firebase :

```env
REACT_APP_FIREBASE_API_KEY=votre_vraie_clé_api
REACT_APP_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=votre-projet-id
REACT_APP_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
REACT_APP_FIREBASE_APP_ID=votre_app_id
```

## 🚀 Installation et Démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer le serveur de développement

```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🔒 Configuration des Règles Firestore

1. Dans la console Firebase, allez dans "Firestore Database"
2. Allez dans l'onglet "Règles"
3. Remplacez le contenu par le contenu du fichier `firestore.rules`
4. Cliquez sur "Publier"

## 👥 Création des Utilisateurs

### Créer un utilisateur Admin

1. Dans la console Firebase, allez dans "Authentication"
2. Allez dans l'onglet "Utilisateurs"
3. Cliquez sur "Ajouter un utilisateur"
4. Entrez un email et un mot de passe
5. Notez l'UID de l'utilisateur créé

### Ajouter le rôle Admin dans Firestore

1. Dans la console Firebase, allez dans "Firestore Database"
2. Créez une collection "users"
3. Créez un document avec l'UID de l'utilisateur
4. Ajoutez le champ `role` avec la valeur `admin`

```json
{
  "role": "admin",
  "email": "admin@example.com",
  "createdAt": "timestamp"
}
```

## 🧪 Test de la Configuration

1. Démarrez l'application avec `npm start`
2. Allez sur `http://localhost:3000`
3. Vous devriez être redirigé vers la page de connexion
4. Connectez-vous avec les identifiants de l'utilisateur admin créé
5. Vous devriez voir le tableau de bord

## 🐛 Résolution des Problèmes

### Erreur "Failed to get document because the client is offline"

Cette erreur indique généralement :
1. **Mauvaise configuration Firebase** : Vérifiez vos clés dans `.env`
2. **Projet Firebase non configuré** : Assurez-vous que Firestore est activé
3. **Règles Firestore trop restrictives** : Vérifiez les règles de sécurité

### Erreur "Permission denied"

1. Vérifiez que l'utilisateur est bien créé dans Authentication
2. Vérifiez que le document utilisateur existe dans Firestore avec le bon rôle
3. Vérifiez les règles Firestore

### L'application ne démarre pas

1. Vérifiez que toutes les dépendances sont installées : `npm install`
2. Vérifiez que le port 3000 est libre
3. Essayez de nettoyer le cache : `npm start -- --reset-cache`

## 📁 Structure du Projet

```
lms-platform/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/          # Composants d'authentification
│   │   ├── common/        # Composants réutilisables
│   │   ├── dashboard/     # Composants du tableau de bord
│   │   ├── leads/         # Composants de gestion des leads
│   │   └── interactions/  # Composants d'interactions
│   ├── config/            # Configuration Firebase
│   ├── contexts/          # Contextes React
│   ├── hooks/             # Hooks personnalisés
│   ├── services/          # Services API
│   ├── utils/             # Utilitaires
│   └── pages/             # Pages de l'application
├── .env                   # Variables d'environnement
├── .env.example          # Exemple de configuration
├── firestore.rules       # Règles de sécurité Firestore
└── tailwind.config.js    # Configuration Tailwind
```

## 🎯 Prochaines Étapes

1. ✅ Configuration de base terminée
2. 🔄 Ajout de la gestion des leads
3. 🔄 Ajout du système d'interactions
4. 🔄 Amélioration du tableau de bord
5. 🔄 Tests et déploiement

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur pour les erreurs
2. Vérifiez la console Firebase pour les erreurs de règles
3. Consultez la documentation Firebase
4. Vérifiez que tous les services Firebase sont bien activés