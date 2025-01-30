// ImageCollage.tsx
import React, { useEffect, useState } from "react";

interface ImageCollageProps {
  images: string[];
}

const ImageCollage: React.FC<ImageCollageProps> = ({ images = [] }) => {
  const [largeIndex, setLargeIndex] = useState(0);

  useEffect(() => {
    setLargeIndex(Math.floor(Math.random() * images.length)); // Randomize on mount
  }, [images.length]);

  const LargerImage: React.FC<{ image: string; index: number }> = ({ image, index }) => (
    <div>
      <img
        className="h-auto w-full max-w-full rounded-lg object-contain object-center"
        src={image}
        alt=""
      />
    </div>
  );

  const SmallerImage: React.FC<{ image: string; index: number }> = ({ image, index }) => (
    <div>
      <img
        src={image}
        className="h-50 max-w-full rounded-lg object-cover object-center md:h-60"
        alt="gallery-image"
      />
    </div>
  );

  return (
    <div className="grid gap-0">
      {images.map((image, index) =>
        index === largeIndex ? (
          <LargerImage key={index} image={image} index={index} />
        ) : null
      )}
      <div className="grid grid-cols-5 gap-1">
        {images.map((image, index) =>
          index !== largeIndex ? (
            <SmallerImage key={index} image={image} index={index} />
          ) : null
        )}
      </div>
    </div>
  );
};

export default ImageCollage;