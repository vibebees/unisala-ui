import React, { Dispatch, FC } from "react";
import { Checkbox, Label } from "@components/defaults";
import { setCache } from "@utils/cache";

interface ICheckboxComponentProps {
  item: {
    id: string;
    name: string;
  };
  postData: TPostDataType;
  setPostData: Dispatch<any>;
}

const CheckboxComponent: FC<ICheckboxComponentProps> = ({
  item,
  postData,
  setPostData,
}) => {
  return (
    <div className="flex mt-2 w-fit items-center">
      <Label htmlFor={item.id}>{item.name}</Label>

      <Checkbox
        className="ml-2 "
        id={item.id} // Add id attribute here
        name={item.name}
        onIonChange={(e: any) => {
          setPostData((prev: any) => {
            let newData = {
              ...prev,
              [item.id]: e.target.checked,
            };
            setCache("postData", JSON.stringify(newData));
            return newData;
          });
        }}
      />
    </div>
  );
};

export { CheckboxComponent };
