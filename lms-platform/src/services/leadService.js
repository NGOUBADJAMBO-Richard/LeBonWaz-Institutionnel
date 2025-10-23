import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  query, 
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const leadService = {
  // Créer un nouveau lead
  async createLead(leadData, userId) {
    try {
      const docRef = await addDoc(collection(db, 'leads'), {
        ...leadData,
        assignedToUserId: userId,
        createdBy: userId,
        status: 'nouveau',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating lead:', error);
      return { success: false, error: error.message };
    }
  },

  // Récupérer les leads d'un commercial
  async getLeadsByUser(userId) {
    try {
      const q = query(
        collection(db, 'leads'),
        where('assignedToUserId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching leads:', error);
      return [];
    }
  },

  // Récupérer tous les leads (Admin)
  async getAllLeads() {
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching all leads:', error);
      return [];
    }
  },

  // Mettre à jour un lead
  async updateLead(leadId, updateData) {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating lead:', error);
      return { success: false, error: error.message };
    }
  },

  // Changer le statut d'un lead
  async changeStatus(leadId, newStatus, userId) {
    try {
      await this.updateLead(leadId, { status: newStatus });
      
      // Enregistrer dans l'historique
      await addDoc(collection(db, 'leadStatusHistory'), {
        leadId,
        newStatus,
        changedBy: userId,
        changedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error changing status:', error);
      return { success: false, error: error.message };
    }
  },

  // Supprimer un lead
  async deleteLead(leadId) {
    try {
      await deleteDoc(doc(db, 'leads', leadId));
      return { success: true };
    } catch (error) {
      console.error('Error deleting lead:', error);
      return { success: false, error: error.message };
    }
  },

  // Récupérer un lead par ID
  async getLeadById(leadId) {
    try {
      const docSnap = await getDoc(doc(db, 'leads', leadId));
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching lead:', error);
      return null;
    }
  }
};
