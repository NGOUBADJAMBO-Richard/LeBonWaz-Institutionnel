# 🔧 Guide de Résolution des Problèmes

## ❌ Erreur "Failed to get document because the client is offline"

Cette erreur indique que Firebase ne peut pas se connecter à la base de données. Voici les solutions :

### 1. Vérifier la Configuration Firebase

**Étapes :**
1. Ouvrez [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Allez dans "Project Settings" (⚙️)
4. Copiez les clés de configuration dans `.env`

**Fichier `.env` :**
```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 2. Vérifier les Règles Firestore

**Problème :** Les règles de sécurité bloquent l'accès
**Solution :** Déployez les règles depuis `firestore.rules`

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

### 3. Vérifier l'Authentification

**Problème :** L'utilisateur n'est pas authentifié
**Solution :** Créer un utilisateur admin

```javascript
// Dans la console Firebase ou via le SDK
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Créer l'utilisateur
const userCredential = await createUserWithEmailAndPassword(auth, 'admin@example.com', 'password123');

// Ajouter le rôle admin
await setDoc(doc(db, 'users', userCredential.user.uid), {
  email: 'admin@example.com',
  role: 'admin',
  firstName: 'Admin',
  lastName: 'User',
  createdAt: serverTimestamp()
});
```

### 4. Vérifier la Connexion Internet

**Problème :** Pas de connexion internet
**Solution :** Vérifier la connectivité

```bash
# Tester la connexion Firebase
curl -I https://firestore.googleapis.com
```

### 5. Mode Développement

**Problème :** Configuration de développement incorrecte
**Solution :** Utiliser les emulators Firebase

```bash
# Installer les emulators
firebase init emulators

# Démarrer les emulators
firebase emulators:start
```

### 6. Vérifier les Permissions

**Problème :** Permissions insuffisantes
**Solution :** Vérifier les règles Firestore

```javascript
// Règles de test (ATTENTION: à ne pas utiliser en production)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## ✅ Checklist de Vérification

- [ ] Clés Firebase correctes dans `.env`
- [ ] Règles Firestore déployées
- [ ] Utilisateur admin créé
- [ ] Connexion internet active
- [ ] Projet Firebase actif
- [ ] Base de données Firestore créée
- [ ] Authentification activée

## 🆘 Support

Si le problème persiste :
1. Vérifiez les logs de la console
2. Testez avec les règles de test
3. Vérifiez la configuration réseau
4. Contactez le support Firebase