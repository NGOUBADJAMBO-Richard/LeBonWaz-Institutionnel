import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Vérifier que les variables d'environnement sont définies
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variables d\'environnement Firebase manquantes:', missingVars);
  console.error('Veuillez créer un fichier .env à la racine du projet et ajouter vos clés Firebase.');
  console.error('Utilisez le fichier .env.example comme modèle.');
}

// Initialize Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  // Activer la persistance offline avec gestion d'erreur
  if (db) {
    // Vérifier la connexion réseau
    enableNetwork(db).catch((error) => {
      console.warn('⚠️ Mode hors ligne activé:', error.message);
    });
  }

  console.log('✅ Firebase initialisé avec succès');
} catch (error) {
  console.error('❌ Erreur lors de l\'initialisation de Firebase:', error);
  console.error('Assurez-vous que votre fichier .env contient les bonnes clés Firebase.');
}

// Fonction pour vérifier la connexion Firebase
export const checkFirebaseConnection = async () => {
  try {
    if (db) {
      await enableNetwork(db);
      console.log('✅ Connexion Firebase établie');
      return true;
    }
  } catch (error) {
    console.error('❌ Impossible de se connecter à Firebase:', error);
    return false;
  }
};

// Fonction pour gérer le mode hors ligne
export const setOfflineMode = async (offline) => {
  try {
    if (offline) {
      await disableNetwork(db);
      console.log('📴 Mode hors ligne activé');
    } else {
      await enableNetwork(db);
      console.log('📶 Mode en ligne activé');
    }
  } catch (error) {
    console.error('Erreur lors du changement de mode:', error);
  }
};

export { auth, db };
export default app;