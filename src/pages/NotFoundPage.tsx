import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-xl mx-auto text-center">
        <div className="bg-error/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-error" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="flex items-center bg-primary text-black px-4 py-2 rounded-md font-medium"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          
          <Link
            to="/cart"
            className="flex items-center bg-gray-100 text-black px-4 py-2 rounded-md font-medium"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;