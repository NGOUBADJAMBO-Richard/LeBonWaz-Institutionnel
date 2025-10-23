# 🔧 Guide de Dépannage - LMS Platform

## Problème: "Failed to get document because the client is offline"

### Diagnostic

Cette erreur indique que Firestore ne peut pas se connecter. Voici comment identifier la cause :

#### 1. Ouvrez la console du navigateur (F12)

Recherchez les erreurs supplémentaires qui peuvent donner plus d'informations :

- `auth/invalid-api-key` → Clés Firebase incorrectes
- `@firebase/firestore: Firestore (9.x.x): Could not reach Cloud Firestore backend` → Problème de connexion
- `Missing or insufficient permissions` → Problèmes de règles Firestore

#### 2. Vérifiez l'état de connexion Firebase

Dans la console du navigateur, tapez :

```javascript
// Vérifier l'authentification
console.log('Auth state:', firebase.auth().currentUser);

// Vérifier la configuration
console.log('Firebase config:', firebase.app().options);
```

### Solutions

#### Solution 1: Vérifier la configuration Firebase

**Fichier : `.env`**

Assurez-vous que :
1. Le fichier existe à la racine du projet
2. Toutes les variables commencent par `REACT_APP_`
3. Les valeurs sont correctes (sans guillemets)

```env
# ✅ CORRECT
REACT_APP_FIREBASE_API_KEY=AIzaSyAbc123

# ❌ INCORRECT
FIREBASE_API_KEY=AIzaSyAbc123
REACT_APP_FIREBASE_API_KEY="AIzaSyAbc123"
```

**Après modification :**
```bash
# Redémarrez l'application
npm start
```

#### Solution 2: Configurer les règles Firestore

**Fichier : `firestore.rules`**

Les règles de sécurité doivent permettre l'accès aux utilisateurs authentifiés.

**Test temporaire (DÉVELOPPEMENT UNIQUEMENT) :**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ATTENTION: Règles permissives pour le débogage
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Déployez ces règles temporaires dans la console Firebase :
1. Firebase Console > Firestore Database > Règles
2. Collez les règles ci-dessus
3. Cliquez sur "Publier"

**Une fois que ça fonctionne, remettez les vraies règles de sécurité !**

#### Solution 3: Créer l'utilisateur dans Firestore

L'erreur survient souvent car l'utilisateur existe dans Authentication mais pas dans Firestore.

**Étapes :**

1. **Trouvez l'UID de l'utilisateur**
   - Firebase Console > Authentication
   - Notez l'UID de votre utilisateur

2. **Créez le document utilisateur**
   - Firebase Console > Firestore Database
   - Collection : `users`
   - Document ID : [L'UID de l'utilisateur]
   - Champs :
     ```javascript
     {
       uid: "l'UID de l'utilisateur",
       email: "user@example.com",
       firstName: "John",
       lastName: "Doe",
       role: "admin", // ou "commercial"
       phoneNumber: "",
       createdAt: [Timestamp actuel],
       lastLogin: [Timestamp actuel]
     }
     ```

#### Solution 4: Activer la persistance hors ligne

**Fichier : `src/config/firebase.js`**

La persistance est déjà activée, mais en cas d'erreur, commentez temporairement :

```javascript
// Commentez ces lignes si elles causent des problèmes
// enableIndexedDbPersistence(db).catch((err) => {
//   console.warn('Persistence error:', err);
// });
```

#### Solution 5: Vider le cache du navigateur

Parfois, des données en cache peuvent causer des problèmes :

1. Ouvrez les DevTools (F12)
2. Application > Storage > Clear site data
3. Ou utilisez le mode navigation privée

#### Solution 6: Vérifier les index Firestore

Si vous utilisez des requêtes complexes, Firestore peut nécessiter des index.

**Erreur dans la console :**
```
The query requires an index...
```

**Solution :**
- Cliquez sur le lien fourni dans l'erreur
- Firebase créera automatiquement l'index
- Attendez quelques minutes que l'index soit créé

