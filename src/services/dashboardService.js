import { 
  collection, 
  getDocs, 
  query, 
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

export const dashboardService = {
  // Statistiques générales
  async getDashboardStats(userId, isAdmin = false) {
    try {
      let leadsQuery;
      
      if (isAdmin) {
        leadsQuery = query(collection(db, 'leads'));
      } else {
        leadsQuery = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId)
        );
      }
      
      const leadsSnapshot = await getDocs(leadsQuery);
      const leads = leadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Calculer les statistiques
      const stats = {
        totalLeads: leads.length,
        newLeads: leads.filter(lead => lead.status === 'nouveau').length,
        contactedLeads: leads.filter(lead => lead.status === 'contacté').length,
        qualifiedLeads: leads.filter(lead => lead.status === 'qualifié').length,
        convertedLeads: leads.filter(lead => lead.status === 'converti').length,
        lostLeads: leads.filter(lead => lead.status === 'perdu').length
      };
      
      // Calculer le taux de conversion
      const totalProcessed = stats.contactedLeads + stats.qualifiedLeads + stats.convertedLeads + stats.lostLeads;
      stats.conversionRate = totalProcessed > 0 ? (stats.convertedLeads / totalProcessed * 100).toFixed(1) : 0;
      
      return { success: true, data: stats };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return { success: false, error: error.message };
    }
  },

  // Leads récents
  async getRecentLeads(userId, isAdmin = false, limitCount = 5) {
    try {
      let leadsQuery;
      
      if (isAdmin) {
        leadsQuery = query(
          collection(db, 'leads'),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      } else {
        leadsQuery = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }
      
      const snapshot = await getDocs(leadsQuery);
      const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      return { success: true, data: leads };
    } catch (error) {
      console.error('Error fetching recent leads:', error);
      return { success: false, error: error.message };
    }
  },

  // Évolution des leads par mois
  async getLeadsEvolution(userId, isAdmin = false) {
    try {
      let leadsQuery;
      
      if (isAdmin) {
        leadsQuery = query(collection(db, 'leads'));
      } else {
        leadsQuery = query(
          collection(db, 'leads'),
          where('assignedToUserId', '==', userId)
        );
      }
      
      const snapshot = await getDocs(leadsQuery);
      const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Grouper par mois
      const monthlyData = {};
      leads.forEach(lead => {
        if (lead.createdAt) {
          const date = lead.createdAt.toDate();
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          
          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = 0;
          }
          monthlyData[monthKey]++;
        }
      });
      
      // Convertir en format pour les graphiques
      const chartData = Object.entries(monthlyData)
        .map(([month, count]) => ({ month, leads: count }))
        .sort((a, b) => a.month.localeCompare(b.month));
      
      return { success: true, data: chartData };
    } catch (error) {
      console.error('Error fetching leads evolution:', error);
      return { success: false, error: error.message };
    }
  }
};