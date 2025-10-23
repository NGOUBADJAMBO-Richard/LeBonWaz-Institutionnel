# 📝 Instructions pour l'Inscription des Utilisateurs

## 🎯 Système d'Inscription

### Pour les Commerciaux
Les commerciaux peuvent s'inscrire directement via l'interface web :

1. **Accéder à la page d'inscription**
   - Allez sur http://localhost:3000/register
   - Ou cliquez sur "S'inscrire" depuis la page de connexion

2. **Remplir le formulaire**
   - Nom complet (minimum 3 caractères)
   - Email professionnel (doit être valide)
   - Téléphone
   - Mot de passe (minimum 6 caractères)
   - Confirmation du mot de passe

3. **Validation automatique**
   - Le rôle "commercial" est automatiquement assigné
   - Un document est créé dans Firestore avec les informations
   - Après inscription, redirection vers la page de connexion

4. **Se connecter**
   - Utiliser l'email et le mot de passe définis
   - Accès immédiat au dashboard commercial

---

## 👨‍💼 Pour les Administrateurs

Les comptes administrateurs sont créés manuellement pour des raisons de sécurité.

### Méthode 1 : Via la Console Firebase (Recommandée)

#### Étape 1 : Créer l'utilisateur dans Authentication
1. Ouvrez [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Allez dans **Authentication** > **Users**
4. Cliquez sur **Ajouter un utilisateur**
5. Renseignez :
   - Email : `admin@votresociete.com`
   - Mot de passe : Un mot de passe sécurisé
6. Cliquez sur **Ajouter un utilisateur**
7. **⚠️ IMPORTANT** : Copiez l'**UID** de l'utilisateur créé (vous en aurez besoin)

#### Étape 2 : Créer le document dans Firestore
1. Allez dans **Firestore Database**
2. Si la collection `users` n'existe pas, créez-la
3. Cliquez sur **Ajouter un document**
4. Dans **ID du document**, collez l'**UID** copié à l'étape 1
5. Ajoutez les champs suivants :

| Champ | Type | Valeur |
|-------|------|--------|
| email | string | admin@votresociete.com |
| name | string | Administrateur Principal |
| role | string | admin |
| phone | string | +241 XX XX XX XX |
| createdAt | string | 2024-01-15T10:00:00.000Z |

6. Cliquez sur **Enregistrer**

#### Étape 3 : Vérifier
1. L'admin peut maintenant se connecter avec son email/mot de passe
2. Il aura accès aux fonctionnalités administrateur

---

### Méthode 2 : Via un script (Pour développeurs)

Créez un fichier `create-admin.js` :

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

async function createAdmin(email, password, name, phone) {
  try {
    // Créer l'utilisateur dans Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name
    });

    console.log('✅ Utilisateur créé:', userRecord.uid);

    // Créer le document dans Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: email,
      name: name,
      phone: phone,
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    console.log('✅ Document Firestore créé');
    console.log('🎉 Admin créé avec succès !');
    console.log('Email:', email);
    console.log('Mot de passe:', password);

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

// Utilisation
createAdmin(
  'admin@votresociete.com',
  'MotDePasseSecurise123!',
  'Administrateur Principal',
  '+241 XX XX XX XX'
);
```

Pour l'exécuter :
```bash
node create-admin.js
```

---

## 🔐 Différences entre Commercial et Admin

### Commercial
- ✅ Peut s'inscrire via `/register`
- ✅ Voit uniquement ses propres leads
- ✅ Peut créer et modifier ses leads
- ✅ Peut ajouter des interactions
- ✅ Voit son dashboard personnel
- ❌ Ne peut pas accéder à l'administration
- ❌ Ne peut pas voir les leads des autres

### Admin
- ❌ **Ne peut PAS** s'inscrire via l'interface web
- ✅ Créé manuellement par un autre admin ou via console Firebase
- ✅ Voit tous les leads de tous les commerciaux
- ✅ Peut gérer tous les commerciaux
- ✅ Voit le dashboard global
- ✅ Accès complet à toutes les fonctionnalités
- ✅ Peut créer d'autres admins (via console Firebase)

---

## 📋 Validation du Formulaire d'Inscription

### Règles de validation

| Champ | Règles |
|-------|--------|
| Nom | - Requis<br>- Minimum 3 caractères |
| Email | - Requis<br>- Format email valide<br>- Unique (vérifié par Firebase) |
| Téléphone | - Requis |
| Mot de passe | - Requis<br>- Minimum 6 caractères |
| Confirmation | - Doit correspondre au mot de passe |

### Messages d'erreur Firebase

| Code d'erreur | Message affiché |
|---------------|-----------------|
| email-already-in-use | Cet email est déjà utilisé |
| weak-password | Le mot de passe est trop faible |
| invalid-email | Email invalide |

---

## 🧪 Tester l'Inscription

### Test 1 : Inscription Commercial
1. Accédez à http://localhost:3000/register
2. Remplissez le formulaire avec des données valides
3. Cliquez sur "S'inscrire"
4. Vérifiez que vous êtes redirigé vers `/login`
5. Connectez-vous avec les identifiants créés
6. Vérifiez que vous accédez au dashboard commercial

### Test 2 : Vérifier le Rôle
1. Après connexion, ouvrez la console du navigateur (F12)
2. Dans Firestore, vérifiez que le document utilisateur a `role: "commercial"`
3. Vérifiez que vous ne voyez pas les options admin

### Test 3 : Email Déjà Utilisé
1. Essayez de vous inscrire avec un email déjà enregistré
2. Vérifiez que le message "Cet email est déjà utilisé" s'affiche

---

## 🔒 Sécurité

### Pourquoi les admins ne peuvent pas s'inscrire ?

1. **Sécurité renforcée** : Empêche l'auto-promotion de rôle
2. **Contrôle d'accès** : Un admin doit approuver les autres admins
3. **Audit trail** : Trace de qui crée les comptes admin
4. **Principe du moindre privilège** : Par défaut, tout le monde est commercial

### Règles Firestore Appliquées

```javascript
// Dans firestore.rules
match /users/{userId} {
  allow read: if isAuthenticated();
  allow create: if isAdmin(); // Seul un admin peut créer des users
  allow update, delete: if isAdmin() || isOwner(userId);
}
```

⚠️ **Note** : Le service `authService.register()` crée l'utilisateur dans Firebase Auth ET dans Firestore avec le rôle "commercial" hardcodé. Il n'y a aucun moyen via l'interface de se créer un compte admin.

---

## ✅ Checklist après Déploiement

- [ ] Tester l'inscription d'un commercial
- [ ] Vérifier que le rôle est bien "commercial" dans Firestore
- [ ] Créer au moins un compte admin manuellement
- [ ] Tester la connexion admin
- [ ] Vérifier les permissions (admin voit tout, commercial voit uniquement ses leads)
- [ ] Tester la validation du formulaire
- [ ] Tester les messages d'erreur
- [ ] Vérifier que les règles Firestore sont bien déployées

---

## 🆘 Dépannage

### Problème : "Email déjà utilisé" mais je ne trouve pas l'utilisateur
- Vérifiez dans Firebase Authentication
- L'utilisateur peut être dans Auth mais pas dans Firestore
- Solution : Supprimez l'utilisateur dans Auth et réessayez

### Problème : L'inscription réussit mais je ne peux pas me connecter
- Vérifiez que le document Firestore a bien été créé
- Vérifiez l'UID dans Auth correspond au document ID dans Firestore
- Vérifiez que le champ `role` est bien défini

### Problème : Un commercial a des droits admin
- Vérifiez le champ `role` dans Firestore
- Il doit être "commercial", pas "admin"
- Si c'est incorrect, modifiez-le manuellement dans Firestore

---

## 📞 Support

Pour toute question sur la gestion des utilisateurs, consultez :
- La documentation Firebase Authentication
- La documentation Firestore
- Ce guide

**Bon déploiement ! 🚀**
