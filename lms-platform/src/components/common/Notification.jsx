import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';

const typeToColor = {
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  error: 'bg-red-50 text-red-800 border-red-200',
};

const Notification = () => {
  const { notification } = useNotification();
  if (!notification) return null;
  const { message, type } = notification;
  const color = typeToColor[type] || typeToColor.info;

  return (
    <div className={`fixed top-4 right-4 z-50 rounded-lg border p-4 shadow ${color}`}>
      <div className="text-sm font-medium">{message}</div>
    </div>
  );
};

export default Notification;
