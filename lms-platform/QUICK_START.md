# 🚀 Guide de Démarrage Rapide - Plateforme LMS

## ⚡ Démarrage en 5 minutes

### 1. Configuration Firebase (2 min)

1. **Créer un projet Firebase** :
   - Allez sur [Firebase Console](https://console.firebase.google.com/)
   - Cliquez "Créer un projet"
   - Suivez les étapes de création

2. **Activer les services** :
   - **Authentication** : Onglet "Authentication" → "Sign-in method" → Activez "Email/Password"
   - **Firestore** : Onglet "Firestore Database" → "Créer une base de données" → Mode "Test"

3. **Récupérer les clés** :
   - Onglet "Project Settings" (⚙️)
   - Section "Your apps" → "Web app"
   - Copiez la configuration dans `.env`

### 2. Configuration de l'application (1 min)

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env avec vos vraies clés Firebase
nano .env
```

### 3. Créer le premier utilisateur admin (1 min)

**Option A - Via Firebase Console :**
1. Onglet "Authentication" → "Users" → "Add user"
2. Email: `admin@example.com`, Password: `admin123456`
3. Onglet "Firestore Database" → "Start collection" → "users"
4. Document ID: `[UID_de_l_utilisateur]`
5. Champs:
   ```json
   {
     "email": "admin@example.com",
     "role": "admin",
     "firstName": "Admin",
     "lastName": "User",
     "createdAt": "2024-01-01T00:00:00Z"
   }
   ```

**Option B - Via script (recommandé) :**
```bash
# Tester la configuration
node test-firebase.js

# Si OK, créer l'admin (nécessite Firebase Admin SDK)
node setup-firebase.js
```

### 4. Déployer les règles de sécurité (1 min)

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

### 5. Lancer l'application (30 sec)

```bash
# Démarrer le serveur
npm start

# Ouvrir http://localhost:3000
# Se connecter avec admin@example.com / admin123456
```

## ✅ Vérification

Votre application devrait maintenant :
- ✅ Se connecter sans erreur "offline"
- ✅ Afficher la page de connexion
- ✅ Permettre la connexion admin
- ✅ Afficher le dashboard
- ✅ Permettre la gestion des leads

## 🆘 Problèmes courants

### Erreur "client is offline"
- Vérifiez vos clés dans `.env`
- Vérifiez que Firestore est activé
- Vérifiez votre connexion internet

### Erreur de permission
- Déployez les règles Firestore
- Vérifiez que l'utilisateur admin existe

### Erreur d'authentification
- Vérifiez que l'utilisateur admin a le bon rôle
- Vérifiez que l'Authentication est activée

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez `TROUBLESHOOTING.md`
2. Vérifiez les logs de la console
3. Testez avec `node test-firebase.js`