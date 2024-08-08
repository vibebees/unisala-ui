import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
// 

const carouselItems = [
    {
      image: "https://cdn.vectorstock.com/i/2000v/19/60/3d-isometric-flat-conceptual-vector-43471960.avif",
      title: "Discover Scholarships",
      description: "Begin your journey by discovering scholarships tailored to your profile."
    },
    {
        image: "https://cdn.vectorstock.com/i/2000v/07/48/university-with-students-outdoors-teenagers-vector-34050748.avif",
        title: "Discover Universities",
        description: "Begin your journey by discovering best universities that can be home to your future."
      },
    {
      image: "https://cdn.vectorstock.com/i/2000v/10/33/student-campus-flat-vector-46441033.avif",
      title: "Match Your Profile",
      description: "Discovering universities offering scholarships that align perfectly with your academic profile."
    },
    {
      image: "https://cdn.vectorstock.com/i/2000v/86/40/masters-and-bachelors-students-graduation-online-vector-37458640.avif",
      title: "Maximize Your Opportunities",
      description: "Uncover hidden gems - universities eager to invest in your potential with generous scholarship packages."
    },
    {
      image: "https://cdn.vectorstock.com/i/1000x1000/44/16/university-students-in-campus-word-concept-banner-vector-29244416.webp",
      title: "Transform Your Future",
      description: "Take the first step towards a brighter future. Your future university and scholarship await!"
    }
  ];

const ScholarshipStoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (isAutoSliding) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 15000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoSliding]);

  const handleMouseEnter = () => {
    setIsAutoSliding(false);
  };

  const handleMouseLeave = () => {
    setIsAutoSliding(true);
  };

  return (
    <div 
      className="relative w-full h-96 mb-8 overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {carouselItems.map((item, index) => (
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
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
          <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/>
        </svg>
      </button>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-auto max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden">
            <img
              src={carouselItems[currentIndex].image}
              alt={carouselItems[currentIndex].title}
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

export default ScholarshipStoryCarousel;