// Script de test pour vérifier la configuration Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log('Configuration Firebase:');
console.log('API Key:', firebaseConfig.apiKey ? '✓ Configuré' : '✗ Manquant');
console.log('Auth Domain:', firebaseConfig.authDomain ? '✓ Configuré' : '✗ Manquant');
console.log('Project ID:', firebaseConfig.projectId ? '✓ Configuré' : '✗ Manquant');
console.log('Storage Bucket:', firebaseConfig.storageBucket ? '✓ Configuré' : '✗ Manquant');
console.log('Messaging Sender ID:', firebaseConfig.messagingSenderId ? '✓ Configuré' : '✗ Manquant');
console.log('App ID:', firebaseConfig.appId ? '✓ Configuré' : '✗ Manquant');

try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log('✓ Firebase initialisé avec succès');
  console.log('✓ Firestore connecté');
} catch (error) {
  console.error('✗ Erreur lors de l\'initialisation Firebase:', error.message);
}