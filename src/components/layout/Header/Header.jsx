import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { ROUTES } from '../../../routes/routeConstants';
import Button from '../../common/button/Button';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'Packages', href: ROUTES.PACKAGES },
    { name: 'About', href: ROUTES.ABOUT },
    { name: 'Gallery', href: ROUTES.GALLERY },
    { name: 'Contact', href: ROUTES.CONTACT },
  ];

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Umroh Travel
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActiveRoute(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme dark/light"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to={ROUTES.DASHBOARD}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">
                    Hi, {user?.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;