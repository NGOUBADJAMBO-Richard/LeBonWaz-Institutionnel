# 🚀 Guide de Démarrage Rapide - LMS Platform

## ⚡ Installation en 5 Minutes

### 1. Installation des dépendances
```bash
cd lms-platform
npm install
```

### 2. Configuration Firebase

#### Étape A: Créer un projet Firebase
1. Allez sur https://console.firebase.google.com/
2. Cliquez sur "Ajouter un projet"
3. Suivez les étapes de création

#### Étape B: Activer les services nécessaires

**Authentication:**
1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Commencer"
3. Activez "Email/Mot de passe"

**Firestore Database:**
1. Allez dans "Firestore Database"
2. Cliquez sur "Créer une base de données"
3. Choisissez "Démarrer en mode production"
4. Sélectionnez une région proche de vous

#### Étape C: Récupérer les clés de configuration
1. Allez dans "Paramètres du projet" (icône engrenage)
2. Faites défiler jusqu'à "Vos applications"
3. Cliquez sur l'icône Web `</>`
4. Donnez un nom à votre app (ex: "LMS Platform")
5. Copiez les valeurs de configuration

#### Étape D: Configurer le fichier .env
Ouvrez le fichier `.env` et remplacez les valeurs :

```env
REACT_APP_FIREBASE_API_KEY=AIzaSy...
REACT_APP_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=votre-projet
REACT_APP_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Déployer les règles de sécurité Firestore

#### Option A: Via la console web (Recommandé pour débutants)
1. Ouvrez `firestore.rules` dans votre éditeur
2. Copiez tout le contenu
3. Dans la console Firebase, allez dans "Firestore Database"
4. Cliquez sur l'onglet "Règles"
5. Collez le contenu et cliquez sur "Publier"

#### Option B: Via Firebase CLI
```bash
npm install -g firebase-tools
firebase login
firebase init firestore
firebase deploy --only firestore:rules
```

### 4. Créer le premier utilisateur administrateur

#### Méthode manuelle:
1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez sur "Ajouter un utilisateur"
3. Email: `admin@example.com`
4. Mot de passe: `Admin123!` (changez-le ensuite)
5. Copiez l'UID généré (ex: `abc123def456`)

6. Allez dans "Firestore Database"
7. Cliquez sur "Démarrer une collection"
8. Nom de la collection: `users`
9. ID du document: collez l'UID copié
10. Ajoutez les champs suivants:

```
uid: "abc123def456" (l'UID de l'utilisateur)
email: "admin@example.com"
firstName: "Admin"
lastName: "System"
role: "admin"
phoneNumber: ""
createdAt: [Timestamp actuel]
lastLogin: [Timestamp actuel]
```

### 5. Lancer l'application
```bash
npm start
```

L'application s'ouvrira sur `http://localhost:3000`

### 6. Première connexion
- Email: `admin@example.com`
- Mot de passe: celui que vous avez défini

---

## 🔧 Résolution du problème "Client is Offline"

### Cause principale
Cette erreur survient quand Firebase ne peut pas se connecter, généralement parce que :
1. Les clés Firebase sont incorrectes
2. Les règles Firestore sont trop restrictives
3. L'utilisateur n'existe pas dans Firestore

### Solution étape par étape

#### 1. Vérifier les clés Firebase
Ouvrez la console du navigateur (F12) et recherchez les erreurs.

Si vous voyez `auth/invalid-api-key` :
- Vérifiez que toutes les clés dans `.env` sont correctes
- Redémarrez l'application avec `npm start`

#### 2. Vérifier les règles Firestore
Les règles actuelles exigent que l'utilisateur existe dans la collection `users`.

**Test des règles:**
1. Console Firebase > Firestore > Règles
2. Cliquez sur "Simulateur de règles"
3. Testez la lecture de `/users/{votre-uid}`

#### 3. Vérifier que l'utilisateur existe dans Firestore
```javascript
// Ouvrez la console du navigateur sur votre app
// Collez ce code pour vérifier:

import { auth } from './config/firebase';
console.log('Current user:', auth.currentUser?.uid);

// Allez dans Firestore et vérifiez qu'un document
// existe dans users/ avec cet UID
```

#### 4. Mode de débogage temporaire

Pour tester, vous pouvez temporairement assouplir les règles Firestore :

```javascript
// ATTENTION: À utiliser UNIQUEMENT pour le débogage
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Une fois que tout fonctionne, remettez les vraies règles depuis `firestore.rules`.

---

## 📊 Créer des utilisateurs commerciaux

Une fois connecté en tant qu'admin :

### Via l'interface (à implémenter)
L'interface d'administration pour créer des utilisateurs sera ajoutée prochainement.

### Via la console Firebase
1. Authentication > Ajouter un utilisateur
2. Créez l'utilisateur avec email/mot de passe
3. Copiez l'UID
4. Firestore > users > Ajouter un document
5. Utilisez l'UID comme ID du document
6. Ajoutez les champs avec `role: "commercial"`

---

## 🎯 Prochaines Étapes

Une fois l'application lancée :

1. ✅ Connectez-vous avec le compte admin
2. ✅ Explorez le tableau de bord
3. ✅ Créez votre premier lead
4. ✅ Ajoutez une interaction
5. ✅ Testez le changement de statut

---

## 🆘 Besoin d'aide ?

### Erreurs communes

**"Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"Firebase: Error (auth/configuration-not-found)"**
- Vérifiez que le fichier `.env` est à la racine
- Vérifiez que les variables commencent par `REACT_APP_`
- Redémarrez avec `npm start`

**"Network request failed"**
- Vérifiez votre connexion internet
- Vérifiez que Firebase est accessible depuis votre réseau

### Ressources

- [Documentation Firebase](https://firebase.google.com/docs)
- [Documentation React](https://react.dev)
- [Documentation Tailwind CSS](https://tailwindcss.com)

---

## 🎉 Félicitations !

Votre plateforme LMS est maintenant opérationnelle ! 🚀

Bon développement ! 💪
