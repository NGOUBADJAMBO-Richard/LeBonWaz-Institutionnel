import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const dashboardService = {
  // Obtenir les statistiques pour un commercial
  async getCommercialStats(userId) {
    try {
      const leadsQuery = query(
        collection(db, 'leads'),
        where('assignedToUserId', '==', userId)
      );
      
      const leadsSnapshot = await getDocs(leadsQuery);
      const leads = leadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const stats = {
        totalLeads: leads.length,
        nouveaux: leads.filter(l => l.status === 'nouveau').length,
        contactes: leads.filter(l => l.status === 'contacté').length,
        qualifies: leads.filter(l => l.status === 'qualifié').length,
        enNegociation: leads.filter(l => l.status === 'en_négociation').length,
        convertis: leads.filter(l => l.status === 'converti').length,
        perdus: leads.filter(l => l.status === 'perdu').length,
        tauxConversion: leads.length > 0 
          ? ((leads.filter(l => l.status === 'converti').length / leads.length) * 100).toFixed(1)
          : 0
      };
      
      return { success: true, stats };
    } catch (error) {
      console.error('Error fetching commercial stats:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtenir les statistiques globales (Admin)
  async getGlobalStats() {
    try {
      const leadsSnapshot = await getDocs(collection(db, 'leads'));
      const leads = leadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const commercials = users.filter(u => u.role === 'commercial');
      
      const stats = {
        totalLeads: leads.length,
        totalCommerciaux: commercials.length,
        nouveaux: leads.filter(l => l.status === 'nouveau').length,
        contactes: leads.filter(l => l.status === 'contacté').length,
        qualifies: leads.filter(l => l.status === 'qualifié').length,
        enNegociation: leads.filter(l => l.status === 'en_négociation').length,
        convertis: leads.filter(l => l.status === 'converti').length,
        perdus: leads.filter(l => l.status === 'perdu').length,
        tauxConversion: leads.length > 0 
          ? ((leads.filter(l => l.status === 'converti').length / leads.length) * 100).toFixed(1)
          : 0
      };
      
      return { success: true, stats };
    } catch (error) {
      console.error('Error fetching global stats:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtenir les statistiques par commercial (Admin)
  async getStatsByCommercial() {
    try {
      const usersSnapshot = await getDocs(query(
        collection(db, 'users'),
        where('role', '==', 'commercial')
      ));
      const commercials = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const statsPromises = commercials.map(async (commercial) => {
        const result = await this.getCommercialStats(commercial.id);
        return {
          commercialId: commercial.id,
          commercialName: commercial.name || commercial.email,
          ...result.stats
        };
      });
      
      const stats = await Promise.all(statsPromises);
      return { success: true, stats };
    } catch (error) {
      console.error('Error fetching stats by commercial:', error);
      return { success: false, error: error.message };
    }
  }
};
