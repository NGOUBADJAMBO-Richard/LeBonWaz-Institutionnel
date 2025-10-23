import React from 'react';
import { TrendingUp, TrendingDown, Users, Target } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  className = '' 
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const changeIcons = {
    positive: TrendingUp,
    negative: TrendingDown,
    neutral: Target
  };

  const ChangeIcon = changeIcons[changeType];

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-1 text-sm ${changeColors[changeType]}`}>
              <ChangeIcon className="h-4 w-4 mr-1" />
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-primary-100 rounded-lg">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;