import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { toast } from '../components/ui/Toaster';
import ProductList from '../components/ProductList';
import { getFeaturedProducts } from '../data/products';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItemQuantity, removeFromCart, getSubtotal, clearCart } = useCart();
  const { isLocationSet, currentLocation } = useLocation();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  
  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 99 ? 0 : 20;
  const discount = couponApplied ? Math.min(50, subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;
  
  const featuredProducts = getFeaturedProducts().slice(0, 6);
  
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.info({ 
      title: 'Item removed from cart', 
    });
  };
  
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'FIRST100') {
      setCouponApplied(true);
      toast.success({ 
        title: 'Coupon applied',
        description: '10% discount (up to ₹50) applied to your order'
      });
    } else {
      toast.error({ 
        title: 'Invalid coupon',
        description: 'Please enter a valid coupon code'
      });
    }
  };
  
  const handleProceedToCheckout = () => {
    if (!isLocationSet) {
      toast.error({ 
        title: 'Please set delivery location',
        description: 'You need to set a delivery location to proceed'
      });
      return;
    }
    
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-text-secondary mb-6">Add items to your cart to get started</p>
          <Link to="/" className="bg-primary text-black px-4 py-2 rounded-md font-medium">
            Start Shopping
          </Link>
        </div>
        
        {/* Suggested products */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">You might be interested in</h2>
          <ProductList products={featuredProducts} />
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
      
      <h1 className="text-xl md:text-2xl font-semibold mb-6">Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            {/* Delivery location */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium mb-1">Deliver to:</h3>
                  {isLocationSet && currentLocation ? (
                    <p className="text-text-secondary text-sm">{currentLocation.fullAddress}</p>
                  ) : (
                    <p className="text-accent text-sm">Please set a delivery location</p>
                  )}
                </div>
                <button 
                  className="text-accent text-sm font-medium"
                  onClick={() => navigate('/')}
                >
                  Change
                </button>
              </div>
            </div>
            
            {/* Cart items list */}
            <ul className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center overflow-hidden mr-3">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-400 hover:text-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <p className="text-text-secondary text-xs mb-2">{item.product.weight}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={`p-1 ${
                              item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">₹{item.product.price * item.quantity}</div>
                          {item.product.originalPrice > item.product.price && (
                            <div className="text-text-secondary text-xs line-through">
                              ₹{item.product.originalPrice * item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Clear cart */}
            <div className="p-4 border-t border-gray-100 text-right">
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                    toast.info({ title: 'Cart cleared' });
                  }
                }}
                className="text-sm text-error hover:underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium">Order Summary</h2>
            </div>
            
            <div className="p-4">
              {/* Coupon code */}
              <div className="mb-4">
                <label htmlFor="coupon" className="block text-sm font-medium mb-1">
                  Have a coupon?
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="flex-1 border border-gray-300 rounded-l-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    className={`bg-primary text-black px-3 py-2 rounded-r-md text-sm font-medium ${
                      couponApplied || !couponCode ? 'opacity-60' : 'hover:bg-primary/90'
                    }`}
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-success text-xs mt-1">
                    Coupon applied! 10% discount (up to ₹50)
                  </p>
                )}
              </div>
              
              {/* Price breakdown */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Delivery time */}
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <div className="flex items-center text-sm">
                  <Clock size={16} className="text-accent mr-2" />
                  <span>Delivery in 10-15 minutes</span>
                </div>
              </div>
              
              {/* Checkout button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-primary text-black font-medium rounded-md py-3 transition hover:bg-primary/90"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-center">
                <Link to="/" className="text-accent text-sm hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;