// ImageCollage.js
import React, { useEffect, useState } from 'react';

import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent
} from '@ionic/react';

const ImageCollage = ({ images =[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [largeIndex, setLargeIndex] = useState(0);

  const openModalWithImage = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const getRandomLargeIndex = () => {
    return Math.floor(Math.random() * images.length);
  };

  useEffect(() => {
    setLargeIndex(Math.floor(Math.random() * images.length)); // Randomize on mount
  }, []);


  const LargerImage = ({ image = '', index = 0 }) => (
    <div>
      <img
        className='h-auto w-full max-w-full rounded-lg object-contain object-center md:h-[480px]'
        // className='h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]'
        src={image}
        alt=''
        onClick={() => openModalWithImage(index)}
      />
    </div>
  );
  const SmallerImage = ({ image = '', index = 0 }) => (
    <div>
    <img
      src={image}
      className='object-cover object-center h-20 max-w-full rounded-lg cursor-pointer'
        alt='gallery-image'
        onClick={() => openModalWithImage(index)}

    />
  </div>
  );

  return (
    <>
      <div className='grid gap-4'>
       {images.map((image, index) => (
          index === largeIndex ? <LargerImage key={index} image={image} index={index} /> : null
        ))}
        <div className='grid grid-cols-5 gap-4'>
          {images.map((image, index) => (
            index !== largeIndex ? <SmallerImage key={index} image={image} index={index} /> : null
          ))}
        </div>
      </div>

      <div className='container mx-auto py-8'>
        {/* <div className='grid grid-cols-2 md:grid-cols-4'>
       {images.map((image, index) => {
         return (
           <img
             key={index}
             src={image}
             alt={`Image ${index + 1}`}
             // className="cursor-pointer w-full h-44 max-md:h-32 object-cover border-2 border-neutral-700 hover:opacity-80"
             className="object-cover object-center h-20 cursor-pointer"
             onClick={() => openModalWithImage(index)}
           />
         );
       })}
     </div> */}

        <IonModal isOpen={isOpen}>
          <IonHeader>
            <IonToolbar>
              {images.length > 1 && (
                <IonButtons slot='start'>
                  <IonButton onClick={prevImage}>Previous</IonButton>
                  <IonButton onClick={nextImage}>Next</IonButton>
                </IonButtons>
              )}
              <IonButtons slot='end'>
                <IonButton onClick={closeModal}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding !p-0'>
            <img
              src={images[currentImageIndex]}
              alt={`Image ${currentImageIndex + 1}`}
              className='w-full max-h-96 object-contain'
            />
          </IonContent>
        </IonModal>
      </div>
    </>
  );
};

export default ImageCollage;
