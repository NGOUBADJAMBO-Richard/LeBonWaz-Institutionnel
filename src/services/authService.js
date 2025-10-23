import { 
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const authService = {
  // Connexion
  async login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: error.message };
    }
  },

  // Déconnexion
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      return { success: false, error: error.message };
    }
  },

  // Inscription
  async register(email, password, userData) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Créer le document utilisateur dans Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        ...userData,
        email: result.user.email,
        createdAt: new Date(),
        lastLogin: new Date()
      });
      
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Error registering:', error);
      return { success: false, error: error.message };
    }
  },

  // Récupérer les données utilisateur
  async getUserData(userId) {
    try {
      const docSnap = await getDoc(doc(db, 'users', userId));
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      }
      return { success: false, error: 'User not found' };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { success: false, error: error.message };
    }
  }
};