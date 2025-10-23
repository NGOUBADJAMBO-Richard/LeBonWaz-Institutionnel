import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Attendre que Firestore soit prêt avant de récupérer les données
      try {
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data()?.role);
        } else {
          console.warn('User document does not exist in Firestore');
          setUserRole('commercial'); // Rôle par défaut
        }
      } catch (firestoreError) {
        console.error('Error fetching user role:', firestoreError);
        // Ne pas bloquer la connexion si Firestore échoue
        setUserRole('commercial'); // Rôle par défaut
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data()?.role);
          } else {
            console.warn('User document does not exist in Firestore');
            setUserRole('commercial'); // Rôle par défaut
          }
        } catch (firestoreError) {
          console.error('Error fetching user data:', firestoreError);
          setError('Impossible de récupérer les données utilisateur. Vérifiez votre connexion.');
          setUserRole('commercial'); // Rôle par défaut
        }
      } else {
        setUserRole(null);
        setError(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    logout,
    error,
    isAdmin: userRole === 'admin',
    isCommercial: userRole === 'commercial'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
