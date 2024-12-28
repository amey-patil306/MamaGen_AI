import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, BarChart2, BookOpen, MessageSquare, Monitor, ClipboardList, User } from 'lucide-react';
import { useAuth } from './AuthContext';

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Function to handle the Profile click and redirect to the external link
  const handleProfileClick = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = 'http://localhost:5174/'; // Redirect to the external URL
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Exercise', icon: Activity },
    { path: '/hr-dashboard', label: 'HR Dashboard', icon: BarChart2 },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/communication', label: 'Communication', icon: MessageSquare },
    { path: '/ergonomics', label: 'Ergonomics', icon: Monitor },
    {
      path: '/profile',
      label: 'Calender',
      icon: User,
      onClick: handleProfileClick, // Attach the onClick handler for the "Profile" link
    },
    { path: '/PregnancyDashboard', label: 'Birth Plan', icon: ClipboardList },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              item.path === '/profile' ? (
                // Use a regular anchor <a> tag with onClick for profile to handle the redirection
                <a
                  key={item.path}
                  href="#"
                  onClick={item.onClick} // Call handleProfileClick on click
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-indigo-600'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-500 hover:text-indigo-600'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </Link>
              )
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
