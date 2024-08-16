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

  const controller = () =>(
    <>
      <button
        onClick={(e) => handleButtonClick(e, prevSlide)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={(e) => handleButtonClick(e, nextSlide)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
      >
        <Maximize2 className="w-6 h-6 text-gray-800" />
      </button>
    </>
  )
  return (
    <div 
      className={`relative w-full h-96 mb-8 overflow-hidden rounded-lg ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {(item.title || item.description) && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              {item.title && <h3 className="text-xl font-bold mb-2">{item.title}</h3>}
              {item.description && <p>{item.description}</p>}
            </div>
          )}
        </div>
      ))}

    
      {showPropagation && controller()}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-auto max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
            <img
              src={items[currentIndex].image}
              alt={items[currentIndex].title}
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