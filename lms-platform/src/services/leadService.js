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
  limit,
  startAfter 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const leadService = {
  // Créer un nouveau lead
  async createLead(leadData, userId) {
    if (!db) {
      return { success: false, error: 'Base de données non disponible' };
    }

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
      console.error('Erreur lors de la création du lead:', error);
      return { success: false, error: error.message };
    }
  },

  // Récupérer les leads d'un commercial
  async getLeadsByUser(userId) {
    if (!db) {
      console.error('Base de données non disponible');
      return [];
    }

    try {
      const q = query(
        collection(db, 'leads'),
        where('assignedToUserId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des leads:', error);
      // Si l'index n'existe pas encore, essayer sans orderBy
      if (error.code === 'failed-precondition') {
        try {
          const q = query(
            collection(db, 'leads'),
            where('assignedToUserId', '==', userId)
          );
          const snapshot = await getDocs(q);
          const leads = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
          }));
          // Trier manuellement
          return leads.sort((a, b) => b.createdAt - a.createdAt);
        } catch (fallbackError) {
          console.error('Erreur de fallback:', fallbackError);
          return [];
        }
      }
      return [];
    }
  },

  // Récupérer tous les leads (Admin)
  async getAllLeads() {
    if (!db) {
      console.error('Base de données non disponible');
      return [];
    }

    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les leads:', error);
      // Fallback sans orderBy
      try {
        const snapshot = await getDocs(collection(db, 'leads'));
        const leads = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
        }));
        return leads.sort((a, b) => b.createdAt - a.createdAt);
      } catch (fallbackError) {
        console.error('Erreur de fallback:', fallbackError);
        return [];
      }
    }
  },

  // Mettre à jour un lead
  async updateLead(leadId, updateData) {
    if (!db) {
      return { success: false, error: 'Base de données non disponible' };
    }

    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lead:', error);
      return { success: false, error: error.message };
    }
  },

  // Changer le statut d'un lead
  async changeStatus(leadId, newStatus, userId) {
    if (!db) {
      return { success: false, error: 'Base de données non disponible' };
    }

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
      console.error('Erreur lors du changement de statut:', error);
      return { success: false, error: error.message };
    }
  },

  // Récupérer un lead par ID
  async getLeadById(leadId) {
    if (!db) {
      console.error('Base de données non disponible');
      return null;
    }

    try {
      const docSnap = await getDoc(doc(db, 'leads', leadId));
      if (docSnap.exists()) {
        return { 
          id: docSnap.id, 
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate?.() || new Date()
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du lead:', error);
      return null;
    }
  },

  // Supprimer un lead (Admin uniquement)
  async deleteLead(leadId) {
    if (!db) {
      return { success: false, error: 'Base de données non disponible' };
    }

    try {
      await deleteDoc(doc(db, 'leads', leadId));
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression du lead:', error);
      return { success: false, error: error.message };
    }
  },

  // Rechercher des leads
  async searchLeads(searchTerm, userId = null, isAdmin = false) {
    if (!db) {
      return [];
    }

    try {
      let q;
      if (isAdmin) {
        q = query(collection(db, 'leads'));
      } else {
        q = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId)
        );
      }
      
      const snapshot = await getDocs(q);
      const leads = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date()
      }));
      
      // Filtrer localement par le terme de recherche
      const searchLower = searchTerm.toLowerCase();
      return leads.filter(lead => 
        lead.nom?.toLowerCase().includes(searchLower) ||
        lead.prenom?.toLowerCase().includes(searchLower) ||
        lead.entreprise?.toLowerCase().includes(searchLower) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.telephone?.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      return [];
    }
  },

  // Obtenir les statistiques des leads
  async getLeadStats(userId = null, isAdmin = false) {
    if (!db) {
      return null;
    }

    try {
      let q;
      if (isAdmin) {
        q = query(collection(db, 'leads'));
      } else {
        q = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId)
        );
      }
      
      const snapshot = await getDocs(q);
      const leads = snapshot.docs.map(doc => doc.data());
      
      const stats = {
        total: leads.length,
        parStatus: {},
        parSource: {},
        tauxConversion: 0
      };
      
      leads.forEach(lead => {
        // Compter par status
        stats.parStatus[lead.status] = (stats.parStatus[lead.status] || 0) + 1;
        
        // Compter par source
        stats.parSource[lead.source] = (stats.parSource[lead.source] || 0) + 1;
      });
      
      // Calculer le taux de conversion
      const convertis = stats.parStatus['converti'] || 0;
      stats.tauxConversion = stats.total > 0 ? (convertis / stats.total * 100).toFixed(2) : 0;
      
      return stats;
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      return null;
    }
  }
};