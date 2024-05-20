import React, { FC, useState } from "react";
import ReactSelect from "react-select";
import { IonInput, IonLabel } from "@ionic/react";
import { htmlForEditor } from "../utils/htmlForEditor";
import { setCache } from "@utils/cache";

interface selectAtomProps {
  options: string[];
  item: any;
  setPostData: any;
  postData: any;
}

const SelectAtom: FC<selectAtomProps> = ({
  options,
  item,
  setPostData,
  postData,
}) => {
  const [scoreType, setScoreType] = useState(null);
  const customStyles = {
    menuList: (styles: any) => ({
      ...styles,
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      background: isFocused ? "#eeeee" : isSelected ? "#90EE90" : undefined,
      zIndex: 1,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const modifiedOptions = options?.map((option) => ({
    value: option,
    label: option,
  }));

  const handleChange = (e: any) => {
    setPostData((prev: any) => {
      const postText = htmlForEditor(postData?.postText, item.name, e.value);
      let obj = {
        ...prev,
      };
      obj[item.id] = e.value.toLowerCase();
      obj.postText = postText;
      setCache("postData", JSON.stringify(obj));
      return obj;
    });

    if (item.id === "testScores") {
      setScoreType(e.value.toLowerCase());
    }
  };

  return (
    <>
      <ReactSelect
        options={modifiedOptions}
        styles={customStyles}
        menuPlacement="bottom"
        placeholder={item.placeholder || ""}
        defaultValue={
          postData[item?.id] && {
            value: postData[item?.id],
            label: postData[item?.id],
          }
        }
        onChange={handleChange}
      />

      {scoreType && (
        <div className="mt-4">
          <IonLabel className="capitalize">{scoreType} Score</IonLabel>
          <IonInput
            type="text"
            className="border border-[#bdbdbd] rounded-sm"
            placeholder="Enter score"
            onIonChange={(e) => {
              const postText = htmlForEditor(
                postData.postText,
                scoreType,
                e.target.value
              );

              setPostData((prev: any) => ({
                ...prev,
                postText,
                testScoreMark: {
                  [`${scoreType}Score`]: parseFloat(e?.target?.value as string),
                },
              }));

              setCache("postData", JSON.stringify(postData));
            }}
          />
        </div>
      )}
    </>
  );
};

export default SelectAtom;
