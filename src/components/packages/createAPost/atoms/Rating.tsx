import React, { useState } from "react";
import clsx from "clsx";
import { Label } from "@components/defaults";
import { RatingData } from "./RatingData";

const GenerateRatingComponent = ({item, setPostData}) => {
  const [ratings, setRatings] = useState({});
  const handleRatingChange = (itemId: keyof TPostDataType, value: string) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [itemId]: value,
    }));

    setPostData((prev: any) => {
      return {
        ...prev,
        [itemId]: value,
      };
    });
  };

  return (
    <>
      <Label>{item.name}</Label>
      <div className="flex justify-start gap-x-2">
        {RatingData.map((val, index) => (
          <div
            key={index}
            className="mt-2 cursor-pointer"
            onClick={() => handleRatingChange(item?.id, val.value, item.name)}
          >
            <span
              className={clsx("text-4xl transition ease-linear", {
                grayscale: ratings[item?.id] !== val.value,
              })}
            >
              {ratings[item?.id] !== val.value ? (
                val.Emojis
              ) : (
                <img src={val.imageURL} alt="" width={48} />
              )}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default GenerateRatingComponent;
