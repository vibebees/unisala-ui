import React, { useState } from "react"
import { Img, SkeletonText } from "../../../defaults"
import NoImageFound from "../../../../assets/no_image_found.png"
import FullScreenImage from "../../../packages/reusable/Image/FullScreenImage"

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
        <Img
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
            <SkeletonText
              animated={true}
              className="bg-neutral-300"
            ></SkeletonText>
          </div>
        )}
      </div>
    </>
  )
}

export default ImageWithLoader
