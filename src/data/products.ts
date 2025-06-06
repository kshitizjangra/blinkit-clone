import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Onion',
    description: 'Fresh and high-quality onions. Perfect for daily cooking needs.',
    price: 39,
    originalPrice: 45,
    discount: 13,
    weight: '1 kg',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/391306a.jpg',
    category: 'fruits-vegetables',
    subcategory: 'fresh-vegetables',
    inStock: true,
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Fresh Tomato',
    description: 'Vine-ripened, farm-fresh tomatoes that are juicy and flavorful.',
    price: 35,
    originalPrice: 40,
    discount: 12,
    weight: '500 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/391349a.jpg',
    category: 'fruits-vegetables',
    subcategory: 'fresh-vegetables',
    inStock: true,
    rating: 4.2,
    isFeatured: true,
  },
  {
    id: 'p3',
    name: 'Amul Butter',
    description: 'Pasteurized butter made from fresh cream. Perfect for cooking and spreading.',
    price: 52,
    originalPrice: 55,
    discount: 5,
    weight: '100 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/29592a.jpg',
    category: 'dairy-breakfast',
    subcategory: 'bread',
    inStock: true,
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 'p4',
    name: 'Amul Milk',
    description: 'Pasteurized toned milk that is high in calcium and essential nutrients.',
    price: 30,
    originalPrice: 30,
    discount: 0,
    weight: '500 ml',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/24283a.jpg',
    category: 'dairy-breakfast',
    subcategory: 'milk',
    inStock: true,
    rating: 4.6,
    isFeatured: true,
  },
  {
    id: 'p5',
    name: 'Brown Eggs (Pack of 6)',
    description: 'Farm-fresh brown eggs that are rich in protein and essential vitamins.',
    price: 78,
    originalPrice: 85,
    discount: 8,
    weight: '6 pieces',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/192a.jpg',
    category: 'dairy-breakfast',
    subcategory: 'eggs',
    inStock: true,
    rating: 4.7,
    isFeatured: false,
  },
  {
    id: 'p6',
    name: 'Coca-Cola',
    description: 'Refreshing carbonated soft drink to quench your thirst.',
    price: 40,
    originalPrice: 45,
    discount: 11,
    weight: '750 ml',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/483360a.jpg',
    category: 'cold-drinks-juices',
    subcategory: 'soft-drinks',
    inStock: true,
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: 'p7',
    name: 'Lay\'s Classic Salted Potato Chips',
    description: 'Crunchy potato chips with perfect salt seasoning for a delicious snack.',
    price: 20,
    originalPrice: 20,
    discount: 0,
    weight: '52 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/14178a.jpg',
    category: 'snacks-munchies',
    subcategory: 'chips-crisps',
    inStock: true,
    rating: 4.6,
    isFeatured: true,
  },
  {
    id: 'p8',
    name: 'Fortune Sunlite Refined Sunflower Oil',
    description: 'Refined sunflower oil that is light and healthy for everyday cooking.',
    price: 210,
    originalPrice: 240,
    discount: 12,
    weight: '1 L',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/478867a.jpg',
    category: 'atta-rice-dal',
    subcategory: 'atta-flours',
    inStock: true,
    rating: 4.4,
    isFeatured: false,
  },
  {
    id: 'p9',
    name: 'Aashirvaad Atta',
    description: 'Premium quality whole wheat flour for soft, fluffy rotis and chapatis.',
    price: 325,
    originalPrice: 350,
    discount: 7,
    weight: '5 kg',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/479475a.jpg',
    category: 'atta-rice-dal',
    subcategory: 'atta-flours',
    inStock: true,
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 'p10',
    name: 'Kissan Mixed Fruit Jam',
    description: 'Delicious mixed fruit jam for a perfect breakfast spread.',
    price: 109,
    originalPrice: 120,
    discount: 9,
    weight: '500 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/6766a.jpg',
    category: 'sauces-spreads',
    subcategory: 'jams-spreads',
    inStock: true,
    rating: 4.3,
    isFeatured: false,
  },
  {
    id: 'p11',
    name: 'Dabur Honey',
    description: '100% pure honey that is rich in nutrients and natural goodness.',
    price: 315,
    originalPrice: 345,
    discount: 9,
    weight: '500 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/345127a.jpg',
    category: 'sauces-spreads',
    subcategory: 'honey-chyawanprash',
    inStock: true,
    rating: 4.7,
    isFeatured: false,
  },
  {
    id: 'p12',
    name: 'Dettol Original Soap',
    description: 'Antibacterial soap that protects against germs and keeps you fresh.',
    price: 40,
    originalPrice: 45,
    discount: 11,
    weight: '125 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/24552a.jpg',
    category: 'bath-body',
    subcategory: 'bathing-soaps',
    inStock: true,
    rating: 4.6,
    isFeatured: false,
  },
  {
    id: 'p13',
    name: 'Fresh Potato',
    description: 'Fresh and clean potatoes perfect for all your cooking needs.',
    price: 49,
    originalPrice: 55,
    discount: 11,
    weight: '1 kg',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/10084a.jpg',
    category: 'fruits-vegetables',
    subcategory: 'fresh-vegetables',
    inStock: true,
    rating: 4.4,
    isFeatured: true,
  },
  {
    id: 'p14',
    name: 'Fresh Banana',
    description: 'Sweet and nutritious bananas packed with energy.',
    price: 59,
    originalPrice: 65,
    discount: 9,
    weight: '500 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/387281a.jpg',
    category: 'fruits-vegetables',
    subcategory: 'fresh-fruits',
    inStock: true,
    rating: 4.5,
    isFeatured: true,
  },
  {
    id: 'p15',
    name: 'Surf Excel Matic Liquid Detergent',
    description: 'Superior stain removal for machine wash, keeping your clothes bright and clean.',
    price: 260,
    originalPrice: 285,
    discount: 9,
    weight: '1 L',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/118873a.jpg',
    category: 'home-cleaning',
    subcategory: 'detergents',
    inStock: true,
    rating: 4.7,
    isFeatured: false,
  },
  {
    id: 'p16',
    name: 'Himalaya Baby Powder',
    description: 'Gentle, safe powder for baby\'s delicate skin. Keeps skin soft and dry.',
    price: 165,
    originalPrice: 180,
    discount: 8,
    weight: '200 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/45642a.jpg',
    category: 'baby-care',
    subcategory: 'baby-bath',
    inStock: true,
    rating: 4.5,
    isFeatured: false,
  },
  {
    id: 'p17',
    name: 'Dettol Sanitizer',
    description: 'Kills 99.9% of germs without water. Perfect for on-the-go hand hygiene.',
    price: 80,
    originalPrice: 85,
    discount: 6,
    weight: '50 ml',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/438a.jpg',
    category: 'pharma-wellness',
    subcategory: 'skin-care',
    inStock: true,
    rating: 4.8,
    isFeatured: false,
  },
  {
    id: 'p18',
    name: 'Fresh Apple',
    description: 'Crisp, juicy apples rich in fiber and vitamins.',
    price: 149,
    originalPrice: 165,
    discount: 10,
    weight: '4 pcs (approx. 500-600 g)',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/344083a.jpg',
    category: 'fruits-vegetables',
    subcategory: 'fresh-fruits',
    inStock: true,
    rating: 4.6,
    isFeatured: true,
  },
  {
    id: 'p19',
    name: 'Real Mixed Fruit Juice',
    description: 'Refreshing mixed fruit juice made from real fruit pulp.',
    price: 85,
    originalPrice: 90,
    discount: 6,
    weight: '1 L',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/36683a.jpg',
    category: 'cold-drinks-juices',
    subcategory: 'fruit-juices',
    inStock: true,
    rating: 4.5,
    isFeatured: false,
  },
  {
    id: 'p20',
    name: 'Red Label Tea',
    description: 'Rich and aromatic tea leaves for a perfect cup of tea.',
    price: 140,
    originalPrice: 150,
    discount: 7,
    weight: '250 g',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/369191a.jpg',
    category: 'dairy-breakfast',
    subcategory: 'milk',
    inStock: true,
    rating: 4.7,
    isFeatured: true,
  }
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (productId: string) => {
  return products.find(product => product.id === productId);
};

export const getRelatedProducts = (productId: string, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

export const searchProducts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
};