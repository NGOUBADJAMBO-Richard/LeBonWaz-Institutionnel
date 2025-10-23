import { 
  collection, 
  getDocs, 
  query, 
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const dashboardService = {
  // Obtenir les statistiques d'un commercial
  async getUserStats(userId) {
    try {
      const leadsQuery = query(
        collection(db, 'leads'),
        where('assignedToUserId', '==', userId)
      );
      const leadsSnapshot = await getDocs(leadsQuery);
      const leads = leadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const stats = {
        totalLeads: leads.length,
        nouveau: leads.filter(l => l.status === 'nouveau').length,
        contacté: leads.filter(l => l.status === 'contacté').length,
        qualifié: leads.filter(l => l.status === 'qualifié').length,
        en_négociation: leads.filter(l => l.status === 'en_négociation').length,
        converti: leads.filter(l => l.status === 'converti').length,
        perdu: leads.filter(l => l.status === 'perdu').length,
        conversionRate: leads.length > 0 
          ? ((leads.filter(l => l.status === 'converti').length / leads.length) * 100).toFixed(1)
          : 0
      };

      return stats;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }
  },

  // Obtenir les statistiques globales (Admin)
  async getGlobalStats() {
    try {
      const leadsSnapshot = await getDocs(collection(db, 'leads'));
      const leads = leadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const usersSnapshot = await getDocs(collection(db, 'users'));
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const stats = {
        totalLeads: leads.length,
        totalCommercials: users.filter(u => u.role === 'commercial').length,
        nouveau: leads.filter(l => l.status === 'nouveau').length,
        contacté: leads.filter(l => l.status === 'contacté').length,
        qualifié: leads.filter(l => l.status === 'qualifié').length,
        en_négociation: leads.filter(l => l.status === 'en_négociation').length,
        converti: leads.filter(l => l.status === 'converti').length,
        perdu: leads.filter(l => l.status === 'perdu').length,
        conversionRate: leads.length > 0 
          ? ((leads.filter(l => l.status === 'converti').length / leads.length) * 100).toFixed(1)
          : 0
      };

      return stats;
    } catch (error) {
      console.error('Error fetching global stats:', error);
      return null;
    }
  },

  // Obtenir les données pour le graphique de conversion
  async getConversionData(userId, isAdmin = false) {
    try {
      let leads;
      if (isAdmin) {
        const snapshot = await getDocs(collection(db, 'leads'));
        leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } else {
        const q = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId)
        );
        const snapshot = await getDocs(q);
        leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }

      const statusData = [
        { name: 'Nouveau', value: leads.filter(l => l.status === 'nouveau').length },
        { name: 'Contacté', value: leads.filter(l => l.status === 'contacté').length },
        { name: 'Qualifié', value: leads.filter(l => l.status === 'qualifié').length },
        { name: 'Négociation', value: leads.filter(l => l.status === 'en_négociation').length },
        { name: 'Converti', value: leads.filter(l => l.status === 'converti').length },
        { name: 'Perdu', value: leads.filter(l => l.status === 'perdu').length }
      ];

      return statusData;
    } catch (error) {
      console.error('Error fetching conversion data:', error);
      return [];
    }
  }
};
