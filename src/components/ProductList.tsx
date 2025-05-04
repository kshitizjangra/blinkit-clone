import { useState } from 'react';
import { ArrowUpDown, X } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

type SortOption = 'relevance' | 'price-low-high' | 'price-high-low' | 'name-a-z';

type ProductListProps = {
  products: Product[];
  title?: string;
  showFilter?: boolean;
  variant?: 'default' | 'compact';
};

const ProductList = ({ 
  products, 
  title, 
  showFilter = false,
  variant = 'default'
}: ProductListProps) => {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  
  // Get min and max price from products
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));
  
  // Initialize price range if not set
  if (!priceRange && products.length > 0) {
    setPriceRange([minPrice, maxPrice]);
  }
  
  // Filter products based on price range
  const filteredProducts = products.filter(product => {
    if (!priceRange) return true;
    return product.price >= priceRange[0] && product.price <= priceRange[1];
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      default:
        return 0; // relevance - keep original order
    }
  });
  
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setShowSortOptions(false);
  };
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };
  
  const clearFilters = () => {
    setSortBy('relevance');
    setPriceRange([minPrice, maxPrice]);
  };
  
  return (
    <div className="space-y-4">
      {/* Header */}
      {(title || showFilter) && (
        <div className="flex justify-between items-center">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          
          {showFilter && (
            <div className="flex items-center space-x-2">
              {/* Sort dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowSortOptions(!showSortOptions)}
                  className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ArrowUpDown size={16} className="mr-1.5" />
                  <span>Sort</span>
                </button>
                
                {showSortOptions && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-56">
                    <div className="p-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Sort by</span>
                        <button 
                          onClick={() => setShowSortOptions(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="space-y-1">
                        <button 
                          onClick={() => handleSortChange('relevance')}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${sortBy === 'relevance' ? 'bg-primary/10 text-black' : 'hover:bg-gray-100'}`}
                        >
                          Relevance
                        </button>
                        <button 
                          onClick={() => handleSortChange('price-low-high')}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${sortBy === 'price-low-high' ? 'bg-primary/10 text-black' : 'hover:bg-gray-100'}`}
                        >
                          Price (Low to High)
                        </button>
                        <button 
                          onClick={() => handleSortChange('price-high-low')}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${sortBy === 'price-high-low' ? 'bg-primary/10 text-black' : 'hover:bg-gray-100'}`}
                        >
                          Price (High to Low)
                        </button>
                        <button 
                          onClick={() => handleSortChange('name-a-z')}
                          className={`w-full text-left px-3 py-1.5 rounded-md ${sortBy === 'name-a-z' ? 'bg-primary/10 text-black' : 'hover:bg-gray-100'}`}
                        >
                          Name (A to Z)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Price filter */}
              <div className="relative">
                <button 
                  onClick={() => setShowPriceFilter(!showPriceFilter)}
                  className="flex items-center px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <span>Price</span>
                </button>
                
                {showPriceFilter && priceRange && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-64 p-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">Price Range</span>
                      <button 
                        onClick={() => setShowPriceFilter(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                      <input 
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                        className="w-full"
                      />
                      <input 
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        onClick={() => setShowPriceFilter(false)}
                        className="bg-primary text-black px-3 py-1.5 rounded-md text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Clear filters */}
              {(sortBy !== 'relevance' || (priceRange && (priceRange[0] > minPrice || priceRange[1] < maxPrice))) && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-accent underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Product grid */}
      <div className={`grid ${
        variant === 'compact' 
          ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3'
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4'
      }`}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} variant={variant} />
        ))}
      </div>
      
      {/* Empty state */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
          {showFilter && (
            <button 
              onClick={clearFilters}
              className="mt-2 text-accent underline text-sm"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;