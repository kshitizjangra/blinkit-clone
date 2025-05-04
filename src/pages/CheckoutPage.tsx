import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { toast } from '../components/ui/Toaster';

type PaymentMethod = 'card' | 'upi' | 'cod';
type DeliveryOption = 'express' | 'standard';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, clearCart } = useCart();
  const { isLocationSet, currentLocation } = useLocation();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('express');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Price calculations
  const subtotal = getSubtotal();
  const deliveryFee = deliveryOption === 'express' ? 40 : 20;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryFee + tax;
  
  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0 && !orderComplete) {
      navigate('/cart');
    }
    
    // Redirect if location not set
    if (!isLocationSet) {
      toast.error({ 
        title: 'Please set delivery location',
        description: 'You need to set a delivery location to proceed with checkout'
      });
      navigate('/cart');
    }
    
    // Pre-fill address from current location
    if (currentLocation) {
      setAddress(currentLocation.fullAddress);
      setCity('Bengaluru');
      setPostalCode('560001');
    }
  }, [cartItems.length, isLocationSet, navigate, orderComplete, currentLocation]);
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!name || !email || !phone || !address) {
      toast.error({ 
        title: 'Please fill all required fields',
        description: 'Name, email, phone and address are required'
      });
      return;
    }
    
    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      toast.error({ 
        title: 'Please fill all payment details',
        description: 'Card number, expiry date and CVV are required'
      });
      return;
    }
    
    // Process order
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };
  
  if (orderComplete) {
    return (
      <div className="container-custom py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-success" />
            </div>
            <h1 className="text-xl font-semibold mb-2">Order Placed Successfully!</h1>
            <p className="text-text-secondary">
              Your order has been placed and will be delivered to you shortly.
            </p>
          </div>
          
          <div className="border-t border-b border-gray-100 py-4 my-4">
            <div className="flex items-center mb-2">
              <Truck size={18} className="text-accent mr-2" />
              <span className="font-medium">Delivery in 10-15 minutes</span>
            </div>
            <p className="text-sm text-text-secondary mb-2">
              Order ID: #BK{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-sm text-text-secondary">
              {deliveryOption === 'express' ? 'Express Delivery' : 'Standard Delivery'}
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-2">Delivery Address</h3>
            <p className="text-sm text-text-secondary">{name}</p>
            <p className="text-sm text-text-secondary">{address}</p>
            <p className="text-sm text-text-secondary">{city}, {postalCode}</p>
            <p className="text-sm text-text-secondary">{phone}</p>
          </div>
          
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Amount</span>
              <span className="font-medium">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Payment Method</span>
              <span>
                {paymentMethod === 'card' ? 'Credit/Debit Card' : 
                 paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-primary text-black font-medium rounded-md py-3 transition hover:bg-primary/90"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder}>
            {/* Delivery address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <MapPin className="text-accent mr-2" size={20} />
                <h2 className="text-lg font-medium">Delivery Address</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code*
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
            
            {/* Delivery options */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <Truck className="text-accent mr-2" size={20} />
                <h2 className="text-lg font-medium">Delivery Options</h2>
              </div>
              
              <div className="space-y-3">
                <div 
                  className={`border ${
                    deliveryOption === 'express' ? 'border-primary bg-primary/5' : 'border-gray-200'
                  } rounded-md p-4 cursor-pointer`}
                  onClick={() => setDeliveryOption('express')}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="express"
                      name="deliveryOption"
                      checked={deliveryOption === 'express'}
                      onChange={() => setDeliveryOption('express')}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="express" className="font-medium cursor-pointer">
                        Express Delivery (₹40)
                      </label>
                      <p className="text-sm text-text-secondary mt-1">
                        Delivery within 10-15 minutes
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border ${
                    deliveryOption === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-200'
                  } rounded-md p-4 cursor-pointer`}
                  onClick={() => setDeliveryOption('standard')}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="standard"
                      name="deliveryOption"
                      checked={deliveryOption === 'standard'}
                      onChange={() => setDeliveryOption('standard')}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="standard" className="font-medium cursor-pointer">
                        Standard Delivery (₹20)
                      </label>
                      <p className="text-sm text-text-secondary mt-1">
                        Delivery within 25-30 minutes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment methods */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-accent mr-2" size={20} />
                <h2 className="text-lg font-medium">Payment Method</h2>
              </div>
              
              <div className="space-y-3 mb-4">
                <div 
                  className={`border ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'
                  } rounded-md p-4 cursor-pointer`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 mr-3"
                    />
                    <div className="flex-1">
                      <label htmlFor="card" className="font-medium cursor-pointer">
                        Credit/Debit Card
                      </label>
                      <p className="text-sm text-text-secondary mt-1">
                        Pay securely with your card
                      </p>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-3 space-y-3">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number*
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="1234 5678 9012 3456"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date*
                              </label>
                              <input
                                type="text"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV*
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="123"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border ${
                    paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-gray-200'
                  } rounded-md p-4 cursor-pointer`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="upi" className="font-medium cursor-pointer">
                        UPI
                      </label>
                      <p className="text-sm text-text-secondary mt-1">
                        Pay using UPI apps like Google Pay, PhonePe, etc.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border ${
                    paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200'
                  } rounded-md p-4 cursor-pointer`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="cod" className="font-medium cursor-pointer">
                        Cash on Delivery
                      </label>
                      <p className="text-sm text-text-secondary mt-1">
                        Pay with cash when your order is delivered
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium">Order Summary</h2>
            </div>
            
            <div className="p-4">
              {/* Items summary */}
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-sm font-medium mb-2">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </h3>
                
                <div className="max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center py-2">
                      <div className="w-10 h-10 bg-gray-50 rounded flex items-center justify-center overflow-hidden mr-3">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-sm font-medium truncate">{item.product.name}</p>
                            <p className="text-xs text-text-secondary">
                              {item.quantity} x ₹{item.product.price}
                            </p>
                          </div>
                          <span className="text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price breakdown */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
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
                  <Truck size={16} className="text-accent mr-2" />
                  <span>
                    {deliveryOption === 'express' 
                      ? 'Express Delivery (10-15 mins)' 
                      : 'Standard Delivery (25-30 mins)'}
                  </span>
                </div>
              </div>
              
              {/* Place order button */}
              <button
                type="submit"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full bg-primary text-black font-medium rounded-md py-3 transition hover:bg-primary/90 ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;