import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db, checkFirebaseConnection } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  // Vérifier la connexion Firebase au démarrage
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkFirebaseConnection();
      setIsOnline(connected);
      if (!connected) {
        setError('Mode hors ligne - Certaines fonctionnalités peuvent être limitées');
      }
    };
    checkConnection();
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Essayer de récupérer les données utilisateur
      if (db && isOnline) {
        try {
          const userDoc = await getDoc(doc(db, 'users', result.user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data()?.role);
          } else {
            // Si le document n'existe pas, créer un utilisateur par défaut
            await setDoc(doc(db, 'users', result.user.uid), {
              email: result.user.email,
              role: 'commercial',
              createdAt: serverTimestamp(),
              lastLogin: serverTimestamp()
            });
            setUserRole('commercial');
          }
        } catch (firestoreError) {
          console.error('Erreur Firestore:', firestoreError);
          // Continuer même si Firestore échoue
          setUserRole('commercial');
        }
      }
      
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = 'Erreur de connexion';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Aucun utilisateur trouvé avec cet email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Mot de passe incorrect';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email invalide';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Problème de connexion réseau';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (email, password, role = 'commercial') => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Créer le document utilisateur dans Firestore
      if (db && isOnline) {
        await setDoc(doc(db, 'users', result.user.uid), {
          email: result.user.email,
          role: role,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp()
        });
        setUserRole(role);
      }
      
      return { success: true, user: result.user };
    } catch (error) {
      let errorMessage = 'Erreur lors de l\'inscription';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Cet email est déjà utilisé';
          break;
        case 'auth/weak-password':
          errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email invalide';
          break;
        default:
          errorMessage = error.message;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUserRole(null);
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);
        
        if (user && db && isOnline) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              setUserRole(userDoc.data()?.role);
            } else {
              // Créer un document utilisateur par défaut si nécessaire
              setUserRole('commercial');
            }
          } catch (error) {
            console.warn('Impossible de récupérer le rôle utilisateur:', error);
            setUserRole('commercial'); // Rôle par défaut
          }
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error('Erreur dans onAuthStateChanged:', error);
        setError('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [isOnline]);

  const value = {
    currentUser,
    userRole,
    login,
    logout,
    register,
    resetPassword,
    isAdmin: userRole === 'admin',
    isCommercial: userRole === 'commercial',
    loading,
    error,
    isOnline,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};