// Script pour configurer Firebase et créer le premier utilisateur admin
// Exécuter avec: node setup-firebase.js

const admin = require('firebase-admin');

// Configuration Firebase Admin (remplacez par vos clés de service)
const serviceAccount = {
  // Ajoutez ici votre clé de service Firebase
  // Téléchargez depuis: Firebase Console > Project Settings > Service Accounts
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function createAdminUser() {
  try {
    // Créer un utilisateur admin
    const adminUser = await admin.auth().createUser({
      email: 'admin@lms-platform.com',
      password: 'admin123456',
      displayName: 'Admin User'
    });

    // Ajouter le rôle admin dans Firestore
    await db.collection('users').doc(adminUser.uid).set({
      email: 'admin@lms-platform.com',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ Utilisateur admin créé avec succès!');
    console.log('Email: admin@lms-platform.com');
    console.log('Mot de passe: admin123456');
    console.log('UID:', adminUser.uid);

  } catch (error) {
    console.error('❌ Erreur lors de la création de l\'utilisateur admin:', error);
  }
}

// Exécuter le script
createAdminUser().then(() => {
  console.log('🎉 Configuration terminée!');
  process.exit(0);
});