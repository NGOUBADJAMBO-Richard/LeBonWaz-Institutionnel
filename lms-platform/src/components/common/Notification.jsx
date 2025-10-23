import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

const Notification = () => {
  const { notifications, removeNotification } = useNotification();

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const colors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notif => (
        <div 
          key={notif.id}
          className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-md ${colors[notif.type]} animate-slide-in`}
        >
          {icons[notif.type]}
          <p className="flex-1 text-sm font-medium text-gray-800">{notif.message}</p>
          <button
            onClick={() => removeNotification(notif.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
