import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const interactionService = {
  // Ajouter une interaction
  async createInteraction(leadId, userId, interactionData) {
    try {
      const docRef = await addDoc(collection(db, 'interactions'), {
        leadId,
        userId,
        type: interactionData.type,
        content: interactionData.content,
        sentiment: interactionData.sentiment || 'Neutre',
        nextSteps: interactionData.nextSteps || '',
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
  async getInteractionsByUser(userId, limitCount = 50) {
    try {
      const q = query(
        collection(db, 'interactions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching user interactions:', error);
      return [];
    }
  },

  // Récupérer les dernières interactions
  async getRecentInteractions(limitCount = 10) {
    try {
      const q = query(
        collection(db, 'interactions'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching recent interactions:', error);
      return [];
    }
  }
};
