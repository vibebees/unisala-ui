import React, { FC } from "react";
import { CardContent, Grid, Row } from "@components/defaults";
import { cn } from "@utils/index";
import { LeftArrow, RightArrow } from "../icons";

interface SliderProps {
  CustomclassName: string;
  children?: React.ReactNode;
}

const Slider: FC<SliderProps> = ({ CustomclassName, children }) => {
  const handleRightScrollClick = () => {
    const container = document.querySelector(`.${CustomclassName}`);
    container?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  const handleLeftScrollClick = () => {
    const container = document.querySelector(`.${CustomclassName}`);
    container?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  return (
    <CardContent className="p-0 ion-no-padding ion-no-margin w-full ">
      <Grid className=" flex ion-no-padding h-full gap-0 ion-no-margin">
        <button
          onClick={handleLeftScrollClick}
          className=" active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-neutral-100 "
        >
          <LeftArrow />
        </button>
        <Row
          className={cn(
            "flex mt-2 h-full flex-nowrap bg-transparent flex-row w-full gap-4",
            CustomclassName
          )}
        >
          {children}
        </Row>
        <button
          onClick={handleRightScrollClick}
          className=" active:bg-neutral-200 duration-200 ease-linear transition-all w-6 flex justify-center items-center hover:bg-opacity-60 "
        >
          <RightArrow />
        </button>
      </Grid>
    </CardContent>
  );
};

export default Slider;
