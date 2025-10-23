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

// Stockage local pour le mode hors ligne
const LEADS_STORAGE_KEY = 'lms_leads_offline';
const PENDING_OPERATIONS_KEY = 'lms_pending_operations';

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

const addPendingOperation = (operation) => {
  const pending = getFromLocalStorage(PENDING_OPERATIONS_KEY) || [];
  pending.push({ ...operation, timestamp: Date.now() });
  saveToLocalStorage(PENDING_OPERATIONS_KEY, pending);
};

export const leadService = {
  // Créer un nouveau lead
  async createLead(leadData, userId) {
    try {
      const leadWithMeta = {
        ...leadData,
        assignedToUserId: userId,
        createdBy: userId,
        status: 'nouveau',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'leads'), leadWithMeta);
      
      // Sauvegarder localement
      const leads = getFromLocalStorage(LEADS_STORAGE_KEY) || [];
      const newLead = { 
        id: docRef.id, 
        ...leadData,
        assignedToUserId: userId,
        createdBy: userId,
        status: 'nouveau',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      leads.push(newLead);
      saveToLocalStorage(LEADS_STORAGE_KEY, leads);
      
      return { success: true, id: docRef.id, data: newLead };
    } catch (error) {
      console.error('Error creating lead:', error);
      
      // Mode hors ligne
      if (error.code === 'unavailable' || !navigator.onLine) {
        const tempId = `temp_${Date.now()}`;
        const newLead = {
          id: tempId,
          ...leadData,
          assignedToUserId: userId,
          createdBy: userId,
          status: 'nouveau',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isOffline: true
        };
        
        // Sauvegarder localement
        const leads = getFromLocalStorage(LEADS_STORAGE_KEY) || [];
        leads.push(newLead);
        saveToLocalStorage(LEADS_STORAGE_KEY, leads);
        
        // Ajouter à la queue des opérations en attente
        addPendingOperation({
          type: 'CREATE_LEAD',
          data: leadData,
          userId,
          tempId
        });
        
        return { success: true, id: tempId, data: newLead, offline: true };
      }
      
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
      const firebaseLeads = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));
      
      // Sauvegarder localement
      saveToLocalStorage(LEADS_STORAGE_KEY, firebaseLeads);
      
      return firebaseLeads;
    } catch (error) {
      console.error('Error fetching leads:', error);
      
      // Mode hors ligne - retourner les données locales
      const localLeads = getFromLocalStorage(LEADS_STORAGE_KEY) || [];
      return localLeads.filter(lead => lead.assignedToUserId === userId);
    }
  },

  // Récupérer tous les leads (Admin)
  async getAllLeads() {
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const firebaseLeads = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
      }));
      
      // Sauvegarder localement
      saveToLocalStorage(LEADS_STORAGE_KEY, firebaseLeads);
      
      return firebaseLeads;
    } catch (error) {
      console.error('Error fetching all leads:', error);
      
      // Mode hors ligne
      return getFromLocalStorage(LEADS_STORAGE_KEY) || [];
    }
  },

  // Mettre à jour un lead
  async updateLead(leadId, updateData) {
    try {
      const leadRef = doc(db, 'leads', leadId);
      const updateWithTimestamp = {
        ...updateData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(leadRef, updateWithTimestamp);
      
      // Mettre à jour localement
      const leads = getFromLocalStorage(LEADS_STORAGE_KEY) || [];
      const updatedLeads = leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, ...updateData, updatedAt: new Date().toISOString() }
          : lead
      );
      saveToLocalStorage(LEADS_STORAGE_KEY, updatedLeads);
      
      return { success: true };
    } catch (error) {
      console.error('Error updating lead:', error);
      
      // Mode hors ligne
      if (error.code === 'unavailable' || !navigator.onLine) {
        // Mettre à jour localement
        const leads = getFromLocalStorage(LEADS_STORAGE_KEY) || [];
        const updatedLeads = leads.map(lead => 
          lead.id === leadId 
            ? { ...lead, ...updateData, updatedAt: new Date().toISOString(), isOffline: true }
            : lead
        );
        saveToLocalStorage(LEADS_STORAGE_KEY, updatedLeads);
        
        // Ajouter à la queue
        addPendingOperation({
          type: 'UPDATE_LEAD',
          leadId,
          data: updateData
        });
        
        return { success: true, offline: true };
      }
      
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
      
      // Mode hors ligne
      if (error.code === 'unavailable' || !navigator.onLine) {
        await this.updateLead(leadId, { status: newStatus });
        
        addPendingOperation({
          type: 'STATUS_CHANGE',
          leadId,
          newStatus,
          userId
        });
        
        return { success: true, offline: true };
      }
      
      return { success: false, error: error.message };
    }
  },

  // Récupérer un lead par ID
  async getLeadById(leadId) {
    try {
      const docSnap = await getDoc(doc(db, 'leads', leadId));
      if (docSnap.exists()) {
        return { 
          id: docSnap.id, 
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate?.()?.toISOString() || docSnap.data().createdAt,
          updatedAt: docSnap.data().updatedAt?.toDate?.()?.toISOString() || docSnap.data().updatedAt
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching lead:', error);
      
      // Mode hors ligne
      const leads = getFromLocalStorage(LEADS_STORAGE_KEY) || [];
      return leads.find(lead => lead.id === leadId) || null;
    }
  },

  // Synchroniser les opérations en attente
  async syncPendingOperations() {
    const pending = getFromLocalStorage(PENDING_OPERATIONS_KEY) || [];
    const successful = [];
    
    for (const operation of pending) {
      try {
        switch (operation.type) {
          case 'CREATE_LEAD':
            await this.createLead(operation.data, operation.userId);
            successful.push(operation);
            break;
          case 'UPDATE_LEAD':
            await this.updateLead(operation.leadId, operation.data);
            successful.push(operation);
            break;
          case 'STATUS_CHANGE':
            await this.changeStatus(operation.leadId, operation.newStatus, operation.userId);
            successful.push(operation);
            break;
        }
      } catch (error) {
        console.error('Erreur sync operation:', error);
      }
    }
    
    // Supprimer les opérations réussies
    const remaining = pending.filter(op => !successful.includes(op));
    saveToLocalStorage(PENDING_OPERATIONS_KEY, remaining);
    
    return { synced: successful.length, remaining: remaining.length };
  }
};