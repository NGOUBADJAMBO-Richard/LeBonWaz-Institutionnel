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
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Récupérer le profil utilisateur
      try {
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
          setUserProfile(userData);
        } else {
          // Créer un profil par défaut si n'existe pas
          const defaultProfile = {
            email: result.user.email,
            role: 'commercial',
            firstName: '',
            lastName: '',
            createdAt: new Date()
          };
          setUserRole('commercial');
          setUserProfile(defaultProfile);
        }
      } catch (firestoreError) {
        console.warn('Erreur Firestore, utilisation du mode hors ligne:', firestoreError);
        // Mode dégradé sans Firestore
        setUserRole('commercial');
        setUserProfile({
          email: result.user.email,
          role: 'commercial',
          firstName: '',
          lastName: ''
        });
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      setUserProfile(null);
      setError(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.role);
            setUserProfile(userData);
          } else {
            // Profil par défaut
            setUserRole('commercial');
            setUserProfile({
              email: user.email,
              role: 'commercial',
              firstName: '',
              lastName: ''
            });
          }
        } catch (error) {
          console.warn('Erreur lors de la récupération du profil:', error);
          // Mode dégradé
          setUserRole('commercial');
          setUserProfile({
            email: user.email,
            role: 'commercial',
            firstName: '',
            lastName: ''
          });
        }
      } else {
        setUserRole(null);
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    userProfile,
    login,
    logout,
    error,
    setError,
    isAdmin: userRole === 'admin',
    isCommercial: userRole === 'commercial',
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};