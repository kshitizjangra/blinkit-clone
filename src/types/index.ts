export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight: string;
  imageUrl: string;
  category: string;
  subcategory?: string;
  tags?: string[];
  inStock: boolean;
  rating?: number;
  isFeatured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  subcategories?: {
    id: string;
    name: string;
  }[];
};

export type LocationData = {
  id: string;
  address: string;
  fullAddress: string;
  lat: number;
  lng: number;
};

export type DeliveryTime = {
  min: number; // minutes
  max: number; // minutes
};

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type OrderItem = {
  product: Product;
  quantity: number;
  price: number; // Price at the time of order
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  deliveryAddress: string;
  deliveryTime: DeliveryTime;
  paymentMethod: 'cod' | 'online';
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  trackingSteps: {
    status: string;
    time: string;
    completed: boolean;
  }[];
};

export type RecurringItem = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  deliveryTime: string; // HH:mm format
  isActive: boolean;
  autoPayEnabled: boolean;
  nextDeliveryDate: string;
  createdAt: string;
  updatedAt: string;
};

export type RecurringOrderNotification = {
  id: string;
  userId: string;
  recurringItemId: string;
  message: string;
  deliveryDate: string;
  isRead: boolean;
  createdAt: string;
};