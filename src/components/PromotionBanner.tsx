import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type BannerData = {
  id: string;
  imageUrl: string;
  mobileImageUrl: string;
  url: string;
  altText: string;
};

const banners: BannerData[] = [
  {
    id: '1',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=1440/layout-engine/2022-05/Group-33704.jpg',
    mobileImageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=720/layout-engine/2022-05/morning-banner-mobile.jpg',
    url: '/offers',
    altText: 'Get up to 100% off on your first order',
  },
  {
    id: '2',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=1440/layout-engine/2022-06/morning-banner-1440x360.jpg',
    mobileImageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=720/layout-engine/2022-06/morning-banner-720x300.jpg',
    url: '/category/fruits-vegetables',
    altText: 'Fresh fruits and vegetables delivery',
  },
  {
    id: '3',
    imageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=1440/layout-engine/2023-03/Pet-Care_WEB.jpg',
    mobileImageUrl: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=720/layout-engine/2023-03/Pet-Care_App.jpg',
    url: '/category/pet-care',
    altText: 'Premium pet care products',
  },
];

const PromotionBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDismissed) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (isDismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-lg mb-4">
      <div className="relative">
        <Link to={banners[currentIndex].url}>
          <picture>
            <source 
              media="(min-width: 768px)" 
              srcSet={banners[currentIndex].imageUrl} 
            />
            <img
              src={banners[currentIndex].mobileImageUrl}
              alt={banners[currentIndex].altText}
              className="w-full h-auto object-cover rounded-lg"
            />
          </picture>
        </Link>

        {/* Close button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Navigation arrows */}
        <button
          onClick={(e) => {
            e.preventDefault();
            goToPrevious();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-sm hidden sm:block"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            goToNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-sm hidden sm:block"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionBanner;