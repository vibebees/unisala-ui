import React, { FC, Dispatch } from "react";
import { Input, Typography } from "@components/defaults";
import { htmlForEditor } from "../utils/htmlForEditor";
import { setCache } from "@utils/cache";

interface IInputComponentProps {
  item: {
    id: string;
    name: string;
    type: string;
    placeholder?: string;
  };
  postData: TPostDataType;
  setPostData: Dispatch<any>;
}

const InputComponent: FC<IInputComponentProps> = ({
  item,
  postData,
  setPostData,
}) => {
  return (
    <>
      <Typography className="text-sm">{item?.name}</Typography>
      <Input
        id={item.id} // Add id attribute here
        name={item.name}
        type={item.type}
        value={postData ? postData[item.id as keyof typeof postData] : ""}
        placeholder={item.placeholder || ""}
        className="border border-[#bdbdbd]  !px-2 text-sm rounded-sm "
        onIonChange={(e: any) => {
          if (postData?.id === "event") return;
          const postText = htmlForEditor(
            postData?.postText,
            item.name,
            e.target.value
          );
          setPostData((prev: any) => {
            let newData = {
              ...prev,
              postText,
              [item.id]: isNaN(e.target.value)
                ? e.target.value
                : parseFloat(e.target.value),
            };
            setCache("postData", JSON.stringify(newData));
            return newData;
          });
        }}
      />
    </>
  );
};

export { InputComponent };
