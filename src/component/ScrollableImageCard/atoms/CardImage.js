import React from "react"
import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"

const CardImage = ({ image }) => {
  return (
    <div className="w-48 h-56">
      {/* <img src={image} alt="college" className="h-full w-full object-cover" /> */}
      <ImageWithLoader
        src={image}
        alt={"college"}
        className={"h-full w-full object-cover"}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  )
}

export default CardImage
