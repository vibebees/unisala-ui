import React from "react";
import NoImage from "@assets/no_image_found.png";

const CardImage = ({ pictures = [] }) => {
  const imageStyle: React.CSSProperties = {
    width: "150px",
    height: "120px",
    objectFit: "cover",
    margin: "4px",
    cursor: "pointer",
  };

  return (
    <div className="w-full  overflow-hidden flex">
      {pictures.length > 0 &&
        pictures?.map((picture, index) => (
          <img
            key={index}
            src={picture || NoImage}
            alt="University"
            style={{ ...imageStyle }}
          />
        ))}
    </div>
  );
};

export default CardImage;
