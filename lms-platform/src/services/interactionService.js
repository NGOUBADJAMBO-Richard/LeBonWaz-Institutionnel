import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  limit,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const interactionService = {
  // Ajouter une interaction
  async createInteraction(leadId, userId, interactionData) {
    if (!db) {
      return { success: false, error: 'Base de données non disponible' };
    }

    try {
      const docRef = await addDoc(collection(db, 'interactions'), {
        leadId,
        userId,
        type: interactionData.type,
        description: interactionData.description,
        sentiment: interactionData.sentiment,
        nextAction: interactionData.nextAction || null,
        nextActionDate: interactionData.nextActionDate || null,
        createdAt: serverTimestamp(),
        isReadOnly: true
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Erreur lors de la création de l\'interaction:', error);
      return { success: false, error: error.message };
    }
  },

  // Récupérer les interactions d'un lead
  async getInteractionsByLead(leadId) {
    if (!db) {
      console.error('Base de données non disponible');
      return [];
    }

    try {
      const q = query(
        collection(db, 'interactions'),
        where('leadId', '==', leadId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des interactions:', error);
      // Fallback sans orderBy si l'index n'existe pas
      if (error.code === 'failed-precondition') {
        try {
          const q = query(
            collection(db, 'interactions'),
            where('leadId', '==', leadId)
          );
          const snapshot = await getDocs(q);
          const interactions = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
          }));
          // Trier manuellement
          return interactions.sort((a, b) => b.createdAt - a.createdAt);
        } catch (fallbackError) {
          console.error('Erreur de fallback:', fallbackError);
          return [];
        }
      }
      return [];
    }
  },

  // Récupérer les interactions d'un utilisateur
  async getInteractionsByUser(userId, limitCount = 50) {
    if (!db) {
      console.error('Base de données non disponible');
      return [];
    }

    try {
      const q = query(
        collection(db, 'interactions'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des interactions utilisateur:', error);
      // Fallback sans orderBy
      if (error.code === 'failed-precondition') {
        try {
          const q = query(
            collection(db, 'interactions'),
            where('userId', '==', userId)
          );
          const snapshot = await getDocs(q);
          const interactions = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
          }));
          // Trier et limiter manuellement
          return interactions
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, limitCount);
        } catch (fallbackError) {
          console.error('Erreur de fallback:', fallbackError);
          return [];
        }
      }
      return [];
    }
  },

  // Récupérer toutes les interactions récentes
  async getRecentInteractions(limitCount = 50) {
    if (!db) {
      console.error('Base de données non disponible');
      return [];
    }

    try {
      const q = query(
        collection(db, 'interactions'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des interactions récentes:', error);
      // Fallback sans orderBy
      try {
        const snapshot = await getDocs(collection(db, 'interactions'));
        const interactions = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date()
        }));
        return interactions
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, limitCount);
      } catch (fallbackError) {
        console.error('Erreur de fallback:', fallbackError);
        return [];
      }
    }
  },

  // Récupérer les prochaines actions
  async getUpcomingActions(userId = null, isAdmin = false) {
    if (!db) {
      return [];
    }

    try {
      let q;
      if (isAdmin) {
        q = query(
          collection(db, 'interactions'),
          where('nextActionDate', '!=', null),
          orderBy('nextActionDate', 'asc')
        );
      } else {
        q = query(
          collection(db, 'interactions'),
          where('userId', '==', userId),
          where('nextActionDate', '!=', null),
          orderBy('nextActionDate', 'asc')
        );
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        nextActionDate: doc.data().nextActionDate?.toDate?.() || null
      })).filter(interaction => {
        // Filtrer les actions futures uniquement
        const nextDate = interaction.nextActionDate;
        return nextDate && nextDate > new Date();
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des prochaines actions:', error);
      return [];
    }
  },

  // Supprimer une interaction (Admin uniquement)
  async deleteInteraction(interactionId) {
    if (!db) {
      return { success: false, error: 'Base de données non disponible' };
    }

    try {
      await deleteDoc(doc(db, 'interactions', interactionId));
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'interaction:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtenir les statistiques des interactions
  async getInteractionStats(userId = null, isAdmin = false) {
    if (!db) {
      return null;
    }

    try {
      let q;
      if (isAdmin) {
        q = query(collection(db, 'interactions'));
      } else {
        q = query(
          collection(db, 'interactions'),
          where('userId', '==', userId)
        );
      }
      
      const snapshot = await getDocs(q);
      const interactions = snapshot.docs.map(doc => doc.data());
      
      const stats = {
        total: interactions.length,
        parType: {},
        parSentiment: {},
        actionsEnAttente: 0
      };
      
      interactions.forEach(interaction => {
        // Compter par type
        stats.parType[interaction.type] = (stats.parType[interaction.type] || 0) + 1;
        
        // Compter par sentiment
        if (interaction.sentiment) {
          stats.parSentiment[interaction.sentiment] = (stats.parSentiment[interaction.sentiment] || 0) + 1;
        }
        
        // Compter les actions en attente
        if (interaction.nextActionDate) {
          const nextDate = interaction.nextActionDate.toDate?.() || interaction.nextActionDate;
          if (nextDate > new Date()) {
            stats.actionsEnAttente++;
          }
        }
      });
      
      return stats;
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques d\'interaction:', error);
      return null;
    }
  }
};