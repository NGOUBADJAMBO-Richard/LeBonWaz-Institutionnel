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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Gestion de la connectivité réseau
let isOffline = false;

// Fonction pour gérer la reconnexion
export const handleNetworkChange = async () => {
  try {
    if (navigator.onLine && isOffline) {
      await enableNetwork(db);
      isOffline = false;
      console.log('Firebase reconnecté');
    } else if (!navigator.onLine && !isOffline) {
      await disableNetwork(db);
      isOffline = true;
      console.log('Firebase hors ligne');
    }
  } catch (error) {
    console.error('Erreur lors du changement de réseau:', error);
  }
};

// Écouter les changements de connectivité
window.addEventListener('online', handleNetworkChange);
window.addEventListener('offline', handleNetworkChange);

// Configuration pour le développement local (optionnel)
if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost') {
  // Décommentez ces lignes si vous utilisez l'émulateur Firebase
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
}

export default app;