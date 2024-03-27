import React, { useState } from "react"
import { IonImg, IonSkeletonText } from "@ionic/react"
import NoImageFound from "../../../assets/no_image_found.png"
import FullScreenImage from "component/Reusable/Image/FullScreenImage"

const ImageWithLoader = ({
  style,
  src,
  className,
  alt,
  fullScreenImage = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(src)
  const [showFullScreen, setShowFullScreen] = useState(false)

  return (
    <>
      <div style={style} className="relative">
        <IonImg
          src={imageSrc}
          onClick={() => setShowFullScreen(true)}
          className={className}
          alt={alt}
          style={style}
          loading="lazy"
          onIonImgDidLoad={() => setImageLoaded(true)}
          onIonError={() => {
            setImageLoaded(true)
            setImageSrc(NoImageFound)
          }}
        />

        {!imageLoaded && (
          <div className=" absolute inset-0" style={style}>
            <IonSkeletonText
              animated={true}
              className="bg-neutral-300"
            ></IonSkeletonText>
          </div>
        )}
      </div>
    </>
  )
}

export default ImageWithLoader
