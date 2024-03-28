// ImageCollage.js
import React, { useState } from "react"

import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent
} from "@ionic/react"

const ImageCollage = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModalWithImage = (index) => {
    setCurrentImageIndex(index)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="cursor-pointer w-full h-44 max-md:h-32 object-cover border-2 border-neutral-700 hover:opacity-80"
            onClick={() => openModalWithImage(index)}
          />
        ))}
      </div>

      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            {images.length > 1 && (
              <IonButtons slot="start">
                <IonButton onClick={prevImage}>Previous</IonButton>
                <IonButton onClick={nextImage}>Next</IonButton>
              </IonButtons>
            )}
            <IonButtons slot="end">
              <IonButton onClick={closeModal}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding !p-0">
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
            className="w-full max-h-96 object-contain"
          />
        </IonContent>
      </IonModal>
    </div>
  )
}

export default ImageCollage
