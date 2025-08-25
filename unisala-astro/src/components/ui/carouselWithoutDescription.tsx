import React, { useState, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface CarouselItem {
  image: string;
  title?: string;
  description?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoSlideInterval?: number;
  className?: string;
  showPropagation?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ 
  items, 
  autoSlideInterval = 15000, 
  className = '',
  showPropagation = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isAutoSliding) {
      intervalId = setInterval(nextSlide, autoSlideInterval);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isAutoSliding, autoSlideInterval, nextSlide]);

  const handleMouseEnter = () => setIsAutoSliding(false);
  const handleMouseLeave = () => setIsAutoSliding(true);

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    if (showPropagation) {
      e.stopPropagation();
    }
    action();
  };

  return (
    <div 
      className={`relative w-full h-96 overflow-hidden rounded-lg ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            <img
              src={item.image}
              alt={item.title || `Slide ${index + 1}`}
              className="w-full h-75 object-cover"
            />
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        onClick={(e) => handleButtonClick(e, prevSlide)}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        onClick={(e) => handleButtonClick(e, nextSlide)}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        onClick={() => setIsOpen(true)}
        aria-label="View fullscreen"
      >
        <Maximize2 className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-auto max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
            <img
              src={items[currentIndex]?.image || ''}
              alt={items[currentIndex]?.title || `Slide ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <Dialog.Close className="absolute top-2 right-2 bg-white rounded-full p-1">
              <X className="w-6 h-6 text-gray-800" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Carousel;