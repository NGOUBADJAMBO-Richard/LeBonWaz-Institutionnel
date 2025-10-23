import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const authService = {
  // Créer un nouvel utilisateur
  async register(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Créer le document utilisateur dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        ...userData,
        createdAt: new Date().toISOString()
      });
      
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  },

  // Connexion
  async login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },

  // Déconnexion
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },

  // Réinitialiser le mot de passe
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtenir les données utilisateur
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
