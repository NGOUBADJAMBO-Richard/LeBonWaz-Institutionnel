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

export const interactionService = {
  // Ajouter une interaction
  async createInteraction(leadId, userId, interactionData) {
    try {
      const docRef = await addDoc(collection(db, 'interactions'), {
        leadId,
        userId,
        ...interactionData,
        createdAt: serverTimestamp(),
        isReadOnly: true
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating interaction:', error);
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
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching interactions:', error);
      return [];
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
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching user interactions:', error);
      return [];
    }
  },

  // Récupérer toutes les interactions (Admin)
  async getAllInteractions() {
    try {
      const q = query(collection(db, 'interactions'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching all interactions:', error);
      return [];
    }
  }
};
