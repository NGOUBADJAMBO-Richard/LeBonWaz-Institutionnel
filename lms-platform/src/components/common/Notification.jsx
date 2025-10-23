import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { classNames } from '../../utils/helpers';

const NotificationItem = ({ notification }) => {
  const { removeNotification } = useNotification();
  
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  const backgrounds = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div className={classNames(
      'flex items-center p-4 rounded-lg border shadow-lg mb-3 animate-slide-in',
      backgrounds[notification.type]
    )}>
      <div className="flex-shrink-0">
        {icons[notification.type]}
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-900">
          {notification.message}
        </p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const Notification = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-full">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default Notification;
