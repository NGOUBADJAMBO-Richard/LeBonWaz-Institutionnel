import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Button from './Button';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Plus
} from 'lucide-react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, userProfile, logout, isAdmin } = useAuth();
  const { showSuccess } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    showSuccess('Déconnexion réussie');
    navigate('/login');
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Prospects', href: '/leads', icon: Users },
    { name: 'Interactions', href: '/interactions', icon: MessageSquare },
  ];
  
  if (isAdmin) {
    navigation.push({ name: 'Administration', href: '/admin', icon: Settings });
  }
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex flex-col w-full max-w-xs bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <SidebarContent navigation={navigation} isActive={isActive} />
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
            <SidebarContent navigation={navigation} isActive={isActive} />
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <h1 className="text-2xl font-semibold text-gray-900">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
            
            <div className="ml-4 flex items-center space-x-4">
              {/* Quick actions */}
              {location.pathname === '/leads' && (
                <Button
                  onClick={() => navigate('/leads/add')}
                  size="sm"
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau prospect
                </Button>
              )}
              
              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">
                      {userProfile?.firstName || userProfile?.lastName ? 
                        `${userProfile.firstName} ${userProfile.lastName}` : 
                        currentUser?.email}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {userProfile?.role || 'Commercial'}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarContent = ({ navigation, isActive }) => {
  return (
    <>
      <div className="flex items-center flex-shrink-0 px-4">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="ml-2 text-xl font-bold text-gray-900">LMS Platform</span>
        </div>
      </div>
      
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    isActive(item.href) ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

const getPageTitle = (pathname) => {
  const titles = {
    '/dashboard': 'Dashboard',
    '/leads': 'Gestion des Prospects',
    '/leads/add': 'Nouveau Prospect',
    '/interactions': 'Interactions',
    '/admin': 'Administration'
  };
  
  if (pathname.startsWith('/leads/') && pathname !== '/leads/add') {
    return 'Détails du Prospect';
  }
  
  return titles[pathname] || 'LMS Platform';
};

export default Layout;