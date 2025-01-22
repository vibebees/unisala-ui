import React, { FC, useState } from "react";
import { Img, SkeletonText } from "../../../defaults";
import NoImageFound from "@assets/no_image_found.png";
import { cn } from "@utils/index";

interface IImageWithLoader {
  style?: React.CSSProperties;
  src: string;
  className?: string;
  alt: string;
}

const ImageWithLoader: FC<IImageWithLoader> = ({
  style,
  src,
  className,
  alt,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <>
      <div style={style} className={cn("relative overflow-hidden", className)}>
        <Img
          src={imageSrc}
          className={cn("w-full h-full object-cover", className)}
          alt={alt}
          style={style}
          loading="lazy"
          onIonImgDidLoad={() => setImageLoaded(true)}
          onIonError={() => {
            setImageLoaded(true);
            setImageSrc(NoImageFound);
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
  );
};

export default ImageWithLoader;
