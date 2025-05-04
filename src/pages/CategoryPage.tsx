import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { categories } from '../data/categories';
import { getProductsByCategory } from '../data/products';
import { ChevronRight } from 'lucide-react';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  
  const category = categories.find(cat => cat.id === categoryId);
  const products = getProductsByCategory(categoryId || '');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveSubcategory(null);
  }, [categoryId]);
  
  // Filter products by subcategory
  const filteredProducts = activeSubcategory
    ? products.filter(product => product.subcategory === activeSubcategory)
    : products;
  
  if (!category) {
    return (
      <div className="container-custom py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">Category not found</h2>
          <p className="text-text-secondary mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="bg-primary text-black px-4 py-2 rounded-md font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-text-secondary mb-4">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight size={14} className="mx-1" />
        <span className="text-black font-medium">{category.name}</span>
      </div>
      
      {/* Category Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">{category.name}</h1>
        <p className="text-text-secondary">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
        </p>
      </div>
      
      {/* Subcategories (if any) */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                activeSubcategory === null
                  ? 'bg-primary text-black'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              All {category.name}
            </button>
            
            {category.subcategories.map((subcategory) => (
              <button
                key={subcategory.id}
                onClick={() => setActiveSubcategory(subcategory.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                  activeSubcategory === subcategory.id
                    ? 'bg-primary text-black'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                }`}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Products */}
      <ProductList 
        products={filteredProducts} 
        showFilter={true}
      />
    </div>
  );
};

export default CategoryPage;