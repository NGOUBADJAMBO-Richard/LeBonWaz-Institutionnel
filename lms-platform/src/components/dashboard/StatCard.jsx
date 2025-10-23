import React from 'react';
import { classNames } from '../../utils/helpers';

const StatCard = ({ title, value, icon: Icon, color = 'blue', change }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={classNames(
              'text-sm mt-2',
              change > 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {change > 0 ? '+' : ''}{change}% vs mois dernier
            </p>
          )}
        </div>
        <div className={classNames(
          'p-4 rounded-lg',
          colorClasses[color]
        )}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
