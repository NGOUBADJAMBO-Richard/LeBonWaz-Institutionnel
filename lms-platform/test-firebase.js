// Script de test pour vérifier la configuration Firebase
// Exécuter avec: node test-firebase.js

const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

async function testFirebaseConnection() {
  try {
    console.log('🔍 Test de la connexion Firebase...');
    
    // Vérifier la configuration
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here') {
      throw new Error('❌ Configuration Firebase manquante dans .env');
    }
    
    // Initialiser Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    
    console.log('✅ Firebase initialisé avec succès');
    console.log('📊 Configuration:');
    console.log(`   - Project ID: ${firebaseConfig.projectId}`);
    console.log(`   - Auth Domain: ${firebaseConfig.authDomain}`);
    
    // Test de connexion à Firestore (lecture seule)
    try {
      const testCollection = collection(db, 'test');
      await getDocs(testCollection);
      console.log('✅ Connexion à Firestore réussie');
    } catch (error) {
      if (error.code === 'permission-denied') {
        console.log('⚠️  Firestore accessible mais règles restrictives (normal)');
      } else {
        throw error;
      }
    }
    
    console.log('🎉 Configuration Firebase valide!');
    console.log('\n📝 Prochaines étapes:');
    console.log('1. Créer un utilisateur admin dans Firebase Console');
    console.log('2. Déployer les règles Firestore');
    console.log('3. Lancer l\'application: npm start');
    
  } catch (error) {
    console.error('❌ Erreur de configuration Firebase:', error.message);
    console.log('\n🔧 Solutions:');
    console.log('1. Vérifiez vos clés dans .env');
    console.log('2. Vérifiez votre connexion internet');
    console.log('3. Vérifiez que le projet Firebase existe');
  }
}

testFirebaseConnection();