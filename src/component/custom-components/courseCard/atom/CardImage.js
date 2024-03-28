import ImageWithLoader from "component/Reusable/Image/ImageWithLoader"
import { universityDefaultImage } from "servers/s3.configs"
import NoImage from "../../../assets/no_image_found.png"

const CardImage = ({ pictures = [] }) => {
  const imageContainerStyle = {
    display: "inline-flex",
    flexWrap: "nowrap"
  }
  const imageStyle = {
    width: "150px",
    height: "120px",
    objectFit: "cover",
    margin: "4px",
    cursor: "pointer"
  }

  return (
    <div className="card-image - overflow-hidden mr-2">
      <div style={imageContainerStyle}>
        {pictures.length > 0 &&
          pictures?.map((picture, index) => (
            <ImageWithLoader
              key={index}
              src={picture || universityDefaultImage}
              style={imageStyle}
              alt={`University Image ${index + 1}`}
            />
          ))}
      </div>
    </div>
  )
}

export default CardImage
