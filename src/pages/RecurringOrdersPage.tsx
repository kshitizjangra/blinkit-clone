import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, Calendar, CreditCard, Trash2, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from '../components/ui/Toaster';
import { Product, RecurringItem } from '../types';
import { products } from '../data/products';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const RecurringOrdersPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [recurringItems, setRecurringItems] = useState<RecurringItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [deliveryTime, setDeliveryTime] = useState('08:00');
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error({
        title: 'Authentication required',
        description: 'Please login to manage recurring orders'
      });
      navigate('/login');
    }
    
    // Load recurring items from localStorage for demo
    const savedItems = localStorage.getItem('recurringItems');
    if (savedItems) {
      setRecurringItems(JSON.parse(savedItems));
    }
  }, [isAuthenticated, navigate]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: RecurringItem = {
      id: `ri-${Date.now()}`,
      userId: 'demo-user',
      productId: selectedProduct,
      quantity,
      frequency,
      deliveryTime,
      isActive: true,
      autoPayEnabled,
      nextDeliveryDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedItems = [...recurringItems, newItem];
    setRecurringItems(updatedItems);
    localStorage.setItem('recurringItems', JSON.stringify(updatedItems));

    toast.success({
      title: 'Recurring order added',
      description: 'Your recurring order has been set up successfully'
    });

    setShowAddForm(false);
    resetForm();
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = recurringItems.filter(item => item.id !== itemId);
    setRecurringItems(updatedItems);
    localStorage.setItem('recurringItems', JSON.stringify(updatedItems));

    toast.success({
      title: 'Item removed',
      description: 'Recurring order has been removed'
    });
  };

  const resetForm = () => {
    setSelectedProduct('');
    setQuantity(1);
    setFrequency('daily');
    setDeliveryTime('08:00');
    setAutoPayEnabled(false);
  };

  const getProductById = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  return (
    <div className="container-custom py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Recurring Orders</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary text-black px-4 py-2 rounded-md font-medium flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add New Item
          </button>
        </div>

        {showAddForm && (
          <div className="mb-8 border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Add Recurring Item</h2>
            <form onSubmit={handleAddItem}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Choose a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - ₹{product.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Time
                  </label>
                  <TimePicker
                    onChange={(value) => setDeliveryTime(value as string)}
                    value={deliveryTime}
                    className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    clearIcon={null}
                    format="HH:mm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={autoPayEnabled}
                    onChange={(e) => setAutoPayEnabled(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Enable auto-pay for recurring deliveries
                  </span>
                </label>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  type="submit"
                  className="bg-primary text-black px-4 py-2 rounded-md font-medium"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {recurringItems.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-lg font-medium mb-2">No recurring orders</h2>
            <p className="text-text-secondary mb-4">
              Add items to your recurring list to get automatic deliveries
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recurringItems.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center mr-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <div className="text-sm text-text-secondary space-y-1">
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          Delivery at {item.deliveryTime}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)} delivery
                        </div>
                        {item.autoPayEnabled && (
                          <div className="flex items-center text-success">
                            <CreditCard size={14} className="mr-1" />
                            Auto-pay enabled
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium">₹{product.price * item.quantity}</div>
                      <div className="text-sm text-text-secondary">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-gray-400 hover:text-error"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecurringOrdersPage;