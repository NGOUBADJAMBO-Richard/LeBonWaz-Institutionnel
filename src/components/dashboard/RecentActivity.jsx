import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare, Phone, Mail, Users } from 'lucide-react';

const RecentActivity = ({ activities = [] }) => {
  const getIcon = (type) => {
    const icons = {
      'Appel': Phone,
      'Email': Mail,
      'SMS': MessageSquare,
      'Rencontre Physique': Users,
      'WhatsApp': MessageSquare
    };
    
    return icons[type] || MessageSquare;
  };
  
  const getIconColor = (type) => {
    const colors = {
      'Appel': 'text-blue-600 bg-blue-100',
      'Email': 'text-green-600 bg-green-100',
      'SMS': 'text-yellow-600 bg-yellow-100',
      'Rencontre Physique': 'text-purple-600 bg-purple-100',
      'WhatsApp': 'text-green-600 bg-green-100'
    };
    
    return colors[type] || 'text-gray-600 bg-gray-100';
  };
  
  if (activities.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Aucune activité récente</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = getIcon(activity.type);
        const iconColor = getIconColor(activity.type);
        
        return (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${iconColor}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {activity.type} - {activity.leadName}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(activity.createdAt), { 
                    addSuffix: true,
                    locale: fr 
                  })}
                </p>
              </div>
              {activity.leadCompany && (
                <p className="text-xs text-gray-600">{activity.leadCompany}</p>
              )}
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {activity.content}
              </p>
              {activity.sentiment && (
                <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  {activity.sentiment}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivity;