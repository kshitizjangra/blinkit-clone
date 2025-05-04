import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, MapPin, ChevronDown, User, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLocation as useLocationContext } from '../context/LocationContext';
import LocationSelector from './LocationSelector';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { cartItems } = useCart();
  const { currentLocation } = useLocationContext();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLocationSelector = () => {
    setIsLocationSelectorOpen(!isLocationSelectorOpen);
  };

  const headerClasses = `fixed top-0 left-0 right-0 z-50 bg-white ${
    isScrolled ? 'shadow-md' : ''
  } transition-shadow duration-300`;

  return (
    <header className={headerClasses}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="font-bold text-xl text-black">B</span>
            </div>
            <span className="font-bold text-lg md:text-xl hidden sm:inline-block">Blinkit</span>
          </Link>

          {/* Location selector */}
          <button
            onClick={toggleLocationSelector}
            className="hidden md:flex items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md mx-4"
          >
            <MapPin size={18} className="mr-1 text-secondary" />
            <span className="mr-1 truncate max-w-[160px]">
              {currentLocation?.address || 'Set location'}
            </span>
            <ChevronDown size={16} />
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl relative">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          {/* Right section: cart & auth */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/recurring-orders"
                  className="flex items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md hidden md:flex"
                >
                  <Bell size={18} className="mr-1" />
                  <span>Recurring</span>
                </Link>
                <Link
                  to="/account"
                  className="flex items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md hidden md:flex"
                >
                  <User size={18} className="mr-1" />
                  <span>{user?.name || 'Account'}</span>
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:block px-4 py-2 text-sm font-medium text-black bg-primary hover:bg-primary/90 rounded-md transition-colors"
              >
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center p-2 hover:bg-gray-100 rounded-md"
            >
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-gray-100 md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="pb-2 pt-0 md:hidden">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for atta, milk, etc."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16">
          <div className="container p-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={toggleLocationSelector}
                className="flex items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md"
              >
                <MapPin size={18} className="mr-2 text-secondary" />
                <span className="mr-1 truncate max-w-[200px]">
                  {currentLocation?.address || 'Set your location'}
                </span>
                <ChevronDown size={16} />
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/recurring-orders"
                    className="flex items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Bell size={18} className="mr-2" />
                    <span>Recurring Orders</span>
                  </Link>
                  <Link
                    to="/account"
                    className="flex items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={18} className="mr-2" />
                    <span>{user?.name || 'My Account'}</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center p-2 text-sm font-medium hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  <span>Login/Signup</span>
                </Link>
              )}

              <Link
                to="/"
                className="p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/orders"
                className="p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/offers"
                className="p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Offers
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Location selector modal */}
      {isLocationSelectorOpen && (
        <LocationSelector onClose={() => setIsLocationSelectorOpen(false)} />
      )}
    </header>
  );
};

export default Header;