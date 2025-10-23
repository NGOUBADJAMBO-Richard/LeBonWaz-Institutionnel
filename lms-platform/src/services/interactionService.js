import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const interactionService = {
  async createInteraction(leadId, userId, interactionData) {
    try {
      const docRef = await addDoc(collection(db, 'interactions'), {
        leadId,
        userId,
        ...interactionData,
        createdAt: serverTimestamp(),
        isReadOnly: true,
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating interaction:', error);
      return { success: false, error: error.message };
    }
  },

  async getInteractionsByLead(leadId) {
    try {
      const q = query(
        collection(db, 'interactions'),
        where('leadId', '==', leadId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (error) {
      console.error('Error fetching interactions:', error);
      return [];
    }
  },

  async getInteractionsByUser(userId) {
    try {
      const q = query(
        collection(db, 'interactions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (error) {
      console.error('Error fetching user interactions:', error);
      return [];
    }
  },
};
