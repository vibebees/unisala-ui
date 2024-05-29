import React from "react"
import { Img } from "../../../defaults/index"

const FullScreenImage = ({ src, className, alt, onclick }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black z-[1000 ]">
      <Img
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
