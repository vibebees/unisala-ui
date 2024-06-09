// eslint-disable-next-line no-use-before-define
import React, {useEffect, useState} from "react"
import {universityDefaultImage} from "servers/s3.configs"
import "./CoverImg.css"

export const CoverImg = (props) => {
    const [width, setWidth] = React.useState(window.innerWidth)
    const [images, setImages] = useState(props?.images || [])

    const [coverImage, setCoverImage] = useState(images[0] || universityDefaultImage)
    const [profileImage, setProfileImage] = useState(images[1] || universityDefaultImage)

    const handleResize = () => {
        const {innerWidth} = window

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
                    < img
                        style={{transition: "0.3s"}}
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
                <img
                    src={profileImage}
                    alt=""
                    id="ProfileImg_Img"
                />
            </div>
        </div>
    )
}
