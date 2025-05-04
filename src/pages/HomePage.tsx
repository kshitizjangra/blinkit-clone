import { useEffect } from 'react';
import PromotionBanner from '../components/PromotionBanner';
import ProductList from '../components/ProductList';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { getFeaturedProducts } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import LocationSelector from '../components/LocationSelector';

const HomePage = () => {
  const { isLocationSet } = useLocation();
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-custom pt-4 pb-8">
      {!isLocationSet && (
        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Set your delivery location</h2>
          <p className="text-sm text-text-secondary mb-3">
            To see product availability and delivery options
          </p>
          <LocationSelector onClose={() => {}} />
        </div>
      )}

      <PromotionBanner />
      
      {/* Delivery Promise */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-lg md:text-xl">Groceries delivered in 10 minutes</h2>
          <p className="text-text-secondary text-sm md:text-base">
            Order now and get your essentials delivered instantly
          </p>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://blinkit.com/9989ea7d58792bbe8a85.png" 
            alt="Fast Delivery" 
            className="h-16"
          />
        </div>
      </div>
      
      {/* Featured Categories */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Shop by Category</h2>
          <Link to="/categories" className="text-accent text-sm font-medium flex items-center">
            See All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.slice(0, 5).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="h-24 sm:h-32 p-2 flex items-center justify-center bg-gray-50">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="p-2 text-center">
                <h3 className="font-medium text-sm truncate">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Best Sellers</h2>
          <Link to="/products" className="text-accent text-sm font-medium flex items-center">
            See All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <ProductList products={featuredProducts} />
      </section>
      
      {/* Offers Section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Offers & Discounts</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-primary/80 to-primary rounded-lg p-5 text-black">
            <h3 className="text-xl font-bold mb-2">First Order Discount</h3>
            <p className="text-black/80 mb-3">Use code FIRST100 to get ₹100 off on your first order above ₹299</p>
            <Link 
              to="/offers" 
              className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Get Offer
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-accent/80 to-accent rounded-lg p-5 text-white">
            <h3 className="text-xl font-bold mb-2">Daily Essentials</h3>
            <p className="text-white/90 mb-3">Save up to 20% on daily essentials every day!</p>
            <Link 
              to="/category/dairy-breakfast" 
              className="inline-block bg-white text-accent px-4 py-2 rounded-md text-sm font-medium"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Download App Section */}
      <section className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
            <h2 className="text-xl font-bold mb-2">Download the Blinkit App</h2>
            <p className="text-text-secondary mb-4">
              Get groceries delivered in minutes. Fresh fruits, vegetables, dairy and more at incredible prices!
            </p>
            <div className="flex space-x-3">
              <a href="#" className="block w-32">
                <img
                  src="https://blinkit.com/f2d0b4d348c06a3bd97f.png"
                  alt="Download on App Store"
                  className="h-auto w-full"
                />
              </a>
              <a href="#" className="block w-32">
                <img
                  src="https://blinkit.com/d0c5156710e9f4992773.png"
                  alt="Get it on Google Play"
                  className="h-auto w-full"
                />
              </a>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img
              src="https://blinkit.com/46553bd71d7c225a7851.png"
              alt="Blinkit App"
              className="h-auto max-h-64"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;