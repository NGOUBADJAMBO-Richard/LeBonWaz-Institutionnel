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
  serverTimestamp,
  limit
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
        status: leadData.status || 'nouveau',
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
  async changeStatus(leadId, newStatus, userId, reason = '') {
    try {
      // Get current status
      const leadDoc = await getDoc(doc(db, 'leads', leadId));
      const previousStatus = leadDoc.data()?.status;

      // Update lead status
      await updateDoc(doc(db, 'leads', leadId), { 
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      
      // Enregistrer dans l'historique
      await addDoc(collection(db, 'leadStatusHistory'), {
        leadId,
        previousStatus,
        newStatus,
        changedBy: userId,
        changedAt: serverTimestamp(),
        reason
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error changing status:', error);
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

  // Rechercher des leads
  async searchLeads(searchTerm, userId, isAdmin = false) {
    try {
      let q;
      if (isAdmin) {
        q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      } else {
        q = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId),
          orderBy('createdAt', 'desc')
        );
      }
      
      const snapshot = await getDocs(q);
      let leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        leads = leads.filter(lead => 
          lead.firstName?.toLowerCase().includes(term) ||
          lead.lastName?.toLowerCase().includes(term) ||
          lead.company?.toLowerCase().includes(term) ||
          lead.email?.toLowerCase().includes(term) ||
          lead.phone?.includes(term)
        );
      }
      
      return leads;
    } catch (error) {
      console.error('Error searching leads:', error);
      return [];
    }
  },

  // Filtrer les leads par statut
  async getLeadsByStatus(status, userId, isAdmin = false) {
    try {
      let q;
      if (isAdmin) {
        q = query(
          collection(db, 'leads'),
          where('status', '==', status),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId),
          where('status', '==', status),
          orderBy('createdAt', 'desc')
        );
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching leads by status:', error);
      return [];
    }
  }
};
