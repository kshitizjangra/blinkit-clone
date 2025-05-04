import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { toast } from './ui/Toaster';

type ProductCardProps = {
  product: Product;
  variant?: 'default' | 'compact';
};

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
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
    removeFromCart(product.id);
  };

  const isCompact = variant === 'compact';

  return (
    <div 
      className={`group bg-white rounded-lg border border-gray-200 overflow-hidden transition hover:shadow-md ${
        isCompact ? 'p-2' : 'p-3'
      }`}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          {product.discount > 0 && (
            <div className="absolute top-0 left-0 bg-accent text-white text-xs font-medium px-2 py-0.5 rounded-br-lg">
              {product.discount}% OFF
            </div>
          )}
          <div className={`${isCompact ? 'h-24' : 'h-40'} bg-gray-50 rounded flex items-center justify-center mb-2`}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className={`w-full h-full object-contain ${isCompact ? 'p-1' : 'p-2'}`} 
            />
          </div>
          <div className={`${isCompact ? 'min-h-[40px]' : 'min-h-[56px]'} mb-1`}>
            <h3 className={`font-medium ${isCompact ? 'text-xs line-clamp-2' : 'text-sm line-clamp-2'}`}>
              {product.name}
            </h3>
            <p className={`text-text-secondary ${isCompact ? 'text-xs' : 'text-sm'}`}>
              {product.weight}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between mt-2">
        <div>
          <div className="flex items-center">
            <span className={`font-semibold ${isCompact ? 'text-sm' : 'text-base'}`}>
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className={`text-text-secondary line-through ml-2 ${isCompact ? 'text-xs' : 'text-sm'}`}>
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div>
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`bg-primary text-black font-medium rounded-md transition-all ${
                isAddingToCart ? 'opacity-70' : 'hover:bg-primary/90'
              } ${isCompact ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5'}`}
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={handleRemoveFromCart}
                className={`text-gray-600 hover:bg-gray-100 rounded-l-md ${
                  isCompact ? 'p-1' : 'p-1.5'
                }`}
              >
                <Minus size={isCompact ? 14 : 16} />
              </button>
              <span className={`${isCompact ? 'text-xs px-2' : 'text-sm px-3'} font-medium`}>
                {quantity}
              </span>
              <button
                onClick={handleAddToCart}
                className={`text-gray-600 hover:bg-gray-100 rounded-r-md ${
                  isCompact ? 'p-1' : 'p-1.5'
                }`}
              >
                <Plus size={isCompact ? 14 : 16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;