import React from "react";
import { Input, Typography } from "@components/defaults";

export const InputComponent = (item, postData, setPostData) => {

  return (
    <>
      <Typography className="text-sm">{item.name}</Typography>
      <Input
        id={item.id} // Add id attribute here
        name={item.name}
        type={item.type}
        placeholder={item.placeholder || ""}
        className="border border-[#bdbdbd]  !px-2 text-sm rounded-sm "
        onIonChange={(e) => {
          const postText = htmlForEditor(
            postData?.postText,
            item.name,
            e.target.value,
          );
          setPostData((prev) => ({
            ...prev,
            postText,
            [item.id]: isNaN(e.target.value)
              ? e.target.value
              : parseFloat(e.target.value),
          }));
        }}
      />
    </>
  );
};
