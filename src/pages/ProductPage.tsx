import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Truck, Clock } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { categories } from '../data/categories';
import ProductList from '../components/ProductList';
import { useCart } from '../context/CartContext';
import { toast } from '../components/ui/Toaster';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const product = getProductById(productId || '');
  const relatedProducts = getRelatedProducts(productId || '', 4);
  
  const category = product 
    ? categories.find(cat => cat.id === product.category) 
    : null;
    
  const quantity = product ? getItemQuantity(product.id) : 0;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    setTimeout(() => {
      addToCart(product);
      setIsAddingToCart(false);
      toast.success({ 
        title: 'Added to cart', 
        description: product.name 
      });
    }, 200);
  };
  
  const handleRemoveFromCart = () => {
    if (!product) return;
    removeFromCart(product.id);
  };
  
  if (!product) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <p className="text-text-secondary mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="bg-primary text-black px-4 py-2 rounded-md font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-4">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-text-secondary mb-4 hover:text-black"
      >
        <ArrowLeft size={18} className="mr-1" />
        <span>Back</span>
      </button>
      
      {/* Product details */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product image */}
          <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="max-h-64 w-auto object-contain"
            />
          </div>
          
          {/* Product info */}
          <div>
            {category && (
              <Link 
                to={`/category/${category.id}`} 
                className="text-accent text-sm hover:underline"
              >
                {category.name}
              </Link>
            )}
            
            <h1 className="text-xl md:text-2xl font-semibold mt-1 mb-2">{product.name}</h1>
            
            <div className="text-text-secondary text-sm mb-4">{product.weight}</div>
            
            <div className="flex items-center mb-4">
              <span className="text-xl font-semibold mr-2">₹{product.price}</span>
              
              {product.originalPrice > product.price && (
                <>
                  <span className="text-text-secondary line-through mr-2">
                    ₹{product.originalPrice}
                  </span>
                  <span className="bg-accent/10 text-accent px-2 py-0.5 rounded text-xs font-medium">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            {/* Add to cart */}
            <div className="mb-6">
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`bg-primary text-black font-medium rounded-md py-2 px-4 transition-all ${
                    isAddingToCart ? 'opacity-70' : 'hover:bg-primary/90'
                  }`}
                >
                  ADD TO CART
                </button>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={handleRemoveFromCart}
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-l-md border border-gray-300"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4 py-2 border-t border-b border-gray-300 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    className="text-gray-600 hover:bg-gray-100 p-2 rounded-r-md border border-gray-300"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>
            
            {/* Delivery info */}
            <div className="p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <Clock size={18} className="text-accent mr-2" />
                <span className="font-medium">Delivery in 10 minutes</span>
              </div>
              <div className="flex items-center">
                <Truck size={18} className="text-accent mr-2" />
                <span>Free delivery on orders above ₹99</span>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-text-secondary">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">You may also like</h2>
          <ProductList products={relatedProducts} />
        </section>
      )}
    </div>
  );
};

export default ProductPage;