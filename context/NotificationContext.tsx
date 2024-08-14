// context/NotificationContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

type NotificationType = 'success' | 'error';

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  notify: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <div className={`fixed top-4 right-4 bg-${notification.type === 'success' ? 'green' : 'red'}-500 text-white py-2 px-4 rounded-lg shadow-lg`}>
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};
