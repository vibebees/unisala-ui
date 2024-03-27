// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from "react"
import { universityDefaultImage } from "servers/s3.configs"
import "./CoverImg.css"

export const CoverImg = ({ allProps }) => {
  const { uniData, width, setWidth } = allProps
  const images = uniData?.elevatorInfo?.pictures || []
  const getRandomImage = (arr, exclude = "") => {
    if (arr.length === 0) return universityDefaultImage
    const filteredArray = exclude ? arr.filter((img) => img !== exclude) : arr
    if (filteredArray.length === 0) return exclude // Return exclude if no other options
    const randomIndex = Math.floor(Math.random() * filteredArray.length)
    return filteredArray[randomIndex]
  }

  // Setting initial state for coverImage and profileImage
  const [coverImage, setCoverImage] = useState(getRandomImage(images))
  const [profileImage, setProfileImage] = useState(
    getRandomImage(images, coverImage)
  )

  // Effect to update profileImage if coverImage changes, ensuring they are not the same
  useEffect(() => {
    setProfileImage((prevProfileImage) => {
      if (prevProfileImage === coverImage) {
        return getRandomImage(images, coverImage)
      }
      return prevProfileImage
    })
  }, [coverImage, images])

  const handleResize = () => {
    const { innerWidth } = window

    if (width !== innerWidth) {
      setWidth(innerWidth)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <div className="CoverImg">
      <div
        // style={{ height: "100%", overflow: "hidden" }}
        className="CoverImg_Div"
      >
        <a
          target={"_blank"}
          rel="noreferrer"
          style={{
            width: "100%"
          }}
          href={coverImage}
        >
          <img
            style={{ transition: "0.3s" }}
            src={coverImage}
            className="CoverImg_Img"
            alt=""
          />
        </a>
      </div>
      <div
        style={{
          left: width > 720 ? "25px" : "0",
          right: width < 720 && "0",
          margin: "auto"
        }}
        id="ProfileImg_div"
      >
        <img src={profileImage} alt="" id="ProfileImg_Img" className="z-20" />
      </div>
    </div>
  )
}
