import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Stockage local pour le mode hors ligne
const INTERACTIONS_STORAGE_KEY = 'lms_interactions_offline';

const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erreur sauvegarde locale:', error);
  }
};

const getFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lecture locale:', error);
    return null;
  }
};

export const interactionService = {
  // Ajouter une interaction
  async createInteraction(leadId, userId, interactionData) {
    try {
      const interactionWithMeta = {
        leadId,
        userId,
        ...interactionData,
        createdAt: serverTimestamp(),
        isReadOnly: true
      };

      const docRef = await addDoc(collection(db, 'interactions'), interactionWithMeta);
      
      // Sauvegarder localement
      const interactions = getFromLocalStorage(INTERACTIONS_STORAGE_KEY) || [];
      const newInteraction = {
        id: docRef.id,
        leadId,
        userId,
        ...interactionData,
        createdAt: new Date().toISOString(),
        isReadOnly: true
      };
      interactions.push(newInteraction);
      saveToLocalStorage(INTERACTIONS_STORAGE_KEY, interactions);
      
      return { success: true, id: docRef.id, data: newInteraction };
    } catch (error) {
      console.error('Error creating interaction:', error);
      
      // Mode hors ligne
      if (error.code === 'unavailable' || !navigator.onLine) {
        const tempId = `temp_interaction_${Date.now()}`;
        const newInteraction = {
          id: tempId,
          leadId,
          userId,
          ...interactionData,
          createdAt: new Date().toISOString(),
          isReadOnly: true,
          isOffline: true
        };
        
        // Sauvegarder localement
        const interactions = getFromLocalStorage(INTERACTIONS_STORAGE_KEY) || [];
        interactions.push(newInteraction);
        saveToLocalStorage(INTERACTIONS_STORAGE_KEY, interactions);
        
        return { success: true, id: tempId, data: newInteraction, offline: true };
      }
      
      return { success: false, error: error.message };
    }
  },

  // Récupérer les interactions d'un lead
  async getInteractionsByLead(leadId) {
    try {
      const q = query(
        collection(db, 'interactions'),
        where('leadId', '==', leadId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const firebaseInteractions = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
      
      // Mettre à jour le cache local
      const allInteractions = getFromLocalStorage(INTERACTIONS_STORAGE_KEY) || [];
      const otherInteractions = allInteractions.filter(int => int.leadId !== leadId);
      const updatedInteractions = [...otherInteractions, ...firebaseInteractions];
      saveToLocalStorage(INTERACTIONS_STORAGE_KEY, updatedInteractions);
      
      return firebaseInteractions;
    } catch (error) {
      console.error('Error fetching interactions:', error);
      
      // Mode hors ligne
      const interactions = getFromLocalStorage(INTERACTIONS_STORAGE_KEY) || [];
      return interactions
        .filter(interaction => interaction.leadId === leadId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },

  // Récupérer les interactions d'un utilisateur
  async getInteractionsByUser(userId) {
    try {
      const q = query(
        collection(db, 'interactions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const firebaseInteractions = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
      
      return firebaseInteractions;
    } catch (error) {
      console.error('Error fetching user interactions:', error);
      
      // Mode hors ligne
      const interactions = getFromLocalStorage(INTERACTIONS_STORAGE_KEY) || [];
      return interactions
        .filter(interaction => interaction.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  },

  // Récupérer les interactions récentes
  async getRecentInteractions(limit = 10) {
    try {
      const interactions = getFromLocalStorage(INTERACTIONS_STORAGE_KEY) || [];
      return interactions
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent interactions:', error);
      return [];
    }
  }
};