---

## Autres Problèmes Courants

### Problème: "auth/user-not-found" lors de la connexion

**Cause :** L'utilisateur n'existe pas dans Firebase Authentication

**Solution :**
1. Créez l'utilisateur dans Firebase Console > Authentication
2. Assurez-vous que l'email et le mot de passe sont corrects

### Problème: "auth/wrong-password"

**Solution :**
- Vérifiez le mot de passe
- Utilisez la fonction "Mot de passe oublié" (à implémenter)
- Ou réinitialisez depuis la console Firebase

### Problème: L'application ne démarre pas

**Erreur : "Module not found"**

```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
```

**Erreur : "Port 3000 is already in use"**

```bash
# Tuez le processus sur le port 3000
# Linux/Mac :
kill -9 $(lsof -ti:3000)

# Ou utilisez un autre port :
PORT=3001 npm start
```

### Problème: Les styles Tailwind ne s'appliquent pas

**Solution :**

1. Vérifiez que `tailwind.config.js` existe
2. Vérifiez que `postcss.config.js` existe
3. Vérifiez que `src/index.css` contient :
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
4. Redémarrez l'application

### Problème: "Cannot read property 'map' of undefined"

**Cause :** Les données n'ont pas encore été chargées depuis Firestore

**Solution :** Vérifiez que vous utilisez les états de chargement :

```javascript
if (loading) {
  return <LoadingSpinner />;
}

if (!data || data.length === 0) {
  return <p>Aucune donnée</p>;
}

return data.map(item => ...);
```

### Problème: Les changements ne sont pas enregistrés

**Vérifiez :**
1. La console du navigateur pour les erreurs
2. Que vous êtes bien authentifié
3. Que les règles Firestore autorisent l'écriture
4. Que la fonction de sauvegarde est bien appelée

---

## Mode Débogage

### Activer les logs Firebase

**Fichier : `src/config/firebase.js`**

Ajoutez en haut :

```javascript
// Pour activer les logs détaillés
import { setLogLevel } from 'firebase/firestore';
setLogLevel('debug');
```

### Inspecter l'état de l'application

Dans la console du navigateur :

```javascript
// Vérifier l'utilisateur connecté
console.log('User:', firebase.auth().currentUser);

// Vérifier le rôle
firebase.firestore().collection('users')
  .doc(firebase.auth().currentUser.uid)
  .get()
  .then(doc => console.log('User data:', doc.data()));

// Tester une requête Firestore
firebase.firestore().collection('leads')
  .limit(1)
  .get()
  .then(snapshot => {
    console.log('Leads query success:', snapshot.size);
    snapshot.forEach(doc => console.log(doc.data()));
  })
  .catch(error => console.error('Leads query error:', error));
```

---

## Checklist de Débogage

Avant de demander de l'aide, vérifiez :

- [ ] Le fichier `.env` existe et contient les bonnes clés
- [ ] L'application a été redémarrée après modification du `.env`
- [ ] Firebase Authentication est activé (Email/Password)
- [ ] Firestore Database est créé
- [ ] Les règles Firestore sont déployées
- [ ] L'utilisateur existe dans Authentication
- [ ] L'utilisateur existe dans la collection `users` de Firestore
- [ ] L'UID correspond entre Authentication et Firestore
- [ ] Le champ `role` est défini dans Firestore
- [ ] La console du navigateur ne montre pas d'erreurs
- [ ] Internet est accessible
- [ ] Firebase est accessible (pas de pare-feu bloquant)

---

## Ressources Utiles

- [Documentation Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Documentation Firebase Auth](https://firebase.google.com/docs/auth)
- [État du service Firebase](https://status.firebase.google.com/)

---

## Support

Si le problème persiste :

1. Copiez l'erreur complète de la console
2. Notez les étapes qui mènent à l'erreur
3. Vérifiez la configuration Firebase
4. Ouvrez un ticket avec ces informations

---

**Dernière mise à jour :** 2024
