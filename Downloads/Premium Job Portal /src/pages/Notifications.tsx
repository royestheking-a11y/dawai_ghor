
import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { db, Notification } from '../lib/db';
import { Icons } from '../components/Icons';
import { Link } from 'react-router';

export const Notifications = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!user) return;
    
    // Fetch notifications from DB
    // In a real app this would be an API call
    const notifs = db.getNotifications(user.id);
    
    // If no notifications exist, create some mock ones for demo purposes
    if (notifs.length === 0) {
      const mocks: Omit<Notification, 'id' | 'time' | 'isRead'>[] = [
        {
          userId: user.id,
          type: 'message',
          title: 'New Message from Tech Solutions',
          message: 'Rahim: Hi, are you available for an interview tomorrow?',
          link: '/messages'
        },
        {
          userId: user.id,
          type: 'alert',
          title: 'New Job Alert: React Developer',
          message: '3 new jobs match your "React Developer" alert in Dhaka.',
          link: '/jobs'
        },
        {
          userId: user.id,
          type: 'application',
          title: 'Application Viewed',
          message: 'Your application for "Senior Frontend Engineer" was viewed by the recruiter.',
          link: '/candidate/dashboard'
        },
        {
          userId: user.id,
          type: 'system',
          title: 'Profile Completeness',
          message: 'Your profile is 80% complete. Add your skills to reach 100%.',
          link: '/candidate/dashboard'
        }
      ];
      
      mocks.forEach(m => db.createNotification(m));
      setNotifications(db.getNotifications(user.id));
    } else {
      setNotifications(notifs);
    }
  }, [user]);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const markAsRead = (id: string) => {
    db.markNotificationRead(id);
    if (user) setNotifications(db.getNotifications(user.id));
  };

  const markAllAsRead = () => {
    if (!user) return;
    db.markAllNotificationsRead(user.id);
    setNotifications(db.getNotifications(user.id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <Icons.MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'alert': return <Icons.Zap className="w-5 h-5 text-yellow-500" />;
      case 'application': return <Icons.Briefcase className="w-5 h-5 text-emerald-500" />;
      case 'system': return <Icons.Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
      default: return <Icons.Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Icons.Bell className="w-6 h-6" /> Notifications
          </h1>
          <button 
            onClick={markAllAsRead}
            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Mark all as read
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-700">
            <button 
              onClick={() => setFilter('all')}
              className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${filter === 'all' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              All Notifications
            </button>
            <button 
              onClick={() => setFilter('unread')}
              className={`flex-1 py-4 text-sm font-bold text-center transition-colors ${filter === 'unread' ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              Unread Only
            </button>
          </div>

          {/* List */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-gray-500">
                  <Icons.Bell className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No notifications</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">You're all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notification.isRead ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!notification.isRead ? 'bg-white dark:bg-gray-800 shadow-sm' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      {getIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-sm font-bold ${!notification.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">
                          {new Date(notification.time).toLocaleString()}
                        </span>
                      </div>
                      
                      <p className={`text-sm mt-1 ${!notification.isRead ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-4 mt-3">
                        {notification.link && (
                          <Link 
                            to={notification.link}
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            View Details
                          </Link>
                        )}
                        {!notification.isRead && (
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
