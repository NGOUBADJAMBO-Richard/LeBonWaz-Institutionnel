import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// Force long polling to fix "client is offline" in some environments (CORS/proxy/Corporate)
initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  localCache: persistentLocalCache({ cacheSizeBytes: CACHE_SIZE_UNLIMITED })
});

export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: use emulators in local development if env flags are set
if (process.env.REACT_APP_USE_EMULATORS === 'true') {
  import('firebase/auth').then(({ connectAuthEmulator }) => {
    try { connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true }); } catch {}
  });
  import('firebase/firestore').then(({ connectFirestoreEmulator }) => {
    try { connectFirestoreEmulator(db, 'localhost', 8080); } catch {}
  });
}

export default app;
