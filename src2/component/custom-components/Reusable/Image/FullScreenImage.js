import React from "react"
import { IonImg } from "@ionic/react"

const FullScreenImage = ({ src, className, alt, onclick }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black z-[1000 ]">
      <IonImg
        src={src}
        className={"w-full h-full scale-[1] object-contain"}
        alt={alt}
        style={{ objectFit: "contain" }}
        loading="lazy"
      />
    </div>
  )
}

export default FullScreenImage
