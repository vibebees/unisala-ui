import React from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"

const ThreadImages = ({ images, _id }) => {
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  }

  if (images.length === 0) return null

  return (
    <Link to={`/thread/${_id}`} className={clsx("relative")}>
      {/* <IonSlides
        pager={true}
        options={slideOpts}
        className="static w-1/2 max-md:w-full"
      >
        {images.map((image, index) => (
            <IonSlide className=" w-20 overflow-hidden" key={index}>
              <ImageWithLoader
                src={image}
                alt={image}
                fullScreenImage={true}
                className="w-full max-h-96 object-contain"
                style={{
                  maxHeight: "300px",
                  objectFit: "contain",
                  width: "100%",
                  overflow: "hidden"
                }}
              />
            </IonSlide>
        ))}
      </IonSlides> */}
    </Link>
  )
}

export default ThreadImages
