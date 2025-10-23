import { leadService } from './leadService';
import { interactionService } from './interactionService';
import { LEAD_STATUS } from '../config/constants';

export const dashboardService = {
  // Statistiques générales pour un commercial
  async getCommercialStats(userId) {
    try {
      const leads = await leadService.getLeadsByUser(userId);
      const interactions = await interactionService.getInteractionsByUser(userId);
      
      const stats = {
        totalLeads: leads.length,
        newLeads: leads.filter(lead => lead.status === LEAD_STATUS.NEW).length,
        qualifiedLeads: leads.filter(lead => lead.status === LEAD_STATUS.QUALIFIED).length,
        convertedLeads: leads.filter(lead => lead.status === LEAD_STATUS.CONVERTED).length,
        totalInteractions: interactions.length,
        conversionRate: leads.length > 0 ? 
          ((leads.filter(lead => lead.status === LEAD_STATUS.CONVERTED).length / leads.length) * 100).toFixed(1) 
          : 0
      };
      
      return stats;
    } catch (error) {
      console.error('Error fetching commercial stats:', error);
      return {
        totalLeads: 0,
        newLeads: 0,
        qualifiedLeads: 0,
        convertedLeads: 0,
        totalInteractions: 0,
        conversionRate: 0
      };
    }
  },

  // Statistiques globales pour admin
  async getAdminStats() {
    try {
      const leads = await leadService.getAllLeads();
      const totalInteractions = leads.reduce(async (acc, lead) => {
        const interactions = await interactionService.getInteractionsByLead(lead.id);
        return (await acc) + interactions.length;
      }, Promise.resolve(0));
      
      const stats = {
        totalLeads: leads.length,
        newLeads: leads.filter(lead => lead.status === LEAD_STATUS.NEW).length,
        contactedLeads: leads.filter(lead => lead.status === LEAD_STATUS.CONTACTED).length,
        qualifiedLeads: leads.filter(lead => lead.status === LEAD_STATUS.QUALIFIED).length,
        negotiationLeads: leads.filter(lead => lead.status === LEAD_STATUS.NEGOTIATION).length,
        convertedLeads: leads.filter(lead => lead.status === LEAD_STATUS.CONVERTED).length,
        lostLeads: leads.filter(lead => lead.status === LEAD_STATUS.LOST).length,
        totalInteractions: await totalInteractions,
        conversionRate: leads.length > 0 ? 
          ((leads.filter(lead => lead.status === LEAD_STATUS.CONVERTED).length / leads.length) * 100).toFixed(1) 
          : 0
      };
      
      return stats;
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      return {
        totalLeads: 0,
        newLeads: 0,
        contactedLeads: 0,
        qualifiedLeads: 0,
        negotiationLeads: 0,
        convertedLeads: 0,
        lostLeads: 0,
        totalInteractions: 0,
        conversionRate: 0
      };
    }
  },

  // Données pour le graphique de conversion
  async getConversionChartData(userId = null) {
    try {
      const leads = userId ? 
        await leadService.getLeadsByUser(userId) : 
        await leadService.getAllLeads();
      
      const statusCounts = Object.values(LEAD_STATUS).map(status => ({
        status,
        count: leads.filter(lead => lead.status === status).length
      }));
      
      return statusCounts;
    } catch (error) {
      console.error('Error fetching conversion chart data:', error);
      return [];
    }
  },

  // Activité récente
  async getRecentActivity(userId = null, limit = 10) {
    try {
      const interactions = userId ? 
        await interactionService.getInteractionsByUser(userId) :
        await interactionService.getRecentInteractions(limit * 2);
      
      const recentInteractions = interactions.slice(0, limit);
      
      // Enrichir avec les informations du lead
      const enrichedActivity = await Promise.all(
        recentInteractions.map(async (interaction) => {
          const lead = await leadService.getLeadById(interaction.leadId);
          return {
            ...interaction,
            leadName: lead ? `${lead.firstName} ${lead.lastName}` : 'Lead inconnu',
            leadCompany: lead?.company || ''
          };
        })
      );
      
      return enrichedActivity;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
  },

  // Performance par source de lead
  async getLeadSourcePerformance(userId = null) {
    try {
      const leads = userId ? 
        await leadService.getLeadsByUser(userId) : 
        await leadService.getAllLeads();
      
      const sourceStats = {};
      
      leads.forEach(lead => {
        const source = lead.source || 'Non défini';
        if (!sourceStats[source]) {
          sourceStats[source] = {
            total: 0,
            converted: 0,
            conversionRate: 0
          };
        }
        
        sourceStats[source].total++;
        if (lead.status === LEAD_STATUS.CONVERTED) {
          sourceStats[source].converted++;
        }
      });
      
      // Calculer les taux de conversion
      Object.keys(sourceStats).forEach(source => {
        const stats = sourceStats[source];
        stats.conversionRate = stats.total > 0 ? 
          ((stats.converted / stats.total) * 100).toFixed(1) : 0;
      });
      
      return sourceStats;
    } catch (error) {
      console.error('Error fetching lead source performance:', error);
      return {};
    }
  }
};