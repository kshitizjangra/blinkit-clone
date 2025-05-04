import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/categories';

const CategoryNav = () => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 300;
    const currentScroll = scrollRef.current.scrollLeft;
    
    scrollRef.current.scrollTo({
      left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="bg-white sticky top-16 md:top-20 shadow-sm z-40">
      <div className="container-custom relative">
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        
        <div 
          ref={scrollRef}
          className="flex items-center space-x-4 py-3 overflow-x-auto no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center min-w-[72px] transition hover:opacity-80"
            >
              <div className="w-14 h-14 mb-1 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-xs text-center line-clamp-2 h-8">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 rounded-full p-1 shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryNav;