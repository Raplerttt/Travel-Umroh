import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { ROUTES } from '../../../routes/routeConstants';
import Button from '../../common/button/Button';
import logo from '../../../assets/images/LOGO-HAYMANA.svg'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect untuk menangani scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'Packages', href: ROUTES.PACKAGES },
    { name: 'Schedule', href: ROUTES.SCHEDULE},
    { name: 'About', href: ROUTES.ABOUT },
    { name: 'Gallery', href: ROUTES.GALLERY },
    { name: 'Contact', href: ROUTES.CONTACT },
  ];

  const mobileBottomNavigation = [
    { name: 'Beranda', href: ROUTES.HOME, icon: '🏚️' },
    { name: 'Haji', href: ROUTES.HAJI, icon: '🕋' },
    { name: 'Umrah', href: ROUTES.UMRAH, icon: '📿' },
    { name: 'About', href: ROUTES.ABOUT, icon: 'ℹ️' },
  ];

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleWhatsAppClick = () => {
    const phoneNumber = '6281111119702';
    const message = 'Halo, saya ingin konsultasi tentang paket umroh/haji';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // WhatsApp Icon SVG Component
  const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.248-6.189-3.515-8.452"/>
    </svg>
  );

  return (
    <>
      <header className={`
        absolute top-4 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-transparent' 
          : 'bg-transparent'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center flex-shrink-0">
              <img
                src={logo}
                alt="Haymana Tour Logo"
                className={`w-40 h-38 object-contain transition-all duration-300 ${
                  isScrolled ? 'filter brightness-0' : ''
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    px-3 py-2 text-bold font-medium rounded-md transition-all duration-300
                    ${isActiveRoute(item.href)
                      ? isScrolled 
                        ? 'text-black' 
                        : 'text-white bg-white/20'
                      : isScrolled
                        ? 'text-black hover:text-gray-900 hover:bg-gray-50'
                        : 'text-white hover:text-white hover:bg-white/20'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-3">

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
                  isScrolled 
                    ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-50' 
                    : 'text-white hover:text-white/80 hover:bg-white/20'
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>

              {/* Desktop WhatsApp Button */}
              <div className="hidden md:flex items-center">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <Link to={ROUTES.DASHBOARD}>
                      <Button 
                        variant={isScrolled ? "outline" : "ghost"} 
                        size="sm"
                        className={isScrolled ? "" : "text-white border-white hover:bg-white/20"}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm transition-colors duration-300 ${
                        isScrolled ? 'text-gray-700' : 'text-white'
                      }`}>
                        Hi, {user?.name}
                      </span>
                      <Button
                        variant={isScrolled ? "ghost" : "outline"}
                        size="sm"
                        onClick={logout}
                        className={isScrolled ? "" : "text-white border-white hover:bg-white/20"}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleWhatsAppClick}
                    className="flex items-center space-x-2 bg-[#18409f] hover:bg-[#15388d] border-[#18409f] hover:border-[#15388d] text-white py-2.5"
                  >
                    <WhatsAppIcon />
                    <span>Konsultasi Sekarang</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50 animate-fade-in bg-transparent backdrop-blur-md">
              {/* Mobile Navigation */}
              <nav className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      block px-3 py-3 text-white font-medium rounded-lg transition-all
                      ${isActiveRoute(item.href)
                        ? 'text-primary-600 bg-transparent border-r-2 border-primary-600'
                        : 'text-white-700 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              <div className="px-2 pt-4 pb-3 border-t border-gray-200/50 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Hi, {user?.name}
                      </span>
                    </div>
                    <Link
                      to={ROUTES.DASHBOARD}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-left"
                    >
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      handleWhatsAppClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-center bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600 flex items-center space-x-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Chat WhatsApp</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg z-50 safe-area-bottom">
        <div className="flex justify-around items-center h-16 px-2">
          {mobileBottomNavigation.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex flex-col items-center justify-center flex-1 px-1 py-2 transition-all duration-200
                ${isActiveRoute(item.href)
                  ? 'text-primary-600 transform -translate-y-1'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors
                ${isActiveRoute(item.href) ? 'bg-primary-50' : ''}
              `}>
                {item.icon}
              </div>
              <span className="text-xs font-medium mt-1">{item.name}</span>
            </Link>
          ))}
          
          {/* WhatsApp Button di tengah */}
          <div className="flex flex-col items-center justify-center flex-1 px-1">
            <button
              onClick={handleWhatsAppClick}
              className="flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105"
            >
              <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg -mt-4">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium mt-1 text-green-600">WhatsApp</span>
            </button>
          </div>

          {mobileBottomNavigation.slice(2).map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex flex-col items-center justify-center flex-1 px-1 py-2 transition-all duration-200
                ${isActiveRoute(item.href)
                  ? 'text-primary-600 transform -translate-y-1'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors
                ${isActiveRoute(item.href) ? 'bg-primary-50' : ''}
              `}>
                {item.icon}
              </div>
              <span className="text-xs font-medium mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;