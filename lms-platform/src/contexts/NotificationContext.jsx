import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const show = useCallback((message, type = 'info', timeoutMs = 4000) => {
    setNotification({ message, type });
    if (timeoutMs) setTimeout(() => setNotification(null), timeoutMs);
  }, []);

  const hide = useCallback(() => setNotification(null), []);

  return (
    <NotificationContext.Provider value={{ notification, show, hide }}>
      {children}
    </NotificationContext.Provider>
  );
};
