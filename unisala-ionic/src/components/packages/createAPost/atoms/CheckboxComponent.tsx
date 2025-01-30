import React, { Dispatch, FC } from "react";
import { Checkbox, Label } from "@components/defaults";
import { setCache } from "@utils/cache";
import { trackEvent } from "@components/analytics";

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
        className="ml-2"
        id={item.id} // Add id attribute here
        name={item.name } // Add name attribute here
        onIonChange={(e: any) => {
          const isChecked = e.target.checked;
          setPostData((prev: any) => {
            let newData = {
              ...prev,
              [item.id]: isChecked,
            };
            setCache("postData", JSON.stringify(newData));
            return newData;
          });
          // Track the event when the checkbox is changed
          trackEvent({
            action: 'Checkbox_Changed',
            category: 'AddPost',
            label: item.name,
            value: isChecked ? 1 : 0
          });
        }}
      />
    </div>
  );
};

export { CheckboxComponent };
