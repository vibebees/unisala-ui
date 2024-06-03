import React, { FC, useState } from "react";
import clsx from "clsx";
import { Label } from "@components/defaults";
import { RatingData } from "./RatingData";
import { getCache, setCache } from "@utils/cache";

interface IRatingProps {
  item: {
    id: string;
    name: string;
  };
  setPostData: any;
}

const GenerateRatingComponent: FC<IRatingProps> = ({ item, setPostData }) => {
  const [ratings, setRatings] = useState<{
    [key: string]: number;
  }>(getCache(item.id) || {});
  const handleRatingChange = (itemId: keyof TPostDataType, value: number) => {
    setRatings((prevRatings) => {
      let newData = {
        ...prevRatings,
        [itemId]: value,
      };
      setCache(itemId as string, JSON.stringify(newData));
      return newData;
    });
    setPostData((prev: any) => {
      let newData = {
        ...prev,
        [itemId]: value,
      };
      setCache("postData", JSON.stringify(newData));
      return newData;
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
            onClick={() => handleRatingChange(item?.id as never, val.value)}
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
