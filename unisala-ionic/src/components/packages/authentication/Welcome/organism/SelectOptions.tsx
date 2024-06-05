import React, { useContext } from "react";
import Checkbox from "../atom/Checkbox";
import { WelcomeData } from "..";

const SelectOptions = ({ metaData }: any) => {
  const { setWelcomeFormdata, welcomeFormdata } = useContext(WelcomeData);
  const handleClick = (e: any) => {
    const data = e.target.value;
    if (data) {
      setWelcomeFormdata({ ...welcomeFormdata, [metaData?.id]: data });
    }
  };

  return (
    <>
      {metaData?.options?.map((option, index) => {
        return (
          <Checkbox
            key={index}
            value={option}
            label={option}
            handleClick={handleClick}
            isChecked={option === welcomeFormdata[metaData?.id]}
          />
        );
      })}
    </>
  );
};
export default SelectOptions;
