import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore connectivity workarounds (fix offline errors in restricted envs)
initializeFirestore(app, {
  experimentalForceLongPolling: process.env.REACT_APP_FIRESTORE_FORCE_LONG_POLLING === 'true',
  useFetchStreams: process.env.REACT_APP_FIRESTORE_USE_FETCH_STREAMS === 'true',
});

// Initialize services
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
export const db = getFirestore(app);

export default app;
