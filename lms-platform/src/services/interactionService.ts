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
import { InteractionType, SentimentOption } from '../config/constants';

export interface Interaction {
  id?: string;
  leadId: string;
  userId: string;
  type: InteractionType;
  description: string;
  sentiment?: SentimentOption;
  nextAction?: string;
  nextActionDate?: Date;
  createdAt?: any;
  isReadOnly?: boolean;
}

export const interactionService = {
  // Ajouter une interaction
  async createInteraction(leadId: string, userId: string, interactionData: Omit<Interaction, 'id' | 'leadId' | 'userId' | 'createdAt' | 'isReadOnly'>) {
    try {
      const docRef = await addDoc(collection(db, 'interactions'), {
        leadId,
        userId,
        ...interactionData,
        createdAt: serverTimestamp(),
        isReadOnly: true
      });
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('Error creating interaction:', error);
      return { success: false, error: error.message };
    }
  },

  // Récupérer les interactions d'un lead
  async getInteractionsByLead(leadId: string): Promise<Interaction[]> {
    try {
      const q = query(
        collection(db, 'interactions'),
        where('leadId', '==', leadId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Interaction));
    } catch (error) {
      console.error('Error fetching interactions:', error);
      return [];
    }
  },

  // Récupérer les interactions d'un utilisateur
  async getInteractionsByUser(userId: string): Promise<Interaction[]> {
    try {
      const q = query(
        collection(db, 'interactions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Interaction));
    } catch (error) {
      console.error('Error fetching user interactions:', error);
      return [];
    }
  }
};