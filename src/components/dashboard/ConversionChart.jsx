import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LEAD_STATUS } from '../../config/constants';

const ConversionChart = ({ data = [] }) => {
  const colors = {
    [LEAD_STATUS.NEW]: '#3B82F6',
    [LEAD_STATUS.CONTACTED]: '#F59E0B',
    [LEAD_STATUS.QUALIFIED]: '#8B5CF6',
    [LEAD_STATUS.NEGOTIATION]: '#F97316',
    [LEAD_STATUS.CONVERTED]: '#10B981',
    [LEAD_STATUS.LOST]: '#EF4444'
  };
  
  const statusLabels = {
    [LEAD_STATUS.NEW]: 'Nouveaux',
    [LEAD_STATUS.CONTACTED]: 'Contactés',
    [LEAD_STATUS.QUALIFIED]: 'Qualifiés',
    [LEAD_STATUS.NEGOTIATION]: 'En négociation',
    [LEAD_STATUS.CONVERTED]: 'Convertis',
    [LEAD_STATUS.LOST]: 'Perdus'
  };
  
  const chartData = data
    .filter(item => item.count > 0)
    .map(item => ({
      name: statusLabels[item.status] || item.status,
      value: item.count,
      color: colors[item.status] || '#6B7280'
    }));
  
  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Aucune donnée à afficher</p>
      </div>
    );
  }
  
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionChart;