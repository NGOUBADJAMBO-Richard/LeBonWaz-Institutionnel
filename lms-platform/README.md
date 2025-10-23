# 🚀 Plateforme LMS - Gestion des Leads

## 📋 Description
Plateforme de gestion des leads commerciaux avec authentification Firebase et interface React moderne.

## 🔧 Configuration

### 1. Configuration Firebase
1. Créez un projet sur [Firebase Console](https://console.firebase.google.com/)
2. Activez l'authentification (Email/Password)
3. Créez une base de données Firestore
4. Copiez vos clés de configuration dans le fichier `.env`

### 2. Installation
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

### 3. Configuration des règles Firestore
Déployez les règles de sécurité Firestore depuis le fichier `firestore.rules` :
```bash
firebase deploy --only firestore:rules
```

## 🗄️ Structure de la Base de Données

### Collections Firestore
- `users` - Utilisateurs de la plateforme
- `leads` - Prospects commerciaux
- `interactions` - Historique des interactions
- `leadStatusHistory` - Historique des changements de statut

### Rôles Utilisateurs
- `admin` - Accès complet à tous les leads
- `commercial` - Accès uniquement à ses propres leads

## 🚀 Démarrage Rapide

1. **Configuration Firebase** :
   - Créez un projet Firebase
   - Activez Authentication (Email/Password)
   - Créez Firestore Database
   - Copiez les clés dans `.env`

2. **Création du premier utilisateur Admin** :
   ```javascript
   // Dans la console Firebase ou via le SDK
   await addDoc(collection(db, 'users'), {
     uid: 'user_uid_from_auth',
     email: 'admin@example.com',
     role: 'admin',
     firstName: 'Admin',
     lastName: 'User',
     createdAt: serverTimestamp()
   });
   ```

3. **Lancement** :
   ```bash
   npm start
   ```

## 🔒 Sécurité
- Authentification Firebase
- Règles Firestore sécurisées
- Validation côté client et serveur
- Gestion des rôles utilisateurs

## 📱 Fonctionnalités
- ✅ Authentification sécurisée
- ✅ Dashboard avec statistiques
- ✅ Gestion des leads
- ✅ Historique des interactions
- ✅ Interface responsive
- ✅ Gestion des rôles

## 🛠️ Technologies
- React 18
- Firebase (Auth + Firestore)
- Tailwind CSS
- React Router
- Lucide React (Icônes)